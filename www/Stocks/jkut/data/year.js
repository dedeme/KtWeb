import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../cts.js";
import * as ann from  "../data/ann.js";
import * as report from  "../data/report.js";
import * as rann from  "../data/rann.js";
import * as rsumm from  "../data/rsumm.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);








function mk0 (nxId,As,RpsRs) { sys.$params(arguments.length, 3); return [ nxId, As, RpsRs];}const nxId = 0;const As = 1;const RpsRs = 2;






 function mk(nextId,  Anns)  {sys.$params(arguments.length, 2);
  arr.sort(Anns,function( a1,  a2)  {sys.$params(arguments.length, 2);  return sys.$eq(a1[ann.date] , a2[ann.date])
    ? sys.$eq(a1[ann.isSell] , a2[ann.isSell])
      ? a1[ann.nick] > a2[ann.nick]
      : !sys.asBool(a1[ann.isSell])
    : a1[ann.date] < a2[ann.date]
  ;});

  
   function mkError(msg)  {sys.$params(arguments.length, 1);  return {nextId:nextId, anns: Anns, reports: [msg, false]};};

  

  const Pf =sys.$checkNull( {}); 
  for (const  a  of sys.$forObject( Anns)) {
      const id =sys.$checkNull( a[ann.nick]);
      if (a[ann.isSell]) {
        const sOp =sys.$checkNull( dic.get(Pf, id));
        if (!sys.asBool(!sys.asBool(sOp))) {
          const s =sys.$checkNull( sOp[0]);
          if (s < a[ann.stocks])
             return mkError(i18n.fmt(
              II("%0\nStock for sale (%1) > Stocks in portfolio (%2)"),
              [ann.toStr(a), "" + a[ann.stocks], "" + s]
            ));
          Pf[id] =sys.$checkExists(Pf[id],sys.$checkNull( s - a[ann.stocks]));
        } else {
           return mkError(i18n.fmt(
            II("%0\nNick %1 is unknown"), [ann.toStr(a), a[ann.nick]]
          ));
        }
      } else {
        const sOp =sys.$checkNull( dic.get(Pf, id));
        if (!sys.asBool(sOp)) dic.put(Pf, id, a[ann.stocks]);
        else Pf[id] =sys.$checkExists(Pf[id],sys.$checkNull( sOp[0] + a[ann.stocks]));
      }
  }

  
  
  
  

  const Profitss =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,2), function(i)  {sys.$params(arguments.length, 1);  return 0;})));
  const Summaries =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,2), function(i)  {sys.$params(arguments.length, 1);  return [];}))); 
  const Annss =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,2), function(i)  {sys.$params(arguments.length, 1);  return [];}))); 
  const feesV =sys.$checkNull( [0]);

  if (!sys.asBool(!sys.asBool(Anns))) {
    const Summs =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,2), function(i)  {sys.$params(arguments.length, 1);  return {};}))); 
    for (const  a  of sys.$forObject( Anns)) {
      const nick =sys.$checkNull( a[ann.nick]);
      for (let iRp = 0;iRp < 2; ++iRp) {
        const SentryOp =sys.$checkNull( dic.get(Summs[iRp], nick));
        if (!sys.asBool(SentryOp)) {
          if (!sys.asBool(a[ann.isSell])) {
            const stocks =sys.$checkNull( a[ann.stocks]);
            const priceV =sys.$checkNull( [a[ann.price]]);
            const totalV =sys.$checkNull( [stocks * priceV[0]]);
            const afeesOp =sys.$checkNull( []);
            if (sys.$eq(iRp , 0)) { 
              arr.push(afeesOp, a[ann.cash] - totalV[0]);
              feesV[0] +=sys.$checkExists(feesV[0],sys.$checkNull( a[ann.cash] - totalV[0]));
              totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( a[ann.cash]));
              priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
            }
            arr.push(Annss[iRp], rann.mk(
              a[ann.date], nick, stocks, priceV[0], totalV[0], [], afeesOp
            ));
            dic.put(Summs[iRp], nick, rsumm.mk(
              nick, stocks, priceV[0], totalV[0]
            ));
          } else  return mkError(i18n.fmt(
              II("%0\nSale of not bougth company %1"),
              [ann.toStr(a), a[ann.nick]]
            ));
        } else {
           const sentry =sys.$checkNull( SentryOp[0]);
          if (a[ann.isSell]) {
            const stocks =sys.$checkNull( a[ann.stocks]);
            const priceV =sys.$checkNull( [a[ann.price]]);
            const totalV =sys.$checkNull( [stocks * priceV[0]]);
            const afeesOp =sys.$checkNull( []);
            if (sys.$eq(iRp , 0)) { 
              arr.push(afeesOp, totalV[0] - a[ann.cash]);
              feesV[0] +=sys.$checkExists(feesV[0],sys.$checkNull( totalV[0] - a[ann.cash]));
              totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( a[ann.cash]));
              priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
            }

            const newStocks =sys.$checkNull( sentry[rsumm.stocks] - stocks);
            if (newStocks < 0)  return mkError(i18n.fmt(
                II("%0\nStock for sale (%1) > Stocks in portfolio (%2)"),
                [ann.toStr(a), "" + a[ann.stocks], "" + sentry[rsumm.stocks]]
              ));

            const scost =sys.$checkNull( math.round(stocks * sentry[rsumm.price], 2));
            const newTotal =sys.$checkNull( sentry[rsumm.total] - scost);
            const newPrice =sys.$checkNull( sentry[rsumm.price]);

            const profits =sys.$checkNull( totalV[0] - scost);
            Profitss[iRp] +=sys.$checkExists(Profitss[iRp],sys.$checkNull( profits));

            if (sys.$eq(newStocks , 0)) dic.remove(Summs[iRp], nick);
            else Summs[iRp][nick] =sys.$checkExists(Summs[iRp][nick],sys.$checkNull( rsumm.mk(
                nick, newStocks, newPrice, newTotal
              )));

            Annss[iRp].push(rann.mk(
              a[ann.date], nick, stocks, priceV[0], totalV[0], [profits], afeesOp
            ));
          } else {
            const stocks =sys.$checkNull( a[ann.stocks]);
            const priceV =sys.$checkNull( [a[ann.price]]);
            const totalV =sys.$checkNull( [stocks * priceV[0]]);
            const afeesOp =sys.$checkNull( []);
            if (sys.$eq(iRp , 0)) { 
              arr.push(afeesOp, a[ann.cash] - totalV[0]);
              feesV[0] +=sys.$checkExists(feesV[0],sys.$checkNull( a[ann.cash] - totalV[0]));
              totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( a[ann.cash]));
              priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
            }
            Annss[iRp].push(rann.mk(
              a[ann.date], nick, stocks, priceV[0], totalV[0], [], afeesOp
            ));

            const newStocks =sys.$checkNull( sentry[rsumm.stocks] + stocks);
            const newTotal =sys.$checkNull( stocks * priceV[0] + sentry[rsumm.stocks] * sentry[rsumm.price]);
            const newPrice =sys.$checkNull( newTotal / newStocks);
            Summs[iRp][nick] =sys.$checkExists(Summs[iRp][nick],sys.$checkNull( rsumm.mk(
              nick, newStocks, newPrice, newTotal
            )));
          }
        }
      }
    }

    for (let i = 0;i < 2; ++i) {
      const Sm =sys.$checkNull( []); 
      for (const V  of sys.$forObject( Summs[i])) arr.push(Sm,V);
      Summaries[i] =sys.$checkExists(Summaries[i],sys.$checkNull( Sm));
    }
  }

  const Reports =sys.$checkNull( []); 
  for (let i = 0;i < 2; ++i) {
    const costV =sys.$checkNull( [0]);
    for (const  e  of sys.$forObject( Summaries[i])) costV[0] +=sys.$checkExists(costV[0],sys.$checkNull( e[rsumm.total]));

    Summaries[i].sort(function( e1,  e2)  {sys.$params(arguments.length, 2);  return e1[rsumm.nick] < e2[rsumm.nick];});
    arr.push(Reports,report.mk(
      costV[0], Profitss[i], sys.$eq(i , 0) ? [feesV[0]] : [], Summaries[i], Annss[i]
    ));
  }

   return mk0(nextId, Anns, [Reports, true]);
};



