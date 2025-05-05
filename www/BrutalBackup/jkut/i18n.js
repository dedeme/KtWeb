import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';



const esDic = {
  "'From' is missing": "No hay valor para el campo 'Desde'",
  "'From' is root": "'Desde' es raíz",
  "'Id' is missing": "No hay valor para el campo 'Id'",
  "'To' is missing": "No hay valor para el campo 'A'",
  "'To' is root": "'A' es raíz",
  "Already exists a backup with id '%0'\nOverwrite?": "Ya existe una copia de seguridad con id '%0'\n¿Sobreescribirla?",
  "Backup": "Copia de seguridad",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Copying data": "Copiando datos",
  "Data base is out of date.": "La base de datos esta obsoleta.",
  "Delete '%0'?": "¿Borrar '%0'?",
  "Deleting data": "Borrando datos",
  "From": "Desde",
  "Id": "Id",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "La sesión de KtWeb ha sido cerrada.\nHay que autenticarse en KtWeb:Main.",
  "Paths": "Rutas",
  "Reading source data": "Leyendo datos del origen",
  "Reading target data": "Leyendo datos del destino",
  "Selecting files to copy": "Seleccionando archivos para copiar",
  "Session is expired.": "Las sesión ha expirado.",
  "State": "Estado",
  "To": "A",
  "Warnings": "Avisos",
  "Without Backups": "Sin copias de seguridad",
  "here": "aquí",
  "stop": "Detener",
  "to": "a"
};

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0], "es");};

const enDic = {
  "'From' is missing": "'From' is missing",
  "'From' is root": "'From' is root",
  "'Id' is missing": "'Id' is missing",
  "'To' is missing": "'To' is missing",
  "'To' is root": "'To' is root",
  "Already exists a backup with id '%0'\nOverwrite?": "Already exists a backup with id '%0'\nOverwrite?",
  "Backup": "Backup",
  "Click %0 to continue.": "Click %0 to continue.",
  "Copying data": "Copying data",
  "Data base is out of date.": "Data base is out of date.",
  "Delete '%0'?": "Delete '%0'?",
  "Deleting data": "Deleting data",
  "From": "From",
  "Id": "Id",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "KtWeb session is closed.\nAuthenticating from KtWeb:Main.",
  "Paths": "Paths",
  "Reading source data": "Reading source data",
  "Reading target data": "Reading target data",
  "Selecting files to copy": "Selecting files to copy",
  "Session is expired.": "Session is expired.",
  "State": "State",
  "To": "To",
  "Warnings": "Warnings",
  "Without Backups": "Without Backups",
  "here": "here",
  "stop": "stop",
  "to": "to"
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
