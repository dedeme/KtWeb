import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);













export  function mk(id, isSell, date, inv, nick, stocks, price, cash)  {sys.$params(arguments.length, 8);
   return {id:id, isSell:isSell, date:date, inv:inv, nick:nick, stocks:stocks, price:price, cash:cash};};



export  function update(Old, New)  {sys.$params(arguments.length, 2);
  Old.id =sys.$checkExists(Old.id,sys.$checkNull( New.id));
  Old.isSell =sys.$checkExists(Old.isSell,sys.$checkNull( New.isSell));
  Old.date =sys.$checkExists(Old.date,sys.$checkNull( New.date));
  Old.inv =sys.$checkExists(Old.inv,sys.$checkNull( New.inv));
  Old.nick =sys.$checkExists(Old.nick,sys.$checkNull( New.nick));
  Old.stocks =sys.$checkExists(Old.stocks,sys.$checkNull( New.stocks));
  Old.price =sys.$checkExists(Old.price,sys.$checkNull( New.price));
  Old.cash =sys.$checkExists(Old.cash,sys.$checkNull( New.cash));
};



export  function toStr(A)  {sys.$params(arguments.length, 1); 
  return "| " +
  (sys.asBool(A.isSell)
      ? II("S")
      : II("B")
    ) + " | " +
  time.toIso(A.date) + " | " +
  A.inv + " | " +
  A.nick + " | " +
  math.toIso(A.stocks, 0) + " | " +
  math.toIso(A.price, 4) + " | " +
  math.toIso(A.cash, 2) +  " |"
;};


export  function toJs(A)  {sys.$params(arguments.length, 1);  return [
    A.id,
    A.isSell,
    time.toStr(A.date),
    A.inv,
    A.nick,
    A.stocks,
    A.price,
    A.cash
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(
    A[0],
    A[1],
    time.fromStr(A[2])[0],
    A[3],
    A[4],
    A[5],
    A[6],
    A[7]
  );};
