import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




import * as year from  "../data/year.js";
import * as formRow from  "../data/formRow.js";
import * as report from  "../data/report.js";
import * as cts from  "../data/cts.js";
import * as ann from  "../data/ann.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);



export  async  function request()  {sys.$params(arguments.length, 0);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "Main",
    rq: "read"
  }));

  if (sys.asBool(!sys.asBool(Rp["data"]))) {
    const All =sys.$checkNull( {}); 
    dic.put(All, cts.initialYear, year.mk(0, []));
     return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(All);});
  }

  const All =sys.$checkNull( fromJs(Rp["data"][0]));
  const y =sys.$checkNull( lastYearId(All));
  const currentYear =sys.$checkNull( "" + time.year(time.now()));
  if (sys.asBool(sys.$neq(y , currentYear))) {
    dic.put(All, currentYear, year.mk(0, []));
     return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(All);});
  }
   return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(All);});
};




export  async  function send(Data)  {sys.$params(arguments.length, 1);
  await client.ssend({
    prg: cts.appName,
    source: "Main",
    rq: "write",
    data: toJs(Data)
  });
};




export  function lastYearId(Data)  {sys.$params(arguments.length, 1);  return arr.reduce(
  dic.keys(Data), "",
  function(r, e)  {sys.$params(arguments.length, 2); return sys.asBool( e > r) ? e : r;}
);};




export  function yearIds(Data)  {sys.$params(arguments.length, 1);
  const R =sys.$checkNull( arr.copy(dic.keys(Data)));
  arr.sort(R, function(y1, y2)  {sys.$params(arguments.length, 2);  return y1 < y2;});
   return R;
};




export  function duplicateNick(Data, nick)  {sys.$params(arguments.length, 2);
  for (let V  of sys.$forObject( dic.values(Data))) for (let A  of sys.$forObject( V.anns)) if (sys.asBool(sys.$eq(A.nick , nick)))  return true;
   return false;
};






export  function nicks(Data, type, Year)  {sys.$params(arguments.length, 3);
  const R =sys.$checkNull( []); 
  for (let k  of sys.$forObject( Data)) {
    if (sys.asBool(sys.asBool(Year) && sys.asBool(sys.$neq(Year[0] , k)))) continue;
    for (let A  of sys.$forObject( Data[k].anns)) {
      if (sys.asBool(sys.asBool(type >= 0) && sys.asBool(sys.$neq(A.inv , type)))) continue;
      if (sys.asBool(!sys.asBool(arr.any(R, function(n)  {sys.$params(arguments.length, 1);  return sys.$eq(n , A.nick);}))))
        arr.push(R, A.nick);
    }
  }
  arr.sort(R, function(n1, n2)  {sys.$params(arguments.length, 2);  return n1 < n2;});
   return R;
};







export  function form(Data, type, nick, Year)  {sys.$params(arguments.length, 4);
  const R =sys.$checkNull( []); 

  for (let k  of sys.$forObject( Data)) {
    if (sys.asBool(sys.asBool(Year) && sys.asBool(sys.$neq(Year[0] , k)))) continue;

    for (let A  of sys.$forObject( Data[k].anns)) {
      if (sys.asBool(sys.asBool((sys.asBool(type >= 0) && sys.asBool(sys.$neq(A.inv , type)))) || sys.asBool(sys.$neq(A.nick , nick)))) continue;

      if (sys.asBool(!sys.asBool(R))) { 
        const stocks =sys.$checkNull( A.stocks);
        const priceV =sys.$checkNull( [A.price]);
        const totalV =sys.$checkNull( [stocks * priceV[0]]);
        const feesOp =sys.$checkNull( []);
        if (sys.asBool(sys.$eq(type , report.withFees))) {
          arr.push(feesOp, Math.abs(totalV[0] - A.cash));
          totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( A.cash));
          priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
        }

        if (sys.asBool(A.isSell)) { 
          arr.push(R, formRow.mk(
            time.toIso(A.date),
            0, 0, 0,
            stocks, priceV[0], totalV[0],
            0, 0, 0,
            [], 0.0,
            feesOp,sys.asBool( feesOp) ? [] : [feesOp[0]]
          ));
        } else {
          arr.push(R, formRow.mk(
            time.toIso(A.date),
            stocks, priceV[0], totalV[0],
            0, 0, 0,
            stocks, priceV[0], totalV[0],
            [], 0,
            feesOp,sys.asBool( feesOp) ? [feesOp[0]] : []
          ));
        }
      } else {
        if (sys.asBool(sys.asBool(sys.asBool(!sys.asBool(Year)) && sys.asBool(sys.$eq(time.day(A.date) , 1))) && sys.asBool(sys.$eq(time.month(A.date) , 1)))) continue;

        const stocks =sys.$checkNull( A.stocks);
        const priceV =sys.$checkNull( [A.price]);
        const totalV =sys.$checkNull( [stocks * priceV[0]]);
        const feesOp =sys.$checkNull( []);
        if (sys.asBool(sys.$eq(type , report.withFees))) {
          arr.push(feesOp, Math.abs(totalV[0] - A.cash));
          totalV[0] =sys.$checkExists(totalV[0],sys.$checkNull( A.cash));
          priceV[0] =sys.$checkExists(priceV[0],sys.$checkNull( totalV[0] / stocks));
        }

        if (sys.asBool(A.isSell)) {
          const previousE =sys.$checkNull( arr.peek(R));
          const previousStocks =sys.$checkNull( previousE.ts);
          const previousPrice =sys.$checkNull( previousE.tp);
          const previousTotal =sys.$checkNull( previousE.tt);
          const sellTotal =sys.$checkNull( stocks * previousPrice);
          const finalStocks0 =sys.$checkNull( previousStocks - stocks);
          const finalStocks =sys.$checkNull(sys.asBool( finalStocks0 < 0) ? 0 : finalStocks0);

          const finalTotal =sys.$checkNull( previousTotal - sellTotal);
          const finalPrice =sys.$checkNull(sys.asBool( finalStocks > 0) ? finalTotal / finalStocks : 0);

          const profits =sys.$checkNull( math.round(totalV[0] - sellTotal, 2));

          arr.push(R, formRow.mk(
            time.toIso(A.date),
            0, 0, 0,
            stocks, previousPrice, sellTotal,
            finalStocks, finalPrice, finalTotal,
            [profits], previousE.ttProfits + profits,
            feesOp,sys.asBool( feesOp) ? [previousE.ttFees[0] + feesOp[0]] : []
          ));
        } else {
          const previousE =sys.$checkNull( arr.peek(R));
          const previousStocks =sys.$checkNull( previousE.ts);
          const previousTotal =sys.$checkNull( previousE.tt);
          const finalStocks =sys.$checkNull( previousStocks + stocks);
          const finalTotal =sys.$checkNull( previousTotal + totalV[0]);
          const finalPrice =sys.$checkNull( finalTotal / finalStocks);

          arr.push(R, formRow.mk(
            time.toIso(A.date),
            stocks, priceV[0], totalV[0],
            0, 0, 0,
            finalStocks, finalPrice, finalTotal,
            [], previousE.ttProfits,
            feesOp,sys.asBool( feesOp) ? [previousE.ttFees[0] + feesOp[0]] : []
          ));
        }
      }
    }
  }

   return R;
};







