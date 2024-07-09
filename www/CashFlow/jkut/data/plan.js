import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as diary from  "../data/diary.js";
import * as planEntry from  "../data/planEntry.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);



export  function add( Plan,  entry)  {sys.$params(arguments.length, 2);
  const id =sys.$checkNull( entry[planEntry.id]);

  if (sys.$eq(id , ""))  return II("Id is missing");
  if (sys.$eq(entry[planEntry.desc] , ""))  return II("Description is missing");

  if (contains(Plan, id))
     return i18n.fmt(II("The account '%0' already exists"), [id]);

  arr.push(Plan,entry);
   return "";
};



export  function del( Plan, idEntry,  DiaryAccs)  {sys.$params(arguments.length, 3);
  if (arr.any(DiaryAccs,function(a)  {sys.$params(arguments.length, 1);  return sys.$eq(a , idEntry);}))
     return i18n.fmt(
      II("The account '%0' has annotations and can not be deleted"),
      [idEntry]
    );

  const ix =sys.$checkNull( arr.index(Plan,function( e)  {sys.$params(arguments.length, 1);  return sys.$eq(e[planEntry.id] , idEntry);}));
  if (sys.$neq(ix ,  -1)) arr.remove(Plan,ix);
   return "";
};




export  function modify( Plan, idEntry,  entry,  Diary)  {sys.$params(arguments.length, 4);
  const newId =sys.$checkNull( entry[planEntry.id]);

  if (sys.$eq(newId , ""))  return II("Id is missing");
  if (sys.$eq(entry[planEntry.desc] , ""))  return II("Description is missing");

  if (sys.$eq(idEntry , newId)) {
    for ( const [i, e]  of sys.$forObject2( Plan)) {
      if (sys.$eq(e[planEntry.id] , idEntry)) {
        Plan[i] =sys.$checkExists(Plan[i], entry);
        break;
      }
    }
     return "";
  }

  if (contains(Plan, newId))
     return i18n.fmt(II("The account '%0' already exists"), [newId]);

  for ( const [i, e]  of sys.$forObject2( Plan)) {
    if (sys.$eq(e[planEntry.id] , idEntry)) {
      Plan[i] =sys.$checkExists(Plan[i], entry);
      break;
    }
  }

  diary.changeAcc(Diary,idEntry, newId);

   return "";
};



export  function contains( Plan, id)  {sys.$params(arguments.length, 2);
   return sys.$neq(arr.index(Plan,function( e)  {sys.$params(arguments.length, 1);  return sys.$eq(e[planEntry.id] , id);}) ,  -1);};



export  function isIncome( Plan, id)  {sys.$params(arguments.length, 2);
  const eOp =sys.$checkNull( arr.find(Plan,function( e)  {sys.$params(arguments.length, 1);  return sys.$eq(e[planEntry.id] , id);}));
  if (!sys.asBool(eOp)) throw new Error(("Count " + id + " not found"));
   const e =sys.$checkNull( eOp[0]);
   return e[planEntry.isIncome];
};



export  function desc( Plan, id)  {sys.$params(arguments.length, 2);
  const eOp =sys.$checkNull( arr.find(Plan,function( e)  {sys.$params(arguments.length, 1);  return sys.$eq(e[planEntry.id] , id);}));
  if (!sys.asBool(eOp)) throw new Error(("Count " + id + " not found"));
   const e =sys.$checkNull( eOp[0]);
   return e[planEntry.desc];
};
