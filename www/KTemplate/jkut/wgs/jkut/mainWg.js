import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// Program starting.

import "cts";
import "pgs/msgPg";
import "i18n";

Q = ui.q;
II = i18n.tlt;

// \<domo> -> ()
mk = async \wg -> {
  ok = await client.connect();
  if (!ok) {
    ui.alert(II("Session is closed.\nAuthenticating from Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  // Sessions control is in "{CONTROL}" !!!
  , lang : await client.send({
    {LANG}
    source: "Main",
    rq: "lang"
  });
  if (lang == "en") i18n.en();

  // Control -------------------------------------------------------------------

  // View ----------------------------------------------------------------------

  wg
    .removeAll()
  ;
};

// Main ========================================================================

wg = Q("div");

// Client must be initilized with "{INIT}" !!!
client.init(true, "{INIT}", \isExpired -> {
  message = isExpired
    ? II("Session is expired.")
    : II("Data base is out of date.")
  ;
  msgWg = Q("div");
  msgPg.mk(msgWg, message, true);
  Q("@body")
    .removeAll()
    .add(msgWg)
    .add(cts.foot)
  ;
});

Q("@body")
  .removeAll()
  .add(wg)
  .add(cts.foot)
;

mk(wg);
`);

  const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("dateF")
    .att("id", "dateF")
    .value(""))
  ;

  const ktWebBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(true))
  ;

  const KutPostBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(false))
  ;


  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.format(now,"%D-" + month + "-%Y"));

    textArea.text(str
      .replace(tx,"{DATE}", str.trim(dateF.getValue()))
      .replace("{LANG}", ktWebBt.isChecked()
          ? 'prg: "Main", // Call to KtWeb:Main'
          : 'prg: "KutPost", // Call to KutPost:KutPost'
        )
      .replace("{CONTROL}", ktWebBt.isChecked() ? "KtWeb:Main" : "KutPost")
      .replaceAll("{INIT}", ktWebBt.isChecked() ? "KtWeb" : "KutPost")
    );
  };

  

  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  ktWebBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  KutPostBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});

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
    .add(Q("hr"))
    .add(Q("p")
      .add(ktWebBt)
      .add(Q("span")
        .text("KtWeb")))
    .add(Q("p")
      .add(KutPostBt)
      .add(Q("span")
        .text("KutPost")))
    .add(Q("hr"))
  ;

  update();
};
