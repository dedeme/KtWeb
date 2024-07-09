import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';





export const seT = "se";

export const buT = "bu";

export const stT = "st";

export const inT = "in";

export const wiT = "wi";

export const prT = "pr";

export const feT = "fe";

export const pdT = "pd";

export const ndT = "nd";







function mk0 (tp,i,f,s) { sys.$params(arguments.length, 4); return [ tp, i, f, s];}const tp = 0;const i = 1;const f = 2;const s = 3;



export  function mkSe(nick, stocks, price)  {sys.$params(arguments.length, 3);  return mk0(seT, stocks, price, nick);};



export  function mkBu(nick, stocks, price)  {sys.$params(arguments.length, 3);  return mk0(buT, stocks, price, nick);};



export  function mkSt(nick, stocks, price)  {sys.$params(arguments.length, 3);  return mk0(stT, stocks, price, nick);};



export  function mkIn(amount)  {sys.$params(arguments.length, 1);  return mk0(inT, 0, amount, "");};



export  function mkWi(amount)  {sys.$params(arguments.length, 1);  return mk0(wiT, 0, amount, "");};



export  function mkPr(amount, cause)  {sys.$params(arguments.length, 2);  return mk0(prT, 0, amount, cause);};



export  function mkFe(amount, cause)  {sys.$params(arguments.length, 2);  return mk0(feT, 0, amount, cause);};



export  function mkPd(amount, cause)  {sys.$params(arguments.length, 2);  return mk0(pdT, 0, amount, cause);};


export  function mkNd(amount, cause)  {sys.$params(arguments.length, 2);  return mk0(ndT, 0, amount, cause);};



export  function type(op)  {sys.$params(arguments.length, 1);  return op[tp];};



export  function nick(op)  {sys.$params(arguments.length, 1);  return op[s];};



export  function stocks(op)  {sys.$params(arguments.length, 1);  return op[i];};



export  function price(op)  {sys.$params(arguments.length, 1);  return op[f];};



export  function amount(op)  {sys.$params(arguments.length, 1);  return op[f];};



export  function cause(op)  {sys.$params(arguments.length, 1);  return op[s];};


export  function toJs(op)  {sys.$params(arguments.length, 1); switch(op[tp]) {
    case seT: case buT: case stT:{  return [op[tp], op[s], op[i], op[f]];break;}
    case prT: case feT: case pdT: case ndT:{  return [op[tp], op[f], op[s]];break;}
    case inT: case wiT:{  return [op[tp], op[f]];break;}
    default:{ throw new Error( "Unknown operation of type " + op[tp]);}
  }};


export  function fromJs(A)  {sys.$params(arguments.length, 1);
  const tp =sys.$checkNull( A[0]);
  switch(tp) {
    case seT: case buT: case stT:{  return mk0(tp, A[2], A[3], A[1]);break;}
    case prT: case feT: case pdT: case ndT:{  return mk0(tp, 0, A[1], A[2]);break;}
    case inT: case wiT:{  return mk0(tp, 0, A[1], "");break;}
    default:{ throw new Error( "Unknown operation of type " + tp);}
  }
};
