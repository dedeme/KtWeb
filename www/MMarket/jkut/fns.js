import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';




import * as model from  "./data/model.js";
import * as upRs from  "./data/upRs.js";
import * as global from  "./global.js";
import * as i18n from  "./i18n.js";





export  function nfmt(n, d)  {sys.$params(arguments.length, 2);  return sys.$eq(i18n.getLang() , "es")
    ? math.toIso(n, d)
    : math.toEn(n, d)
  ;};



export  function rsFmt(source, n)  {sys.$params(arguments.length, 2); return (   
    sys.$eq(source,upRs.pon)? nfmt(n * 1000, 0):
    sys.$eq(source,upRs.real)? nfmt(n * global.initialCapitalV[0], 0):
    sys.$eq(source,upRs.acc)? nfmt(n * global.initialCapitalV[0], 0):
    nfmt(100 * (n - 1), 2)
  );};




export  function getModel(mdId)  {sys.$params(arguments.length, 1);
   return arr.find(global.Models, function( m)  {sys.$params(arguments.length, 1);  return sys.$eq(m[model.id] , mdId);})[0];};



export  function existsModel(mdId)  {sys.$params(arguments.length, 1);
   return arr.any(global.Models, function( m)  {sys.$params(arguments.length, 1);  return sys.$eq(m[model.id] , mdId);});};





export  function ixToParams( md, ix)  {sys.$params(arguments.length, 2);
   const B =sys.$checkNull( global.ParamBases[md[model.id]]);
  const Binc =sys.$checkNull( global.ParamBaseIncs[md[model.id]]);
  if (sys.$eq(arr.size(B) , 1)) {
     return [B[0] + Binc[0] * ix];
  }
  const steps =sys.$checkNull( global.evalStepsV[0]);
  const r =sys.$checkNull( math.toInt(ix / steps));
  const c = ix - r * steps;
   return [B[0] + Binc[0] * r, B[1] + Binc[1] * c];
};



export  function pfmt(mdId, ix)  {sys.$params(arguments.length, 2);
  const fmt =sys.$checkNull( math.toEn);
   const md =sys.$checkNull( getModel(mdId));
   const Types =sys.$checkNull( md[model.ParamTypes]);
  const P =sys.$checkNull( ixToParams(md, ix));

  if (sys.$eq(arr.size(Types) , 1))
     return "[" +
      (sys.$eq(Types[0] , model.dayParam) ? fmt(P[0], 0) : fmt(P[0] * 100, 2)) +
      "]"
    ;

   return "[" +
      (sys.$eq(Types[0] , model.dayParam) ? fmt(P[0], 0) : fmt(P[0] * 100, 2)) +
      ", " +
      (sys.$eq(Types[1] , model.dayParam) ? fmt(P[1], 0) : fmt(P[1] * 100, 2)) +
      "]"
    ;
};



export  function pfmt1(type, value)  {sys.$params(arguments.length, 2);  return sys.$eq(type , model.dayParam)
    ? nfmt(value, 0)
    : nfmt(value * 100, 2)
  ;};
