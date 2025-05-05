import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx = String.raw
`logDiv = Q("div");

// \(\[<logRow>.]->()) -> ()
load = async \fn -> {
  , :arr Log : await client.send({
    prg: cts.appName,
    source: "{SOURCE}",
    rq: "getLog"
  });
  fn(Log);
};

// \(\->()) -> ()
reset = async \fn -> {
  await client.send({
    prg: cts.appName,
    source: "{SOURCE}",
    rq: "resetLog"
  });
  fn();
};

// \s -> s
tlt = \tx -> return switch (tx) {
  "All log entries will be deleted.\nContinue?":
    II("All log entries will be deleted.\nContinue?");
  "2 Days": II("2 Days");
  "All": II("All");
  "Reload": II("Reload");
  "Delete": II("Delete");
  "Errors": II("Errors");
  "Log": II("Log");
  default: tx;
};;

log.mk(logDiv, load, reset, tlt, true, 100, 25);
`;

  const sourceF =sys.$checkNull( ui.field("sourceF")
    .att("id", "sourceF")
    .value(""))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(sourceF.getValue()) , ""))
      sourceF.value("Home");

    textArea.text(str
      .replace(tx,"{SOURCE}", str.trim(sourceF.getValue()))
    );
  };

  

  sourceF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  sourceF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});

  wg
    .removeAll()
    .add(Q("p")
      .style("text-align:left")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); update();})
        .klass("link")
        .text(II("Update"))))
    .add(Q("hr"))
    .add(ui.hrule(II("Source") + ":", 25))
    .add(sourceF)
    .add(Q("hr"))
  ;

  update();
};
