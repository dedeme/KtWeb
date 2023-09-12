import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as month from  "../data/month.js";



export  function mk(entries)  {sys.$params(arguments.length, 1);  return {entries:entries};};



export  function del(D, ix)  {sys.$params(arguments.length, 2); arr.remove(D.entries, ix);};



export  function changeAcc(D, oldAcc, newAcc)  {sys.$params(arguments.length, 3);
  for (const E  of sys.$forObject( D.entries)) {
    const Anns =sys.$checkNull( E.anns);
    for (let i = 0;i < arr.size(Anns); ++i) {
      const a =sys.$checkNull( Anns[i]);
      if (sys.asBool(sys.$eq(annId(a) , oldAcc))) Anns[i] =sys.$checkExists(Anns[i],sys.$checkNull( mkAnnotation(newAcc, annAm(a))));
    }
  }}
;



export  function accs(D)  {sys.$params(arguments.length, 1);
  const Dic =sys.$checkNull( {}); 
  for (const E  of sys.$forObject( D.entries)) for (const a  of sys.$forObject( E.anns)) dic.put(Dic, a, 1);
   return dic.keys(Dic);
};



export  function previous(D, ix)  {sys.$params(arguments.length, 2);
  const start0 =sys.$checkNull( ix - 5);
  const start =sys.$checkNull(sys.asBool( start0 < 0) ? 0 : start0);
   return sys.$slice(D.entries,start,ix);
};



export  function next(D, ix)  {sys.$params(arguments.length, 2);
  const end0 =sys.$checkNull( ix + 6);
  const end =sys.$checkNull(sys.asBool( end0 > arr.size(D.entries)) ? arr.size(D.entries) : end0);
   return sys.$slice(D.entries,ix + 1,end);
};





export  function filterReverse(D, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 3);
  const from =sys.$checkNull( month.format(fromMonthIx + 1));
  const to =sys.$checkNull( month.format(toMonthIx + 1));
  const R =sys.$checkNull( []); 
  for (let i = 0;i < arr.size(D.entries); ++i) arr.push(R, [i, D.entries[i]]);
   return arr.reverse(arr.filter(
    R, function(Tp)  {sys.$params(arguments.length, 1);  return sys.asBool(Tp[1].month >= from) && sys.asBool(Tp[1].month < to);}
  ));
};





export  function accAmount(D, accId, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 4);
  const from =sys.$checkNull( month.format(fromMonthIx + 1));
  const to =sys.$checkNull( month.format(toMonthIx + 1));
  const sumV =sys.$checkNull( [0]);
  for (const E  of sys.$forObject( D.entries))
    if (sys.asBool(sys.asBool(E.month >= from) && sys.asBool(E.month < to)))
      for (const a  of sys.$forObject( E.anns))
        if (sys.asBool(sys.$eq(annId(a) , accId))) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( annAm(a)));

   return sumV[0];
};





export  function totalAmount(D, fromMonthIx, toMonthIx)  {sys.$params(arguments.length, 3);
  const from =sys.$checkNull( month.format(fromMonthIx + 1));
  const to =sys.$checkNull( month.format(toMonthIx + 1));

  const sumV =sys.$checkNull( [0]);
  for (const E  of sys.$forObject( D.entries))
    if (sys.asBool(sys.asBool(E.month >= from) && sys.asBool(E.month < to)))
      for (const a  of sys.$forObject( E.anns))
        if (sys.asBool(E.isIncome)) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( annAm(a)));
        else sumV[0] -=sys.$checkExists(sumV[0],sys.$checkNull( annAm(a)));

   return sumV[0];
};


export  function toJs(D)  {sys.$params(arguments.length, 1);  return arr.map(D.entries, entryToJs);};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(arr.map(A, entryFromJs));};









export  function mkEntry(month, desc, isIncome, anns)  {sys.$params(arguments.length, 4);  return {
    month:month, desc:desc, isIncome:isIncome, anns:anns,
    am: arr.reduce(anns, 0, function(r, e)  {sys.$params(arguments.length, 2);  return r + annAm(e);})
  };};




export  function setAnns(Entry, Anns)  {sys.$params(arguments.length, 2);
   return mkEntry(Entry.month, Entry.desc, Entry.isIncome, Anns);};


export  function entryToJs(E)  {sys.$params(arguments.length, 1);  return [E.month, E.desc, E.isIncome, E.anns];};


export  function entryFromJs(A)  {sys.$params(arguments.length, 1);  return mkEntry(A[0], A[1], A[2], A[3]);};






export  function mkAnnotation(id, am)  {sys.$params(arguments.length, 2);  return [id, am];};



export  function annId(ann)  {sys.$params(arguments.length, 1);  return ann[0];};



export  function annAm(ann)  {sys.$params(arguments.length, 1);  return ann[1];};



export  function setAnnId(Anns, ix, id)  {sys.$params(arguments.length, 3);
  const R =sys.$checkNull( arr.copy(Anns));
  R[ix] =sys.$checkExists(R[ix],sys.$checkNull( [id, R[ix][1]]));
   return R;
};







export  function setAnnAm(Anns, ix, am)  {sys.$params(arguments.length, 3);
  const R =sys.$checkNull( arr.copy(Anns));
  R[ix] =sys.$checkExists(R[ix],sys.$checkNull( [R[ix][0], am]));
  const oldSum =sys.$checkNull( arr.reduce(Anns, 0, function(r, e)  {sys.$params(arguments.length, 2);  return r + e;}));
  const newSum =sys.$checkNull( arr.reduce(R, 0, function(r, e)  {sys.$params(arguments.length, 2);  return r + e;}));
  const lastValue =sys.$checkNull( arr.peek(R)[1] + oldSum - newSum);
  if (sys.asBool(lastValue < 0))  return [];
  arr.peek(R)[1] =sys.$checkExists(arr.peek(R)[1],sys.$checkNull( lastValue));
   return R;
};



export  function addAnn(Anns, A)  {sys.$params(arguments.length, 2);
  const R =sys.$checkNull( arr.copy(Anns));
  arr.push(R, mkAnnotation("", 0));
   return R;
};



export  function clearAnns(Anns)  {sys.$params(arguments.length, 1);  return arr.filter(Anns, function(A)  {sys.$params(arguments.length, 1);  return sys.$neq(A[1] , 0);});};
