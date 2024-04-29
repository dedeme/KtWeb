import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';





export const {end, error, readingSource, readingTarget, selecting, copying, deleting} ={"end":"end", "error":"error", "readingSource":"readingSource", "readingTarget":"readingTarget", "selecting":"selecting", "copying":"copying", "deleting":"deleting"};









export function mk (state,errorMsg,Warnings,totalCount,currentCount) { sys.$params(arguments.length, 5); return [ state, errorMsg, Warnings, totalCount, currentCount];}export const state = 0;export const errorMsg = 1;export const Warnings = 2;export const totalCount = 3;export const currentCount = 4;