export  function mkEmpty()  {sys.$params(arguments.length, 0);  return mk(0, []);};



export  function anns(y)  {sys.$params(arguments.length, 1);  return y[As];};







export  function add(y, oldAnnOp,  newAnn)  {sys.$params(arguments.length, 3);
  if (!sys.asBool(oldAnnOp)) {
    ann.setId(newAnn,y[nxId]);
    y[nxId] +=sys.$checkExists(y[nxId],sys.$checkNull( 1));
    arr.push(y[As], newAnn);
  } else {
     const oldAnn =sys.$checkNull( oldAnnOp[0]);
    ann.setId(newAnn,oldAnn[ann.id]);
    ann.update(oldAnn,newAnn);
  }
  const newYear =sys.$checkNull( mk(y[nxId], y[As]));
  y[As] =sys.$checkExists(y[As],sys.$checkNull( newYear[As]));
  y[RpsRs] =sys.$checkExists(y[RpsRs],sys.$checkNull( newYear[RpsRs]));
};



export  function remove(y, annId)  {sys.$params(arguments.length, 2);
  arr.filterIn(y[As], function( a)  {sys.$params(arguments.length, 1);  return sys.$neq(a[ann.id] , annId);});
};





export  function getReport(y, type)  {sys.$params(arguments.length, 2);
  const [Reports, ok] = y[RpsRs];
  if (!sys.asBool(ok))  return [Reports, false];
   return [sys.$eq(type , cts.withFees) ? Reports[0] : Reports[1], true];
};




