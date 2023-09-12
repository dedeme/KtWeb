import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as docEntry from  "../data/docEntry.js";












export  function mk(doc, defines, enums, structs, typedefs, unions, functions, vars)  {sys.$params(arguments.length, 8);
   return {doc:doc, defines:defines, enums:enums, structs:structs, typedefs:typedefs, unions:unions, functions:functions, vars:vars};};


export  function toJs(D)  {sys.$params(arguments.length, 1);  return [
    D.doc,
    arr.map(D.defines, docEntry.toJs),
    arr.map(D.enums, docEntry.toJs),
    arr.map(D.structs, docEntry.toJs),
    arr.map(D.typedefs, docEntry.toJs),
    arr.map(D.unions, docEntry.toJs),
    arr.map(D.functions, docEntry.toJs),
    arr.map(D.vars, docEntry.toJs)
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(
    A[0],
    arr.map(A[1], docEntry.fromJs),
    arr.map(A[2], docEntry.fromJs),
    arr.map(A[3], docEntry.fromJs),
    arr.map(A[4], docEntry.fromJs),
    arr.map(A[5], docEntry.fromJs),
    arr.map(A[6], docEntry.fromJs),
    arr.map(A[7], docEntry.fromJs)
  );};
