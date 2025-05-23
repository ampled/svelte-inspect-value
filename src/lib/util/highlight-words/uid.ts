// https://github.com/lukeed/uid/blob/master/src/index.js
/* eslint no-bitwise: 'off' */
/* eslint no-plusplus: 'off' */
/* eslint @typescript-eslint/strict-boolean-expressions: 'off' */
let IDX = 36;
let HEX = '';
while (IDX--) {
  HEX += IDX.toString(36);
}

export default function uid(len = 11): string {
  let str = '';
  let num = len;
  while (num--) {
    str += HEX[(Math.random() * 36) | 0];
  }
  return str;
}
