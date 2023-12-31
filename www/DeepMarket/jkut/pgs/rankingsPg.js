import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../data/cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, isNear)  {sys.$params(arguments.length, 2);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "RankingsPg",
    rq: "idata",
    isNear:isNear
  }));

  
  
  
  const Summary =sys.$checkNull( Rp.summary);
  const Dates =sys.$checkNull( dic.keys(Summary));
  arr.sort(Dates, function(d1, d2)  {sys.$params(arguments.length, 2);  return d1 > d2;});

  const size =sys.$checkNull( arr.size(Dates));
  const iV =sys.$checkNull( [0]);
  const Trs =sys.$checkNull( []); 
  while (sys.asBool(true)) {
    if (sys.asBool(sys.$eq(iV[0] , size))) break;
    const tr =sys.$checkNull( Q("tr"));
    for (let i = 0;i < 3; ++i) {
      if (sys.asBool(sys.$eq(iV[0] , size))) {
        for (let j = i;j < 3; ++j) tr.add(Q("td"));
        break;
      }
      const d =sys.$checkNull( Dates[iV[0]]);
      tr.add(Q("td").add(mkDay(d, Summary[d])));
      arr.push(Trs, tr);
      iV[0] +=sys.$checkExists(iV[0],sys.$checkNull( 1));
    }
  }

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .adds(Trs))
  ;

};






 function mkDay(date, Summary)  {sys.$params(arguments.length, 2);
   return Q("table")
    .klass("border")
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 5)
        .klass("borderWhite")
        .style("text-align:center")
        .text(time.toIso(time.fromStr(date)[0]))))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 5)
        .klass("header")
        .text(II("Best"))))
    .adds(mkResults(Summary[0]))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 5)
        .klass("header")
        .text(II("Average"))))
    .adds(mkResults(Summary[1]))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 5)
        .klass("header")
        .text(II("Worst"))))
    .adds(mkResults(Summary[2]))
  ;
};




 function mkResults(Rs)  {sys.$params(arguments.length, 1);
  arr.sort(Rs, function(R1, R2)  {sys.$params(arguments.length, 2);  return R1[3] > R2[3];});
  const Trs =sys.$checkNull( []); 
  for (const R  of sys.$forObject( Rs)) {
    arr.push(Trs, Q("tr")
      .add(Q("td")
        .klass("borderWhite")
        .text(R[0]))
      .add(mkTdN(R[1], 2))
      .add(mkTdN(R[2], 4))
      .add(mkTdN(R[3], 0))
      .add(mkTdN(R[4], 0))
    );
  }
   return Trs;
};



 function mkTdN(n, dec)  {sys.$params(arguments.length, 2);  return Q("td")
    .klass("fnumber")
    .text(sys.asBool(sys.$eq(i18n.getLang() , "es"))
        ? math.toIso(n, dec)
        : math.toEn(n, dec)
      )
  ;};
