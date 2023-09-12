import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../data/cts.js";
import * as plan from  "../data/plan.js";
import * as cash from  "../data/cash.js";
import * as diary from  "../data/diary.js";
import * as budget from  "../data/budget.js";
import * as problem from  "../data/problem.js";
import * as fixProblem from  "../pgs/budget/fixProblem.js";
import * as management from  "../pgs/budget/management.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  async  function mk(wg, selectedYear, isUntil, selectedMonth)  {sys.$params(arguments.length, 4);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "BudgetPg",
    rq: "idata",
    year: selectedYear
  }));

  const Plan =sys.$checkNull( plan.fromJs(Rp.plan));
  const hcBalance =sys.$checkNull( Rp.hcBalance); 
  const cBalanceV =sys.$checkNull( [Rp.cBalance]); 
  const HcDiary =sys.$checkNull( cash.fromJs(Rp.hcDiary));
  const CDiary =sys.$checkNull( diary.fromJs(Rp.cDiary));
  const Budget =sys.$checkNull( budget.fromJs(Rp.budget));
  const PreviousBudget =sys.$checkNull( budget.fromJs(Rp.previousBudget));

  const showOp =sys.$checkNull( [[]]);

  

  
   async  function fixBalance()  {sys.$params(arguments.length, 0);
    const hc =sys.$checkNull( math.toIso(hcBalance, 2));
    const c =sys.$checkNull( math.toIso(cBalanceV[0], 2));
    ui.alert(i18n.fmt(II("fixBalance hc(%0) c(%1)"), [hc, c]));

    cBalanceV[0] =sys.$checkExists(cBalanceV[0],sys.$checkNull( hcBalance));
    await client.send({
      prg: cts.appName,
      source: "BudgetPg",
      rq: "updateBalance",
      year: selectedYear,
      value: cBalanceV[0]
    });

    showOp[0]();
  };

  

  
  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
    const Problem =sys.$checkNull( problem.firstProblem(HcDiary, CDiary));
    if (sys.asBool(!sys.asBool(math.eq(hcBalance, cBalanceV[0], 0.0001)))) {
      fixBalance();
    } else if (sys.asBool(sys.$neq(Problem.ix ,  -1))) {
      fixProblem.mk(wg, selectedYear, Plan, CDiary, Problem, function()  {sys.$params(arguments.length, 0); showOp[0]();});
    } else {
      management.mk(
        wg, selectedYear, isUntil, selectedMonth,
        Plan, cBalanceV[0], CDiary, Budget, PreviousBudget
      );
    }
  });

  showOp[0]();
};
