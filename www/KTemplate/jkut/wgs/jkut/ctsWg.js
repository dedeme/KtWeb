import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx = String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// Constants.

Q = ui.q;

/// Application name.
/// s
appName = "{NAME}";
/// Application version.
/// s
version = "{VERSION}";
/// Page foot.
/// <domo>
foot = Q("table")
  .klass("main")
  .add(Q("tr")
    .add(Q("td")
      .add(Q("hr"))))
  .add(Q("tr")
    .add(Q("td")
      .style("text-align: right;color:#808080;font-size:x-small;")
      .html(str.fmt("- © ºDeme. %v (%v) -", [appName, version]))))
;
`;

   const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("nameF")
    .att("id", "dateF")
    .value(""))
  ;

  const nameF =sys.$checkNull( ui.field("versionF")
    .att("id", "nameF")
    .value("Name"))
  ;

  const versionF =sys.$checkNull( ui.field("dateF")
    .att("id", "versionF")
    .value(""))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.fmt(now,"%D-" + month + "-%Y"));
    if (sys.$eq(str.trim(nameF.getValue()) , ""))
      nameF.value("Name");
    if (sys.$eq(str.trim(versionF.getValue()) , ""))
      versionF.value(time.fmt(now,"%Y.%M"));

    textArea.text(str
      .replace(tx,"{DATE}", str.trim(dateF.getValue()))
      .replace("{NAME}", str.trim(nameF.getValue()))
      .replace("{VERSION}", str.trim(versionF.getValue()))
    );
  };

  


  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  nameF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  nameF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  versionF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  versionF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});

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
    .add(ui.hrule(II("Application Name") + ":", 25))
    .add(nameF)
    .add(ui.hrule(II("Application version") + ":", 25))
    .add(versionF)
    .add(Q("hr"))
  ;

  update();
};
