import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as global from  "../global.js";
import * as cts from  "../cts.js";
import * as plan from  "../data/plan.js";
import * as planEntry from  "../data/planEntry.js";
import * as diary from  "../data/diary.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  async  function mk(wg, selectedYear)  {sys.$params(arguments.length, 2);
   const {Plan, 
   CDiary, 
  dbKey}
  = await  client.send({
    prg: cts.appName,
    source: "PlanPg",
    rq: "idata",
    year: selectedYear
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
   const Diary =sys.$checkNull( arr.map(CDiary,diaryEntry.fromJs)); 

  const oldEntryOp = []; 

  const showOp = [[]];

  

  
   async  function updateServerPlan()  {sys.$params(arguments.length, 0);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "PlanPg",
      rq: "updatePlan",
      dbKey: global.dbKeyV[0],
      year: selectedYear,
      plan: Plan
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
  };

  
   async  function updateServerPlanAndDiary()  {sys.$params(arguments.length, 0);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "PlanPg",
      rq: "updatePlanAndDiary",
      dbKey: global.dbKeyV[0],
      year: selectedYear,
      plan: Plan,
      diary: Diary
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
  };

  
   function reload()  {sys.$params(arguments.length, 0);
    arr.clear(oldEntryOp);
    showOp[0]();
  };

  
   async  function acceptEntry( entry)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(oldEntryOp)) {
      const r =sys.$checkNull( plan.add(Plan, entry));
      if (sys.$neq(r , "")) {
        ui.alert(r);
        return;
      }
      await updateServerPlan();
      reload();
    } else {
       const e =sys.$checkNull( oldEntryOp[0]);
      const r =sys.$checkNull( plan.modify(Plan,e[planEntry.id], entry, Diary));
      if (sys.$neq(r , "")) {
        ui.alert(r);
        return;
      }
      diary.changeAcc(Diary,e[planEntry.id], entry[planEntry.id]);
      await updateServerPlanAndDiary();
      reload();
    }
  };

  
   async  function del(id)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Delete %0?"), [id])))) return;

    const r =sys.$checkNull( plan.del(Plan,id, diary.accs(Diary)));
    if (sys.$neq(r , "")) {
      ui.alert(r);
      return;
    }
    await updateServerPlan();
    reload();
  };

  
   function modify(entry)  {sys.$params(arguments.length, 1);
    arr.clear(oldEntryOp);
    arr.push(oldEntryOp, entry);
    showOp[0]();
  };

  

  
   function dataEntry()  {sys.$params(arguments.length, 0);
     const entry =sys.$checkNull( !sys.asBool(oldEntryOp) ? planEntry.mk(false, "", "") : oldEntryOp[0]);

    const opInc =sys.$checkNull( Q("input")
      .att("type", "radio")
      .checked(entry[planEntry.isIncome])
      .att("name", "inc"))
    ;
    const opExp =sys.$checkNull( Q("input")
      .att("type", "radio")
      .checked(!sys.asBool(entry[planEntry.isIncome]))
      .att("name", "inc"))
    ;
    const idWg =sys.$checkNull( ui.field("desc")
      .att("id", "autofocus")
      .style("width:80px")
      .value(entry[planEntry.id]))
    ;
    const descWg =sys.$checkNull( ui.field("accept")
      .att("id", "desc")
      .style("width:200px")
      .value(entry[planEntry.desc]))
    ;

    
     function mkEntry()  {sys.$params(arguments.length, 0);  return planEntry.mk(
        opInc.isChecked(),
        sys.$slice(str.trim(idWg.getValue()),null,6),
        str.trim(descWg.getValue())
      );};

    
     function th(tx)  {sys.$params(arguments.length, 1);  return Q("td")
        .style(
            "background-color: #c9c9c9;text-align: center;" +
            "border: 1px solid rgb(110,130,150)"
          )
        .html(tx)
      ;};

    
     function tdInfo(tx)  {sys.$params(arguments.length, 1);  return Q("td")
        .style("color:#C9C9C9;text-align:center")
        .text(tx)
      ;};


    const table =sys.$checkNull( Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(th(II("Type")).att("colspan", "5"))
        .add(th(II("Id")))
        .add(th(II("Description"))))
      .add(Q("tr")
        .add(Q("td").add(opInc))
        .add(Q("td").text(II("Income")))
        .add(Q("td").style("width: 5px"))
        .add(Q("td").add(opExp))
        .add(Q("td").text(II("Expense")))

        .add(Q("td").add(idWg))
        .add(Q("td").add(descWg))))
    ;

    if (!sys.asBool(!sys.asBool(oldEntryOp))) {
       const e =sys.$checkNull( oldEntryOp[0]);
      table
        .add(Q("tr")
          .add(tdInfo(e[planEntry.isIncome] ? II("Income") : II("Expense"))
            .att("colspan", "5"))
          .add(tdInfo(e[planEntry.id]))
          .add(tdInfo(e[planEntry.desc])))
      ;
    }

    table
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "7")
          .style("text-align: right")
          .add(Q("button")
            .text(II("Cancel"))
            .on("click", function(e)  {sys.$params(arguments.length, 1); reload();}))
          .add(Q("span").html("&nbsp;"))
          .add(Q("button")
            .att("id", "accept")
            .text(II("Accept"))
            .on("click", function(e)  {sys.$params(arguments.length, 1); acceptEntry(mkEntry());}))))
    ;

     return table;
  };

  
   function entryWg()  {sys.$params(arguments.length, 0);  return Q("div")
    .add(Q("div")
      .klass("head")
      .html(!sys.asBool(!sys.asBool(oldEntryOp))
        ? II("Modification")
        : II("New Account")))
    .add(dataEntry())
  ;};

  
   function withoutAccountsTable()  {sys.$params(arguments.length, 0);  return Q("table")
    .klass("main")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame")
        .style("text-align: center")
        .text(II("Without Accounts"))))
  ;};

  
   function mkTr( entry)  {sys.$params(arguments.length, 1);  return Q("tr")
    .add(Q("td")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); del(entry[planEntry.id]);})
        .add(ui.img("delete"))))
    .add(Q("td")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); modify(entry);})
        .add(ui.img("edit"))))
    .add(Q("td")
      .style("border: 1px solid rgb(110,130,150)")
      .text(entry[planEntry.id]))
    .add(Q("td")
      .style("border: 1px solid rgb(110,130,150)")
      .text(entry[planEntry.desc]))
  ;};

  
   function entriesTable(isIncomes)  {sys.$params(arguments.length, 1);
    const div =sys.$checkNull( Q("div")
      .add(Q("div")
        .klass("head")
        .html(isIncomes ? II("Incomes") : II("Expenses"))))
    ;

     const Es =sys.$checkNull( arr.filter(Plan, function( e)  {sys.$params(arguments.length, 1);  return sys.$eq(e[planEntry.isIncome] , isIncomes);}));

    if (!sys.asBool(Es)) {
      div.add(withoutAccountsTable());
    } else {
       const Trs = []; 
      for (const e  of sys.$forObject( Es)) arr.push(Trs,mkTr(e));
      div.add(Q("table")
        .att("align", "center")
        .adds(Trs));
    }

     return div;
  };

  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
    arr.sort(
      Plan,
      function( e1,  e2)  {sys.$params(arguments.length, 2);
         return str.toUpper(e1[planEntry.id]) < str.toUpper(e2[planEntry.id]);}
    );

    wg
      .removeAll()
      .add(Q("div")
        .klass("head")
        .html(II("Accounting Plan")))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", "2")
            .klass("frame")
            .style("text-align: center")
            .add(entryWg())))
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .style("vertical-align: top; width:50%")
            .add(entriesTable(true)))
          .add(Q("td")
            .klass("frame")
            .style("vertical-align: top; width:50%")
            .add(entriesTable(false)))))
    ;
  });

  showOp[0]();
};
