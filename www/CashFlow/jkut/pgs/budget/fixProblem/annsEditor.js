import * as math from '../../../_js/math.js';import * as js from '../../../_js/js.js';import * as arr from '../../../_js/arr.js';import * as client from '../../../_js/client.js';import * as bytes from '../../../_js/bytes.js';import * as str from '../../../_js/str.js';import * as ui from '../../../_js/ui.js';import * as dic from '../../../_js/dic.js';import * as timer from '../../../_js/timer.js';import * as time from '../../../_js/time.js';import * as storage from '../../../_js/storage.js';import * as b64 from '../../../_js/b64.js';import * as sys from '../../../_js/sys.js';import * as iter from '../../../_js/iter.js';import * as domo from '../../../_js/domo.js';import * as cryp from '../../../_js/cryp.js';




import * as diary from  "../../../data/diary.js";
import * as diaryEntry from  "../../../data/diaryEntry.js";
import * as dann from  "../../../data/dann.js";
import * as numberField from  "../../../wgs/numberField.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  function mk(wg,  entry, fnOk)  {sys.$params(arguments.length, 3);
  const am =sys.$checkNull( entry[diaryEntry.am]);
   const Anns =sys.$checkNull( entry[diaryEntry.Anns]);
   const Sels = []; 
  for (let i = 0;i < arr.size(Anns); ++i)
    arr.push(Sels,Q("input")
      .att("type", "radio")
      .att("id", "in" + i)
      .att("name", "selAnn")
    );
  Sels[0].checked(true);

  const activatedV = [false];

  const showV = [[]];

  

  
   function active(value)  {sys.$params(arguments.length, 1);
    activatedV[0] =sys.$checkExists(activatedV[0], value);
    showV[0]();
  };

  
   function updateAccount(acc)  {sys.$params(arguments.length, 1);
    const ixV = [0];
    for ( const [i, a]  of sys.$forObject2( Anns))
        if (Sels[i].isChecked()) {
          Anns[i] =sys.$checkExists(Anns[i],sys.$checkNull( dann.mk(acc, a[dann.am])));
          ixV[0] =sys.$checkExists(ixV[0], i);
        }

    showV[0]();
    Q("#nf" + ixV[0]).e.focus();
  };

  
   function updateAmount(fieldId, newValue)  {sys.$params(arguments.length, 2);
    const i =sys.$checkNull( math.fromStr(sys.$slice(fieldId,2,null))[0]);
     const oldAnn =sys.$checkNull( Anns[i]);
    Anns[i] =sys.$checkExists(Anns[i],sys.$checkNull( dann.mk(oldAnn[dann.id], newValue)));
    const sum =sys.$checkNull( iter.reduce(iter.$range(0,arr.size(Anns) - 1), 0, function(r, i)  {sys.$params(arguments.length, 2);
       const a =sys.$checkNull( Anns[i]);
       return r + a[dann.am];
    }));

    if (sum > am) {
      ui.alert(i18n.fmt(
        II("Sum of account values (%0) is greater than cash value (%1)"),
        [math.toIso(sum, 2), math.toIso(am, 2)]
      ));
      Anns[i] =sys.$checkExists(Anns[i], oldAnn);
      showV[0]();
      Q("#" + fieldId).e.focus();
      return;
    }

     const lastAnn =sys.$checkNull( arr.peek(Anns));
    Anns[arr.size(Anns) - 1] =sys.$checkExists(Anns[arr.size(Anns)-1],sys.$checkNull( dann.mk(lastAnn[dann.id], am - sum)));
    showV[0]();
  };

  
   function addAcc(ev)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( arr.size(Anns));
    arr.push(Sels,Q("input")
      .att("type", "radio")
      .att("id", "in" + i)
      .att("name", "selAnn")
      .checked(true)
    );
    arr.push(Anns,dann.mk("", 0));
    showV[0]();
  };

  
   function delAcc(ev)  {sys.$params(arguments.length, 1);
    arr.pop(Sels);
    arr.pop(Anns);

    Sels[0].checked(true);

    const sum =sys.$checkNull( iter.reduce(iter.$range(0,arr.size(Anns) - 1), 0, function(r, i)  {sys.$params(arguments.length, 2);
       const a =sys.$checkNull( Anns[i]);
       return r + a[dann.am];
    }));
     const lastAnn =sys.$checkNull( arr.peek(Anns));
    Anns[arr.size(Anns) - 1] =sys.$checkExists(Anns[arr.size(Anns)-1],sys.$checkNull( dann.mk(lastAnn[dann.id], am - sum)));
    showV[0]();
  };

  
   function ok(ev)  {sys.$params(arguments.length, 1);
    const sumV = [0];
    const ixV = [1];
    for (const  a  of sys.$forObject( Anns)) {
      if (sys.$eq(a[dann.id] , "")) {
        ui.alert(i18n.fmt(
          II("Account of annotation '%0' is missing"), ["" +ixV[0]]
        ));
        return;
      }
      sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( a[dann.am]));
      ixV[0] +=sys.$checkExists(ixV[0], 1);
    }

    if (!sys.asBool(math.eq(sumV[0], am, 0.0001))) {
      ui.alert(i18n.fmt(
        II("Sum of annotations (%0) does not match the cash value (%1)"),
        [math.toIso(sumV[0], 2), math.toIso(am, 2)]
      ));
      return;
    }

    fnOk();
  };

  
   function fastOk(acc)  {sys.$params(arguments.length, 1);
    if (sys.$neq(arr.size(Anns) , 1)) {
      ui.alert(II("Fast ok only works with one entry"));
      return;
    }
     const a0 =sys.$checkNull( Anns[0]);
    Anns[0] =sys.$checkExists(Anns[0],sys.$checkNull( dann.mk(acc, a0[dann.am])));
    ok([]);
  };

  

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    wg.removeAll();
    if (!sys.asBool(activatedV[0])) return;

    wg
      .add(Q("table")
      .klass("main")
      .adds(iter.map(iter.$range(0,arr.size(Anns)), function(i)  {sys.$params(arguments.length, 1);
         const a =sys.$checkNull( Anns[i]);
         return Q("tr")
          .add(Q("td")
            .style("width: 5px")
            .add(Sels[i]))
          .add(Q("td")
            .klass("frameTx")
            .text(sys.$eq(a[dann.id] , "") ? "---" : a[dann.id]))
          .add(Q("td")
            .add(numberField.mk(
                "nf" + i,
                "in" + (sys.$eq(i , arr.size(Anns) - 1) ? 0 : i + 1),
                a[dann.am],
                updateAmount)))
        ;}))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "3")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align: left")
          .add(ui.link(addAcc).add(ui.img("add"))))
        .add(Q("td")
          .style("text-align: left")
          .add(arr.size(Anns) > 1
              ? ui.link(delAcc).add(ui.img("delete"))
              : ui.lightImg("delete")
            ))
        .add(Q("td")
          .style("text-align: right")
          .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); fastOk("HOSTEL");})
            .klass("link")
            .setStyle("vertical-align", "top")
            .text("H"))
          .add(Q("span").html("&nbsp;"))
          .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); fastOk("SUPERS");})
            .klass("link")
            .setStyle("vertical-align", "top")
            .text("S"))
          .add(Q("span").html("&nbsp;"))
          .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); fastOk("VACAS");})
            .klass("link")
            .setStyle("vertical-align", "top")
            .text("V"))
          .add(Q("span").html("&nbsp;&nbsp;&nbsp;&nbsp;"))
          .add(ui.link(ok).add(ui.img("ok")))

          )))
    ;
  });

  showV[0]();

   return {active:active, updateAccount:updateAccount};
};
