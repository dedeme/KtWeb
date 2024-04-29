import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as year from  "../data/year.js";
import * as formRow from  "../data/formRow.js";
import * as report from  "../data/report.js";
import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as ann from  "../data/ann.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);



export  async  function request()  {sys.$params(arguments.length, 0);
  const {dbKey, Data} = await  client.send({
    prg: cts.appName,
    source: "MainPg",
    rq: "read"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

  
   const All =sys.$checkNull( fromJs(Data));
  const y =sys.$checkNull( lastYearId(All));
  const currentYear =sys.$checkNull( "" + time.year(time.now()));
  if (sys.$neq(y , currentYear)) {
    dic.put(All,currentYear, year.mkEmpty());
     return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(All);});
  }
   return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(All);});
};




export  async  function send(Data)  {sys.$params(arguments.length, 1);
   const {dbKey} = await  client.send({
    prg: cts.appName,
    source: "MainPg",
    rq: "write",
    dbKey: global.dbKeyV[0],
    Data: toJs(Data)
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
};




export  function lastYearId( Data)  {sys.$params(arguments.length, 1);  return arr.reduce(
  dic.keys(Data), "", function(r, e)  {sys.$params(arguments.length, 2);  return e > r ? e : r;}
);};




export  function yearIds( Data)  {sys.$params(arguments.length, 1);
  const R =sys.$checkNull( arr.copy(dic.keys(Data)));
  arr.sort(R,function(y1, y2)  {sys.$params(arguments.length, 2);  return y1 < y2;});
   return R;
};




export  function duplicateNick(Data, nick)  {sys.$params(arguments.length, 2);
  for (const  y  of sys.$forObject( Data)) for (const  a  of sys.$forObject( year.anns(y))) if (sys.$eq(a[ann.nick] , nick))  return true;
   return false;
};





export  function nicks( Data, yOp)  {sys.$params(arguments.length, 2);
  const R =sys.$checkNull( []); 
  for ( const [k, y]  of sys.$forObject2( Data)) {
    if (!sys.asBool(!sys.asBool(yOp)) && sys.$neq(yOp[0] , k)) continue;
    for (const  a  of sys.$forObject( year.anns(y))) {
      if (!sys.asBool(arr.any(R,function(n)  {sys.$params(arguments.length, 1);  return sys.$eq(n , a[ann.nick]);})))
        arr.push(R,a[ann.nick]);
    }
  }
  arr.sort(R,function(n1, n2)  {sys.$params(arguments.length, 2);  return n1 < n2;});
   return R;
};







export  function form( Data, type, nick, yOp)  {sys.$params(arguments.length, 4);
  const R =sys.$checkNull( []); 

  for ( const [k, y]  of sys.$forObject2( Data)) {
    if (!sys.asBool(!sys.asBool(yOp)) && sys.$neq(yOp[0] , k)) continue;

    for (const  a  of sys.$forObject( year.anns(y))) {
      if (sys.$neq(a[ann.nick] , nick)) continue;
      if (!sys.asBool(R)) { 
        const stocks =sys.$checkNull( a[ann.stocks]);
        const priceV =sys.$checkNull( [a[ann.price]]);
        const totalV =sys.$checkNull( [stocks * priceV[0]]);
        const feesOp =sys.$checkNull( []);
        if (sys.$eq(type , cts.withFees)) {
          arr.push(feesOp, Math.abs(totalV[0] - a[ann.cash]));
          totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( a[ann.cash]));
          priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
        }

        if (a[ann.isSell]) { 
          arr.push(R,formRow.mk(
            time.toIso(a[ann.date]),
            0, 0, 0,
            stocks, priceV[0], totalV[0],
            0, 0, 0,
            [], 0.0,
            feesOp, !sys.asBool(feesOp) ? [] : [feesOp[0]]
          ));
        } else {
          arr.push(R,formRow.mk(
            time.toIso(a[ann.date]),
            stocks, priceV[0], totalV[0],
            0, 0, 0,
            stocks, priceV[0], totalV[0],
            [], 0,
            feesOp, !sys.asBool(feesOp) ? [] : [feesOp[0]]
          ));
        }
      } else {
        if (!sys.asBool(yOp) && sys.$eq(time.day(a[ann.date]) , 1) && sys.$eq(time.month(a[ann.date]) , 1)) continue;

        const stocks =sys.$checkNull( a[ann.stocks]);
        const priceV =sys.$checkNull( [a[ann.price]]);
        const totalV =sys.$checkNull( [stocks * priceV[0]]);
        const feesOp =sys.$checkNull( []);
        if (sys.$eq(type , cts.withFees)) {
          arr.push(feesOp, Math.abs(totalV[0] - a[ann.cash]));
          totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( a[ann.cash]));
          priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
        }

        if (a[ann.isSell]) {
           const previousE =sys.$checkNull( arr.peek(R));
          const previousStocks =sys.$checkNull( previousE[formRow.ts]);
          const previousPrice =sys.$checkNull( previousE[formRow.tp]);
          const previousTotal =sys.$checkNull( previousE[formRow.tt]);
          const sellTotal =sys.$checkNull( stocks * previousPrice);
          const finalStocks0 =sys.$checkNull( previousStocks - stocks);
          const finalStocks =sys.$checkNull( finalStocks0 < 0 ? 0 : finalStocks0);

          const finalTotal =sys.$checkNull( previousTotal - sellTotal);
          const finalPrice =sys.$checkNull( finalStocks > 0 ? finalTotal / finalStocks : 0);

          const profits =sys.$checkNull( math.round(totalV[0] - sellTotal, 2));

          arr.push(R,formRow.mk(
            time.toIso(a[ann.date]),
            0, 0, 0,
            stocks, previousPrice, sellTotal,
            finalStocks, finalPrice, finalTotal,
            [profits], previousE[formRow.ttProfits] + profits,
            feesOp, !sys.asBool(feesOp) ? [] : [previousE[formRow.ttFees][0] + feesOp[0]]
          ));
        } else {
           const previousE =sys.$checkNull( arr.peek(R));
          const previousStocks =sys.$checkNull( previousE[formRow.ts]);
          const previousTotal =sys.$checkNull( previousE[formRow.tt]);
          const finalStocks =sys.$checkNull( previousStocks + stocks);
          const finalTotal =sys.$checkNull( previousTotal + totalV[0]);
          const finalPrice =sys.$checkNull( finalTotal / finalStocks);

          arr.push(R,formRow.mk(
            time.toIso(a[ann.date]),
            stocks, priceV[0], totalV[0],
            0, 0, 0,
            finalStocks, finalPrice, finalTotal,
            [], previousE[formRow.ttProfits],
            feesOp, !sys.asBool(feesOp) ? [] : [previousE[formRow.ttFees][0] + feesOp[0]]
          ));
        }
      }
    }
  }

   return R;
};







