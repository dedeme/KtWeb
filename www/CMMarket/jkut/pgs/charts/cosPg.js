import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as modalBox from  "../../libdm/modalBox.js";
import * as oldChart from  "../../libdm/oldChart.js";
import * as model from  "../../data/model.js";
import * as result from  "../../data/result.js";
import * as modelEval from  "../../data/modelEval.js";
import * as i18n from  "../../i18n.js";
import * as fns from  "../../fns.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


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
    source: "CosPg",
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
  const Cos =sys.$checkNull( Rp.cos); 

  const Nlosses =sys.$checkNull( [0]);
  const RatiosSum =sys.$checkNull( [0.0]);


  const modalDiv =sys.$checkNull( Q("div"));
  const ModalBox =sys.$checkNull( modalBox.mk(modalDiv, true));
  const clientResultsDiv =sys.$checkNull( Q("div"));
  const GrDivs =sys.$checkNull( []); 

  const nrows =sys.$checkNull( math.toInt((arr.size(Cos) - 1) / 3) + 1);
  for (let i = 0;i < nrows; ++i) {
    const Row =sys.$checkNull( []); 
    for (let j = 0;j < 3; ++j) {
      const dv =sys.$checkNull( Q("div"));
      const ico =sys.$checkNull( i * 3 + j);
      if (ico < arr.size(Cos)) {
        wait(dv, Cos[ico]);
      }
      arr.push(Row, dv);
    }
    arr.push(GrDivs, Row);
  }

  
   function showBigChart(co, Data)  {sys.$params(arguments.length, 2);
    const Ch =sys.$checkNull( oldChart.mkExample());
    Ch.ExArea.width =sys.$checkExists(Ch.ExArea.width,sys.$checkNull( 800));
    Ch.ExArea.height =sys.$checkExists(Ch.ExArea.height,sys.$checkNull( 400));
    Ch.ExArea.Atts.background =sys.$checkExists(Ch.ExArea.Atts.background,sys.$checkNull( "#ffffff"));
    Ch.InAtts.background =sys.$checkExists(Ch.InAtts.background,sys.$checkNull( "#e9e9e9"));
    Ch.Labels.onPopup =sys.$checkExists(Ch.Labels.onPopup,sys.$checkNull( true));

    modalDiv
      .removeAll()
      .add(Q("div")
        .klass("head")
        .text(co))
      .add(oldChart.mkWg(Ch, Data))
      .add(Q("button")
        .text(II("Close"))
        .on("click", function(e)  {sys.$params(arguments.length, 1); modalBox.show(ModalBox, false);}))
    ;
    modalBox.show(ModalBox, true);
  };

  
   async  function mkCharts()  {sys.$params(arguments.length, 0);
    
     async  function mkChart(ico)  {sys.$params(arguments.length, 1);
      const co =sys.$checkNull( Cos[ico]);
      const div =sys.$checkNull( GrDivs[math.toInt(ico / 3)][ico % 3]);

      const Rp =sys.$checkNull( await  client.send({
        prg: "CMMarket",
        source: "CosPg",
        rq: "co",
        modelId:modelId,
        params: MdEval.params,
        co:co
      }));

      const Result =sys.$checkNull( result.fromJs(Rp.result));
      const Refs =sys.$checkNull( arr.dropWhile(Rp.refs, function(r)  {sys.$params(arguments.length, 1);  return r < 0;}));
      const skip =sys.$checkNull( arr.size(Rp.refs) - arr.size(Refs));
      const Dates =sys.$checkNull( arr.drop(Rp.dates, skip));
      const Labels =sys.$checkNull( arr.map(Dates, function(d)  {sys.$params(arguments.length, 1);  return sys.$slice(d,4,6);}));
      const Qs =sys.$checkNull( arr.drop(Rp.qs, skip));

      const RefsUp =sys.$checkNull( arr.fromIter(iter.map(
        iter.$range(0,arr.size(Qs)),
        function(i)  {sys.$params(arguments.length, 1);
          const q =sys.$checkNull( Qs[i]);
          const r =sys.$checkNull( Refs[i]);
           return r > q ? [r] : [];
        }
      )));
      const RefsDown =sys.$checkNull( arr.fromIter(iter.map(
        iter.$range(0,arr.size(Qs)),
        function(i)  {sys.$params(arguments.length, 1);
          const q =sys.$checkNull( Qs[i]);
          const r =sys.$checkNull( Refs[i]);
           return r < q ? [r] : [];
        }
      )));
      if (Result.profits < 0) Nlosses[0] +=sys.$checkExists(Nlosses[0],sys.$checkNull( 1));
      RatiosSum[0] +=sys.$checkExists(RatiosSum[0],sys.$checkNull( Result.profits));

      const Ch =sys.$checkNull( oldChart.mkExample());
      Ch.ExArea.width =sys.$checkExists(Ch.ExArea.width,sys.$checkNull( 300));
      Ch.ExArea.height =sys.$checkExists(Ch.ExArea.height,sys.$checkNull( 150));
      Ch.ExArea.Atts.background =sys.$checkExists(Ch.ExArea.Atts.background,sys.$checkNull( "#ffffff"));
      Ch.InAtts.background =sys.$checkExists(Ch.InAtts.background,sys.$checkNull( "#e9e9e9"));

      const Data =sys.$checkNull( oldChart.mkData(
        Labels,
        [ RefsUp,
          RefsDown,
          arr.map(Qs, function(q)  {sys.$params(arguments.length, 1);  return [q];})],
        [ oldChart.mkLine(1, "#4060a0", false),
          oldChart.mkLine(1, "#a06040", false),
          oldChart.mkLine(1, "#000000", false)
        ]
      ));

      Data.maxMinRound =sys.$checkExists(Data.maxMinRound, function(mx, mn)  {sys.$params(arguments.length, 2);  return mx > 10 ? 0 :  -1;});
      const PrevLabel =sys.$checkNull( [Labels[0]]);
      Data.drawLabel =sys.$checkExists(Data.drawLabel, function(l, i)  {sys.$params(arguments.length, 2);
        if (sys.$eq(i , 0))  return false;
        if (sys.$neq(l , PrevLabel[0]) && (sys.$eq(l , "01") || sys.$eq(l , "05") || sys.$eq(l , "09"))) {
          PrevLabel[0] =sys.$checkExists(PrevLabel[0],sys.$checkNull( l));
           return true;
        }
         return false;
      });
      Data.drawGrid =sys.$checkExists(Data.drawGrid, function(l, i)  {sys.$params(arguments.length, 2);  return false;});

      div
        .removeAll()
        .add(Q("table")
          .add(Q("tr")
            .add(Q("td")
              .style("text-align:left")
              .text(co))
            .add(Q("td")
              .style("text-align:right")
              .add(Q("span")
                .text(
                    math.toIso(Result.profits * 100, 2) + "% [" +
                    math.toIso(Result.sales, 0) + "] "
                  ))
              .add(ui.img(Result.profits < 0 ? "losses" : "profits")
                .style("vertical-align:middle"))))
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", 2)
              .add(oldChart.mkWg(Ch, Data)
                .on("click", function(e)  {sys.$params(arguments.length, 1); showBigChart(co, Data);})))))
      ;
    };

    for (let i = 0;i < arr.size(Cos); ++i) await mkChart(i);

    clientResultsDiv
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("rframe")
            .add(Q("span")
              .text("" + (arr.size(Cos) - Nlosses[0]) + " "))
            .add(ui.img("profits")
              .style("vertical-align: middle")))
          .add(Q("td")
            .klass("rframe")
            .add(Q("span")
              .text("" + Nlosses))
            .add(ui.img("losses")
              .style("vertical-align: middle")))
          .add(Q("td")
            .klass("rframe")
            .text(math.toIso(RatiosSum[0] * 100 / arr.size(Cos), 2) + "%"))))
     ;
  };

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Companies")))
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
          .text(math.toIso(fns.evaluate(
              MdEval.hassets, MdEval.hprofits), 0
            )))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(MdEval.hsales, 0)))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(fns.evaluate(
              MdEval.assets, MdEval.profits), 0
            )))
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(MdEval.sales, 0)))))
    .add(Q("div").klass("separator"))
    .add(clientResultsDiv)
    .add(Q("div").klass("separator2"))
    .add(Q("table")
      .att("align", "center")
      .klass("frame")
      .adds(arr.map(GrDivs, function(R)  {sys.$params(arguments.length, 1);  return Q("tr")
          .adds(arr.map(R, function(dv)  {sys.$params(arguments.length, 1);  return Q("td").add(dv);}))
        ;})))
    .add(ModalBox.wg)
  ;

  mkCharts();
};


 function wait(div, co)  {sys.$params(arguments.length, 2); div
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center")
          .text(co)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center")
          .add(ui.img("wait.gif")))))
  ;};
