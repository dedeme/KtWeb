import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "2 Days": "2 Días",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas del registro será borradas.\n¿Continuar?",
  "Amount": "Cantidad",
  "Bills": "Gastos",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Date": "Fecha",
  "Delete": "Eliminar",
  "Errors": "Errores",
  "Log": "Registro",
  "Month": "Mes",
  "Place": "Lugar",
  "Reload": "Recargar",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "Las sesión ha expirado.",
  "Set Place": "Poner lugar",
  "Stays": "Estancias",
  "Summary": "Resumen",
  "Sums": "Sumas",
  "Total": "Total",
  "Without Data": "Sin datos",
  "Year": "Año",
  "here": "aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "2 Days": "2 Days",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Amount": "Amount",
  "Bills": "Bills",
  "Click %0 to continue.": "Click %0 to continue.",
  "Data base is out of date.": "Data base is out of date.",
  "Date": "Date",
  "Delete": "Delete",
  "Errors": "Errors",
  "Log": "Log",
  "Month": "Month",
  "Place": "Place",
  "Reload": "Reload",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Set Place": "Set Place",
  "Stays": "Stays",
  "Summary": "Summary",
  "Sums": "Sums",
  "Total": "Total",
  "Without Data": "Without Data",
  "Year": "Year",
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
