import * as arr from '../../../_js/arr.js';import * as bytes from '../../../_js/bytes.js';import * as storage from '../../../_js/storage.js';import * as sys from '../../../_js/sys.js';import * as client from '../../../_js/client.js';import * as b64 from '../../../_js/b64.js';import * as ui from '../../../_js/ui.js';import * as js from '../../../_js/js.js';import * as iter from '../../../_js/iter.js';import * as math from '../../../_js/math.js';import * as str from '../../../_js/str.js';import * as timer from '../../../_js/timer.js';import * as domo from '../../../_js/domo.js';import * as dic from '../../../_js/dic.js';import * as cryp from '../../../_js/cryp.js';import * as time from '../../../_js/time.js';




import * as modalBox from  "../../../libdm/modalBox.js";
import * as diary from  "../../../data/diary.js";
import * as dann from  "../../../data/dann.js";
import * as budget from  "../../../data/budget.js";
import * as plan from  "../../../data/plan.js";
import * as planEntry from  "../../../data/planEntry.js";
import * as month from  "../../../data/month.js";
import * as global from  "../../../global.js";
import * as cts from  "../../../cts.js";
import * as budgetWgEntry from  "../../../data/budgetWgEntry.js";
import * as diaryEntry from  "../../../data/diaryEntry.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);










