let messages = {
  received: [],
  sent: []
};

function messageSent(messageObj) {
  messages.sent.push(messageObj);
  return messageObj;
}

function messageReceived(messageObj) {
  messages.received.push(messageObj);
  return messageObj;
}

module.exports = {
  messages,
  messageSent,
  messageReceived
};
