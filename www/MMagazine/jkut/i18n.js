import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "2 Days": "2 días",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "\"Todas las entradas serán borradas.\n¿Continuar?",
  "Click %0 to continue.": "Hacer click %0 para continuar.",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Dates of profits and ibex does not match": "Fechas de beneficios e Ibex no coinciden",
  "Delete": "Borrar",
  "Errors": "Errores",
  "Home": "Inicio",
  "Ibex": "Ibex",
  "Investor": "Inversor",
  "Investors - Ibex": "Inversores - Ibex",
  "Log": "Registro",
  "Market": "Market",
  "Percentages": "Porcentajes",
  "Profits": "Beneficios",
  "Reload": "Recargar",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "La sesión ha expirado.",
  "here": "aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "2 Days": "2 Days",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Click %0 to continue.": "Click %0 to continue.",
  "Data base is out of date.": "Data base is out of date.",
  "Dates of profits and ibex does not match": "Dates of profits and ibex does not match",
  "Delete": "Delete",
  "Errors": "Errors",
  "Home": "Home",
  "Ibex": "Ibex",
  "Investor": "Investor",
  "Investors - Ibex": "Investors - Ibex",
  "Log": "Log",
  "Market": "Market",
  "Percentages": "Percentages",
  "Profits": "Profits",
  "Reload": "Reload",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
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
