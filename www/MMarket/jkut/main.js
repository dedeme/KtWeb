import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';




import * as menu from  "./libdm/menu.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as summaryPg from  "./pgs/summaryPg.js";
import * as resultsPg from  "./pgs/resultsPg.js";
import * as mapsPg from  "./pgs/mapsPg.js";
import * as chartsPg from  "./pgs/chartsPg.js";
import * as descriptionPg from  "./pgs/descriptionPg.js";
import * as global from  "./global.js";
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

  
  const {initialCapital, evalSteps, minSales,
  ParamBases, ParamBaseIncs, ParamEnvIncs, Models,
  orderBuy, orderSell, daysLoss, noLossMultiplicator,
  Periods, datesInPeriod} = await  client.send({
    prg: cts.appName,
    source: "MainPg",
    rq: "idata"
  });

  global.initialCapitalV[0] = initialCapital;
  global.evalStepsV[0] = evalSteps;
  global.minSalesV[0] = minSales;
  for (const [k, v]  of sys.$forObject2( ParamBases)) dic.put(global.ParamBases, k, v);
  for (const [k, v]  of sys.$forObject2( ParamBaseIncs)) dic.put(global.ParamBaseIncs, k, v);
  for (const [k, v]  of sys.$forObject2( ParamEnvIncs)) dic.put(global.ParamEnvIncs, k, v);
  for (const m  of sys.$forObject( Models)) arr.push(global.Models, m);
  global.orderBuyV[0] = orderBuy;
  global.orderSellV[0] = orderSell;
  global.daysLossV[0] = math.toInt(daysLoss / 5) * 7; 
  global.noLossMultiplicatorV[0] = noLossMultiplicator;
  for (const p  of sys.$forObject( Periods)) arr.push(global.Periods, p);
  global.datesInPeriodV[0] = datesInPeriod;

   const Url =sys.$checkNull( ui.url());
  const page =sys.$checkNull( !sys.asBool(Url) ? "summary" : Url[0]);
  const optV = [page];

  const optSummaryV = ["summary"];
  const optDescriptionV = ["description"];
  const optResultsV = ["results"];
  const optMapsV = ["maps"];
  const optChartsV = ["charts"];

  if (arr.size(Url) > 1) {
    optV[0] += "&" + Url[1];
    optSummaryV[0] += "&" + Url[1];
    optResultsV[0] += "&" + Url[1];
    optMapsV[0] += "&" + Url[1];
    optChartsV[0] += "&" + Url[1];
    optDescriptionV[0] += "&" + Url[1];
  }
  if (arr.size(Url) > 2) {
    optV[0] += "&" + Url[2];
    optSummaryV[0] += "&" + Url[2];
    optResultsV[0] += "&" + Url[2];
    optMapsV[0] += "&" + Url[2];
    optChartsV[0] += "&" + Url[2];
    optDescriptionV[0] += "&" + Url[2];
  }
  if (arr.size(Url) > 3) {
    optV[0] += "&" + Url[3];
    optSummaryV[0] += "&" + Url[3];
    optResultsV[0] += "&" + Url[3];
    optMapsV[0] += "&" + Url[3];
    optChartsV[0] += "&" + Url[3];
    optDescriptionV[0] += "&" + Url[3];
  }

  

  const Lopts = [
    menu.tlink(optSummaryV[0], II("Summary")),
    menu.separator2(),
    menu.tlink(optResultsV[0], II("Results")),
    menu.separator(),
    menu.tlink(optMapsV[0], II("Hot Maps")),
    menu.separator(),
    menu.tlink(optChartsV[0], II("Charts")),
    menu.separator(),
    menu.tlink(optDescriptionV[0], II("Description"))
  ];
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], optV[0]));

  const body =sys.$checkNull( Q("div"));

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
  ;

  switch (page) {
    case "summary":{ summaryPg.mk(body);break;}
    case "results":{ resultsPg.mk(body);break;}
    case "maps":{ mapsPg.mk(body);break;}
    case "charts":{ chartsPg.mk(body);break;}
    case "description":{ descriptionPg.mk(body);break;}
    default:{ window.location.assign("?");}
  }

};



const wg =sys.$checkNull( Q("div"));


client.init(true, "KtWeb", function(isExpired)  {sys.$params(arguments.length, 1);
  const msg =sys.$checkNull( isExpired
    ? II("Session is expired.")
    : II("Data base is out of date."))
  ;
  const msgWg =sys.$checkNull( Q("div"));
  msgPg.mk(msgWg, msg, true);
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

mk(wg);
