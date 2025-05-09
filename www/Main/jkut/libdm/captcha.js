import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




const Q =sys.$checkNull( ui.q);








function mk0 (wg0,checkFn,incrementFn,isUpLimitFn,resetFn) { sys.$params(arguments.length, 5); return [ wg0, checkFn, incrementFn, isUpLimitFn, resetFn];}const wg0 = 0;const checkFn = 1;const incrementFn = 2;const isUpLimitFn = 3;const resetFn = 4;



export  function mkWg(c)  {sys.$params(arguments.length, 1);  return c[wg0];};



export  function check(c)  {sys.$params(arguments.length, 1);  return c[checkFn]();};



export  function increment(c)  {sys.$params(arguments.length, 1);  return c[incrementFn]();};



export  function isUpLimit(c)  {sys.$params(arguments.length, 1);  return c[isUpLimitFn]();};



export  function reset(c)  {sys.$params(arguments.length, 1);  return c[resetFn]();};







export  function mk(storeId, counterLimit, zeroColor, oneColor)  {sys.$params(arguments.length, 4);
  const wg =sys.$checkNull( Q("div"));
  const now =sys.$checkNull( time.now());
  const counterV = [getCounter(storeId)];
  if (now - getTime(storeId) > 900000) {
    counterV[0] =sys.$checkExists(counterV[0], 0);
    setCounter(storeId, 0);
    setTime(storeId, time.now());
  }
   const Ch0 =sys.$checkNull( arr.fromIter(
    iter.map(iter.$range(0,4), function(i)  {sys.$params(arguments.length, 1);  return Q("input").att("type", "checkbox");})
  ));
   const Ch1 =sys.$checkNull( arr.fromIter(
    iter.map(iter.$range(0,4), function(i)  {sys.$params(arguments.length, 1);  return Q("input").att("type", "checkbox");})
  ));

  

  
  
   function check()  {sys.$params(arguments.length, 0);  return arr.all(Ch0,function(ch)  {sys.$params(arguments.length, 1);  return !sys.asBool(ch.isChecked());}) &&
      arr.all(Ch1,function(ch)  {sys.$params(arguments.length, 1);  return ch.isChecked();})
    ;};


  
  
   function increment()  {sys.$params(arguments.length, 0);
    setCounter(storeId, counterV[0] + 1);
    setTime(storeId, time.now());
  };

  
  
   function isUpLimit()  {sys.$params(arguments.length, 0);  return counterV[0] >= counterLimit;};

  
  
   function reset()  {sys.$params(arguments.length, 0);
    resetCounter(storeId);
    resetTime(storeId);
  };


  

   const Tds =sys.$checkNull( arr.concat([
    arr.map(Ch0,function(ch)  {sys.$params(arguments.length, 1);  return Q("td")
      .att("style", "border: 1px solid;background-color: " + zeroColor)
      .add(ch)
    ;}),
    arr.map(Ch1,function(ch)  {sys.$params(arguments.length, 1);  return Q("td")
      .att("style", "border: 1px solid;background-color: " + oneColor)
      .add(ch)
    ;})
  ]));

  arr.shuffle(Tds);
  const Tds1 =sys.$checkNull( arr.take(Tds, 4));
  const Tds2 =sys.$checkNull( arr.drop(Tds, 4));

  wg
    .removeAll()
    .add(Q("table")
      .att("border", 0)
      .style("border: 1px solid;background-color: #fffff0")
      .add(Q("tr")
        .adds(Tds1))
      .add(Q("tr")
        .adds(Tds2)))
  ;

   return mk0(wg, check, increment, isUpLimit, reset);
};


 function getCounter(id)  {sys.$params(arguments.length, 1);
  const N =sys.$checkNull( storage.get(id + "_counter"));
   return !sys.asBool(N) ? 0 : math.fromStr(N[0])[0];
};


 function setCounter(id, n)  {sys.$params(arguments.length, 2); storage.put(id + "_counter", math.toStr(n));};


 function resetCounter(id)  {sys.$params(arguments.length, 1); storage.del(id + "_counter");};


 function getTime(id)  {sys.$params(arguments.length, 1);
  const N =sys.$checkNull( storage.get(id + "_time"));
   return !sys.asBool(N) ? time.now : math.fromStr(N[0])[0];
};


 function setTime(id, n)  {sys.$params(arguments.length, 2); storage.put(id + "_time", math.toStr(n));};


 function resetTime(id)  {sys.$params(arguments.length, 1); storage.del(id + "_time");};
