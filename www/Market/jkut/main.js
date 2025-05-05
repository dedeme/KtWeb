import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';




import * as dmenu from  "./wgs/dmenu.js";
import * as msg from  "./wgs/msg.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as homePg from  "./pgs/home/homePg.js";
import * as settingsPg from  "./pgs/settings/settingsPg.js";
import * as accPg from  "./pgs/acc/accPg.js";
import * as dailyPg from  "./pgs/daily/dailyPg.js";
import * as verificationPg from  "./pgs/verification/verificationPg.js";
import * as cts from  "./cts.js";
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

   const LcPath =sys.$checkNull( ui.url());
  if (!sys.asBool(LcPath)) arr.push(LcPath,"home");

  const target =(   
      sys.$eq(LcPath[0],"daily")|| sys.$eq(LcPath[0],"acc")|| sys.$eq(LcPath[0],"verification")|| sys.$eq(LcPath[0],"settings")? LcPath[0]:
       "home"
    );
  arr.shift(LcPath);

  const menuDiv =sys.$checkNull( Q("div"));
  const bodyDiv =sys.$checkNull( Q("div"));
  const menuWg =sys.$checkNull( dmenu.mk(menuDiv, target));

  switch (target) {
    case "daily":{ dailyPg.mk(bodyDiv, menuWg, LcPath);break;}
    case "acc":{ accPg.mk(bodyDiv, menuWg, LcPath);break;}
    case "verification":{ verificationPg.mk(bodyDiv);break;}
    case "settings":{ settingsPg.mk(bodyDiv, menuWg, LcPath);break;}
    default:{ homePg.mk(bodyDiv);}
  }

  wg
    .removeAll()
    .add(menuDiv)
    .add(bodyDiv)
  ;
};



const wg =sys.$checkNull( Q("div"));


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
  .add(msg.wg)
;

mk(wg);
