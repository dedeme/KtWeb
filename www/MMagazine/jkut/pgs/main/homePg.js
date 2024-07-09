import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as log from  "../../libdm/log.js";
import * as cts from  "../../cts.js";
import * as paramsEval from  "../../data/paramsEval.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
  const {ipsEval, model, psEval}
  = await  client.send({
    prg: cts.appName,
    module: "Main",
    source: "HomePg",
    rq: "idata"
  });

  const iparsEval =sys.$checkNull( paramsEval.fromJs(ipsEval));
  const parsEval =sys.$checkNull( paramsEval.fromJs(psEval));

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
    .adds(arr.map([0, 1], function(i)  {sys.$params(arguments.length, 1);  return Q("div").klass("separator");}))
    .add(Q("table")
      .klass("frame")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(Q("span")
            .html(
              "El mejor resultado del modelo usado por el inversor es:<br>" +
              "<pre>" +
              "Inv (" +  model + sys.toStr(iparsEval[paramsEval.Params]) + ": " +
              math.toIso(iparsEval[paramsEval.ev], 0) + ") | Mejor (" +
              model + sys.toStr(parsEval[paramsEval.Params]) + ": " +
              math.toIso(parsEval[paramsEval.ev], 0) + ")" +
              "</pre>"
            )))))
    .add(logDiv)
  ;
};
