import * as math from '../../../_js/math.js';import * as js from '../../../_js/js.js';import * as arr from '../../../_js/arr.js';import * as client from '../../../_js/client.js';import * as bytes from '../../../_js/bytes.js';import * as str from '../../../_js/str.js';import * as ui from '../../../_js/ui.js';import * as dic from '../../../_js/dic.js';import * as timer from '../../../_js/timer.js';import * as time from '../../../_js/time.js';import * as storage from '../../../_js/storage.js';import * as b64 from '../../../_js/b64.js';import * as sys from '../../../_js/sys.js';import * as iter from '../../../_js/iter.js';import * as domo from '../../../_js/domo.js';import * as cryp from '../../../_js/cryp.js';




import * as modalBox from  "../../../libdm/modalBox.js";
import * as diary from  "../../../data/diary.js";
import * as budget from  "../../../data/budget.js";
import * as plan from  "../../../data/plan.js";
import * as month from  "../../../data/month.js";
import * as cts from  "../../../data/cts.js";
import * as budgetEntry from  "../../../data/budgetEntry.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



const mkBudgetEntry =sys.$checkNull( budgetEntry.mk);


const sumBudget =sys.$checkNull( budgetEntry.sumBudget);


const sumReal =sys.$checkNull( budgetEntry.sumReal);


const sumDif =sys.$checkNull( budgetEntry.sumDif);










