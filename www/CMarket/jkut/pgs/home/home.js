import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as log from  "../../libdm/log.js";
import * as cts from  "../../data/cts.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    module: "Home",
    source: "Home",
    rq: "idata"
  }));

  const isActive =sys.$checkNull( Rp.isActive);

  const logDiv =sys.$checkNull( Q("div"));

  

  
   async  function activate(ev)  {sys.$params(arguments.length, 1);
    logDiv
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .add(ui.img("wait.gif")))))
    ;
    await client.send({
      prg: cts.appName,
      module: "Home",
      source: "Home",
      rq: "activate"
    });
    window.location.reload(true);
  };

  

  
   async  function load(fn)  {sys.$params(arguments.length, 1);
    const Rp =sys.$checkNull( await  client.send({
      prg: cts.appName,
      module: "Home",
      source: "Home",
      rq: "getLog"
    }));
    fn(arr.map(Rp.log, log.logRowFromJs));
  };

  
   async  function reset(fn)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      module: "Home",
      source: "Home",
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

  log.mk(logDiv, load, reset, tlt, true, 100, 25);

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Server")))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .att("colspan", 3)
          .style("text-align: center")
          .text(isActive
            ? II("Active")
            : II("Stopped"))))
      .add(Q("tr")
        .add(Q("td")
          .style("width:100px;text-align:center")
          .add(isActive
            ? Q("span")
              .text("* * *")
            : ui.link(activate)
              .klass("link")
              .text(II("Activate"))))))
    .add(Q("hr"))
    .add(logDiv)
  ;
};
