import * as iter from './_js/iter.js';import * as str from './_js/str.js';import * as bytes from './_js/bytes.js';import * as cryp from './_js/cryp.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as js from './_js/js.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as math from './_js/math.js';import * as domo from './_js/domo.js';import * as ui from './_js/ui.js';import * as arr from './_js/arr.js';import * as time from './_js/time.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';




import * as menu from  "./libdm/menu.js";
import * as cts from  "./data/cts.js";
import * as month from  "./data/month.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as yearPg from  "./pgs/yearPg.js";
import * as budgetPg from  "./pgs/budgetPg.js";
import * as planPg from  "./pgs/planPg.js";
import * as fns from  "./fns.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (sys.asBool(!sys.asBool(ok))) {
    ui.alert(II("KtWeb session is closed.\nAuthenticating from KtWeb:Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  const Rp =sys.$checkNull( await  client.send({
    prg: "Main", 
    source: "Main",
    rq: "lang"
  }));
  if (sys.asBool(sys.$eq(Rp.lang , "en"))) i18n.en();

  const Url =sys.$checkNull( ui.url());

  const now =sys.$checkNull( time.now());
  const page =sys.$checkNull(sys.asBool( dic.hasKey(Url, "0")) ? Url["0"] : "budget");

  const currentYear =sys.$checkNull( time.fmt("%Y", now));
  const selectedYear =sys.$checkNull(sys.asBool( dic.hasKey(Url, "1"))
    ? fns.validateYear(Url["1"])
    : currentYear)
  ;

  const isUntil =sys.$checkNull(sys.asBool( dic.hasKey(Url, "2"))
    ? sys.$eq(Url["2"] , "true")
    : false)
  ;

  const currentMonth =sys.$checkNull( time.month(now));
  const selectedMonth =sys.$checkNull(sys.asBool( dic.hasKey(Url, "3"))
    ? month.toIx(Url["3"])
    : currentMonth)
  ;

  const selLink =sys.$checkNull( page + "&" + selectedYear);
  const myear =sys.$checkNull( menu.tlink("year&" + selectedYear, selectedYear, []));
  if (sys.asBool(sys.$neq(selectedYear , currentYear))) myear.wg.setStyle("color", "#800000");
  const Lopts =sys.$checkNull( [
    myear,
    menu.separator(),
    menu.tlink("budget&" + selectedYear, II("Budget"), []),
    menu.separator(),
    menu.tlink("plan&" + selectedYear, II("Plan"), [])
  ]);
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], selLink, false));

  const body =sys.$checkNull( Q("div"));
  switch (page) {
    case "year":{ yearPg.mk(body, selectedYear);break;}
    case "plan":{ planPg.mk(body, selectedYear);break;}
    default:{ budgetPg.mk(
        body, selectedYear, isUntil, selectedMonth
      );}
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
;

load();

try{ {
  Q("#autofocus").e.focus();
}} catch (e){ {}}