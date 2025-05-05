import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as log from  "../../libdm/log.js";
import * as cts from  "../../cts.js";
import * as stRs from  "../../data/stRs.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const {invRs,  mdRs,  bestRs}
  = await  client.send({
    prg: cts.appName,
    module: "Main",
    source: "HomePg",
    rq: "idata"
  });

  const logDiv =sys.$checkNull( Q("div"));

  
   async  function load(fn)  {sys.$params(arguments.length, 1);
      const {Log} = await  client.send({
      prg: cts.appName,
      module: "Main",
      source: "HomePg",
      rq: "getLog"
    });
    fn(Log);
  };

  
   async  function reset(fn)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      module: "Main",
      source: "HomePg",
      rq: "resetLog"
    });
    fn();
  };

  
   function tlt(tx)  {sys.$params(arguments.length, 1); return (   
    sys.$eq(tx,"All log entries will be deleted.\nContinue?")?
      II("All log entries will be deleted.\nContinue?"):
    sys.$eq(tx,"2 Days")? II("2 Days"):
    sys.$eq(tx,"All")? II("All"):
    sys.$eq(tx,"Reload")? II("Reload"):
    sys.$eq(tx,"Delete")? II("Delete"):
    sys.$eq(tx,"Errors")? II("Errors"):
    sys.$eq(tx,"Log")? II("Log"):
     tx
  );};

  await log.mk(logDiv, load, reset, tlt, true, 100, 25);

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Strategy Results")))
    .add(Q("div")
      .klass("separator"))
    .add(Q("table")
      .klass("flat")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .klass("lhead")
          .text(II("Model")))
        .add(Q("td")
          .klass("rhead")
          .text(II("Params.")))
        .add(Q("td")
          .klass("rhead")
          .text(II("Points"))))
      .add(Q("tr")
        .add(Q("td")
          .klass("lframe")
          .text(II("Investor")))
        .add(Q("td")
          .klass("lframe")
          .text(invRs[stRs.model]))
        .add(Q("td")
          .klass("rframe")
          .text("[" +
              arr.join(
                arr.map(invRs[stRs.Params], function(p)  {sys.$params(arguments.length, 1);  return math.toIso(p, 2);}),
                ", "
              ) +
              "]"
            ))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(invRs[stRs.points], 0))))
      .add(Q("tr")
        .add(Q("td")
          .klass("lframe")
          .text(II("Best of Investor Model")))
        .add(Q("td")
          .klass("lframe")
          .text(mdRs[stRs.model]))
        .add(Q("td")
          .klass("rframe")
          .text("[" +
              arr.join(
                arr.map(mdRs[stRs.Params], function(p)  {sys.$params(arguments.length, 1);  return math.toIso(p, 2);}),
                ", "
              ) +
              "]"
            ))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(mdRs[stRs.points], 0))))
      .add(Q("tr")
        .add(Q("td")
          .klass("lframe")
          .text(II("Best Strategy")))
        .add(Q("td")
          .klass("lframe")
          .text(bestRs[stRs.model]))
        .add(Q("td")
          .klass("rframe")
          .text("[" +
              arr.join(
                arr.map(bestRs[stRs.Params], function(p)  {sys.$params(arguments.length, 1);  return math.toIso(p, 2);}),
                ", "
              ) +
              "]"
            ))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(bestRs[stRs.points], 0))))
      )
    .add(logDiv)
  ;
};
