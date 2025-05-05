import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';




import * as menu from  "./libdm/menu.js";
import * as cts from  "./cts.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as summaryPg from  "./pgs/summaryPg.js";
import * as directoriesPg from  "./pgs/directoriesPg.js";
import * as fns from  "./fns.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (!sys.asBool(ok)) {
    ui.alert(II("Session is closed.\nAuthenticating from Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  
   const {lang} = await  client.send({
    prg: "Main", 
    source: "Main",
    rq: "lang"
  });
  if (sys.$eq(lang , "en")) i18n.en();

  const body =sys.$checkNull( Q("div"));
  const selV = ["summary"];
  const showV = [[]];

  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    const menuWg =sys.$checkNull( menu.mk(
      [ menu.toption("summary", II("Summary"),
          function() {sys.$params(arguments.length, 0); selV[0] =sys.$checkExists(selV[0], "summary"); showV[0](); }),
        menu.separator(),
        menu.toption("dirs", II("Directories"),
          function() {sys.$params(arguments.length, 0); selV[0] =sys.$checkExists(selV[0], "dirs"); showV[0](); })
      ],
      [], selV[0]
    ));

    wg
      .removeAll()
      .add(menuWg)
      .add(body)
    ;

    switch (selV[0]) {
      case "summary":{ summaryPg.mk(body);break;}
      case "dirs":{ directoriesPg.mk(body);break;}
      default:{ summaryPg.mk(body);}
    }
  });


  showV[0]();
};



const wg =sys.$checkNull( Q("div"));



export  function load()  {sys.$params(arguments.length, 0);
  mk(wg);
};


client.init(true, "KtWeb", function(isExpired)  {sys.$params(arguments.length, 1);
  const message =sys.$checkNull( isExpired
    ? II("Session is expired.")
    : II("Data base is out of date."))
  ;
  const msgWg =sys.$checkNull( Q("div"));
  msgPg.mk(msgWg, message, true);
  Q("@body")
    .removeAll()
    .add(msgWg)
    .add(cts.foot)
  ;
});

Q("@body")
  .removeAll()
  .add(wg)
  .add(cts.foot)
  .add(ui.upTop("up"))
  .add(fns.measureWg)
;

load();
