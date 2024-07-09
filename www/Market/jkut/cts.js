import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export const appName = "Market";

export const version = "2024.04";

export const foot =sys.$checkNull( Q("table")
  .klass("main")
  .add(Q("tr")
    .add(Q("td")
      .add(Q("hr"))))
  .add(Q("tr")
    .add(Q("td")
      .style("text-align: right;color:#808080;font-size:x-small;")
      .html(str.fmt("- © ºDeme. %v (%v) -", [appName, version])))))
;


export const meNick = "<ME>";

export const ibexNick = "<IBEX>";

export const euroNick = "<EURO>";


export const trading = 1500000;

export const bet = 12000.0;

export const initialCapital = 300000.0;

export const [serverStopped, serverActive, serverSelected] =[0, 1, 2];

export const accountingQuotes = 250;


export const okMsg =sys.$checkNull( II("Operation successfully done."));

export const failMsg =sys.$checkNull( II("Operation failed.\nSee log."));


export const toBuyColors = [
  "rgba(160, 0, 0)",
  "rgba(224, 160, 0)",
  "rgba(240, 224, 0)"
];

export const toSellColors = [
  "rgba(0, 0, 160)",
  "rgba(0, 160, 224)",
  "rgba(0, 160, 0)"
];


export const {active, sleeping} ={"active":"active", "sleeping":"sleeping"};


export const [chartOrderNick, chartOrderDay, chartOrderSignal] =[0, 1, 2];
