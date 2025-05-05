import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';















export function mk (nick,date,field,svId,tbValue,svValue,deleted) { sys.$params(arguments.length, 7); return [ nick, date, field, svId, tbValue, svValue, deleted];}export const nick = 0;export const date = 1;export const field = 2;export const svId = 3;export const tbValue = 4;export const svValue = 5;export const deleted = 6;




export const {o, c, x, n, v} ={"o":"o", "c":"c", "x":"x", "n":"n", "v":"v"};




export  function eqQuote(t1, t2)  {sys.$params(arguments.length, 2);  return sys.$eq(sys.$slice(t1,null,3) , sys.$slice(t2,null,3));};
