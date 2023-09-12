import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../data/cts.js";
import * as ann from  "../data/ann.js";
import * as report from  "../data/report.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);







export  function mk(nextId, Anns)  {sys.$params(arguments.length, 2);
  arr.sort(Anns, function(A1, A2)  {sys.$params(arguments.length, 2); return sys.asBool( sys.$eq(A1.date , A2.date))
    ?sys.asBool( sys.$eq(A1.isSell , A2.isSell))
      ?sys.asBool( sys.$eq(A1.inv , A2.inv))
        ? A1.nick > A2.nick
        : A1.inv > A2.inv
      : !sys.asBool(A1.isSell)
    : A1.date < A2.date
  ;});

  
   function mkError(msg)  {sys.$params(arguments.length, 1);  return {nextId:nextId, anns: Anns, reports: [msg, false]};};

  

  const Pf =sys.$checkNull( {}); 
  for (const A  of sys.$forObject( Anns)) {
      const id =sys.$checkNull( A.inv + "|" + A.nick);
      if (sys.asBool(A.isSell)) {
        const sOp =sys.$checkNull( dic.get(Pf, id));
        if (sys.asBool(sOp)) {
          const s =sys.$checkNull( sOp[0]);
          if (sys.asBool(s < A.stocks))
             return mkError(i18n.fmt(
              II("%0\nStock for sale (%1) > Stocks in portfolio (%2)"),
              [ann.toStr(A), "" + A.stocks, "" + s]
            ));
          Pf[id] =sys.$checkExists(Pf[id],sys.$checkNull( s - A.stocks));
        } else {
           return mkError(i18n.fmt(
            II("%0\nNick %1 is unknown"), [ann.toStr(A), A.nick]
          ));
        }
      } else {
        const sOp =sys.$checkNull( dic.get(Pf, id));
        if (sys.asBool(sOp)) Pf[id] =sys.$checkExists(Pf[id],sys.$checkNull( sOp[0] + A.stocks));
        else dic.put(Pf, id, A.stocks);
      }
  }

  

  const nRps =sys.$checkNull( cts.investors + 2);
  const Profitss =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,nRps), function(i)  {sys.$params(arguments.length, 1);  return 0;})));
  const Summaries =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,nRps), function(i)  {sys.$params(arguments.length, 1);  return [];}))); 
  const Annss =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,nRps), function(i)  {sys.$params(arguments.length, 1);  return [];}))); 
  const feesV =sys.$checkNull( [0]);

  if (sys.asBool(Anns)) {
    const Summs =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,nRps), function(i)  {sys.$params(arguments.length, 1);  return {};}))); 
    for (const A  of sys.$forObject( Anns)) {
      const nick =sys.$checkNull( A.nick);
      Profitss[nRps - 1] =sys.$checkExists(Profitss[nRps-1],sys.$checkNull( 0)); 
      for (let iRp = 0;iRp < nRps; ++iRp) {
        if (sys.asBool(sys.asBool(sys.asBool(iRp > 0) && sys.asBool(iRp < nRps - 1)) && sys.asBool(sys.$neq(A.inv , iRp - 1)))) {
          continue;
        }
        const SentryOp =sys.$checkNull( dic.get(Summs[iRp], nick));
        if (sys.asBool(SentryOp)) {
          const Sentry =sys.$checkNull( SentryOp[0]);
          if (sys.asBool(A.isSell)) {
            const stocks =sys.$checkNull( A.stocks);
            const priceV =sys.$checkNull( [A.price]);
            const totalV =sys.$checkNull( [stocks * priceV[0]]);
            const afeesOp =sys.$checkNull( []);
            if (sys.asBool(sys.$eq(iRp , 0))) { 
              arr.push(afeesOp, totalV[0] - A.cash);
              feesV[0] +=sys.$checkExists(feesV[0],sys.$checkNull( totalV[0] - A.cash));
              totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( A.cash));
              priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
            }

            const newStocks =sys.$checkNull( Sentry.stocks - stocks);
            if (sys.asBool(newStocks[0] < 0))  return mkError(i18n.fmt(
                II("%0\nStock for sale (%1) > Stocks in portfolio (%2)"),
                [ann.toStr(A), "" + A.stocks, "" + Sentry.stocks]
              ));

            const scost =sys.$checkNull( math.round(stocks * Sentry.price, 2));
            const newTotal =sys.$checkNull( Sentry.total - scost);
            const newPrice =sys.$checkNull( Sentry.price);

            const profits =sys.$checkNull( totalV[0] - scost);
            Profitss[iRp] +=sys.$checkExists(Profitss[iRp],sys.$checkNull( profits));

            if (sys.asBool(sys.$eq(newStocks , 0))) dic.remove(Summs[iRp], nick);
            else Summs[iRp][nick] =sys.$checkExists(Summs[iRp][nick],sys.$checkNull( report.mkSummary(
                nick, newStocks, newPrice, newTotal
              )));

            Annss[iRp].push(report.mkAnn(
              A.date, nick, stocks, priceV[0], totalV[0], [profits], afeesOp
            ));
          } else {
            const stocks =sys.$checkNull( A.stocks);
            const priceV =sys.$checkNull( [A.price]);
            const totalV =sys.$checkNull( [stocks * priceV[0]]);
            const afeesOp =sys.$checkNull( []);
            if (sys.asBool(sys.$eq(iRp , 0))) { 
              arr.push(afeesOp, A.cash - totalV[0]);
              feesV[0] +=sys.$checkExists(feesV[0],sys.$checkNull( A.cash - totalV[0]));
              totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( A.cash));
              priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
            }
            Annss[iRp].push(report.mkAnn(
              A.date, nick, stocks, priceV[0], totalV[0], [], afeesOp
            ));

            const newStocks =sys.$checkNull( Sentry.stocks + stocks);
            const newTotal =sys.$checkNull( stocks * priceV[0] + Sentry.stocks * Sentry.price);
            const newPrice =sys.$checkNull( newTotal / newStocks);
            Summs[iRp][nick] =sys.$checkExists(Summs[iRp][nick],sys.$checkNull( report.mkSummary(
              nick, newStocks, newPrice, newTotal
            )));
          }
        } else {
          if (sys.asBool(!sys.asBool(A.isSell))) {
            const stocks =sys.$checkNull( A.stocks);
            const priceV =sys.$checkNull( [A.price]);
            const totalV =sys.$checkNull( [stocks * priceV[0]]);
            const afeesOp =sys.$checkNull( []);
            if (sys.asBool(sys.$eq(iRp , 0))) {
              arr.push(afeesOp, A.cash - totalV[0]);
              feesV[0] +=sys.$checkExists(feesV[0],sys.$checkNull( A.cash - totalV[0]));
              totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( A.cash));
              priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
            }
            Annss[iRp].push(report.mkAnn(
              A.date, nick, stocks, priceV[0], totalV[0], [], afeesOp
            ));

            dic.put(Summs[iRp], nick, report.mkSummary(
              nick, stocks, priceV[0], totalV[0]
            ));
          } else  return mkError(i18n.fmt(
              II("%0\nSale of not bougth company %1"),
              [ann.toStr(A), A.nick]
            ));
        }
      }
    }

    
    const AllSumm =sys.$checkNull( {}); 
    const allProfitsV =sys.$checkNull( [0]);
    for (let i = 1;i < nRps - 1; ++i) {
      const Summ =sys.$checkNull( Summs[i]);
      for (const [k, V]  of sys.$forObject2( Summ)) {
        const allVOp =sys.$checkNull( dic.get(AllSumm, k));
        if (sys.asBool(allVOp)) {
          const allV =sys.$checkNull( allVOp[0]);
          const newStocks =sys.$checkNull( V.stocks + allV.stocks);
          const newTotal =sys.$checkNull( V.stocks * V.price + allV.stocks * allV.price);
          const newPrice =sys.$checkNull( newTotal / newStocks);
          AllSumm[k] =sys.$checkExists(AllSumm[k],sys.$checkNull( report.mkSummary(k, newStocks, newPrice, newTotal)));
        } else {
          dic.put(AllSumm, k, V);
        }
      }
      allProfitsV[0] +=sys.$checkExists(allProfitsV[0],sys.$checkNull( Profitss[i]));
    }
    Summs[nRps - 1] =sys.$checkExists(Summs[nRps-1],sys.$checkNull( AllSumm));
    Profitss[nRps - 1] =sys.$checkExists(Profitss[nRps-1],sys.$checkNull( allProfitsV[0]));

    for (let i = 0;i < nRps; ++i) {
      const Sm =sys.$checkNull( []); 
      for (const V  of sys.$forObject( Summs[i])) Sm.push(V);
      Summaries[i] =sys.$checkExists(Summaries[i],sys.$checkNull( Sm));
    }
  }

  const Reports =sys.$checkNull( []); 
  for (let i = 0;i < nRps; ++i) {
    const costV =sys.$checkNull( [0]);
    for (const E  of sys.$forObject( Summaries[i])) costV[0] +=sys.$checkExists(costV[0],sys.$checkNull( E.total));

    Summaries[i].sort(function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.nick < E2.nick;});
    Reports.push(report.mk(
      costV[0], Profitss[i],sys.asBool( sys.$eq(i , 0)) ? [feesV[0]] : [], Summaries[i], Annss[i]
    ));
  }

   return {nextId:nextId, anns: Anns, reports: [Reports, true]};
};


