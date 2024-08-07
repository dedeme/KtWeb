import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';







export  function mk(Data)  {sys.$params(arguments.length, 1);  return {Data:Data};};


export  function dates(Is)  {sys.$params(arguments.length, 1);  return arr.map(Is.Data, function(E)  {sys.$params(arguments.length, 1);  return E[0];});};


export  function values(Is)  {sys.$params(arguments.length, 1);  return arr.map(Is.Data, function(E)  {sys.$params(arguments.length, 1);  return E[1];});};



export  function ratios(Is)  {sys.$params(arguments.length, 1);
   const D =sys.$checkNull( Is.Data);
  if (sys.$eq(arr.size(D) , 0))  return [];
  const base =sys.$checkNull( D[0][1]);
   return arr.map(D,function(E)  {sys.$params(arguments.length, 1);  return (E[1] - base) / base;});
};



export  function add(Is, date, value)  {sys.$params(arguments.length, 3);
  const day =sys.$checkNull( time.toStr(date));
   const D =sys.$checkNull( Is.Data);
  if (!sys.asBool(arr.any(D,function(E)  {sys.$params(arguments.length, 1);  return sys.$eq(time.toStr(E[0]) , day);})))
    arr.push(D,[date, value]);
};


export  function toJs(Is)  {sys.$params(arguments.length, 1);
   return arr.map(
    Is.Data,
    function(E)  {sys.$params(arguments.length, 1);  return [time.toStr(E[0]), math.toStr(E[1])];}
  );};


export  function fromJs( A)  {sys.$params(arguments.length, 1);  return mk(arr.map(A,
    function(E)  {sys.$params(arguments.length, 1);  return [time.fromStr(E[0])[0], math.fromStr(E[1])[0]];}
  ));};
