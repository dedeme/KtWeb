import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// {TYPE} table.

import "cts";
import "data/{OBJECT}";

fpath = path.cat([cts.dataPath, "{OBJECT}.tb"]);

/// Initializes table.
/// \ -> ()
{INIT}

/// Reads table.
/// \ -> {TYPE}
{READ}
{READJS}
/// Writes table.
/// \{TYPE} -> ()
{WRITE}{WRITEJS}
`);

  const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("objectF")
    .att("id", "dateF")
    .value(""))
  ;

  const objectF =sys.$checkNull( ui.field("dateF")
    .att("id", "objectF")
    .value(""))
  ;

  const arrayCh =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(true))
  ;

  const toCh =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(false))
  ;

  const fromCh =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(false))
  ;

  const readJsCh =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(false))
  ;

  const writeJsCh =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(false))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.format(now,"%D-" + month + "-%Y"));
    if (sys.$eq(str.trim(objectF.getValue()) , ""))
      objectF.value("myObject");

    const obj =sys.$checkNull( str.trim(objectF.getValue()));
    const type =sys.$checkNull( arrayCh.isChecked() ? "[<" + obj + ">.]" : "<" + obj + ">");

    const init =sys.$checkNull( arrayCh.isChecked()
      ? "init = \\ -> if (!file.exists(fpath)) write([]);;"
      : "init = \\ -> if (!file.exists(fpath)) write(" +
        obj + ".newDefault());;")
    ;

    const read1 =sys.$checkNull( "read = \\ -> return ");
    const read2 =sys.$checkNull( "js.r(file.read(fpath))");
    const read =sys.$checkNull( fromCh.isChecked()
      ? arrayCh.isChecked()
        ? read1 + "arr.map(" + read2 + ", " + obj + ".fromJs);;"
        : read1 + obj + ".fromJs(" + read2 + ");;"
      : read1 + read2 + ";;")
    ;

    const readJs =sys.$checkNull( readJsCh.isChecked()
      ? String.raw
`
/// Reads table as JSON string.
/// \ -> s
readJs = \ -> return file.read(fpath);;
`
      : "")
    ;

    const par =sys.$checkNull( arrayCh.isChecked() ? "tb" : "o");
    const write1 =sys.$checkNull( "write = \\" + par + " -> file.write(fpath, js.w(");
    const write2 =sys.$checkNull( "));;");
    const write =sys.$checkNull( toCh.isChecked()
      ? arrayCh.isChecked()
        ? write1 + "arr.map(tb, " + obj + ".toJs)" + write2
        : write1 + obj + ".toJs(o)" + write2
      : write1 + par + write2)
    ;

    const writeJs =sys.$checkNull( writeJsCh.isChecked()
      ? String.raw
`

/// Writes table as JSON string.
/// \s -> ()
writeJs = \s -> file.write(fpath, s);;
`
      : "")
    ;

    textArea.text(str
      .replace(tx,"{DATE}", str.trim(dateF.getValue()))
      .replaceAll("{OBJECT}", obj)
      .replaceAll("{TYPE}", type)
      .replace("{INIT}", init)
      .replace("{READ}", read)
      .replace("{READJS}", readJs)
      .replace("{WRITE}", write)
      .replace("{WRITEJS}", writeJs)
    );
  };

  

  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  objectF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  objectF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  arrayCh.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  toCh.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  fromCh.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  readJsCh.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  writeJsCh.on("change", function(e)  {sys.$params(arguments.length, 1); update();});

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
    .add(ui.hrule(II("Object") + ":", 25))
    .add(objectF)
    .add(Q("p")
      .add(arrayCh)
      .add(Q("span")
        .text(II("Array"))))
    .add(Q("p")
      .add(toCh)
      .add(Q("span")
        .text(II("With toJs"))))
    .add(Q("p")
      .add(fromCh)
      .add(Q("span")
        .text(II("With fromJs"))))
    .add(ui.hrule(II("Functions") + ":", 25))
    .add(Q("p")
      .add(readJsCh)
      .add(Q("span")
        .text(II("Add readJs"))))
    .add(Q("p")
      .add(writeJsCh)
      .add(Q("span")
        .text(II("Add writeJs"))))
    .add(Q("hr"))
  ;

  update();
};
