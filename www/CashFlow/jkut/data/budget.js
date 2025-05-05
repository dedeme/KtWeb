import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as plan from  "../data/plan.js";
import * as budgetEntry from  "../data/budgetEntry.js";
import * as budgetMonth from  "../data/budgetMonth.js";



export  function mkEmpty(Plan)  {sys.$params(arguments.length, 1);  return arr.fromIter(iter.map(
    iter.$range(0,12), function(i)  {sys.$params(arguments.length, 1);  return budgetMonth.mkEmpty(Plan);}
  ));};








export  function setAmount(Budget, monthIx, accId, am)  {sys.$params(arguments.length, 4);
   const Entries =sys.$checkNull( Budget[monthIx]);
  for ( const [i, e]  of sys.$forObject2( Entries)) {
    if (sys.$eq(e[budgetEntry.accId] , accId)) {
      Entries[i] =sys.$checkExists(Entries[i],sys.$checkNull( budgetEntry.mk(accId, am)));
      break;
    }
  }
};



export  function cleanAndComplete(Budget, Plan)  {sys.$params(arguments.length, 2);
  for (const e  of sys.$forObject( Budget)) budgetMonth.cleanAndComplete(e, Plan);};




export  function accAmount(Budget, accId, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 4);
  const sumV = [0];
  for (let i = fromMonthIx;i < toMonthIx; ++i)
    for (const  e  of sys.$forObject( Budget[i])) if (sys.$eq(e[budgetEntry.accId] , accId)) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( e[budgetEntry.am]));

   return sumV[0];
};




export  function totalAmount(Budget, Plan, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 4);
  const sumV = [0];
  for (let i = fromMonthIx;i < toMonthIx; ++i)
    for (const  e  of sys.$forObject( Budget[i]))
      if (plan.isIncome(Plan, e[budgetEntry.accId])) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( e[budgetEntry.am]));
      else sumV[0] -=sys.$checkExists(sumV[0],sys.$checkNull( e[budgetEntry.am]));

   return sumV[0];
};
