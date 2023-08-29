import * as iter from '../_js/iter.js';import * as str from '../_js/str.js';import * as bytes from '../_js/bytes.js';import * as cryp from '../_js/cryp.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as js from '../_js/js.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as math from '../_js/math.js';import * as domo from '../_js/domo.js';import * as ui from '../_js/ui.js';import * as arr from '../_js/arr.js';import * as time from '../_js/time.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';




import * as datePicker from  "../libdm/datePicker.js";
import * as all from  "../data/all.js";
import * as acc from  "../data/acc.js";
import * as cts from  "../data/cts.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as accountSelector from  "../wgs/accountSelector.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, account, ix)  {sys.$params(arguments.length, 3);
  const ac =sys.$checkNull(sys.asBool( sys.asBool(sys.$eq(acc.descriptionOf(account) , "")) || sys.asBool(str.len(account) > 3)) ? "" : account);
  const acV =sys.$checkNull( [sys.asBool(sys.asBool(sys.$eq(ac , "")) || sys.asBool(!sys.asBool(dic.hasKey(acc.accounts(), ac)))) ? sys.$slice(cts.cash,null,3) : ac]);
  const CashEntryIxs =sys.$checkNull( acc.usedSubaccounts(cts.cash));
  const lastIx =sys.$checkNull(sys.asBool( CashEntryIxs) ? arr.peek(CashEntryIxs) :  -1);

  const ixn =sys.$checkNull(sys.asBool( math.isDigits(ix)) ? math.toInt(math.fromStr(ix)[0]) : lastIx);
  const ixFirstRowV =sys.$checkNull( [sys.asBool(ixn >= lastIx) ? lastIx : ixn]);

  const accIn =sys.$checkNull( Q("input")
    .att("type", "text")
    .klass("frame")
    .style("width:50px;color:#000000;text-align:center;")
    .disabled(true))
  ;
  const description =sys.$checkNull( ui.field("amm")
    .att("id", "autofocus")
    .style("width:270px")
    .on("focus", function(e)  {sys.$params(arguments.length, 1); description.e.select();}))
  ;
  const ammIn =sys.$checkNull( ui.field("accept")
    .att("id", "amm")
    .style("width:65px")
    .on("focus", function(e)  {sys.$params(arguments.length, 1); ammIn.e.select();}))
  ;
  const listDiv =sys.$checkNull( Q("div"));

  const dpV =sys.$checkNull( [datePicker.mk(i18n.getLang(), time.now(), function(s)  {sys.$params(arguments.length, 1);})]);
  const listV =sys.$checkNull( [[]]);

  

  
   async  function accept(ev)  {sys.$params(arguments.length, 1);
    const dateOp =sys.$checkNull( datePicker.getDate(dpV[0]));
    if (sys.asBool(!sys.asBool(dateOp))) {
      ui.alert(II("Date is missing"));
      return;
    }
    const date =sys.$checkNull( dateOp[0]);

    const a =sys.$checkNull( str.replace(str.trim(accIn.getValue()), ".", ""));
    if (sys.asBool(!sys.asBool(a))) {
      ui.alert(II("Account is missing"));
      return;
    }

    const desc =sys.$checkNull( str.trim(description.getValue()));
    if (sys.asBool(!sys.asBool(desc))) {
      ui.alert(II("Description is missing"));
      return;
    }

    const amOp =sys.$checkNull( fns.float(ammIn.getValue()));
    if (sys.asBool(!sys.asBool(amOp))) {
      ui.alert(i18n.fmt(II("'%0' is not a number"), [ammIn.getValue()]));
      return;
    }
    const am =sys.$checkNull( amOp[0]);
    if (sys.asBool(sys.$eq(am , 0))) {
      ui.alert(II("Ammount is 0"));
      return;
    }

    const Debits =sys.$checkNull( {}); 
    if (sys.asBool(am > 0)) dic.put(Debits, cts.cash, am);
    else dic.put(Debits, a,  -am);

    const Credits =sys.$checkNull( {}); 
    if (sys.asBool(am > 0)) dic.put(Credits, a, am);
    else dic.put(Credits, cts.cash,  -am);

    const Dentry =sys.$checkNull( diaryEntry.mk(date, desc, Debits, Credits));
    const ix =sys.$checkNull( acc.addDiary(Dentry) + 4);

    arr.clear(CashEntryIxs);
    arr.cat(CashEntryIxs, acc.usedSubaccounts(cts.cash));
    ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull(sys.asBool( CashEntryIxs) ? arr.peek(CashEntryIxs) :  -1));
    if (sys.asBool(ix < ixFirstRowV[0])) ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( ix));

    await all.send();
    accIn.value("");
    description.value("");
    ammIn.value("");
    listDiv.removeAll().add(listV[0]());
  };

  
   function getEntriesIndex(ix)  {sys.$params(arguments.length, 1);
    const size =sys.$checkNull( arr.size(CashEntryIxs));
    for (let i = 0;i < size; ++i)
      if (sys.asBool(sys.$eq(CashEntryIxs[i] , ix)))  return i;

     return size - 1;
  };

  
   function upClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]));
    if (sys.asBool(sys.asBool(ixFirstRowV[0] >  -1) && sys.asBool(i < arr.size(CashEntryIxs) - 1))) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[i + 1]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function downClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]));
    if (sys.asBool(i > 0)) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[i - 1]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function dupClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]) + math.toInt(cts.tableLen / 2));
    if(sys.asBool(ixFirstRowV[0] >  -1)) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull(sys.asBool( i < arr.size(CashEntryIxs))
        ? CashEntryIxs[i]
        : arr.peek(CashEntryIxs)))
      ;
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function ddownClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]) - math.toInt(cts.tableLen / 2));
    if (sys.asBool(i > 0)) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[i]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function topClick(e)  {sys.$params(arguments.length, 1);
    if (sys.asBool(ixFirstRowV[0] >  -1)) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( arr.peek(CashEntryIxs)));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function bottomClick(e)  {sys.$params(arguments.length, 1);
    if (sys.asBool(ixFirstRowV[0] >  -1)) {
      const iV =sys.$checkNull( [cts.tableLen - 1]);
      if (sys.asBool(iV[0] >= arr.size(CashEntryIxs))) iV[0] =sys.$checkExists(iV[0],sys.$checkNull( arr.size(CashEntryIxs) - 1));
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[iV[0]]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function monthClick(m)  {sys.$params(arguments.length, 1);
    if (sys.asBool(ixFirstRowV[0] >  -1)) {
      const Diary =sys.$checkNull( acc.diary());
      const size =sys.$checkNull( arr.size(CashEntryIxs));
      const iV =sys.$checkNull( [0]);
      while (sys.asBool(true)) {
        const E =sys.$checkNull( Diary[CashEntryIxs[iV[0]]]);
        iV[0] +=sys.$checkExists(iV[0],sys.$checkNull( 1));
        if (sys.asBool(sys.asBool(time.month(E.date) >= m) || sys.asBool(sys.$eq(iV[0] , size)))) break;
      }
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[iV[0] - 1]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  

  const dateField =sys.$checkNull( Q("input")
    .att("type", "text")
    .klass("frame")
    .style("width:80px;color:#000000;text-align:center;"))
  ;
  const acceptBt =sys.$checkNull( Q("button")
    .att("id", "accept")
    .html(II("Accept"))
    .on("click", accept))
  ;

  
   function helpAccountClick(account, desc)  {sys.$params(arguments.length, 2);
    acV[0] =sys.$checkExists(acV[0],sys.$checkNull( sys.$slice(account,null,3)));
    accIn
      .att("title", desc)
      .value(acc.accFormat(account))
    ;

    const Sels =sys.$checkNull( []); 
    
     function addSels(desc, val)  {sys.$params(arguments.length, 2);
      const toDoV =sys.$checkNull( [true]);
      for (let E  of sys.$forObject( Sels)) {
        if (sys.asBool(sys.asBool(sys.$eq(E.desc , desc)) && sys.asBool(sys.$eq(E.val , val)))){
          E.n +=sys.$checkExists(E.n,sys.$checkNull( 1));
          toDoV[0] =sys.$checkExists(toDoV[0],sys.$checkNull( false));
          break;
        }
      }
      if (sys.asBool(toDoV[0])) arr.push(Sels, {n: 1, desc:desc, val:val});
    };

    for (let E  of sys.$forObject( acc.diary())) {
      const Debits =sys.$checkNull( E.debits);
      const Credits =sys.$checkNull( E.credits);
      if (sys.asBool(
        sys.asBool(sys.asBool(sys.$eq(dic.size(Debits) , 1)) &&
        sys.asBool(sys.$eq(dic.size(Credits) , 1))) &&
        sys.asBool((sys.asBool(dic.hasKey(Debits, cts.cash)) || sys.asBool(dic.hasKey(Credits, cts.cash)))))
      ) {
        if (sys.asBool(dic.hasKey(Debits, account)))
          addSels(E.description, "-" + math.toIso(Debits[account], 2));
        if (sys.asBool(dic.hasKey(Credits, account)))
          addSels(E.description, math.toIso(Credits[account], 2));
      }
    }

    if (sys.asBool(Sels)) {
      const nV =sys.$checkNull( [0]);
      const descV =sys.$checkNull( [""]);
      const valV =sys.$checkNull( [""]);
      for (let E  of sys.$forObject( Sels)) {
        if (sys.asBool(E.n >= nV[0])) {
          nV[0] =sys.$checkExists(nV[0],sys.$checkNull( E.n));
          descV[0] =sys.$checkExists(descV[0],sys.$checkNull( E.desc));
          valV[0] =sys.$checkExists(valV[0],sys.$checkNull( E.val));
        }
      }
      description.value(descV[0]);
      ammIn.value(valV[0]);
    }

    description.e.focus();
  };

  
  listV[0] =sys.$checkExists(listV[0], function()  {sys.$params(arguments.length, 0);
    const Diary =sys.$checkNull( acc.diary());
    const sumV =sys.$checkNull( [0]);
    const Entries =sys.$checkNull( arr.map(CashEntryIxs, function(i)  {sys.$params(arguments.length, 1);
      const E =sys.$checkNull( Diary[i]);
      const ammV =sys.$checkNull( [0]);
      for (let a  of sys.$forObject( E.debits)) if (sys.asBool(sys.$eq(a , cts.cash))) ammV[0] =sys.$checkExists(ammV[0],sys.$checkNull( E.debits[a]));
      for (let a  of sys.$forObject( E.credits)) if (sys.asBool(sys.$eq(a , cts.cash))) ammV[0] =sys.$checkExists(ammV[0],sys.$checkNull(  -E.credits[a]));
      sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( ammV[0]));
       return {
        ix: i,
        date: E.date,
        desc: E.description,
        amm: ammV[0],
        sum: sumV[0]
      };
    }));

    
     function td()  {sys.$params(arguments.length, 0);  return Q("td").klass("frame").style("vertical-align:top;");};
    
     function tdr()  {sys.$params(arguments.length, 0);  return td().setStyle("text-align", "right");};
    
     function tdl()  {sys.$params(arguments.length, 0);  return td().setStyle("text-align", "left");};

    const cutV =sys.$checkNull( [0]);
    for (let ix = 0;ix < arr.size(Entries); ++ix) {
      const E =sys.$checkNull( Entries[ix]);
      if (sys.asBool(E.ix >= ixFirstRowV[0])) {
        cutV[0] =sys.$checkExists(cutV[0],sys.$checkNull( ix + 1));
        break;
      }
    }
     return Q("table")
      .att("align", "center")
      .adds(arr.map(
        arr.reverse(arr.drop(arr.take(Entries, cutV[0]), cutV[0] - cts.tableLen)),
        function(E)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(tdr()
              .html("" + (E.ix + 1)))
            .add(td()
              .html(time.fmt("%D/%M", E.date)))
            .add(tdl()
              .add(ui.link(function(ev)  {sys.$params(arguments.length, 1);
                  window.location.assign("?diary&" + acV[0] + "&" + E.ix);}
                ).klass("link")
                .html(E.desc)))
            .add(tdr()
              .html(math.toIso(E.amm, 2)))
            .add(tdr()
              .html(math.toIso(E.sum, 2)))
          ;}));
  });

  
   function left()  {sys.$params(arguments.length, 0);  return accountSelector.mk(acV[0], helpAccountClick, true).wg;};

  
   function right()  {sys.$params(arguments.length, 0);
    dpV[0] =sys.$checkExists(dpV[0],sys.$checkNull( datePicker.mk(
      i18n.getLang(), time.now(), function(m)  {sys.$params(arguments.length, 1); description.e.focus();}
    )));
    ui.changePoint(ammIn);
    if (sys.asBool(!sys.asBool(all.isLastYear()))) {
      description.disabled(true);
      ammIn.disabled(true);
      acceptBt.disabled(true);
    }

    const r =sys.$checkNull( Q("td")
      .style("text-align:center;vertical-align:top;")
      .add(Q("div")
        .klass("head")
        .text(II("Cash")))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td").add(datePicker.mkText(dpV[0], dateField)))
          .add(Q("td").add(accIn))
          .add(Q("td").add(description))
          .add(Q("td").add(ammIn))
          .add(Q("td").add(acceptBt))))
      .add(Q("hr"))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td").att("colspan", 3))
          .add(Q("td").klass("diary").add(ui.link(upClick)
            .setStyle("font-family", "monospace").html("&nbsp;\u2191&nbsp;")))
          .add(Q("td").klass("diary").add(ui.link(downClick)
            .setStyle("font-family", "monospace").html("&nbsp;\u2193&nbsp;")))
          .add(Q("td").klass("diary").add(ui.link(dupClick)
            .setStyle("font-family", "monospace").html("\u2191\u2191")))
          .add(Q("td").klass("diary").add(ui.link(ddownClick)
            .setStyle("font-family", "monospace").html("\u2193\u2193")))
          .add(Q("td").klass("diary").add(ui.link(topClick)
            .setStyle("font-family", "monospace").html("&nbsp;\u2912&nbsp;")))
          .add(Q("td").klass("diary").add(ui.link(bottomClick)
            .setStyle("font-family", "monospace").html("&nbsp;\u2913&nbsp;")))
          .add(Q("td").att("colspan", 3)))
        .add(Q("tr")
          .adds(arr.fromIter(iter.map(iter.$range(1,13), function(i)  {sys.$params(arguments.length, 1);  return Q("td")
              .klass("diary")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); monthClick(i);})
                .html("&nbsp;" + i + "&nbsp;"));}
            )))))
      .add(Q("hr"))
      .add(listDiv))
    ;

    listDiv.add(listV[0]());
     return r;
  };

  wg
    .removeAll()
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(sys.asBool(all.isLastYear()) ? left() : Q("div"))
        .add(right())))
  ;
};
