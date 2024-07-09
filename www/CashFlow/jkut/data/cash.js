import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cashEntry from  "../data/cashEntry.js";



export  function previous(Cash, ix)  {sys.$params(arguments.length, 2);
  const start0 = ix - 5;
  const start =sys.$checkNull( start0 < 0 ? 0 : start0);
   return sys.$slice(Cash,start,ix);
};



export  function next( Cash, ix)  {sys.$params(arguments.length, 2);
  const sz =sys.$checkNull( arr.size(Cash));
  const end0 = ix + 6;
  const end =sys.$checkNull( end0 > sz ? sz : end0);
   return sys.$slice(Cash,ix + 1,end);
};
