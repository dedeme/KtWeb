import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';










export function mk (date,description,debits,credits) { sys.$params(arguments.length, 4); return [ date, description, debits, credits];}export const date = 0;export const description = 1;export const debits = 2;export const credits = 3;


export  function toJs(o)  {sys.$params(arguments.length, 1);  return [
    time.toStr(o[date]),
    o[description],
    o[debits],
    o[credits]
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return [
    time.fromStr(A[date])[0],
    A[description],
    A[debits],
    A[credits]
  ];};
