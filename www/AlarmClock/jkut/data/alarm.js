import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);





export function mk (id,tm) { sys.$params(arguments.length, 2); return [ id, tm];}export const id = 0;export const tm = 1;


export  function timeToStr(a)  {sys.$params(arguments.length, 1);
  const now =sys.$checkNull( time.now());
   return (sys.$eq(time.day(now) , time.day(a[tm])) ? II("Today") : II("Tomorrow")) +
    " " + II("at") + " " + sys.$slice(time.format(a[tm], "%t"),null, -3)
  ;
};
