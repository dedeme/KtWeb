import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as month from  "../data/month.js";
import * as dann from  "../data/dann.js";
import * as danns from  "../data/danns.js";
import * as diaryEntry from  "../data/diaryEntry.js";



export  function del( D, ix)  {sys.$params(arguments.length, 2); arr.remove(D,ix);};



export  function changeAcc( D, oldAcc, newAcc)  {sys.$params(arguments.length, 3);
  for (const  e  of sys.$forObject( D)) for ( const [i, a]  of sys.$forObject2( e[diaryEntry.Anns]))
    if (sys.$eq(a[dann.id] , oldAcc)) e[diaryEntry.Anns][i] =sys.$checkExists(e[diaryEntry.Anns][i],sys.$checkNull( dann.mk(newAcc, a[dann.am])));}
;



export  function accs(D)  {sys.$params(arguments.length, 1);
  const Dic = {}; 
  for (const  e  of sys.$forObject( D)) for (const  a  of sys.$forObject( e[diaryEntry.Anns])) dic.put(Dic,a[dann.id], 1);
   return dic.keys(Dic);
};



export  function previous(D, ix)  {sys.$params(arguments.length, 2);
  const start0 = ix - 5;
  const start =sys.$checkNull( start0 < 0 ? 0 : start0);
   return sys.$slice(D,start,ix);
};



export  function next( D, ix)  {sys.$params(arguments.length, 2);
  const end0 = ix + 6;
  const end =sys.$checkNull( end0 > arr.size(D) ? arr.size(D) : end0);
   return sys.$slice(D,ix + 1,end);
};





export  function filterReverse( D, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 3);
  const from =sys.$checkNull( month.format(fromMonthIx + 1));
  const to =sys.$checkNull( month.format(toMonthIx + 1));
  const R = []; 
  for (let i = 0;i < arr.size(D); ++i) arr.push(R,[i, D[i]]);
  arr.filterIn(R,function(tp)  {sys.$params(arguments.length, 1);
    const month =sys.$checkNull( tp[1][diaryEntry.month]);
     return month >= from && month < to;
  });
   return arr.reverse(R);
};





export  function accAmount(D, accId, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 4);
  const from =sys.$checkNull( month.format(fromMonthIx + 1));
  const to =sys.$checkNull( month.format(toMonthIx + 1));
  const sumV = [0];
  for (const  e  of sys.$forObject( D))
    if (e[diaryEntry.month] >= from && e[diaryEntry.month] < to)
      for (const  a  of sys.$forObject( e[diaryEntry.Anns]))
        if (sys.$eq(a[dann.id] , accId)) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( a[dann.am]));

   return sumV[0];
};





export  function totalAmount(D, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 3);
  const from =sys.$checkNull( month.format(fromMonthIx + 1));
  const to =sys.$checkNull( month.format(toMonthIx + 1));

  const sumV = [0];
  for (const  e  of sys.$forObject( D))
    if (e[diaryEntry.month] >= from && e[diaryEntry.month] < to)
      for (const  a  of sys.$forObject( e[diaryEntry.Anns]))
        if (e[diaryEntry.isIncome]) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( a[dann.am]));
        else sumV[0] -=sys.$checkExists(sumV[0],sys.$checkNull( a[dann.am]));

   return sumV[0];
};
