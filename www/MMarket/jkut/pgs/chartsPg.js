import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as vmenu from  "../libdm/vmenu.js";
import * as model from  "../data/model.js";
import * as stRs from  "../data/stRs.js";
import * as modelEval from  "../data/modelEval.js";
import * as order from  "../data/order.js";
import * as historicPg from  "../pgs/charts/historicPg.js";
import * as cosPg from  "../pgs/charts/cosPg.js";
import * as operationsPg from  "../pgs/charts/operationsPg.js";
import * as fns from  "../fns.js";
import * as global from  "../global.js";
import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const Url =sys.$checkNull( ui.url());
   const md =sys.$checkNull( arr.size(Url) > 1 && fns.existsModel(Url[1])
    ? fns.getModel(Url[1])
    : fns.getModel(cts.mainModel))
  ;
  const invIx0 =sys.$checkNull( arr.size(Url) > 2 && math.isDigits(Url[2]) ? math.fromStr(Url[2])[0] :  -1);
  const steps =sys.$checkNull( global.evalStepsV[0]);
  const invIx =sys.$checkNull(
    (sys.$eq(arr.size(md[model.ParamNames]) , 1) && invIx0 >= steps) || invIx0 >= steps * steps
      ?  -1
      : invIx0)
  ;

   const {rs,  mdEv, invIxFinal, pond,
   Closes,  Dates,  Cos, 
   BuyCos,  QuarantineCos} = await  client.send({ 
    prg: cts.appName,
    source: "ChartsPg",
    rq: "idata",
    mdId: md[model.id],
    invIx:invIx
  });
   const Params =sys.$checkNull( fns.ixToParams(md, invIxFinal));

  const chartV =sys.$checkNull( ["historic"]);
  const showV =sys.$checkNull( [[]]);

  

  
   function go(chart)  {sys.$params(arguments.length, 1);
    chartV[0] =sys.$checkExists(chartV[0],sys.$checkNull( chart));
    showV[0]();
  };

  
   function changeModel(mdId)  {sys.$params(arguments.length, 1); window.location.assign("?charts&" + mdId);};

  

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    const Ops =sys.$checkNull( [
      vmenu.title(II("Models")),
      vmenu.separator()
    ]);
    for (const  md  of sys.$forObject( global.Models))
      arr.push(Ops,vmenu.option(md[model.id], md[model.id], function()  {sys.$params(arguments.length, 0); changeModel(md[model.id]);}));
    const vmenuWg =sys.$checkNull( vmenu.mk(Ops, md[model.id]));

    const optTx =sys.$checkNull((  
      sys.$eq(chartV[0],"historic")? II("Historic"):
      sys.$eq(chartV[0],"cos")? II("Companies"):
       II("Operations")
    ));
    const Lopts =sys.$checkNull( [
      menu.toption("historic", II("Historic"), function()  {sys.$params(arguments.length, 0); go("historic");}),
      menu.separator(),
      menu.toption("cos", II("Companies"), function()  {sys.$params(arguments.length, 0); go("cos");}),
      menu.separator(),
      menu.toption("operations", II("Operations"), function()  {sys.$params(arguments.length, 0); go("operations");})
    ]);
    const menuWg =sys.$checkNull( menu.mk(Lopts, [], chartV[0]));

    const body =sys.$checkNull( Q("div"));
    switch (chartV[0]) {
      case "historic":{ historicPg.mk(body, Dates, rs, BuyCos, QuarantineCos);break;}
      case "operations":{ operationsPg.mk(body, Cos, Closes, rs);break;}
      default:{ cosPg.mk(body, Dates, Cos, Closes, rs);}
    }

    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("vertical-align:top; width:5px")
            .add(vmenuWg))
          .add(Q("td")
            .style("vertical-align:top")
            .add(menuWg)
            .add(Q("div")
              .klass("head")
              .text(optTx))
            .add(Q("div").klass("separator"))
            .add(Q("table")
              .att("align", "center")
              .klass("flat")
              .add(Q("tr")
                .add(Q("td")
                  .klass("chead")
                  .text(II("Model")))
                .adds(arr.map(md[model.ParamNames], function(n)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rhead")
                    .text(n)
                  ;})))
              .add(Q("tr")
                .add(Q("td")
                  .klass("cframe")
                  .text(md[model.name]))
                .adds(iter.map(
                  iter.$range(0,arr.size(Params)),
                  function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rframe")
                    .text(fns.pfmt1(md[model.ParamTypes][i], Params[i]))
                  ;}))))
            .add(Q("div").klass("separator2"))
            .add(Q("table")
              .att("align", "center")
              .klass("flat")
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Real")))
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Acc.")))
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Refs.")))
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
                  .text(fns.nfmt(arr.peek(rs[stRs.Hreals]), 2)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(arr.peek(rs[stRs.Haccs]), 2)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(arr.peek(rs[stRs.Hrefs]), 2)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(
                      arr.reduce(rs[stRs.Profits], 0, function(r, e)  {sys.$params(arguments.length, 2);  return r + e;})
                      / arr.size(rs[stRs.Profits]) * 100, 2)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(pond * 1000, 0)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(order.sales(rs[stRs.Orders]), 0)))))
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
                  .text(fns.nfmt(mdEv[modelEval.heval] * 1000,0)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(mdEv[modelEval.hsales], 0)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(mdEv[modelEval.lastEval] * 1000,0)))
                .add(Q("td")
                  .klass("rframe")
                  .text(fns.nfmt(mdEv[modelEval.lastSales], 0)))))
            .add(body))))
    ;
  });

  showV[0]();
};
