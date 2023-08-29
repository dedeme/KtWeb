import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




import * as datePicker from  "../libdm/datePicker.js";
import * as menu from  "../libdm/menu.js";
import * as cts from  "../data/cts.js";
import * as all from  "../data/all.js";
import * as year from  "../data/year.js";
import * as report from  "../data/report.js";
import * as ann from  "../data/ann.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



export  async  function mk(wg, Year)  {sys.$params(arguments.length, 2);
  const AllData =sys.$checkNull( await  all.request());
  const selYear =sys.$checkNull(sys.asBool( Year) ? Year[0] : all.lastYearId(AllData));
   async  function update()  {sys.$params(arguments.length, 0);
      await all.send(AllData);
      mk(wg, [selYear]);
    };
  const Data =sys.$checkNull( AllData[selYear]);
  const ReportRs =sys.$checkNull( year.getReport(Data, report.all));

  const MkAnns =sys.$checkNull( [[]]);

  

  
   async  function initialStock(e)  {sys.$params(arguments.length, 1);
    if (sys.asBool(!sys.asBool(ui.confirm(II("Set values of the year beginning?"))))) return;
    const err =sys.$checkNull( await  all.set0101(AllData, selYear));
    if (sys.asBool(err)) {
      ui.alert(err);
      return;
    }
    update();
  };

  
   function cancel(e)  {sys.$params(arguments.length, 1); mk(wg, [selYear]);};

  
  
   function accept(AnnOp, buyBt, sellBt, dateWg, InvBts,
            nickWg, stocksWg, priceWg, cashWg)  {sys.$params(arguments.length, 9);
    const isSell =sys.$checkNull( sellBt.isChecked());
    const invV =sys.$checkNull( [0]);
    for (let i = 0;i < arr.size(InvBts); ++i) if (sys.asBool(InvBts[i].isChecked())) invV[0] =sys.$checkExists(invV[0],sys.$checkNull( i));
    const inv =sys.$checkNull( invV[0]);

    const dateTx =sys.$checkNull( str.trim(dateWg.getValue()));
    if (sys.asBool(!sys.asBool(dateTx))) { ui.alert(II("Date is missing")); return; }
    const dateOp =sys.$checkNull( time.fromIso(dateTx, "/"));
    if (sys.asBool(!sys.asBool(dateOp))) { ui.alert(II("Date is not valid")); return; }
    const date =sys.$checkNull( dateOp[0]);
    if (sys.asBool(sys.$neq(selYear , "" + time.year(date)))) {
      ui.alert(II("Date year is not the selected year"));
      return;
    }

    const nick =sys.$checkNull( str.trim(nickWg.getValue()));
    if (sys.asBool(!sys.asBool(nick))) { ui.alert(II("Nick is missing")); return; }

    const stocksOp =sys.$checkNull( fns.int(stocksWg));
    if (sys.asBool(!sys.asBool(stocksOp))) {ui.alert(II("Stocks is not a valid integer")); return; }
    const stocks =sys.$checkNull( stocksOp[0]);

    const priceOp =sys.$checkNull( fns.float(priceWg, 4));
    if (sys.asBool(!sys.asBool(priceOp))) {ui.alert(II("Price is not a valid number")); return; }
    const price =sys.$checkNull( priceOp[0]);
    if (sys.asBool(price < 0)) { ui.alert(II("Price < 0")); return; }

    const cashOp =sys.$checkNull( fns.float(cashWg, 2));
    if (sys.asBool(!sys.asBool(cashOp))) { ui.alert(II("Cash is not a valid number")); return; }
    const cash =sys.$checkNull( cashOp[0]);
    if (sys.asBool(cash < 0)) { ui.alert(II("Cash < 0")); return; }
    if (sys.asBool(sys.asBool(isSell) && sys.asBool(cash > stocks * price))) {
      ui.alert(II("'Cash > Stocks * Price' in a sell"));
      return;
    }
    if (sys.asBool(sys.asBool(!sys.asBool(isSell)) && sys.asBool(cash < stocks * price))) {
      ui.alert(II("'Cash < Stocks * Price' in a buy"));
      return;
    }

    if (sys.asBool(!sys.asBool(all.duplicateNick(AllData, nick)))) {
      if (sys.asBool(!sys.asBool(ui.confirm(II("A new nick is to be added.\nContinue?")))))
        return;
    }

    year.add(Data, AnnOp, ann.mk( 
      -1, isSell, date, inv, nick, stocks, price, cash
    ));
    update();
  };

  
   function del(A)  {sys.$params(arguments.length, 1);
    if (sys.asBool(ui.confirm(i18n.fmt(II("%0\nDelete annotation?"), [ann.toStr(A)])))) {
      year.remove(Data, A.id);
      update();
    }
  };

  

  

  
   function entries(td)  {sys.$params(arguments.length, 1);
    
     function entry(A)  {sys.$params(arguments.length, 1);
      const is0101 =sys.$checkNull( sys.asBool(sys.$eq(time.day(A.date) , 1)) && sys.asBool(sys.$eq(time.month(A.date) , 1)));
       return Q("tr")
        .add(Q("td")
          .add(sys.asBool(is0101)
            ? Q("span")
              .add(ui.lightImg("delete"))
            : ui.link(function(e)  {sys.$params(arguments.length, 1); del(A);})
                .add(ui.img("delete"))))
        .add(Q("td")
          .add(sys.asBool(is0101)
            ? Q("span")
              .add(ui.lightImg("edit"))
            : ui.link(function(e)  {sys.$params(arguments.length, 1); MkAnns[0](td, [A]);})
                .add(ui.img("edit"))))
        .add(Q("td")
          .add(sys.asBool(A.isSell) ? ui.led("#4080ff", 6) : ui.led("#ff8040", 6)))
        .add(Q("td").klass("frame").text(time.toIso(A.date)))
        .add(Q("td").klass("frame").text("" + A.inv))
        .add(Q("td").klass("frame").text(A.nick))
        .add(Q("td").klass("number2").text(math.toIso(A.stocks, 0)))
        .add(Q("td").klass("number2").text(math.toIso(A.price, 4)))
        .add(Q("td").klass("number2").text(math.toIso(A.cash, 2)))
      ;
    };
     return arr.map(arr.reverse(year.anns(Data)), entry);
  };

  
  MkAnns[0] =sys.$checkExists(MkAnns[0], function(td, AnnOp)  {sys.$params(arguments.length, 2);
    
     function th()  {sys.$params(arguments.length, 0);  return Q("td")
      .style("text-align: center;padding-left: 4px; padding-right: 4px")
    ;};

    
    const state =sys.$checkNull( ui.led(sys.asBool(ReportRs[1]) ? "#80C0E0" : "#E0C080", 6)
        .att("title",sys.asBool( ReportRs[1]) ? II("Data is ok") : II("An error is found")))
    ;
    if (sys.asBool(!sys.asBool(ReportRs[1]))) {
      td
        .removeAll()
        .klass("frame")
        .text(ReportRs[0])
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

    const InvBts =sys.$checkNull( []); 
    for (let i = 0;i < cts.investors; ++i) {
      arr.push(InvBts, Q("input")
        .att("type", "radio")
        .att("name", "investor")
      );
    }
    InvBts[0].att("checked", "true");
    const invsWg =sys.$checkNull( Q("div")
      .adds(arr.fromIter(iter.map(iter.$range(0,arr.size(InvBts)), function(i)  {sys.$params(arguments.length, 1);
           return Q("span")
            .add(InvBts[i])
            .add(Q("span")
              .html("<big> " + i + "</big>&nbsp;&nbsp;"))
        ;}))))
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

    const set0101 =sys.$checkNull(sys.asBool( sys.$eq(selYear , all.lastYearId(AllData)))
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
          AnnOp, buyBt, sellBt, dateWg, InvBts, nickWg, stocksWg, priceWg, cashWg
        );}))
    ;

    if (sys.asBool(AnnOp)) {
      const A =sys.$checkNull( AnnOp[0]);
      if (sys.asBool(A.isSell)) {
        buyBt.checked(false);
        sellBt.checked(true);
      }
      datePicker.setDate(datePk, A.date);
      for (let i = 0;i < arr.size(InvBts); ++i) InvBts[i].checked(sys.$eq(i , A.inv));
      nickWg.value(A.nick);
      stocksWg.value(math.toIso(A.stocks, 0));
      priceWg.value(math.toIso(A.price, 4));
      cashWg.value(math.toIso(A.cash, 2));
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
        .add(th()
          .text(II("Inv."))))
      .add(Q("tr")
        .add(th()
          .add(buyBt))
        .add(th()
          .add(sellBt))
        .add(Q("td")
          .add(datePickerWg))
        .add(Q("td")
          .klass("border")
          .style("white-space: nowrap")
          .add(invsWg)))
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
    if (sys.asBool(!sys.asBool(year.anns(Data)))) {
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

  

  
   function sumaryTrs(Sum)  {sys.$params(arguments.length, 1);
    
     function mkRow(E)  {sys.$params(arguments.length, 1);  return Q("tr")
      .add(Q("td")
        .text(E.nick))
      .add(Q("td")
        .klass("number2")
        .text(math.toIso(E.stocks, 0)))
      .add(Q("td")
        .klass("number")
        .text(math.toIso(E.price, 4)))
      .add(Q("td")
        .klass("number")
        .text(math.toIso(E.total, 2)))
    ;};
     return arr.map(arr.reverse(Sum), function(E)  {sys.$params(arguments.length, 1);  return mkRow(E);});
  };

  
   function annsTrs(Ranns)  {sys.$params(arguments.length, 1);
    
     function mkRow(Ra)  {sys.$params(arguments.length, 1);  return Q("tr")
      .add(Q("td")
        .add(sys.asBool(Ra.profits) ? ui.led("#4080ff", 6) : ui.led("#ff8040", 6)))
      .add(Q("td").klass("frame").text(time.toIso(Ra.date)))
      .add(Q("td").klass("frame").text(Ra.nick))
      .add(Q("td").klass("number2").text(math.toIso(Ra.stocks, 0)))
      .add(Q("td").klass("number").text(math.toIso(Ra.price, 4)))
      .add(Q("td").klass("number2").text(math.toIso(Ra.total, 2)))
      .add(Q("td")
        .klass(sys.asBool(Ra.profits) ? "number" : "header")
        .text(sys.asBool(Ra.profits) ? math.toIso(Ra.profits[0], 2) : ""))
      .add(Q("td")
        .klass(sys.asBool(Ra.fees) ? "number" : "header")
        .text(sys.asBool(Ra.fees) ? math.toIso(Ra.fees[0], 2) : ""))
    ;};

    if (sys.asBool(Ranns))
       return arr.map(arr.reverse(Ranns), function(Ra)  {sys.$params(arguments.length, 1);  return mkRow(Ra);});

     return [Q("tr")
      .add(Q("td")
        .klass("frame")
        .text(II("Without Annotations")))
    ];
  };

  
  
   function mkReports(td, isel)  {sys.$params(arguments.length, 2);
    const sel =sys.$checkNull(sys.asBool( sys.$eq(isel , report.all))
      ? "all"
      :sys.asBool( sys.$eq(isel , report.withFees))
        ? "with"
        : "Inv-" + isel)
    ;

    const Lopts =sys.$checkNull( [menu.toption("all", II("All"), function()  {sys.$params(arguments.length, 0); mkReports(td,  -1);})]);
    for (let i = 0;i < cts.investors; ++i) {
      const name =sys.$checkNull( "Inv-" + i);
      Lopts.push(menu.separator());
      Lopts.push(menu.toption(name, name, function()  {sys.$params(arguments.length, 0); mkReports(td, i);}));
    }
    const Ropts =sys.$checkNull( [
      menu.toption("with", II("With Fees"), function()  {sys.$params(arguments.length, 0); mkReports(td,  -2);})
    ]);
    const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, sel, false));

    const body =sys.$checkNull( Q("div"));
    const ReportRs =sys.$checkNull( year.getReport(Data, isel));

    if (sys.asBool(!sys.asBool(ReportRs[1]))) {
      body.html(II("Fail making report") + "<br>" + ReportRs[0]);
      td
        .removeAll()
        .add(menuWg)
        .add(body)
      ;
      return;
    }

    const Report =sys.$checkNull( ReportRs[0]);
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
            .text(math.toIso(Report.cost, 2))))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align: right; width: 80px")
            .text(II("Profits") + ":"))
          .add(Q("td")
            .klass("number")
            .text(math.toIso(Report.profits, 2))))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align: right; width: 80px")
            .text(II("Fees") + ":"))
          .add(Q("td")
            .klass(sys.asBool(Report.fees) ? "number" : "header")
            .text(sys.asBool(Report.fees) ? math.toIso(Report.fees[0], 2) : ""))))
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
        .adds(sumaryTrs(Report.summary)))
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
        .adds(annsTrs(Report.anns)))
    ;

    td
      .removeAll()
      .setStyle("padding", "8px")
      .add(menuWg)
      .add(body)
    ;
  };

  const Lopts =sys.$checkNull( []);
  const firstV =sys.$checkNull( [true]);
  for (let myear  of sys.$forObject( all.yearIds(AllData))) {
    if (sys.asBool(firstV[0])) {
      firstV[0] =sys.$checkExists(firstV[0],sys.$checkNull( false));
    } else {
      arr.push(Lopts, menu.separator());
    }
    arr.push(Lopts, menu.toption(
      myear, myear, function()  {sys.$params(arguments.length, 0); mk(wg, [myear]);}
    ));
  }
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], selYear, false));

  const annsTd =sys.$checkNull( Q("td")
    .klass("border")
    .style("width: 5px;vertical-align:top"))
  ;
  MkAnns[0](annsTd, []);

  const reportsTd =sys.$checkNull( Q("td")
    .klass("border")
    .style("vertical-align:top; padding-top: 3px; padding-left: 2px"))
  ;
  mkReports(reportsTd, report.all);

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
