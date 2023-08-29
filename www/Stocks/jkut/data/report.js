import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




export const all =sys.$checkNull(  -1);



export const withFees =sys.$checkNull(  -2);








export  function mk(cost, profits, fees, summary, anns)  {sys.$params(arguments.length, 5);
   return {cost:cost, profits:profits, fees:fees, summary:summary, anns:anns};};







export  function mkSummary(nick, stocks, price, total)  {sys.$params(arguments.length, 4);  return {nick:nick, stocks:stocks, price:price, total:total};};











export  function mkAnn(date, nick, stocks, price, total, profits, fees)  {sys.$params(arguments.length, 7);
   return {date:date, nick:nick, stocks:stocks, price:price, total:total, profits:profits, fees:fees};};
