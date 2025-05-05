import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as datePicker from  "../libdm/datePicker.js";
import * as menu from  "../libdm/menu.js";
import * as cts from  "../cts.js";
import * as all from  "../data/all.js";
import * as year from  "../data/year.js";
import * as report from  "../data/report.js";
import * as rsumm from  "../data/rsumm.js";
import * as rann from  "../data/rann.js";
import * as ann from  "../data/ann.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, yOp)  {sys.$params(arguments.length, 2);
  
   const AllData =sys.$checkNull( await  all.request());
  const selYear =sys.$checkNull( !sys.asBool(yOp) ? all.lastYearId(AllData) : yOp[0]);
   const y =sys.$checkNull( AllData[selYear]);
   const [rp, rpOk] = year.getReport(y,cts.withFees);

  const mkAnnsOp = [[]];

  

  
   async  function update()  {sys.$params(arguments.length, 0);
      await all.send(AllData);
      mk(wg, [selYear]);
    };

  
   async  function initialStock(e)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(ui.confirm(II("Set values of the year beginning?")))) return;
    const err =sys.$checkNull( await  all.set0101(AllData,selYear));
    if (sys.$neq(err , "")) {
      ui.alert(err);
      return;
    }
    update();
  };

  
   function cancel(e)  {sys.$params(arguments.length, 1); mk(wg, [selYear]);};

  
  
   function accept(annOp, buyBt, sellBt, dateWg,
            nickWg, stocksWg, priceWg, cashWg)  {sys.$params(arguments.length, 8);
    const isSell =sys.$checkNull( sellBt.isChecked());

    const dateTx =sys.$checkNull( str.trim(dateWg.getValue()));
    if (sys.$eq(dateTx , "")) { ui.alert(II("Date is missing")); return; }
    const dateOp =sys.$checkNull( time.fromIso(dateTx, "/"));
    if (!sys.asBool(dateOp)) { ui.alert(II("Date is not valid")); return; }
    const date =sys.$checkNull( dateOp[0]);
    if (sys.$neq(selYear , "" + time.year(date))) {
      ui.alert(II("Date year is not the selected year"));
      return;
    }

    const nick =sys.$checkNull( str.trim(nickWg.getValue()));
    if (sys.$eq(nick , "")) { ui.alert(II("Nick is missing")); return; }

    const stocksOp =sys.$checkNull( fns.int(stocksWg));
    if (!sys.asBool(stocksOp)) {ui.alert(II("Stocks is not a valid integer")); return; }
    const stocks =sys.$checkNull( stocksOp[0]);

    const priceOp =sys.$checkNull( fns.float(priceWg, 4));
    if (!sys.asBool(priceOp)) {ui.alert(II("Price is not a valid number")); return; }
    const price =sys.$checkNull( priceOp[0]);
    if (price < 0) { ui.alert(II("Price < 0")); return; }

    const cashOp =sys.$checkNull( fns.float(cashWg, 2));
    if (!sys.asBool(cashOp)) { ui.alert(II("Cash is not a valid number")); return; }
    const cash =sys.$checkNull( cashOp[0]);
    if (cash < 0) { ui.alert(II("Cash < 0")); return; }
    if (isSell && cash > stocks * price) {
      ui.alert(II("'Cash > Stocks * Price' in a sell"));
      return;
    }
    if (!sys.asBool(isSell) && cash < stocks * price) {
      ui.alert(II("'Cash < Stocks * Price' in a buy"));
      return;
    }

    if (!sys.asBool(all.duplicateNick(AllData,nick))) {
      if (!sys.asBool(ui.confirm(II("A new nick is to be added.\nContinue?"))))
        return;
    }

    year.add(y,annOp, ann.mk( 
      -1, isSell, date, nick, stocks, price, cash
    ));
    update();
  };

  
   function del( a)  {sys.$params(arguments.length, 1);
    if (ui.confirm(i18n.fmt(II("%0\nDelete annotation?"), [ann.toStr(a)]))) {
      year.remove(y,a[ann.id]);
      update();
    }
  };

  

  

  
   function entries(td)  {sys.$params(arguments.length, 1);
    
     function entry( a)  {sys.$params(arguments.length, 1);
      const is0101 = sys.$eq(time.day(a[ann.date]) , 1) && sys.$eq(time.month(a[ann.date]) , 1);
       return Q("tr")
        .add(Q("td")
          .add(is0101
            ? Q("span")
              .add(ui.lightImg("delete"))
            : ui.link(function(e)  {sys.$params(arguments.length, 1); del(a);})
                .add(ui.img("delete"))))
        .add(Q("td")
          .add(is0101
            ? Q("span")
              .add(ui.lightImg("edit"))
            : ui.link(function(e)  {sys.$params(arguments.length, 1); mkAnnsOp[0](td, [a]);})
                .add(ui.img("edit"))))
        .add(Q("td")
          .add(a[ann.isSell] ? ui.led("#4080ff", 6) : ui.led("#ff8040", 6)))
        .add(Q("td").klass("frame").text(time.toIso(a[ann.date])))
        .add(Q("td").klass("frame").text(a[ann.nick]))
        .add(Q("td").klass("number2").text(math.toIso(a[ann.stocks], 0)))
        .add(Q("td").klass("number2").text(math.toIso(a[ann.price], 4)))
        .add(Q("td").klass("number2").text(math.toIso(a[ann.cash], 2)))
      ;
    };
     return arr.map(arr.reverse(year.anns(y)), entry);
  };

  
  mkAnnsOp[0] =sys.$checkExists(mkAnnsOp[0], function(td, annOp)  {sys.$params(arguments.length, 2);
    
     function th()  {sys.$params(arguments.length, 0);  return Q("td")
      .style("text-align: center;padding-left: 4px; padding-right: 4px")
    ;};

    
    const state =sys.$checkNull( ui.led(rpOk ? "#80C0E0" : "#E0C080", 6)
        .att("title", rpOk ? II("Data is ok") : II("An error is found")))
    ;
    if (!sys.asBool(rpOk)) {
      td
        .removeAll()
        .klass("frame")
        .text(rp)
      ;
      return;
    }

    const dateWg =sys.$checkNull( Q("input").style("width: 100px;text-align:center"));
    const datePk =sys.$checkNull( datePicker.mk(
      i18n.getLang(),
      time.now(),
      function(s)  {sys.$params(arguments.length, 1);}
    ));

    const buyBt =sys.$checkNull( Q("input")
      .att("type", "radio")
      .att("name", "operation")
      .att("checked", "true"))
    ;

    const sellBt =sys.$checkNull( Q("input")
      .att("type", "radio")
      .att("name", "operation"))
    ;

    const nickWg =sys.$checkNull( ui.field("stocks")
      .style("width: 50px"))
    ;

    const stocksWg =sys.$checkNull( ui.field("price")
      .att("id", "stocks")
      .style("width: 50px"))
    ;

    const priceWg =sys.$checkNull( ui.field("cash")
      .att("id", "price")
      .style("width: 100px"))
    ;
    ui.changePoint(priceWg);

    const cashWg =sys.$checkNull( ui.field("accept")
      .att("id", "cash")
      .style("width: 150px"))
    ;
    ui.changePoint(cashWg);

    const set0101 =sys.$checkNull( sys.$eq(selYear , all.lastYearId(AllData))
      ? ui.link(initialStock)
        .att("title", II("Set initial stock"))
        .klass("link")
        .text("0101")
      : Q("span"))
    ;

    const cancelBt =sys.$checkNull( Q("button")
      .text(II("Cancel"))
      .on("click", cancel))
    ;

    const acceptBt =sys.$checkNull( Q("button")
      .att("id", "accept")
      .text(II("Accept"))
      .on("click", function(e)  {sys.$params(arguments.length, 1); accept(
          annOp, buyBt, sellBt, dateWg, nickWg, stocksWg, priceWg, cashWg
        );}))
    ;

    if (!sys.asBool(!sys.asBool(annOp))) {
       const a =sys.$checkNull( annOp[0]);
      if (a[ann.isSell]) {
        buyBt.checked(false);
        sellBt.checked(true);
      }
      datePicker.setDate(datePk, a[ann.date]);
      nickWg.value(a[ann.nick]);
      stocksWg.value(math.toIso(a[ann.stocks], 0));
      priceWg.value(math.toIso(a[ann.price], 4));
      cashWg.value(math.toIso(a[ann.cash], 2));
    }

    const datePickerWg =sys.$checkNull( datePicker.mkText(datePk, dateWg));

    const editor =sys.$checkNull( Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
            .add(state))
        .add(Q("td"))
        .add(Q("td")))
      .add(Q("tr")
        .add(th()
          .text(II("Buy")))
        .add(th()
          .text(II("Sell")))
        .add(th()
          .text(II("Date")))
        .add(th()))
      .add(Q("tr")
        .add(th()
          .add(buyBt))
        .add(th()
          .add(sellBt))
        .add(Q("td")
          .add(datePickerWg))
        .add(Q("td")))
      .add(Q("tr")
        .add(th()
          .text(II("Nick")))
        .add(th()
          .text(II("Stocks")))
        .add(th()
          .text(II("Price")))
        .add(th()
          .text(II("Cash"))))
      .add(Q("tr")
        .add(th()
          .add(nickWg))
        .add(th()
          .add(stocksWg))
        .add(Q("td")
          .add(priceWg))
        .add(Q("td")
          .add(cashWg)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align: center")
          .add(set0101))
        .add(Q("td")
          .att("colspan", 3)
          .style("text-align: right")
          .add(cancelBt)
          .add(Q("span")
            .html("&nbsp;&nbsp;"))
          .add(acceptBt))))
    ;


    const list =sys.$checkNull( Q("table")
        .klass("frame")
        .att("align", "center"))
    ;
    if (!sys.asBool(year.anns(y))) {
      list
        .add(Q("tr")
          .add(Q("td")
            .text(II("Without Data"))))
      ;
    } else {
      list.adds(entries(td));
    }

    td
      .removeAll()
      .add(editor)
      .add(Q("hr"))
      .add(list)
    ;
  });

  

  
   function sumaryTrs( Sum)  {sys.$params(arguments.length, 1);
    
     function mkRow( e)  {sys.$params(arguments.length, 1);  return Q("tr")
      .add(Q("td")
        .text(e[rsumm.nick]))
      .add(Q("td")
        .klass("number2")
        .text(math.toIso(e[rsumm.stocks], 0)))
      .add(Q("td")
        .klass("number")
        .text(math.toIso(e[rsumm.price], 4)))
      .add(Q("td")
        .klass("number")
        .text(math.toIso(e[rsumm.total], 2)))
    ;};
     return arr.map(arr.reverse(Sum), function(e)  {sys.$params(arguments.length, 1);  return mkRow(e);});
  };

  
   function annsTrs( Ranns)  {sys.$params(arguments.length, 1);
    
     function mkRow( ra)  {sys.$params(arguments.length, 1);  return Q("tr")
      .add(Q("td")
        .add(!sys.asBool(ra[rann.profitsOp]) ? ui.led("#ff8040", 6) : ui.led("#4080ff", 6)))
      .add(Q("td").klass("frame").text(time.toIso(ra[rann.date])))
      .add(Q("td").klass("frame").text(ra[rann.nick]))
      .add(Q("td").klass("number2").text(math.toIso(ra[rann.stocks], 0)))
      .add(Q("td").klass("number").text(math.toIso(ra[rann.price], 4)))
      .add(Q("td").klass("number2").text(math.toIso(ra[rann.total], 2)))
      .add(Q("td")
        .klass(!sys.asBool(ra[rann.profitsOp]) ? "header" : "number")
        .text(!sys.asBool(ra[rann.profitsOp]) ? "" : math.toIso(ra[rann.profitsOp][0], 2)))
      .add(Q("td")
        .klass(!sys.asBool(ra[rann.feesOp]) ? "header" : "number")
        .text(!sys.asBool(ra[rann.feesOp]) ? "" : math.toIso(ra[rann.feesOp][0], 2)))
    ;};

    if (!sys.asBool(Ranns))
       return [Q("tr")
        .add(Q("td")
          .klass("frame")
          .text(II("Without Annotations")))
      ];

     return arr.map(arr.reverse(Ranns), function( ra)  {sys.$params(arguments.length, 1);  return mkRow(ra);});
  };

  
  
   function mkReports(td, isel)  {sys.$params(arguments.length, 2);
    const sel =sys.$checkNull( sys.$eq(isel , cts.withoutFees)
      ? "without"
      : "with")
    ;

    const Lopts = [
      menu.toption("with", II("With Fees"), function()  {sys.$params(arguments.length, 0); mkReports(td, cts.withFees);}),
      menu.separator(),
      menu.toption("without", II("Without Fees"),
        function()  {sys.$params(arguments.length, 0); mkReports(td, cts.withoutFees);})
    ];
    const menuWg =sys.$checkNull( menu.mk(Lopts, [], sel));

    const body =sys.$checkNull( Q("div"));
     const [rp, rpOk] = year.getReport(y,isel);

    if (!sys.asBool(rpOk)) {
      body.html(II("Fail making report") + "<br>" + rp);
      td
        .removeAll()
        .add(menuWg)
        .add(body)
      ;
      return;
    }

    body
      .add(Q("table")
        .klass("border")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .style("text-align: right; width: 80px")
            .text(II("Cost") + ":"))
          .add(Q("td")
            .klass("number")
            .text(math.toIso(rp[report.cost], 2))))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align: right; width: 80px")
            .text(II("Profits") + ":"))
          .add(Q("td")
            .klass("number")
            .text(math.toIso(rp[report.profits], 2))))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align: right; width: 80px")
            .text(II("Fees") + ":"))
          .add(Q("td")
            .klass(!sys.asBool(rp[report.feesOp]) ? "header" : "number")
            .text(!sys.asBool(rp[report.feesOp]) ? "" : math.toIso(rp[report.feesOp][0], 2)))))
      .add(Q("div")
        .klass("head")
        .text(II("Stocks")))
      .add(Q("table")
        .klass("border")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("header")
            .text(II("Nick")))
          .add(Q("td")
            .klass("header")
            .text(II("Stocks")))
          .add(Q("td")
            .klass("header")
            .text(II("Price")))
          .add(Q("td")
            .klass("header")
            .text(II("Total"))))
        .adds(sumaryTrs(rp[report.Summary])))
      .add(Q("div")
        .klass("head")
        .text(II("Annotations")))
      .add(Q("table")
        .klass("border")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("header")
            .text(""))
          .add(Q("td")
            .klass("header")
            .text(II("Date")))
          .add(Q("td")
            .klass("header")
            .text(II("Nick")))
          .add(Q("td")
            .klass("header")
            .text(II("Stocks")))
          .add(Q("td")
            .klass("header")
            .text(II("Price")))
          .add(Q("td")
            .klass("header")
            .text(II("Total")))
          .add(Q("td")
            .klass("header")
            .text(II("Profits")))
          .add(Q("td")
            .klass("header")
            .text(II("Fees"))))
        .adds(annsTrs(rp[report.Anns])))
    ;

    td
      .removeAll()
      .setStyle("padding", "8px")
      .add(menuWg)
      .add(body)
    ;
  };

  const Lopts = [];
  const firstV = [true];
  for (const myear  of sys.$forObject( all.yearIds(AllData))) {
    if (firstV[0]) {
      firstV[0] =sys.$checkExists(firstV[0], false);
    } else {
      arr.push(Lopts,menu.separator());
    }
    arr.push(Lopts,menu.toption(
      myear, myear, function()  {sys.$params(arguments.length, 0); mk(wg, [myear]);}
    ));
  }
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], selYear));

  const annsTd =sys.$checkNull( Q("td")
    .klass("border")
    .style("width: 5px;vertical-align:top"))
  ;
  mkAnnsOp[0](annsTd, []);

  const reportsTd =sys.$checkNull( Q("td")
    .klass("border")
    .style("vertical-align:top; padding-top: 3px; padding-left: 2px"))
  ;
  mkReports(reportsTd, cts.withFees);

  wg
    .removeAll()
    .add(menuWg)
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(annsTd)
        .add(Q("td")
          .klass("border"))
        .add(reportsTd)))
  ;
};
