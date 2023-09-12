import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';






export  function mk(entries)  {sys.$params(arguments.length, 1);  return {entries:entries};};



export  function previous(Cash, ix)  {sys.$params(arguments.length, 2);
  const start0 =sys.$checkNull( ix - 5);
  const start =sys.$checkNull(sys.asBool( start0 < 0) ? 0 : start0);
   return sys.$slice(Cash.entries,start,ix);
};



export  function next(Cash, ix)  {sys.$params(arguments.length, 2);
  const sz =sys.$checkNull( arr.size(Cash.entries));
  const end0 =sys.$checkNull( ix + 6);
  const end =sys.$checkNull(sys.asBool( end0 > sz) ? sz : end0);
   return sys.$slice(Cash.entries,ix + 1,end);
};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(arr.map(A, entryFromJs));};







export  function mkEntry(month, desc, isIncome, am)  {sys.$params(arguments.length, 4);  return {month:month, desc:desc, isIncome:isIncome, am:am };};



export  function eqHcC(CashEntry, DiaryEntry)  {sys.$params(arguments.length, 2); 
    return sys.asBool(sys.asBool(sys.asBool(sys.$eq(DiaryEntry.month , CashEntry.month)) &&
    sys.asBool(sys.$eq(DiaryEntry.desc , CashEntry.desc))) &&
    sys.asBool(sys.$eq(DiaryEntry.isIncome , CashEntry.isIncome))) &&
    sys.asBool(math.eq(DiaryEntry.am, CashEntry.am, 0.0001))
  ;};


export  function entryFromJs(A)  {sys.$params(arguments.length, 1);  return mkEntry(A[0], A[1], A[2], A[3]);};
