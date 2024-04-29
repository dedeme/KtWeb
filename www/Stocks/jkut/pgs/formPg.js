import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as all from  "../data/all.js";
import * as report from  "../data/report.js";
import * as formRow from  "../data/formRow.js";
import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const key =sys.$checkNull( "Stocks_forms_key");
const bk0 =sys.$checkNull( "#c0c0c0");
const bk1 =sys.$checkNull( "#f9f9ff");



export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const All =sys.$checkNull( await  all.request());
  show(wg, cts.withoutFees, All, [all.lastYearId(All)]);
};


 function show(wg, isel,  All, yearOp)  {sys.$params(arguments.length, 4);
  const sel =sys.$checkNull( sys.$eq(isel , cts.withoutFees)
    ? "without"
    : "with")
  ;

  const Ylopts =sys.$checkNull( []);
  arr.push(Ylopts,menu.toption("all", II("All"), function()  {sys.$params(arguments.length, 0); show(wg, isel, All, []);}));
  for (const myear  of sys.$forObject( all.yearIds(All))) {
    arr.push(Ylopts,menu.separator());
    arr.push(Ylopts,menu.toption(
      myear, myear, function()  {sys.$params(arguments.length, 0); show(wg, isel, All, [myear]);}
    ));
  }
  const selYear =sys.$checkNull( !sys.asBool(yearOp) ? "all" : "" + yearOp[0]);
  const ymenuWg =sys.$checkNull( menu.mk(Ylopts, [], selYear));

  const Lopts =sys.$checkNull( [
    menu.toption("with", II("With Fees"),
      function()  {sys.$params(arguments.length, 0); show(wg, cts.withFees, All, yearOp);}),
    menu.separator(),
    menu.toption("without", II("Without Fees"),
      function()  {sys.$params(arguments.length, 0); show(wg, cts.withoutFees, All, yearOp);})
  ]);
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], sel));

   const Nicks =sys.$checkNull( all.nicks(All,yearOp));
  const nickSelOp =sys.$checkNull( storage.get(key));
  const nickSel =sys.$checkNull( !sys.asBool(!sys.asBool(nickSelOp)) && arr.any(Nicks,function(n)  {sys.$params(arguments.length, 1);  return sys.$eq(n , nickSelOp[0]);})
    ? nickSelOp[0]
    : !sys.asBool(Nicks)
      ? ""
      : Nicks[0])
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


 function showNicks(wg, isel, Nicks, nickSel,  All, yearOp)  {sys.$params(arguments.length, 6);
  if (!sys.asBool(Nicks)) {
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
  const eOp =sys.$checkNull( []); 
  for (const nk  of sys.$forObject( Nicks)) {
    if (firstV[0]) firstV[0] =sys.$checkExists(firstV[0],sys.$checkNull( false));
    else arr.push(Lopts,menu.separator());

    const e =sys.$checkNull( menu.toption(nk, nk, function()  {sys.$params(arguments.length, 0); showNicks(wg, isel, Nicks, nk, All, yearOp);}));
    if (sys.$eq(nk , nickSel)) arr.push(eOp, e);
    arr.push(Lopts, e);
  }
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], nickSel));
  if (!sys.asBool(!sys.asBool(eOp))) eOp[0].wg.klass("frameMenu").style("");

   const Entries =sys.$checkNull( all.form(All,isel, nickSel, yearOp));
  const LeOp =sys.$checkNull( !sys.asBool(Entries) ? [] : [arr.peek(Entries)]);

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
    .adds(arr.map(Entries, function(e)  {sys.$params(arguments.length, 1);  return mkRow(e);}))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", "16"))
      .add(Q("td")
        .att("colspan", "2")
        .add(Q("hr"))))
    .add(!sys.asBool(LeOp)
      ? Q("tr")
          .add(Q("td")
            .att("colspan", "17")
            .style("text-align: center")
            .text(II("Without Data")))
      : Q("tr")
        .add(Q("td")
          .att("colspan", "14")
          .style("text-align: right")
          .text(II("Sum") + ":"))
        .add(Q("td").text(" "))
        .add(Q("td").text(" "))
        .add(Q("td")
          .klass("number")
          .style("background:" + bk1)
          .text(math.toIso(LeOp[0][formRow.ttProfits], 2)))
        .add(Q("td")
          .klass("number")
          .style("background:" + (LeOp[0][formRow.ttFees] > 0 ? bk1 : bk0))
          .text(LeOp[0][formRow.ttFees] > 0
              ? math.toIso(LeOp[0][formRow.ttFees], 2) : ""
            ))
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


 function mkRow( e)  {sys.$params(arguments.length, 1);
  const bkb =sys.$checkNull( "#fff0e0");
  const bks =sys.$checkNull( "#e0f0ff");
  const bkt =sys.$checkNull( "#f0f0f0");
   return Q("tr")
    .add(Q("td")
      .klass("number2")
      .text(e[formRow.date]))
    .add(Q("td"))
    .add(Q("td")
      .klass("number2")
      .style("background:" + bkb)
      .text(sys.$eq(e[formRow.bs] , 0) ? "" : math.toIso(e[formRow.bs], 0)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkb)
      .text(sys.$eq(e[formRow.bs] , 0) ? "" : math.toIso(e[formRow.bp], 4)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkb)
      .text(sys.$eq(e[formRow.bs] , 0) ? "" : math.toIso(e[formRow.bt], 2)))
    .add(Q("td"))
    .add(Q("td")
      .klass("number2")
      .style("background:" + bks)
      .text(sys.$eq(e[formRow.ss] , 0) ? "" : math.toIso(e[formRow.ss], 0)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bks)
      .text(sys.$eq(e[formRow.ss] , 0) ? "" : math.toIso(e[formRow.sp], 4)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bks)
      .text(sys.$eq(e[formRow.ss] , 0) ? "" : math.toIso(e[formRow.st], 2)))
    .add(Q("td"))
    .add(Q("td")
      .klass("number2")
      .style("background:" + bkt)
      .text(math.toIso(e[formRow.ts], 0)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkt)
      .text(sys.$eq(e[formRow.ts] , 0) ? "" : math.toIso(e[formRow.tp], 4)))
    .add(Q("td")
      .klass("number")
      .style("background:" + bkt)
      .text(math.toIso(e[formRow.tt], 2)))
    .add(Q("td"))
    .add(Q("td"))
    .add(Q("td")
      .klass("number")
      .style("background:" + (!sys.asBool(e[formRow.profits]) ? bk0 : bk1))
      .text(!sys.asBool(e[formRow.profits]) ? "" : math.toIso(e[formRow.profits][0] + e[formRow.st], 2)))
    .add(Q("td")
      .klass("number")
      .style("background:" + (!sys.asBool(e[formRow.profits]) ? bk0 : bk1))
      .text(!sys.asBool(e[formRow.profits]) ? "" : math.toIso(e[formRow.profits][0], 2)))
    .add(Q("td")
      .klass("number")
      .style("background:" + (!sys.asBool(e[formRow.fees]) ? bk0 : bk1))
      .text(!sys.asBool(e[formRow.fees]) ? "" : math.toIso(e[formRow.fees][0], 2)))
  ;
};