export  function set0101( Data, selYear)  {sys.$params(arguments.length, 2);
  const lastYear =sys.$checkNull( lastYearId(Data));
  if (lastYear > selYear) {
    const msg =sys.$checkNull( selYear + " is not the last year");
     return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
  }

  const previousYear =sys.$checkNull( "" + math.fromStr(lastYear)[0] - 1);
  const pYearOp =sys.$checkNull( dic.get(Data,previousYear));
  if (!sys.asBool(pYearOp)) {
    const msg =sys.$checkNull( i18n.fmt(II("There is no annotation of year %0"), [previousYear]));
     return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
  }
   const pYear =sys.$checkNull( pYearOp[0]);

  
  
  const Invs =sys.$checkNull( {});

  for (const  a  of sys.$forObject( year.anns(pYear))) {
    const DOp =sys.$checkNull( dic.get(Invs,a[ann.nick]));

    if (a[ann.isSell]) {
      if (!sys.asBool(DOp)) {
        const msg =sys.$checkNull( i18n.fmt(
          II("No previous buy in annotation:\n%0"),
          [ann.toStr(a)]
        ));
         return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
      }
       const D =sys.$checkNull( DOp[0]);
      if (D.stocks < a[ann.stocks]) {
        const msg =sys.$checkNull( i18n.fmt(
          II("Selling %0 stocks when there are %1\n%2"),
          [""+ a[ann.stocks], "" + D.stocks, ann.toStr(a)]
        ));
         return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
      }
      D.stocks -=sys.$checkExists(D.stocks,sys.$checkNull( a[ann.stocks]));
      continue;
    }

    if (!sys.asBool(DOp) && a[ann.stocks] > 0) {
      dic.put(Invs,
        a[ann.nick],
        {stocks: a[ann.stocks], price: a[ann.price], ucash: a[ann.cash] / a[ann.stocks]}
      );
    }
    if (!sys.asBool(!sys.asBool(DOp))) {
       const D =sys.$checkNull( DOp[0]);
      const stocks =sys.$checkNull( D.stocks + a[ann.stocks]);
      D.price =sys.$checkExists(D.price,sys.$checkNull( (D.stocks * D.price + a[ann.stocks] * a[ann.price]) / stocks));
      D.ucash =sys.$checkExists(D.ucash,sys.$checkNull( (D.stocks * D.ucash + a[ann.cash]) / stocks));
      D.stocks =sys.$checkExists(D.stocks,sys.$checkNull( stocks));
    }
  }

   const cYear =sys.$checkNull( Data[lastYear]);
  for (const  a  of sys.$forObject( arr.copy(year.anns(cYear))))
    if (sys.$eq(time.day(a[ann.date]) , 1) && sys.$eq(time.month(a[ann.date]) , 1))
      year.remove(cYear,a[ann.id]);

  const NkDs =sys.$checkNull( arr.filter(dic.toArr(Invs), function(NkD)  {sys.$params(arguments.length, 1);  return NkD[1].stocks > 0;}));
  arr.sort(NkDs,function(NkD1, NkD2)  {sys.$params(arguments.length, 2);  return NkD1[0] < NkD2[0];});
  for (const NkD  of sys.$forObject( NkDs)) {
     const D =sys.$checkNull( NkD[1]);
    year.add(cYear,[], ann.mk( 
      -1, false, time.fromStr(lastYear + "0101")[0], NkD[0],
      D.stocks, D.price, D.ucash * D.stocks
    ));
  }

   return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve("");});
};




export  function toJs( Data)  {sys.$params(arguments.length, 1);  return arr.map(
    dic.toArr(Data),
    function(Tp)  {sys.$params(arguments.length, 1);  return [Tp[0], year.toJs(Tp[1])];}
  );};



export  function fromJs( A)  {sys.$params(arguments.length, 1);  return dic.fromArr(arr.map(A,
    function(Tp)  {sys.$params(arguments.length, 1);  return [Tp[0], year.fromJs(Tp[1])];}
  ));};
