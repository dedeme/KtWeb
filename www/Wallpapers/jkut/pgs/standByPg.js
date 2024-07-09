import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as media from  "../media.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, reload)  {sys.$params(arguments.length, 2);

   const Visuals =sys.$checkNull( media.visuals());

  

  
   function goBack(e)  {sys.$params(arguments.length, 1);
    reload();
  };

  
   function keyDown(ev)  {sys.$params(arguments.length, 1);
    if (sys.$eq(ev.key , "ArrowUp")) {
      goBack(ev);
      ev.preventDefault();
      return;
    }
  };

  


  const div =sys.$checkNull( Visuals.div
    .setStyle("background-color", "#000000")
    .on("click", goBack))
  ;
  Visuals.img.setStyle("opacity", "0");

  Q("@body")
    .on("keydown", keyDown);

  wg
    .removeAll()
    .add(div)
  ;

  div.e.requestFullscreen();
};
