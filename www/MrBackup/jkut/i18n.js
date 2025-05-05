import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';



const esDic = {
  "'%0' not found": "No se encuentra '%0'",
  "'path.txt' is empty": "'path.txt' está vacío",
  "'path.txt' is missing": "Falta 'path.txt'",
  "2 Days": "2 días",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las anotaciones del registro serán borradas.\n¿Continuar?",
  "Change size of '%0' to %1?": "Cambiar el tamaño de '%0' a %1",
  "Character '%0' is not allowed": "El carácter '%0' no está permitido",
  "Click %0 to continue.": "Hacer click %0 para continuar.",
  "Copy directory base in the others": "Copiar el directorio base en los otros",
  "Copy directory to base": "Copirar directorio en base",
  "Create 'path.txt'": "Crear 'path.txt'",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Delete": "Borrar",
  "Delete '%0'?": "¿Eliminar '%0'?",
  "Directories": "Directorios",
  "Directories are no synchronized": "Los directorios no están sincronizados",
  "Directories in bad condition": "Directorios en mal estado",
  "Directories out of data": "Directorios obsoletos",
  "Directory is duplicated": "El directorio está repetido",
  "Directory is missing in some pool": "Falta el directorio en algun depósito",
  "Directory is not in base": "El directorio no está en base",
  "Errors": "Errores",
  "Files": "Archivos",
  "Files out of data": "Archivos obsoletos",
  "Log": "Registro",
  "New": "Nuevo",
  "Ok": "Ok",
  "Pools": "Depósitos",
  "Pools in bad condition": "Depósitos en mal estado",
  "Put a directory in 'path.txt' manually": "Poner un directorio en 'path.txt' manualmente.",
  "Put a valid directory in 'path.txt' manually": "Poner un válido directorio en 'path.txt' manualmente.",
  "Reload": "Recargar",
  "Server is busy.": "El servidor está ocupado.",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "La sesión ha expirado.",
  "Summary": "Resumen",
  "Test": "Prueba",
  "There are backups inside the directory.\nChange the path anyway?": "Hay copias de seguridad en el directorio.\n¿Cambiar la ruta en cualquier caso?",
  "Update": "Actualizar",
  "here": "aquí",
  "normal": "normal"
};

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0], "es");};

const enDic = {
  "'%0' not found": "'%0' not found",
  "'path.txt' is empty": "'path.txt' is empty",
  "'path.txt' is missing": "'path.txt' is missing",
  "2 Days": "2 Days",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Change size of '%0' to %1?": "Change size of '%0' to %1?",
  "Character '%0' is not allowed": "Character '%0' is not allowed",
  "Click %0 to continue.": "Click %0 to continue.",
  "Copy directory base in the others": "Copy directory base in the others",
  "Copy directory to base": "Copy directory to base",
  "Create 'path.txt'": "Create 'path.txt'",
  "Data base is out of date.": "Data base is out of date.",
  "Delete": "Delete",
  "Delete '%0'?": "Delete '%0'?",
  "Directories": "Directories",
  "Directories are no synchronized": "Directories are no synchronized",
  "Directories in bad condition": "Directories in bad condition",
  "Directories out of data": "Directories out of data",
  "Directory is duplicated": "Directory is duplicated",
  "Directory is missing in some pool": "Directory is missing in some pool",
  "Directory is not in base": "Directory is not in base",
  "Errors": "Errors",
  "Files": "Files",
  "Files out of data": "Files out of data",
  "Log": "Log",
  "New": "New",
  "Ok": "Ok",
  "Pools": "Pools",
  "Pools in bad condition": "Pools in bad condition",
  "Put a directory in 'path.txt' manually": "Put a directory in 'path.txt' manually",
  "Put a valid directory in 'path.txt' manually": "Put a valid directory in 'path.txt' manually",
  "Reload": "Reload",
  "Server is busy.": "Server is busy.",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Summary": "Summary",
  "Test": "Test",
  "There are backups inside the directory.\nChange the path anyway?": "There are backups inside the directory.\nChange the path anyway?",
  "Update": "Update",
  "here": "here",
  "normal": "normal"
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
