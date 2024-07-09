import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as dann from  "../data/dann.js";



export  function setAnnId( Anns, ix, id)  {sys.$params(arguments.length, 3);
  const R =sys.$checkNull( arr.copy(Anns));
  R[ix] =sys.$checkExists(R[ix], [id, R[ix][dann.am]]);
   return R;
};







export  function setAnnAm( Anns, ix, am)  {sys.$params(arguments.length, 3);
   const R =sys.$checkNull( arr.copy(Anns));
  R[ix] =sys.$checkExists(R[ix], [R[ix][0], am]);
  const oldSum =sys.$checkNull( arr.reduce(Anns,0, function(r,  e)  {sys.$params(arguments.length, 2);  return r + e[dann.am];}));
  const newSum =sys.$checkNull( arr.reduce(R,0, function(r,  e)  {sys.$params(arguments.length, 2);  return r + e[dann.am];}));
  const lastValue = arr.peek(R)[dann.am] + oldSum - newSum;
  if (lastValue < 0)  return [];
  arr.peek(R)[dann.am] =sys.$checkExists(arr.peek(R)[dann.am], lastValue);
   return R;
};



export  function addAnn( Anns)  {sys.$params(arguments.length, 1);
   const R =sys.$checkNull( arr.copy(Anns));
  arr.push(R,dann.mk("", 0));
   return R;
};



export  function clearAnns( Anns)  {sys.$params(arguments.length, 1);
   return arr.filter(Anns,function( a)  {sys.$params(arguments.length, 1);  return sys.$neq(a[dann.am] , 0);});};
