import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as menu from  "../../libdm/menu.js";
import * as ldg from  "../../data/acc/ldg.js";
import * as msg from  "../../wgs/msg.js";
import * as cts from  "../../cts.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


const [nickOrder, valueOrder, profitsOrder, refOrder] =[0, 1, 2, 3];


 function fjail(price, close)  {sys.$params(arguments.length, 2);
   return sys.$eq(close , 0)
    ? 0
    : (price - close) * 100 / close
  ;};


 function fref(ref, close)  {sys.$params(arguments.length, 2);
   return sys.$eq(close , 0)
    ? 0
    : (ref - close) * 100 / close
  ;};


 function fcolor(value)  {sys.$params(arguments.length, 1);  return value < 0 ? "aa2800" : "0041aa";};





export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const {ok,  ledger,
   Portfolio, 
   Jails, 
   Closes, 
   Refs} 
  = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "BalancePg",
    rq: "idata"
  });

  if (!sys.asBool(ok)) {
    msg.error(cts.failMsg, function(){sys.$params(arguments.length, 0);});
    return;
  }

  const orderV = [refOrder];

  const showV = [[]];

  

  
   function setOrder(order)  {sys.$params(arguments.length, 1);
    orderV[0] = order;
    showV[0]();
  };

  

  
  showV[0] = function()  {sys.$params(arguments.length, 0);
     const D = {
      currentProfits: 0,
      accountProfits: 0,
      withdraw: 0,
      currentStocks: 0,
      profitsStocks: 0,

      equity: 0,
      sales: 0,
      fees: 0,
      profits: 0,
      differences: 0,
      cash: 0,
      accountStocks: 0
    };

    const Rows = {}; 
     const L = ledger;
     const P = Portfolio;
     const J = Jails;

    D.equity -=sys.$checkNull( L[ldg.equity]);
    D.sales -=sys.$checkNull( L[ldg.sales]);
    D.fees -=sys.$checkNull( L[ldg.fees]);
    D.profits -=sys.$checkNull( L[ldg.profits]);
    D.differences -=sys.$checkNull( L[ldg.differences]);
    D.accountStocks +=sys.$checkNull( L[ldg.stocks]);
    D.cash +=sys.$checkNull( L[ldg.cash]);

    for (const [nk, SP]  of sys.$forObject2( P)) {
      const stocks =sys.$checkNull( SP[0]);
      const price =sys.$checkNull( SP[1]);
      const refOp =sys.$checkNull( dic.get(Refs,nk));
      const ref =sys.$checkNull( !sys.asBool(refOp) ? 0 : refOp[0]);

      const Close =sys.$checkNull( dic.get(Closes,nk));
      const close =sys.$checkNull( !sys.asBool(Close) ? 0 : Close[0]);
      const TpRef =sys.$checkNull( arr.any(J,function(n)  {sys.$params(arguments.length, 1);  return sys.$eq(n , nk);})
        ? ["*", fjail(price, close)]
        : ["", fref(ref, close)])
      ;

      const RowOp =sys.$checkNull( dic.get(Rows,nk));
      const Row =sys.$checkNull( !sys.asBool(!sys.asBool(RowOp))
        ? function()  {sys.$params(arguments.length, 0);
            const R =sys.$checkNull( RowOp[0]);
            const stocks2 = R.stocks + stocks;
            const price2 = (R.stocks * R.price + stocks * price) / stocks2;
             return {
              stocks: stocks2,
              price: price2,
              close:close,
              value: stocks2 * close,
              profits: (close - price2) * stocks2,
              tpRef: sys.$eq(R.tpRef[0] , "")
                ? sys.$eq(TpRef[0] , "")
                  ? TpRef[1] > R.tpRef[1] ? TpRef : R.tpRef
                  : R.tpRef
                : sys.$eq(TpRef[0] , "")
                  ? TpRef
                  : TpRef[1] < R.tpRef[1] ? TpRef : R.tpRef
            };
          }()
        : {
            stocks:stocks,
            price:price,
            close:close,
            value: stocks * close,
            profits: (close - price) * stocks,
            tpRef: TpRef
          })
      ;
      dic.put(Rows,nk, Row);
    }

     const Rs =sys.$checkNull( dic.toArr(Rows));
    arr.sort(Rs,function(R1, R2)  {sys.$params(arguments.length, 2);
      const P1 =sys.$checkNull( R1[1]);
      const P2 =sys.$checkNull( R2[1]);
      return (  
        sys.$eq(orderV[0],nickOrder)? R1[0] < R2[0]:
        sys.$eq(orderV[0],valueOrder)? P1.value > P2.value:
        sys.$eq(orderV[0],profitsOrder)? P1.profits > P2.profits:
         sys.$eq(P1.tpRef[0] , "*")
          ? sys.$eq(P2.tpRef[0] , "*")
            ? P1.tpRef[1] < P2.tpRef[1]
            : false
          : sys.$eq(P2.tpRef[0] , "*")
            ? true
            : P1.tpRef[1] < P2.tpRef[1]
      );
    });

    D.accountProfits = D.cash + D.accountStocks - D.equity;
    D.currentStocks =sys.$checkNull( arr.reduce(Rs,0, function(r, Tp)  {sys.$params(arguments.length, 2);  return r + Tp[1].value;}));
    D.profitsStocks =sys.$checkNull( arr.reduce(Rs,0, function(r, Tp)  {sys.$params(arguments.length, 2);  return r + Tp[1].profits;}));
    D.currentProfits = D.accountProfits + D.profitsStocks;
    D.withdraw =sys.$checkNull( function()  {sys.$params(arguments.length, 0);
        const assets = D.equity + D.currentProfits;
        if (assets > cts.initialCapital + cts.bet + cts.bet) {
          const securAmount = cts.minToBet - cts.bet;
          const dif = assets - cts.initialCapital - cts.bet;
          if (D.cash > dif + securAmount)  return dif;
          if (D.cash > securAmount)
             return math.toInt((D.cash - cts.minToBet) / cts.bet) * cts.bet;
        }
         return 0;
      }());

    wg
      .removeAll()
      .add(Q("div")
        .klass("head")
        .html(II("Profits")))

      .add(Q("table")
        .att("align", "center")
        .klass("home")
        .add(Q("tr")
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Current profits") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(
                "<font color='#" + fcolor(D.currentProfits) + "'>" +
                math.toIso(D.currentProfits, 2) +
                "</font>"))))
        .add(Q("tr")
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Accounting profits") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(
                "<font color='#" + fcolor(D.accountProfits) + "'>" +
                math.toIso(D.accountProfits, 2) +
                "</font>"))))
        .add(Q("tr")
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("To withdraw") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(sys.$eq(D.withdraw , "- - -") ? "- - -" : math.toIso(D.withdraw, 2))))))

      .add(Q("div")
        .klass("head")
        .html(II("Balance")))
      .add(Q("table")
        .att("align", "center")
        .klass("home")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .klass("head")
            .add(Q("span")
              .html(II("Assets"))))
          .add(Q("td").klass("separator"))
          .add(Q("td")
            .att("colspan", 2)
            .klass("head")
            .add(Q("span")
              .html(II("Liabilities")))))
        .add(Q("tr")
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Stocks") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(D.accountStocks, 2))))
          .add(Q("td").klass("separator"))
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Equity") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(D.equity, 2)))))
        .add(Q("tr")
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Cash") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(D.cash, 2))))
          .add(Q("td").klass("separator"))
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Sells") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(D.sales, 2)))))
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td").klass("separator"))
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Fees") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(D.fees, 2)))))
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td").klass("separator"))
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Profits") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(D.profits, 2)))))
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td").klass("separator"))
          .add(Q("td")
            .klass("rlabel")
            .add(Q("span")
              .html(II("Differences") + ":")))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(D.differences, 2))))))

      .add(Q("div")
        .klass("head")
        .html(II("Stocks")))
      .add(Q("table")
        .att("align", "center")
        .klass("home")
        .add(Q("tr")
          .add(Q("td")
            .klass("head")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); setOrder(nickOrder);})
              .klass("linkBold")
              .html(II("Co."))))
          .add(Q("td").klass("head")
            .add(Q("span").html("Nm.")))
          .add(Q("td").klass("head")
            .add(Q("span").html(II("Buy"))))
          .add(Q("td").klass("head")
            .add(Q("span").html(II("Sell"))))
          .add(Q("td").klass("head")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); setOrder(valueOrder);})
              .klass("linkBold")
              .html(II("Value"))))
          .add(Q("td")
            .klass("head")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); setOrder(profitsOrder);})
              .klass("linkBold")
              .html(II("Profits"))))
          .add(Q("td")
            .klass("head")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); setOrder(refOrder);})
              .klass("linkBold")
              .html(II("Rf. (%)")))))
        .adds(arr.map(Rs, function(R)  {sys.$params(arguments.length, 1);  return Q("tr") 
          .add(Q("td")
            .klass("nick")
            .add(Q("span")
              .html(R[0])))
          .add(Q("td")
            .klass("number2")
            .add(Q("span")
              .html(math.toIso(R[1].stocks, 0))))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(R[1].price, 4))))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(R[1].close, 4))))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(R[1].value, 2))))
          .add(Q("td")
            .klass("number")
            .add(Q("span")
              .html(math.toIso(R[1].profits, 2))))
          .add(Q("td")
            .klass("number")
            .setStyle("color", sys.$eq(R[1].tpRef[0] , "*") ? ("#" + fcolor( -1)) : "")
            .add(Q("span")
              .html(math.toIso(R[1].tpRef[1], 2))))
          ;}))
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td")
            .klass("numberSum")
            .add(Q("span")
              .html(math.toIso(D.currentStocks, 2))))
          .add(Q("td")
            .klass("numberSum")
            .add(Q("span")
              .html(math.toIso(D.profitsStocks, 2))))
          .add(Q("td"))
        ))
    ;
  };

  showV[0]();

};
