import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as clock from  "../../libdm/clock.js";
import * as cts from  "../../cts.js";
import * as fns from  "../../fns.js";
import * as global from  "../../global.js";
import * as dailyChart from  "../../data/chart/dailyChart.js";
import * as dailyInvestorData from  "../../data/chart/dailyInvestorData.js";
import * as dmenu from  "../../wgs/dmenu.js";
import * as i18n from  "../../i18n.js";
import * as cosSummaryChart from  "../../pgs/daily/cosSummaryChart.js";
import * as ixsSummaryChart from  "../../pgs/daily/ixsSummaryChart.js";
import * as coChart from  "../../pgs/daily/coChart.js";
import * as refBigChart from  "../../pgs/daily/refBigChart.js";
import * as refSmallChart from  "../../pgs/daily/refSmallChart.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 function color(v)  {sys.$params(arguments.length, 1);
   return "color:" + (v > 0 ? "#00AAFF" : v < 0 ? "#FF8100" : "#404040");};











export  function refProfits(modelId, params, stocks, q, ref)  {sys.$params(arguments.length, 5);
  if (sys.$neq(modelId , "APRX")) throw new Error( "Model " + modelId + " not implemented.");

  const inc =sys.$checkNull( params[1]);
   return stocks > 0
    ? (q < ref ? q - ref : (q - ref) * inc) * stocks
    : (q > ref ? ref - q : (ref - q) * inc) * (cts.bet / q)
  ;
};








