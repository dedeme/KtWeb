import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../cts.js";
import * as fns from  "../fns.js";
import * as accAnn from  "../data/accAnn.js";
import * as barWg from  "../wgs/barWg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
    const {Stays} = await  client.send({
    prg: cts.appName,
    source: "StaysPg",
    rq: "idata"
  });

  
   function table()  {sys.$params(arguments.length, 0);
    const max =sys.$checkNull( arr.reduce(Stays,
      0, function(r,  an)  {sys.$params(arguments.length, 2);  return an[accAnn.amount] > r ? an[accAnn.amount] : r;}
    ));
    const tb =sys.$checkNull( Q("table").att("align", "center").klass("border"));
     function bWg( a)  {sys.$params(arguments.length, 1);  return barWg.mkWg(
        barWg.mk(300, 2, a[accAnn.amount] / max, "#c080c0", "#ffffff")
      );};

     return !sys.asBool(Stays)
      ? tb
        .add(Q("tr")
          .add(Q("td")
            .style("text-align: center")
            .html(II("Without Data"))))
      : tb
        .add(Q("tr")
          .add(Q("td")
            .klass("header")
            .style("text-align: left")
            .html(II("Date")))
          .add(Q("td")
            .klass("header")
            .style("text-align: left")
            .html(II("Place")))
          .add(Q("td")
            .klass("header")
            .style("text-align: right")
            .html(II("Amount")))
          .add(Q("td").klass("header")))
        .adds(arr.map(Stays,function( a)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .klass("border")
              .style("text-align: left")
              .text(
                  sys.$slice(a[accAnn.date],6,null) + "/" +
                  sys.$slice(a[accAnn.date],4,6) + "/" +
                  sys.$slice(a[accAnn.date],null,4))
                )
            .add(Q("td")
              .klass("border")
              .style("text-align: left")
              .html(a[accAnn.place] + "&nbsp;"))
            .add(Q("td")
              .klass("border")
              .style("text-align: right")
              .html(fns.cFmt(a[accAnn.amount])))
            .add(Q("td")
              .add(bWg(a)));}))
    ;
  };

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(table()))))
  ;
};
