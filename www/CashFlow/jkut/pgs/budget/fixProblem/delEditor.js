import * as math from '../../../_js/math.js';import * as js from '../../../_js/js.js';import * as arr from '../../../_js/arr.js';import * as client from '../../../_js/client.js';import * as bytes from '../../../_js/bytes.js';import * as str from '../../../_js/str.js';import * as ui from '../../../_js/ui.js';import * as dic from '../../../_js/dic.js';import * as timer from '../../../_js/timer.js';import * as time from '../../../_js/time.js';import * as storage from '../../../_js/storage.js';import * as b64 from '../../../_js/b64.js';import * as sys from '../../../_js/sys.js';import * as iter from '../../../_js/iter.js';import * as domo from '../../../_js/domo.js';import * as cryp from '../../../_js/cryp.js';




import * as diary from  "../../../data/diary.js";
import * as diaryEntry from  "../../../data/diaryEntry.js";
import * as dann from  "../../../data/dann.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  function mk(wg,  entry, fnOk)  {sys.$params(arguments.length, 3);
console.log( entry);
  const am =sys.$checkNull( entry[diaryEntry.am]);
   const Anns =sys.$checkNull( entry[diaryEntry.Anns]);

  const activatedV =sys.$checkNull( [false]);

  const showV =sys.$checkNull( [[]]);

  

  
   function active(value)  {sys.$params(arguments.length, 1);
    activatedV[0] =sys.$checkExists(activatedV[0],sys.$checkNull( value));
    showV[0]();
  };

  
   function ok(ev)  {sys.$params(arguments.length, 1);
    const sumV =sys.$checkNull( [0]);
    const ixV =sys.$checkNull( [1]);
    for (const  a  of sys.$forObject( Anns)) {
      if (sys.$eq(a[dann.id] , "")) {
        ui.alert(i18n.fmt(
          II("Account of annotation '%0' is missing"), ["" +ixV[0]]
        ));
        return;
      }
      sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( a[dann.am]));
      ixV[0] +=sys.$checkExists(ixV[0],sys.$checkNull( 1));
    }

    if (!sys.asBool(math.eq(sumV[0], am, 0.0001))) {
      ui.alert(i18n.fmt(
        II("Sum of annotations (%0) does not match the cash value (%1)"),
        [math.toIso(sumV[0], 2), math.toIso(am, 2)]
      ));
      return;
    }

    fnOk();
  };

  

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    wg.removeAll();
    if (!sys.asBool(activatedV[0])) return;

    wg
      .add(Q("table")
      .klass("main")
      .adds(arr.map(Anns,function( a)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .klass("frameTx")
              .text(sys.$eq(a[dann.id] , "") ? "---" : a[dann.id]))
            .add(Q("td")
              .klass("frameNm")
              .text(math.toIso(a[dann.am], 2)))
        ;}))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "3")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td"))
        .add(Q("td"))
        .add(Q("td")
          .style("text-align: right")
          .add(ui.link(ok).add(ui.img("ok"))))))
    ;
  });

  showV[0]();

   return {active:active};
};
