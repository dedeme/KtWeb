import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "2 Days": "2 días",
  "Active": "Activo",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas serán borradas.\n¿Continuar?",
  "Assets": "Patrimonio",
  "Average": "Media",
  "Best": "Mejor",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Cy.": "Ci.",
  "Cycle": "Ciclo",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Delete": "Borrar",
  "Errors": "Errores",
  "Fleas": "Pulgas",
  "Id.": "Id.",
  "Log": "Registro",
  "P1": "P1",
  "P2": "P2",
  "Points": "Puntos",
  "Profits": "Beneficios",
  "Rankings": "Clasificaciones",
  "Reload": "Recargar",
  "Sales": "Ventas",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse desde 'Main'.",
  "Session is expired.": "Las sesión ha expirado.",
  "Start": "Comenzar",
  "Stop": "Detener",
  "Stopped": "Detenido",
  "Summary": "Resumen",
  "Worst": "Peor",
  "here": "aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "2 Days": "2 Days",
  "Active": "Active",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Assets": "Assets",
  "Average": "Average",
  "Best": "Best",
  "Click %0 to continue.": "Click %0 to continue.",
  "Cy.": "Cy.",
  "Cycle": "Cycle",
  "Data base is out of date.": "Data base is out of date.",
  "Delete": "Delete",
  "Errors": "Errors",
  "Fleas": "Fleas",
  "Id.": "Id.",
  "Log": "Log",
  "P1": "P1",
  "P2": "P2",
  "Points": "Points",
  "Profits": "Profits",
  "Rankings": "Rankings",
  "Reload": "Reload",
  "Sales": "Sales",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Start": "Start",
  "Stop": "Stop",
  "Stopped": "Stopped",
  "Summary": "Summary",
  "Worst": "Worst",
  "here": "here"
});

export  function en() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "en"));};


 function dicByKey(s)  {sys.$params(arguments.length, 1); return (   
  sys.$eq(s,"es")? esDic:
  sys.$eq(s,"en")? enDic:
   "Unreachable"
);};

const Lang =sys.$checkNull( ["es"]);

export  function getLang() {sys.$params(arguments.length, 0);  return Lang[0];};


export  function tlt(s)  {sys.$params(arguments.length, 1);
  const T =sys.$checkNull( dic.get(dicByKey(Lang[0]), s));
   return !sys.asBool(T) ? s : T[0];
};


export  function fmt(tp, Rpls)  {sys.$params(arguments.length, 2);
  const R =sys.$checkNull( [tp]);
  for (let i = 0;i < arr.size(Rpls); ++i) R[0] =sys.$checkExists(R[0],sys.$checkNull( str.replace(R[0], "%" + sys.toStr(i), Rpls[i])));
   return R[0];
};
