import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';













export function mk0 (isIncome,accId,budget,real,dif) { sys.$params(arguments.length, 5); return [ isIncome, accId, budget, real, dif];}export const isIncome = 0;export const accId = 1;export const budget = 2;export const real = 3;export const dif = 4;







export  function mk(isIncome, accId, budget, real)  {sys.$params(arguments.length, 4);
   return mk0(isIncome, accId, budget, real, real - budget);};


export  function sumBudget( Entries)  {sys.$params(arguments.length, 1);
  const sumV = [0];
  for (const E  of sys.$forObject( Entries)) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( E[budget]));
   return sumV[0];
};


export  function sumReal( Entries)  {sys.$params(arguments.length, 1);
  const sumV = [0];
  for (const E  of sys.$forObject( Entries)) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( E[real]));
   return sumV[0];
};


export  function sumDif( Entries)  {sys.$params(arguments.length, 1);
  const sumV = [0];
  for (const E  of sys.$forObject( Entries)) sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( E[dif]));
   return sumV[0];
};
