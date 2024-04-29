import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// Constants.

{IMPORT}/// Application name.
appName = "{NAME}";
/// Application version.
version = "{VERSION}";
{APP_PATH}/// Data version.
dataVersion = "{DVERSION}";
/// Data path.
dataPath = {DATA_PATH};
`);

  const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("nameF")
    .att("id", "dateF")
    .value(""))
  ;

  const nameF =sys.$checkNull( ui.field("versionF")
    .att("id", "nameF")
    .value(""))
  ;

  const versionF =sys.$checkNull( ui.field("dversionF")
    .att("id", "versionF")
    .value(""))
  ;

  const dversionF =sys.$checkNull( ui.field("dateF")
    .att("id", "dversionF")
    .value(""))
  ;

  const ktWebBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(true))
  ;

  const kutPostBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(false))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.format(now,"%D-" + month + "-%Y"));
    if (sys.$eq(str.trim(nameF.getValue()) , ""))
      nameF.value("NAME");
    if (sys.$eq(str.trim(versionF.getValue()) , ""))
      versionF.value(time.format(now,"%Y.%M"));
    if (sys.$eq(str.trim(dversionF.getValue()) , ""))
      dversionF.value(time.format(now,"%Y.%M"));

    const importTx =sys.$checkNull( ktWebBt.isChecked() ? 'import "KtWeb/global";\n\n': "");
    const appPathTx =sys.$checkNull( ktWebBt.isChecked()
      ? "/// Application path.\n" +
        'appPath = path.cat([global.root, "prgs", appName, "kut"]);\n'
      : "")
    ;
    const dataPathTx =sys.$checkNull( ktWebBt.isChecked()
      ? 'path.cat([global.cgiRoot, appName])'
      : 'path.cat([sys.home(), ".dmKutApp", "KutPost", appName])')
    ;

    textArea.text(str
      .replace(tx,"{IMPORT}", importTx)
      .replace("{DATE}", str.trim(dateF.getValue()))
      .replace("{NAME}", str.trim(nameF.getValue()))
      .replace("{VERSION}", str.trim(versionF.getValue()))
      .replace("{APP_PATH}", appPathTx)
      .replace("{DVERSION}", str.trim(dversionF.getValue()))
      .replace("{DATA_PATH}", dataPathTx)
    );
  };

  


  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  nameF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  nameF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  versionF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  versionF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  dversionF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dversionF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  ktWebBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  kutPostBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});

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
    .add(ui.hrule(II("Data base version") + ":", 25))
    .add(dversionF)
    .add(Q("hr"))
    .add(Q("p")
      .add(ktWebBt)
      .add(Q("span")
        .text("KtWeb")))
    .add(Q("p")
      .add(kutPostBt)
      .add(Q("span")
        .text("KutPost")))
    .add(Q("hr"))
  ;

  update();
};
