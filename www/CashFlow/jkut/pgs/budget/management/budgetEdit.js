import * as arr from '../../../_js/arr.js';import * as bytes from '../../../_js/bytes.js';import * as storage from '../../../_js/storage.js';import * as sys from '../../../_js/sys.js';import * as client from '../../../_js/client.js';import * as b64 from '../../../_js/b64.js';import * as ui from '../../../_js/ui.js';import * as js from '../../../_js/js.js';import * as iter from '../../../_js/iter.js';import * as math from '../../../_js/math.js';import * as str from '../../../_js/str.js';import * as timer from '../../../_js/timer.js';import * as domo from '../../../_js/domo.js';import * as dic from '../../../_js/dic.js';import * as cryp from '../../../_js/cryp.js';import * as time from '../../../_js/time.js';




import * as diary from  "../../../data/diary.js";
import * as budget from  "../../../data/budget.js";
import * as budgetEntry from  "../../../data/budgetEntry.js";
import * as plan from  "../../../data/plan.js";
import * as planEntry from  "../../../data/planEntry.js";
import * as month from  "../../../data/month.js";
import * as cts from  "../../../cts.js";
import * as global from  "../../../global.js";
import * as budgetWgEntry from  "../../../data/budgetWgEntry.js";
import * as numberField from  "../../../wgs/numberField.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);












export  function mk(wg, selectedYear, selectedMonth,
       Plan,  Diary,  Budget,  PreviousBudget,
      updateFinalBalanceFn)  {sys.$params(arguments.length, 8);

  const showOp = [[]];

  

  
   async  function updateBudget()  {sys.$params(arguments.length, 0);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "BudgetEdit",
      rq: "updateBudget",
      dbKey: global.dbKeyV[0],
      year: selectedYear,
      budget: Budget
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
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
    const m =sys.$checkNull( selectedMonth <= 0 ? 12 : selectedMonth - 1);
    const B =sys.$checkNull( selectedMonth <= 0 ? PreviousBudget : Budget);
    const am =sys.$checkNull( budget.accAmount(B, id, m - 1, m));
    if (sys.$eq(am , 0)) {
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
    if (sys.$eq(am , 0)) {
      ui.alert(II("There is not value for previous year"));
      showOp[0]();
      Q("#" + id).e.focus();
      return;
    }
    budget.setAmount(Budget, selectedMonth - 1, id, am);
    updateBudget();
  };

  
   function changeAmount(id, am)  {sys.$params(arguments.length, 2);
    if (am < 0) {
      ui.alert(II("Values less than 0 are not allowed"));
      showOp[0]();
      Q("#" + id).e.focus();
      return;
    }
    budget.setAmount(Budget, selectedMonth - 1, id, am);
    updateBudget();
  };

  

  
  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
     const BudgetModel = []; 
    for (const  pe  of sys.$forObject( Plan)) {
      arr.push(BudgetModel,budgetWgEntry.mk(
        pe[planEntry.isIncome], pe[planEntry.id],
        budget.accAmount(Budget, pe[planEntry.id], selectedMonth -1, selectedMonth),
        diary.accAmount(Diary, pe[planEntry.id], selectedMonth -1, selectedMonth)
      ));
    }

     const Incomes0 =sys.$checkNull( arr.filter(BudgetModel,function( e)  {sys.$params(arguments.length, 1);  return e[budgetWgEntry.isIncome];}));
    arr.sort(Incomes0,function( e1,  e2)  {sys.$params(arguments.length, 2);
       return e1[budgetWgEntry.accId] < e2[budgetWgEntry.accId];});
     const Expenses0 =sys.$checkNull( arr.filter(BudgetModel,function( e)  {sys.$params(arguments.length, 1);  return !sys.asBool(e[budgetWgEntry.isIncome]);}));
    arr.sort(Expenses0,function( e1,  e2)  {sys.$params(arguments.length, 2);
       return e1[budgetWgEntry.accId] < e2[budgetWgEntry.accId];});
    const sz =sys.$checkNull( arr.size(Incomes0) > arr.size(Expenses0)
      ? arr.size(Incomes0)
      : arr.size(Expenses0))
    ;

     const Incomes = Incomes0;
     const Expenses = Expenses0;
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
              .adds(i >= arr.size(Incomes0)
                ? iter.map(iter.$range(0,5), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("frameTx")
                    .style("background-color:#f9f9f9")
                  ;})
                : function()  {sys.$params(arguments.length, 0);
                   const ie =sys.$checkNull( Incomes[i]);
                   return [
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#d9d9d9")
                      .att("title", plan.desc(Plan, ie[budgetWgEntry.accId]))
                      .text(ie[budgetWgEntry.accId]),
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#f9f9f9;white-space: nowrap;")
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setReal(ie[budgetWgEntry.accId]);})
                        .klass("link")
                        .text(II("real")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setMonth(ie[budgetWgEntry.accId]);})
                        .klass("link")
                        .text(II("month")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setYear(ie[budgetWgEntry.accId]);})
                        .klass("link")
                        .text(II("year")))
                        ,
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .add(numberField.mk(
                          ie[budgetWgEntry.accId],
                          Incomes[sys.$eq(i , arr.size(Incomes0) - 1) ? 0 :  i + 1]
                            [budgetWgEntry.accId],
                          ie[budgetWgEntry.budget], changeAmount
                        )),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(ie[budgetWgEntry.real], 2)),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(ie[budgetWgEntry.dif], 2))
                  ];
                }())
              .add(Q("td")
                .klass("frameTx"))
              .adds(i >= arr.size(Expenses0)
                ? iter.map(iter.$range(0,5), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("frameTx")
                    .style("background-color:#f9f9f9")
                  ;})
                : function()  {sys.$params(arguments.length, 0);
                   const ee =sys.$checkNull( Expenses[i]);
                   return [
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#d9d9d9")
                      .att("title", plan.desc(Plan, ee[budgetWgEntry.accId]))
                      .text(ee[budgetWgEntry.accId]),
                    Q("td")
                      .klass("frameTx")
                      .style("background-color:#f9f9f9;white-space: nowrap;")
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setReal(ee[budgetWgEntry.accId]);})
                        .klass("link")
                        .text(II("real")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setMonth(ee[budgetWgEntry.accId]);})
                        .klass("link")
                        .text(II("month")))
                      .add(Q("span").html("&nbsp;&nbsp;"))
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setYear(ee[budgetWgEntry.accId]);})
                        .klass("link")
                        .text(II("year")))
                        ,
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .add(numberField.mk(
                          ee[budgetWgEntry.accId],
                          Expenses[sys.$eq(i , arr.size(Expenses0) - 1) ? 0 :  i + 1]
                            [budgetWgEntry.accId],
                          ee[budgetWgEntry.budget], changeAmount
                        )),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(ee[budgetWgEntry.real], 2)),
                    Q("td")
                      .klass("frameNm")
                      .style("background-color:#f9f9f9")
                      .text(math.toIso(ee[budgetWgEntry.dif], 2))
                  ];
                }())
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
              .text(math.toIso(budgetWgEntry.sumBudget(Incomes), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(budgetWgEntry.sumReal(Incomes), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(budgetWgEntry.sumDif(Incomes), 2)))
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
              .text(math.toIso(budgetWgEntry.sumBudget(Expenses), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(budgetWgEntry.sumReal(Expenses), 2)))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(budgetWgEntry.sumDif(Expenses), 2)))))
   ;
  });

  showOp[0]();
};
