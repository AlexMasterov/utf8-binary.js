'use strict';

const viewToStr = source('view-str');
const viewToStrL = source('legacy/view-str');

suite('viewToStr + legacy');

const onByteTest = (buf) => {
  const view = toView(buf);
  const str = toUtf8(buf);

  eq(viewToStr(view), str);
  eq(viewToStrL(view), str);
};

test('1 byte (u0000 — u007f)', () => {
  eachByte(utf8byte1, onByteTest);
});

test('2 bytes (u0080 — u07ff)', () => {
  eachByte(utf8byte2, onByteTest);
});

test('3 bytes (u0800 — uffff)', () => {
  eachByte(utf8byte3.low, onByteTest);
  eachByte(utf8byte3.high, onByteTest);
});

test('4 bytes (u10000 — u10ffff)', () => {
  eachByte(utf8byte4, onByteTest);
});