export  async  function mk2(wg, dbmenu, mSel, order, isReverse)  {sys.$params(arguments.length, 5);
  const {dbKey,
   CosData,  IxsData, 
   CosSel,  Rebuys, 
  serverName, activity, 
  maxCos} 
  = await  client.send({
    prg: cts.appName,
    module: "DailyPg",
    source: "Daily",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

  const orderV =sys.$checkNull( [order]);
  const isReverseV =sys.$checkNull( [isReverse]);
  const refDifV =sys.$checkNull( [true]);

  
   const Profitss =sys.$checkNull( arr.reduce(CosData,
    [0, 0],
    function(R,  d)  {sys.$params(arguments.length, 2);
      const cl =sys.$checkNull( d[dailyChart.close]);
      const q =sys.$checkNull( arr.peek(d[dailyChart.Quotes]));
       const iDt =sys.$checkNull( d[dailyChart.invData]);
       return [
        R[0] + iDt[dailyInvestorData.stocks] * (q - (iDt[dailyInvestorData.isNew] ? iDt[dailyInvestorData.price] : cl)),
        R[1] + iDt[dailyInvestorData.stocks] * (q - iDt[dailyInvestorData.price])
      ];
    }
  ));
  const dayProfits =sys.$checkNull( Profitss[0]);
  const totalProfits =sys.$checkNull( Profitss[1]);

  const serverWg =sys.$checkNull( Q("span").text(serverName));
  const activityWg =sys.$checkNull( Q("span")
    .text(sys.$eq(activity , cts.active) ? "· · · ·" : ""))
  ;
  const showV =sys.$checkNull( [[]]);

  

    
     async  function reactivate()  {sys.$params(arguments.length, 0);
      if (!sys.asBool(ui.confirm(II("Reactivate daily charts?")))) return;

      serverWg
        .removeAll()
        .add(ui.img("wait.gif")
          .style("vertical-align:middle"))
      ;
      await client.send({
        prg: cts.appName,
        module: "DailyPg",
        source: "Daily",
        rq: "reactivate"
      });
      mk2(wg, dbmenu, mSel, orderV[0], isReverseV[0]);
    };

    
     function newServer()  {sys.$params(arguments.length, 0); ui.alert(II("Currently this functions is deactivated"));};

    
     function updateActivityWg(tic)  {sys.$params(arguments.length, 1);
      activityWg
        .removeAll()
        .text(tic < 0
            ? ""
            : iter.reduce(iter.$range(0,tic), "", function(r, i)  {sys.$params(arguments.length, 2);   return r + " ·";})
          )
      ;
    };

    
     async  function setSelected(nick, isSel)  {sys.$params(arguments.length, 2);
      await client.send({
        prg: cts.appName,
        module: "DailyPg",
        source: "Daily",
        rq: "setSelected",
        dbKey: global.dbKeyV[0],
        nick:nick,
        isSel:isSel
      });

      mk2(wg, dbmenu, mSel, orderV[0], isReverseV[0]);
    };

    
     function changeRefType() {sys.$params(arguments.length, 0);
      refDifV[0] =sys.$checkExists(refDifV[0],sys.$checkNull( !sys.asBool(refDifV[0])));
      showV[0]();
    };

  

  
   function mkCoHead( d)  {sys.$params(arguments.length, 1);
    
     function separator()  {sys.$params(arguments.length, 0);  return Q("span").html("&nbsp;&nbsp;");};

    
     function color(v)  {sys.$params(arguments.length, 1);
       return "color:" + (v > 0 ? "#00aaff" : v < 0 ? "#ff8100" : "#a9a9a9")
    ;};

    const nick =sys.$checkNull( d[dailyChart.nick]);
    const close =sys.$checkNull( d[dailyChart.close]);
    const quote =sys.$checkNull( arr.peek(d[dailyChart.Quotes]));
     const iDt =sys.$checkNull( d[dailyChart.invData]);
    const ref =sys.$checkNull( iDt[dailyInvestorData.ref]);
    const stocks =sys.$checkNull( iDt[dailyInvestorData.stocks]);
    const dailyProfits =sys.$checkNull( iDt[dailyInvestorData.stocks] * (quote - (iDt[dailyInvestorData.isNew] ? iDt[dailyInvestorData.price] : close)));
    const totalProfits =sys.$checkNull( iDt[dailyInvestorData.stocks] * (quote - iDt[dailyInvestorData.price]));
    const isSel =sys.$checkNull( arr.any(CosSel,function(c)  {sys.$params(arguments.length, 1);  return sys.$eq(c , nick);}));
    const isRebuy =sys.$checkNull( arr.any(Rebuys,function(r)  {sys.$params(arguments.length, 1);  return sys.$eq(r , nick);}));
    const dif =sys.$checkNull( (quote - close) / close);
    const rdif =sys.$checkNull( close > ref ? ref / quote : quote / ref);


     return Q("tr")
        .add(Q("td")
          .klass("chartLeft")
          .add(Q("span")
            .text(nick))
          .add(separator())
          .add(isSel
            ? ui.link(function(e)  {sys.$params(arguments.length, 1); setSelected(nick, false);})
              .add(ui.img("unlink"))
            : ui.link(function(e)  {sys.$params(arguments.length, 1); setSelected(nick, true);})
              .add(ui.img("link")))
          .add(separator())
          .add(Q("span")
            .style("font-size:small")
            .text(math.toIso(
                quote,
                quote >= 10
                  ? 2
                  : quote >= 1
                    ? 3
                    : 4
              )))
          .add(separator())
          .add(dif > 0
            ? ui.img("money_plus")
            : dif < 0
              ? ui.img("money_minus")
              : ui.img("money"))
          .add(separator())
          .add(Q("span")
            .style("font-size:small;" + color(dif))
            .text(math.toIso(dif * 100, 2) + "%"))
          .add(Q("br"))
          .add(Q("span")
            .style("font-size:small;" + color(close > ref
                ?  -1
                : isRebuy ? 0 : 1
              ))
            .text(math.toIso(rdif * 100, 2) + "%")
          ))
        .add(stocks > 0
          ? Q("td")
            .klass("chartRight")
            .add(Q("span")
              .style(color(dailyProfits))
              .text(math.toIso(dailyProfits, 2)))
            .add(Q("br"))
            .add(Q("span")
              .style(color(totalProfits))
              .text(math.toIso(totalProfits, 2)))
          : Q("td").klass("chartRight"))
    ;
  };

  

  
   function mkSummary()  {sys.$params(arguments.length, 0);
    const yesterdayValueV =sys.$checkNull( [0]);
    const todayValueV =sys.$checkNull( [0]);
     const Labels =sys.$checkNull( CosData[0][dailyChart.Hours]);
    const size =sys.$checkNull( arr.size(Labels));
    const Values =sys.$checkNull( arr.mk(size, 0));
    for (const  cD  of sys.$forObject( CosData)) {
      const cl =sys.$checkNull( cD[dailyChart.close]);
       const Quotes =sys.$checkNull( cD[dailyChart.Quotes]);
      const quote =sys.$checkNull( arr.peek(Quotes));
       const iDt =sys.$checkNull( cD[dailyChart.invData]);
      const stocks =sys.$checkNull( iDt[dailyInvestorData.stocks]);
      yesterdayValueV[0] +=sys.$checkExists(yesterdayValueV[0],sys.$checkNull( iDt[dailyInvestorData.stocks] * (iDt[dailyInvestorData.isNew] ? iDt[dailyInvestorData.price] : cl)));
      const ttPrice =sys.$checkNull( iDt[dailyInvestorData.stocks] * iDt[dailyInvestorData.price]);
      for (let i = 0;i < size; ++i) Values[i] +=sys.$checkExists(Values[i],sys.$checkNull( stocks * Quotes[i] - ttPrice));
      todayValueV[0] +=sys.$checkExists(todayValueV[0],sys.$checkNull( stocks * quote));
    }
    const yesterdayValue =sys.$checkNull( yesterdayValueV[0]);
    const dailyProfits =sys.$checkNull( todayValueV[0] - yesterdayValue);
    const ratio =sys.$checkNull( (dailyProfits) / yesterdayValue);
    const CosChartValues =sys.$checkNull( [arr.map(Values,function(v)  {sys.$params(arguments.length, 1);  return [v];})]);

     const meData =sys.$checkNull( IxsData[0]);
    const meYesterday =sys.$checkNull( meData[dailyChart.close]);
    const MeRatios =sys.$checkNull( arr.map(
      meData[dailyChart.Quotes],
      function(q)  {sys.$params(arguments.length, 1);  return (q - meYesterday) / meYesterday;}
    ));
    const IxsChartValues =sys.$checkNull( arr.fromIter(iter.map(
      iter.$range(1,arr.size(IxsData)),
      function(i)  {sys.$params(arguments.length, 1);
         const data =sys.$checkNull( IxsData[i]);
        const yesterDay =sys.$checkNull( data[dailyChart.close]);
        const Quotes =sys.$checkNull( data[dailyChart.Quotes]);
        const Values =sys.$checkNull( arr.mk(size, [0]));
        const usaZeroesV =sys.$checkNull( [true]);
        for (let j = 0;j < size; ++j) {
          if (sys.$eq(i , 3) && usaZeroesV[0]) {
            if (sys.$eq(Quotes[j] , Quotes[0])) {
              Values[j] =sys.$checkExists(Values[j],sys.$checkNull( []));
              continue;
            }
            usaZeroesV[0] =sys.$checkExists(usaZeroesV[0],sys.$checkNull( false));
          }
          Values[j] =sys.$checkExists(Values[j],sys.$checkNull( j < 3
            ? [0]
            :[(MeRatios[j] - (Quotes[j] - yesterDay) / yesterDay)*100]))
          ;
        }
         return Values;
      }
    )));

    
     function ixsText(index)  {sys.$params(arguments.length, 1);
      const text =sys.$checkNull( sys.$eq(index , cts.meNick)
        ? "DEMEX"
        : sys.$eq(index , cts.ibexNick)
          ? "IBEX"
          : "EUROSTOXX")
      ;
      const txColor =sys.$checkNull( sys.$eq(index , cts.meNick)
        ? "#000000"
        : sys.$eq(index , cts.ibexNick)
          ? "#000080"
          : "#008000")
      ;

       const data =sys.$checkNull( arr.find(IxsData,
        function( d)  {sys.$params(arguments.length, 1);  return sys.$eq(d[dailyChart.nick] , index);}
      )[0]);
      const v0 =sys.$checkNull( data[dailyChart.close]);
      const vf =sys.$checkNull( arr.peek(data[dailyChart.Quotes]));
      const nmColor =sys.$checkNull( vf > v0 ? "#00AAFF" : vf < v0 ? "#FF8100" : "#000000");
       return Q("span")
        .add(Q("span")
          .style("color:" + txColor)
          .html(text + ":&nbsp;"))
        .add(Q("span")
          .style("color:" + nmColor)
          .text(math.toIso(vf, 2) + "[" + math.toIso((vf-v0)*100/v0, 2) + "%]"))
      ;
    };

    wg
      .removeAll()
      .add(Q("div").style("text-align:center;")
        .add(Q("div")
          .klass("head")
          .style("padding-bottom:8px")
          .html(II("Summary")))
        .add(Q("div")
          .add(Q("span")
            .klass("frame")
            .style(
              'font-size:x-large;color:' +
              (ratio > 0 ? "#00AAFF" : ratio < 0 ? "#FF8100" : "#000000")
            )
            .html(
              " " + math.toIso(ratio * 100, 2) + "% | " +
              math.toIso(dailyProfits, 2) + "€ "
            )))
        .add(cosSummaryChart.mk(Labels, CosChartValues))
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .style("text-align:left")
              .add(ixsText(cts.meNick)))
            .add(Q("td")
              .style("text-align:right")
              .add(ixsText(cts.euroNick))))
          .add(Q("tr")
            .add(Q("td")
              .style("text-align:left")
              .add(ixsText(cts.ibexNick)))
            .add(Q("td")))
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", 2)
              .add(ixsSummaryChart.mk(Labels, IxsChartValues)))))
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .style("vertical-align:bottom")
              .add(clock.mkWg(clock.mk())
                .klass("frame")
                .style(
                  "background:radial-gradient(#000333,#e6f6f6);" +
                  "margin-top: 8px;"
                )))
            .add(Q("td")
              .style("vertical-align:bottom")
              .add(Q("iframe")
                .klass("frame")
                .att("width", "450px")
                .att("height", "133px")
                .att(
                  "src",
                  "http://www.aemet.es/es/eltiempo/prediccion/" +
                  "municipios/mostrarwidget/rivas-vaciamadrid-id28123?" +
                  "w=g4p01110001ohmffffffw450z133x4f86d9t95b6e9r0s4n1"
                ))))))
    ;
  };

  

  
   function mkCos()  {sys.$params(arguments.length, 0);
    
     const CosData2 =sys.$checkNull(
      sys.$eq(mSel , "portfolio")
        ? arr.filter(CosData,
            function( d)  {sys.$params(arguments.length, 1);  return d[dailyChart.invData][dailyInvestorData.stocks] > 0;}
          )
        : sys.$eq(mSel , "free")
          ? arr.filter(CosData,function( d)  {sys.$params(arguments.length, 1);
               return d[dailyChart.invData][dailyInvestorData.ref] > d[dailyChart.close];}
            )
          : sys.$eq(mSel , "sel")
            ? arr.filter(CosData,function( d)  {sys.$params(arguments.length, 1);
                 return arr.any(CosSel,function(c)  {sys.$params(arguments.length, 1);  return sys.$eq(c , d[dailyChart.nick]);});}
              )
            : CosData)
    ;
    switch (orderV[0]) {
      case cts.chartOrderSignal:{
        arr.sort(CosData2,function( d1,  d2)  {sys.$params(arguments.length, 2);
          
           function fn( d)  {sys.$params(arguments.length, 1);
            const cl =sys.$checkNull( d[dailyChart.close]);
            const q =sys.$checkNull( arr.peek(d[dailyChart.Quotes]));
             const iDt =sys.$checkNull( d[dailyChart.invData]);
             return cl > iDt[dailyInvestorData.ref] ? iDt[dailyInvestorData.ref] / q : q / iDt[dailyInvestorData.ref];
          };
           return fn(d1) > fn(d2);
        });break;}
      case cts.chartOrderDay:{
        arr.sort(CosData2,function( d1,  d2)  {sys.$params(arguments.length, 2);
           return (arr.peek(d1[dailyChart.Quotes]) - d1[dailyChart.close]) / d1[dailyChart.close] >
            (arr.peek(d2[dailyChart.Quotes]) - d2[dailyChart.close]) / d2[dailyChart.close];}
        );break;}
      case cts.chartOrderNick:{
        arr.sort(CosData2,function( d1,  d2)  {sys.$params(arguments.length, 2);
           return d1[dailyChart.nick] < d2[dailyChart.nick];}
        );break;}
    }
    if (isReverseV[0]) arr.reverseIn(CosData2);

    const cmenu =sys.$checkNull( Q("table")
      .att("align", "center")
      .style("padding-bottom:6px")
      .add(Q("tr")
        .add(Q("td")
          .add(Q("span")
            .html(II("Order by") + ":&nbsp;&nbsp;&nbsp;"))
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); orderV[0] =sys.$checkExists(orderV[0],sys.$checkNull( cts.chartOrderNick)); showV[0](); })
            .klass(sys.$eq(orderV[0] , cts.chartOrderNick) ? "link frame" : "link")
            .text(II("Nick")))
          .add(Q("span")
            .html("&nbsp;&nbsp;&nbsp;"))
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); orderV[0] =sys.$checkExists(orderV[0],sys.$checkNull( cts.chartOrderDay)); showV[0](); })
            .klass(sys.$eq(orderV[0] , cts.chartOrderDay) ? "link frame" : "link")
            .text(II("Day")))
          .add(Q("span")
            .html("&nbsp;&nbsp;&nbsp;"))
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); orderV[0] =sys.$checkExists(orderV[0],sys.$checkNull( cts.chartOrderSignal)); showV[0](); })
            .klass(sys.$eq(orderV[0] , cts.chartOrderSignal) ? "link frame" : "link")
            .text(II("Signal")))
          .add(Q("span")
            .html("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"))
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); isReverseV[0] =sys.$checkExists(isReverseV[0],sys.$checkNull( !sys.asBool(isReverseV[0]))); showV[0]();})
            .klass(isReverseV[0] ? "link frame" : "link")
            .text(II("Reverse"))))))
    ;

    const size =sys.$checkNull( arr.size(CosData2));
    const table =sys.$checkNull( Q("table")
      .att("align", "center")

      .adds(sys.$eq(size , 0)
        ? [Q("tr")
          .add(Q("td")
            .text(II("No selected company")))
        ]
        : arr.fromIter(iter.map(
          iter.$range(0,math.toInt((size - 1) / 3) + 1),
          function(row)  {sys.$params(arguments.length, 1);
             return Q("tr")
              .adds(iter.map(
                iter.$range(0,3),
                function(col)  {sys.$params(arguments.length, 1);
                  const ix =sys.$checkNull( row * 3 + col);
                  if (ix >= size)  return Q("td");
                   const d =sys.$checkNull( CosData2[ix]);
                  const Labels =sys.$checkNull( d[dailyChart.Hours]);
                  const Values =sys.$checkNull( [arr.map(d[dailyChart.Quotes], function(q)  {sys.$params(arguments.length, 1);  return [q];})]);
                  const isRebuy =sys.$checkNull( arr.any(Rebuys,function(c)  {sys.$params(arguments.length, 1);  return sys.$eq(c , d[dailyChart.nick]);}));
                  const ref =sys.$checkNull( d[dailyChart.invData][dailyInvestorData.ref]);
                  const isToSell =sys.$checkNull( d[dailyChart.close] > ref);
                  const limRef =sys.$checkNull( isToSell ? ref * 1.01 : ref * 0.99);
                  const withRef0 =sys.$checkNull( isToSell
                    ? arr.any(d[dailyChart.Quotes], function(q)  {sys.$params(arguments.length, 1);  return q < limRef;})
                    : arr.any(d[dailyChart.Quotes], function(q)  {sys.$params(arguments.length, 1);  return q > limRef;}))
                  ;
                  const withRef =sys.$checkNull( withRef0
                    ? isToSell ?  -1 : 1
                    : 0)
                  ;
                   return Q("td")
                    .add(Q("table")
                      .klass("main")
                      .add(mkCoHead(d))
                      .add(Q("tr")
                        .add(Q("td")
                          .att("colspan", 2)
                          .add(Q("span")
                            .add(coChart.mk(
                                Labels, Values, isRebuy, withRef, ref
                              ))))))
                  ;
                }
              ));}
        ))))
    ;
    wg
      .removeAll()
      .add(cmenu)
      .add(table)
    ;
  };

  

  
   function mkRefs()  {sys.$params(arguments.length, 0);
     const Labels =sys.$checkNull( CosData[0][dailyChart.Hours]);
    const size =sys.$checkNull( arr.size(Labels));
    const InPfValues =sys.$checkNull( arr.mk(size, 0));
    const FreeValues =sys.$checkNull( arr.mk(size, 0));
    const SumValues =sys.$checkNull( arr.mk(size, 0));

    const InPortfolio =sys.$checkNull( []); 
    const Frees =sys.$checkNull( []); 
    for (const  coD  of sys.$forObject( CosData)) {
      const nick =sys.$checkNull( coD[dailyChart.nick]);
       const inv =sys.$checkNull( coD[dailyChart.invData]);
      const modelId =sys.$checkNull( inv[dailyInvestorData.modelId]);
      const stocks =sys.$checkNull( inv[dailyInvestorData.stocks]);
      const Params =sys.$checkNull( inv[dailyInvestorData.Params]);
      const ref =sys.$checkNull( inv[dailyInvestorData.ref]);

      const Refs =sys.$checkNull( arr.mk(size, 0));
      for (const [i, q]  of sys.$forObject2( coD[dailyChart.Quotes])) {
        const prfs =sys.$checkNull( refProfits(modelId, Params, stocks, q, ref));
        Refs[i] =sys.$checkExists(Refs[i],sys.$checkNull( prfs));
        if (stocks > 0) {
          SumValues[i] +=sys.$checkExists(SumValues[i],sys.$checkNull( prfs));
          InPfValues[i] +=sys.$checkExists(InPfValues[i],sys.$checkNull( prfs));
        }
      }
      const newCoD =sys.$checkNull( dailyChart.mk(nick, coD[dailyChart.close], coD[dailyChart.Hours], Refs, coD[dailyChart.invData]));
      if (stocks > 0)
        arr.push(InPortfolio,newCoD);
      else if (
        ref > coD[dailyChart.close] &&
        !sys.asBool(arr.any(Rebuys,function(nk)  {sys.$params(arguments.length, 1);  return sys.$eq(nk , nick);}))
      )
        arr.push(Frees,newCoD);
    }

    arr.sort(InPortfolio,function( coD1,  coD2)  {sys.$params(arguments.length, 2);
      const v1 =sys.$checkNull( arr.peek(coD1[dailyChart.Quotes]));
      const v2 =sys.$checkNull( arr.peek(coD2[dailyChart.Quotes]));
         return v1 < 0
          ? v1 < v2
          : v2 < 0
            ? false
            : v2 < v1
        ;
      });
    arr.sort(Frees,function( coD1,  coD2)  {sys.$params(arguments.length, 2);
        const v1 =sys.$checkNull( arr.peek(coD1[dailyChart.Quotes]));
        const v2 =sys.$checkNull( arr.peek(coD2[dailyChart.Quotes]));
         return v1 < v2;
      });
    const Frees2 =sys.$checkNull( arr.take(Frees, maxCos));
    arr.sort(Frees2,function( coD1,  coD2)  {sys.$params(arguments.length, 2);
      const v1 =sys.$checkNull( arr.peek(coD1[dailyChart.Quotes]));
      const v2 =sys.$checkNull( arr.peek(coD2[dailyChart.Quotes]));
         return v1 < 0
          ? v1 < v2
          : v2 < 0
            ? false
            : v2 < v1
        ;
      });

    for (const  coD  of sys.$forObject( Frees2)) {
      for (const [i, q]  of sys.$forObject2( coD[dailyChart.Quotes])) {
        SumValues[i] +=sys.$checkExists(SumValues[i],sys.$checkNull( q));
        FreeValues[i] +=sys.$checkExists(FreeValues[i],sys.$checkNull( q));
      }
    }

    
     function mkSmallTd(i, inPortfolio)  {sys.$params(arguments.length, 2);
      if (
        inPortfolio && i >= arr.size(InPortfolio) ||
        !sys.asBool(inPortfolio) && i >= arr.size(Frees2)
      )  return Q("td");
       const coD =sys.$checkNull( inPortfolio ? InPortfolio[i] : Frees2[i]);
      const nick =sys.$checkNull( coD[dailyChart.nick]);
      const isSel =sys.$checkNull( arr.any(CosSel,function(c)  {sys.$params(arguments.length, 1);  return sys.$eq(c , nick);}));
      const val =sys.$checkNull( math.toIso(arr.peek(coD[dailyChart.Quotes]), 2));
      const Values =sys.$checkNull( [arr.map(coD[dailyChart.Quotes], function(q)  {sys.$params(arguments.length, 1);  return [q];})]);
      const chart =sys.$checkNull( refSmallChart.mk(Labels, Values, inPortfolio));
       return Q("td")
        .att("width", "16.7%")
        .add(Q("table")
          .klass("main")
          .add(Q("tr")
            .add(Q("td")
              .klass("chartLeft")
              .add(Q("span")
                .text(nick))
              .add(Q("span")
                .html("&nbsp;&nbsp;"))
              .add(isSel
                ? ui.link(function(e)  {sys.$params(arguments.length, 1); setSelected(nick, false);})
                  .add(ui.img("unlink"))
                : ui.link(function(e)  {sys.$params(arguments.length, 1); setSelected(nick, true);})
                  .add(ui.img("link"))))
            .add(Q("td")
              .klass("chartRight")
              .text(val)))
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", 2)
              .add(chart))))
      ;
    };

    
     function mkBigTd()  {sys.$params(arguments.length, 0);
      const inPf0 =sys.$checkNull( InPfValues[0]);
      const sum0 =sys.$checkNull( SumValues[0]);
      const free0 =sys.$checkNull( FreeValues[0]);
      const Values =sys.$checkNull( refDifV[0]
        ? [
            arr.map(InPfValues,function(q)  {sys.$params(arguments.length, 1);  return [q - inPf0];}),
            arr.map(SumValues,function(q)  {sys.$params(arguments.length, 1);  return [q - sum0];}),
            arr.map(FreeValues,function(q)  {sys.$params(arguments.length, 1);  return [q - free0];})
          ]
        : [
            arr.map(InPfValues,function(q)  {sys.$params(arguments.length, 1);  return [q];}),
            arr.map(SumValues,function(q)  {sys.$params(arguments.length, 1);  return [q];}),
            arr.map(FreeValues,function(q)  {sys.$params(arguments.length, 1);  return [q];})
          ])
      ;
      const chart =sys.$checkNull( refBigChart.mk(Labels, Values));
       return Q("td")
        .att("colspan", 3)
        .att("rowspan", 2)
        .style("vertical-align:top")
        .add(Q("table")
          .klass("main")
          .add(Q("tr")
            .add(Q("td")
              .klass("chartLeft")
              .style("color:#dd7100;width:30%")
              .text(math.toIso(arr.peek(Values[0]), 0)))
            .add(Q("td")
              .klass("chartLeft")
              .style("text-align:center;width:40%")
              .text(math.toIso(arr.peek(Values[1]), 0)))
            .add(Q("td")
              .klass("chartRight")
              .style("color:#0099dd;width:30%")
              .text(math.toIso(arr.peek(Values[2]), 0))))
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", 3)
              .add(chart)))
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", 3)
              .att("title", refDifV[0]
                  ? II("Show values")
                  : II("Show differences")
                )
              .style("text-align:center")
              .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); changeRefType();})
                .add(ui.img("deme"))))))
      ;
    };

    wg
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .klass("frame")
        .add(Q("tr")
          .add(mkSmallTd(0, true))
          .add(mkSmallTd(1, true))
          .add(mkBigTd())
          .add(mkSmallTd(0, false))
          .add(mkSmallTd(1, false)))
        .add(Q("tr")
          .add(mkSmallTd(2, true))
          .add(mkSmallTd(3, true))
          .add(mkSmallTd(2, false))
          .add(mkSmallTd(3, false)))
        .adds(function() {sys.$params(arguments.length, 0);
            const Trs =sys.$checkNull( []); 
            const iV =sys.$checkNull( [4]);
            while(iV[0] < arr.size(InPortfolio) || iV[0] < arr.size(Frees2)) {
              arr.push(Trs,Q("tr")
                .add(mkSmallTd(iV[0], true))
                .add(mkSmallTd(iV[0] + 1, true))
                .add(mkSmallTd(iV[0] + 2, true))
                .add(Q("td")
                  .klass("separator")
                  .att("width", "1px"))
                .add(mkSmallTd(iV[0], false))
                .add(mkSmallTd(iV[0] + 1, false))
                .add(mkSmallTd(iV[0] + 2, false))
              );
              iV[0] +=sys.$checkExists(iV[0],sys.$checkNull( 3));
            }
             return Trs;
          }())
      )
    ;
  };

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    const Lopts =sys.$checkNull( [
      dmenu.mkHiddenButton(dbmenu),
      menu.separator2(),
      menu.tlink("daily&summary", II("Summary")),
      menu.separator2(),
      menu.tlink("daily&portfolio", II("Portfolio")),
      menu.separator(),
      menu.tlink("daily&free", II("Free")),
      menu.separator(),
      menu.tlink("daily&all", II("All CO's")),
      menu.separator(),
      menu.tlink("daily&sel", II("Selection")),
      menu.separator2(),
      menu.tlink("daily&refs", II("References"))
    ]);

    const Ropts =sys.$checkNull( [
      menu.mkEntry([], activityWg),
      sys.$eq(activity , cts.active) || time.hour(time.now()) > 12
        ? sys.$eq(activity , cts.active)
          ? menu.toption(activity, "[·]", reactivate)
          : menu.toption(activity, II("Sleeping"), reactivate)
        : menu.mkEntry([], activityWg),
      menu.separator2(),
      menu.mkEntry(
        [],
        Q("span")
          .style(color(dayProfits))
          .text(math.toIso(dayProfits, 2))
      ),
      menu.separator(),
      menu.mkEntry(
        [],
        Q("span")
          .style(color(totalProfits))
          .text(math.toIso(totalProfits, 2))
      ),
      menu.separator2(),
      menu.mkEntry([], serverWg),
      menu.separator(),
      menu.toption(">>", ">>", newServer)
    ]);
    dmenu.setDownMenu(dbmenu, menu.mk(Lopts, Ropts, "daily&" + mSel));

    switch (mSel) {
      case "portfolio": case "free": case "all": case "sel":{ mkCos();break;}
      case "refs":{ mkRefs();break;}
      default:{ mkSummary();}
    }
  });

  showV[0]();

  const ticV =sys.$checkNull( [0]);
  const tm =sys.$checkNull( timer.mk(15000));
  timer.run(tm, function()  {sys.$params(arguments.length, 0);
    const tic =sys.$checkNull( ticV[0]);

    if (sys.$eq(tic , 3)) {
      timer.stop(tm);
      mk2(wg, dbmenu, mSel, orderV[0], isReverseV[0]);
       return 0;
    }

    ticV[0] +=sys.$checkExists(ticV[0],sys.$checkNull( 1));
    if (sys.$eq(activity , cts.active)) {
      updateActivityWg(3 - tic);
    } else {
      updateActivityWg( -1);
    }

     return 1;
  });
};






export  async  function mk(wg, dbmenu, LcPath)  {sys.$params(arguments.length, 3);
  mk2(wg, dbmenu, !sys.asBool(LcPath) ? "summary" : LcPath[0], cts.chartOrderSignal, false);};
