const algorithm8b6t = require('../core/8b6t.crypto');

function encodeMessage(message) {
  return algorithm8b6t.encode(message);
}

function decodeMessage(message) {

}

module.exports = {
  encodeMessage,
  decodeMessage
};
