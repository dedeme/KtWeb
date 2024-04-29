import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);



export  function nFormat(value, decs)  {sys.$params(arguments.length, 2);
  if (sys.$eq(i18n.getLang() , "es"))  return math.toIso(value, decs);
  else  return math.toEn(value, decs);
};



export  function nFormat2(value, decs)  {sys.$params(arguments.length, 2);
  const point =sys.$checkNull( sys.$eq(i18n.getLang() , "es") ? "," : ".");
  const R =sys.$checkNull( [nFormat(value, decs)]);
  while (true) {
    const lg1 =sys.$checkNull( str.len(R[0]) - 1);
    const ch =sys.$checkNull( R[0][lg1]);
    if (sys.$eq(ch , "0")) {
      R[0] =sys.$checkExists(R[0],sys.$checkNull( sys.$slice(R[0],null,lg1)));
    } else {
      if (sys.$eq(ch , point)) R[0] =sys.$checkExists(R[0],sys.$checkNull( sys.$slice(R[0],null,lg1)));
      break;
    }
  }
   return R[0];
};



export  function dFormat(value)  {sys.$params(arguments.length, 1);
  const y =sys.$checkNull( sys.$slice(value,null,4));
  const m =sys.$checkNull( sys.$slice(value,4,6));
  const d =sys.$checkNull( sys.$slice(value,6,null));
   return sys.$eq(i18n.getLang() , "es")
    ? d + "/" + m + "/" + y
    : m + "-" + d + "-" + y
  ;
};





export  function mkTh(label, fn)  {sys.$params(arguments.length, 2);  return Q("td")
    .klass("header")
    .add(ui.link(function(e)  {sys.$params(arguments.length, 1); fn();})
      .klass("link")
      .text(label))
  ;};



export  function mkTdN(n, dec)  {sys.$params(arguments.length, 2);  return Q("td")
    .klass("fnumber")
    .text(sys.$eq(i18n.getLang() , "es")
        ? math.toIso(n, dec)
        : math.toEn(n, dec)
      )
  ;};
