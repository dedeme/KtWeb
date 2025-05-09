import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';






export  function groups()  {sys.$params(arguments.length, 0);  return {
    "A": "RESULTADO DE EXPLOTACIÓN",
    "B": "RESULTADO FINANCIERO",
    "C": "RESULTADO ANTES DE IMPUESTOS",
    "D": "RESULTADO DEL EJERCICIO"
  };};



export  function entries()  {sys.$params(arguments.length, 0);  return {
    "01": "Importe neto de la cifra de negocios",
    "02": "Variación de existencias",
    "03": "Trabajos realizados por la empresa para su activo",
    "04": "Aprovisionamientos",
    "05": "Otros ingresos de explotación",
    "06": "Gastos de personal",
    "07": "Otros gastos de explotación",
    "08": "Amortización del inmovilizado",
    "09": "Imputación de subvenciones ",
    "10": "Excesos de provisiones",
    "11": "Deterioro y resultado por enajenaciones del inmovilizado",
    "12": "Otros resultados",
    "13": "Ingresos financieros",
    "14": "Gastos financieros",
    "15": "Variación de valor razonable en instrumentos financieros",
    "16": "Diferencias de cambio",
    "17": "Deterioro y resultado por enajenaciones de instr. financieros",
    "18": "Impuestos"
  };};



export  function isValid(id)  {sys.$params(arguments.length, 1);
   return sys.$eq(str.len(id) , 3) &&
    sys.$eq(id[0] , "P") &&
    ( (sys.$eq(id[2] , "0") && id[3] >= "1" && id[3] <= "9") ||
      (sys.$eq(id[2] , "1") && id[3] >= "0" && id[3] <= "8")
    );};




export  function groupOf(id)  {sys.$params(arguments.length, 1);  return id < "13" ? "A" : id < "18" ? "B" : "C";};
