const axios = require('axios');
const crypto = require('./crypto.service');
const {messages, messageSent, messageReceived} = require('./messages.service');
const {senderIp} = require('../env.config');

function messageReceiver(req, res) {
  console.log({received: req.body.signal});

  const messageObject = crypto.encodeMessage(req.body.signal);
  messageReceived(messageObject);

  res.send(200);
}

function messageSender(req, res) {
  const message = req.body.message;
  console.log({sent: message});
  const messageObject = crypto.encodeMessage(message);
  const signal = messageObject.message;

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
