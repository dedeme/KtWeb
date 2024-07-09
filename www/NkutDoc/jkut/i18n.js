import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "2 Days": "2 Días",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas del registro será borradas.\n¿Continuar?",
  "Click %0 to continue.": "Hacer click %0 para continuar.",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Delete": "Eliminar",
  "Delete %0?": "¿Eliminar %0?",
  "Errors": "Errores",
  "File": "Archivo",
  "Libraries": "Librerías",
  "Library path not found o not valid.": "La ruta de la librería no existe o no es válida.",
  "Log": "Registro",
  "Name": "Nombre",
  "Name '%0' contains '%1'": "El nombre '%0' contiene '%1'",
  "Name '%0' contains blanks": "El nombre '%0' contiene espacios en blanco",
  "Name '%0' is repeated": "El nombre está repetido",
  "Name is missing": "Falta el nombre",
  "Overview": "Resumen",
  "Path": "Ruta",
  "Path '%0' does not start with '/'": "El path '%0' no comienza con '/'",
  "Path is '/'": "El path es '/'",
  "Path is missing": "Falta la ruta",
  "Reload": "Recargar",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "La sesión ha expirado.",
  "There are no libraries": "No hay librerías",
  "This source can not be selected, because it does not exist": "Esta librería no puede seleccionarse por que no existe",
  "[%0] Jkut file not found.": "[%0] El archivo Jkut no existe.",
  "here": "aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "2 Days": "2 Days",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Click %0 to continue.": "Click %0 to continue.",
  "Data base is out of date.": "Data base is out of date.",
  "Delete": "Delete",
  "Delete %0?": "Delete %0?",
  "Errors": "Errors",
  "File": "File",
  "Libraries": "Libraries",
  "Library path not found o not valid.": "Library path not found o not valid.",
  "Log": "Log",
  "Name": "Name",
  "Name '%0' contains '%1'": "Name '%0' contains '%1'",
  "Name '%0' contains blanks": "Name '%0' contains blanks",
  "Name '%0' is repeated": "Name '%0' is repeated",
  "Name is missing": "Name is missing",
  "Overview": "Overview",
  "Path": "Path",
  "Path '%0' does not start with '/'": "Path '%0' does not start with '/'",
  "Path is '/'": "Path is '/'",
  "Path is missing": "Path is missing",
  "Reload": "Reload",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "There are no libraries": "There are no libraries",
  "This source can not be selected, because it does not exist": "This source can not be selected, because it does not exist",
  "[%0] Jkut file not found.": "[%0] Kut file not found.",
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
