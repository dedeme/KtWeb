import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';






export  function float(n)  {sys.$params(arguments.length, 1);
  const n2 =sys.$checkNull( str.replace(
    str.replace(
      str.trim(n),
      ".", ""
    ),
    ",", "."
  ));
  if (sys.$eq(n2 , ""))  return [0];
  const rOp =sys.$checkNull( math.fromStr(n2));
  if (!sys.asBool(rOp))  return rOp;
   return [math.round(rOp[0], 2)];
};




export  function validateYear(y)  {sys.$params(arguments.length, 1);
  const current =sys.$checkNull( time.year(time.now()));
  const yOp =sys.$checkNull( math.fromStr(y));
  if (!sys.asBool(!sys.asBool(yOp))) {
    const y =sys.$checkNull( math.toInt(yOp[0]));
    if (y >= current - 5 && y <= current + 1)  return math.toStr(y);
  }
   return math.toStr(current);
};
