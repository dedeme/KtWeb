import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';



const esDic = {
  "'%0' is not a number": "'%0' no es un número",
  "2 Days": "2 Días",
  "Accept": "Aceptar",
  "Account %0 is repeated": "La cuenta '%0' está repetida",
  "Account '%0' is duplicated": "La cuenta '%0' está repetida.",
  "Account for ammount %0 is missing": "Cuenta para la cantidad %0 no existe",
  "Account is missing": "No se ha indicado la cuenta",
  "Accounts": "Cuentas",
  "Accs": "Ctas",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas del registro será borradas.\n¿Continuar?",
  "Ammount is 0": "La cantidad es 0",
  "Balance": "Balance",
  "Cancel": "Cancelar",
  "Cash": "Caixabank",
  "Change": "Cambiar",
  "Click %0 to continue.": "Hacer click %0 para continuar.",
  "Close": "Cerrar",
  "Close year": "Cerrar ejercicio",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Data base out of date.": "La base de datos está obsoleta.",
  "Date is missing": "Falta la fecha",
  "Debits sum is different from Credits sum": "La suma del Debe es distinta de la del Haber",
  "Delete": "Eliminar",
  "Delete '%0'?": "¿Eliminar '%0'?",
  "Delete annotation %0:\n%1?": "¿Eliminar la anotación %0:\n%1?",
  "Description": "Descripción",
  "Description is missing": "Falta indicar la descripción",
  "Diary": "Diario",
  "Difference is 0": "La diferencia es 0",
  "Errors": "Errores",
  "Group": "Grupo",
  "Group is missing": "Falta indicar el grupo",
  "Groups": "Grupos",
  "It is used in %0 annotations.": "En uso en %0 anotaciones.",
  "Log": "Registro",
  "Most used accounts": "Cuentas más usadas",
  "New": "Nuevo",
  "Nº": "Nº",
  "P & L": "P & G",
  "Plan": "Plan",
  "Reload": "Recargar",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "La sesión ha expirado.",
  "Statements": "Rúbricas",
  "Subaccount '%0' can not be removed.\n": "La subcuenta '%0' no puede ser eliminada.\n",
  "Subaccount '%0' is duplicated": "La subcuenta '%0' está repetida.",
  "Subaccounts": "Subcuentas",
  "Subgroup '%0' is duplicated": "El subgrupo '%0' está repetido.",
  "Subgroups": "Subgrupos",
  "Summaries": "Resúmenes",
  "Summary": "Resumen",
  "Sums of Debits and Credits are zero": "La suma del Debe y el Haber es 0",
  "This operation only can be manually undone.\nContinue?": "Esta operación solo puede ser revertida manualmente.\n¿Continuar?",
  "Year": "Ejercicio",
  "Year %0 not found": "No encontrado el año %0",
  "here": "aquí"
};

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0], "es");};

const enDic = {
  "'%0' is not a number": "'%0' is not a number",
  "2 Days": "2 Days",
  "Accept": "Accept",
  "Account %0 is repeated": "Account %0 is repeated",
  "Account '%0' is duplicated": "Account '%0' is duplicated",
  "Account for ammount %0 is missing": "Account for ammount %0 is missing",
  "Account is missing": "Account is missing",
  "Accounts": "Accounts",
  "Accs": "Accs",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "Ammount is 0": "Ammount is 0",
  "Balance": "Balance",
  "Cancel": "Cancel",
  "Cash": "Cash",
  "Change": "Change",
  "Click %0 to continue.": "Click %0 to continue.",
  "Close": "Close",
  "Close year": "Close year",
  "Data base is out of date.": "Data base is out of date.",
  "Data base out of date.": "Data base out of date.",
  "Date is missing": "Date is missing",
  "Debits sum is different from Credits sum": "Debits sum is different from Credits sum",
  "Delete": "Delete",
  "Delete '%0'?": "Delete '%0'?",
  "Delete annotation %0:\n%1?": "Delete annotation %0:\n%1?",
  "Description": "Description",
  "Description is missing": "Description is missing",
  "Diary": "Diary",
  "Difference is 0": "Difference is 0",
  "Errors": "Errors",
  "Group": "Group",
  "Group is missing": "Group is missing",
  "Groups": "Groups",
  "It is used in %0 annotations.": "It is used in %0 annotations.",
  "Log": "Log",
  "Most used accounts": "Most used accounts",
  "New": "New",
  "Nº": "Nº",
  "P & L": "P & L",
  "Plan": "Plan",
  "Reload": "Reload",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Statements": "Statements",
  "Subaccount '%0' can not be removed.\n": "Subaccount '%0' can not be removed.\n",
  "Subaccount '%0' is duplicated": "Subaccount '%0' is duplicated",
  "Subaccounts": "Subaccounts",
  "Subgroup '%0' is duplicated": "Subgroup '%0' is duplicated",
  "Subgroups": "Subgroups",
  "Summaries": "Summaries",
  "Summary": "Summary",
  "Sums of Debits and Credits are zero": "Sums of Debits and Credits are zero",
  "This operation only can be manually undone.\nContinue?": "This operation only can be manually undone.\nContinue?",
  "Year": "Year",
  "Year %0 not found": "Year %0 not found",
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
