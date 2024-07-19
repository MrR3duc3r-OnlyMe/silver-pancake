const axios = require('axios');

async function sendMessage(senderId, message, pageAccessToken) {
  await axios.get('https://graph.facebook.com/v13.0/me/messages?access_token='+pageAccessToken, {
    recipient: { id: senderId },
    message: message,
  });
}

module.exports = { sendMessage };