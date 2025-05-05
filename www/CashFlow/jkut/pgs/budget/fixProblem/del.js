import * as arr from '../../../_js/arr.js';import * as bytes from '../../../_js/bytes.js';import * as storage from '../../../_js/storage.js';import * as sys from '../../../_js/sys.js';import * as client from '../../../_js/client.js';import * as b64 from '../../../_js/b64.js';import * as ui from '../../../_js/ui.js';import * as js from '../../../_js/js.js';import * as iter from '../../../_js/iter.js';import * as math from '../../../_js/math.js';import * as str from '../../../_js/str.js';import * as timer from '../../../_js/timer.js';import * as domo from '../../../_js/domo.js';import * as dic from '../../../_js/dic.js';import * as cryp from '../../../_js/cryp.js';import * as time from '../../../_js/time.js';




import * as prEd from  "../../../pgs/budget/fixProblem/prEd.js";
import * as delEditor from  "../../../pgs/budget/fixProblem/delEditor.js";
import * as diaryEntry from  "../../../data/diaryEntry.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);










export  function mk(tr,  cEntry, ix, activated, deactivateAllFn, updateFn)  {sys.$params(arguments.length, 6);
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
    updateFn(ix);
  };

   const delEd =sys.$checkNull( delEditor.mk(annsDiv, cEntry, update));

  
   function deactivate()  {sys.$params(arguments.length, 0);
    activatedV[0] =sys.$checkExists(activatedV[0], false);
    showV[0]();
  };

  
   function updateAccount(acc)  {sys.$params(arguments.length, 1);
    
  };

  

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    if (activatedV[0]) {
      imgDiv
        .removeAll()
        .klass("frame")
        .add(ui.lightImg("delete"))
      ;
      prEd.active(delEd,true);
    } else {
      imgDiv
        .removeAll()
        .klass("")
        .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); activate();})
          .klass("link")
          .add(ui.img("delete")))
      ;
      prEd.active(delEd,false);
    }

    tr
      .removeAll()
      .add(Q("td")
        .add(imgDiv))
      .add(Q("td")
        .klass("frameTx")
        .text(cEntry[diaryEntry.month]))
      .add(Q("td")
        .klass("frameTx")
        .add(Q("div")
          .text(cEntry[diaryEntry.desc]))
        .add(annsDiv))
      .add(Q("td")
        .klass("frameNm")
        .text(math.toIso(cEntry[diaryEntry.am], 2)))

      .add(Q("td"))

      .add(Q("td"))
      .add(Q("td"))
      .add(Q("td"))
    ;
  });

  showV[0]();

   return {deactivate:deactivate, updateAccount:updateAccount};
};
