import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as monthAnn from  "../data/monthAnn.js";
import * as cts from  "../cts.js";
import * as fns from  "../fns.js";
import * as global from  "../global.js";
import * as barWg from  "../wgs/barWg.js";
import * as formWg from  "../wgs/formWg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const {dbKey,  Bills} 
  = await  client.send({
    prg: cts.appName,
    source: "BillsPg",
    rq: "idata"
  });
  arr.sort(Bills,function( b1,  b2)  {sys.$params(arguments.length, 2);  return b1[monthAnn.month] > b2[monthAnn.month];});
  global.dbKeyV[0] = dbKey;

  const boxWg =sys.$checkNull( Q("div"));
   const box =sys.$checkNull( modalBox.mk(boxWg, false));

  

  
   function setPlace( a)  {sys.$params(arguments.length, 1);
    modalBox.mkWg(box)
      .removeAll()
      .add(formWg.mk(
          a,
          function()  {sys.$params(arguments.length, 0); modalBox.show(box,false);},
          async  function( a2)  {sys.$params(arguments.length, 1);
            await client.send({
              prg: cts.appName,
              source: "BillsPg",
              rq: "setPlace",
              dbKey: global.dbKeyV[0],
              month: a2[monthAnn.month],
              placeOp: a2[monthAnn.placeOp]
            });
            mk(wg);
          }
        ))
    ;
    modalBox.show(box,true);
    Q("#formEntry").e.select();
    Q("#formEntry").e.focus();
  };

  

  
   function table()  {sys.$params(arguments.length, 0);
    const max =sys.$checkNull( arr.reduce(Bills,
      0, function(r,  an)  {sys.$params(arguments.length, 2);  return an[monthAnn.amount] > r ? an[monthAnn.amount] : r;}
    ));
    const tb =sys.$checkNull( Q("table").att("align", "center").klass("border"));
     function bWg( a)  {sys.$params(arguments.length, 1);  return barWg.mkWg(
        barWg.mk(300, 2, a[monthAnn.amount] / max, "#0080c0", "#ffffff")
      );};

     return !sys.asBool(Bills)
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
            .html(II("Month")))
          .add(Q("td")
            .klass("header")
            .style("text-align: left")
            .html(II("Place")))
          .add(Q("td")
            .klass("header")
            .style("text-align: right")
            .html(II("Amount")))
          .add(Q("td").klass("header")))
        .adds(arr.map(Bills,function( a)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .klass("border")
              .style("text-align: left")
              .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setPlace(a);})
                .klass("link")
                .text(sys.$slice(a[monthAnn.month],4,null) + "/" + sys.$slice(a[monthAnn.month],null,4))))
            .add(Q("td")
              .klass("border")
              .style("text-align: left")
              .html((!sys.asBool(a[monthAnn.placeOp]) ? "" : a[monthAnn.placeOp][0]) + "&nbsp;"))
            .add(Q("td")
              .klass("border")
              .style("text-align: right")
              .html(fns.cFmt(a[monthAnn.amount])))
            .add(Q("td")
              .add(bWg(a)));}))
    ;
  };

  wg
    .removeAll()
    .add(modalBox.mkWg(box))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(table()))))
  ;
};
