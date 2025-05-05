import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as planEntry from  "../data/planEntry.js";
import * as budgetEntry from  "../data/budgetEntry.js";



export  function mkEmpty( Plan)  {sys.$params(arguments.length, 1);  return arr.map(Plan,function( e)  {sys.$params(arguments.length, 1);
     return budgetEntry.mk(e[planEntry.id], 0);}
  );};



export  function cleanAndComplete( Month,  Plan)  {sys.$params(arguments.length, 2);
   const NewEntries =sys.$checkNull( arr.map(Plan,function( pe)  {sys.$params(arguments.length, 1);
    for (const  be  of sys.$forObject( Month))
      if (sys.$eq(be[budgetEntry.accId] , pe[planEntry.id]))  return budgetEntry.mk(be[budgetEntry.accId], be[budgetEntry.am]);
     return budgetEntry.mk(pe[planEntry.id], 0);
  }));
  arr.clear(Month);
  arr.cat(Month,NewEntries);
};
