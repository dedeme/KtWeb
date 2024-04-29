import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// Data base management.

import "cts";

klen = 20;
dbStateKeyTb = path.cat([cts.dataPath, "dbStateKey.tb"]);

/// Initializes data base
/// \ -> ()
init = \ -> {
  if (!file.exists(cts.dataPath)) {
    file.mkdir(cts.dataPath);
    file.write(path.cat([cts.dataPath, "version.tb"]), cts.dataVersion);
    file.write(dbStateKeyTb, cryp.genK(klen));

    return;
  }
  sys.throw("Data base already is initialized");
};

/// Returns the state identifier.
/// \ -> ();
readKey = \ -> return str.trim(file.read(dbStateKeyTb));;

/// Checks the state identifier 'key' and returns:
///   - If 'key' is valid, a new identifier.
///   - If 'key' is not valid, an empty string.
/// \s -> s
checkKey = \key -> {
  if (str.trim(file.read(dbStateKeyTb)) == key) {
    newKey = cryp.genK(klen);
    file.write(dbStateKeyTb, newKey);
    return newKey;
  }
  return "";
};
`);

  const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("dateF")
    .att("id", "dateF")
    .value(""))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.format(now,"%D-" + month + "-%Y"));

    textArea.text(str
      .replace(tx,"{DATE}", str.trim(dateF.getValue()))
    );
  };

  

  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});

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
  ;

  update();
};
