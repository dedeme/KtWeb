import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




import * as menu from  "../libdm/menu.js";
import * as all from  "../data/all.js";
import * as report from  "../data/report.js";
import * as cts from  "../data/cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const key =sys.$checkNull( "Stocks_forms_key");
const bk0 =sys.$checkNull( "#c0c0c0");
const bk1 =sys.$checkNull( "#f9f9ff");



export  async  function mk(wg, yearOp)  {sys.$params(arguments.length, 2);
  const All =sys.$checkNull( await  all.request());
  show(wg, report.all, All, yearOp);
};


 function show(wg, isel, All, yearOp)  {sys.$params(arguments.length, 4);
  const sel =sys.$checkNull(sys.asBool( sys.$eq(isel , report.all))
    ? "all"
    :sys.asBool( sys.$eq(isel , report.withFees))
      ? "with"
      : "Inv-" + isel)
  ;

  const Ylopts =sys.$checkNull( []);
  arr.push(Ylopts, menu.toption(
      "all", II("All"), function()  {sys.$params(arguments.length, 0); show(wg, isel, All, []);}
  ));
  for (let myear  of sys.$forObject( all.yearIds(All))) {
    arr.push(Ylopts, menu.separator());
    arr.push(Ylopts, menu.toption(
      myear, myear, function()  {sys.$params(arguments.length, 0); show(wg, isel, All, [myear]);}
    ));
  }
  const selYear =sys.$checkNull(sys.asBool( yearOp) ? "" + yearOp[0] : "all");
  const ymenuWg =sys.$checkNull( menu.mk(Ylopts, [], selYear, false));

  const Lopts =sys.$checkNull( [menu.toption("all", II("All"), function()  {sys.$params(arguments.length, 0); show(wg,  -1, All, yearOp);})]);
  for (let i = 0;i < cts.investors; ++i) {
    const name =sys.$checkNull( "Inv-" + i);
    arr.push(Lopts, menu.separator());
    arr.push(Lopts, menu.toption(name, name, function()  {sys.$params(arguments.length, 0); show(wg, i, All, yearOp);}));
  }
  const Ropts =sys.$checkNull( [
    menu.toption("with", II("With Fees"), function()  {sys.$params(arguments.length, 0); show(wg,  -2, All, yearOp);})
  ]);
  const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, sel, false));

  const Nicks =sys.$checkNull( all.nicks(All, isel, yearOp));
  const nickSelOp =sys.$checkNull( storage.get(key));
  const nickSel =sys.$checkNull(sys.asBool( sys.asBool(nickSelOp) && sys.asBool(arr.any(Nicks, function(n)  {sys.$params(arguments.length, 1);  return sys.$eq(n , nickSelOp[0]);})))
    ? nickSelOp[0]
    :sys.asBool( Nicks)
      ? Nicks[0]
      : "")
  ;

  const body =sys.$checkNull( Q("div"));
  showNicks(body, isel, Nicks, nickSel, All, yearOp);

  wg
    .removeAll()
    .add(ymenuWg)
    .add(menuWg)
    .add(body)
  ;
};


 function showNicks(wg, isel, Nicks, nickSel, All, yearOp)  {sys.$params(arguments.length, 6);
  if (sys.asBool(!sys.asBool(Nicks))) {
    wg
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .text(II("Without data")))))
    ;
    return;
  }

  storage.put(key, nickSel);
  const Lopts =sys.$checkNull( []);
  const firstV =sys.$checkNull( [true]);
  const EOp =sys.$checkNull( []); 
  for (let nk  of sys.$forObject( Nicks)) {
    if (sys.asBool(firstV[0])) firstV[0] =sys.$checkExists(firstV[0],sys.$checkNull( false));
    else arr.push(Lopts, menu.separator());

    const E =sys.$checkNull( menu.toption(nk, nk, function()  {sys.$params(arguments.length, 0); showNicks(wg, isel, Nicks, nk, All, yearOp);}));
    if (sys.asBool(sys.$eq(nk , nickSel))) arr.push(EOp, E);
    arr.push(Lopts, E);
  }
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], nickSel, false));
  if (sys.asBool(EOp)) EOp[0].wg.klass("frameMenu").style("");

  const Entries =sys.$checkNull( all.form(All, isel, nickSel, yearOp));
  const LeOp =sys.$checkNull(sys.asBool( Entries)
    ? [arr.peek(Entries)]
    : [])
  ;

  const table =sys.$checkNull( Q("table")
    .klass("border")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("header")
        .text(II("Date")))
      .add(Q("td").text(" "))
      .add(Q("td")
        .klass("header")
        .text(II("Stocks")))
      .add(Q("td")
        .klass("header")
        .text(II("Price")))
      .add(Q("td")
        .klass("header")
        .text(II("Total")))
      .add(Q("td").text(" "))
      .add(Q("td")
        .klass("header")
        .text(II("Stocks")))
      .add(Q("td")
        .klass("header")
        .text(II("Price")))
      .add(Q("td")
        .klass("header")
        .text(II("Total")))
      .add(Q("td").text(" "))
      .add(Q("td")
        .klass("header")
        .text(II("Stocks")))
      .add(Q("td")
        .klass("header")
        .text(II("Price")))
      .add(Q("td")
        .klass("header")
        .text(II("Total")))
      .add(Q("td").text(" "))
      .add(Q("td").text(" "))
      .add(Q("td")
        .klass("header")
        .text(II("Income")))
      .add(Q("td")
        .klass("header")
        .text(II("Profits")))
      .add(Q("td")
        .klass("header")
        .text(II("Fees"))))
    .adds(arr.map(Entries, function(E)  {sys.$params(arguments.length, 1);  return mkRow(E);}))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", "16"))
      .add(Q("td")
        .att("colspan", "2")
        .add(Q("hr"))))
    .add(sys.asBool(LeOp)
      ? Q("tr")
        .add(Q("td")
          .att("colspan", "14")
          .style("text-align: right")
          .text(II("Sum") + ":"))
        .add(Q("td").text(" "))
        .add(Q("td").text(" "))
        .add(Q("td")
          .klass("number")
          .style("background:" + bk1)
          .text(math.toIso(LeOp[0].ttProfits, 2)))
        .add(Q("td")
          .klass("number")
          .style("background:" + (sys.asBool(LeOp[0].ttFees > 0) ? bk1 : bk0))
          .text(sys.asBool(LeOp[0].ttFees > 0) ? math.toIso(LeOp[0].ttFees, 2) : ""))
      : Q("tr")
          .add(Q("td")
            .att("colspan", "17")
            .style("text-align: center")
            .text(II("Without Data")))
      ))
  ;

  wg
    .removeAll()
    .add(menuWg)
    .add(Q("div")
      .klass("head")
      .text(II("Form")))
    .add(table)
  ;
};


 function mkRow(E)  {sys.$params(arguments.length, 1);
  const bkb =sys.$checkNull( "#fff0e0");
  const bks =sys.$checkNull( "#e0f0ff");
  const bkt =sys.$checkNull( "#f0f0f0");
   return Q("tr")
    .add(Q("td")
      .klass("number2")
      .text(E.date))
    .add(Q("td"))
    .add(Q("td")
      .klass("number2")
      .style("background:" + bkb)
      .text(sys.asBool(sys.$eq(E.bs , 0)) ? "" : math.toIso(E.bs, 0)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkb)
      .text(sys.asBool(sys.$eq(E.bs , 0)) ? "" : math.toIso(E.bp, 4)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkb)
      .text(sys.asBool(sys.$eq(E.bs , 0)) ? "" : math.toIso(E.bt, 2)))
    .add(Q("td"))
    .add(Q("td")
      .klass("number2")
      .style("background:" + bks)
      .text(sys.asBool(sys.$eq(E.ss , 0)) ? "" : math.toIso(E.ss, 0)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bks)
      .text(sys.asBool(sys.$eq(E.ss , 0)) ? "" : math.toIso(E.sp, 4)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bks)
      .text(sys.asBool(sys.$eq(E.ss , 0)) ? "" : math.toIso(E.st, 2)))
    .add(Q("td"))
    .add(Q("td")
      .klass("number2")
      .style("background:" + bkt)
      .text(math.toIso(E.ts, 0)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkt)
      .text(sys.asBool(sys.$eq(E.ts , 0)) ? "" : math.toIso(E.tp, 4)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkt)
      .text(math.toIso(E.tt, 2)))
    .add(Q("td"))
    .add(Q("td"))
    .add(Q("td")
      .klass("number")
      .style("background:" + (sys.asBool(E.profits) ? bk1 : bk0))
      .text(sys.asBool(E.profits)
          ? math.toIso(E.profits[0] + E.st, 2)
          : ""
        ))
    .add(Q("td")
      .klass("number")
      .style("background:" + (sys.asBool(E.profits) ? bk1 : bk0))
      .text(sys.asBool(E.profits) ? math.toIso(E.profits[0], 2): ""))
    .add(Q("td")
      .klass("number")
      .style("background:" + (sys.asBool(E.fees) ? bk1 : bk0))
      .text(sys.asBool(E.fees) ? math.toIso(E.fees[0], 2) : ""))
  ;
};
