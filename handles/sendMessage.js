const axios = require('axios');

async function sendMessage(senderId, message, pageAccessToken) {
  await axios.get('https://graph.facebook.com/v13.0/me/messages', {
    recipient: { id: senderId },
    message: message,
    access_token: pageAccessToken
  }, {});
}

module.exports = { sendMessage };