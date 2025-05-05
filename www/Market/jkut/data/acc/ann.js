import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as opr from  "../../data/acc/opr.js";







export function mk0 (id,date,op) { sys.$params(arguments.length, 3); return [ id, date, op];}export const id = 0;export const date = 1;export const op = 2;



export  function mk(date, op)  {sys.$params(arguments.length, 2);  return mk0( -1, date, op);};



export  function setId(a, id)  {sys.$params(arguments.length, 2);  return mk0(id, a[date], a[op]);};


export  function toJs(An)  {sys.$params(arguments.length, 1);
  const R = [An[id], An[date]];
  arr.cat(R, opr.toJs(An[op]));
   return R;
};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk0(math.toInt(A[0]), A[1], opr.fromJs(sys.$slice(A,2,null)));};
