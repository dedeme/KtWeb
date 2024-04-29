import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../cts.js";
import * as accValue from  "../data/accValue.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);



export  function groups()  {sys.$params(arguments.length, 0);  return {
    "1": "Financiación básica",
    "2": "Inmovilizado",
    "3": "Existencias",
    "4": "Acreedores y deudores",
    "5": "Cuentas financieras",
    "6": "Compras y gastos",
    "7": "Ventas e ingresos",
    "8": "Gastos del patrimonio neto",
    "9": "Ingresos del patrimonio neto"
  };};



export  function subgroups()  {sys.$params(arguments.length, 0);  return SubgroupsV[0];};
const SubgroupsV =sys.$checkNull( [dic.fromArr([
    [sys.$slice(cts.cash,0,2), "Tesorería"],
    [sys.$slice(cts.capital,0,2), "Capital"],
    [sys.$slice(cts.results,0,2), "Resultados pendientes de aplicación"]
  ])]);




export  function accounts()  {sys.$params(arguments.length, 0);  return AccountsV[0];};
const AccountsV =sys.$checkNull( [dic.fromArr([
    [sys.$slice(cts.cash,0,3), accValue.mk("Bancos, cuentas de ahorro, euros", "BABVI")],
    [sys.$slice(cts.capital,0,3), accValue.mk("Capital", "BPAI")],
    [sys.$slice(cts.results,0,3), accValue.mk("Resultados del ejercicio", "BPAVII")]
  ])]);



export  function subaccounts()  {sys.$params(arguments.length, 0);  return SubaccountsV[0];};
const SubaccountsV =sys.$checkNull( [dic.fromArr([
    [cts.cash, "CaixaBank. Cta."],
    [cts.capital, "Capital"],
    [cts.results, "Resultados del ejercicio"]
  ])]);



export  function diary()  {sys.$params(arguments.length, 0);  return DiaryV[0];};
const DiaryV =sys.$checkNull( [[]]);



export  function toJs()  {sys.$params(arguments.length, 0);  return [
    subgroups(),
    accounts(),
    subaccounts(),
    arr.map(diary(), diaryEntry.toJs)
  ];};



export  function fromJs(A)  {sys.$params(arguments.length, 1);
  if (!sys.asBool(A)) return; 

  SubgroupsV[0] =sys.$checkExists(SubgroupsV[0],sys.$checkNull( A[0]));
  AccountsV[0] =sys.$checkExists(AccountsV[0],sys.$checkNull( A[1]));
  SubaccountsV[0] =sys.$checkExists(SubaccountsV[0],sys.$checkNull( A[2]));
  DiaryV[0] =sys.$checkExists(DiaryV[0],sys.$checkNull( arr.map(A[3], diaryEntry.fromJs)));
};




 function sub0(ac)  {sys.$params(arguments.length, 1);
  
   function mkAccValue(Kv)  {sys.$params(arguments.length, 1);  return [Kv[0], accValue.mk(Kv[1], "")];};

  const it =sys.$checkNull((  
    sys.$eq(str.len(ac),0)? iter.map(dic.toIter(groups()), mkAccValue):
    sys.$eq(str.len(ac),1)? iter.map(dic.toIter(SubgroupsV[0]), mkAccValue):
    sys.$eq(str.len(ac),3)? iter.map(dic.toIter(SubaccountsV[0]), mkAccValue):
     dic.toIter(AccountsV[0])
  ));
   return iter.filter(it, function(Kv)  {sys.$params(arguments.length, 1);  return str.starts(Kv[0], ac);});
};






export  function sub(ac)  {sys.$params(arguments.length, 1);  return dic.fromIter(sub0(ac));};



export  function accFormat(ac)  {sys.$params(arguments.length, 1);  return str.len(ac) > 3 ? sys.$slice(ac,null,3) + "." + sys.$slice(ac,3,null) : ac;};








export  function subgroupAdd(id, description)  {sys.$params(arguments.length, 2);
  if (dic.hasKey(SubgroupsV[0], id))
     return i18n.fmt(II("Subgroup '%0' is duplicated"), [id]);
  dic.put(SubgroupsV[0], id, description);
   return "";
};




export  function subgroupDeletable(id)  {sys.$params(arguments.length, 1);
  for (const k  of sys.$forObject( dic.keys(sub(id)))) {
    const error =sys.$checkNull( accountDeletable(k));
    if (sys.$neq(error , ""))  return error;
  }
   return "";
};




