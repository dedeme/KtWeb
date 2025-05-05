import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as stRs from  "../../data/stRs.js";
import * as order from  "../../data/order.js";
import * as broker from  "../../data/broker.js";
import * as global from  "../../global.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  function mk(wg,  Cos,  Closes,  rs)  {sys.$params(arguments.length, 4);
   const Orders =sys.$checkNull( rs[stRs.Orders]);
   const LastCloses =sys.$checkNull( arr.peek(Closes));

  
   function mkTr(date,  Buys,  Sells,  Portfolio,  Quarantine, cash)  {sys.$params(arguments.length, 6);
    arr.sort(Portfolio,str.less);
    arr.sort(Quarantine,str.less);

     return Q("tr")
      .add(Q("td")
        .klass("lframe")
        .text(time.toIso(time.fromStr(date)[0])))
      .add(Q("td")
        .klass("lframe")
        .style("width:100px")
        .text(arr.join(Buys,", ")))
      .add(Q("td")
        .klass("lframe")
        .style("width:100px")
        .text(arr.join(Sells,", ")))
      .add(Q("td")
        .klass("lframe")
        .style("width:300px")
        .text(arr.join(Portfolio,", ") + " [" + arr.size(Portfolio) + "]"))
      .add(Q("td")
        .klass("lframe")
        .style("width:200px")
        .text(arr.join(Quarantine,", ") + " [" + arr.size(Quarantine) + "]"))
      .add(Q("td")
        .klass("rframe")
        .text(math.toIso(cash, 2)))
    ;
  };

  const assetsV = [0];
  const Trs = []; 
  if (arr.size(Orders) > 0) {
    const lastDateV = [""];
    const cashV = [global.initialCapitalV[0]];
    const Buys = []; 
    const Sells = []; 
    const Quarantine = {}; 
    const Portfolio = {}; 

    for (const  o  of sys.$forObject( Orders)) {
      const date =sys.$checkNull( o[order.date]);

      if (sys.$eq(lastDateV[0] , "")) {
        lastDateV[0] = date;
      } else if (sys.$neq(date , lastDateV[0])) {
        arr.push(Trs,
          mkTr(
            lastDateV[0], Buys, Sells,
            dic.keys(Portfolio), dic.keys(Quarantine), cashV[0]
          )
        );
        arr.clear(Buys);
        arr.clear(Sells);
        lastDateV[0] = date;
      }

      const QRemoves = []; 
      for (const [nk, d]  of sys.$forObject2( Quarantine)) if (d <= date) arr.push(QRemoves,nk);

      for (const nk  of sys.$forObject( QRemoves)) dic.remove(Quarantine,nk);

      const nk =sys.$checkNull( o[order.nick]);
      switch (o[order.type]) {
        case global.orderSellV[0]:{ {
          arr.push(Sells, nk);
          const pr =sys.$checkNull( Portfolio[nk][1]);
          dic.remove(Portfolio,nk);
          cashV[0] +=sys.$checkNull( broker.sell(o[order.stocks], o[order.price]));
           const dt =sys.$checkNull( time.fromStr(date)[0]);
          if (o[order.price] < pr * global.noLossMultiplicatorV[0]) 
            dic.put(Quarantine,nk, time.toStr(time.addDays(dt,global.daysLossV[0])));
        }break;}
        case global.orderBuyV[0]:{ {
          arr.push(Buys, nk);
          dic.put(Portfolio,nk, [o[order.stocks], o[order.price]]);
          cashV[0] -=sys.$checkNull( broker.buy(o[order.stocks], o[order.price]));
        }break;}
      }
    }
    arr.push(Trs,
      mkTr(
        lastDateV[0], Buys, Sells,
        dic.keys(Portfolio), dic.keys(Quarantine), cashV[0]
      )
    );
    assetsV[0] =sys.$checkNull( arr.reduce(
      dic.toArr(Portfolio),
      cashV[0],
      function(r, Tp)  {sys.$params(arguments.length, 2);
         return r + broker.sell(
            Tp[1][0], LastCloses[arr.index(Cos,function(n)  {sys.$params(arguments.length, 1);  return sys.$eq(n , Tp[0]);})]
          );}
    ));
  } else {
    arr.push(Trs,Q("tr")
      .add(Q("td")
        .att("rowspan", "5")
        .text(II("Without Data"))))
    ;
  }

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Assets")))
    .add(Q("table")
      .att("align", "center")
      .klass("white")
      .add(Q("tr")
        .add(Q("td")
          .klass("rframe")
          .text(math.toIso(assetsV[0], 2)))))
    .add(Q("div")
      .klass("head")
      .text(II("Orders")))
    .add(Q("table")
      .att("align", "center")
      .klass("flat")
      .add(Q("tr")
        .add(Q("td")
          .klass("lhead")
          .style("text-align:center")
          .text(II("Date")))
        .add(Q("td")
          .klass("lhead")
          .style("text-align:center")
          .text(II("Buys")))
        .add(Q("td")
          .klass("lhead")
          .style("text-align:center")
          .text(II("Sells")))
        .add(Q("td")
          .klass("lhead")
          .style("text-align:center")
          .text(II("Portfolio")))
        .add(Q("td")
          .klass("lhead")
          .style("text-align:center")
          .text(II("Quarantine")))
        .add(Q("td")
          .klass("rhead")
          .style("text-align:center")
          .text(II("Cash"))))
      .adds(Trs))
  ;
};