export  function treasury(y)  {sys.$params(arguments.length, 1);
    const TRep =sys.$checkNull( {}); 

    const [Reports, ok] = y[RpsRs];
    if (ok) {
       const Rp =sys.$checkNull( Reports[0]);
      for (const  a  of sys.$forObject( Rp[report.Anns])) {
        if (!sys.asBool(a[rann.profitsOp])) continue;

        const nick =sys.$checkNull( a[rann.nick]);
        const tAnnOp =sys.$checkNull( dic.get(TRep,nick));
        if (!sys.asBool(tAnnOp)) {
          dic.put(TRep,nick, a);
        } else {
           const tAnn =sys.$checkNull( tAnnOp[0]);
          const stocks =sys.$checkNull( tAnn[rann.stocks] + a[rann.stocks]);
          const total =sys.$checkNull( tAnn[rann.total] + a[rann.total]);
          const profits =sys.$checkNull( tAnn[rann.profitsOp][0] + a[rann.profitsOp][0]);
          const fees =sys.$checkNull( tAnn[rann.feesOp][0] + a[rann.feesOp][0]);
          const price =sys.$checkNull( total / stocks);
          dic.put(TRep,nick, rann.mk(
            a[rann.date], nick, stocks, price, total, [profits], [fees]
          ));
        }
      }
    } else {
      ui.alert(Reports);
    }
    const summaryV =sys.$checkNull( [0]);
    const Entries =sys.$checkNull( []); 
    for (const  a  of sys.$forObject( TRep)) {
      summaryV[0] +=sys.$checkExists(summaryV[0],sys.$checkNull( a[rann.profitsOp][0]));
      arr.push(Entries,a);
    }
    arr.sort(Entries,function( e1,  e2)  {sys.$params(arguments.length, 2);  return e1[rann.nick] < e2[rann.nick];});

     return {summary: summaryV[0], Entries:Entries};
};


export  function toJs(y)  {sys.$params(arguments.length, 1);  return [
    y[nxId],
    arr.map(y[As], ann.toJs)
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(
    A[0],
    arr.map(A[1], ann.fromJs)
  );};
