import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




const Q =sys.$checkNull( ui.q);







export  function mk(wg, currentValue, totalValue)  {sys.$params(arguments.length, 3);
  const width =sys.$checkNull( 400);

  const tds =sys.$checkNull( [
    Q("td")
      .klass("border")
      .style(
          "height:5px;background:#000080;width:" +
          math.toInt(currentValue * width / totalValue) + "px"
        )
  ]);
  if (currentValue <= totalValue) arr.push(tds,Q("td"));

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center")
          .add(Q("span")
            .text("" + math.toIso(currentValue, 0) + " / " +
                math.toIso(totalValue, 0)))))
      .add(Q("tr")
        .add(Q("td")
          .add(Q("table")
            .att("align", "center")
            .add(Q("tr")
              .add(Q("td")
                .klass("frame")
                .add(Q("table")
                  .style("border-collapse : collapse;width:" + width + "px")
                  .add(Q("tr")
                    .adds(tds))))))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center")
          .add(Q("span")
            .text("" + math.toIso(currentValue * 100 / totalValue, 2) + "%")))))
  ;
};
