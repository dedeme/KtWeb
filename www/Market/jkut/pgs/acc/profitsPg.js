import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as cts from  "../../cts.js";
import * as profitsEntry from  "../../data/chart/profitsEntry.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 function mkBigTd()  {sys.$params(arguments.length, 0);  return Q("td").style("font-size:large;text-align:right");};


 function dfFmt(n)  {sys.$params(arguments.length, 1);
  const color =sys.$checkNull( n < 0 ? "aa2800" : n > 0 ? "0041aa" : "000000");
   return "<font color='" + color + "'>" + math.toIso(n, 2) + "</font>";
};


 function mkTr(color, val)  {sys.$params(arguments.length, 2);  return Q("tr")
    .add(Q("td")
      .style("vertical-align:middle;width:5px")
      .add(ui.led(color, 6)))
    .add(Q("td")
      .style(
          "width: 80px;text-align:right;color:" +
          ( val > 0
              ? "rgba(0, 129, 255)"
              : val < 0
                ? "rgba(255, 40, 0)"
                : "rgba(0, 0, 0)"
          )
        )
      .text(math.toIso(val, 2)))
  ;};


 function mkIncrement(tt, acc, rk)  {sys.$params(arguments.length, 3);  return Q("table")
    .klass("frame")
    .style("border-collapse : collapse;")
    .add(mkTr("rgba(0, 129, 255)", tt))
    .add(mkTr("rgba(0, 0, 0)", acc))
    .add(mkTr("rgba(255, 40, 0)", rk))
  ;};



