import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as lineChart from  "../../libdm/lineChart.js";
import * as modalBox from  "../../libdm/modalBox.js";
import * as cts from  "../../cts.js";
import * as ibex from  "../../data/ibex.js";
import * as quote from  "../../data/quote.js";
import * as profitsEntry from  "../../data/chart/profitsEntry.js";
import * as msg from  "../../wgs/msg.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const msgWait =sys.$checkNull( Q("div"));



export  function mk(wg)  {sys.$params(arguments.length, 1);
  mk2(wg, "charts");
};






 async  function mk2(wg, msel)  {sys.$params(arguments.length, 2);
    const {ibx} = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "IbexPg",
    rq: "idata"
  });

  const Lopts =sys.$checkNull( [
    menu.toption("charts", II("Charts"), function()  {sys.$params(arguments.length, 0); mk2(wg, "charts");}),
    menu.separator(),
    menu.toption("data", II("Data"), function()  {sys.$params(arguments.length, 0); mk2(wg, "data");})
  ]);
  const Ropts =sys.$checkNull( [menu.toption("update", II("Update"), function()  {sys.$params(arguments.length, 0); update(wg, msel);})]);
  const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, msel));

  const body =sys.$checkNull( Q("div"));

  if (sys.$eq(msel , "data")) data(body, ibx);
  else charts(body, arr.reverse(ibx[ibex.Qs]));

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
    .add(msgWait)
  ;
};




 async  function update(wg, msel)  {sys.$params(arguments.length, 2);
  const box =sys.$checkNull( modalBox.mk(
    Q("div")
      .add(Q("div")
        .style("text-align:center")
        .add(ui.img("wait2.gif").klass("frame"))),
    false
  ));
  msgWait
    .removeAll()
    .add(modalBox.mkWg(box));
  modalBox.show(box,true);

  const {withError, withWarnings} = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "IbexPg",
    rq: "update"
  });

  modalBox.show(box,false);

  if (withError) {
    if (withWarnings)
      msg.error(II("Errors and warnings found.<br>See log."), function()  {sys.$params(arguments.length, 0);});
    else
      msg.error(II("Errors found.<br>See log."), function()  {sys.$params(arguments.length, 0);});
  } else if (withWarnings) {
    msg.info(II("Warnings found.<br>See log."), function()  {sys.$params(arguments.length, 0);});
  } else {
    msg.ok(II("Download ok."), function(){sys.$params(arguments.length, 0);});
  }

  mk2(wg, msel);
};




 function data(wg,  ibx)  {sys.$params(arguments.length, 2);
   const Cos =sys.$checkNull( ibx[ibex.Cos]);
  arr.sort(Cos,function(c1, c2)  {sys.$params(arguments.length, 2);  return c1 < c2;});
  const cosSz =sys.$checkNull( arr.size(Cos));
  const cosSz2 =sys.$checkNull( sys.$eq(cosSz % 2 , 0) ? cosSz / 2 : math.toInt(cosSz / 2) + 1);

  const tbCos =sys.$checkNull( Q("table")
    .klass("frame")
    .adds(iter.map(iter.$range(0,cosSz2), function(i)  {sys.$params(arguments.length, 1);  return Q("tr")
      .add(Q("td")
        .style("align:left")
        .text(Cos[i]))
      .add(Q("td")
        .html("&nbsp;&nbsp;"))
      .add(Q("td")
        .style("align:left")
        .text(i + cosSz2 >= cosSz ? "" : Cos[i + cosSz2]));})))
  ;

  const viewer =sys.$checkNull( Q("textarea")
    .att("cols", 70)
    .att("rows", 25)
    .att("disabled", true)
    .text(
      "| " + fcenter(II("Date"), 8) +
      " |" + fright(II("Open"), 10) +
      " |" + fright(II("CloseN"), 10) +
      " |" + fright(II("Max."), 10) +
      " |" + fright(II("Min."), 10) +
      " |" + fright(II("Vol."), 16) +
      " |\n" +
      "|-" + ffill("-", 8) +
      "-|" + ffill("-", 10) +
      "-|" + ffill("-", 10) +
      "-|" + ffill("-", 10) +
      "-|" + ffill("-", 10) +
      "-|" + ffill("-", 16) +
      "-|\n" +
      arr.join(arr.map(ibx[ibex.Qs], function( q)  {sys.$params(arguments.length, 1); 
        return "| " + fcenter(q[quote.date], 8) +
        " |" + fright(math.toIso(q[quote.open], 2), 10) +
        " |" + fright(math.toIso(q[quote.close], 2), 10) +
        " |" + fright(math.toIso(q[quote.max], 2), 10) +
        " |" + fright(math.toIso(q[quote.min], 2), 10) +
        " |" + fright(math.toIso(q[quote.vol], 0), 16) +
        " |"
        ;}), "\n") +
      "\n"
    ))
  ;

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("head")
          .text(II("Companies")))
        .add(Q("td"))
        .add(Q("td")
          .klass("head")
          .text(II("Quotes"))))
      .add(Q("tr")
        .add(Q("td")
          .style("vertical-align:top")
          .add(tbCos))
        .add(Q("td"))
        .add(Q("td")
          .add(viewer))))
  ;
};


 function charts(wg,  Qs)  {sys.$params(arguments.length, 2);
   const Es =sys.$checkNull( arr.map(Qs,
    function( q)  {sys.$params(arguments.length, 1);  return profitsEntry.mk(q[quote.date], q[quote.close], q[quote.close], q[quote.close]);}
  ));
  const now =sys.$checkNull( time.now());
  const today =sys.$checkNull( time.toStr(now));

   const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.exArea.width =sys.$checkExists(Chart.exArea.width,sys.$checkNull( 600));
  Chart.exArea.height =sys.$checkExists(Chart.exArea.height,sys.$checkNull( 200));
  Chart.exArea.atts.border.width =sys.$checkExists(Chart.exArea.atts.border.width,sys.$checkNull( 0));
  Chart.inPadding.top =sys.$checkExists(Chart.inPadding.top,sys.$checkNull( 10));
  Chart.inPadding.right =sys.$checkExists(Chart.inPadding.right,sys.$checkNull( 10));
  Chart.inPadding.bottom =sys.$checkExists(Chart.inPadding.bottom,sys.$checkNull( 20));
  Chart.inPadding.left =sys.$checkExists(Chart.inPadding.left,sys.$checkNull( 85));
  Chart.chartPadding.top =sys.$checkExists(Chart.chartPadding.top,sys.$checkNull( 4));
  Chart.chartPadding.right =sys.$checkExists(Chart.chartPadding.right,sys.$checkNull( 2));
  Chart.chartPadding.bottom =sys.$checkExists(Chart.chartPadding.bottom,sys.$checkNull( 4));
  Chart.chartPadding.left =sys.$checkExists(Chart.chartPadding.left,sys.$checkNull( 2));

  

  const month =sys.$checkNull( sys.$slice(today,null,6));
   const E00s =sys.$checkNull( arr.dropWhile(Es,function( e)  {sys.$params(arguments.length, 1);  return sys.$slice(e[profitsEntry.date],null,6) <  month;}));
   const E0s =sys.$checkNull( arr.size(E00s) > 1 ? E00s : sys.$slice(Es, -2,null));
   const ef0 =sys.$checkNull( E0s[0]);
   const el0 =sys.$checkNull( arr.peek(E0s));
  const total0 =sys.$checkNull( el0[profitsEntry.total] - ef0[profitsEntry.total]);

  const back0 =sys.$checkNull( total0 > 0
    ? "#e9e9f2"
    : total0 < 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background,sys.$checkNull( back0));

  const Lb0s =sys.$checkNull( []);
  const Val0s =sys.$checkNull( [[]]);
  for (const  e  of sys.$forObject( E0s)) {
    arr.push(Lb0s,time.toIso(time.fromStr(e[profitsEntry.date])[0]));
    arr.push(Val0s[0], [e[profitsEntry.total]]);
  }
  const Att0s =sys.$checkNull( [
    lineChart.mkLine(2, "#0041aa", false)
  ]);
   const Data0 =sys.$checkNull( lineChart.mkData(Lb0s, Val0s, Att0s));
  Data0.round =sys.$checkExists(Data0.round,sys.$checkNull( 0));
  Data0.Labels =sys.$checkExists(Data0.Labels,sys.$checkNull( Lb0s));
  Data0.SetValues =sys.$checkExists(Data0.SetValues,sys.$checkNull( [Val0s[0]]));
  Data0.SetAtts =sys.$checkExists(Data0.SetAtts,sys.$checkNull( Att0s));
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
        .add(lineChart.mkWg(Chart, Data0)))))
  ;

  

  const year =sys.$checkNull( sys.$slice(today,null,4));
  const E10s =sys.$checkNull( arr.dropWhile(Es,function( e)  {sys.$params(arguments.length, 1);  return sys.$slice(e[profitsEntry.date],null,4) <  year;}));
   const E1s =sys.$checkNull( arr.size(E10s) > 1 ? E10s : sys.$slice(Es, -2,null));
   const ef1 =sys.$checkNull( E1s[0]);
   const el1 =sys.$checkNull( arr.peek(E1s));
  const total1 =sys.$checkNull( el1[profitsEntry.total] - ef1[profitsEntry.total]);

  Chart.chartPadding.top =sys.$checkExists(Chart.chartPadding.top,sys.$checkNull( 2));
  Chart.chartPadding.bottom =sys.$checkExists(Chart.chartPadding.bottom,sys.$checkNull( 2));
  const back1 =sys.$checkNull( total1 > 0
    ? "#e9e9f2"
    : total1< 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background,sys.$checkNull( back1));

  const Lb1s =sys.$checkNull( []);
  const Val1s =sys.$checkNull( [[]]);
  for (const  e  of sys.$forObject( E1s)) {
    arr.push(Lb1s,time.toIso(time.fromStr(e[profitsEntry.date])[0]));
    arr.push(Val1s[0], [e[profitsEntry.total]]);
  }
  const Att1s =sys.$checkNull( [
    lineChart.mkLine(1.5, "#0041aa", false)
  ]);
   const Data1 =sys.$checkNull( lineChart.mkData(Lb1s, Val1s, Att1s));
  Data1.round =sys.$checkExists(Data1.round,sys.$checkNull( 0));
  Data1.Labels =sys.$checkExists(Data1.Labels,sys.$checkNull( Lb1s));
  Data1.SetValues =sys.$checkExists(Data1.SetValues,sys.$checkNull( [Val1s[0]]));
  Data1.SetAtts =sys.$checkExists(Data1.SetAtts,sys.$checkNull( Att1s));
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
        .add(lineChart.mkWg(Chart, Data1)))))
  ;

  

  const year2 =sys.$checkNull( time.toStr(time.addDays(now,  -365)));
   const E20s =sys.$checkNull( arr.dropWhile(Es,function( e)  {sys.$params(arguments.length, 1);  return e[profitsEntry.date] < year2;}));
   const E2s =sys.$checkNull( arr.size(E20s) > 1 ? E20s : sys.$slice(Es, -2,null));
   const ef2 =sys.$checkNull( E2s[0]);
   const el2 =sys.$checkNull( arr.peek(E2s));
  const total2 =sys.$checkNull( el2[profitsEntry.total] - ef2[profitsEntry.total]);

  const back2 =sys.$checkNull( total2 > 0
    ? "#e9e9f2"
    : total2< 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background,sys.$checkNull( back2));

  const Lb2s =sys.$checkNull( []);
  const Val2s =sys.$checkNull( [[]]);
  for (const  e  of sys.$forObject( E2s)) {
    arr.push(Lb2s,time.toIso(time.fromStr(e[profitsEntry.date])[0]));
    arr.push(Val2s[0], [e[profitsEntry.total]]);
  }
  const Att2s =sys.$checkNull( [
    lineChart.mkLine(1.5, "#0041aa", false)
  ]);
   const Data2 =sys.$checkNull( lineChart.mkData(Lb2s, Val2s, Att2s));
  Data2.round =sys.$checkExists(Data2.round,sys.$checkNull( 0));
  Data2.Labels =sys.$checkExists(Data2.Labels,sys.$checkNull( Lb2s));
  Data2.SetValues =sys.$checkExists(Data2.SetValues,sys.$checkNull( [Val2s[0]]));
  Data2.SetAtts =sys.$checkExists(Data2.SetAtts,sys.$checkNull( Att2s));
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
        .add(lineChart.mkWg(Chart, Data2)))))
  ;

  

   const E3s =sys.$checkNull( Es);
   const ef3 =sys.$checkNull( E3s[0]);
   const el3 =sys.$checkNull( arr.peek(E3s));
  const total3 =sys.$checkNull( el3[profitsEntry.total] - ef3[profitsEntry.total]);

  const back3 =sys.$checkNull( total3 > 0
    ? "#e9e9f2"
    : total3 < 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background,sys.$checkNull( back3));

  const Lb3s =sys.$checkNull( []);
  const Val3s =sys.$checkNull( [[]]);
  for (const  e  of sys.$forObject( E3s)) {
    arr.push(Lb3s,time.toIso(time.fromStr(e[profitsEntry.date])[0]));
    arr.push(Val3s[0], [e[profitsEntry.total]]);
  }
  const Att3s =sys.$checkNull( [
    lineChart.mkLine(1.5, "#0041aa", false)
  ]);
   const Data3 =sys.$checkNull( lineChart.mkData(Lb3s, Val3s, Att3s));
  Data3.round =sys.$checkExists(Data3.round,sys.$checkNull( 0));
  Data3.Labels =sys.$checkExists(Data3.Labels,sys.$checkNull( Lb3s));
  Data3.SetValues =sys.$checkExists(Data3.SetValues,sys.$checkNull( [Val3s[0]]));
  Data3.SetAtts =sys.$checkExists(Data3.SetAtts,sys.$checkNull( Att3s));
  Data3.drawGrid =sys.$checkExists(Data3.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(sys.$slice(Lb3s[i - 1],3,5) , sys.$slice(lb,3,5)) && sys.$neq(str.index("01 04 07 10", sys.$slice(lb,3,5)) ,  -1)
      ? true
      : false;
  });
  Data3.drawLabel =sys.$checkExists(Data3.drawLabel,sys.$checkNull( Data3.drawGrid));
  Data3.mapLabel =sys.$checkExists(Data3.mapLabel, function(lb, i)  {sys.$params(arguments.length, 2);  return sys.$eq(sys.$slice(lb,3,5) , "01") ? sys.$slice(lb,6,null) : sys.$slice(lb,3,5);});

  const all =sys.$checkNull( Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back3)
        .add(lineChart.mkWg(Chart, Data3)))))
  ;


  wg
    .removeAll()
    .add(Q("div").klass("head").html(II("Last Month")))
    .add(lastMonth)
    .add(lastMonth)
    .add(Q("div").klass("head").html(II("Current Year")))
    .add(currentYear)
    .add(Q("div").klass("head").html(II("Last Year")))
    .add(lastYear)
    .add(Q("div").klass("head").html(II("All")))
    .add(all)
  ;
};


 function fcenter(tx, n)  {sys.$params(arguments.length, 2);
  const len =sys.$checkNull( str.len(tx));
  if (n < len)  return sys.$slice(tx,null,n);
  const dif =sys.$checkNull( n - len);
  const left =sys.$checkNull( math.toInt(dif / 2));
  const right =sys.$checkNull( dif - left);
   return iter.reduce(
      iter.$range(0,right),
      iter.reduce(iter.$range(0,left), tx, function(r, i)  {sys.$params(arguments.length, 2);  return " " + r;}),
      function(r, i)  {sys.$params(arguments.length, 2);  return r + " ";}
    );
};


 function fright(tx, n)  {sys.$params(arguments.length, 2);
  const len =sys.$checkNull( str.len(tx));
  if (n < len)  return sys.$slice(tx,null,n);
  const dif =sys.$checkNull( n - len);
   return iter.reduce(iter.$range(0,dif), tx, function(r, i)  {sys.$params(arguments.length, 2);  return " " + r;});
};


 function ffill(ch, n)  {sys.$params(arguments.length, 2);  return iter.reduce(iter.$range(0,n), "", function(r, i)  {sys.$params(arguments.length, 2);  return r + ch;});};
