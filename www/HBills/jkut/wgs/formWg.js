import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as monthAnn from  "../data/monthAnn.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



export  function mk( ann, fclose, faccept)  {sys.$params(arguments.length, 3);
  const place =sys.$checkNull( !sys.asBool(ann[monthAnn.placeOp]) ? "" : ann[monthAnn.placeOp][0]);
  const entry =sys.$checkNull( Q("input")
    .att("type", "text")
    .att("id", "formEntry")
    .style("width:100px")
    .value(place))
  ;
  entry.on("keydown", function(ev)  {sys.$params(arguments.length, 1);
    if (
      sys.$eq(ev.code.toLowerCase() , "numpadenter") ||
      sys.$eq(ev.code.toLowerCase() , "enter")
    ) {
      const pVal =sys.$checkNull( entry.getValue());
      if (sys.$eq(pVal , place)) {
        fclose();
      } else {
        const placeOp =sys.$checkNull( sys.$eq(pVal , "") ? [] : [pVal]);
        const a2 =sys.$checkNull( monthAnn.mk(
          ann[monthAnn.month],
          placeOp,
          ann[monthAnn.amount]
        ));
        faccept(a2);
      }
    } else if (sys.$eq(ev.code.toLowerCase() , "escape")) {
      fclose();
    }
  });

   return Q("table")
    .add(Q("tr")
      .add(Q("td")
        .klass("head")
        .text(II("Set Place"))))
    .add(Q("tr")
      .add(Q("td")
        .text(" ")))
    .add(Q("tr")
      .add(Q("td")
        .add(Q("span")
          .html(sys.$slice(ann[monthAnn.month],4,null) + "/" + sys.$slice(ann[monthAnn.month],null,4) + ":&nbsp;"))
        .add(entry)))
  ;
};
