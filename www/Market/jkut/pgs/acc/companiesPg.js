import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as lineChart from  "../../libdm/lineChart.js";
import * as cts from  "../../cts.js";
import * as profitsEntry from  "../../data/chart/profitsEntry.js";
import * as msg from  "../../wgs/msg.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



export  async  function mk(wg)  {sys.$params(arguments.length, 1);
    const {Lst} = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "CompaniesPg",
    rq: "idata"
  });
  const List =sys.$checkNull( arr.map(Lst,function(E)  {sys.$params(arguments.length, 1);  return {nick: E[0], bought: E[1], url: E[2]};}));

  const showAllV =sys.$checkNull( [false]);
  const showV =sys.$checkNull( [[]]);

  

   function changeShowAll()  {sys.$params(arguments.length, 0);
    showAllV[0] =sys.$checkExists(showAllV[0],sys.$checkNull( !sys.asBool(showAllV[0])));
    showV[0]();
  };

  

  
   function separator()  {sys.$params(arguments.length, 0);  return Q("tr")
    .add(Q("td")
      .att("colspan", 3)
      .html("<hr>"))
  ;};

  
   function backColor(prevQ,  Refs, nextQ)  {sys.$params(arguments.length, 3);
     return arr.any(Refs,function(ref)  {sys.$params(arguments.length, 1);  return prevQ < ref && ref < nextQ;})
      ? "#fff0f0"
      : arr.any(Refs,function(ref)  {sys.$params(arguments.length, 1);  return prevQ > ref && ref > nextQ;})
        ? "#f0f0ff"
        : "#c9c9c9"
    ;};

  
   async  function mkChart(wg, nick, url)  {sys.$params(arguments.length, 3);
    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:center")
            .add(Q("img")
              .att("src", "img/wait2.gif")
              .klass("frame")))))
    ;

    const {error, 
    price, 
    profits, 
     Dates,  Closes,  Refs} 
    = await  client.send({
      prg: cts.appName,
      module: "Acc",
      source: "CompaniesPg",
      rq: "nickData",
      nick:nick
    });

    
    if (sys.$neq(error , "")) {
      wg.removeAll()
        .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .style("width:300px")
            .text(error))))
      ;
      return;
    }

    const back =sys.$checkNull( backColor(
      sys.$slice(Closes, -2,null)[0],
      arr.map(Refs, function(Rs)  {sys.$params(arguments.length, 1);  return sys.$slice(Rs, -2,null)[0];}),
      arr.peek(Closes)
    ));

    
     function mkSmallGr()  {sys.$params(arguments.length, 0);
       const Ch =sys.$checkNull( lineChart.mkExample());
      Ch.exArea.width =sys.$checkExists(Ch.exArea.width,sys.$checkNull( 300));
      Ch.exArea.height =sys.$checkExists(Ch.exArea.height,sys.$checkNull( 150));
      Ch.exArea.atts.background =sys.$checkExists(Ch.exArea.atts.background,sys.$checkNull( back));
      Ch.exArea.atts.border.width =sys.$checkExists(Ch.exArea.atts.border.width,sys.$checkNull( 0));
      Ch.inPadding.top =sys.$checkExists(Ch.inPadding.top,sys.$checkNull( 5));
      Ch.inPadding.right =sys.$checkExists(Ch.inPadding.right,sys.$checkNull( 4));
      Ch.inPadding.bottom =sys.$checkExists(Ch.inPadding.bottom,sys.$checkNull( 4));
      Ch.inPadding.left =sys.$checkExists(Ch.inPadding.left,sys.$checkNull( 50));
      Ch.chartPadding.top =sys.$checkExists(Ch.chartPadding.top,sys.$checkNull( 2));
      Ch.chartPadding.right =sys.$checkExists(Ch.chartPadding.right,sys.$checkNull( 2));
      Ch.chartPadding.bottom =sys.$checkExists(Ch.chartPadding.bottom,sys.$checkNull( 2));
      Ch.chartPadding.left =sys.$checkExists(Ch.chartPadding.left,sys.$checkNull( 2));
      Ch.labels.show =sys.$checkExists(Ch.labels.show,sys.$checkNull( false));

      const Lbs =sys.$checkNull( []);
      const Vals =sys.$checkNull( [[], [], []]);
       const Dates2 =sys.$checkNull( sys.$slice(Dates, -250,null));
       const Closes2 =sys.$checkNull( sys.$slice(Closes, -250,null));
       const Refs2 =sys.$checkNull( sys.$slice(Refs[0], -250,null));
      for (let i = 0;i < arr.size(Dates2); ++i) {
        const cl =sys.$checkNull( Closes2[i]);
        const rf =sys.$checkNull( Refs2[i]);
        arr.push(Lbs,time.toIso(time.fromStr(Dates2[i])[0]));
        arr.push(Vals[0], [cl]);
        arr.push(Vals[1], cl > rf ? [rf] : []);
        arr.push(Vals[2], cl < rf ? [rf] : []);
      }
      const Atts =sys.$checkNull( [
        lineChart.mkLine(1.2, "#414141", false),
        lineChart.mkLine(1.2, "#aa4100", false),
        lineChart.mkLine(1.2, "#0041aa", false)
      ]);
       const Data =sys.$checkNull( lineChart.mkData(Lbs, Vals, Atts));
      Data.Labels =sys.$checkExists(Data.Labels,sys.$checkNull( Lbs));
      Data.SetValues =sys.$checkExists(Data.SetValues,sys.$checkNull( [Vals[0], Vals[1], Vals[2]]));
      if (price >= 0)
        Data.UnarySets =sys.$checkExists(Data.UnarySets,sys.$checkNull( [lineChart.mkUnarySet(
            II("Price"),
            price,
            lineChart.mkLine(1.2, "#c9c9c9", false)
          )]));
      Data.SetAtts =sys.$checkExists(Data.SetAtts,sys.$checkNull( Atts));
      Data.maxMinRound =sys.$checkExists(Data.maxMinRound, function(mx, mn)  {sys.$params(arguments.length, 2);
        if (mn > 10) {
          Data.round =sys.$checkExists(Data.round,sys.$checkNull( 1));
            return -2;
        } else if (mn > 1) {
          Data.round =sys.$checkExists(Data.round,sys.$checkNull( 2));
            return -3;
        } else {
          Data.round =sys.$checkExists(Data.round,sys.$checkNull( 3));
            return -4;
        }
      });
      Data.drawGrid =sys.$checkExists(Data.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);  return false;});
      Data.drawLabel =sys.$checkExists(Data.drawLabel,sys.$checkNull( Data.drawGrid));

       return Q("table")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame0")
            .style("background-color:" + back)
            .add(lineChart.mkWg(Ch, Data))))
      ;
    };

    
     function mkBigGr()  {sys.$params(arguments.length, 0);
       const Ch =sys.$checkNull( lineChart.mkExample());
      Ch.exArea.width =sys.$checkExists(Ch.exArea.width,sys.$checkNull( 600));
      Ch.exArea.height =sys.$checkExists(Ch.exArea.height,sys.$checkNull( 300));
      Ch.exArea.atts.background =sys.$checkExists(Ch.exArea.atts.background,sys.$checkNull( back));
      Ch.exArea.atts.border.width =sys.$checkExists(Ch.exArea.atts.border.width,sys.$checkNull( 0));
      Ch.exArea.atts.background =sys.$checkExists(Ch.exArea.atts.background,sys.$checkNull( back));
      Ch.inPadding.top =sys.$checkExists(Ch.inPadding.top,sys.$checkNull( 10));
      Ch.inPadding.right =sys.$checkExists(Ch.inPadding.right,sys.$checkNull( 5));
      Ch.inPadding.bottom =sys.$checkExists(Ch.inPadding.bottom,sys.$checkNull( 20));
      Ch.inPadding.left =sys.$checkExists(Ch.inPadding.left,sys.$checkNull( 80));
      Ch.chartPadding.top =sys.$checkExists(Ch.chartPadding.top,sys.$checkNull( 2));
      Ch.chartPadding.right =sys.$checkExists(Ch.chartPadding.right,sys.$checkNull( 4));
      Ch.chartPadding.bottom =sys.$checkExists(Ch.chartPadding.bottom,sys.$checkNull( 2));
      Ch.chartPadding.left =sys.$checkExists(Ch.chartPadding.left,sys.$checkNull( 2));
      Ch.labels.onPopup =sys.$checkExists(Ch.labels.onPopup,sys.$checkNull( true));

       function mk0(chartDiv, zoomDiv, zoom)  {sys.$params(arguments.length, 3);
        const Lbs =sys.$checkNull( []);
        const Vals =sys.$checkNull( [[], [], []]); 
         const Dates2 =sys.$checkNull( zoom ? sys.$slice(Dates, -30,null) : Dates);
         const Closes2 =sys.$checkNull( zoom ? sys.$slice(Closes, -30,null) : Closes);
         const Refs2 =sys.$checkNull( zoom ? sys.$slice(Refs[0], -30,null) : Refs[0]);

        for (let i = 0;i < arr.size(Dates2); ++i) {
          const cl =sys.$checkNull( Closes2[i]);
          const rf =sys.$checkNull( Refs2[i]);
          arr.push(Lbs,time.toIso(time.fromStr(Dates2[i])[0]));
          arr.push(Vals[0], [cl]);
          arr.push(Vals[1], cl > rf ? [rf] : []);
          arr.push(Vals[2], cl < rf ? [rf] : []);
        }
        const wln =sys.$checkNull( zoom ? 1.8 : 1);
        const Atts =sys.$checkNull( [
          lineChart.mkLine(wln, "#414141", false),
          lineChart.mkLine(wln, "#aa4100", false),
          lineChart.mkLine(wln, "#0041aa", false)
        ]);
         const Data =sys.$checkNull( lineChart.mkData(Lbs, Vals, Atts));
        Data.Labels =sys.$checkExists(Data.Labels,sys.$checkNull( Lbs));
        Data.SetValues =sys.$checkExists(Data.SetValues,sys.$checkNull( [Vals[0], Vals[1], Vals[2]]));
        if (price >= 0 && !sys.asBool(zoom))
          Data.UnarySets =sys.$checkExists(Data.UnarySets,sys.$checkNull( [lineChart.mkUnarySet(
              II("Price"),
              price,
              lineChart.mkLine(1.2, "#c9c9c9", false)
            )]));
        Data.SetAtts =sys.$checkExists(Data.SetAtts,sys.$checkNull( Atts));
        Data.maxMinRound =sys.$checkExists(Data.maxMinRound, function(mx, mn)  {sys.$params(arguments.length, 2);
          if (mn > 10) {
            Data.round =sys.$checkExists(Data.round,sys.$checkNull( 1));
              return -2;
          } else if (mn > 1) {
            Data.round =sys.$checkExists(Data.round,sys.$checkNull( 2));
              return -3;
          } else {
            Data.round =sys.$checkExists(Data.round,sys.$checkNull( 3));
              return -4;
          }
        });
        Data.drawGrid =sys.$checkExists(Data.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
          if (sys.$eq(i , 0))  return false;
           return zoom
            ? sys.$eq(i % 2 , 0)
            : sys.$neq(sys.$slice(Lbs[i - 1],3,5) , sys.$slice(lb,3,5)) &&(
                sys.$eq(sys.$slice(lb,3,5),"03")|| sys.$eq(sys.$slice(lb,3,5),"06")|| sys.$eq(sys.$slice(lb,3,5),"09")|| sys.$eq(sys.$slice(lb,3,5),"12")? true:  false)
          ;
        });
        Data.drawLabel =sys.$checkExists(Data.drawLabel,sys.$checkNull( Data.drawGrid));
        Data.mapLabel =sys.$checkExists(Data.mapLabel, function(lb, i)  {sys.$params(arguments.length, 2);  return zoom ? sys.$slice(lb,null,2) : sys.$slice(lb,3,5);});

        chartDiv
          .removeAll()
          .add(lineChart.mkWg(Ch, Data))
        ;

        zoomDiv
          .removeAll()
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); mk0(chartDiv, zoomDiv, !sys.asBool(zoom));})
              .klass("frame")
              .add(ui.img(zoom ? "rk-new" : "minus2")
                  .style("vertical-align:top")))
        ;
      };

      const chartDiv =sys.$checkNull( Q("div"));
      const zoomDiv =sys.$checkNull( Q("div"));
      mk0(chartDiv, zoomDiv, true);
       return Q("table")
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:center")
            .text(nick))
          .add(Q("td")))
        .add(Q("tr")
          .add(Q("td")
            .klass("frame0")
            .style("background-color:" + back)
            .add(chartDiv))
          .add(Q("td")
            .style("width:80px;vertical-align:middle;")
            .add(zoomDiv)))
      ;
    };

    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:left;width:40%")
            .add(Q("a")
              .klass("link")
              .att("href", url)
              .text(nick)))
          .add(Q("td")
            .style("text-align:right;width:40%")
            .add(Q("span")
              .html(math.toIso(profits, 2) + "&nbsp;&nbsp;"))
            .add(ui.img(
              profits > 0 ? "profits" : profits < 0 ? "losses" : "noresult"
            )
              .style("vertical-align:middle"))))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .add(mkSmallGr()
              .setStyle("cursor", "pointer")
              .on("click", function(e)  {sys.$params(arguments.length, 1); msg.showWg(mkBigGr(), function(){sys.$params(arguments.length, 0);});})))))
    ;
  };

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
     const Ls =sys.$checkNull( showAllV[0]
      ? List
      : arr.filter(List,function(E)  {sys.$params(arguments.length, 1);  return E.bought;}))
    ;
    arr.sort(Ls,function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.nick < E2.nick;});

    const chs =sys.$checkNull( Q("table")
      .att("align", "center")
      .klass("frame"))
    ;
    const TrV =sys.$checkNull( [Q("tr")]);
    chs.add(TrV[0]);
    const n1 =sys.$checkNull( arr.size(Ls) - 1);
    arr.eachSync (Ls,
      async  function(i, e)  {sys.$params(arguments.length, 2);
        const chart =sys.$checkNull( Q("div"));
        await mkChart(chart, Ls[i].nick, Ls[i].url);
        switch (i % 3) {
          case 0:{ {
            TrV[0].add(Q("td").add(chart));
          }break;}
          case 2:{ {
            TrV[0].add(Q("td").add(chart));
            chs.add(separator());
            if (i < n1) {
              TrV[0] =sys.$checkExists(TrV[0],sys.$checkNull( Q("tr")));
              chs.add(TrV[0]);
            }
          }break;}
          default:{
            TrV[0].add(Q("td").add(chart));}
        }
      },
      function()  {sys.$params(arguments.length, 0);
        switch (arr.size(Ls) % 3) {
          case 0:{ chs.add(TrV[0].add(Q("td")).add(Q("td")));break;}
          case 1:{ chs.add(TrV[0].add(Q("td")));break;}
        }
        chs.add(separator());
      }
    );


    wg
      .removeAll()
      .add(Q("div")
        .style("text-align:center")
        .add(ui.link(function(e)  {sys.$params(arguments.length, 1); changeShowAll();})
          .klass("link")
          .html(showAllV[0]
              ? II("Portfolio")
              : II("All Companies")
            )))
      .add(chs)
    ;
  });

  showV[0]();
};
