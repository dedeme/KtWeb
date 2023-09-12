import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as diary from  "../data/diary.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);




export  function mk(entries)  {sys.$params(arguments.length, 1);  return {entries:entries};};



export  function add(Plan, Entry)  {sys.$params(arguments.length, 2);
  const id =sys.$checkNull( Entry.id);

  if (sys.asBool(sys.$eq(id , "")))  return II("Id is missing");
  if (sys.asBool(sys.$eq(Entry.desc , "")))  return II("Description is missing");

  if (sys.asBool(contains(Plan, id)))
     return i18n.fmt(II("The account '%0' already exists"), [id]);

  arr.push(Plan.entries, Entry);
   return "";
};



export  function del(Plan, idEntry, DiaryAccs)  {sys.$params(arguments.length, 3);
  if (sys.asBool(arr.any(DiaryAccs, function(a)  {sys.$params(arguments.length, 1);  return sys.$eq(a , idEntry);})))
     return i18n.fmt(
      II("The account '%0' has annotations and can not be deleted"),
      [idEntry]
    );

  const ix =sys.$checkNull( arr.index(Plan.entries, function(E)  {sys.$params(arguments.length, 1);  return sys.$eq(E.id , idEntry);}));
  if (sys.asBool(sys.$neq(ix ,  -1))) arr.remove(Plan.entries, ix);
   return "";
};




export  function modify(Plan, idEntry, Entry, Diary)  {sys.$params(arguments.length, 4);
  const newId =sys.$checkNull( Entry.id);

  if (sys.asBool(sys.$eq(newId , "")))  return II("Id is missing");
  if (sys.asBool(sys.$eq(Entry.desc , "")))  return II("Description is missing");

  const Entries =sys.$checkNull( Plan.entries);
  if (sys.asBool(sys.$eq(idEntry , newId))) {
    for (let i = 0;i < arr.size(Entries); ++i) {
      if (sys.asBool(sys.$eq(Entries[i].id , idEntry))) {
        Entries[i] =sys.$checkExists(Entries[i],sys.$checkNull( Entry));
        break;
      }
    }
     return "";
  }

  if (sys.asBool(contains(Plan, newId)))
     return i18n.fmt(II("The account '%0' already exists"), [newId]);

  for (let i = 0;i < arr.size(Entries); ++i) {
    if (sys.asBool(sys.$eq(Entries[i].id , idEntry))) {
      Entries[i] =sys.$checkExists(Entries[i],sys.$checkNull( Entry));
      break;
    }
  }

  diary.changeAcc(Diary, idEntry, newId);

   return "";
};



export  function contains(Plan, id)  {sys.$params(arguments.length, 2);
   return sys.$neq(arr.index(Plan.entries, function(E)  {sys.$params(arguments.length, 1);  return sys.$eq(E.id , id);}) ,  -1);};



export  function isIncome(Plan, id)  {sys.$params(arguments.length, 2);
  const EOp =sys.$checkNull( arr.find(Plan.entries, function(E)  {sys.$params(arguments.length, 1);  return sys.$eq(E.id , id);}));
  if (sys.asBool(EOp))  return EOp[0].isIncome;
  throw new Error(("Count " + id + " not found"));
};



export  function desc(Plan, id)  {sys.$params(arguments.length, 2);
  const EOp =sys.$checkNull( arr.find(Plan.entries, function(E)  {sys.$params(arguments.length, 1);  return sys.$eq(E.id , id);}));
  if (sys.asBool(EOp))  return EOp[0].desc;
  throw new Error(("Count " + id + " not found"));
};


export  function toJs(Plan)  {sys.$params(arguments.length, 1);  return arr.map(Plan.entries, entryToJs);};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(arr.map(A, entryFromJs));};






export  function mkEntry(isIncome, id, desc)  {sys.$params(arguments.length, 3);  return {isIncome:isIncome, id:id, desc:desc};};


export  function entryToJs(E)  {sys.$params(arguments.length, 1);  return [E.isIncome, E.id, E.desc];};


export  function entryFromJs(A)  {sys.$params(arguments.length, 1);  return mkEntry(A[0], A[1], A[2]);};
