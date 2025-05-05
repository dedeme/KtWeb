import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';




import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  function validateDirId(id)  {sys.$params(arguments.length, 1);
  if (sys.$eq(id , ""))  return "Name is missing.";
  for (let i = 0;i < str.len(id); ++i) {
    const ch =sys.$checkNull( id[i]);
    if ( sys.$eq(ch , "_") ||
        (ch >= "0" && ch <= "9") ||
        (ch >= "A" && ch <= "Z") ||
        (ch >= "a" && ch <= "z")
    ) continue;
     return i18n.fmt(II("Character '%0' is not allowed"), [ch]);
  }
   return "";
};



export const measureWg =sys.$checkNull( Q("span").style("visibility:hidden"));



export  function measure(tx)  {sys.$params(arguments.length, 1);
  measureWg.text(tx);
   return measureWg.e.offsetWidth;
};



export  function cut(tx, length)  {sys.$params(arguments.length, 2);
  const txV = [tx];
  while (measure(txV[0]) > length) txV[0] =sys.$checkExists(txV[0], "..." + sys.$slice(txV[0],4,null));
   return txV[0];
};
