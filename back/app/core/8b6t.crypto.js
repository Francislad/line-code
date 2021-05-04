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
  let last = 0;
  let hexCounters = {};

  const asciiArr = convertStrToAsciiArr(message);
  const binArr = convertAsciiArrToBinArr(asciiArr);
  const hexArr = convertBinArrToHexArr(binArr);

  const hexSignalArr = hexArr.map(hex => {
    let signal = bToT[hex];
      if(last) {
        last = 0;
        return {hex, signal: invertSignal(signal)};
      }
      last = DCLevel(signal);
    return {hex, signal};
  });

  const encodedSpacedMessage = hexSignalArr.reduce((m, hexSignal) => {
    return m + hexSignal.signal + ' ';
  }, '').slice(0, -1);

  const encodedMessage = hexSignalArr.reduce((m, hexSignal) => {
    return m + hexSignal.signal;
  }, '');

  const encodedSignal = hexSignalArr.reduce((eS, hexSignal) => {
    let i = 1;

    if(hexCounters[hexSignal.hex]) hexCounters[hexSignal.hex]++;
    else hexCounters[hexSignal.hex] = 1;

    let hexSignalsArr = hexSignal.signal.split("").map(s => {
      let value = s === '-' ? -1 : s === '+' ? 1 : 0;
      let name = `${hexSignal.hex}-${hexCounters[hexSignal.hex]}/${i++}`;
      return {name, value};
    });

    return [...eS, ...hexSignalsArr];
  }, []);

  return {
    message,
    binary: binArr.join(""),
    binarySpaced: binArr.join(" "),
    hex: hexArr.join(""),
    hexSpaced: hexArr.join(" "),
    encodedMessage,
    encodedSpacedMessage,
    encodedSignal,
    viewWidth: message.length * 350
  };
}

function decode(encodedMessage) {
  //todo: decode the message
}

module.exports = {
  encode,
  decode
};
