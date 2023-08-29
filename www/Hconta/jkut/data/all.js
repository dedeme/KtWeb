import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




import * as cts from  "../data/cts.js";
import * as conf from  "../data/conf.js";
import * as acc from  "../data/acc.js";






export  function mk(timeStamp, cf, ac)  {sys.$params(arguments.length, 3);  return {timeStamp:timeStamp, cf:cf, ac:ac};};



export  function timeStamp()  {sys.$params(arguments.length, 0);  return timeStampV[0];};
const timeStampV =sys.$checkNull( [""]);



export  function years()  {sys.$params(arguments.length, 0);  return YearsV[0];};
const YearsV =sys.$checkNull( [[]]);



export  function currentYear()  {sys.$params(arguments.length, 0);  return currentYearV[0];};


export  function setCurrentYear(y)  {sys.$params(arguments.length, 1); currentYearV[0] =sys.$checkExists(currentYearV[0],sys.$checkNull( y));};
const currentYearV =sys.$checkNull( ["1001"]);



export  function isLastYear()  {sys.$params(arguments.length, 0);  return sys.$eq(currentYearV[0] , arr.peek(YearsV[0]));};





export  async  function send()  {sys.$params(arguments.length, 0);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "Main",
    rq: "write",
    timeStamp: timeStampV[0],
    year: currentYearV[0],
    data: js.w(acc.toJs())
  }));
  if (sys.asBool(sys.$eq(Rp.timeStamp , "")))  return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(false);});
  timeStampV[0] =sys.$checkExists(timeStampV[0],sys.$checkNull( Rp.timeStamp));
   return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(true);});
};



export  async  function request()  {sys.$params(arguments.length, 0);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "Main",
    rq: "read"
  }));

  timeStampV[0] =sys.$checkExists(timeStampV[0],sys.$checkNull( Rp.timeStamp));
  YearsV[0] =sys.$checkExists(YearsV[0],sys.$checkNull( Rp.years));
  currentYearV[0] =sys.$checkExists(currentYearV[0],sys.$checkNull( Rp.year));
  acc.fromJs(js.r(Rp.data));

   return new  Promise(function(resolve, reject)  {sys.$params(arguments.length, 2); resolve(true);});
};
