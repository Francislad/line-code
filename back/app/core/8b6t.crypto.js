const {bToT, tToB} = require('./tables');

function invertSignal(signal) {
  return signal.split("").map(t => {
    if (t === '-') return '+';
    if (t === '+') return '-';
    return 0;
  }).join("");
}

/**
 * @return {number}
 */
function DCLevel(signal) {
  return signal.split('').reduce((level, s) => {
    if (s === '-') return level - 1;
    if (s === '+') return level + 1;
    return level;
  }, 0);
}


function strToAsciiArr(message) {
  return message.split("").map(c => {
    return c.charCodeAt();
  });
}

function asciiArrToBinArr(asciiArr) {
  return asciiArr.map(ascii => {
    return asciiToBin(ascii);
  })
}

function asciiToBin(asciiStr) {
  return parseInt(asciiStr, 10).toString(2);
}

function binArrToHexArr(binArr) {
  return binArr.map(bin => {
    return binToHex(bin);
  })
}

function binToHex(binStr) {
  return parseInt(binStr, 2).toString(16).toUpperCase();
}

function hexArrToHexSignalArr(hexArr) {
  let last = 0;
  return hexArr.map(hex => {
    let signal = bToT[hex];
    if (last) {
      last = 0;
      return {hex, signal: invertSignal(signal)};
    }
    last = DCLevel(signal);
    return {hex, signal};
  });
}

function hexSignalArrToEncodedSpacedMessage(hexSignalArr) {
  return hexSignalArr.reduce((m, hexSignal) => {
    return m + hexSignal.signal + ' ';
  }, '').slice(0, -1);
}

function hexSignalArrToEncodedMessage(hexSignalArr) {
  return hexSignalArr.reduce((m, hexSignal) => {
    return m + hexSignal.signal;
  }, '');
}

function hexSignalArrToEncodedSignal(hexSignalArr) {
  let hexCounters = {};
  return hexSignalArr.reduce((eS, hexSignal) => {
    let i = 1;

    if (hexCounters[hexSignal.hex]) hexCounters[hexSignal.hex]++;
    else hexCounters[hexSignal.hex] = 1;

    let hexSignalsArr = hexSignal.signal.split("").map(s => {
      let value = s === '-' ? -1 : s === '+' ? 1 : 0;
      let name = `${hexSignal.hex}-${hexCounters[hexSignal.hex]}/${i++}`;
      return {name, value};
    });

    return [...eS, ...hexSignalsArr];
  }, []);
}


function encodedMessageToHexArr(encodedMessage) {
  let hexArr = [];
  let i = 0;
  while (encodedMessage.length > i) {
    let signal = encodedMessage.slice(i, i + 6);
    let hex = tToB[signal] ? tToB[signal] : tToB[invertSignal(signal)];
    hexArr.push(hex);
    i = i + 6;
  }
  return hexArr;
}

function hexArrToBinArr(hexArr) {
  return hexArr.map(hex => {
    return hexToBin(hex);
  })
}

function hexToBin(hexStr) {
  return parseInt(hexStr, 16).toString(2).toUpperCase();
}

function binArrToAsciiArr(binArr) {
  return binArr.map(bin => {
    return binToAscii(bin);
  })
}

function binToAscii(binStr) {
  return parseInt(binStr, 2).toString(10);
}

function asciiArrToMessage(asciiArr) {
  return asciiArr.reduce((m, ascii) => {
    return m + String.fromCharCode(ascii);
  }, "");
}


function encode(message) {
  const asciiArr = strToAsciiArr(message);//[ 109, 111, 99 ]
  const binArr = asciiArrToBinArr(asciiArr);//[ '1101101', '1101111', '1100011' ]
  const hexArr = binArrToHexArr(binArr);//[ '6D', '6F', '63' ]
  const hexSignalArr = hexArrToHexSignalArr(hexArr);//[ { hex: '6D', signal: '++0+--' },...]
  const encodedSpacedMessage = hexSignalArrToEncodedSpacedMessage(hexSignalArr);//'++0+-- --0++- +0+00-'
  const encodedMessage = hexSignalArrToEncodedMessage(hexSignalArr);//'++0+----0++-+0+00-'
  const encodedSignal = hexSignalArrToEncodedSignal(hexSignalArr);//[ { name: '6D-1/1', value: 1 },...]

  return {
    message,//'moc'
    binary: binArr.join(""),//'110110111011111100011'
    binarySpaced: binArr.join(" "),//'1101101 1101111 1100011'
    hex: hexArr.join(""),//'6D6F63'
    hexSpaced: hexArr.join(" "),//'6D 6F 63'
    encodedMessage,//'++0+----0++-+0+00-'
    encodedSpacedMessage,//'++0+-- --0++- +0+00-'
    encodedSignal,//[ { name: '6D-1/1', value: 1 },...]
    viewWidth: message.length * 350//1050
  };
}

function decode(encodedMessage) {
  const hexArr = encodedMessageToHexArr(encodedMessage);//[ '6D', '6F', '63' ]
  const binArr = hexArrToBinArr(hexArr);//[ '1101101', '1101111', '1100011' ]
  const asciiArr = binArrToAsciiArr(binArr);//[ 109, 111, 99 ]
  const message = asciiArrToMessage(asciiArr);//'moc'
  const hexSignalArr = hexArrToHexSignalArr(hexArr);//[ { hex: '6D', signal: '++0+--' },...]
  const encodedSpacedMessage = hexSignalArrToEncodedSpacedMessage(hexSignalArr);//'++0+-- --0++- +0+00-'
  const encodedSignal = hexSignalArrToEncodedSignal(hexSignalArr);//[ { name: '6D-1/1', value: 1 },...]

  return {
    message,//'moc'
    binary: binArr.join(""),//'110110111011111100011'
    binarySpaced: binArr.join(" "),//'1101101 1101111 1100011'
    hex: hexArr.join(""),//'6D6F63'
    hexSpaced: hexArr.join(" "),//'6D 6F 63'
    encodedMessage,//'++0+----0++-+0+00-'
    encodedSpacedMessage,//'++0+-- --0++- +0+00-'
    encodedSignal,//[ { name: '6D-1/1', value: 1 },...]
    viewWidth: message.length * 350//1050
  };
}

module.exports = {
  encode,
  decode
};
