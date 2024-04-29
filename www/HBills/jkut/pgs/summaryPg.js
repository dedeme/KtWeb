import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';






import * as accAnn from  "../data/accAnn.js";
import * as monthAnn from  "../data/monthAnn.js";
import * as cts from  "../cts.js";
import * as fns from  "../fns.js";
import * as barWg from  "../wgs/barWg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const {Years,  Bills,  Stays} 
  = await  client.send({
    prg: cts.appName,
    source: "SummaryPg",
    rq: "idata"
  });

  
   function table()  {sys.$params(arguments.length, 0);
    
     function fmax(n1, n2)  {sys.$params(arguments.length, 2);  return n1 > n2 ? n1 : n2;};
    
     const Rows =sys.$checkNull( arr.map(Years,function(y)  {sys.$params(arguments.length, 1);  return [
        y,
        arr.reduce(
          arr.filter(Bills,function( a)  {sys.$params(arguments.length, 1);  return str.starts(a[monthAnn.month], y);}),
          0,
          function(r,  a)  {sys.$params(arguments.length, 2);  return r + a[monthAnn.amount];}
        ),
        arr.reduce(
          arr.filter(Stays,function( a)  {sys.$params(arguments.length, 1);  return str.starts(a[accAnn.date], y);}),
          0,
          function(r,  a)  {sys.$params(arguments.length, 2);  return r + a[accAnn.amount];}
        )
      ];}));
    const max =sys.$checkNull( arr.reduce(Rows,0, function(r, Row)  {sys.$params(arguments.length, 2);  return fmax(Row[1] + Row[2], r);}));
    const sumBills =sys.$checkNull( arr.reduce(Rows,0, function(r, Row)  {sys.$params(arguments.length, 2);  return r + Row[1];}));
    const sumStays =sys.$checkNull( arr.reduce(Rows,0, function(r, Row)  {sys.$params(arguments.length, 2);  return r + Row[2];}));
     function bWg(Row)  {sys.$params(arguments.length, 1);  return barWg.mkWg(
        barWg.mk(300, 2, (Row[1] + Row[2]) / max, "#c0c080", "#ffffff")
      );};

    
      return Q("table")
        .att("align", "center")
        .klass("border")
        .add(Q("tr")
          .add(Q("td")
            .klass("header")
            .style("text-align: left")
            .html(II("Year")))
          .add(Q("td")
            .klass("header")
            .style("text-align: right")
            .html(II("Bills")))
          .add(Q("td")
            .klass("header")
            .style("text-align: right")
            .html(II("Stays")))
          .add(Q("td")
            .klass("header")
            .style("text-align: right")
            .html(II("Total")))
          .add(Q("td").klass("header")))
        .adds(arr.map(Rows,function(R)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .klass("border")
              .style("text-align: left")
               .text(R[0]))
            .add(Q("td")
              .klass("border")
              .style("text-align: right")
              .html(fns.cFmt(R[1])))
            .add(Q("td")
              .klass("border")
              .style("text-align: right")
              .html(fns.cFmt(R[2])))
            .add(Q("td")
              .klass("border")
              .style("text-align: right")
              .html(fns.cFmt(R[1] + R[2])))
            .add(Q("td")
              .add(bWg(R)));}))
        .add(Q("tr")
          .add(Q("td").klass("border"))
          .add(Q("td").klass("border"))
          .add(Q("td").klass("border"))
          .add(Q("td").klass("border"))
          .add(Q("td").klass("border")))
        .add(Q("tr")
          .add(Q("td")
            .klass("border")
            .html(II("Sums") + "&nbsp;"))
          .add(Q("td")
            .klass("border")
            .style("text-align: right")
            .html(fns.cFmt(sumBills)))
          .add(Q("td")
            .klass("border")
            .style("text-align: right")
            .html(fns.cFmt(sumStays)))
          .add(Q("td")
            .klass("border")
            .style("text-align: right")
            .html(fns.cFmt(sumBills + sumStays)))
          .add(Q("td").klass("border")))
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
