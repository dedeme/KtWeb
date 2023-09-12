import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cash from  "../data/cash.js";
import * as diary from  "../data/diary.js";











export  function mk(ix, hcErr, hcPrevs, hcNexts, cErr, cPrevs, cNexts)  {sys.$params(arguments.length, 7);
   return {ix:ix, hcErr:hcErr, hcPrevs:hcPrevs, hcNexts:hcNexts, cErr:cErr, cPrevs:cPrevs, cNexts:cNexts};};



 function mkNormal(HcDiary, CDiary, ix)  {sys.$params(arguments.length, 3);  return mk(
    ix,

    [HcDiary.entries[ix]],
    cash.previous(HcDiary, ix),
    cash.next(HcDiary, ix),

    [CDiary.entries[ix]],
    diary.previous(CDiary, ix),
    diary.next(CDiary, ix)
  );};



 function mkExtraC(HcDiary, CDiary, ix)  {sys.$params(arguments.length, 3);  return mk(
    ix,

    [],
    cash.previous(HcDiary, ix),
    [],

    [CDiary.entries[ix]],
    diary.previous(CDiary, ix),
    diary.next(CDiary, ix)
  );};



 function mkExtraHc(HcDiary, CDiary, ix)  {sys.$params(arguments.length, 3);  return mk(
    ix,

    [HcDiary.entries[ix]],
    cash.previous(HcDiary, ix),
    cash.next(HcDiary, ix),

    [],
    diary.previous(CDiary, ix),
    []
  );};



 function mkOk()  {sys.$params(arguments.length, 0);  return mk( -1, [], [], [], [], [], []);};






export  function firstProblem(HcDiary, CDiary)  {sys.$params(arguments.length, 2);
  const szHc =sys.$checkNull( arr.size(HcDiary.entries));
  const szC =sys.$checkNull( arr.size(CDiary.entries));
  const sz =sys.$checkNull(sys.asBool( szHc < szC) ? szHc : szC);

  for (let i = 0;i < sz; ++i)
    if (sys.asBool(!sys.asBool(cash.eqHcC(HcDiary.entries[i], CDiary.entries[i]))))
       return mkNormal(HcDiary, CDiary, i);

  if (sys.asBool(sys.$eq(sz , szHc))) {
    if (sys.asBool(sys.$eq(sz , szC)))  return mkOk();
     return mkExtraC(HcDiary, CDiary, sz);
  }

   return mkExtraHc(HcDiary, CDiary, sz);
};
