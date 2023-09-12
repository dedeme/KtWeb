import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../data/cts.js";
import * as plan from  "../data/plan.js";
import * as diary from  "../data/diary.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  async  function mk(wg, selectedYear)  {sys.$params(arguments.length, 2);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "PlanPg",
    rq: "idata",
    year: selectedYear
  }));
  const Plan =sys.$checkNull( plan.fromJs(Rp.plan));
  const Diary =sys.$checkNull( diary.fromJs(Rp.diary));

  const OldEntryOp =sys.$checkNull( []);

  const showOp =sys.$checkNull( [[]]);

  

  
   function updateServerPlan()  {sys.$params(arguments.length, 0);
     return client.ssend({
      prg: cts.appName,
      source: "PlanPg",
      rq: "updatePlan",
      year: selectedYear,
      plan: plan.toJs(Plan)
    });
  };

  
   function updateServerPlanAndDiary()  {sys.$params(arguments.length, 0);
     return client.ssend({
      prg: cts.appName,
      source: "PlanPg",
      rq: "updatePlanAndDiary",
      year: selectedYear,
      plan: plan.toJs(Plan),
      diary: diary.toJs(Diary)
    });
  };

  
   function reload()  {sys.$params(arguments.length, 0);
    arr.clear(OldEntryOp);
    showOp[0]();
  };

  
   async  function acceptEntry(Entry)  {sys.$params(arguments.length, 1);
    if (sys.asBool(OldEntryOp)) {
      const E =sys.$checkNull( OldEntryOp[0]);
      const r =sys.$checkNull( plan.modify(Plan, E.id, Entry, Diary));
      if (sys.asBool(sys.$neq(r , ""))) {
        ui.alert(r);
        return;
      }
      diary.changeAcc(Diary, E.id, Entry.id);
      await updateServerPlanAndDiary();
      reload();
    } else {
      const r =sys.$checkNull( plan.add(Plan, Entry));
      if (sys.asBool(sys.$neq(r , ""))) {
        ui.alert(r);
        return;
      }
      await updateServerPlan();
      reload();
    }
  };

  
   async  function del(id)  {sys.$params(arguments.length, 1);
    if (sys.asBool(!sys.asBool(ui.confirm(i18n.fmt(II("Delete %0?"), [id]))))) return;

    const r =sys.$checkNull( plan.del(Plan, id, diary.accs(Diary)));
    if (sys.asBool(sys.$neq(r , ""))) {
      ui.alert(r);
      return;
    }
    await updateServerPlan();
    reload();
  };

  
   function modify(Entry)  {sys.$params(arguments.length, 1);
    arr.clear(OldEntryOp);
    arr.push(OldEntryOp, Entry);
    showOp[0]();
  };

  

  
   function dataEntry()  {sys.$params(arguments.length, 0);
    const Entry =sys.$checkNull(sys.asBool( OldEntryOp) ? OldEntryOp[0] : plan.mkEntry(false, "", ""));

    const opInc =sys.$checkNull( Q("input")
      .att("type", "radio")
      .checked(Entry.isIncome)
      .att("name", "inc"))
    ;
    const opExp =sys.$checkNull( Q("input")
      .att("type", "radio")
      .checked(!sys.asBool(Entry.isIncome))
      .att("name", "inc"))
    ;
    const idWg =sys.$checkNull( ui.field("desc")
      .att("id", "autofocus")
      .style("width:80px")
      .value(Entry.id))
    ;
    const descWg =sys.$checkNull( ui.field("accept")
      .att("id", "desc")
      .style("width:200px")
      .value(Entry.desc))
    ;

    
     function mkEntry()  {sys.$params(arguments.length, 0);  return plan.mkEntry(
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

    if (sys.asBool(OldEntryOp)) {
      const E =sys.$checkNull( OldEntryOp[0]);
      table
        .add(Q("tr")
          .add(tdInfo(sys.asBool(E.isIncome) ? II("Income") : II("Expense"))
            .att("colspan", "5"))
          .add(tdInfo(E.id))
          .add(tdInfo(E.desc)))
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
      .html(sys.asBool(OldEntryOp)
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

  
   function mkTr(Entry)  {sys.$params(arguments.length, 1);  return Q("tr")
    .add(Q("td")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); del(Entry.id);})
        .add(ui.img("delete"))))
    .add(Q("td")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); modify(Entry);})
        .add(ui.img("edit"))))
    .add(Q("td")
      .style("border: 1px solid rgb(110,130,150)")
      .text(Entry.id))
    .add(Q("td")
      .style("border: 1px solid rgb(110,130,150)")
      .text(Entry.desc))
  ;};

  
   function entriesTable(isIncomes)  {sys.$params(arguments.length, 1);
    const div =sys.$checkNull( Q("div")
      .add(Q("div")
        .klass("head")
        .html(sys.asBool(isIncomes) ? II("Incomes") : II("Expenses"))))
    ;

    const Es =sys.$checkNull( arr.filter(Plan.entries, function(E)  {sys.$params(arguments.length, 1);  return sys.$eq(E.isIncome , isIncomes);}));



    if (sys.asBool(Es)) {
      const Trs =sys.$checkNull( []); 
      for (const E  of sys.$forObject( Es)) arr.push(Trs, mkTr(E));
      div.add(Q("table")
        .att("align", "center")
        .adds(Trs));
    } else {
      div.add(withoutAccountsTable());
    }

     return div;
  };

  showOp[0] =sys.$checkExists(showOp[0], function()  {sys.$params(arguments.length, 0);
    arr.sort(
      Plan.entries, function(E1, E2)  {sys.$params(arguments.length, 2);  return str.toUpper(E1.id) < str.toUpper(E2.id);}
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
