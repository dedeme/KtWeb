import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as all from  "../data/all.js";
import * as year from  "../data/year.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, yearOp)  {sys.$params(arguments.length, 2);
  const All =sys.$checkNull( await  all.request());

  const lastYear =sys.$checkNull(sys.asBool( yearOp) ? yearOp[0] : all.lastYearId(All));

  const Lopts =sys.$checkNull( []);
  const firstV =sys.$checkNull( [true]);
  for (const myear  of sys.$forObject( all.yearIds(All))) {
    if (sys.asBool(firstV[0])) firstV[0] =sys.$checkExists(firstV[0],sys.$checkNull( false));
    else arr.push(Lopts, menu.separator());

    arr.push(Lopts, menu.toption(
      myear, myear, function()  {sys.$params(arguments.length, 0); mk(wg, [myear]);}
    ));
  }
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], lastYear, false));

  const YearOp =sys.$checkNull( dic.get(All, lastYear));
  if (sys.asBool(!sys.asBool(YearOp))) {
    ui.alert(i18n.fmt(II("Year %0 not found"), [lastYear]));
    arr.push(YearOp, All[all.lastYearId(All)]);
  }
  const Year =sys.$checkNull( YearOp[0]);

  const D =sys.$checkNull( year.treasury(Year));

  wg
    .removeAll()
    .add(menuWg)
    .add(Q("div")
      .klass("head")
      .text(II("Summary")))
    .add(Q("table")
      .klass("border")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("text-align: right; width: 80px")
          .text(II("Profits") + ":"))
        .add(Q("td")
          .klass("number")
          .text(math.toIso(D.summary, 2)))))
    .add(Q("div")
      .klass("head")
      .text(II("Annotations")))
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
          .text(II("Sold")))
        .add(Q("td")
          .klass("header")
          .text(II("Bought")))
        .add(Q("td")
          .klass("header")
          .text(II("Profits"))))
      .adds(arr.map(D.entries, function(E)  {sys.$params(arguments.length, 1);  return Q("tr")
          .add(Q("td")
            .text(E.nick))
          .add(Q("td")
            .klass("number2")
            .text(math.toIso(E.stocks, 0)))
          .add(Q("td")
            .klass("number")
            .text(math.toIso(E.total, 2)))
          .add(Q("td")
            .klass("number")
            .text(math.toIso(E.total - E.profits[0], 2)))
          .add(Q("td")
            .klass("number")
            .text(math.toIso(E.profits[0], 2)))
        ;}))
    )
  ;

};