export  function mk(wg, selectedYear, isUntil, selectedMonth,
   Plan,  Diary,  Budget)  {sys.$params(arguments.length, 7);

  const start =sys.$checkNull( isUntil ? 0 : selectedMonth -1);
   const DiaryEntries =sys.$checkNull( diary.filterReverse(Diary, start, selectedMonth));

  const BudgetModel = []; 
  for (const  pe  of sys.$forObject( Plan)) {
    arr.push(BudgetModel,budgetWgEntry.mk(
      pe[planEntry.isIncome], pe[planEntry.id],
      budget.accAmount(Budget, pe[planEntry.id], start, selectedMonth),
      diary.accAmount(Diary, pe[planEntry.id], start, selectedMonth)
    ));
  }

  const accWg =sys.$checkNull( Q("div"));
   const accBox =sys.$checkNull( modalBox.mk(accWg, false));

  

  
   async  function updateDiary()  {sys.$params(arguments.length, 0);
    await client.send({
      prg: cts.appName,
      source: "BudgetView",
      rq: "updateDiary",
      dbKey: global.dbKeyV[0],
      year: selectedYear,
      diary: arr.map(Diary,diaryEntry.toJs)
    });
    window.location.reload();
  };

  
   function del(ix,  e)  {sys.$params(arguments.length, 2);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Delete '%0'?"), [e[diaryEntry.desc]])))) return;

    diary.del(Diary, ix);
    updateDiary();
  };

  

  
   function account(id)  {sys.$params(arguments.length, 1);
    const BudgetMs = []; 
    const BudgetSs = []; 
    const budgetSumV = [0];
    const RealMs = []; 
    const RealSs = []; 
    const realSumV = [0];
    for (let i = 0;i < 12; ++i) {
      const b =sys.$checkNull( budget.accAmount(Budget, id, i, i + 1));
      budgetSumV[0] +=sys.$checkExists(budgetSumV[0], b);
      arr.push(BudgetMs,b);
      arr.push(BudgetSs,budgetSumV[0]);
      const r =sys.$checkNull( diary.accAmount(Diary, id, i, i + 1));
      realSumV[0] +=sys.$checkExists(realSumV[0], r);
      arr.push(RealMs,r);
      arr.push(RealSs,realSumV[0]);
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
            .text(math.toIso(RealMs[i] - BudgetMs[i], 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(RealSs[i] - BudgetSs[i], 2)));})))
      .add(Q("div")
        .klass("head")
        .add(Q("button")
          .text(II("Accept"))
          .on("click", function(ev)  {sys.$params(arguments.length, 1); modalBox.show(accBox,false);})))
    ;

    modalBox.show(accBox,true);
  };


   const Incomes0 =sys.$checkNull( arr.filter(BudgetModel,function( e)  {sys.$params(arguments.length, 1);  return e[budgetWgEntry.isIncome];}));
  arr.sort(Incomes0,function( e1 ,  e2)  {sys.$params(arguments.length, 2);
     return e1[budgetWgEntry.accId] < e2[budgetWgEntry.accId];});
   const Expenses0 =sys.$checkNull( arr.filter(BudgetModel,function( e)  {sys.$params(arguments.length, 1);  return !sys.asBool(e[budgetWgEntry.isIncome]);}));
  arr.sort(Expenses0,function( e1 ,  e2)  {sys.$params(arguments.length, 2);
     return e1[budgetWgEntry.accId] < e2[budgetWgEntry.accId];});
  const isize =sys.$checkNull( arr.size(Incomes0));
  const esize =sys.$checkNull( arr.size(Expenses0));
  const sz =sys.$checkNull( isize > esize ? isize : esize);

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
        .adds(iter.map(iter.$range(0,sz), function(i)  {sys.$params(arguments.length, 1);
           const ie =sys.$checkNull( i >= isize ? [] : Incomes[i]);
           const ee =sys.$checkNull( i >= esize ? [] : Expenses[i]);
           return Q("tr")
            .adds(i >= isize
              ? iter.map(iter.$range(0,4), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                  .klass("frameTx")
                  .style("background-color:#f9f9f9")
                ;})
              : [
                  Q("td")
                    .klass("frameTx")
                    .style("background-color:#d9d9d9")
                    .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); account(ie[budgetWgEntry.accId]);})
                      .klass("link")
                      .att("title", plan.desc(Plan, ie[budgetWgEntry.accId]))
                      .text(ie[budgetWgEntry.accId])),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(ie[budgetWgEntry.budget], 2)),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(ie[budgetWgEntry.real], 2)),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(ie[budgetWgEntry.dif], 2))
                ])
            .add(Q("td")
              .klass("frameTx"))
            .adds(i >= esize
              ? iter.map(iter.$range(0,4), function(j)  {sys.$params(arguments.length, 1);  return Q("td")
                  .klass("frameTx")
                  .style("background-color:#f9f9f9")
                ;})
              : [
                  Q("td")
                    .klass("frameTx")
                    .style("background-color:#d9d9d9")
                    .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); account(ee[budgetWgEntry.accId]);})
                      .klass("link")
                      .att("title", plan.desc(Plan, ee[budgetWgEntry.accId]))
                      .text(ee[budgetWgEntry.accId])),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(ee[budgetWgEntry.budget], 2)),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(ee[budgetWgEntry.real], 2)),
                  Q("td")
                    .klass("frameNm")
                    .style("background-color:#f9f9f9")
                    .text(math.toIso(ee[budgetWgEntry.dif], 2))
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
            .text(math.toIso(budgetWgEntry.sumBudget(Expenses), 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(budgetWgEntry.sumReal(Expenses), 2)))
          .add(Q("td")
            .klass("frameNm")
            .style("background-color:#f9f9f9")
            .text(math.toIso(budgetWgEntry.sumDif(Expenses), 2)))))

    

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
        .adds(arr.map(DiaryEntries,function(Tp)  {sys.$params(arguments.length, 1);
          const [ix,  e] = Tp;
           return Q("tr")
            .add(Q("td")
              .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); del(ix, e);})
                .add(ui.img("delete"))))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#f9f9f9")
              .text(e[diaryEntry.month]))
            .add(Q("td")
              .klass("frameTx")
              .style("background-color:#f9f9f9")
              .add(Q("table")
                .add(Q("tr")
                  .add(Q("td")
                    .att("colspan", "2")
                    .text(e[diaryEntry.desc])))
                .adds(arr.map(e[diaryEntry.Anns], function( a)  {sys.$params(arguments.length, 1);  return Q("tr")
                    .add(Q("td")
                      .klass("frameTx")
                      .att("title", plan.desc(Plan, a[dann.id]))
                      .text(a[dann.id]))
                    .add(Q("td")
                      .klass("frameNm")
                      .text(math.toIso(a[dann.am], 2)))
                  ;}))
                ))
            .add(Q("td")
              .klass("frameNm")
              .style("background-color:#f9f9f9")
              .text(math.toIso(e[diaryEntry.am], 2)))
          ;})))

    

    .add(modalBox.mkWg(accBox))
  ;

};
