import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as modalBox from  "./libdm/modalBox.js";
import * as dms from  "./data/dms.js";

const Q =sys.$checkNull( ui.q);


export const appName =sys.$checkNull( "WallpapersDesign");

export const version =sys.$checkNull( "2024.05");

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


export const boxContent =sys.$checkNull( Q("div"));


export const box =sys.$checkNull( modalBox.mk(boxContent, false));


export const pixelsCut =sys.$checkNull( 0);


export const ratioBlur =sys.$checkNull( 85);


export const Dims =sys.$checkNull( {
  "1280 x 1024": dms.mk(1280, 1024),
  "1080 x 2310": dms.mk(1080, 2310),
  "1920 x 1080": dms.mk(1920, 1080)
});
