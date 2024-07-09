import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as vmenu from  "../libdm/vmenu.js";
import * as model from  "../data/model.js";
import * as upRs from  "../data/upRs.js";
import * as fns from  "../fns.js";
import * as global from  "../global.js";
import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


const [pCavg, pLast, pAvg] =[0, 1, 2];




export  function mk(wg)  {sys.$params(arguments.length, 1);
   const Url =sys.$checkNull( ui.url());
  const mdV = [
    arr.size(Url) > 1 && fns.existsModel(Url[1])
      ? fns.getModel(Url[1])
      : fns.getModel(cts.mainModel)
  ];
   const md =sys.$checkNull( mdV[0]);

  const showV = [[]];
  const avgRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "period")
    .checked(true)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const lastRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "period")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const cavgRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "period")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const ptsRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(true)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const realRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const accRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;
  const profRd =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "source")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;

  

  
   function changeModel(mdId)  {sys.$params(arguments.length, 1); window.location.assign("?maps&" + mdId);};

  

  
   function mkOpt(wg, html)  {sys.$params(arguments.length, 2);  return Q("td")
    .add(Q("table")
      .add(Q("tr")
        .add(Q("td")
          .add(wg))
        .add(Q("td")
          .html(html))))
  ;};

  
   function mkMapTd()  {sys.$params(arguments.length, 0);  return Q("td")
    .style("width:100px;height:100px")
    .add(ui.img("wait.gif"))
  ;};

  
   function mkMapTb( Tds)  {sys.$params(arguments.length, 1);  return Q("table")
    .add(Q("tr")
      .adds(sys.$slice(Tds,null,arr.size(Tds)/2)))
    .add(Q("tr")
      .adds(sys.$slice(Tds,arr.size(Tds)/2,null)))
  ;};

  
   function mkfMap(period, type, vsource)  {sys.$params(arguments.length, 3);
     return async  function(i, td)  {sys.$params(arguments.length, 2);
      
      const {date,  Vals} = await  client.send({
        prg: cts.appName,
        source: "MapsPg",
        rq: "values",
        mdId: md[model.id],
        period:period,
        i:i,
        type:type,
        vsource:vsource
      });
      if (!sys.asBool(Vals)) {
        td.removeAll();
        return;
      }

      const steps =sys.$checkNull( global.evalStepsV[0]);
      const max =sys.$checkNull( arr.reduce(Vals,Vals[0], function(r, v)  {sys.$params(arguments.length, 2);  return v > r ? v : r;}));
      const min =sys.$checkNull( arr.reduce(Vals,max, function(r, v)  {sys.$params(arguments.length, 2);  return v < r && v >  -1.0 ? v : r;}));
      const df = max - min;

      
       function color(value)  {sys.$params(arguments.length, 1);
        if (value < 0)  return "rgb(190,190,190)";
        const red =sys.$checkNull( math.toInt((max - value) * 256 / df ));
        const blue =sys.$checkNull( math.toInt((value - min) * 256 / df ));
         return "rgb(" + red + ",80," + blue + ")";
      };

      const Trs = [];
      if (sys.$eq(arr.size(Vals) , steps)) {
        for (let i = 0;i < steps; ++i)
          arr.push(Trs,Q("tr")
            .add(Q("td")
              .att(
                  "title",
                  fns.pfmt(md[model.id], i) + "\n" + fns.rsFmt(vsource, Vals[i])
                )
              .style(
                  "padding:0px;" +
                  "background:" + color(Vals[i]) +
                  ";width:100px;height:5px;" +
                  "cursor:pointer"
                )
              .on("click", function(ev)  {sys.$params(arguments.length, 1);
                  window.location.assign("?charts&" + md[model.id] + "&" + i);}
                ))
          );
      } else {
        for (let r = 0;r < steps; ++r) {
          const Tds = [];
          for (let c = 0;c < steps; ++c) {
            const i = r * steps + c;
            arr.push(Tds,Q("td")
              .att(
                  "title",
                  fns.pfmt(md[model.id], i) + "\n" + fns.rsFmt(vsource, Vals[i])
                )
              .style(
                  "padding:0px;" +
                  "background:" + color(Vals[i]) +
                  ";width:5px;height:5px;" +
                  "cursor:pointer"
                )
              .on("click", function(ev)  {sys.$params(arguments.length, 1);
                  window.location.assign("?charts&" + md[model.id] + "&" + i);}
                )
            );
          }
          arr.push(Trs,Q("tr")
            .adds(Tds)
          );
        }
      }

      td
        .removeAll()
        .style("width:100px;height:100px")
        .add(Q("div")
          .style("text-align:center")
          .text(time.toIso(time.fromStr(date)[0])))
        .add(Q("table")
          .klass("flat border")
          .adds(Trs))
      ;
    }
  ;};

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    const type =sys.$checkNull( cavgRd.isChecked()
      ? pCavg
      : lastRd.isChecked()
        ? pLast
        : pAvg)
    ;
    const source =sys.$checkNull( ptsRd.isChecked()
      ? upRs.pon
      : realRd.isChecked()
        ? upRs.real
        : accRd.isChecked()
          ? upRs.acc
          : upRs.prof)
    ;
    const datesInPeriod =sys.$checkNull( global.datesInPeriodV[0]);
    const Tds = [];
    for (const p  of sys.$forObject( global.Periods)) {
      const Itds = [];
      for (let i = 0;i < datesInPeriod; ++i)
        arr.push(Itds,mkMapTd());
      arr.push(Tds,Itds);
    }

    const menuWg =sys.$checkNull( Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .style("align:left")
          .add(Q("table")
            .add(Q("tr")
              .add(mkOpt(avgRd, II("Average")))
              .add(mkOpt(lastRd, II("Last<br>Value")))
              .add(mkOpt(cavgRd, II("Corrected<br>Average")))
            )))
         .add(Q("td"))
         .add(Q("td")
          .klass("frame")
          .style("align:right")
          .add(Q("table")
            .add(Q("tr")
              .add(mkOpt(ptsRd, II("Points")))
              .add(mkOpt(realRd, II("Real")))
              .add(mkOpt(accRd, II("Accounting")))
              .add(mkOpt(profRd, II("Profits")))
            )))))
    ;

     const md =sys.$checkNull( mdV[0]);

    const Ops = [
      vmenu.title(II("Models")),
      vmenu.separator()
    ];
    for (const  md  of sys.$forObject( global.Models))
      arr.push(Ops,vmenu.option(md[model.id], md[model.id], function()  {sys.$params(arguments.length, 0); changeModel(md[model.id]);}));
    const vmenuWg =sys.$checkNull( vmenu.mk(Ops, md[model.id]));

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
            .add(ui.hrule(II("Daily"), 50))
            .add(mkMapTb(Tds[0]))
            .add(ui.hrule(II("Weekly"), 50))
            .add(mkMapTb(Tds[1]))
            .add(ui.hrule(II("Monthly"), 50))
            .add(mkMapTb(Tds[2]))
        )))
    ;

     function mkPeriodMaps(i)  {sys.$params(arguments.length, 1);
      const lastIx = arr.size(global.Periods) - 1;
      const period =sys.$checkNull( global.Periods[i]);
      arr.eachSync(
        Tds[i],
        mkfMap(period, type, source),
        function() {sys.$params(arguments.length, 0); if (i < lastIx) mkPeriodMaps(i + 1);}
      );
    };

    mkPeriodMaps(0);
  });

  showV[0]();
};
