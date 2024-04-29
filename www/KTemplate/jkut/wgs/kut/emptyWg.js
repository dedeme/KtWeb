import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// {OVERVIEW}
`);

  const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("overviewTA")
    .att("id", "dateF")
    .value(""))
  ;

  const overviewTA =sys.$checkNull( Q("textarea")
    .att("id", "overviewTA")
    .att("cols", 40)
    .att("rows", 5)
    .att("spellcheck", false)
    .text("Overview"))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.format(now,"%D-" + month + "-%Y"));
    if (sys.$eq(str.trim(overviewTA.getValue()) , ""))
      overviewTA.value("Overview");

    textArea.text(str
      .replace(tx,"{DATE}", str.trim(dateF.getValue()))
      .replace("{OVERVIEW}", str.trim(overviewTA.getValue()))
    );
  };

  

  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  overviewTA.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  overviewTA.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});

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
    .add(ui.hrule(II("Overview") + ":", 25))
    .add(overviewTA)
    .add(Q("hr"))
  ;

  update();
};
