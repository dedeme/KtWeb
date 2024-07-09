import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, reload)  {sys.$params(arguments.length, 2);
  const {dbKey, picture, shortDance, longDance} 
  = await  client.send({
    prg: cts.appName,
    source: "TimesPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

  

  
   async  function send(key, value)  {sys.$params(arguments.length, 2);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "TimesPg",
      rq: "update",
      dbKey: global.dbKeyV[0],
      key:key,
      value:value
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
  };

  

  
   function td(n)  {sys.$params(arguments.length, 1);  return Q("td")
      .style("text-align:center")
      .text("" + n)
    ;};

  
   function op(group, value, sel)  {sys.$params(arguments.length, 3);  return Q("td")
      .style("text-align:center")
      .add(Q("input")
        .att("type", "radio")
        .att("name", group)
        .checked(sys.$eq(value , sel))
        .on("click", function(e)  {sys.$params(arguments.length, 1); send(group, value);}))
    ;};

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Times Management")))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); reload();})
            .klass("link")
            .text("[ " + II("Back") + " ]")))))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(ui.hrule(II("Picture"), 20))))
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .add(Q("table")
            .add(Q("tr")
              .add(op("pict", 1, picture))
              .add(op("pict", 2, picture))
              .add(op("pict", 3, picture))
              .add(op("pict", 4, picture))
              .add(op("pict", 5, picture))
              .add(op("pict", 6, picture)))
            .add(Q("tr")
              .add(td(1))
              .add(td(2))
              .add(td(3))
              .add(td(4))
              .add(td(5))
              .add(td(6)))
            .add(Q("tr")
              .add(op("pict", 10, picture))
              .add(op("pict", 12, picture))
              .add(op("pict", 15, picture))
              .add(op("pict", 20, picture))
              .add(op("pict", 30, picture))
              .add(op("pict", 60, picture)))
            .add(Q("tr")
              .add(td(10))
              .add(td(12))
              .add(td(15))
              .add(td(20))
              .add(td(30))
              .add(td(60))))))
      .add(Q("tr")
        .add(Q("td")
          .add(ui.hrule(II("Short Dance"), 20))))
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .add(Q("table")
            .add(Q("tr")
              .add(op("shortDance", 10, shortDance))
              .add(op("shortDance", 15, shortDance))
              .add(op("shortDance", 20, shortDance))
              .add(op("shortDance", 25, shortDance))
              .add(op("shortDance", 30, shortDance)))
            .add(Q("tr")
              .add(td(10))
              .add(td(15))
              .add(td(20))
              .add(td(25))
              .add(td(30))))))
      .add(Q("tr")
        .add(Q("td")
          .add(ui.hrule(II("Long Dance"), 20))))
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .add(Q("table")
            .add(Q("tr")
              .add(op("longDance", 30, longDance))
              .add(op("longDance", 45, longDance))
              .add(op("longDance", 60, longDance))
              .add(op("longDance", 75, longDance))
              .add(op("longDance", 90, longDance)))
            .add(Q("tr")
              .add(td(30))
              .add(td(45))
              .add(td(60))
              .add(td(75))
              .add(td(90)))))))
  ;

};
