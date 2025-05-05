import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';






export  function groups()  {sys.$params(arguments.length, 0);  return {
    "AA": "ACTIVO NO CORRIENTE",
    "AB": "ACTIVO CORRIENTE",
    "PA": "FONDOS PROPIOS",
    "PB": "PASIVO NO CORRIENTE",
    "PC": "PASIVO CORRIENTE"
  };};



export  function entries()  {sys.$params(arguments.length, 0);  return {
    "AAI": "Inmovilizado intangible",
    "AAII": "Inmovilizado material",
    "AAIII": "Inversiones inmobiliarias",
    "AAV": "Inversiones financieras a largo plazo",
    "AAVI": "Activos por impuesto diferido",
    "AAVII": "Deudores comerciales no corrientes",
    "ABI": "Existencias",
    "ABII": "Deudores comerciales y otras cuentas a cobrar",
    "ABIV": "Inversiones financieras a corto plazo",
    "ABV": "Periodificaciones",
    "ABVI": "Efectivo y otros activos liquidos equivalentes",

    "PAI": "Capital",
    "PAIII": "Reservas",
    "PAVII": "Resultado del ejercicio",

    "PBI": "Provisiones a largo plazo",
    "PBII": "Deudas a largo plazo",
    "PBIV": "Pasivos por impuesto diferido",
    "PBV": "Periodificaciones a largo plazo",
    "PBVI": "Acreedores comerciales no corrientes",
    "PBVII": "Deuda con características especiales a largo plazo",

    "PCI": "Provisiones a corto plazo",
    "PCII": "Deudas a corto plazo",
    "PCIV": "Acreedores comerciales y otras cuentas a pagar",
    "PCV": "Periodificaciones a corto plazo",
    "PCVI": "Deuda con características especiales a corto plazo"
  };};




export  function groupOf(id)  {sys.$params(arguments.length, 1);  return sys.$slice(id,null,2);};
