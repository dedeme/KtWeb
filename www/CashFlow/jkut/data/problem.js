import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cash from  "../data/cash.js";
import * as cashEntry from  "../data/cashEntry.js";
import * as diary from  "../data/diary.js";











export function mk (ix,hcErrOp,HcPrevs,HcNexts,cErrOp,CPrevs,CNexts) { sys.$params(arguments.length, 7); return [ ix, hcErrOp, HcPrevs, HcNexts, cErrOp, CPrevs, CNexts];}export const ix = 0;export const hcErrOp = 1;export const HcPrevs = 2;export const HcNexts = 3;export const cErrOp = 4;export const CPrevs = 5;export const CNexts = 6;



 function mkNormal( HcDiary,  CDiary, ix)  {sys.$params(arguments.length, 3);  return mk(
    ix,

    [HcDiary[ix]],
    cash.previous(HcDiary, ix),
    cash.next(HcDiary, ix),

    [CDiary[ix]],
    diary.previous(CDiary, ix),
    diary.next(CDiary, ix)
  );};



 function mkExtraC( HcDiary,  CDiary, ix)  {sys.$params(arguments.length, 3);  return mk(
    ix,

    [],
    cash.previous(HcDiary, ix),
    [],

    [CDiary[ix]],
    diary.previous(CDiary, ix),
    diary.next(CDiary, ix)
  );};



 function mkExtraHc( HcDiary,  CDiary, ix)  {sys.$params(arguments.length, 3);  return mk(
    ix,

    [HcDiary[ix]],
    cash.previous(HcDiary, ix),
    cash.next(HcDiary, ix),

    [],
    diary.previous(CDiary, ix),
    []
  );};



 function mkOk()  {sys.$params(arguments.length, 0);  return mk( -1, [], [], [], [], [], []);};






export  function firstProblem( HcDiary,  CDiary)  {sys.$params(arguments.length, 2);
  const szHc =sys.$checkNull( arr.size(HcDiary));
  const szC =sys.$checkNull( arr.size(CDiary));
  const sz =sys.$checkNull( szHc < szC ? szHc : szC);

  for (let i = 0;i < sz; ++i)
    if (!sys.asBool(cashEntry.eqDiaryEntry(HcDiary[i], CDiary[i])))
       return mkNormal(HcDiary, CDiary, i);

  if (sys.$eq(sz , szHc)) {
    if (sys.$eq(sz , szC))  return mkOk();
     return mkExtraC(HcDiary, CDiary, sz);
  }

   return mkExtraHc(HcDiary, CDiary, sz);
};
