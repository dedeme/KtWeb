import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';













export function mk (date,open,close,max,min,vol,error) { sys.$params(arguments.length, 7); return [ date, open, close, max, min, vol, error];}export const date = 0;export const open = 1;export const close = 2;export const max = 3;export const min = 4;export const vol = 5;export const error = 6;


export  function toStr(qt)  {sys.$params(arguments.length, 1);  return str.fmt(
    "%v:%v:%v:%v:%v:%v:%v",
    [qt[date], qt[open], qt[close], qt[max], qt[min], qt[vol], qt[error]]
  );};