export  function anns(Year)  {sys.$params(arguments.length, 1);  return Year.anns;};



export  function add(Year, OldAnn, NewAnn)  {sys.$params(arguments.length, 3);
  if (sys.asBool(OldAnn)) {
    ann.update(OldAnn[0], NewAnn);
  } else {
    NewAnn.id =sys.$checkExists(NewAnn.id,sys.$checkNull( Year.nextId));
    Year.nextId +=sys.$checkExists(Year.nextId,sys.$checkNull( 1));
    arr.push(Year.anns, NewAnn);
  }
  const NewYear =sys.$checkNull( mk(Year.nextId, Year.anns));
  Year.anns =sys.$checkExists(Year.anns,sys.$checkNull( NewYear.anns));
  Year.reports =sys.$checkExists(Year.reports,sys.$checkNull( NewYear.reports));
};



export  function remove(Year, annId)  {sys.$params(arguments.length, 2);
  arr.filterIn(Year.anns, function(A)  {sys.$params(arguments.length, 1);  return sys.$neq(A.id , annId);});
};





export  function getReport(Year, type)  {sys.$params(arguments.length, 2);
  const ReportsRs =sys.$checkNull( Year.reports);

  if (sys.asBool(!sys.asBool(ReportsRs[1])))  return ReportsRs;

  const Reports =sys.$checkNull( ReportsRs[0]);
  const R =sys.$checkNull(  
    sys.$eq(type,report.all)? Reports[cts.investors + 1]:
    sys.$eq(type,report.withFees)? Reports[0]:
     Reports[type + 1]
  );
   return [R, true];
};




