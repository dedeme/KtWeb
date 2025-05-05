import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as plan from  "../data/plan.js";
import * as problem from  "../data/problem.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as managementPg from  "../pgs/budget/managementPg.js";
import * as fixProblemPg from  "../pgs/budget/fixProblemPg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  async  function mk(wg, selectedYear, isUntil, selectedMonth)  {sys.$params(arguments.length, 4);
   const {Plan, 
   HcDiary, 
   CFDiary, 
   Budget, 
   PreviousBudget, 
  hcBalance, 
  cBalance, 
  dbKey}
  = await  client.send({
    prg: cts.appName,
    source: "BudgetPg",
    rq: "idata",
    year: selectedYear
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
  const CDiary =sys.$checkNull( arr.map(CFDiary,diaryEntry.fromJs));
  const cBalanceV = [cBalance];

  const showOp = [[]];

  

  
   async  function fixBalance()  {sys.$params(arguments.length, 0);
    const hc =sys.$checkNull( math.toIso(hcBalance, 2));
    const c =sys.$checkNull( math.toIso(cBalanceV[0], 2));
    ui.alert(i18n.fmt(II("fixBalance hc(%0) c(%1)"), [hc, c]));

    cBalanceV[0] =sys.$checkExists(cBalanceV[0], hcBalance);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "BudgetPg",
      rq: "updateBalance",
      dbKey: global.dbKeyV[0],
      year: selectedYear,
      value: cBalanceV[0]
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);

    showOp[0]();
  };

  

  
  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
     const prob =sys.$checkNull( problem.firstProblem(HcDiary, CDiary));
    if (!sys.asBool(math.eq(hcBalance, cBalanceV[0], 0.0001))) {
      fixBalance();
    } else if (sys.$neq(prob[problem.ix] ,  -1)) {
      fixProblemPg.mk(wg, selectedYear, Plan, CDiary, prob, function()  {sys.$params(arguments.length, 0); showOp[0]();});
    } else {
      managementPg.mk(
        wg, selectedYear, isUntil, selectedMonth,
        Plan, cBalanceV[0], CDiary, Budget, PreviousBudget
      );
    }
  });

  showOp[0]();
};
