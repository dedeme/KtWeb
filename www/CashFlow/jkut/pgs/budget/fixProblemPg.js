import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as global from  "../../global.js";
import * as cts from  "../../cts.js";
import * as diary from  "../../data/diary.js";
import * as dann from  "../../data/dann.js";
import * as problem from  "../../data/problem.js";
import * as cashEntry from  "../../data/cashEntry.js";
import * as planEntry from  "../../data/planEntry.js";
import * as diaryEntry from  "../../data/diaryEntry.js";
import * as prEd from  "../../pgs/budget/fixProblem/prEd.js";
import * as del from  "../../pgs/budget/fixProblem/del.js";
import * as modify from  "../../pgs/budget/fixProblem/modify.js";
import * as newEntry from  "../../pgs/budget/fixProblem/newEntry.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, selectedYear,  Plan,  Diary,  prob, fnReload)  {sys.$params(arguments.length, 6);
  const [delTr, newTr, modifyTr] =[0, 1, 2];

  const trs = [Q("tr"), Q("tr"), Q("tr")];
  
  const trWgs = [[], [], []]; 

  const updateLockedV = [false];

  const showOp = [[]];

  

  
   async  function updateServer()  {sys.$params(arguments.length, 0);
    if (updateLockedV[0]) return;
    updateLockedV[0] =sys.$checkExists(updateLockedV[0], true);

     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "FixProblem",
      rq: "updateDiary",
      dbKey: global.dbKeyV[0],
      year: selectedYear,
      diary: arr.map(Diary,diaryEntry.toJs)
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
    fnReload();
  };

  
   function updateAccount(acc)  {sys.$params(arguments.length, 1);
    for (const edOp  of sys.$forObject( trWgs)) if (!sys.asBool(!sys.asBool(edOp))) {
       const ed =sys.$checkNull( edOp[0]);
      prEd.updateAccount(ed,acc);
    }};

  
   function deactivateAll()  {sys.$params(arguments.length, 0);
    for (const edOp  of sys.$forObject( trWgs)) if (!sys.asBool(!sys.asBool(edOp))) {
       const ed =sys.$checkNull( edOp[0]);
      prEd.deactivate(ed);
    }};

  
   function deleteDiaryEntry(ix)  {sys.$params(arguments.length, 1);
    arr.remove(Diary,ix);
    updateServer();
  };

  
   function addDiaryEntry(ix, e)  {sys.$params(arguments.length, 2);
    arr.insert(Diary,ix, e);
    updateServer();
  };

  
   function modifyDiaryEntry(ix, e)  {sys.$params(arguments.length, 2);
    Diary[ix] =sys.$checkExists(Diary[ix], e);
    updateServer();
  };

  

  
   function mkCtas(ctasDiv)  {sys.$params(arguments.length, 1);
    
     const Es =sys.$checkNull( !sys.asBool(prob[problem.hcErrOp])
      ? []
      : function()  {sys.$params(arguments.length, 0);
           const e =sys.$checkNull( prob[problem.hcErrOp][0]);
           return e[cashEntry.isIncome]
            ? arr.filter(Plan,function( e)  {sys.$params(arguments.length, 1);  return e[planEntry.isIncome];})
            : arr.filter(Plan,function( e)  {sys.$params(arguments.length, 1);  return !sys.asBool(e[planEntry.isIncome]);})
          ;
        } ())
    ;
     return ctasDiv
      .add(Q("div")
        .style("padding-top:40px"))
      .add(Q("div")
        .klass("frame")
        .add(Q("table")
          .add(Q("tr")
            .add(Q("td")
              .html("<b>" + II("Accounts") + "</b>")))
          .add(Q("tr")
            .add(Q("td")
              .add(Q("hr"))))
          .adds(arr.map(Es,function( e)  {sys.$params(arguments.length, 1);  return Q("tr")
              .add(Q("td")
                .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); updateAccount(e[planEntry.id]);})
                  .klass("link")
                  .att("title", e[planEntry.desc])
                  .text(e[planEntry.id])))
            ;}))))
    ;
  };

  
   function mkBody(bodyDiv)  {sys.$params(arguments.length, 1);
    
     function tdTx(tx)  {sys.$params(arguments.length, 1);  return Q("td")
      .klass("frameTx")
      .text(tx)
    ;};

    
     function tdNm(n)  {sys.$params(arguments.length, 1);  return Q("td")
      .klass("frameNm")
      .text(math.toIso(n, 2))
    ;};

     const Hcps =sys.$checkNull( prob[problem.HcPrevs]);
     const Cps =sys.$checkNull( prob[problem.CPrevs]);
     const Hcns =sys.$checkNull( prob[problem.HcNexts]);
     const Cns =sys.$checkNull( prob[problem.CNexts]);

     return bodyDiv
      .add(Q("div")
        .klass("head")
        .text(II("Fix Problem")))
      .add(Q("table")
        .att("align", "center")
        .klass("summary")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", "4")
            .style("text-align:center")
            .html("<b>CashFlow</b>"))
          .add(Q("td")
            .style("padding-left:5px"))
          .add(Q("td")
            .att("colspan", "3")
            .style("text-align:center")
            .html("<b>Hconta</b>")))
        .adds(iter.map(iter.$range(0,5), function(i)  {sys.$params(arguments.length, 1);
            const tr =sys.$checkNull( Q("tr"));
            tr.add(Q("td"));
            if (i < arr.size(Cps)) {
               const e =sys.$checkNull( Cps[i]);
              tr.add(tdTx(e[diaryEntry.month]));
              tr.add(tdTx(e[diaryEntry.desc]));
              tr.add(tdNm(e[diaryEntry.am]));
            } else {
              for (let i = 0;i < 3; ++i) tr.add(tdTx(""));
            }
            tr.add(Q("td"));
            if (i < arr.size(Hcps)) {
               const e =sys.$checkNull( Hcps[i]);
              tr.add(tdTx(e[cashEntry.month]));
              tr.add(tdTx(e[cashEntry.desc]));
              tr.add(tdNm(e[cashEntry.am]));
            } else {
              for (let i = 0;i < 3; ++i) tr.add(tdTx(""));
            }
             return tr;
          }))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", "10"))
            .style("height:15px"))
        .adds(iter.map(
            iter.filter(iter.$range(0,3), function(i)  {sys.$params(arguments.length, 1);  return !sys.asBool(!sys.asBool(trWgs[i]));}),
            function(i)  {sys.$params(arguments.length, 1);  return trs[i];}
          ))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", "10"))
            .style("height:15px"))
        .adds(iter.map(iter.$range(0,5), function(i)  {sys.$params(arguments.length, 1);
            const tr =sys.$checkNull( Q("tr"));
            tr.add(Q("td"));
            if (i < arr.size(Cns)) {
               const e =sys.$checkNull( Cns[i]);
              tr.add(tdTx(e[diaryEntry.month]));
              tr.add(tdTx(e[diaryEntry.desc]));
              tr.add(tdNm(e[diaryEntry.am]));
            } else {
              for (let i = 0;i < 3; ++i) tr.add(tdTx(""));
            }
            tr.add(Q("td"));
            if (i < arr.size(Hcns)) {
               const e =sys.$checkNull( Hcns[i]);
              tr.add(tdTx(e[cashEntry.month]));
              tr.add(tdTx(e[cashEntry.desc]));
              tr.add(tdNm(e[cashEntry.am]));
            } else {
              for (let i = 0;i < 3; ++i) tr.add(tdTx(""));
            }
             return tr;
          })))
    ;
  };

  
  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
    if (!sys.asBool(prob[problem.hcErrOp])) {
      if (!sys.asBool(!sys.asBool(prob[problem.cErrOp]))) {
        trWgs[delTr] =sys.$checkExists(trWgs[delTr], [del.mk(
          trs[delTr],
          Diary[prob[problem.ix]],
          prob[problem.ix],
          true,
          deactivateAll, deleteDiaryEntry
        )]);
      }
    } else {
       const hce =sys.$checkNull( prob[problem.hcErrOp][0]);
      if (!sys.asBool(prob[problem.cErrOp])) {
        trWgs[newTr] =sys.$checkExists(trWgs[newTr], [newEntry.mk(
          trs[newTr],
          hce,
          diaryEntry.mk(hce[cashEntry.month], hce[cashEntry.desc], hce[cashEntry.isIncome], [
              dann.mk("", hce[cashEntry.am])
            ]),
          prob[problem.ix],
          true,
          deactivateAll, addDiaryEntry
        )]);
      } else {
        trWgs[delTr] =sys.$checkExists(trWgs[delTr], [del.mk(
          trs[delTr],
          Diary[prob[problem.ix]],
          prob[problem.ix],
          false,
          deactivateAll, deleteDiaryEntry
        )]);
        trWgs[newTr] =sys.$checkExists(trWgs[newTr], [newEntry.mk(
          trs[newTr],
          hce,
          diaryEntry.mk(hce[cashEntry.month], hce[cashEntry.desc], hce[cashEntry.isIncome], [
              dann.mk("", hce[cashEntry.am])
            ]),
          prob[problem.ix],
          false,
          deactivateAll, addDiaryEntry
        )]);
        trWgs[modifyTr] =sys.$checkExists(trWgs[modifyTr], [modify.mk(
          trs[modifyTr],
          diaryEntry.mk(hce[cashEntry.month], hce[cashEntry.desc], hce[cashEntry.isIncome],
            js.r(js.w(Diary[prob[problem.ix]][diaryEntry.Anns]))
          ),
          prob[problem.ix],
          false,
          deactivateAll, modifyDiaryEntry
        )]);
      }
    }

    const ctasDiv =sys.$checkNull( Q("div"));
    mkCtas(ctasDiv);
    const bodyDiv =sys.$checkNull( Q("div"));
    mkBody(bodyDiv);
    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("width:5px;vertical-align:top")
            .add(ctasDiv))
          .add(Q("td")
            .style("vertical-align:top")
            .add(bodyDiv))))
    ;
  });

  showOp[0]();

};
