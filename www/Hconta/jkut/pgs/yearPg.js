import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as all from  "../data/all.js";
import * as acc from  "../data/acc.js";
import * as cts from  "../cts.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as msgPg from  "../pgs/msgPg.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg)  {sys.$params(arguments.length, 1);
  const year =sys.$checkNull( all.currentYear());

  

    
     async  function changeYear(y)  {sys.$params(arguments.length, 1);
      if (arr.any(all.years(), function(year)  {sys.$params(arguments.length, 1);  return sys.$eq(year , y);})) {
         const {timeStamp} = await  client.send({
          prg: cts.appName,
          source: "Main",
          rq: "changeYear",
          timeStamp: all.timeStamp(),
          year: y
        });
        if (sys.$eq(timeStamp , ""))
          msgPg.mk(wg, II("Data base out of date."), true);
        else
          window.location.assign("?" + y);
      } else {
        ui.alert(i18n.fmt(II("Year %0 not found"), [y]));
      }
    };

    
     async  function closeYear()  {sys.$params(arguments.length, 0);
      const years =sys.$checkNull( all.years());
      const newYear =sys.$checkNull( math.toInt(math.fromStr(arr.peek(years))[0] + 1));
      acc.close(newYear);
      all.setCurrentYear("" + newYear);
      const ok =sys.$checkNull( await  all.send());
      if (!sys.asBool(ok)) {
        msgPg.mk(wg, II("Data base out of date."), true);
        return;
      }
      window.location.assign("?" + newYear);
    };

  

  
   function years()  {sys.$params(arguments.length, 0);
    
     function td(y)  {sys.$params(arguments.length, 1);  return Q("td")
      .add(
        sys.$eq(y , year)
          ? Q("span")
            .klass("frame")
            .html("·" + y + "·")
          : ui.link(function(ev)  {sys.$params(arguments.length, 1); changeYear(y);})
              .klass("link")
              .html("·" + y + "·")
      )
    ;};

     return Q("tr")
      .add(Q("td")
        .att("colspan", 2)
        .style("text-align:center;")
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
          .adds(arr.map(all.years(), function(y)  {sys.$params(arguments.length, 1);  return td(y);})))))
    ;
  };

  
   function close()  {sys.$params(arguments.length, 0); return Q("tr")
      .add(Q("td")
        .att("colspan", 2)
        .add(Q("button")
          .html(II("Close year"))
          .on("click", function(e)  {sys.$params(arguments.length, 1);
            if (ui.confirm(
              II("This operation only can be manually undone.\nContinue?")
            )) {
              closeYear();
            }
          })))
  ;};

  wg
    .removeAll()
    .add(Q("table")
      .style("width:100%;text-align:center")
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .html("<b>" + II("Year") + "<b>")))
      .add(Q("tr")
        .add(Q("td")
          .style("width:5px;white-space: nowrap;text-align:right")
          .html(II("Change")))
        .add(Q("td")
          .add(Q("hr"))))
      .add(years())
      .add(Q("tr")
        .add(Q("td")
          .style("width:5px;white-space: nowrap;text-align:right")
          .html(II("Close")))
        .add(Q("td")
        .add(Q("hr"))))
      .add(close()))
  ;
};
