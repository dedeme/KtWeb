import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';















export function mk (isBig,withBackups,withPathTxt,dpath,pathOk,notInBase,isMissing,synchronized) { sys.$params(arguments.length, 8); return [ isBig, withBackups, withPathTxt, dpath, pathOk, notInBase, isMissing,
  synchronized];}export const isBig = 0;export const withBackups = 1;export const withPathTxt = 2;export const dpath = 3;export const pathOk = 4;export const notInBase = 5;export const isMissing = 6;export const synchronized = 7;
