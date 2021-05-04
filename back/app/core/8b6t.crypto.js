const {bToT, tToB} = require('./tables');

function invertSignal(signal) {
  return signal.split("").map(t => {
    if(t === '-') return '+';
    if(t === '+') return '-';
    return 0;
  }).join("");
}

/**
 * @return {number}
 */
function DCLevel(signal) {
  return signal.split('').reduce((level, s) => {
    if(s === '-') return level - 1;
    if(s === '+') return level + 1;
    return level;
  }, 0);
}


function convertStrToAsciiArr(message) {
  return message.split("").map(c => {
    return c.charCodeAt();
  });
}

function convertAsciiArrToBinArr(asciiArr) {
  return asciiArr.map(ascii => {
    return convertAsciiToBin(ascii);
  })
}

function convertAsciiToBin(asciiStr) {
  return parseInt(asciiStr, 10).toString(2);
}

function convertBinArrToHexArr(binArr) {
  return binArr.map(bin => {
    return convertBinToHex(bin);
  })
}

function convertBinToHex(binStr) {
  return parseInt(binStr, 2).toString(16).toUpperCase();
}


function encode(message) {
  let asciiArr = convertStrToAsciiArr(message);
  let binArr = convertAsciiArrToBinArr(asciiArr);
  let hexArr = convertBinArrToHexArr(binArr);

  let last = 0;
  let encodedSpacedMessage = hexArr.reduce((m, hex) => {
    let signal = bToT[hex];
    if(last) {
      last = 0;
      return m + invertSignal(signal) + ' ';
    }
    last = DCLevel(signal);
    return m + signal + ' ';
  }, '').slice(0, -1);

  return {
    message,
    binary: binArr.join(""),
    binarySpaced: binArr.join(" "),
    encodedMessage: encodedSpacedMessage.split(" ").join(""),
    encodedSpacedMessage
  };
}

function decode(encodedMessage) {
  //todo: decode the message
}

module.exports = {
  encode,
  decode
};
