import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as global from  "../global.js";








export function mk (date,nick,type,stocks,price) { sys.$params(arguments.length, 5); return [ date, nick, type, stocks, price];}export const date = 0;export const nick = 1;export const type = 2;export const stocks = 3;export const price = 4;



export  function sales(Os)  {sys.$params(arguments.length, 1);
  const sumV =sys.$checkNull( [0]);
  for (const O  of sys.$forObject( Os)) if (sys.$eq(O[type] , global.orderSellV[0])) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( 1));
   return sumV[0];
};
