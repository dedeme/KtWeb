import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as changePassPg from  "../pgs/changePassPg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const {lang} = await  client.send ({
    prg: "Main",
    source: "Settings",
    rq: "getLang"
  });

  

  
   async  function changeLang(ev)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: "Main",
      source: "Settings",
      rq: "setLang",
      lang: sys.$eq(lang , "es") ? "en" : "es"
    });
    window.location.reload(true);
  };

  
   function onChangePass(ev)  {sys.$params(arguments.length, 1);
    changePassPg.mk(wg, function() {sys.$params(arguments.length, 0); mk(wg);});
  };

  

  wg
    .removeAll()
    .add(Q("div")
      .style("text-align:center")
      .add(Q("div")
        .klass("head")
        .html(II("Settings")))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .add(Q("div")
              .add(ui.link(changeLang)
                .klass("link")
                .html(i18n.fmt(
                  II("Change Language to %0"),
                  [sys.$eq(lang , "es") ? "EN" : "ES"]
                ))))
            .add(Q("p")
              .html("<p></p>"))
            .add(Q("div")
              .add(ui.link(onChangePass)
                .klass("link")
                .html(II("Change Password"))))))))
  ;
};
