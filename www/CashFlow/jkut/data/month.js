import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);




export  function toIx(m)  {sys.$params(arguments.length, 1);
  const rOp =sys.$checkNull( math.fromStr(m));
  if (!sys.asBool(!sys.asBool(rOp))) {
    const r =sys.$checkNull( math.toInt(rOp[0]));
    if (r >= 1 && r <= 12)  return r;
  }
   return time.month(time.now());
};



export  function format(m)  {sys.$params(arguments.length, 1);  return m < 10 ? "0" + m : "" + m;};



export  function name(m)  {sys.$params(arguments.length, 1);  return II("months").split(",")[m - 1];};
