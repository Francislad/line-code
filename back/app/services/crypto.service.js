const algorithm8b6t = require('../core/8b6t.crypto');

function encodeMessage(message) {
  return algorithm8b6t.encode(message);
}

function decodeMessage(signal) {
  return algorithm8b6t.decode(signal);
}

module.exports = {
  encodeMessage,
  decodeMessage
};
