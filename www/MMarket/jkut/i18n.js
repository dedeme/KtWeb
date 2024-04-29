import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "2 Days": "2 días",
  "Acc.": "Cont.",
  "Accounting": "Contabilidad",
  "All": "Todo",
  "All log entries will be deleted.\nContinue?": "Todas las entradas serán borradas.\n¿Continuar?",
  "All<br>Data": "Todos<br>los datos",
  "Assets": "Activo",
  "Average": "Media",
  "Base": "Base",
  "Base Increment": "Incremento de la base",
  "Buys": "Compras",
  "Cash": "Caja",
  "Charts": "Gráficos",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Close": "Cierre",
  "Companies": "Compañías",
  "Corrected<br>Average": "Media<br>corregida",
  "Daily": "Diario",
  "Data base is out of date.": "La base de datos está obsoleta.",
  "Date": "Fecha",
  "Delete": "Borrar",
  "Description": "Descripción",
  "Deviation<br>%": "Desviación<br>%",
  "Environment Increment": "Incremento del entorno",
  "Errors": "Errores",
  "Eval.": "Eval.",
  "Final amount from initial one of %0 €": "Cantidad final para una inicial de %0 €",
  "Final amount from initial one of 1,000 points": "Cantidad final para una inicial de 1.000 puntos",
  "Final amount from initial one of 100 €": "Cantidad final para una inicial de 100 €",
  "H. Eval.": "H. Eval.",
  "H. Sales": "H. Vtas.",
  "Historic": "Histórico",
  "Hot Maps": "Mapas de calor",
  "Id": "Id",
  "In portfolio": "En cartera",
  "In quarantine": "En cuarentena",
  "Last<br>Value": "Último<br>valor",
  "Log": "Log",
  "Model": "Modelo",
  "Models": "Modelos",
  "Monthly": "Mensual",
  "N.": "N.",
  "Name": "Nombre",
  "Operations": "Operaciones",
  "Orders": "Órdenes",
  "Points": "Puntos",
  "Portfolio": "Cartera",
  "Prof.": "Bfs.",
  "Profits": "Beneficios",
  "Profits (%)": "Benefs. (%)",
  "Quarantine": "Cuarentena",
  "Real": "Real",
  "Refs.": "Refs.",
  "Reload": "Recarga",
  "Results": "Resultados",
  "Sales": "Vtas.",
  "Sells": "Ventas",
  "Session is closed.\nAuthenticating from Main.": "La sesión ha sido cerrada.\nHay que autenticarse en Main.",
  "Session is expired.": "La sesión ha expirado.",
  "Source": "Fuente",
  "Summary": "Resumen",
  "Weekly": "Semanal",
  "Withdrawals": "Retiradas",
  "Without Data": "Sin datos",
  "here": "Aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "2 Days": "2 Days",
  "Acc.": "Acc.",
  "Accounting": "Accounting",
  "All": "All",
  "All log entries will be deleted.\nContinue?": "All log entries will be deleted.\nContinue?",
  "All<br>Data": "All<br>Data",
  "Assets": "Assets",
  "Average": "Average",
  "Base": "Base",
  "Base Increment": "Base Increment",
  "Buys": "Buys",
  "Cash": "Cash",
  "Charts": "Charts",
  "Click %0 to continue.": "Click %0 to continue.",
  "Close": "Close",
  "Companies": "Companies",
  "Corrected<br>Average": "Corrected<br>Average",
  "Daily": "Daily",
  "Data base is out of date.": "Data base is out of date.",
  "Date": "Date",
  "Delete": "Delete",
  "Description": "Description",
  "Deviation<br>%": "Deviation<br>%",
  "Environment Increment": "Environment Increment",
  "Errors": "Errors",
  "Eval.": "Eval.",
  "Final amount from initial one of %0 €": "Final amount from initial one of %0 €",
  "Final amount from initial one of 1,000 points": "Final amount from initial one of 1,000 points",
  "Final amount from initial one of 100 €": "Final amount from initial one of 100 €",
  "H. Eval.": "H. Eval.",
  "H. Sales": "H. Sales",
  "Historic": "Historic",
  "Hot Maps": "Hot Maps",
  "Id": "Id",
  "In portfolio": "In portfolio",
  "In quarantine": "In quarantine",
  "Last<br>Value": "Last<br>Value",
  "Log": "Log",
  "Model": "Model",
  "Models": "Models",
  "Monthly": "Monthly",
  "N.": "N.",
  "Name": "Name",
  "Operations": "Operations",
  "Orders": "Orders",
  "Points": "Points",
  "Portfolio": "Portfolio",
  "Prof.": "Prof.",
  "Profits": "Profits",
  "Profits (%)": "Profits (%)",
  "Quarantine": "Quarantine",
  "Real": "Real",
  "Refs.": "Refs.",
  "Reload": "Reload",
  "Results": "Results",
  "Sales": "Sales",
  "Sells": "Sells",
  "Session is closed.\nAuthenticating from Main.": "Session is closed.\nAuthenticating from Main.",
  "Session is expired.": "Session is expired.",
  "Source": "Source",
  "Summary": "Summary",
  "Weekly": "Weekly",
  "Withdrawals": "Withdrawals",
  "Without Data": "Without Data",
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
