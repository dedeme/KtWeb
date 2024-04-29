import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';





export const [typePERIODIC, typeFIX, typeMANUAL]=[0, 1, 2];












export function mk (id,type,data,text) { sys.$params(arguments.length, 4); return [ id, type, data, text];}export const id = 0;export const type = 1;export const data = 2;export const text = 3;


export  function toJs(a)  {sys.$params(arguments.length, 1);  return [
    a[id],
    a[type],
    js.r(a[data]),
    a[text]
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return [
    A[id],
    A[type],
    js.w(A[data]),
    A[text]
  ];};



export  function days(a)  {sys.$params(arguments.length, 1);
  if (sys.$neq(a[type] , typePERIODIC))
    throw new Error(("Expected type typePERIODIC, but it is " + a[data]));
   return js.r(a[data])[1];
};



export  function date(a)  {sys.$params(arguments.length, 1);
  if (sys.$eq(a[type] , typeMANUAL))
    throw new Error(("type must not be Ann_MANUAL"));
  if (sys.$eq(a[type] , typeFIX))
     return js.r(a[data]) * 1000;
   return js.r(a[data])[0] * 1000;
};
