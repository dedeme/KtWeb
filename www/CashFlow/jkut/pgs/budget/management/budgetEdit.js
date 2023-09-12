import * as math from '../../../_js/math.js';import * as js from '../../../_js/js.js';import * as arr from '../../../_js/arr.js';import * as client from '../../../_js/client.js';import * as bytes from '../../../_js/bytes.js';import * as str from '../../../_js/str.js';import * as ui from '../../../_js/ui.js';import * as dic from '../../../_js/dic.js';import * as timer from '../../../_js/timer.js';import * as time from '../../../_js/time.js';import * as storage from '../../../_js/storage.js';import * as b64 from '../../../_js/b64.js';import * as sys from '../../../_js/sys.js';import * as iter from '../../../_js/iter.js';import * as domo from '../../../_js/domo.js';import * as cryp from '../../../_js/cryp.js';




import * as diary from  "../../../data/diary.js";
import * as budget from  "../../../data/budget.js";
import * as plan from  "../../../data/plan.js";
import * as month from  "../../../data/month.js";
import * as cts from  "../../../data/cts.js";
import * as budgetEntry from  "../../../data/budgetEntry.js";
import * as numberField from  "../../../wgs/numberField.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



const mkBudgetEntry =sys.$checkNull( budgetEntry.mk);


const sumBudget =sys.$checkNull( budgetEntry.sumBudget);


const sumReal =sys.$checkNull( budgetEntry.sumReal);


const sumDif =sys.$checkNull( budgetEntry.sumDif);











