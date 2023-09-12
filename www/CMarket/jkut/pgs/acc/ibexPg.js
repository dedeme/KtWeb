import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as lineChart from  "../../libdm/lineChart.js";
import * as modalBox from  "../../libdm/modalBox.js";
import * as cts from  "../../data/cts.js";
import * as ibex from  "../../data/ibex.js";
import * as msg from  "../../wgs/msg.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const msgWait =sys.$checkNull( Q("div"));



export  function mk(wg)  {sys.$params(arguments.length, 1);
  mk2(wg, "charts");
};






 async  function mk2(wg, msel)  {sys.$params(arguments.length, 2);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "ibexPg",
    rq: "idata"
  }));
  const Ibex =sys.$checkNull( ibex.fromJs(Rp.ibex));

  const Lopts =sys.$checkNull( [
    menu.toption("charts", II("Charts"), function()  {sys.$params(arguments.length, 0); mk2(wg, "charts");}),
    menu.separator(),
    menu.toption("data", II("Data"), function()  {sys.$params(arguments.length, 0); mk2(wg, "data");})
  ]);
  const Ropts =sys.$checkNull( [menu.toption("update", II("Update"), function()  {sys.$params(arguments.length, 0); update(wg, msel);})]);
  const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, msel, false));

  const body =sys.$checkNull( Q("div"));

  if (sys.asBool(sys.$eq(msel , "data"))) data(body, Ibex);
  else charts(body, arr.reverse(Ibex.qs));

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
    .add(box.wg);
  modalBox.show(box, true);

  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "ibexPg",
    rq: "update"
  }));

  modalBox.show(box,false);

  if (sys.asBool(Rp.withError)) {
    if (sys.asBool(Rp.withWarnings))
      msg.error(II("Errors and warnings found.<br>See log."), function()  {sys.$params(arguments.length, 0);});
    else
      msg.error(II("Errors found.<br>See log."), function()  {sys.$params(arguments.length, 0);});
  } else if (sys.asBool(Rp.withWarnings)) {
    msg.info(II("Warnings found.<br>See log."), function()  {sys.$params(arguments.length, 0);});
  } else {
    msg.ok(II("Download ok."), function(){sys.$params(arguments.length, 0);});
  }

  mk2(wg, msel);
};




 function data(wg, Ibex)  {sys.$params(arguments.length, 2);
  const Cos =sys.$checkNull( Ibex.cos);
  arr.sort(Cos, function(c1, c2)  {sys.$params(arguments.length, 2);  return c1 < c2;});
  const cosSz =sys.$checkNull( arr.size(Cos));
  const cosSz2 =sys.$checkNull(sys.asBool( sys.$eq(cosSz % 2 , 0)) ? cosSz / 2 : math.toInt(cosSz / 2) + 1);

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
        .text(sys.asBool(i + cosSz2 >= cosSz) ? "" : Cos[i + cosSz2]));})))
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
      arr.join(arr.map(Ibex.qs, function(Qt)  {sys.$params(arguments.length, 1); 
        return "| " + fcenter(Qt.date, 8) +
        " |" + fright(math.toIso(Qt.open, 2), 10) +
        " |" + fright(math.toIso(Qt.close, 2), 10) +
        " |" + fright(math.toIso(Qt.max, 2), 10) +
        " |" + fright(math.toIso(Qt.min, 2), 10) +
        " |" + fright(math.toIso(Qt.vol, 0), 16) +
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


 function charts(wg, Qs)  {sys.$params(arguments.length, 2);
  const Es =sys.$checkNull( arr.map(Qs, function(Qt)  {sys.$params(arguments.length, 1);  return {date: Qt.date, total: Qt.close};}));
  const now =sys.$checkNull( time.now());
  const today =sys.$checkNull( time.toStr(now));

  const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.ExArea.width =sys.$checkExists(Chart.ExArea.width,sys.$checkNull( 600));
  Chart.ExArea.height =sys.$checkExists(Chart.ExArea.height,sys.$checkNull( 200));
  Chart.ExArea.Atts.Border.width =sys.$checkExists(Chart.ExArea.Atts.Border.width,sys.$checkNull( 0));
  Chart.InPadding.top =sys.$checkExists(Chart.InPadding.top,sys.$checkNull( 10));
  Chart.InPadding.right =sys.$checkExists(Chart.InPadding.right,sys.$checkNull( 10));
  Chart.InPadding.bottom =sys.$checkExists(Chart.InPadding.bottom,sys.$checkNull( 20));
  Chart.InPadding.left =sys.$checkExists(Chart.InPadding.left,sys.$checkNull( 85));
  Chart.ChartPadding.top =sys.$checkExists(Chart.ChartPadding.top,sys.$checkNull( 4));
  Chart.ChartPadding.right =sys.$checkExists(Chart.ChartPadding.right,sys.$checkNull( 2));
  Chart.ChartPadding.bottom =sys.$checkExists(Chart.ChartPadding.bottom,sys.$checkNull( 4));
  Chart.ChartPadding.left =sys.$checkExists(Chart.ChartPadding.left,sys.$checkNull( 2));

  

  const month =sys.$checkNull( sys.$slice(today,null,6));
  const E00s =sys.$checkNull( arr.dropWhile(Es, function(E)  {sys.$params(arguments.length, 1);  return sys.$slice(E.date,null,6) <  month;}));
  const E0s =sys.$checkNull(sys.asBool( arr.size(E00s) > 1) ? E00s : sys.$slice(Es, -2,null));
  const Ef0 =sys.$checkNull( E0s[0]);
  const El0 =sys.$checkNull( arr.peek(E0s));
  const total0 =sys.$checkNull( El0.total - Ef0.total);

  const back0 =sys.$checkNull(sys.asBool( total0 > 0)
    ? "#e9e9f2"
    :sys.asBool( total0 < 0)
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.ExArea.Atts.background =sys.$checkExists(Chart.ExArea.Atts.background,sys.$checkNull( back0));

  const Lb0s =sys.$checkNull( []);
  const Val0s =sys.$checkNull( [[]]);
  for (const E  of sys.$forObject( E0s)) {
    arr.push(Lb0s, time.toIso(time.fromStr(E.date)[0]));
    arr.push(Val0s[0], [E.total]);
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
    if (sys.asBool(sys.$eq(i , 0)))  return false;
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
  const E10s =sys.$checkNull( arr.dropWhile(Es, function(E)  {sys.$params(arguments.length, 1);  return sys.$slice(E.date,null,4) <  year;}));
  const E1s =sys.$checkNull(sys.asBool( arr.size(E10s) > 1) ? E10s : sys.$slice(Es, -2,null));
  const Ef1 =sys.$checkNull( E1s[0]);
  const El1 =sys.$checkNull( arr.peek(E1s));
  const total1 =sys.$checkNull( El1.total - Ef1.total);

  Chart.ChartPadding.top =sys.$checkExists(Chart.ChartPadding.top,sys.$checkNull( 2));
  Chart.ChartPadding.bottom =sys.$checkExists(Chart.ChartPadding.bottom,sys.$checkNull( 2));
  const back1 =sys.$checkNull(sys.asBool( total1 > 0)
    ? "#e9e9f2"
    :sys.asBool( total1< 0)
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.ExArea.Atts.background =sys.$checkExists(Chart.ExArea.Atts.background,sys.$checkNull( back1));

  const Lb1s =sys.$checkNull( []);
  const Val1s =sys.$checkNull( [[]]);
  for (const E  of sys.$forObject( E1s)) {
    arr.push(Lb1s, time.toIso(time.fromStr(E.date)[0]));
    arr.push(Val1s[0], [E.total]);
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
    if (sys.asBool(sys.$eq(i , 0)))  return false;
    return sys.asBool( sys.$neq(sys.$slice(Lb1s[i - 1],3,5) , sys.$slice(lb,3,5))) ? true : false;
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
  const E20s =sys.$checkNull( arr.dropWhile(Es, function(E)  {sys.$params(arguments.length, 1);  return E.date < year2;}));
  const E2s =sys.$checkNull(sys.asBool( arr.size(E20s) > 1) ? E20s : sys.$slice(Es, -2,null));
  const Ef2 =sys.$checkNull( E2s[0]);
  const El2 =sys.$checkNull( arr.peek(E2s));
  const total2 =sys.$checkNull( El2.total - Ef2.total);

  const back2 =sys.$checkNull(sys.asBool( total2 > 0)
    ? "#e9e9f2"
    :sys.asBool( total2< 0)
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.ExArea.Atts.background =sys.$checkExists(Chart.ExArea.Atts.background,sys.$checkNull( back2));

  const Lb2s =sys.$checkNull( []);
  const Val2s =sys.$checkNull( [[]]);
  for (const E  of sys.$forObject( E2s)) {
    arr.push(Lb2s, time.toIso(time.fromStr(E.date)[0]));
    arr.push(Val2s[0], [E.total]);
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
    if (sys.asBool(sys.$eq(i , 0)))  return false;
    return sys.asBool( sys.$neq(sys.$slice(Lb2s[i - 1],3,5) , sys.$slice(lb,3,5))) ? true : false;
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
  const Ef3 =sys.$checkNull( E3s[0]);
  const El3 =sys.$checkNull( arr.peek(E3s));
  const total3 =sys.$checkNull( El3.total - Ef3.total);

  const back3 =sys.$checkNull(sys.asBool( total3 > 0)
    ? "#e9e9f2"
    :sys.asBool( total3 < 0)
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.ExArea.Atts.background =sys.$checkExists(Chart.ExArea.Atts.background,sys.$checkNull( back3));

  const Lb3s =sys.$checkNull( []);
  const Val3s =sys.$checkNull( [[]]);
  for (const E  of sys.$forObject( E3s)) {
    arr.push(Lb3s, time.toIso(time.fromStr(E.date)[0]));
    arr.push(Val3s[0], [E.total]);
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
    if (sys.asBool(sys.$eq(i , 0)))  return false;
    return sys.asBool( sys.asBool(sys.$neq(sys.$slice(Lb3s[i - 1],3,5) , sys.$slice(lb,3,5))) && sys.asBool(sys.$neq(str.index("01 04 07 10", sys.$slice(lb,3,5)) ,  -1)))
      ? true
      : false;
  });
  Data3.drawLabel =sys.$checkExists(Data3.drawLabel,sys.$checkNull( Data3.drawGrid));
  Data3.mapLabel =sys.$checkExists(Data3.mapLabel, function(lb, i)  {sys.$params(arguments.length, 2); return sys.asBool( sys.$eq(sys.$slice(lb,3,5) , "01")) ? sys.$slice(lb,6,null) : sys.$slice(lb,3,5);});

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
  if (sys.asBool(n < len))  return sys.$slice(tx,null,n);
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
  if (sys.asBool(n < len))  return sys.$slice(tx,null,n);
  const dif =sys.$checkNull( n - len);
   return iter.reduce(iter.$range(0,dif), tx, function(r, i)  {sys.$params(arguments.length, 2);  return " " + r;});
};


 function ffill(ch, n)  {sys.$params(arguments.length, 2);  return iter.reduce(iter.$range(0,n), "", function(r, i)  {sys.$params(arguments.length, 2);  return r + ch;});};
