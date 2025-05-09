import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';






export  function float(wg, dec)  {sys.$params(arguments.length, 2);
  const n =sys.$checkNull( str.trim(wg.getValue()).replace(".", "").replace(",", "."));
  if (sys.$eq(n , ""))  return [];
  const rOp =sys.$checkNull( math.fromStr(n));
   return !sys.asBool(rOp) ? [] : [math.round(rOp[0], dec)];
};



export  function int(wg)  {sys.$params(arguments.length, 1);
  const n =sys.$checkNull( str.trim(wg.getValue()).replace(".", "").replace(",", "."));
  if (sys.$eq(n , ""))  return [];
  const rOp =sys.$checkNull( math.fromStr(n));
   return !sys.asBool(rOp) ? [] : [math.toInt(rOp[0])];
};
