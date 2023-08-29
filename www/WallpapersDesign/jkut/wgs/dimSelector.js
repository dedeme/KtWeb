import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




import * as cts from  "../data/cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, dimStr, cancel, accept)  {sys.$params(arguments.length, 4);
  const Dim =sys.$checkNull( [dimStr]);
  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .adds(arr.map(dic.toArr(cts.Dims), function(Kv)  {sys.$params(arguments.length, 1);
         return Q("tr")
          .add(Q("td")
            .add(Q("input")
              .att("type", "radio")
              .att("name", "dims")
              .checked(sys.$eq(Dim[0] , Kv[0]))
              .on("click", function(ev)  {sys.$params(arguments.length, 1); Dim[0] =sys.$checkExists(Dim[0],sys.$checkNull( Kv[0]));})))
          .add(Q("td")
            .style("text-align: left")
            .text(Kv[0]))
        ;})))
    .add(Q("hr"))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(Q("button")
            .text(II("Cancel"))
            .on("click", function(ev)  {sys.$params(arguments.length, 1); cancel();}))
          .add(Q("span").html("&nbsp;&nbsp;"))
          .add(Q("button")
            .text(II("Accept"))
            .on("click", function(ev)  {sys.$params(arguments.length, 1); accept(cts.Dims[Dim[0]]);})))))
  ;
};
