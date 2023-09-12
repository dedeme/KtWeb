import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as cts from  "../../data/cts.js";
import * as diary from  "../../data/diary.js";
import * as del from  "../../pgs/budget/fixProblem/del.js";
import * as modify from  "../../pgs/budget/fixProblem/modify.js";
import * as newEntry from  "../../pgs/budget/fixProblem/newEntry.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, selectedYear, Plan, Diary, Problem, fnReload)  {sys.$params(arguments.length, 6);
  const delTr =sys.$checkNull( 0);
  const newTr =sys.$checkNull( 1);
  const modifyTr =sys.$checkNull( 2);

  const Trs =sys.$checkNull( [Q("tr"), Q("tr"), Q("tr")]);
  
  const TrWgs =sys.$checkNull( [[], [], []]); 

  const updateLockedV =sys.$checkNull( [false]);

  const showOp =sys.$checkNull( [[]]);
  

  
   async  function updateServer()  {sys.$params(arguments.length, 0);
    if (sys.asBool(updateLockedV[0])) return;
    updateLockedV[0] =sys.$checkExists(updateLockedV[0],sys.$checkNull( true));

    await client.ssend({
      prg: cts.appName,
      source: "FixProblem",
      rq: "updateDiary",
      year: selectedYear,
      diary: diary.toJs(Diary)
    });
    fnReload();
  };

  
   function updateAccount(acc)  {sys.$params(arguments.length, 1);
    for (const EdOp  of sys.$forObject( TrWgs)) if (sys.asBool(EdOp)) EdOp[0].updateAccount(acc);};

  
   function deactivateAll()  {sys.$params(arguments.length, 0);
    for (let i = 0;i < 3; ++i) if (sys.asBool(TrWgs[i])) TrWgs[i][0].deactivate();};

  
   function deleteDiaryEntry(ix)  {sys.$params(arguments.length, 1);
    arr.remove(Diary.entries, ix);
    updateServer();
  };

  
   function addDiaryEntry(ix, E)  {sys.$params(arguments.length, 2);
    arr.insert(Diary.entries, ix, E);
    updateServer();
  };

  
   function modifyDiaryEntry(ix, E)  {sys.$params(arguments.length, 2);
    Diary.entries[ix] =sys.$checkExists(Diary.entries[ix],sys.$checkNull( E));
    updateServer();
  };

  

  
   function mkCtas(ctasDiv)  {sys.$params(arguments.length, 1);
    const Es =sys.$checkNull(sys.asBool( Problem.hcErr)
      ?sys.asBool( Problem.hcErr[0].isIncome)
        ? arr.filter(Plan.entries, function(E)  {sys.$params(arguments.length, 1);  return E.isIncome;})
        : arr.filter(Plan.entries, function(E)  {sys.$params(arguments.length, 1);  return !sys.asBool(E.isIncome);})
      : [])
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
          .adds(arr.map(Es, function(E)  {sys.$params(arguments.length, 1);  return Q("tr")
              .add(Q("td")
                .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); updateAccount(E.id);})
                  .klass("link")
                  .att("title", E.desc)
                  .text(E.id)))
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

    const Hcps =sys.$checkNull( Problem.hcPrevs);
    const Cps =sys.$checkNull( Problem.cPrevs);
    const Hcns =sys.$checkNull( Problem.hcNexts);
    const Cns =sys.$checkNull( Problem.cNexts);

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
            if (sys.asBool(i < arr.size(Cps))) {
              tr.add(tdTx(Cps[i].month));
              tr.add(tdTx(Cps[i].desc));
              tr.add(tdNm(Cps[i].am));
            } else {
              for (let i = 0;i < 3; ++i) tr.add(tdTx(""));
            }
            tr.add(Q("td"));
            if (sys.asBool(i < arr.size(Hcps))) {
              tr.add(tdTx(Hcps[i].month));
              tr.add(tdTx(Hcps[i].desc));
              tr.add(tdNm(Hcps[i].am));
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
            iter.filter(iter.$range(0,3), function(i)  {sys.$params(arguments.length, 1);  return sys.asBool(true) && sys.asBool(TrWgs[i]);}),
            function(i)  {sys.$params(arguments.length, 1);  return Trs[i];}
          ))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", "10"))
            .style("height:15px"))
        .adds(iter.map(iter.$range(0,5), function(i)  {sys.$params(arguments.length, 1);
            const tr =sys.$checkNull( Q("tr"));
            tr.add(Q("td"));
            if (sys.asBool(i < arr.size(Cns))) {
              tr.add(tdTx(Cns[i].month));
              tr.add(tdTx(Cns[i].desc));
              tr.add(tdNm(Cns[i].am));
            } else {
              for (let i = 0;i < 3; ++i) tr.add(tdTx(""));
            }
            tr.add(Q("td"));
            if (sys.asBool(i < arr.size(Hcns))) {
              tr.add(tdTx(Hcns[i].month));
              tr.add(tdTx(Hcns[i].desc));
              tr.add(tdNm(Hcns[i].am));
            } else {
              for (let i = 0;i < 3; ++i) tr.add(tdTx(""));
            }
             return tr;
          })))
    ;
  };

  
  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
    if (sys.asBool(Problem.hcErr)) {
      const Hce =sys.$checkNull( Problem.hcErr[0]);
      if (sys.asBool(Problem.cErr)) {
        TrWgs[delTr] =sys.$checkExists(TrWgs[delTr],sys.$checkNull( [del.mk(
          Trs[delTr],
          Diary.entries[Problem.ix],
          Problem.ix,
          false,
          deactivateAll, deleteDiaryEntry
        )]));
        TrWgs[newTr] =sys.$checkExists(TrWgs[newTr],sys.$checkNull( [newEntry.mk(
          Trs[newTr],
          Plan,
          Hce,
          diary.mkEntry(Hce.month, Hce.desc, Hce.isIncome, [
              diary.mkAnnotation("", Hce.am)
            ]),
          Problem.ix,
          false,
          deactivateAll, addDiaryEntry
        )]));
        TrWgs[modifyTr] =sys.$checkExists(TrWgs[modifyTr],sys.$checkNull( [modify.mk(
          Trs[modifyTr],
          Plan,
          Hce,
          diary.mkEntry(Hce.month, Hce.desc, Hce.isIncome,
            Diary.entries[Problem.ix].anns
          ),
          Problem.ix,
          false,
          deactivateAll, modifyDiaryEntry
        )]));
      } else {
        TrWgs[newTr] =sys.$checkExists(TrWgs[newTr],sys.$checkNull( [newEntry.mk(
          Trs[newTr],
          Plan,
          Hce,
          diary.mkEntry(Hce.month, Hce.desc, Hce.isIncome, [
              diary.mkAnnotation("", Hce.am)
            ]),
          Problem.ix,
          true,
          deactivateAll, addDiaryEntry
        )]));
      }
    } else {
      if (sys.asBool(Problem.cErr)) {
        TrWgs[delTr] =sys.$checkExists(TrWgs[delTr],sys.$checkNull( [del.mk(
          Trs[delTr],
          Diary.entries[Problem.ix],
          Problem.ix,
          true,
          deactivateAll, deleteDiaryEntry
        )]));
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
