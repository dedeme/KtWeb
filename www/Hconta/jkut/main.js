import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as menu from  "./libdm/menu.js";
import * as cts from  "./cts.js";
import * as all from  "./data/all.js";
import * as acc from  "./data/acc.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as yearPg from  "./pgs/yearPg.js";
import * as diaryPg from  "./pgs/diaryPg.js";
import * as cashPg from  "./pgs/cashPg.js";
import * as accsPg from  "./pgs/accsPg.js";
import * as summaryPg from  "./pgs/summaryPg.js";
import * as planPg from  "./pgs/planPg.js";
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

  await all.request();

   const Url =sys.$checkNull( ui.url());
  const page =sys.$checkNull( !sys.asBool(Url) ? "cash" : Url[0]);

  const year =sys.$checkNull( all.currentYear());
   const myear =sys.$checkNull( menu.tlink(year, year));

  const Lopts =sys.$checkNull( [
    myear,
    menu.separator(),
    menu.tlink("diary", II("Diary")),
    menu.separator(),
    menu.tlink("cash", II("Cash")),
    menu.separator(),
    menu.tlink("accs", II("Accs")),
    menu.separator(),
    menu.tlink("summaries", II("Summaries")),
    menu.separator(),
    menu.tlink("plan", II("Plan"))
  ]);
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], page));
  if (!sys.asBool(all.isLastYear())) myear.wg.setStyle("color", "#800000");

  const body =sys.$checkNull( Q("div"));

  switch (page) {
    case "diary":{ {
      const ac =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "");
      const ix =sys.$checkNull( arr.size(Url) > 2 ? Url[2]: "-");
      diaryPg.mk(body, ac, ix);
    }break;}
    case "cash":{{
      const ac =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "");
      const ix =sys.$checkNull( arr.size(Url) > 2 ? Url[2]: "-");
      cashPg.mk(body, ac, ix);
    }break;}
    case "accs":{ {
      const ac =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "57202");
      const ix =sys.$checkNull( arr.size(Url) > 2 ? Url[2]: "-");
      accsPg.mk(body, ac, ix);
    }break;}
    case "summaries":{ {
      const type =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "");
      const deep =sys.$checkNull( arr.size(Url) > 2 ? Url[2]: "-");
      summaryPg.mk(body, type, deep);
    }break;}
    case "plan":{ {
      const ac =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "57202");
      planPg.mk(body, ac);
    }break;}
    default:{ {
      if (sys.$eq(page , all.currentYear())) {
        yearPg.mk(body);
      } else {
        const ac =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "");
        const ix =sys.$checkNull( arr.size(Url) > 2 ? Url[2]: "-");
        cashPg.mk(body, ac, ix);
      }
    }}
  }

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
  ;
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
;

load();

try{ {
  Q("#autofocus").e.focus();
}} catch (e){ {}}