export  async  function mk(wg)  {sys.$params(arguments.length, 1);
    const {AllEs} = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "ProfitsPg",
    rq: "idata"
  });

  const CEs = []; 
  const Corrects = []; 
  const correctsSumV = [0];
  const iV = [0];
  for (const  e  of sys.$forObject( AllEs)) {
    const i =sys.$checkNull( iV[0]);
    iV[0] +=sys.$checkExists(iV[0], 1);
    if (sys.$eq(i , 0)) {
      arr.push(CEs, e);
      continue;
    }
     const e1 =sys.$checkNull( AllEs[i - 1]);
    if (sys.$neq(sys.$slice(e[profitsEntry.date],null,4) , sys.$slice(e1[profitsEntry.date],null,4))) {
      correctsSumV[0] +=sys.$checkExists(correctsSumV[0],sys.$checkNull( e1[profitsEntry.acc]));
      arr.push(Corrects,e1[profitsEntry.acc]);
    }
    const sum =sys.$checkNull( correctsSumV[0]);
    arr.push(CEs,profitsEntry.mk(
      e[profitsEntry.date], e[profitsEntry.total] + sum, e[profitsEntry.acc] + sum, e[profitsEntry.risk] + sum
    ));
  }

   const e =sys.$checkNull( arr.peek(AllEs));
  const now =sys.$checkNull( time.fromStr(e[profitsEntry.date])[0]);
  const today =sys.$checkNull( time.toStr(now));
   const e1 =sys.$checkNull( AllEs[arr.size(AllEs) - 2]);
  const summary =sys.$checkNull( Q("table")
    .att("align", "center")
    .klass("frame")
    .add(Q("tr")
      .add(Q("td")
        .att("rowspan", 2)
        .style("font-size:large;vertical-align:top")
        .text(time.toIso(now) + " :"))
      .add(mkBigTd()
        .text(" [ "))
      .add(mkBigTd()
        .html("<font color='0041aa'>" + math.toIso(e[profitsEntry.total], 2) + "</font>"))
      .add(mkBigTd()
        .text(" | "))
      .add(mkBigTd()
        .html("<font color='000000'>" + math.toIso(e[profitsEntry.acc], 2) + "</font>"))
      .add(mkBigTd()
        .text(" | "))
      .add(mkBigTd()
        .html("<font color='aa2800'>" + math.toIso(e[profitsEntry.risk], 2) + "</font>"))
      .add(mkBigTd()
        .text(" | "))
      .add(mkBigTd()
        .html(
          "<font color='00aa41'>" +
          math.toIso(e[profitsEntry.total] - e[profitsEntry.risk], 2) +
          "</font>"))
      .add(mkBigTd()
        .text(" ]")))
    .add(Q("tr")
      .add(mkBigTd()
        .text(" [ "))
      .add(mkBigTd()
        .html(dfFmt(e[profitsEntry.total] - e1[profitsEntry.total])))
      .add(mkBigTd()
        .text(" | "))
      .add(mkBigTd()
        .html(dfFmt(e[profitsEntry.acc] - e1[profitsEntry.acc])))
      .add(mkBigTd()
        .text(" | "))
      .add(mkBigTd()
        .html(dfFmt(e[profitsEntry.risk] - e1[profitsEntry.risk])))
      .add(mkBigTd()
        .text(" | "))
      .add(mkBigTd()
        .html(dfFmt(e[profitsEntry.total] + e1[profitsEntry.risk] - e1[profitsEntry.total] - e[profitsEntry.risk])))
      .add(mkBigTd()
        .text(" ]"))))
    ;

   const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.exArea.width =sys.$checkExists(Chart.exArea.width, 600);
  Chart.exArea.height =sys.$checkExists(Chart.exArea.height, 200);
  Chart.exArea.atts.border.width =sys.$checkExists(Chart.exArea.atts.border.width, 0);
  Chart.inPadding.top =sys.$checkExists(Chart.inPadding.top, 10);
  Chart.inPadding.right =sys.$checkExists(Chart.inPadding.right, 10);
  Chart.inPadding.bottom =sys.$checkExists(Chart.inPadding.bottom, 20);
  Chart.inPadding.left =sys.$checkExists(Chart.inPadding.left, 85);
  Chart.chartPadding.top =sys.$checkExists(Chart.chartPadding.top, 4);
  Chart.chartPadding.right =sys.$checkExists(Chart.chartPadding.right, 2);
  Chart.chartPadding.bottom =sys.$checkExists(Chart.chartPadding.bottom, 4);
  Chart.chartPadding.left =sys.$checkExists(Chart.chartPadding.left, 2);

  

  const month = sys.$slice(today,null,6);
   const E00s =sys.$checkNull( arr.dropWhile(AllEs,function( e)  {sys.$params(arguments.length, 1);  return sys.$slice(e[profitsEntry.date],null,6) <  month;}));
   const E0s =sys.$checkNull( arr.size(E00s) > 1 ? E00s : sys.$slice(AllEs, -2,null));
   const ef0 =sys.$checkNull( E0s[0]);
   const el0 =sys.$checkNull( arr.peek(E0s));
  const total0 = el0[profitsEntry.total] - ef0[profitsEntry.total];
  const acc0 = el0[profitsEntry.acc] - ef0[profitsEntry.acc];
  const risk0 = el0[profitsEntry.risk] - ef0[profitsEntry.risk];

  const back0 =sys.$checkNull( total0 > 0
    ? "#e9e9f2"
    : total0 < 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background, back0);

  const Lb0s = [];
  const Val0s = [[], [], []];
  for (const  e  of sys.$forObject( E0s)) {
    arr.push(Lb0s,time.toIso(time.fromStr(e[profitsEntry.date])[0]));
    arr.push(Val0s[0], [e[profitsEntry.total]]);
    arr.push(Val0s[1], [e[profitsEntry.acc]]);
    arr.push(Val0s[2], [e[profitsEntry.risk]]);
  }
  const Att0s = [
    lineChart.mkLine(2, "#0041aa", false),
    lineChart.mkLine(2, "#414141", false),
    lineChart.mkLine(2, "#aa4100", false)
  ];
   const Data0 =sys.$checkNull( lineChart.mkData(Lb0s, Val0s, Att0s));
  Data0.round =sys.$checkExists(Data0.round, 0);
  Data0.Labels =sys.$checkExists(Data0.Labels, Lb0s);
  Data0.SetValues =sys.$checkExists(Data0.SetValues, [Val0s[0], Val0s[1], Val0s[2]]);
  Data0.SetAtts =sys.$checkExists(Data0.SetAtts, Att0s);
  Data0.drawGrid =sys.$checkExists(Data0.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$eq(i % 3 , 0);
  });
  Data0.drawLabel =sys.$checkExists(Data0.drawLabel,sys.$checkNull( Data0.drawGrid));
  Data0.mapLabel =sys.$checkExists(Data0.mapLabel, function(lb, i)  {sys.$params(arguments.length, 2);  return sys.$slice(lb,null,2);});


  const lastMonth =sys.$checkNull( Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back0)
        .add(lineChart.mkWg(Chart, Data0)))
      .add(Q("td")
        .add(mkIncrement(total0, acc0, risk0)))))
  ;

  

  const year = sys.$slice(today,null,4);
   const E10s =sys.$checkNull( arr.dropWhile(AllEs,function( e)  {sys.$params(arguments.length, 1);  return sys.$slice(e[profitsEntry.date],null,4) <  year;}));
   const E1s =sys.$checkNull( arr.size(E10s) > 1 ? E10s : sys.$slice(AllEs, -2,null));
   const ef1 =sys.$checkNull( E1s[0]);
    const el1 =sys.$checkNull( arr.peek(E1s));
  const total1 = el1[profitsEntry.total] - ef1[profitsEntry.total];
  const acc1 = el1[profitsEntry.acc] - ef1[profitsEntry.acc];
  const risk1 = el1[profitsEntry.risk] - ef1[profitsEntry.risk];

  Chart.chartPadding.top =sys.$checkExists(Chart.chartPadding.top, 2);
  Chart.chartPadding.bottom =sys.$checkExists(Chart.chartPadding.bottom, 2);
  const back1 =sys.$checkNull( total1 > 0
    ? "#e9e9f2"
    : total1< 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background, back1);

  const Lb1s = [];
  const Val1s = [[], [], []];
  for (const  e  of sys.$forObject( E1s)) {
    arr.push(Lb1s,time.toIso(time.fromStr(e[profitsEntry.date])[0]));
    arr.push(Val1s[0], [e[profitsEntry.total]]);
    arr.push(Val1s[1], [e[profitsEntry.acc]]);
    arr.push(Val1s[2], [e[profitsEntry.risk]]);
  }
  const Att1s = [
    lineChart.mkLine(1.5, "#0041aa", false),
    lineChart.mkLine(1.5, "#414141", false),
    lineChart.mkLine(1.5, "#aa4100", false)
  ];
   const Data1 =sys.$checkNull( lineChart.mkData(Lb1s, Val1s, Att1s));
  Data1.round =sys.$checkExists(Data1.round, 0);
  Data1.Labels =sys.$checkExists(Data1.Labels, Lb1s);
  Data1.SetValues =sys.$checkExists(Data1.SetValues, [Val1s[0], Val1s[1], Val1s[2]]);
  Data1.SetAtts =sys.$checkExists(Data1.SetAtts, Att1s);
  Data1.drawGrid =sys.$checkExists(Data1.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(sys.$slice(Lb1s[i - 1],3,5) , sys.$slice(lb,3,5)) ? true : false;
  });
  Data1.drawLabel =sys.$checkExists(Data1.drawLabel,sys.$checkNull( Data1.drawGrid));
  Data1.mapLabel =sys.$checkExists(Data1.mapLabel, function(lb, i)  {sys.$params(arguments.length, 2);  return sys.$slice(lb,3,5);});

  const currentYear =sys.$checkNull( Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back1)
        .add(lineChart.mkWg(Chart, Data1)))
      .add(Q("td")
        .add(mkIncrement(total1, acc1, risk1)))))
  ;

  

  const year2 =sys.$checkNull( time.toStr(time.addDays(now,  -365)));
   const E20s =sys.$checkNull( arr.dropWhile(CEs,function( e)  {sys.$params(arguments.length, 1);  return e[profitsEntry.date] < year2;}));
   const E2s =sys.$checkNull( arr.size(E20s) > 1 ? E20s : sys.$slice(AllEs, -2,null));
   const ef2 =sys.$checkNull( E2s[0]);
   const el2 =sys.$checkNull( arr.peek(E2s));
  const total2 = el2[profitsEntry.total] - ef2[profitsEntry.total];
  const acc2 = el2[profitsEntry.acc] - ef2[profitsEntry.acc];
  const risk2 = el2[profitsEntry.risk] - ef2[profitsEntry.risk];

  const back2 =sys.$checkNull( total2 > 0
    ? "#e9e9f2"
    : total2 < 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background, back2);

  const Lb2s = [];
  const Val2s = [[], [], []];
  for (const  e  of sys.$forObject( E2s)) {
    arr.push(Lb2s,time.toIso(time.fromStr(e[profitsEntry.date])[0]));
    arr.push(Val2s[0], [e[profitsEntry.total]]);
    arr.push(Val2s[1], [e[profitsEntry.acc]]);
    arr.push(Val2s[2], [e[profitsEntry.risk]]);
  }
  const Att2s = [
    lineChart.mkLine(1.5, "#0041aa", false),
    lineChart.mkLine(1.5, "#414141", false),
    lineChart.mkLine(1.5, "#aa4100", false)
  ];
   const Data2 =sys.$checkNull( lineChart.mkData(Lb2s, Val2s, Att2s));
  Data2.round =sys.$checkExists(Data2.round, 0);
  Data2.Labels =sys.$checkExists(Data2.Labels, Lb2s);
  Data2.SetValues =sys.$checkExists(Data2.SetValues, [Val2s[0], Val2s[1], Val2s[2]]);
  Data2.SetAtts =sys.$checkExists(Data2.SetAtts, Att2s);
  Data2.drawGrid =sys.$checkExists(Data2.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(sys.$slice(Lb2s[i - 1],3,5) , sys.$slice(lb,3,5)) ? true : false;
  });
  Data2.drawLabel =sys.$checkExists(Data2.drawLabel,sys.$checkNull( Data2.drawGrid));
  Data2.mapLabel =sys.$checkExists(Data2.mapLabel, function(lb, i)  {sys.$params(arguments.length, 2);  return sys.$slice(lb,3,5);});

  const lastYear =sys.$checkNull( Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back2)
        .add(lineChart.mkWg(Chart, Data2)))
      .add(Q("td")
        .add(mkIncrement(total2, acc2, risk2)))))
  ;

  

  const prevEV = [CEs[0]];
   const E30s =sys.$checkNull( arr.filter(CEs,function( e)  {sys.$params(arguments.length, 1);
     const prevE =sys.$checkNull( prevEV[0]);
    const r = sys.$neq(sys.$slice(e[profitsEntry.date],4,6) , sys.$slice(prevE[profitsEntry.date],4,6));
    prevEV[0] =sys.$checkExists(prevEV[0], e);
     return r;
  }));
  arr.unshift(E30s,CEs[0]);
  if (sys.$neq(arr.peek(E30s)[profitsEntry.date] , arr.peek(CEs)[profitsEntry.date]))
    arr.push(E30s,arr.peek(CEs));
   const E3s =sys.$checkNull( arr.size(E30s) > 1 ? E30s : sys.$slice(AllEs, -2,null));
   const ef3 =sys.$checkNull( E3s[0]);
   const el3 =sys.$checkNull( arr.peek(E3s));
  const total3 = el3[profitsEntry.total] - ef3[profitsEntry.total];
  const acc3 = el3[profitsEntry.acc] - ef3[profitsEntry.acc];
  const risk3 = el3[profitsEntry.risk] - ef3[profitsEntry.risk];

  const back3 =sys.$checkNull( total3 > 0
    ? "#e9e9f2"
    : total3 < 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background, back3);

  const Lb3s = [];
  const Val3s = [[], [], []];
  for (const  e  of sys.$forObject( E3s)) {
    arr.push(Lb3s,sys.$slice(time.toIso(time.fromStr(e[profitsEntry.date])[0]),3,null));
    arr.push(Val3s[0], [e[profitsEntry.total]]);
    arr.push(Val3s[1], [e[profitsEntry.acc]]);
    arr.push(Val3s[2], [e[profitsEntry.risk]]);
  }
  const Att3s = [
    lineChart.mkLine(1.5, "#0041aa", false),
    lineChart.mkLine(1.5, "#414141", false),
    lineChart.mkLine(1.5, "#aa4100", false)
  ];
   const Data3 =sys.$checkNull( lineChart.mkData(Lb3s, Val3s, Att3s));
  Data3.round =sys.$checkExists(Data3.round, 0);
  Data3.Labels =sys.$checkExists(Data3.Labels, Lb3s);
  Data3.SetValues =sys.$checkExists(Data3.SetValues, [Val3s[0], Val3s[1], Val3s[2]]);
  Data3.SetAtts =sys.$checkExists(Data3.SetAtts, Att3s);
  Data3.drawGrid =sys.$checkExists(Data3.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(sys.$slice(Lb3s[i - 1], -2,null) , sys.$slice(lb, -2,null)) ? true : false;
  });
  Data3.drawLabel =sys.$checkExists(Data3.drawLabel,sys.$checkNull( Data3.drawGrid));
  Data3.mapLabel =sys.$checkExists(Data3.mapLabel, function(lb, i)  {sys.$params(arguments.length, 2);  return sys.$slice(lb, -2,null);});

  const all =sys.$checkNull( Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back3)
        .add(lineChart.mkWg(Chart, Data3)))
      .add(Q("td")
        .add(mkIncrement(total3, acc3, risk3)))))
  ;

  wg
    .removeAll()
    .add(summary)
    .add(Q("div").klass("head").html(II("Last Month")))
    .add(lastMonth)
    .add(Q("div").klass("head").html(II("Current Year")))
    .add(currentYear)
    .add(Q("div").klass("head").html(II("Last Year")))
    .add(lastYear)
    .add(Q("div").klass("head").html(II("All")))
    .add(all)
  ;
};