export  function treasury(Year)  {sys.$params(arguments.length, 1);
    const Map =sys.$checkNull( {}); 

    const ReportsRs =sys.$checkNull( Year.reports);
    if (sys.asBool(ReportsRs[1])) {
      const Reports =sys.$checkNull( ReportsRs[0]);
      for (const A  of sys.$forObject( Reports[0].anns)) {
        if (sys.asBool(!sys.asBool(A.profits))) continue;

        const nick =sys.$checkNull( A.nick);
        const EmapOp =sys.$checkNull( dic.get(Map, nick));
        if (sys.asBool(EmapOp)) {
          const Emap =sys.$checkNull( EmapOp[0]);
          const stocks =sys.$checkNull( Emap.stocks + A.stocks);
          const total =sys.$checkNull( Emap.total + A.total);
          const profits =sys.$checkNull( Emap.profits[0] + A.profits[0]);
          const fees =sys.$checkNull( Emap.fees[0] + A.fees[0]);
          const price =sys.$checkNull( total / stocks);
          dic.put(Map, nick, report.mkAnn(
            A.date, nick, stocks, price, total, [profits], [fees]
          ));
        } else {
          dic.put(Map, nick, A);
        }
      }
    } else {
      ui.alert(ReportsRs[0]);
    }
    const summaryV =sys.$checkNull( [0]);
    const Entries =sys.$checkNull( []); 
    for (const V  of sys.$forObject( Map)) {
      summaryV[0] +=sys.$checkExists(summaryV[0],sys.$checkNull( V.profits[0]));
      arr.push(Entries, V);
    }
    arr.sort(Entries, function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.nick < E2.nick;});

     return {summary: summaryV[0], entries: Entries};
};


export  function toJs(Y)  {sys.$params(arguments.length, 1);  return [
    Y.nextId,
    arr.map(Y.anns, ann.toJs)
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(
    A[0],
    arr.map(A[1], ann.fromJs)
  );};