export  function subgroupDel(id)  {sys.$params(arguments.length, 1);
  for (const k  of sys.$forObject( dic.keys(sub(id)))) accountDel(k);
  dic.remove(SubgroupsV[0], id);
};






export  function subgroupMod(oldId, newId, description)  {sys.$params(arguments.length, 3);
   const Subs =sys.$checkNull( SubgroupsV[0]);
  if (sys.$eq(oldId , newId)) {
    dic.put(Subs,newId, description);
     return "";
  }
  if (dic.hasKey(Subs,newId))
     return i18n.fmt(II("Subgroup '%0' is duplicated"), [newId]);

  const lg =sys.$checkNull( str.len(newId));
  const Accs =sys.$checkNull( sub(oldId));
  for ( const [k, a]  of sys.$forObject2( Accs))
    accountMod(k, newId + sys.$slice(k,lg,null), a[accValue.description], a[accValue.summary]);

  dic.remove(Subs,oldId);
  dic.put(Subs,newId, description);
   return "";
};








export  function accountAdd(id, description, summary)  {sys.$params(arguments.length, 3);
  if (dic.hasKey(AccountsV[0], id))
     return i18n.fmt(II("Account '%0' is duplicated"), [id]);
  dic.put(AccountsV[0], id, accValue.mk(description, summary));
   return "";
};





export  function accountDeletable(id)  {sys.$params(arguments.length, 1);
  for (const k  of sys.$forObject( dic.keys(sub(id)))) {
    const error =sys.$checkNull( subaccountDeletable(k));
    if (sys.$neq(error , ""))  return error;
  }
   return "";
};



export  function accountDel(id)  {sys.$params(arguments.length, 1);
  for (const k  of sys.$forObject( dic.keys(sub(id)))) subaccountDel(k);
  dic.remove(AccountsV[0], id);
};







export  function accountMod(oldId, newId, description, summary)  {sys.$params(arguments.length, 4);
   const As =sys.$checkNull( AccountsV[0]);
  if (sys.$eq(oldId , newId)) {
    dic.put(As,newId, accValue.mk(description, summary));
     return "";
  }

  if (dic.hasKey(As,newId))
     return i18n.fmt(II("Account '%0' is duplicated"), [newId]);

  const lg =sys.$checkNull( str.len(newId));
   const Accs =sys.$checkNull( sub(oldId));
  for ( const [k, a]  of sys.$forObject2( Accs)) subaccountMod(k, newId + sys.$slice(k,lg,null), a[accValue.description]);

  dic.remove(As,oldId);
  dic.put(As,newId, accValue(description, summary));
   return "";
};







export  function subaccountAdd(id, description)  {sys.$params(arguments.length, 2);
  if (dic.hasKey(SubaccountsV[0], id))
     return i18n.fmt(II("Subaccount '%0' is duplicated"), [id]);
  dic.put(SubaccountsV[0], id, description);
   return "";
};





export  function subaccountDeletable(id)  {sys.$params(arguments.length, 1);
  const n =sys.$checkNull( usedSubaccounts(id).length);
  if (sys.$neq(n , 0))
     return i18n.fmt(II("Subaccount '%0' can not be removed.\n"), [id]) +
      i18n.fmt(II("It is used in %0 annotations."), ["" + n]);
   return "";
};



export  function subaccountDel(id)  {sys.$params(arguments.length, 1);  return dic.remove(SubaccountsV[0], id);};





export  function subaccountMod(oldId, newId, description)  {sys.$params(arguments.length, 3);
   const Subs =sys.$checkNull( SubaccountsV[0]);
  if (sys.$eq(oldId , newId)) {
    dic.put(Subs,newId, description);
     return "";
  }

  if (dic.hasKey(Subs,newId))
     return i18n.fmt(II("Subaccount '%0' is duplicated"), [newId]);

   const Diary =sys.$checkNull( DiaryV[0]);
  for (const i  of sys.$forObject( usedSubaccounts(oldId))) {
     const e =sys.$checkNull( Diary[i]);
    if (dic.hasKey(e[diaryEntry.debits], oldId)) {
      const v =sys.$checkNull( e[diaryEntry.debits][oldId]);
      dic.remove(e[diaryEntry.debits], oldId);
      dic.put(e[diaryEntry.debits], newId, v);
    }
    if (dic.hasKey(e[diaryEntry.credits], oldId)) {
      const v =sys.$checkNull( e[diaryEntry.credits][oldId]);
      dic.remove(e[diaryEntry.credits], oldId);
      dic.put(e[diaryEntry.credits], newId, v);
    }
  }
  dic.remove(Subs,oldId);
  dic.put(Subs,newId, description);
   return "";
};







