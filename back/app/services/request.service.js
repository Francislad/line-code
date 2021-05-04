const axios = require('axios');
const crypto = require('./crypto.service');
const {messages, messageSent, messageReceived} = require('./messages.service');

function messageReceiver(req, res) {
  // console.log({reqBody: req.body});
  res.send(200);
}

function messageSender(ip, message) {
  const messageObject = crypto.encodeMessage(message);

  return axios.post(
    'http://localhost:8080/message',
    {signal: messageObject})
    .then((response) => {
      return messageSent({ip, done: true, ...messageObject});
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMessages() {
  return messages;
}

messageSender('12345', 'abelaco').then(res => {
  console.log(getMessages())
});

module.exports = {
  messageReceiver,
  messageSender,
  getMessages
};
