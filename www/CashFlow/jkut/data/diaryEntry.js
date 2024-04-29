import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as dann from  "../data/dann.js";








export function mk0 (month,desc,isIncome,Anns,am) { sys.$params(arguments.length, 5); return [ month, desc, isIncome, Anns, am];}export const month = 0;export const desc = 1;export const isIncome = 2;export const Anns = 3;export const am = 4;







export  function mk( month, desc, isIncome,  Anns)  {sys.$params(arguments.length, 4); return [
    month, desc, isIncome, Anns,
    arr.reduce(Anns,0, function(r,  e)  {sys.$params(arguments.length, 2);  return r + e[dann.am];})
  ];};



export  function copySetAnns( entry, Anns)  {sys.$params(arguments.length, 2);
   return mk(entry[month], entry[desc], entry[isIncome], Anns);};


export  function toJs(o)  {sys.$params(arguments.length, 1);  return [
    o[0], o[1], o[2], o[3]
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(A[0], A[1], A[2], A[3]);};