export  function set0101(Data, selYear)  {sys.$params(arguments.length, 2);
  const lastYear =sys.$checkNull( lastYearId(Data));
  if (sys.asBool(lastYear > selYear)) {
    const msg =sys.$checkNull( selYear + " is not the last year");
     return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
  }

  const previousYear =sys.$checkNull( "" + math.fromStr(lastYear)[0] - 1);
  const PyearOp =sys.$checkNull( dic.get(Data, previousYear));
  if (sys.asBool(!sys.asBool(PyearOp))) {
    const msg =sys.$checkNull( i18n.fmt(II("There is no annotation of year %0"), [previousYear]));
     return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
  }
  const Pyear =sys.$checkNull( PyearOp[0]);

  
  
  const Invs =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,cts.investors), function(i)  {sys.$params(arguments.length, 1);  return {};})));

  for (let A  of sys.$forObject( Pyear.anns)) {
    const DOp =sys.$checkNull( dic.get(Invs[A.inv], A.nick));

    if (sys.asBool(A.isSell)) {
      if (sys.asBool(!sys.asBool(DOp))) {
        const msg =sys.$checkNull( i18n.fmt(
          II("No previous buy in annotation:\n%0"),
          [ann.toStr(A)]
        ));
         return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
      }
      const D =sys.$checkNull( DOp[0]);
      if (sys.asBool(D.stocks < A.stocks)) {
        const msg =sys.$checkNull( i18n.fmt(
          II("Selling %0 stocks when there are %1\n%2"),
          [""+ A.stocks, "" + D.stocks, ann.toStr(A)]
        ));
         return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(msg);});
      }
      D.stocks -=sys.$checkExists(D.stocks,sys.$checkNull( A.stocks));
      continue;
    }

    if (sys.asBool(sys.asBool(!sys.asBool(DOp)) && sys.asBool(A.stocks > 0))) {
      dic.put(
        Invs[A.inv], A.nick,
        {stocks: A.stocks, price: A.price, ucash: A.cash / A.stocks}
      );
    } if (sys.asBool(DOp)) {
      const D =sys.$checkNull( DOp[0]);
      const stocks =sys.$checkNull( D.stocks + A.stocks);
      D.price =sys.$checkExists(D.price,sys.$checkNull( (D.stocks * D.price + A.stocks * A.price) / stocks));
      D.ucash =sys.$checkExists(D.ucash,sys.$checkNull( (D.stocks * D.ucash + A.cash) / stocks));
      D.stocks =sys.$checkExists(D.stocks,sys.$checkNull( stocks));
    }
  }

  const Cyear =sys.$checkNull( Data[lastYear]);
  for (let A  of sys.$forObject( arr.copy(Cyear.anns)))
    if (sys.asBool(sys.asBool(sys.$eq(time.day(A.date) , 1)) && sys.asBool(sys.$eq(time.month(A.date) , 1))))
      year.remove(Cyear, A.id);

  for (let i = 0;i < cts.investors; ++i) {
    const NkDs =sys.$checkNull( arr.filter(dic.toArr(Invs[i]), function(NkD)  {sys.$params(arguments.length, 1);  return NkD[1].stocks > 0;}));
    arr.sort(NkDs, function(NkD1, NkD2)  {sys.$params(arguments.length, 2);  return NkD1[0] < NkD2[0];});
    for (let NkD  of sys.$forObject( NkDs)) {
      const D =sys.$checkNull( NkD[1]);
      year.add(Cyear, [], ann.mk( 
        -1, false, time.fromStr(lastYear + "0101")[0], i, NkD[0],
        D.stocks, D.price, D.ucash * D.stocks
      ));
    }
  }

   return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve("");});
};




export  function toJs(Data)  {sys.$params(arguments.length, 1);  return arr.map(
    dic.toArr(Data),
    function(Tp)  {sys.$params(arguments.length, 1);  return [Tp[0], year.toJs(Tp[1])];}
  );};



export  function fromJs(A)  {sys.$params(arguments.length, 1);  return dic.fromArr(arr.map(
    A,
    function(Tp)  {sys.$params(arguments.length, 1);  return [Tp[0], year.fromJs(Tp[1])];}
  ));};
