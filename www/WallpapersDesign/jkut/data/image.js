import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as imgCut from  "../data/imgCut.js";
import * as imgAdj from  "../data/imgAdj.js";
import * as imgBlur from  "../data/imgBlur.js";







export function mk (id,cutOp,adjOp,blurOp) { sys.$params(arguments.length, 4); return [ id, cutOp, adjOp, blurOp];}export const id = 0;export const cutOp = 1;export const adjOp = 2;export const blurOp = 3;


export  function setCutOp(i, vOp)  {sys.$params(arguments.length, 2);  return mk(i[id], vOp, i[adjOp], i[blurOp]);};


export  function setAdjOp(i, vOp)  {sys.$params(arguments.length, 2);  return mk(i[id], i[cutOp], vOp, i[blurOp]);};


export  function setBlurOp(i, vOp)  {sys.$params(arguments.length, 2);  return mk(i[id], i[cutOp], i[adjOp], vOp);};
