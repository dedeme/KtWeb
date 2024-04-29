import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);










export function mk (id,isSell,date,nick,stocks,price,cash) { sys.$params(arguments.length, 7); return [ id, isSell, date, nick, stocks, price, cash];}export const id = 0;export const isSell = 1;export const date = 2;export const nick = 3;export const stocks = 4;export const price = 5;export const cash = 6;



export  function setId(a, annId)  {sys.$params(arguments.length, 2); a[id] =sys.$checkExists(a[id],sys.$checkNull( annId));};



export  function update(oldA, newA)  {sys.$params(arguments.length, 2); for (const [i, v]  of sys.$forObject2( newA)) oldA[i] =sys.$checkExists(oldA[i],sys.$checkNull( v));};



export  function toStr(a)  {sys.$params(arguments.length, 1); 
  return "| " +
  (a[isSell]
      ? II("S")
      : II("B")
    ) + " | " +
  time.toIso(a[date]) + " | " +
  a[nick] + " | " +
  math.toIso(a[stocks], 0) + " | " +
  math.toIso(a[price], 4) + " | " +
  math.toIso(a[cash], 2) +  " |"
;};


export  function toJs(a)  {sys.$params(arguments.length, 1);  return [
    a[id],
    a[isSell],
    time.toStr(a[date]),
    a[nick],
    a[stocks],
    a[price],
    a[cash]
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(
    A[id],
    A[isSell],
    time.fromStr(A[date])[0],
    A[nick],
    A[stocks],
    A[price],
    A[cash]
  );};
