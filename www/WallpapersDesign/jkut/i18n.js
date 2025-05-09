import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';



const esDic = {
  "2 Days": "2 Días",
  "Accept": "Aceptar",
  "Activate": "Activar",
  "Adjustment": "Ajuste",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas del registro será borradas.\n¿Continuar?",
  "Background": "Fondo",
  "Blur": "Desenfoque",
  "Blur (0 - 100)": "Desenfoque (0 - 100)",
  "Bottom": "Abajo",
  "Cancel": "Cancelar",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Close": "Cerrar",
  "Color": "Color",
  "Cut": "Recorte",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Deactivate": "Desactivar",
  "Delete": "Eliminar",
  "Errors": "Errores",
  "Image '%0' can not be processed": "La imagen '%0' no puede ser procesada",
  "Left": "Izquierda",
  "Light (0 - 100)": "Luz (0 - 100)",
  "Log": "Registro",
  "Percentage (0 - 100)": "Porcentaje (0 - 100)",
  "Pixels from top / left": "Pixles desde arriba / izquierda",
  "Pixels to sample": "Pixels para muestra",
  "Reload": "Recargar",
  "Restore": "Restaurar",
  "Right": "Derecha",
  "Save in Group %0": "Guadar en el grupo %0",
  "Save pictures in group %0?": "¿Guardar las imágenes en el grupo %0?",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "Las sesión ha expirado.",
  "Stretch": "Estirar",
  "There are duplicated pictures": "Hay imágenes repetidas",
  "There are no pictures to adjust": "No hay imágenes para ajustar",
  "Top": "Arriba",
  "Update": "Actualizar",
  "here": "aquí"
};

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0], "es");};

const enDic = {
  "2 Days": "2 Days",
  "Accept": "Accept",
  "Activate": "Activate",
  "Adjustment": "Adjustment",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Background": "Background",
  "Blur": "Blur",
  "Blur (0 - 100)": "Blur (0 - 100)",
  "Bottom": "Bottom",
  "Cancel": "Cancel",
  "Click %0 to continue.": "Click %0 to continue.",
  "Close": "Close",
  "Color": "Color",
  "Cut": "Cut",
  "Data base is out of date.": "Data base is out of date.",
  "Deactivate": "Deactivate",
  "Delete": "Delete",
  "Errors": "Errors",
  "Image '%0' can not be processed": "Image '%0' can not be processed",
  "Left": "Left",
  "Light (0 - 100)": "Light (0 - 100)",
  "Log": "Log",
  "Percentage (0 - 100)": "Percentage (0 - 100)",
  "Pixels from top / left": "Pixels from top / left",
  "Pixels to sample": "Pixels to sample",
  "Reload": "Reload",
  "Restore": "Restore",
  "Right": "Right",
  "Save in Group %0": "Save in Group %0",
  "Save pictures in group %0?": "Save pictures in group %0?",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Stretch": "Stretch",
  "There are duplicated pictures": "There are duplicated pictures",
  "There are no pictures to adjust": "There are no pictures to adjust",
  "Top": "Top",
  "Update": "Update",
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
