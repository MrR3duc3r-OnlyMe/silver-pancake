const { sendMessage } = require('./sendMessage');
const axios = require("axios");

const AVAILABLE_COMMANDS = [
  "ai — talk to AI. powered by Meta LLama3",
  "neth — talk to NethAI",
  "wiegine — talk to WiegineAI"];

function handleMessage(event, pageAccessToken) {
  const senderId = event.sender.id;
  const messageText = event.message.text.toLowerCase();

  // Define triggers for responses
  const triggers = ["ai","neth","wiegine"];

  // Check if any trigger is found in the message
  if (triggers.some(trigger => messageText.includes(trigger))) {
    if (messageText === 'help') {
      const helpMessage = `🤖Nethbot — Commands:\n${AVAILABLE_COMMANDS.join('\n')}\n\nReport to developer if you encountered issues.\nhttps://www.facebook.com/kennethaceberos`;
      sendMessage(senderId, { text: helpMessage }, pageAccessToken);
      console.log('Commands loaded successfully');
    } else if (messageText.includes(trigger[0])) {
      const prompt = messageText.replace(trigger[0], '').trim();
      await axios.get(`https://nethwieapi.onrender.com/ai?model=@cf/meta/llama-3-8b-instruct&user=${encodeURIComponent(prompt)}`)
      .then(neth => {
        sendMessage(senderID, {
          text: `🤖 — ${neth.msg}\n\nNethbot🤖 by Kenneth Aceberos`
        });
      });
    } else if (messageText.includes(trigger[1])) {
       const prompt = messageText.replace(trigger[1], '').trim();
       await axios.get(`https://nethwieapi.onrender.com/ai?model=neth&user=${encodeURIComponent(prompt)}`)
         .then(neth => {
           sendMessage(senderID, {
             text: `🤖 — ${neth.msg}\n\nNethbot🤖 by Kenneth Aceberos`
           });
         });
     } else if (messageText.includes(trigger[2])) {
        const prompt = messageText.replace(trigger[2], '').trim();
        await axios.get(`https://nethwieapi.onrender.com/ai?model=wiegine&user=${encodeURIComponent(prompt)}`)
          .then(neth => {
            sendMessage(senderID, {
              text: `👸 — ${neth.msg}\n\nNethbot🤖 by Kenneth Aceberos`
            });
          });
      }
  }
}

module.exports = { handleMessage };