export  function mk(wg, selectedYear, isUntil, selectedMonth, Plan, Diary, Budget)  {sys.$params(arguments.length, 7);

  const start =sys.$checkNull(sys.asBool( isUntil) ? 0 : selectedMonth -1);
  const DiaryEntries =sys.$checkNull( diary.filterReverse(Diary, start, selectedMonth));

  const BudgetModel =sys.$checkNull( []); 
  for (const Pe  of sys.$forObject( Plan.entries)) {
    arr.push(BudgetModel, mkBudgetEntry(
      Pe.isIncome, Pe.id,
      budget.accAmount(Budget, Pe.id, start, selectedMonth),
      diary.accAmount(Diary, Pe.id, start, selectedMonth)
    ));
  }

  const accWg =sys.$checkNull( Q("div"));
  const accBox =sys.$checkNull( modalBox.mk(accWg, false));

  

  
   async  function updateDiary()  {sys.$params(arguments.length, 0);
    await client.ssend({
      prg: cts.appName,
      source: "BudgetView",
      rq: "updateDiary",
      year: selectedYear,
      diary: diary.toJs(Diary)
    });
    window.location.reload();
  };

  
   function del(Ann)  {sys.$params(arguments.length, 1);
    if (sys.asBool(!sys.asBool(ui.confirm(i18n.fmt(II("Delete '%0'?"), [Ann[1].desc]))))) return;

    diary.del(Diary, Ann[0]);
    updateDiary();
  };

  

  
   function account(id)  {sys.$params(arguments.length, 1);
    const BudgetMs =sys.$checkNull( []); 
    const BudgetSs =sys.$checkNull( []); 
    const budgetSumV =sys.$checkNull( [0]);
    const RealMs =sys.$checkNull( []); 
    const RealSs =sys.$checkNull( []); 
    const realSumV =sys.$checkNull( [0]);
    for (let i = 0;i < 12; ++i) {
      const b =sys.$checkNull( budget.accAmount(Budget, id, i, i + 1));
      budgetSumV[0] +=sys.$checkExists(budgetSumV[0],sys.$checkNull( b));
      arr.push(BudgetMs, b);
      arr.push(BudgetSs, budgetSumV[0]);
      const r =sys.$checkNull( diary.accAmount(Diary, id, i, i + 1));
      realSumV[0] +=sys.$checkExists(realSumV[0],sys.$checkNull( r));
      arr.push(RealMs, r);
      arr.push(RealSs, realSumV[0]);
    }

    accWg
      .removeAll()
      .add(Q("div")
        .klass("head")
        .text(id))
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td")
            .att("colspan", "2")
            .style("text-align:center")
            .text(II("Budget (A)")))
          .add(Q("td"))
          .add(Q("td")
            .att("colspan", "2")
            .style("text-align:center")
            .text(II("Real (B)")))
          .add(Q("td"))
          .add(Q("td")
            .att("colspan", "2")
            .style("text-align:center")
            .text(II("Dif. (B - A))"))))
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td"))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Month")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Sum")))
          .add(Q("td"))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Month")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Sum")))
          .add(Q("td"))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Month")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Sum"))))
        .adds(iter.map(iter.$range(0,12), function(i)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#d9d9d9")
              .text(month.name(i + 1)))
            .add(Q("td"))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(BudgetMs[i], 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(BudgetSs[i], 2)))
          .add(Q("td"))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(RealMs[i], 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(RealSs[i], 2)))
          .add(Q("td"))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(BudgetMs[i] - RealMs[i], 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(BudgetSs[i] - RealSs[i], 2)));})))
      .add(Q("div")
        .klass("head")
        .add(Q("button")
          .text(II("Accept"))
          .on("click", function(ev)  {sys.$params(arguments.length, 1); modalBox.show(accBox, false);})))
    ;

    modalBox.show(accBox, true);
  };


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
            .att("colspan", "4")
            .style("text-align:center")
            .text(II("Incomes")))
          .add(Q("td")
            .text(""))
          .add(Q("td")
            .att("colspan", "4")
            .style("text-align:center")
            .text(II("Expenses"))))
        .add(Q("tr")
          .add(Q("td")
            .klass("frameTx")
            .style("background-color:#d9d9d9")
            .text(II("Account")))
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
            .text(II("Dif. (B - A))")))
          .add(Q("td")
            .klass("frameTx")
            .text(""))
          .add(Q("td")
            .klass("frameTx")
            .style("background-color:#d9d9d9")
            .text(II("Account")))
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
        .adds(iter.map(iter.$range(0,sz), function(i)  {sys.$params(arguments.length, 1);  return Q("tr")
            .adds(sys.asBool(i >= arr.size(Incomes))
              ? iter.map(iter.$range(0,4), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                  .klass("frameTx")
                  .style("background-color:#f9f9f9")
                ;})
              : [
                  Q("td")
                    .klass("frameTx")
                    .style("background-color:#d9d9d9")
                    .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); account(Incomes[i].accId);})
                      .klass("link")
                      .att("title", plan.desc(Plan, Incomes[i].accId))
                      .text(Incomes[i].accId)),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(Incomes[i].budget, 2)),
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
              ? iter.map(iter.$range(0,4), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                  .klass("frameTx")
                  .style("background-color:#f9f9f9")
                ;})
              : [
                  Q("td")
                    .klass("frameTx")
                    .style("background-color:#d9d9d9")
                    .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); account(Expenses[i].accId);})
                      .klass("link")
                      .att("title", plan.desc(Plan, Expenses[i].accId))
                      .text(Expenses[i].accId)),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(Expenses[i].budget, 2)),
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
            .text(math.toIso(sumBudget(Expenses), 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(sumReal(Expenses), 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(sumDif(Expenses), 2)))))

    

    .add(Q("div")
      .style("padding:5px;text-align:center")
      .html("<hr><br>" + II("Diary")))
      .add(Q("table")
        .att("align", "center")
        .klass("summary")
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td")
            .klass("frameTx")
            .style("background-color:#d9d9d9")
            .text(II("Month")))
          .add(Q("td")
            .klass("frameTx")
            .style("background-color:#d9d9d9")
            .text(II("Description")))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#d9d9d9")
            .text(II("Amount"))))
        .adds(arr.map(DiaryEntries, function(Tp)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); del(Tp);})
                .add(ui.img("delete"))))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#f9f9f9")
              .text(Tp[1].month))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#f9f9f9")
              .add(Q("table")
                .add(Q("tr")
                  .add(Q("td")
                    .att("colspan", "2")
                    .text(Tp[1].desc)))
                .adds(arr.map(Tp[1].anns, function(A)  {sys.$params(arguments.length, 1);  return Q("tr")
                    .add(Q("td")
                      .klass("frameTx")
                      .att("title", plan.desc(Plan, diary.annId(A)))
                      .text(diary.annId(A)))
                    .add(Q("td")
                      .klass("frameNm")
                      .text(math.toIso(diary.annAm(A), 2)))
                  ;}))
                ))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(Tp[1].am, 2)))
          ;})))

    

    .add(accBox.wg)
  ;

};