export  function mk(wg, selectedYear, selectedMonth,
      Plan, Diary, Budget, PreviousBudget, updateFinalBalanceFn)  {sys.$params(arguments.length, 8);

  const showOp =sys.$checkNull( [[]]);

  

  
   async  function updateBudget()  {sys.$params(arguments.length, 0);
    await client.ssend({
      prg: cts.appName,
      source: "BudgetEdit",
      rq: "updateBudget",
      year: selectedYear,
      budget: budget.toJs(Budget)
    });

    updateFinalBalanceFn();
    showOp[0]();
  };

  
   function setReal(id)  {sys.$params(arguments.length, 1);
    budget.setAmount(
      Budget,
      selectedMonth - 1,
      id,
      diary.accAmount(Diary, id, selectedMonth - 1, selectedMonth)
    );
    updateBudget();
  };

  
   function setMonth(id)  {sys.$params(arguments.length, 1);
    const m =sys.$checkNull(sys.asBool( selectedMonth <= 0) ? 12 : selectedMonth - 1);
    const B =sys.$checkNull(sys.asBool( selectedMonth <= 0) ? PreviousBudget : Budget);
    const am =sys.$checkNull( budget.accAmount(B, id, m - 1, m));
    if (sys.asBool(sys.$eq(am , 0))) {
      ui.alert(II("There is not value for previous month"));
      showOp[0]();
      Q("#" + id).e.focus();
      return;
    }
    budget.setAmount(Budget, selectedMonth - 1, id, am);
    updateBudget();
  };

  
   function setYear(id)  {sys.$params(arguments.length, 1);
    const am =sys.$checkNull( budget.accAmount(PreviousBudget, id, selectedMonth - 1, selectedMonth));
    if (sys.asBool(sys.$eq(am , 0))) {
      ui.alert(II("There is not value for previous year"));
      showOp[0]();
      Q("#" + id).e.focus();
      return;
    }
    budget.setAmount(Budget, selectedMonth - 1, id, am);
    updateBudget();
  };

  
   function changeAmount(id, am)  {sys.$params(arguments.length, 2);
    if (sys.asBool(am < 0)) {
      ui.alert(II("Values less than 0 are not allowed"));
      showOp[0]();
      Q("#" + id).e.focus();
      return;
    }
    budget.setAmount(Budget, selectedMonth - 1, id, am);
    updateBudget();
  };

  

  
  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
    const BudgetModel =sys.$checkNull( []); 
    for (const Pe  of sys.$forObject( Plan.entries)) {
      arr.push(BudgetModel, mkBudgetEntry(
        Pe.isIncome, Pe.id,
        budget.accAmount(Budget, Pe.id, selectedMonth -1, selectedMonth),
        diary.accAmount(Diary, Pe.id, selectedMonth -1, selectedMonth)
      ));
    }

    const Incomes =sys.$checkNull( arr.filter(BudgetModel, function(E)  {sys.$params(arguments.length, 1);  return E.isIncome;}));
    arr.sort(Incomes, function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.accId < E2.accId;});
    const Expenses =sys.$checkNull( arr.filter(BudgetModel, function(E)  {sys.$params(arguments.length, 1);  return !sys.asBool(E.isIncome);}));
    arr.sort(Expenses, function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.accId < E2.accId;});
    const sz =sys.$checkNull(sys.asBool( arr.size(Incomes) > arr.size(Expenses))
      ? arr.size(Incomes)
      : arr.size(Expenses))
    ;

    wg
      .removeAll()
      .add(Q("div")
        .style("padding:5px;text-align:center")
        .html("<hr><br>" + II("Budget")))
        .add(Q("table")
          .att("align", "center")
          .klass("summary")
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", "5")
              .style("text-align:center")
              .text(II("Incomes")))
            .add(Q("td")
              .text(""))
            .add(Q("td")
              .att("colspan", "5")
              .style("text-align:center")
              .text(II("Expenses"))))
          .add(Q("tr")
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9")
              .text(II("Account")))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9")
              .text(""))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9;white-space: nowrap;")
              .text(II("Budget (A)")))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9;white-space: nowrap;")
              .text(II("Real (B)")))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9;white-space: nowrap;")
              .text(II("Dif. (B - A))")))
            .add(Q("td")
              .klass("frameTx")
              .text(""))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9")
              .text(II("Account")))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9")
              .text(""))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9;white-space: nowrap;")
              .text(II("Budget (A)")))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9;white-space: nowrap;")
              .text(II("Real (B)")))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9;white-space: nowrap;")
              .text(II("Dif. (B - A))"))))
          .adds(iter.map(iter.$range(0,sz), function(i)  {sys.$params(arguments.length, 1);  return Q("tr")
              .adds(sys.asBool(i >= arr.size(Incomes))
                ? iter.map(iter.$range(0,5), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("frameTx")
                    .style("background-color:#f9f9f9")
                  ;})
                : [
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#d9d9d9")
                      .att("title", plan.desc(Plan, Incomes[i].accId))
                      .text(Incomes[i].accId),
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#f9f9f9;white-space: nowrap;")
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setReal(Incomes[i].accId);})
                        .klass("link")
                        .text(II("real")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setMonth(Incomes[i].accId);})
                        .klass("link")
                        .text(II("month")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setYear(Incomes[i].accId);})
                        .klass("link")
                        .text(II("year")))
                        ,
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .add(numberField.mk(
                          Incomes[i].accId, Expenses[0].accId,
                          Incomes[i].budget, changeAmount
                        )),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(Incomes[i].real, 2)),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(Incomes[i].dif, 2))
                  ])
              .add(Q("td")
                .klass("frameTx"))
              .adds(sys.asBool(i >= arr.size(Expenses))
                ? iter.map(iter.$range(0,5), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("frameTx")
                    .style("background-color:#f9f9f9")
                  ;})
                : [
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#d9d9d9")
                      .att("title", plan.desc(Plan, Expenses[i].accId))
                      .text(Expenses[i].accId),
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#f9f9f9;white-space: nowrap;")
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setReal(Expenses[i].accId);})
                        .klass("link")
                        .text(II("real")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setMonth(Expenses[i].accId);})
                        .klass("link")
                        .text(II("month")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setYear(Expenses[i].accId);})
                        .klass("link")
                        .text(II("year")))
                        ,
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .add(numberField.mk(
                          Expenses[i].accId, Incomes[0].accId,
                          Expenses[i].budget, changeAmount
                        )),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(Expenses[i].real, 2)),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(Expenses[i].dif, 2))
                  ])
            ;}))
          .add(Q("tr")
            .add(Q("td")
              .att("colsapan", "9")))
          .add(Q("tr")
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9")
              .text(II("Total")))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(""))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(sumBudget(Incomes), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(sumReal(Incomes), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(sumDif(Incomes), 2)))
            .add(Q("td")
              .klass("frameTx"))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9")
              .text(II("Total")))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(""))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(sumBudget(Expenses), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(sumReal(Expenses), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(sumDif(Expenses), 2)))))
   ;
  });

  showOp[0]();
};
