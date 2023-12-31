import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as result from  "../../data/result.js";
import * as modelEval from  "../../data/modelEval.js";
import * as order from  "../../data/order.js";
import * as cts from  "../../data/cts.js";
import * as broker from  "../../data/broker.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, daysWin, daysLoss, Params)  {sys.$params(arguments.length, 4);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "OperationsPg",
    rq: "idata",
    daysWin:daysWin,
    daysLoss:daysLoss,
    params: Params
  }));
  const Nicks =sys.$checkNull( Rp.nicks); 
  const LastCloses =sys.$checkNull( Rp.lastCloses); 
  const Orders =sys.$checkNull( arr.map(Rp.orders, function(O)  {sys.$params(arguments.length, 1);  return order.fromJs(O);}));

  
   function mkTr(date, Buys, Sells, Portfolio, Quarantine, cash)  {sys.$params(arguments.length, 6);
    arr.sort(Portfolio, str.less);
    arr.sort(Quarantine, str.less);

     return Q("tr")
      .add(Q("td")
        .klass("lframe")
        .text(time.toIso(time.fromStr(date)[0])))
      .add(Q("td")
        .klass("lframe")
        .style("width:100px")
        .text(arr.join(Buys, ", ")))
      .add(Q("td")
        .klass("lframe")
        .style("width:100px")
        .text(arr.join(Sells, ", ")))
      .add(Q("td")
        .klass("lframe")
        .style("width:300px")
        .text(arr.join(Portfolio, ", ") + " [" + arr.size(Portfolio) + "]"))
      .add(Q("td")
        .klass("lframe")
        .style("width:200px")
        .text(arr.join(Quarantine, ", ") + " [" + arr.size(Quarantine) + "]"))
      .add(Q("td")
        .klass("rframe")
        .text(math.toIso(cash, 2)))
    ;
  };

  const Assets =sys.$checkNull( [0]);
  const Trs =sys.$checkNull( []); 
  if (sys.asBool(arr.size(Orders) > 0)) {
    const LastDate =sys.$checkNull( [""]);
    const Cash =sys.$checkNull( [cts.initialCapital]);
    const Buys =sys.$checkNull( []); 
    const Sells =sys.$checkNull( []); 
    const Quarantine =sys.$checkNull( {}); 
    const Portfolio =sys.$checkNull( {}); 

    for (const O  of sys.$forObject( Orders)) {
      const date =sys.$checkNull( O.date);
      const QRemoves =sys.$checkNull( []); 

      for (const [nk, d]  of sys.$forObject2( Quarantine))
        if (sys.asBool(d <= date)) arr.push(QRemoves, nk);

      for (const nk  of sys.$forObject( QRemoves)) dic.remove(Quarantine, nk);

      if (sys.asBool(!sys.asBool(LastDate[0]))) {
        LastDate[0] =sys.$checkExists(LastDate[0],sys.$checkNull( date));
      } else if (sys.asBool(sys.$neq(date , LastDate))) {
        arr.push(
          Trs,
          mkTr(
            LastDate[0], Buys, Sells,
            dic.keys(Portfolio), dic.keys(Quarantine), Cash[0]
          )
        );
        arr.clear(Buys);
        arr.clear(Sells);
        LastDate[0] =sys.$checkExists(LastDate[0],sys.$checkNull( date));
      }
      const nk =sys.$checkNull( O.nick);
      switch (O.type) {
        case order.sell:{ {
          arr.push(Sells, nk);
          const pr =sys.$checkNull( Portfolio[nk][1]);
          dic.remove(Portfolio, nk);
          Cash[0] +=sys.$checkExists(Cash[0],sys.$checkNull( broker.sell(O.stocks, O.price)));
          const dt0 =sys.$checkNull( time.fromStr(date)[0]);
          const dt =sys.$checkNull( time.addDays(dt0,sys.asBool( (O.price >= pr * cts.noLossMultiplicator))
            ? daysWin
            : daysLoss
          ));
          dic.put(Quarantine, nk, time.toStr(dt)); 
        }break;}
        case order.buy:{ {
          arr.push(Buys, nk);
          dic.put(Portfolio, nk, [O.stocks, O.price]);
          Cash[0] -=sys.$checkExists(Cash[0],sys.$checkNull( broker.buy(O.stocks, O.price)));
        }break;}
      }
    }
    arr.push(
      Trs,
      mkTr(
        LastDate[0], Buys, Sells,
        dic.keys(Portfolio), dic.keys(Quarantine), Cash[0]
      )
    );
    Assets[0] =sys.$checkExists(Assets[0],sys.$checkNull( arr.reduce(
      dic.toArr(Portfolio),
      Cash[0],
      function(r, Tp)  {sys.$params(arguments.length, 2);
         return r + broker.sell(
            Tp[1][0], LastCloses[arr.index(Nicks, function(n)  {sys.$params(arguments.length, 1);  return sys.$eq(n , Tp[0]);})]
          );}
    )));
  } else {
    arr.push(Trs, Q("tr")
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
          .text(math.toIso(Assets[0], 2)))))
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
