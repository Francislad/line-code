const {v4: uuidv4} = require('uuid');

let messages = {
  received: [],
  sent: []
};

function messageSent(messageObj) {
  messageObj = {id: uuidv4(), done: true, ...messageObj};
  messages.sent.unshift(messageObj);
  return messageObj;
}

function messageReceived(messageObj) {
  messageObj = {id: uuidv4(), done: true, ...messageObj};
  messages.received.unshift(messageObj);
  return messageObj;
}

module.exports = {
  messages,
  messageSent,
  messageReceived
};
