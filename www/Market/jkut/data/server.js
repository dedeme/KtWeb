import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';







export const [active, inactive, undef] =[0, 1, 2];











export function mk (id,name,withCurrent,withDaily,withHistoric) { sys.$params(arguments.length, 5); return [ id, name, withCurrent, withDaily, withHistoric];}export const id = 0;export const name = 1;export const withCurrent = 2;export const withDaily = 3;export const withHistoric = 4;