export  function usedAccs(ac)  {sys.$params(arguments.length, 1);
  const len =sys.$checkNull( str.len(ac));
  const R =sys.$checkNull( []); 
  arr.eachIx(DiaryV[0], function( e, i)  {sys.$params(arguments.length, 2);
    if (
      arr.any(dic.toArr(e[diaryEntry.debits]), function(Kv)  {sys.$params(arguments.length, 1);  return sys.$eq(sys.$slice(Kv[0],null,len) , ac);}) ||
      arr.any(dic.toArr(e[diaryEntry.credits]), function(Kv)  {sys.$params(arguments.length, 1);  return sys.$eq(sys.$slice(Kv[0],null,len) , ac);})
    )
      arr.push(R,i);
  });
   return R;
};




export  function usedSubaccounts(subacc)  {sys.$params(arguments.length, 1);
  const R =sys.$checkNull( []); 
  arr.eachIx(DiaryV[0], function( e, i)  {sys.$params(arguments.length, 2);
    if (dic.hasKey(e[diaryEntry.debits], subacc) || dic.hasKey(e[diaryEntry.credits], subacc))
      arr.push(R,i);}
  );
   return R;
};





export  function mostUsedSubaccounts(forCash)  {sys.$params(arguments.length, 1);
  const Diary =sys.$checkNull( DiaryV[0]);
  const Subs =sys.$checkNull( {}); 
  if (forCash) for (const i  of sys.$forObject( usedSubaccounts(cts.cash))) {
     const e =sys.$checkNull( Diary[i]);
    for (const k  of sys.$forObject( dic.keys(e[diaryEntry.debits]))) {
      if (sys.$eq(k , cts.cash)) continue;
      if (dic.hasKey(Subs, k)) Subs[k] +=sys.$checkExists(Subs[k],sys.$checkNull( 1));
      else dic.put(Subs, k, 1);
    }
    for (const k  of sys.$forObject( dic.keys(e[diaryEntry.credits]))) {
      if (sys.$eq(k , cts.cash)) continue;
      if (dic.hasKey(Subs,k)) Subs[k] +=sys.$checkExists(Subs[k],sys.$checkNull( 1));
      else dic.put(Subs,k, 1);
    }
  } else for (const  e  of sys.$forObject( Diary)) {
    for (const k  of sys.$forObject( dic.keys(e[diaryEntry.debits]))) {
      if (dic.hasKey(Subs,k)) Subs[k] +=sys.$checkExists(Subs[k],sys.$checkNull( 1));
      else dic.put(Subs,k, 1);
    }
    for (const k  of sys.$forObject( dic.keys(e[diaryEntry.credits]))) {
      if (dic.hasKey(Subs,k)) Subs[k] +=sys.$checkExists(Subs[k],sys.$checkNull( 1));
      else dic.put(Subs,k, 1);
    }
  }

  const Ss =sys.$checkNull( SubaccountsV[0]);
   const R =sys.$checkNull( dic.toArr(Subs));
  arr.sort(R,function(Kv1, Kv2)  {sys.$params(arguments.length, 2);  return Kv1[1] > Kv2[1];});
   return arr.map(
    arr.take(R,cts.mostUsedLen),
    function(Kv)  {sys.$params(arguments.length, 1);  return [Kv[0], Ss[Kv[0]]];}
  );
};




export  function descriptionOf(ac)  {sys.$params(arguments.length, 1);
  const lg =sys.$checkNull( str.len(ac));
  if (sys.$eq(lg , 3)) {
     return dic.hasKey(AccountsV[0], ac) ? AccountsV[0][ac][accValue.description] : "";
  } else {
     const D =sys.$checkNull( sys.$eq(lg , 1) ? groups()
      : sys.$eq(lg , 2) ? SubgroupsV[0]
      : SubaccountsV[0])
    ;
     return dic.hasKey(D,ac) ? D[ac]: "";
  }
};






export  function subOf(ac)  {sys.$params(arguments.length, 1);
   return dic.fromIter(iter.filter(
    sub0(ac),
    function( A)  {sys.$params(arguments.length, 1);  return arr.any(
        dic.toArr(SubaccountsV[0]),
        function(Kv)  {sys.$params(arguments.length, 1);  return str.starts(Kv[0], A[0]);}
      );}
  ));
};






