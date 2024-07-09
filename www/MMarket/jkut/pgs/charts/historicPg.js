import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as model from  "../../data/model.js";
import * as stRs from  "../../data/stRs.js";
import * as cts from  "../../cts.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export const [isAssets, isWithdrawals, isCompanies] =[0, 1, 2];








export  async  function mk(wg,  Dates,  rs,  BuyCos,  QuarantineCos)  {sys.$params(arguments.length, 5);

  
   function mkGr(type)  {sys.$params(arguments.length, 1);
    const Labels =sys.$checkNull( arr.map(Dates, function(d)  {sys.$params(arguments.length, 1);  return sys.$slice(d,6,null) + "/" + sys.$slice(d,4,6);}));

     const Ch =sys.$checkNull( lineChart.mkExample());
    Ch.exArea.width =sys.$checkExists(Ch.exArea.width, 600);
    Ch.exArea.height =sys.$checkExists(Ch.exArea.height,sys.$checkNull( sys.$eq(type , isAssets) ? 300 : 150));
    Ch.inPadding.left =sys.$checkExists(Ch.inPadding.left, 100);
    Ch.exArea.atts.background =sys.$checkExists(Ch.exArea.atts.background, "#ffffff");
    Ch.inAtts.background =sys.$checkExists(Ch.inAtts.background, "#e9e9e9");

     const Data =sys.$checkNull( lineChart.mkData(
      Labels,(
        
        sys.$eq(type,isAssets)? [
            arr.map(rs[stRs.Hrefs], function(e)  {sys.$params(arguments.length, 1);  return [e];}),
            arr.map(rs[stRs.Haccs], function(e)  {sys.$params(arguments.length, 1);  return [e];}),
            arr.map(rs[stRs.Hreals], function(e)  {sys.$params(arguments.length, 1);  return [e];})
          ]:
        sys.$eq(type,isCompanies)? [
            arr.map(BuyCos, function(e)  {sys.$params(arguments.length, 1);  return [e];}),
            arr.map(QuarantineCos, function(e)  {sys.$params(arguments.length, 1);  return [e];})
          ]:
          [arr.map(rs[stRs.Hwithdrawals], function(e)  {sys.$params(arguments.length, 1);  return [e];})]
      ),(
        
        sys.$eq(type,isAssets)? [
            lineChart.mkLine(1, "#800000", false),
            lineChart.mkLine(1, "#000000", false),
            lineChart.mkLine(1.5, "#000080", false)
          ]:
        sys.$eq(type,isCompanies)? [
            lineChart.mkLine(1, "#000080", false),
            lineChart.mkLine(1, "#800000", false)
          ]:
          [lineChart.mkLine(1, "#000000", false)]
      )
    ));
    Data.round =sys.$checkExists(Data.round, 0);
    const prevLabelV = [sys.$slice(Labels[0], -2,null)];
    Data.drawLabel =sys.$checkExists(Data.drawLabel, function(lb, i)  {sys.$params(arguments.length, 2);
      const l = sys.$slice(lb, -2,null);
      if (sys.$eq(i , 0))  return false;
      if (sys.$neq(l , prevLabelV[0]) && (sys.$eq(l , "01") || sys.$eq(l , "04") || sys.$eq(l , "07")|| sys.$eq(l , "10"))) {
        prevLabelV[0] =sys.$checkExists(prevLabelV[0], l);
         return true;
      }
       return false;
    });
    const prevLabel2V = [sys.$slice(Labels[0], -2,null)];
    Data.drawGrid =sys.$checkExists(Data.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
      const l = sys.$slice(lb, -2,null);
      if (sys.$eq(i , 0))  return false;
      if (sys.$neq(l , prevLabel2V[0]) && (sys.$eq(l , "01") || sys.$eq(l , "04") || sys.$eq(l , "07")|| sys.$eq(l , "10"))) {
        prevLabel2V[0] =sys.$checkExists(prevLabel2V[0], l);
         return true;
      }
       return false;
    });
    Data.mapLabel =sys.$checkExists(Data.mapLabel, function(l, i)  {sys.$params(arguments.length, 2);  return sys.$slice(l, -2,null);});

     return lineChart.mkWg(Ch, Data);
  };

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Assets")))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("width: 8px")
          .add(ui.led("#000080", 6)))
        .add(Q("td")
          .style("width: 8px;text-align:left;white-space:nowrap;")
          .text(II("Real")))
        .add(Q("td")
          .style("width: 8px")
          .text(" | "))
        .add(Q("td")
          .style("width: 8px")
          .add(ui.led("#000000", 6)))
        .add(Q("td")
          .style("width: 8px;text-align:left;white-space:nowrap;")
          .text(II("Acc.")))
        .add(Q("td")
          .style("width: 8px")
          .text(" | "))
        .add(Q("td")
          .style("width: 8px")
          .add(ui.led("#800000", 6)))
        .add(Q("td")
          .style("text-align:left")
          .text(II("Refs."))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 8)
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
