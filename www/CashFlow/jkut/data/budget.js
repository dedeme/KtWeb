import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as plan from  "../data/plan.js";



export  function mk(entries)  {sys.$params(arguments.length, 1);  return {entries:entries};};



export  function mkEmpty(Plan)  {sys.$params(arguments.length, 1); arr.fromIter(iter.map(
    iter.$range(0,12), function(i)  {sys.$params(arguments.length, 1);  return mkEmptyMonth(Plan);}
  ));};








export  function setAmount(Budget, monthIx, accId, am)  {sys.$params(arguments.length, 4);
  const Anns =sys.$checkNull( Budget.entries[monthIx].anns);
  for (let i = 0;i < arr.size(Anns); ++i) {
    if (sys.asBool(sys.$eq(Anns[i].accId , accId))) {
      Anns[i] =sys.$checkExists(Anns[i],sys.$checkNull( mkAnn(accId, am)));
      break;
    }
  }
};



export  function cleanAndComplete(Budget, Plan)  {sys.$params(arguments.length, 2);
  const Months =sys.$checkNull( Budget.entries);
  for (let i = 0;i < 12; ++i) Months[i] =sys.$checkExists(Months[i],sys.$checkNull( cleanAndCompleteMonth(Months[i], Plan)));
};




export  function accAmount(Budget, accId, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 4);
  const sumV =sys.$checkNull( [0]);
  for (let i = fromMonthIx;i < toMonthIx; ++i) {
    const Month =sys.$checkNull( Budget.entries[i]);
    for (const A  of sys.$forObject( Month.anns)) if (sys.asBool(sys.$eq(A.accId , accId))) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( A.am));
  }
   return sumV[0];
};




export  function totalAmount(Budget, Plan, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 4);
  const sumV =sys.$checkNull( [0]);
  for (let i = fromMonthIx;i < toMonthIx; ++i) {
    const Month =sys.$checkNull( Budget.entries[i]);
    for (const A  of sys.$forObject( Month.anns))
      if (sys.asBool(plan.isIncome(Plan, A.accId))) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( A.am));
      else sumV[0] -=sys.$checkExists(sumV[0],sys.$checkNull( A.am));
  }
   return sumV[0];
};


export  function toJs(B)  {sys.$params(arguments.length, 1);  return arr.map(B.entries, monthToJs);};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(arr.map(A, monthFromJs));};





export  function mkMonth(anns)  {sys.$params(arguments.length, 1);  return {anns:anns};};



export  function mkEmptyMonth(Plan)  {sys.$params(arguments.length, 1);  return mkMonth(arr.map(Plan.entries, function(E)  {sys.$params(arguments.length, 1);
     return mkAnn(E.id, 0);}
  ));};



export  function cleanAndCompleteMonth(Month, Plan)  {sys.$params(arguments.length, 2);
  const Anns =sys.$checkNull( Month.anns);
  const NewAnns =sys.$checkNull( arr.map(Plan.entries, function(E)  {sys.$params(arguments.length, 1);
    for (const Ann  of sys.$forObject( Anns))
      if (sys.asBool(sys.$eq(Ann.accId , E.id)))  return mkAnn(Ann.accId, Ann.am);
     return mkAnn(E.id, 0);
  }));
  arr.clear(Anns);
  for (const Ann  of sys.$forObject( NewAnns)) arr.push(Anns, Ann);
};


export  function monthToJs(M)  {sys.$params(arguments.length, 1);  return arr.map(M.anns, annToJs);};


export  function monthFromJs(A)  {sys.$params(arguments.length, 1);  return mkMonth(arr.map(A, annFromJs));};





export  function mkAnn(accId, am)  {sys.$params(arguments.length, 2);  return {accId:accId, am:am};};


export  function annToJs(Ann)  {sys.$params(arguments.length, 1);  return [Ann.accId, Ann.am];};


export  function annFromJs(A)  {sys.$params(arguments.length, 1);  return mkAnn(A[0], A[1]);};