export  function available(ac, extra)  {sys.$params(arguments.length, 2);
   const Subs =sys.$checkNull( sub(ac));
  const it =sys.$checkNull( sys.$eq(str.len(ac) , 3)
    ? iter.map(iter.$range(0,26), function(i)  {sys.$params(arguments.length, 1);  return i < 10 ? "0" + i : "" + i;})
    : iter.map(iter.$range(0,10), function(i)  {sys.$params(arguments.length, 1);  return "" + i;}))
  ;
  const R =sys.$checkNull( arr.filter(arr.fromIter(it), function(id)  {sys.$params(arguments.length, 1);  return !sys.asBool(dic.hasKey(Subs,ac + id));}));
  if (sys.$neq(extra , "")) arr.push(R,extra);
  arr.sort(R,function(i1, i2)  {sys.$params(arguments.length, 2);  return i1 < i2;});
   return R;
};



export  function addDiary( entry)  {sys.$params(arguments.length, 1);
  const date =sys.$checkNull( entry[diaryEntry.date]);
  const R =sys.$checkNull( []); 
  const ixV =sys.$checkNull( [0]);
  const rIxV =sys.$checkNull( [ -1]);
  for (const  e  of sys.$forObject( DiaryV[0])) {
    if (sys.$eq(rIxV[0] ,  -1) && e[diaryEntry.date] > date) {
      arr.push(R,entry);
      rIxV[0] =sys.$checkExists(rIxV[0],sys.$checkNull( ixV[0]));
    }
    arr.push(R,e);
    ixV[0] +=sys.$checkExists(ixV[0],sys.$checkNull( 1));
  }
  if (sys.$eq(rIxV[0] ,  -1)) {
    arr.push(R,entry);
    rIxV[0] =sys.$checkExists(rIxV[0],sys.$checkNull( ixV[0]));
  }
  DiaryV[0] =sys.$checkExists(DiaryV[0],sys.$checkNull( R));
   return rIxV[0];
};




export  function close(newYear)  {sys.$params(arguments.length, 1);
  const Accs =sys.$checkNull( {}); 
  
   function add(ac , am)  {sys.$params(arguments.length, 2);
    if (dic.hasKey(Accs,ac)) Accs[ac] +=sys.$checkExists(Accs[ac],sys.$checkNull( am));
    else dic.put(Accs,ac, am);}
  ;

   const Accounts =sys.$checkNull( AccountsV[0]);
  const sumV =sys.$checkNull( [0]);
  for (const  e  of sys.$forObject( DiaryV[0])) {
    arr.each(
      arr.filter(
        dic.toArr(e[diaryEntry.debits]),
        function(Kv)  {sys.$params(arguments.length, 1);  return sys.$eq(Accounts[sys.$slice(Kv[0],0,3)][accValue.summary][0] , "B");}
      ),
      function(Kv)  {sys.$params(arguments.length, 1);
        const v =sys.$checkNull( Kv[1]);
        sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( v));
        add(Kv[0], v);
      }
    );
    arr.each(
      arr.filter(
        dic.toArr(e[diaryEntry.credits]),
        function(Kv)  {sys.$params(arguments.length, 1);  return sys.$eq(Accounts[sys.$slice(Kv[0],0,3)][accValue.summary][0] , "B");}
      ),
      function(Kv)  {sys.$params(arguments.length, 1);
        const v =sys.$checkNull(  -Kv[1]);
        sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( v));
        add(Kv[0], v);
      }
    );
  }
  add("10200",  -sumV[0]);

  DiaryV[0] =sys.$checkExists(DiaryV[0],sys.$checkNull( [diaryEntry.mk(
    time.mkDate(1, 1, newYear),
    "Asiento de apertura",
    dic.fromArr(arr.filter(
      arr.map(dic.toArr(Accs), function(Kv)  {sys.$params(arguments.length, 1);  return [Kv[0], math.round(Kv[1], 2)];}),
      function(Kv)  {sys.$params(arguments.length, 1);  return Kv[1] > 0;}
    )),
    dic.fromArr(arr.map(
      arr.filter(
        arr.map(dic.toArr(Accs), function(Kv)  {sys.$params(arguments.length, 1);  return [Kv[0], math.round(Kv[1], 2)];}),
        function(Kv)  {sys.$params(arguments.length, 1);  return Kv[1] < 0;}
      ),
      function(Kv)  {sys.$params(arguments.length, 1);  return [Kv[0],  -Kv[1]];}
    ))
   )]));
};
