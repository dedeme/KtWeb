import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../cts.js";













export function mk (id,cycle,mdId,Params,assets,profits,points,sales) { sys.$params(arguments.length, 8); return [ id, cycle, mdId, Params, assets, profits, points, sales];}export const id = 0;export const cycle = 1;export const mdId = 2;export const Params = 3;export const assets = 4;export const profits = 5;export const points = 6;export const sales = 7;


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return [
    A[id],
    A[cycle],
    A[mdId],
    A[Params],
    A[assets],
    A[profits],
    evaluate(A[assets], A[profits]),
    A[sales - 1]
  ];};






export  function evaluate(assets, profits)  {sys.$params(arguments.length, 2);  return math.toInt(
    ( assets * cts.assetsRatio / cts.maxAssets +
        (1.0 + profits) * cts.profitsAvgRatio / cts.maxProfitsAvgRatio
      ) * 3000.0
  );};



export  function greater(f1, f2)  {sys.$params(arguments.length, 2); 
  return sys.$eq(f1[points] , f2[points])
    ? sys.$eq(f1[assets] , f2[assets])
      ? f1[profits] > f2[profits]
      : f1[assets] > f2[assets]
    : f1[points] > f2[points]
  ;};
