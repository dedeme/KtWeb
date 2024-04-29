import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  async  function mk(wg, selectedYear)  {sys.$params(arguments.length, 2);
    const {Years} 
  = await  client.send({
    prg: cts.appName,
    source: "YearPg",
    rq: "idata"
  });
  arr.sort(Years,function(y1, y2)  {sys.$params(arguments.length, 2);  return y1 < y2;});

  
   function td(y)  {sys.$params(arguments.length, 1);  return Q("td")
    .style("text-align:center")
    .add(
      sys.$eq(y , selectedYear)
        ? Q("span")
          .klass("frame")
          .html("·" + y + "·")
        : ui.link(function(ev)  {sys.$params(arguments.length, 1); window.location.replace("?year&" + y);})
            .klass("link")
            .html("·" + y + "·"))
  ;};

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .html(II("Change of Year")))
    .add(Q("table")
      .att("align", "center")
      .adds(arr.map(Years,function(y)  {sys.$params(arguments.length, 1);  return Q("tr").add(td(y));})))
  ;
};
