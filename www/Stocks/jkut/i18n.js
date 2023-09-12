import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "%0\nDelete annotation?": "¿Eliminar asiento?",
  "%0\nNick %1 is unknown": "%0\nNo se encuentra el nick %1",
  "%0\nSale of not bougth company %1": "%0\nVenta de una compañía no comprada",
  "%0\nStock for sale (%1) > Stocks in portfolio (%2)": "%0\nAcciones para vender (%1) > Acciones en cartera (%2)",
  "'Cash < Stocks * Price' in a buy": "'Caja < Acciones * Precio' en una compra",
  "'Cash > Stocks * Price' in a sell": "'Caja > Acciones * Precio' en una venta",
  "A new nick is to be added.\nContinue?": "Un nuevo nick va a ser añadido.\n¿Continuar?",
  "Accept": "Aceptar",
  "All": "Todo",
  "Annotations": "Apuntes",
  "B": "C",
  "Bought": "Compra",
  "Buy": "Comprar",
  "Cancel": "Cancelar",
  "Cash": "Caja",
  "Cash < 0": "Caja < 0",
  "Cash is not a valid number": "Caja no es un número válido",
  "Click %0 to continue.": "Hacer click %0 para continuar.",
  "Close Year (Help)": "Cierre del Ejercicio (Ayuda)",
  "Cost": "Coste",
  "Data is ok": "Lo datos son correctos",
  "Date": "Fecha",
  "Date is missing": "Falta la fecha",
  "Date is not valid": "La fecha no es válida",
  "Date year is not the selected year": "El año se la fecha no es el año seleccionado",
  "Fail making report": "Fallo haciendo el informe",
  "Fees": "Comisiones",
  "Form": "Ficha",
  "Forms": "Fichas",
  "Help": "Ayuda",
  "Income": "Ingreso",
  "Inv.": "Inv.",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "La sesión de KtWeb ha sido cerrada.\nHay que autenticarse en KtWeb:Main.",
  "Nick": "Nick",
  "Nick is missing": "Falta el nick",
  "No previous buy in annotation:\n%0": "No hay una compra previa en la anotación:\n%0",
  "Price": "Precio",
  "Price < 0": "Precio < 0",
  "Price is not a valid number": "El precio no es un número válido",
  "Profits": "Beneficios",
  "S": "V",
  "Sell": "Vender",
  "Selling %0 stocks when there are %1\n%2": "Venta de %0 accines cuando hay %1\n%2",
  "Session is expired.": "La sesión ha expirado.",
  "Set initial stock": "Anota las existencias iniciales",
  "Set values of the year beginning?": "¿Establecer los valores del inicio de ejercicio?",
  "Sold": "Venta",
  "Stocks": "Acciones",
  "Stocks is not a valid integer": "Acciones no es un númbero válido",
  "Sum": "Suma",
  "Summary": "Resumen",
  "There is no annotation of year %0": "No hay ninguna anotación en %0",
  "Total": "Total",
  "Treasury": "Hacienda",
  "With Fees": "Con comisiones",
  "Without Annotations": "Sin apuntes",
  "Without Data": "Sin datos",
  "Without data": "Sin datos",
  "Year %0 not found": "El año %0 no existe",
  "here": "aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "%0\nDelete annotation?": "%0\nDelete annotation?",
  "%0\nNick %1 is unknown": "%0\nNick %1 is unknown",
  "%0\nSale of not bougth company %1": "%0\nSale of not bougth company %1",
  "%0\nStock for sale (%1) > Stocks in portfolio (%2)": "%0\nStock for sale (%1) > Stocks in portfolio (%2)",
  "'Cash < Stocks * Price' in a buy": "'Cash < Stocks * Price' in a buy",
  "'Cash > Stocks * Price' in a sell": "'Cash > Stocks * Price' in a sell",
  "A new nick is to be added.\nContinue?": "A new nick is to be added.\nContinue?",
  "Accept": "Accept",
  "All": "All",
  "Annotations": "Annotations",
  "B": "B",
  "Bought": "Bought",
  "Buy": "Buy",
  "Cancel": "Cancel",
  "Cash": "Cash",
  "Cash < 0": "Cash < 0",
  "Cash is not a valid number": "Cash is not a valid number",
  "Click %0 to continue.": "Click %0 to continue.",
  "Close Year (Help)": "Close Year (Help)",
  "Cost": "Cost",
  "Data is ok": "Data is ok",
  "Date": "Date",
  "Date is missing": "Date is missing",
  "Date is not valid": "Date is not valid",
  "Date year is not the selected year": "Date year is not the selected year",
  "Fail making report": "Fail making report",
  "Fees": "Fees",
  "Form": "Form",
  "Forms": "Forms",
  "Help": "Help",
  "Income": "Income",
  "Inv.": "Inv.",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "KtWeb session is closed.\nAuthenticating from KtWeb:Main.",
  "Nick": "Nick",
  "Nick is missing": "Nick is missing",
  "No previous buy in annotation:\n%0": "No previous buy in annotation:\n%0",
  "Price": "Price",
  "Price < 0": "Price < 0",
  "Price is not a valid number": "Price is not a valid number",
  "Profits": "Profits",
  "S": "S",
  "Sell": "Sell",
  "Selling %0 stocks when there are %1\n%2": "Selling %0 stocks when there are %1\n%2",
  "Session is expired.": "Session is expired.",
  "Set initial stock": "Set initial stock",
  "Set values of the year beginning?": "Set values of the year beginning?",
  "Sold": "Sold",
  "Stocks": "Stocks",
  "Stocks is not a valid integer": "Stocks is not a valid integer",
  "Sum": "Sum",
  "Summary": "Summary",
  "There is no annotation of year %0": "There is no annotation of year %0",
  "Total": "Total",
  "Treasury": "Treasury",
  "With Fees": "With Fees",
  "Without Annotations": "Without Annotations",
  "Without Data": "Without Data",
  "Without data": "Without data",
  "Year %0 not found": "Year %0 not found",
  "here": "here"
});

export  function en() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "en"));};


 function dicByKey(s)  {sys.$params(arguments.length, 1);    
  return sys.$eq(s,"es")? esDic:
  sys.$eq(s,"en")? enDic:
   "Unreachable"
;};

const Lang =sys.$checkNull( ["es"]);

export  function getLang() {sys.$params(arguments.length, 0);  return Lang[0];};


export  function tlt(s)  {sys.$params(arguments.length, 1);
  const T =sys.$checkNull( dic.get(dicByKey(Lang[0]), s));
  return sys.asBool( T) ? T[0] : s;
};


export  function fmt(tp, Rpls)  {sys.$params(arguments.length, 2);
  const R =sys.$checkNull( [tp]);
  for (let i = 0;i < arr.size(Rpls); ++i) R[0] =sys.$checkExists(R[0],sys.$checkNull( str.replace(R[0], "%" + sys.toStr(i), Rpls[i])));
   return R[0];
};
