import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as oldChart from  "../../libdm/oldChart.js";
import * as model from  "../../data/model.js";
import * as result from  "../../data/result.js";
import * as modelEval from  "../../data/modelEval.js";
import * as i18n from  "../../i18n.js";
import * as fns from  "../../fns.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const isAssets =sys.$checkNull( 0);
const isWithdrawals =sys.$checkNull( 1);
const isCompanies =sys.$checkNull( 2);


export  async  function mk(wg, modelId)  {sys.$params(arguments.length, 2);
  
  const Params =sys.$checkNull( []);
  const Url =sys.$checkNull( ui.url());
  const uparamsOp =sys.$checkNull( arr.size(Url) > 2 ? [Url[2]] : []);
  if (!sys.asBool(!sys.asBool(uparamsOp))) {
    try{ {
      const A =sys.$checkNull( js.r(uparamsOp[0]));
      const ok =sys.$checkNull( arr.reduce(
        A, true, function(r, e)  {sys.$params(arguments.length, 2);  return r && sys.$eq(sys.type(e) , "number") && e >= 0;}
      ));
      if (ok) arr.push(Params, A);
    }} catch (e){ {}}
  }

  const Rp =sys.$checkNull( await  client.send({
    prg: "CMMarket",
    source: "HistoricPg",
    rq: "idata",
    modelId:modelId,
    params: Params 
  }));
  if (!sys.asBool(Rp.ok)) {
    ui.alert(i18n.fmt(II("%0%1 not found."), [modelId, sys.toStr(Params)]));
    window.location.assign("?");
    return;
  }
  const Model =sys.$checkNull( model.fromJs(Rp.model));
  const Result =sys.$checkNull( result.fromJs(Rp.result));
  const MdEval =sys.$checkNull( modelEval.fromJs(Rp["eval"]));
  const Dates =sys.$checkNull( Rp.dates); 
  const Assets =sys.$checkNull( Rp.assets); 
  const BuyCos =sys.$checkNull( Rp.buyCos); 
  const QuarantineCos =sys.$checkNull( Rp.quarantineCos); 
  const Withdrawals =sys.$checkNull( Rp.withdrawals); 

  
   function mkGr(type)  {sys.$params(arguments.length, 1);
    const Labels =sys.$checkNull( arr.map(Dates, function(d)  {sys.$params(arguments.length, 1);  return sys.$slice(d,4,6);}));

    const Ch =sys.$checkNull( oldChart.mkExample());
    Ch.ExArea.width =sys.$checkExists(Ch.ExArea.width,sys.$checkNull( 600));
    Ch.ExArea.height =sys.$checkExists(Ch.ExArea.height,sys.$checkNull( sys.$eq(type , isAssets) ? 300 : 150));
    Ch.InPadding.left =sys.$checkExists(Ch.InPadding.left,sys.$checkNull( 100));
    Ch.ExArea.Atts.background =sys.$checkExists(Ch.ExArea.Atts.background,sys.$checkNull( "#ffffff"));
    Ch.InAtts.background =sys.$checkExists(Ch.InAtts.background,sys.$checkNull( "#e9e9e9"));

    const Data =sys.$checkNull( oldChart.mkData(
      Labels,
      sys.$eq(type , isAssets)
        ? [arr.map(Assets, function(e) {sys.$params(arguments.length, 1); return [e];})]
        : sys.$eq(type , isCompanies)
          ? [ arr.map(BuyCos, function(e) {sys.$params(arguments.length, 1); return [e];}),
              arr.map(QuarantineCos, function(e) {sys.$params(arguments.length, 1); return [e];})
            ]
          : [arr.map(Withdrawals, function(e) {sys.$params(arguments.length, 1); return [e];})],
      sys.$eq(type , isCompanies)
        ? [ oldChart.mkLine(1, "#000080", false),
            oldChart.mkLine(1, "#800000", false)
          ]
        : [ oldChart.mkLine(1, "#000000", false)]
    ));
    Data.round =sys.$checkExists(Data.round,sys.$checkNull( 0));
    const PrevLabel =sys.$checkNull( [Labels[0]]);
    Data.drawLabel =sys.$checkExists(Data.drawLabel, function(l, i)  {sys.$params(arguments.length, 2);
      if (sys.$eq(i , 0))  return false;
      if (sys.$neq(l , PrevLabel[0]) && (sys.$eq(l , "01") || sys.$eq(l , "04") || sys.$eq(l , "07")|| sys.$eq(l , "10"))) {
        PrevLabel[0] =sys.$checkExists(PrevLabel[0],sys.$checkNull( l));
         return true;
      }
       return false;
    });
    const PrevLabel2 =sys.$checkNull( [Labels[0]]);
    Data.drawGrid =sys.$checkExists(Data.drawGrid, function(l, i)  {sys.$params(arguments.length, 2);
      if (sys.$eq(i , 0))  return false;
      if (sys.$neq(l , PrevLabel2[0]) && (sys.$eq(l , "01") || sys.$eq(l , "04") || sys.$eq(l , "07")|| sys.$eq(l , "10"))) {
        PrevLabel2[0] =sys.$checkExists(PrevLabel2[0],sys.$checkNull( l));
         return true;
      }
       return false;
    });

     return oldChart.mkWg(Ch, Data);
  };

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Historic")))
    .add(Q("div").klass("separator"))
    .add(Q("table")
      .att("align", "center")
      .klass("flat")
      .add(Q("tr")
        .add(Q("td")
          .klass("chead")
          .text(II("Model")))
        .adds(arr.map(Model.paramNames, function(n)  {sys.$params(arguments.length, 1);  return Q("td")
            .klass("rhead")
            .text(n)
          ;})))
      .add(Q("tr")
        .add(Q("td")
          .klass("cframe")
          .text(Model.name))
        .adds(iter.map(
          iter.$range(0,arr.size(MdEval.params)),
          function(i)  {sys.$params(arguments.length, 1);  return Q("td")
            .klass("rframe")
            .text(fns.paramFmt(Model.paramTypes[i], MdEval.params[i]))
          ;}))))
    .add(Q("div").klass("separator2"))
    .add(Q("table")
      .att("align", "center")
      .klass("flat")
      .add(Q("tr")
        .add(Q("td")
          .klass("rhead")
          .text(II("Assets")))
        .add(Q("td")
          .klass("rhead")
          .text(II("Profits (%)")))
        .add(Q("td")
          .klass("rhead")
          .text(II("Eval.")))
        .add(Q("td")
          .klass("rhead")
          .text(II("Sales"))))
      .add(Q("tr")
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(Result.assets, 2)))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(Result.profits * 100, 2)))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(fns.evaluate(
              Result.assets, Result.profits), 0
            )))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(Result.sales, 0)))))
    .add(Q("div").klass("separator2"))
    .add(Q("table")
      .att("align", "center")
      .klass("flat")
      .add(Q("tr")
        .add(Q("td")
          .klass("rhead")
          .text(II("H. Eval.")))
        .add(Q("td")
          .klass("rhead")
          .text(II("H. Sales")))
        .add(Q("td")
          .klass("rhead")
          .text(II("Eval.")))
        .add(Q("td")
          .klass("rhead")
          .text(II("Sales"))))
      .add(Q("tr")
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(fns.evaluate(MdEval.hassets, MdEval.hprofits), 0)))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(MdEval.hsales, 0)))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(fns.evaluate(MdEval.assets, MdEval.profits), 0)))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(MdEval.sales, 0)))))
    .add(Q("div")
      .klass("head")
      .text(II("Assets")))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(mkGr(isAssets)))))
    .add(Q("div")
      .klass("head")
      .text(II("Companies")))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("width: 8px")
          .add(ui.led("#000080", 6)))
        .add(Q("td")
          .style("width: 8px;text-align:left;white-space:nowrap;")
          .text(II("In portfolio")))
        .add(Q("td")
          .style("width: 8px")
          .text(" | "))
        .add(Q("td")
          .style("width: 8px")
          .add(ui.led("#800000", 6)))
        .add(Q("td")
          .style("text-align:left")
          .text(II("In quarantine"))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 5)
          .add(mkGr(isCompanies)))))
    .add(Q("div")
      .klass("head")
      .text(II("Withdrawals")))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(mkGr(isWithdrawals)))))
  ;
};
