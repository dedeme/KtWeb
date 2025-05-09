import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as menu from  "../libdm/menu.js";
import * as cts from  "../cts.js";
import * as flea from  "../data/flea.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
    const {Summary}  
                  
                  
  = await  client.send({
    prg: cts.appName,
    source: "SummaryPg",
    rq: "idata"
  });

   const Dates =sys.$checkNull( dic.keys(Summary));
  arr.sort(Dates,function(d1, d2)  {sys.$params(arguments.length, 2);  return d1 > d2;});

  const size =sys.$checkNull( arr.size(Dates));
  const iV = [0];
  const Trs = []; 
  while (true) {
    if (sys.$eq(iV[0] , size)) break;
    const tr =sys.$checkNull( Q("tr"));
    for (let i = 0;i < 4; ++i) {
      if (sys.$eq(iV[0] , size)) {
        for (let j = i;j < 4; ++j) tr.add(Q("td"));
        break;
      }
      const d =sys.$checkNull( Dates[iV[0]]);
      tr
        .add(Q("td")
          .style("vertical-align:top")
          .add(mkDay(d, Summary[d])));
      arr.push(Trs,tr);
      iV[0] +=sys.$checkExists(iV[0], 1);
    }
  }

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .adds(Trs))
  ;

};






 function mkDay(date,  Summary)  {sys.$params(arguments.length, 2);
  const Rows = []; 

  for (const [mdId, Fjs]  of sys.$forObject2( Summary)) {
     const fl =sys.$checkNull( flea.fromJs(Fjs));
    arr.push(Rows,[mdId, fl[flea.assets], fl[flea.profits], fl[flea.points], fl[flea.Params], fl[flea.sales]]);
  }

   return Q("table")
    .klass("border")
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 4)
        .klass("borderWhite")
        .style("text-align:center;background:#c9c9c9;")
        .text(time.toIso(time.fromStr(date)[0]))))
    .adds(mkResults(Rows))
  ;
};




 function mkResults( Rs)  {sys.$params(arguments.length, 1);
  arr.sort(Rs,function(R1, R2)  {sys.$params(arguments.length, 2);  return R1[3] > R2[3];});
  const Trs = []; 
  for (const R  of sys.$forObject( Rs)) {
    arr.push(Trs,Q("tr")
      .add(Q("td")
        .klass("link")
        .style("text-align:right;background:#fafafa;cursor:pointer")
        .att(
            "title",
            II("Params") + ": [" + R[4] + "]\n" +
            II("Sales") + " : " + R[5]
          )
        .on("click", function(ev)  {sys.$params(arguments.length, 1); window.location=sys.$checkExists(window.location,"?rankings&" + R[0]);})
        .text(R[0]))
      .add(fns.mkTdN(R[1], 2))
      .add(fns.mkTdN(R[2], 4))
      .add(fns.mkTdN(R[3], 0))
    );
  }
   return Trs;
};
