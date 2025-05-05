import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';




import * as menu from  "./libdm/menu.js";
import * as cts from  "./cts.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as authenticationPg from  "./pgs/authenticationPg.js";
import * as settingsPg from  "./pgs/settingsPg.js";
import * as homePg from  "./pgs/homePg.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (!sys.asBool(ok)) {
    authenticationPg.mk(wg, cts.appName, function()  {sys.$params(arguments.length, 0); mk(wg);});
    return;
  }

   const {lang} = await  client.send({
    prg: "Main",
    source: "Main",
    rq: "lang"
  });
  if (sys.$eq(lang , "en")) i18n.en();


  

   async  function close()  {sys.$params(arguments.length, 0);
    if (!sys.asBool(ui.confirm(II("Application exit?")))) {
      return;
    }
    await client.send({
      prg: "Main",
      source: "Main",
      rq: "close",
      sessionId: client.sessionId()
    });
    msgPg.mk(wg , i18n.fmt(II("Logout-message"), [cts.appName]), false);
  };

  

   const Url =sys.$checkNull( ui.url());
  const page =sys.$checkNull( arr.size(Url) > 0 ? Url[0] : "home");
  const menuWg =sys.$checkNull( menu.mk(
    [ menu.tlink("home", II("Home"))
    ],
    [ menu.tlink("settings", II("Settings")),
      menu.separator(),
      menu.close(close)
    ],
    page
  ));

  const body =sys.$checkNull( Q("div"));

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
  ;

  switch (page) {
    case "settings":{ settingsPg.mk(body);break;}
    default:{ homePg.mk(body);}
  }
};



const wg =sys.$checkNull( Q("div"));

client.init(true, "KtWeb", function(isExpired)  {sys.$params(arguments.length, 1);
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
;

mk(wg);
