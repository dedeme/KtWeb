import * as arr from '../../../_js/arr.js';import * as bytes from '../../../_js/bytes.js';import * as storage from '../../../_js/storage.js';import * as sys from '../../../_js/sys.js';import * as client from '../../../_js/client.js';import * as b64 from '../../../_js/b64.js';import * as ui from '../../../_js/ui.js';import * as js from '../../../_js/js.js';import * as iter from '../../../_js/iter.js';import * as math from '../../../_js/math.js';import * as str from '../../../_js/str.js';import * as timer from '../../../_js/timer.js';import * as domo from '../../../_js/domo.js';import * as dic from '../../../_js/dic.js';import * as cryp from '../../../_js/cryp.js';import * as time from '../../../_js/time.js';




import * as cashEntry from  "../../../data/cashEntry.js";
import * as diaryEntry from  "../../../data/diaryEntry.js";
import * as diary from  "../../../data/diary.js";
import * as annsEditor from  "../../../pgs/budget/fixProblem/annsEditor.js";
import * as prEd from  "../../../pgs/budget/fixProblem/prEd.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);












export  function mk(tr,  hcEntry,  entry, ix, activated,
        deactivateAllFn, updateFn)  {sys.$params(arguments.length, 7);
  const activatedV = [activated];

  const imgDiv =sys.$checkNull( Q("div"));
  const annsDiv =sys.$checkNull( Q("div"));

  const showV = [[]];

  

  
   function activate()  {sys.$params(arguments.length, 0);
    deactivateAllFn();
    activatedV[0] =sys.$checkExists(activatedV[0], true);
    showV[0]();
  };

  
   function update()  {sys.$params(arguments.length, 0);
    updateFn(ix, entry);
  };

   const ed =sys.$checkNull( annsEditor.mk(annsDiv, entry, update));

  
   function deactivate()  {sys.$params(arguments.length, 0);
    activatedV[0] =sys.$checkExists(activatedV[0], false);
    showV[0]();
  };

  
   function updateAccount(acc)  {sys.$params(arguments.length, 1);
    if (activatedV[0]) prEd.updateAccount(ed,acc);};

  

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    if (activatedV[0]) {
      imgDiv
        .removeAll()
        .klass("frame")
        .add(ui.lightImg("insert"))
      ;
      prEd.active(ed,true);
    } else {
      imgDiv
        .removeAll()
        .klass("")
        .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); activate();})
          .klass("link")
          .add(ui.img("insert")))
      ;
      prEd.active(ed,false);
    }

    tr
      .removeAll()
      .add(Q("td")
        .add(imgDiv))
      .add(Q("td")
        .klass("frameTx")
        .text(entry[diaryEntry.month]))
      .add(Q("td")
        .klass("frameTx")
        .add(Q("div")
          .text(entry[diaryEntry.desc]))
        .add(annsDiv))
      .add(Q("td")
        .klass("frameNm")
        .text(math.toIso(entry[diaryEntry.am], 2)))

      .add(Q("td"))

      .add(Q("td")
        .klass("frameTx")
        .text(hcEntry[cashEntry.month]))
      .add(Q("td")
        .klass("frameTx")
        .text(hcEntry[cashEntry.desc]))
      .add(Q("td")
        .klass("frameNm")
        .text(math.toIso(hcEntry[cashEntry.am], 2)))
    ;
  });

  showV[0]();

   return {deactivate:deactivate, updateAccount:updateAccount};
};
