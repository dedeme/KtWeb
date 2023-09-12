import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  function mk(id, targetId, value, fn)  {sys.$params(arguments.length, 4);
  const wg =sys.$checkNull( ui.changePoint(ui.field(targetId)
    .att("id", id)
    .style("width:80px")
    .value(str.replace(math.toFix(value, 2), ".", ","))
  ));

  
   function onchange(ev)  {sys.$params(arguments.length, 1);
    const wgValue =sys.$checkNull( str.trim(wg.getValue()));
    const newValueOp =sys.$checkNull( math.fromStr(str.replace(
      str.replace(wgValue, ".", ""), ",", "."
    )));
    if (sys.asBool(newValueOp)) {
      fn(id, newValueOp[0]);
    } else {
      ui.alert(i18n.fmt(II("'%0' is not a valid number"), [wgValue]));
      wg.value(str.replace(math.toStr(value, 2), ".", ","));
      wg.e.focus();
    }
  };

  wg.on("change", onchange);
  wg.on("focus", wg.e.select);

   return wg;
};
