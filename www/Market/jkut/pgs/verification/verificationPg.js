import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as datePicker from  "../../libdm/datePicker.js";
import * as msg from  "../../wgs/msg.js";
import * as cts from  "../../cts.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg)  {sys.$params(arguments.length, 1); mk2 (wg, time.now());};

const wgV = [Q("div")];

const dateV = [time.now()];




 function mkStocksEntry(fs)  {sys.$params(arguments.length, 1);  return Q("tr")
    .add(Q("td")
      .klass("border")
      .add(ui.img(fs[0])))
    .add(Q("td")
      .klass("border")
      .style("text-align:center")
      .text(fs[1]))
    .add(Q("td"))
    .add(Q("td")
      .klass("border")
      .style("text-align:right")
      .text(fs[2]))
    .add(Q("td")
      .klass("border")
      .style("text-align:right")
      .text(fs[3]))
    .add(Q("td"))
    .add(Q("td")
      .klass("border")
      .style("text-align:right")
      .text(fs[4]))
    .add(Q("td")
      .klass("border")
      .style("text-align:right")
      .text(fs[5]))
    .add(Q("td")
      .klass("border")
      .style("text-align:right")
      .text(fs[6]))
    .add(Q("td"))
    .add(Q("td")
      .klass("border")
      .style("text-align:right")
      .text(fs[7]))
  ;};



 function missingCMarket(stocksEntry)  {sys.$params(arguments.length, 1);  return mkStocksEntry([
    "error3", stocksEntry[0],
    "- - -", "- - -",
    stocksEntry[1], stocksEntry[2], stocksEntry[3],
    ""
  ]);};



 function missingStocks(cMarketEntry)  {sys.$params(arguments.length, 1);  return mkStocksEntry([
    "error3", cMarketEntry[0],
    cMarketEntry[1], cMarketEntry[2],
    "- - -", "- - -", "- - -",
    ""
  ]);};


 function nickEntry(cMarketEntry, stocksEntry)  {sys.$params(arguments.length, 2);
  const ok = sys.$eq(cMarketEntry[1] , stocksEntry[1]) &&
    sys.$eq(cMarketEntry[2] , stocksEntry[2])
  ;

   return mkStocksEntry([
    ok ? "well3" : "error3", stocksEntry[0],
    cMarketEntry[1], cMarketEntry[2],
    stocksEntry[1], stocksEntry[2], stocksEntry[3],
    ""
  ]);
};


 async  function mk2(wg, date)  {sys.$params(arguments.length, 2);
  wgV[0] = wg;
  const now =sys.$checkNull( time.now());
  dateV[0] =sys.$checkNull( sys.$eq(time.year(date) , time.year(now)) ? date : now);
  const {ok, marketCash, hcontaCash, 
   MarketStocks,  StocksStocks, 
  stocksSum, hcontaSum} 
  = await  client.send({
    prg: cts.appName,
    module: "Verification",
    source: "VerificationPg",
    rq: "idata",
    lastDate: time.toStr(dateV[0])
  });

  if (!sys.asBool(ok)) {
    msg.error(cts.failMsg, function(){sys.$params(arguments.length, 0);});
    return;
  }

  const marketCashS =sys.$checkNull( math.toIso(marketCash, 2));
  const hcontaCashS =sys.$checkNull( math.toIso(hcontaCash, 2));

  
   const MarketStocksS =sys.$checkNull( arr.map(MarketStocks,function(E)  {sys.$params(arguments.length, 1);  return [
      E[0], 
      math.toIso(E[1], 0), 
      math.toIso(E[2], 4) 
    ];}));
  arr.sort(MarketStocksS,function(E1, E2)  {sys.$params(arguments.length, 2);
     return str.toUpper(E1[0]) < str.toUpper(E2[0]);}
  );

  
   const StocksStocksS =sys.$checkNull( arr.map(StocksStocks,function(E)  {sys.$params(arguments.length, 1);  return [
      E[0], 
      math.toIso(E[1], 0), 
      math.toIso(E[2], 4), 
      math.toIso(E[3], 2) 
    ];}));
  arr.sort(StocksStocksS,function(E1, E2)  {sys.$params(arguments.length, 2);
     return str.toUpper(E1[0]) < str.toUpper(E2[0]);}
  );

  const stocksSumS =sys.$checkNull( math.toIso(stocksSum, 2));
  const hcontaSumS =sys.$checkNull( math.toIso(hcontaSum, 2));

  const cashDiv =sys.$checkNull( Q("div"));
  const stocksDiv =sys.$checkNull( Q("div"));

  mkCash(cashDiv, marketCashS, hcontaCashS);
  mkStocks(stocksDiv, MarketStocksS, StocksStocksS, stocksSumS, hcontaSumS);

  wg
    .removeAll()
    .add(cashDiv)
    .add(stocksDiv)
  ;
};


 function mkCash(div, market, hconta)  {sys.$params(arguments.length, 3);
  const icon =sys.$checkNull( sys.$eq(market , hconta) ? "well3" : "error3");
  div
    .removeAll()
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center;vertical-align:top;")
          .add(Q("div")
            .klass("head")
            .html(II("Cash"))))))
    .add(Q("table")
      .klass("summary")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("border")
          .style("text-align:center")
          .text("·"))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text("Market"))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text("Hconta")))
      .add(Q("tr")
        .add(Q("td")
          .klass("border")
          .add(ui.img(icon)))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(market))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(hconta))))
  ;
};


 function mkStocks(div,  MarketStocks,  StocksStocks, stocksSum, hcontaSum)  {sys.$params(arguments.length, 5);
  
   function entries()  {sys.$params(arguments.length, 0);
    const R = []; 
    const mmIxV = [0];
    const stIxV = [0];
    const sizeMarket =sys.$checkNull( arr.size(MarketStocks));
    const sizeStocks =sys.$checkNull( arr.size(StocksStocks));
    while (true) {
      if (mmIxV[0] >= sizeMarket && stIxV[0] >= sizeStocks) {
        break;
      }

      if (mmIxV[0] >= sizeMarket) {
        arr.push(R,missingCMarket(StocksStocks[stIxV[0]]));
        stIxV[0] += 1;
        continue;
      }

      if (stIxV[0] >= sizeStocks) {
        arr.push(R,missingStocks(MarketStocks[mmIxV[0]]));
        mmIxV[0] += 1;
        continue;
      }

      const mmNick =sys.$checkNull( MarketStocks[mmIxV[0]][0]);
      const stNick =sys.$checkNull( StocksStocks[stIxV[0]][0]);

      if (sys.$eq(mmNick , stNick)) {
        arr.push(R,nickEntry(MarketStocks[mmIxV[0]], StocksStocks[stIxV[0]]));
        mmIxV[0] += 1;
        stIxV[0] += 1;
      } else if (mmNick < stNick) {
        arr.push(R,missingStocks(MarketStocks[mmIxV[0]]));
        mmIxV[0] += 1;
      } else {
        arr.push(R,missingCMarket(StocksStocks[stIxV[0]]));
        stIxV[0] += 1;
      }
    }

     return R;
  };

  const dp =sys.$checkNull( datePicker.mk(i18n.getLang(), dateV[0], function(d)  {sys.$params(arguments.length, 1);
    if (sys.$eq(d , "")) {
      mk(wgV[0]);
    } else {
      const y =sys.$checkNull( time.fmt(time.now(), "%Y"));
      if (sys.$neq(sys.$slice(d,null,4) , y)) {
        ui.alert(i18n.fmt(II("Date '%0' out of year %1"), [d, y]));
        mk(wgV[0]);
      } else {
        mk2(wgV[0], time.fromStr(d)[0]);
      }
    }
  }));

  div
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .style("padding-top:14px")
      .add(Q("tr")
        .add(Q("td")
          .add(datePicker.mkText(
            dp,
            Q("input")
              .style("text-align:center;width:80px"))
            ))))
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center;vertical-align:top;")
          .add(Q("div")
            .klass("head")
            .html(II("Stocks"))))))
    .add(Q("table")
      .klass("summary")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("border"))
        .add(Q("td")
          .klass("border"))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .att("colspan", "2")
          .style("text-align:center")
          .text("Market"))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .att("colspan", "3")
          .style("text-align:center")
          .text("Stocks"))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:center")
          .text("Hconta")))

      .add(Q("tr")
        .add(Q("td")
          .klass("border")
          .style("text-align:center")
          .text("·"))
        .add(Q("td")
          .klass("border")
          .style("text-align:center")
          .text("Nick"))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .style("width:75px;text-align:right")
          .text(II("Stks.")))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(II("Price")))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .style("width:75px;text-align:right")
          .text(II("Stks.")))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(II("Price")))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(II("Cost")))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(II("Cost"))))
      .adds(entries())
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "11")))
      .add(Q("tr")
        .add(Q("td")
          .klass("border")
          .style("text-align:center")
          .add(ui.img(sys.$eq(stocksSum , hcontaSum) ? "well3" : "error3")))
        .add(Q("td")
          .klass("border")
          .style("text-align:center")
          .text(II("Sum")))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .style("width:75px;text-align:right")
          .text(""))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(""))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .style("width:75px;text-align:right")
          .text(""))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(""))
        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(stocksSum))

        .add(Q("td"))

        .add(Q("td")
          .klass("border")
          .style("width:100px;text-align:right")
          .text(hcontaSum))))
  ;
};
