import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "2 Days": "2 días",
  "Add readJs": "Añadir readJs",
  "Add writeJs": "Añadir writeJs",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas serán borradas.\n¿Continuar?",
  "Application Name": "Nombre de la aplicación",
  "Application version": "Versión de la aplicación",
  "Array": "Array",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Clipboard": "Portapapeles",
  "Command": "Comando",
  "Constants": "Constantes",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Data base version": "Versión de la base de datos",
  "Database Main": "Principal de la base de datos",
  "Date": "Fecha",
  "Delete": "Borrar",
  "Empty Module": "Módulo vacío",
  "Empty Page": "Página vacía",
  "English": "Inglés",
  "Errors": "Errores",
  "Fields": "Campos",
  "Functions": "Funciones",
  "Global Variables": "Variables globales",
  "Import i18n": "Importar i18n",
  "JSON table": "Tabla JSON",
  "KtWeb Main": "Principal de ktWeb",
  "KutPost Main": "Principal de KutPost",
  "Log": "Log",
  "Main Page": "Página principal",
  "Message Page": "Página de mensaje",
  "Name": "Nombre",
  "Object": "Objeto",
  "Overview": "Introducción",
  "Q definition": "Definir Q",
  "Record Module": "Módulo de registro",
  "Record Page": "Página de registro",
  "Reload": "Recarga",
  "Send to Server, getting dbKey": "Enviar al servidor, recibiendo 'dbKey'",
  "Send to Server, sending dbKey": "Enviar al servidor, enviando 'dbKey'.",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "La sesión ha expirado.",
  "Set": "Set",
  "Snippets": "Snippets",
  "Source": "Fuente",
  "Spanish": "Español",
  "Type": "Tipo",
  "Update": "Actualizar",
  "Web Page Hub": "Distribuidor de web",
  "With fromJs": "Con fromJs",
  "With toJs": "Con toJs",
  "here": "Aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "2 Days": "2 Days",
  "Add readJs": "Add readJs",
  "Add writeJs": "Add writeJs",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Application Name": "Application Name",
  "Application version": "Application version",
  "Array": "Array",
  "Click %0 to continue.": "Click %0 to continue.",
  "Clipboard": "Clipboard",
  "Command": "Command",
  "Constants": "Constants",
  "Data base is out of date.": "Data base is out of date.",
  "Data base version": "Data base version",
  "Database Main": "Database Main",
  "Date": "Date",
  "Delete": "Delete",
  "Empty Module": "Empty Module",
  "Empty Page": "Empty Page",
  "English": "English",
  "Errors": "Errors",
  "Fields": "Fields",
  "Functions": "Functions",
  "Global Variables": "Gobal Variables",
  "Import i18n": "Import i18n",
  "JSON table": "JSON table",
  "KtWeb Main": "KtWeb Main",
  "KutPost Main": "KutPost Main",
  "Log": "Log",
  "Main Page": "Main Page",
  "Message Page": "Message Page",
  "Name": "Name",
  "Object": "Object",
  "Overview": "Overview",
  "Q definition": "Q definition",
  "Record Module": "Record Module",
  "Record Page": "Record Page",
  "Reload": "Reload",
  "Send to Server, getting dbKey": "Send to Server, getting dbKey",
  "Send to Server, sending dbKey": "Send to Server, sending dbKey",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Set": "Set",
  "Snippets": "Snippets",
  "Source": "Source",
  "Spanish": "Spanish",
  "Type": "Type",
  "Update": "Update",
  "Web Page Hub": "Web Page Hub",
  "With fromJs": "With fromJs",
  "With toJs": "With toJs",
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
