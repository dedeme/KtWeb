import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';



const esDic = {
  "2 Days": "2 días",
  "Active": "Activo",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas serán borradas.\n¿Continuar?",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Command": "Instrucción",
  "Command value is missing": "No se ha indicado la instrucción a ejecutar",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Day": "Día",
  "Day value is missing": "Falta indicar el día",
  "Delete": "Borrar",
  "Delete annotation?": "¿Elimimar la anotación?",
  "Errors": "Errores",
  "Fix": "Fijo",
  "Fixed days": "Días fijos",
  "Home": "Inicio",
  "Hour - Minute": "Hora - Minuto",
  "Log": "Registro",
  "MTWRFSU": "LMXJVSD",
  "Manual": "Manual",
  "Periodic": "Periódico",
  "Periodic days": "Dias periódicos",
  "Reload": "Recargar",
  "Server": "Servidor",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "Las sesión ha expirado.",
  "Time is equals or previous to the current one": "El tiempo es igual o anterior al actual.",
  "Week days is missing": "No se ha indicado ningún dia de la semana",
  "Without entries": "Sin entradas",
  "here": "aquí"
};

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0], "es");};

const enDic = {
  "2 Days": "2 Days",
  "Active": "Active",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Click %0 to continue.": "Click %0 to continue.",
  "Command": "Command",
  "Command value is missing": "Command value is missing",
  "Data base is out of date.": "Data base is out of date.",
  "Day": "Day",
  "Day value is missing": "Day value is missing",
  "Delete": "Delete",
  "Delete annotation?": "Delete annotation?",
  "Errors": "Errors",
  "Fix": "Fix",
  "Fixed days": "Fixed days",
  "Home": "Home",
  "Hour - Minute": "Hour - Minute",
  "Log": "Log",
  "MTWRFSU": "MTWRFSU",
  "Manual": "Manual",
  "Periodic": "Periodic",
  "Periodic days": "Periodic days",
  "Reload": "Reload",
  "Server": "Server",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Time is equals or previous to the current one": "Time is equals or previous to the current one",
  "Week days is missing": "Week days is missing",
  "Without entries": "Without entries",
  "here": "here"
};

export  function en() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0], "en");};


 function dicByKey(s)  {sys.$params(arguments.length, 1); return (   
  sys.$eq(s,"es")? esDic:
  sys.$eq(s,"en")? enDic:
   "Unreachable"
);};

const Lang = ["es"];

export  function getLang() {sys.$params(arguments.length, 0);  return Lang[0];};


export  function tlt(s)  {sys.$params(arguments.length, 1);
  const T =sys.$checkNull( dic.get(dicByKey(Lang[0]), s));
   return !sys.asBool(T) ? s : T[0];
};


export  function fmt(tp, Rpls)  {sys.$params(arguments.length, 2);
  const R = [tp];
  for (let i = 0;i < arr.size(Rpls); ++i) R[0] =sys.$checkExists(R[0],sys.$checkNull( str.replace(R[0], "%" + sys.toStr(i), Rpls[i])));
   return R[0];
};
