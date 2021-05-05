const axios = require('axios');
const crypto = require('./crypto.service');
const {messages, messageSent, messageReceived} = require('./messages.service');
const {senderIp} = require('../env.config');

function messageReceiver(req, res) {
  const signal = req.body.signal;
  // console.log({received: signal});
  const messageObject = crypto.decodeMessage(signal);
  const receivedMessage = messageReceived(messageObject);

  res.send(200, receivedMessage);
}

function messageSender(req, res) {
  const message = req.body.message;
  // console.log({sent: message});
  const messageObject = crypto.encodeMessage(message);
  const signal = messageObject.encodedMessage;

  return axios.post(
    senderIp + '/receive',
    {signal})
    .then((response) => {
      const sentMessage = messageSent(messageObject);
      res.send(200, sentMessage);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMessages(req, res) {
  res.send(messages);
}

module.exports = {
  messageReceiver,
  messageSender,
  getMessages
};
