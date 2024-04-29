import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// Main module.

import "KtWeb/rp";
import "db";
import "cts";
import "pgs/homePg";

// \ -> s
help = \ -> return "-""
  Use {PRG} [help | version | init | key rq]
  where
    help: Shows this message.
    version: Shows program version.
    init: Initializes program.
          Must be called only the first time that the program is run.
    key rq: Requests 'rq' with 'key'. (Sent by browser)
  "-"";;

:arr Args = sys.args();

if (Args.size() == 1) {
  switch (Args[0]) {
    "version": sys.println(cts.version);
    "init": db.init();
    default: sys.println(help());
  }
  return;
}

if (Args.size() != 2) {
  sys.println(help());
  return;
}

key = Args[0];
rp.init(key);

:: Rq = js.r(Args[1]);
sys.print(switch(Rq.source) {
  "Home": homePg.process(Rq);
  default: sys.throw("Value of source (" + Rq.source + ") is not valid");
});
`);

  const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("prgF")
    .att("id", "dateF")
    .value(""))
  ;
  const prgF =sys.$checkNull( ui.field("dateF")
    .att("id", "prgF")
    .value(""))
  ;


  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.format(now,"%D-" + month + "-%Y"));
    if (sys.$eq(str.trim(prgF.getValue()) , "")) prgF.value("myPrg");

    textArea.text(str
      .replace(tx,'"-""', '"""')
      .replace("{DATE}", str.trim(dateF.getValue()))
      .replace("{PRG}", str.trim(prgF.getValue()))
    );
  };

  


  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  prgF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  prgF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});


  wg
    .removeAll()
    .add(Q("p")
      .style("text-align:left")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); update();})
        .klass("link")
        .text(II("Update"))))
    .add(Q("hr"))
    .add(ui.hrule(II("Date") + ":", 25))
    .add(dateF)
    .add(ui.hrule(II("Command") + ":", 25))
    .add(prgF)
    .add(Q("hr"))
  ;

  update();
};
