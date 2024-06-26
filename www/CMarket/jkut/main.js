import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as cts from  "./data/cts.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as home from  "./pgs/home/home.js";
import * as acc from  "./pgs/acc/acc.js";
import * as dailyPg from  "./pgs/daily/dailyPg.js";
import * as verification from  "./pgs/verification/verification.js";
import * as settings from  "./pgs/settings/settings.js";
import * as dmenu from  "./wgs/dmenu.js";
import * as msg from  "./wgs/msg.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (!sys.asBool(ok)) {
    ui.alert(II("KtWeb session is closed.\nAuthenticating from KtWeb:Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  const Rp =sys.$checkNull( await  client.send({
    prg: "Main", 
    source: "Main",
    rq: "lang"
  }));
  if (sys.$eq(Rp.lang , "en")) i18n.en();

  const search =sys.$checkNull( window.location.search);
  const LcPath =sys.$checkNull( sys.$eq(search , "")
    ? []
    : sys.$slice(search,1,null).split("&"))
  ;
  if (!sys.asBool(LcPath)) LcPath.push("home");

  const target =sys.$checkNull((   
      sys.$eq(LcPath[0],"daily")|| sys.$eq(LcPath[0],"acc")|| sys.$eq(LcPath[0],"verification")|| sys.$eq(LcPath[0],"settings")? LcPath[0]:
       "home"
    ));
  arr.shift(LcPath);

  const menuDiv =sys.$checkNull( Q("div"));
  const bodyDiv =sys.$checkNull( Q("div"));
  const menu =sys.$checkNull( dmenu.mk(menuDiv, target));

  switch (target) {
    case "daily":{ dailyPg.mk(bodyDiv, menu, LcPath);break;}
    case "acc":{ acc.mk(bodyDiv, menu, LcPath);break;}
    case "verification":{ verification.mk(bodyDiv);break;}
    case "settings":{ settings.mk(bodyDiv, menu, LcPath);break;}
    default:{ home.mk(bodyDiv);}
  }

  wg
    .removeAll()
    .add(menuDiv)
    .add(bodyDiv)
  ;
};



const wg =sys.$checkNull( Q("div"));


export  function load()  {sys.$params(arguments.length, 0);
  mk(wg);
};

client.init(true, "KtWeb", function()  {sys.$params(arguments.length, 0);
  const msgWg =sys.$checkNull( Q("div"));
  msgPg.mk(msgWg, II("Session is expired."), true);
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
  .add(msg.wg)
;

load();
