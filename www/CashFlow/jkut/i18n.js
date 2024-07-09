import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic = {
  "'%0' is not a valid number": "'%0' no es un número válido",
  "Accept": "Aceptar",
  "Account": "Cuenta",
  "Account of annotation '%0' is missing": "Falta la anotación '%0'",
  "Accounting Plan": "Plan contable",
  "Accounts": "Cuentas",
  "Accumulated": "Acumulado",
  "Accumulated Budget": "Presupuesto Acumulado",
  "Amount": "Cantidad",
  "Budget": "Presupuesto",
  "Budget (A)": "Presup. (A)",
  "Cancel": "Cancelar",
  "Change of Year": "Cambio de año",
  "Click %0 to continue.": "Hacer click %0 para continuar.",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Delete %0?": "¿Eliminar %0?",
  "Delete '%0'?": "¿Eliminar '%0'?",
  "Description": "Descripción",
  "Description is missing": "Falta indicar la descripción",
  "Diary": "Diario",
  "Dif. (B - A))": "Dif. (B - A)",
  "Edit": "Edición",
  "Expense": "Gasto",
  "Expenses": "Gastos",
  "Fast ok only works with one entry": "Rápidos okeys solo funcionan con un una entrada",
  "Final Balance": "Saldo final",
  "Fix Problem": "Solucción de problema",
  "Id": "Id",
  "Id is missing": "Falta el Id",
  "Income": "Ingreso",
  "Incomes": "Ingresos",
  "Initial Balance": "Saldo inicial",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "La sesión de KtWeb ha sido cerrada.\nHay que autenticarse en KtWeb:Main.",
  "Modification": "Modificación",
  "Month": "Mes",
  "Monthly": "Mensual",
  "Monthly Budget": "Presupuesto Mensual",
  "New Account": "Nueva cuenta",
  "Operations": "Operaciones",
  "Plan": "Plan",
  "Real (B)": "Real (B)",
  "Session is expired.": "La sesión ha expirado.",
  "Sum": "Suma",
  "Sum of account values (%0) is greater than cash value (%1)": "La suma de los valores de las cuentas (%0) es mayor que la caja (%1)",
  "Sum of annotations (%0) does not match the cash value (%1)": "La suma de las anotaciones (%0) no concuerda con la caja (%1)",
  "The account '%0' already exists": "La cuenta '%0' ya existe",
  "The account '%0' has annotations and can not be deleted": "La cuenta '%0' tiene anotaciones y no puede ser eliminada",
  "There is not value for previous month": "No hay valor en el mes anterior",
  "There is not value for previous year": "No hay valor en el año anterior",
  "Total": "Total",
  "Total (In - Ex)": "Total (In - Ga)",
  "Type": "Tipo",
  "Values less than 0 are not allowed": "Valores menores que 0 no están permitidos",
  "View": "Vista",
  "Without Accounts": "Sin cuentas",
  "fixBalance hc(%0) c(%1)": "El saldo inicial es:\n  Hconta: %0\n  CashFlow: %1\nEl valor de CashFlow se cambiará.",
  "here": "aquí",
  "month": "mes",
  "months": "ene,feb,mar,abr,may,jun,jul,ago,sep,oct,nov,dic",
  "real": "real",
  "year": "año"
};

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0], "es");};

const enDic = {
  "'%0' is not a valid number": "'%0' is not a valid number",
  "Accept": "Accept",
  "Account": "Account",
  "Account of annotation '%0' is missing": "Account of annotation '%0' is missing",
  "Accounting Plan": "Accounting Plan",
  "Accounts": "Accounts",
  "Accumulated": "Accumulated",
  "Accumulated Budget": "Accumulated Budget",
  "Amount": "Amount",
  "Budget": "Budget",
  "Budget (A)": "Budget (A)",
  "Cancel": "Cancel",
  "Change of Year": "Change of Year",
  "Click %0 to continue.": "Click %0 to continue.",
  "Data base is out of date.": "Data base is out of date.",
  "Delete %0?": "Delete %0?",
  "Delete '%0'?": "Delete '%0'?",
  "Description": "Description",
  "Description is missing": "Description is missing",
  "Diary": "Diary",
  "Dif. (B - A))": "Dif. (B - A))",
  "Edit": "Edit",
  "Expense": "Expense",
  "Expenses": "Expenses",
  "Fast ok only works with one entry": "Fast ok only works with one entry",
  "Final Balance": "Final Balance",
  "Fix Problem": "Fix Problem",
  "Id": "Id",
  "Id is missing": "Id is missing",
  "Income": "Income",
  "Incomes": "Incomes",
  "Initial Balance": "Initial Balance",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "KtWeb session is closed.\nAuthenticating from KtWeb:Main.",
  "Modification": "Modification",
  "Month": "Month",
  "Monthly": "Monthly",
  "Monthly Budget": "Monthly Budget",
  "New Account": "New Account",
  "Operations": "Operations",
  "Plan": "Plan",
  "Real (B)": "Real (B)",
  "Session is expired.": "Session is expired.",
  "Sum": "Sum",
  "Sum of account values (%0) is greater than cash value (%1)": "Sum of account values (%0) is greater than cash value (%1)",
  "Sum of annotations (%0) does not match the cash value (%1)": "Sum of annotations (%0) does not match the cash value (%1)",
  "The account '%0' already exists": "The account '%0' already exists",
  "The account '%0' has annotations and can not be deleted": "The account '%0' has annotations and can not be deleted",
  "There is not value for previous month": "There is not value for previous month",
  "There is not value for previous year": "There is not value for previous year",
  "Total": "Total",
  "Total (In - Ex)": "Total (In - Ex)",
  "Type": "Type",
  "Values less than 0 are not allowed": "Values less than 0 are not allowed",
  "View": "View",
  "Without Accounts": "Without Accounts",
  "fixBalance hc(%0) c(%1)": "Initial balance is:\n  Hconta: %0\n  CashFlow: %1\nCashFlow value will be changed.\"",
  "here": "here",
  "month": "month",
  "months": "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
  "real": "real",
  "year": "year"
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
