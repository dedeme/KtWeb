import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as month from  "../../data/month.js";
import * as budget from  "../../data/budget.js";
import * as cts from  "../../cts.js";
import * as diary from  "../../data/diary.js";
import * as budgetEdit from  "../../pgs/budget/management/budgetEdit.js";
import * as budgetView from  "../../pgs/budget/management/budgetView.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);













export  function mk(wg, selectedYear, isUntil, selectedMonth,
      Plan, balance, Diary, Budget, PreviousBudget)  {sys.$params(arguments.length, 9);

  const monthName =sys.$checkNull( month.name(selectedMonth));
  const isEditionV =sys.$checkNull( [false]);

  const finalBalanceWg =sys.$checkNull( Q("div"));
  const budgetWg =sys.$checkNull( Q("div"));

  const showOp =sys.$checkNull( [[]]);

  

  
   function changeAccumulation()  {sys.$params(arguments.length, 0);  window.location.assign(
      "?budget&" + selectedYear + "&" + !sys.asBool(isUntil) + "&" + selectedMonth
    );};

  
   function changeMonth(m)  {sys.$params(arguments.length, 1); window.location.assign(
      "?budget&" + selectedYear + "&" + isUntil + "&" + m
    );};

  
   function changeEdition()  {sys.$params(arguments.length, 0);
    isEditionV[0] =sys.$checkExists(isEditionV[0],sys.$checkNull( !sys.asBool(isEditionV[0])));
    showOp[0]();
  };

  

  
   function initialBalance()  {sys.$params(arguments.length, 0);  return Q("table")
      .klass("summary")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("frameNm")
          .style("background-color:#f9f9f9")
          .text(math.toIso(isUntil ? balance : 0, 2))))
    ;};

  
   function finalBalance()  {sys.$params(arguments.length, 0);
    const real =sys.$checkNull( diary.totalAmount(
      Diary, isUntil ? 0 : selectedMonth - 1, selectedMonth
    ));
    const budgeted =sys.$checkNull( budget.totalAmount(
      Budget, Plan, isUntil ? 0 : selectedMonth - 1, selectedMonth
    ));

    finalBalanceWg
      .removeAll()
      .add(Q("table")
        .klass("summary")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Budget (A)")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Real (B)")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Dif. (B - A))"))))
        .add(Q("tr")
          .add(Q("td")
            .klass("frameTx")
            .style("background-color:#d9d9d9")
            .text(II("Operations")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(budgeted, 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(real, 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text("")))
        .add(Q("tr")
          .add(Q("td")
            .klass("frameTx")
            .style("background-color:#d9d9d9")
            .text(II("Total (In - Ex)")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso((isUntil ? balance : 0) + budgeted, 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso((isUntil ? balance : 0) + real, 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(real - budgeted, 2)))))
    ;

  };

  
  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
    const Lopts =sys.$checkNull( [
      isUntil
        ? menu.toption("", II("Monthly"), changeAccumulation)
        : menu.toption("", II("Accumulated"), changeAccumulation),
      menu.separator2()
    ]);
    const iV =sys.$checkNull( [0]);
    for (const m  of sys.$forObject( str.split(II("months"), ","))) {
      const i =sys.$checkNull( iV[0]);
      iV[0] +=sys.$checkExists(iV[0],sys.$checkNull( 1));
      if (i > 0) arr.push(Lopts, menu.separator());
      arr.push(Lopts, menu.toption(
        month.name(i + 1), month.name(i + 1), function()  {sys.$params(arguments.length, 0); changeMonth(i + 1);}
      ));
    }
    const Ropts =sys.$checkNull( [
      isEditionV[0]
        ? menu.toption("", II("View"), changeEdition)
        : menu.toption("", II("Edit"), changeEdition)
    ]);
    const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, monthName));

    finalBalance();

    if (isEditionV[0]) {
      budgetEdit.mk(
        budgetWg, selectedYear, selectedMonth, Plan, Diary,
        Budget, PreviousBudget,
        finalBalance
      );
    } else {
      budgetView.mk(
        budgetWg, selectedYear, isUntil, selectedMonth, Plan, Diary, Budget
      );
    }

    wg
      .removeAll()
      .add(menuWg)
      .add(Q("div")
        .klass("head")
        .html(
            (isUntil
              ? II("Accumulated Budget")
              : II("Monthly Budget")) +
            "<br> [ " +
            (isEditionV[0]
              ? II("Edit")
              : II("View")) +
            " ]")
          )
      .add(Q("div")
        .style("padding:5px;text-align:center")
        .text(II("Initial Balance")))
      .add(initialBalance())
      .add(Q("div")
        .style("padding:5px;text-align:center")
        .text(II("Final Balance")))
      .add(finalBalanceWg)
      .add(budgetWg)
    ;
  });

  showOp[0]();
};
