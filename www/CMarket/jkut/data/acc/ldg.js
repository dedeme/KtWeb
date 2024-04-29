import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';













export  function mk(stocks, cash, equity, sales, fees, profits, differences)  {sys.$params(arguments.length, 7);
   return {stocks:stocks, cash:cash, equity:equity, sales:sales, fees:fees, profits:profits, differences:differences};};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(A[0], A[1], A[2], A[3], A[4], A[5], A[6]);};
