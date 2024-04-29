import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as diaryEntry from  "../data/diaryEntry.js";







export function mk (month,desc,isIncome,am) { sys.$params(arguments.length, 4); return [ month, desc, isIncome, am];}export const month = 0;export const desc = 1;export const isIncome = 2;export const am = 3;



export  function eqDiaryEntry(hcEntry,  cEntry)  {sys.$params(arguments.length, 2);
  
    return sys.$eq(cEntry[diaryEntry.month] , hcEntry[month]) &&
    sys.$eq(cEntry[diaryEntry.desc] , hcEntry[desc]) &&
    sys.$eq(cEntry[diaryEntry.isIncome] , hcEntry[isIncome]) &&
    math.eq(cEntry[diaryEntry.am], hcEntry[am], 0.0001)
  ;};
