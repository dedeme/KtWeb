import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, msg, withReload)  {sys.$params(arguments.length, 3);
  const tx = "<a href='?@'>" + II("here") + "</a>";
  const reload =
    "<p><b>" +
    i18n.fmt(II("Click %0 to continue."), [tx]) +
    "</b></p>";
  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .style("padding-bottom:20px;")
      .text(cts.appName))
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .add(Q("table")
            .klass("border")
            .att("width", "100%")
            .style("background-color: #f8f8f8; border-collapse: collapse")
            .add(Q("tr")
              .add(Q("td")
                .style("padding:0px 10px 0px 10px;")
                .html(str.fmt("<p>%v<p>%v", [msg, withReload ? reload : ""]))
              ))))));
};
