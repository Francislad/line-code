const bToT = {
  "00": "-+00-+",
  "01": "0-+-+0",
  "02": "0-+0-+",
  "22": "-+0-++",
  "23": "+-0-++",
  "61": "+0+-00",//a
  "62": "+0+0-0",//b
  "63": "+0+00-",//c
};
const tToB = {
  "-+00-+": "00",
  "0-+-+0": "01",
  "0-+0-+": "02",
  "-+0-++": "22",
  "+-0-++": "23",
  "+0+-00": "61",//a
  "+0+0-0": "62",//b
  "+0+00-": "63",//c
};

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


function convertHexArrToBinArr(hexArr) {

}

function convertHexToBin(hex) {

}

function convertBinArrToAsciiArr(binArr) {

}

function convertBinToAscii(binStr) {

}

function convertAsciiArrToStr(asciiArr) {

}


function encode(message) {
  let asciiArr = convertStrToAsciiArr(message);
  console.log({asciiArr});
  let binArr = convertAsciiArrToBinArr(asciiArr);
  console.log({binArr});
  let hexArr = convertBinArrToHexArr(binArr);
  console.log({hexArr});

  let last = 0;
  let encodedMessage = hexArr.reduce((m, hex) => {
    let signal = bToT[hex];
    if(last) {
      last = 0;
      return m + invertSignal(signal);
    }
    last = DCLevel(signal);
    return m + signal;
  }, '');

  return encodedMessage;
}

function decode(message) {

}

console.log(encode('aaa'));
