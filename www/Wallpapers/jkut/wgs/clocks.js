import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as clock from  "../libdm/clock.js";
import * as pict from  "../data/pict.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);






export  function mk(wg)  {sys.$params(arguments.length, 1);
  const cl =sys.$checkNull( clock.mk());
  clock.setWidth(cl, clock.width(cl) * 2);
  clock.setHeight(cl, clock.height(cl) * 2);
  const clWg =sys.$checkNull( clock.wg(cl));
  clWg.style(
    "opacity:0;" +
    "transition: opacity 2s linear;"
  );
  const ch =sys.$checkNull( clock.mkChron());
  clock.setWidth(ch, clock.width(ch) * 2);
  clock.setHeight(ch, clock.height(ch) * 2);
  const chWg =sys.$checkNull( clock.wg(ch));
  chWg.style(
    "background:radial-gradient(#000333,#e6f6f6);" +
    "border: 1px solid rgb(110,130,150);" +
    "border-radius: 44px;" +
    "opacity:0;" +
    "transition: opacity 2s linear;"
  );

  wg
    .removeAll()
    .add(Q("table")
      .add(Q("tr")
        .add(Q("td")
          .add(clWg))
        .add(Q("td")
          .add(chWg))))
  ;

  
  
   function clockChangeOpacity()  {sys.$params(arguments.length, 0);
    const isHidden =sys.$checkNull( sys.$eq(clWg.e.style.getPropertyValue("opacity") , "0"));
    clWg.setStyle("opacity", isHidden ? "1" : "0");
  };

  
  
   function chronChangeOpacity()  {sys.$params(arguments.length, 0);
    const isHidden =sys.$checkNull( sys.$eq(chWg.e.style.getPropertyValue("opacity") , "0"));
    chWg.setStyle("opacity", isHidden ? "1" : "0");
  };

  
  
   function chronOutOfTime()  {sys.$params(arguments.length, 0);
    chWg.setStyle("background", "radial-gradient(#330300,#f6f6e6)");
  };

   return {clockChangeOpacity:clockChangeOpacity, chronChangeOpacity:chronChangeOpacity, chronOutOfTime:chronOutOfTime};
};
