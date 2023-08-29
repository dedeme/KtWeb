import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




import * as cts from  "../data/cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  async  function mk(wg, selectedYear)  {sys.$params(arguments.length, 2);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "PlanPg",
    rq: "idata",
    year: selectedYear
  }));
  console.log( Rp.plan);
  console.log( Rp.diary);

  const showOp =sys.$checkNull( [[]]);

  

  

  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);

    wg
      .removeAll()
      .add(Q("div").text("Plan"))
    ;
  });

  showOp[0]();
};