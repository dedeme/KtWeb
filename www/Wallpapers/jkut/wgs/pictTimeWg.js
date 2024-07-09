import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as pict from  "../data/pict.js";
import * as global from  "../global.js";
import * as cts from  "../cts.js";
import * as media from  "../media.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(topPadding)  {sys.$params(arguments.length, 1);
  const topPadding2 =sys.$checkNull( topPadding - media.screenHeight / 2);
  const leftPadding =sys.$checkNull( "" + (media.screenWidth / 2) - 20);

  const content =sys.$checkNull( Q("div"));
  const wg =sys.$checkNull( Q("div")
    .style(
        "z-index:4;" +
        "position:relative;" +
        "top: " + topPadding2 + "px;" +
        "left: " + leftPadding  + "px;" +
        "opacity:0;" +
        "transition: opacity 1s linear;"
      )
    .add(content))
  ;

  
   async  function show(value)  {sys.$params(arguments.length, 1);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "PictTimeWg",
      rq: "changePictTime",
      dbKey: global.dbKeyV[0],
      value:value
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
    content
      .removeAll()
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .style("font-size: 40px")
            .html("&nbsp;" + value + "&nbsp"))))
    ;

    wg.setStyle("opacity", "1");
    timer.delay(1500, function() {sys.$params(arguments.length, 0); wg.setStyle("opacity", "0");});
  };

   return {wg:wg, show:show};
};
