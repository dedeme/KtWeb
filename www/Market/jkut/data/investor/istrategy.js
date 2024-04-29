import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';








export function mk (modelId,Params) { sys.$params(arguments.length, 2); return [ modelId, Params];}export const modelId = 0;export const Params = 1;



export  function eq(is1, is2)  {sys.$params(arguments.length, 2);
   return sys.$eq(is1[modelId] , is2[modelId]) && sys.$eq(is1[Params] , is2[Params]);};
