import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as vmenu from  "../libdm/vmenu.js";
import * as model from  "../data/model.js";
import * as evE from  "../data/evE.js";
import * as upRs from  "../data/upRs.js";
import * as fns from  "../fns.js";
import * as global from  "../global.js";
import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export const [oP0, oP1, oPon, oReal, oAcc, oProf, oSales] =[0, 1, 2, 3, 4, 5, 6];




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const Url =sys.$checkNull( ui.url());
  const mdV =sys.$checkNull( [
    arr.size(Url) > 1 && fns.existsModel(Url[1])
      ? fns.getModel(Url[1])
      : fns.getModel(cts.mainModel)
  ]);
   const md =sys.$checkNull( mdV[0]);

  
    const {MdEvals} = await  client.send({
    prg: cts.appName,
    source: "ResultsPg",
    rq: "idata",
    mdId: md[model.id]
  });

  const MdIxEvs =sys.$checkNull( []);
  for (const [i, ev]  of sys.$forObject2( MdEvals)) arr.push(MdIxEvs,[i, ev]);

  const orderV =sys.$checkNull( [oPon]);

  const showV =sys.$checkNull( [[]]);
  const cavgRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(true)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const lastRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const avgRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const devRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const allChk =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const percentChk =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;

  

  
   function changeModel(mdId)  {sys.$params(arguments.length, 1); window.location.assign("?results&" + mdId);};

  
   function changeOrder(order)  {sys.$params(arguments.length, 1);
    orderV[0] =sys.$checkExists(orderV[0],sys.$checkNull( order));
    showV[0]();
  };

  

  
   function mkOpt(wg, html)  {sys.$params(arguments.length, 2);  return Q("td")
    .add(Q("table")
      .add(Q("tr")
        .add(Q("td")
          .add(wg))
        .add(Q("td")
          .html(html))))
  ;};

  
   function mkTh(id, html)  {sys.$params(arguments.length, 2);  return Q("td")
    .klass("rhead")
    .add(sys.$eq(orderV[0] , id)
      ? Q("div")
          .klass("frame")
          .html(html)
      : ui.link(function(e)  {sys.$params(arguments.length, 1); changeOrder(id);})
          .klass("link")
          .html(html))
  ;};

  
   function mkRow(i, pIx,  rs)  {sys.$params(arguments.length, 3);
     const md =sys.$checkNull( mdV[0]);
    const isPerc =sys.$checkNull( percentChk.isChecked());

    const parTds =sys.$checkNull( [
      Q("td")
        .klass("rframe")
        .text(fns.pfmt1(md[model.ParamTypes][0], fns.ixToParams(md, pIx)[0]))
    ]);
    if (arr.size(md[model.ParamTypes]) > 1)
      arr.push(parTds,Q("td")
        .klass("rframe")
        .text(fns.pfmt1(md[model.ParamTypes][1], fns.ixToParams(md, pIx)[1]))
      );

     return Q("tr")
      .add(Q("td")
        .add(Q("a")
          .att("href", "?charts&" + md[model.id] + "&" + pIx)
          .add(ui.img("see"))))
      .add(Q("td").klass("rframe").style("opacity:0.4").text(i))
      .add(Q("td").klass("chead"))
      .adds(parTds)
      .add(Q("td").klass("chead"))
      .add(Q("td").klass("rframe").text(devRd.isChecked()
          ? fns.nfmt(rs[upRs.pon] * 100, 2)
          : isPerc
            ? fns.nfmt(rs[upRs.pon], 4)
            : fns.nfmt(rs[upRs.pon] * 1000, 0)
        ))
      .add(Q("td").klass("rframe").text(devRd.isChecked()
          ? fns.nfmt(rs[upRs.real] * 100, 2)
          : isPerc
            ? fns.nfmt(rs[upRs.real], 4)
            : fns.nfmt(rs[upRs.real] * global.initialCapitalV, 0)
        ))
      .add(Q("td").klass("rframe").text(devRd.isChecked()
          ? fns.nfmt(rs[upRs.acc] * 100, 2)
          : isPerc
            ? fns.nfmt(rs[upRs.acc], 4)
            : fns.nfmt(rs[upRs.acc] * global.initialCapitalV, 0)
        ))
      .add(Q("td").klass("rframe").text(devRd.isChecked()
          ? fns.nfmt(rs[upRs.prof] * 100, 2)
          : isPerc
            ? fns.nfmt(rs[upRs.prof], 4)
            : fns.nfmt((rs[upRs.prof] - 1) * 100, 2) + "%"
        ))
      .add(Q("td").klass("rframe").text(devRd.isChecked()
          ? "***"
          : isPerc
            ? "***"
            : fns.nfmt(rs[upRs.sales], 0)
        ))
    ;
  };

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    const menuWg =sys.$checkNull( Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .add(Q("table")
            .add(Q("tr")
              .add(mkOpt(cavgRd, II("Corrected<br>Average")))
              .add(mkOpt(lastRd, II("Last<br>Value")))
              .add(mkOpt(avgRd, II("Average")))
              .add(mkOpt(devRd, II("Deviation<br>%")))
            )))
         .add(mkOpt(allChk, II("All<br>Data"))
          .klass("frame"))
         .add(mkOpt(percentChk, "%")
          .klass("frame"))))
    ;

     const md =sys.$checkNull( mdV[0]);

    const Ops =sys.$checkNull( [
      vmenu.title(II("Models")),
      vmenu.separator()
    ]);
    for (const  md  of sys.$forObject( global.Models))
      arr.push(Ops,vmenu.option(md[model.id], md[model.id], function()  {sys.$params(arguments.length, 0); changeModel(md[model.id]);}));
    const vmenuWg =sys.$checkNull( vmenu.mk(Ops, md[model.id]));

    const MdIxEvs2 =sys.$checkNull( arr.copy(MdIxEvs));
    if (!sys.asBool(allChk.isChecked())) {
      arr.filterIn(MdIxEvs2,
        function(E)  {sys.$params(arguments.length, 1);  return E[1][evE.avg][upRs.sales] >= global.minSalesV[0];}
      );
    }

     const RowData =sys.$checkNull( cavgRd.isChecked()
      ? arr.map(MdIxEvs2,function(E)  {sys.$params(arguments.length, 1);  return [E[0], E[1][evE.crr]];})
      : lastRd.isChecked()
        ? arr.map(MdIxEvs2,function(E)  {sys.$params(arguments.length, 1);  return [E[0], E[1][evE.last]];})
        : avgRd.isChecked()
          ? arr.map(MdIxEvs2,function(E)  {sys.$params(arguments.length, 1);  return [E[0], E[1][evE.avg]];})
          : arr.map(MdIxEvs2,function(E)  {sys.$params(arguments.length, 1);  return [E[0], E[1][evE.dev]];}))
    ;

    arr.sort(RowData,function(E1, E2)  {sys.$params(arguments.length, 2); return (  
      sys.$eq(orderV[0],oP0)? fns.ixToParams(md, E1[0])[0] < fns.ixToParams(md, E2[0])[0]:
      sys.$eq(orderV[0],oP1)? fns.ixToParams(md, E1[0])[1] < fns.ixToParams(md, E2[0])[1]:
      sys.$eq(orderV[0],oPon)? E1[1][upRs.pon] > E2[1][upRs.pon]:
      sys.$eq(orderV[0],oReal)? E1[1][upRs.real] > E2[1][upRs.real]:
      sys.$eq(orderV[0],oAcc)? E1[1][upRs.acc] > E2[1][upRs.acc]:
      sys.$eq(orderV[0],oProf)? E1[1][upRs.prof] > E2[1][upRs.prof]:
       E1[1][upRs.sales] < E2[1][upRs.sales]
    );});

    const headTds =sys.$checkNull( [
      Q("td").klass("chead"),
      mkTh(oPon, II("Points")).style("width:80px"),
      mkTh(oReal, II("Real")).style("width:80px"),
      mkTh(oAcc, II("Acc.")).style("width:80px"),
      mkTh(oProf, II("Prof.")).style("width:80px"),
      mkTh(oSales, II("Sales")).style("width:50px")
    ]);
    if (arr.size(md[model.ParamNames]) > 1)
      arr.unshift(headTds,mkTh(oP1, md[model.ParamNames][1]));
    arr.unshift(headTds,mkTh(oP0, md[model.ParamNames][0]));
    arr.unshift(headTds,Q("td").klass("chead"));
    arr.unshift(headTds,Q("td").klass("chead").text(II("N.")));
    arr.unshift(headTds,Q("td"));

    const Rows =sys.$checkNull( []);
    for (const [i, E]  of sys.$forObject2( RowData))
      arr.push(Rows,mkRow(i, E[0], E[1]));

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
            .add(Q("hr"))
            .add(Q("div")
              .klass("head")
              .text(md[model.name]))
            .add(Q("div").klass("separator"))
            .add(Q("table")
              .att("align", "center")
              .klass("flat")
              .add(Q("tr")
                .add(Q("td"))
                .adds(arr.map(md[model.ParamNames], function(n)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rhead")
                    .text(n)
                  ;})))
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Base") + ":"))
                .adds(iter.map(
                  iter.$range(0,arr.size(md[model.ParamNames])),
                  function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rframe")
                    .text(fns.pfmt1(md[model.ParamTypes][i], global.ParamBases[md[model.id]][i]))
                  ;})))
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Base Increment") + ":"))
                .adds(iter.map(
                  iter.$range(0,arr.size(md[model.ParamNames])),
                  function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rframe")
                    .text(fns.pfmt1(md[model.ParamTypes][i], global.ParamBaseIncs[md[model.id]][i]))
                  ;})))
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Environment Increment") + ":"))
                .adds(iter.map(
                  iter.$range(0,arr.size(md[model.ParamNames])),
                  function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rframe")
                    .text(fns.pfmt1(md[model.ParamTypes][i], global.ParamEnvIncs[md[model.id]][i]))
                  ;}))))
            .add(Q("div").klass("separator"))
            .add(Q("table")
              .att("align", "center")
              .klass("flat")
              .add(Q("tr")
                .adds(headTds))
              .adds(Rows)
            ))))
    ;
  });

  showV[0]();
};
