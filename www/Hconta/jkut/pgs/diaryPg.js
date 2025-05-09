import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as datePicker from  "../libdm/datePicker.js";
import * as accountSelector from  "../wgs/accountSelector.js";
import * as all from  "../data/all.js";
import * as acc from  "../data/acc.js";
import * as cts from  "../cts.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as msgPg from  "../pgs/msgPg.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, account, ix)  {sys.$params(arguments.length, 3);
  const ac =sys.$checkNull( sys.$eq(acc.descriptionOf(account) , "") || str.len(account) > 3 ? "" : account);
  const acV = [sys.$eq(ac , "") || !sys.asBool(dic.hasKey(acc.accounts(), ac)) ? sys.$slice(cts.cash,null,3) : ac];
  const dlenV = [arr.size(acc.diary())];
  const ixn =sys.$checkNull( math.isDigits(ix) ? math.toInt(math.fromStr(ix)[0]) : dlenV[0] - 1);
  const ixFirstRowV = [ixn >= dlenV[0] ? dlenV[0] - 1 : ixn];

  const ixEditedV = [ -1];
  const dateEditedV = [""];

  const EntryRows = []; 
  const entryAccSelV = [ui.field("")];
  const editDiv =sys.$checkNull( Q("div"));
  const listDiv =sys.$checkNull( Q("div"));
  const dpV = [datePicker.mk(i18n.getLang(), time.now(), function(s)  {sys.$params(arguments.length, 1);})];
  const dateField =sys.$checkNull( Q("input")
    .att("type", "text")
    .klass("frame")
    .style("width:80px;color:#000000;text-align:center;"))
  ;
  const number =sys.$checkNull( Q("input")
    .att("type", "text").klass("frame")
    .style(
      "width:50px;background-color:#f0f0ff;color:#000000;" +
      "text-align:center;"
    )
    .disabled(true))
  ;
  const description =sys.$checkNull( ui.field("debit")
    .att("id", "description")
    .style("width:270px"))
  ;

  const entryV = [[]];
  const listV = [[]];

  

  
   function newClick(e)  {sys.$params(arguments.length, 1);
    ixEditedV[0] =sys.$checkExists(ixEditedV[0],  -1);
    dateEditedV[0] =sys.$checkExists(dateEditedV[0], "");
    editDiv.removeAll().add(entryV[0]());
  };

  
   function upClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1 && ixFirstRowV[0] < arr.size(acc.diary()) - 1) {
      ixFirstRowV[0] +=sys.$checkExists(ixFirstRowV[0], 1);
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function downClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] > 0) {
      ixFirstRowV[0] -=sys.$checkExists(ixFirstRowV[0], 1);
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function dupClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1) {
      ixFirstRowV[0] +=sys.$checkExists(ixFirstRowV[0],sys.$checkNull( math.toInt(cts.tableLen / 2)));
      if (ixFirstRowV[0] >= arr.size(acc.diary())) {
        ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0], arr.size(acc.diary()) - 1);
      }
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function ddownClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1) {
      ixFirstRowV[0] -=sys.$checkExists(ixFirstRowV[0],sys.$checkNull( math.toInt(cts.tableLen / 2)));
      if (ixFirstRowV[0] < 0) ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0], 0);
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function topClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0], arr.size(acc.diary()) - 1);
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function bottomClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0], cts.tableLen - 1);
      if (ixFirstRowV[0] >= arr.size(acc.diary()))
        ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0], arr.size(acc.diary()) - 1);
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function monthClick(m)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV >  -1) {
      const Diary =sys.$checkNull( acc.diary());
      const len =sys.$checkNull( arr.size(Diary));
      const iV = [0];
      while (true) {
         const e =sys.$checkNull( Diary[iV[0]]);
        iV[0] +=sys.$checkExists(iV[0], 1);
        if (time.month(e[diaryEntry.date]) >= m || sys.$eq(iV[0] , len)) break;
      }
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0], iV[0] - 1);
      listDiv.removeAll().add(listV[0]());
    }
  };

  

  
   async  function deleteClick(diaryIx)  {sys.$params(arguments.length, 1);
    if (ui.confirm(i18n.fmt(
      II("Delete annotation %0:\n%1?"),
      ["" + (diaryIx + 1), acc.diary()[diaryIx].description]
    ))) {
      editDiv.removeAll();
      arr.remove(acc.diary(), diaryIx);
      const dlen =sys.$checkNull( arr.size(acc.diary()));
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( ixFirstRowV[0] >= dlen ? dlen - 1 : ixFirstRowV[0]));
      const ok =sys.$checkNull( await  all.send());
      if (!sys.asBool(ok)) {
        msgPg.mk(wg, II("Data base out of date."), true);
        return;
      }
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function modifyClick(diaryIx)  {sys.$params(arguments.length, 1);
    ixEditedV[0] =sys.$checkExists(ixEditedV[0], diaryIx);
    dateEditedV[0] =sys.$checkExists(dateEditedV[0],sys.$checkNull( time.toStr(acc.diary()[diaryIx][diaryEntry.date])));
    editDiv.removeAll().add(entryV[0]());
  };

  
   function cancelEntry(ev)  {sys.$params(arguments.length, 1); editDiv.removeAll();};

  
   async  function acceptEntry(ev)  {sys.$params(arguments.length, 1);
    const dateOp =sys.$checkNull( datePicker.getDate(dpV[0]));
    if (!sys.asBool(dateOp)) {
      ui.alert(II("Date is missing"));
      return;
    }
    const date =sys.$checkNull( dateOp[0]);

    const desc =sys.$checkNull( str.trim(description.getValue()));
    if (sys.$eq(desc , "")) {
      ui.alert(II("Description is missing"));
      return;
    }

    const Debits = {}; 
    const Credits = {}; 
    const dsumV = [0];
    const csumV = [0];
    for (const E  of sys.$forObject( EntryRows)) {
      const ac =sys.$checkNull( str.replace(E[0].getText(), ".", ""));
      if (dic.hasKey(Debits, ac) || dic.hasKey(Credits, ac)) {
        ui.alert(i18n.fmt(II("Account %0 is repeated"), [acc.accFormat(ac)]));
        return;
      }

      const dAmOp =sys.$checkNull( fns.float(E[1].getValue()));
      if (!sys.asBool(dAmOp)) {
        ui.alert(i18n.fmt(II("'%0' is not a number"), [E[1].getValue()]));
        return;
      }
      const dAm =sys.$checkNull( dAmOp[0]);
      if (sys.$neq(dAm , 0)) {
        if (sys.$eq(ac , "")) {
          ui.alert(i18n.fmt(
            II("Account for ammount %0 is missing"), ["" + dAm]
          ));
          return;
        }
        dic.put(Debits, ac, dAm);
        dsumV[0] +=sys.$checkExists(dsumV[0], dAm);
      }

      const ac2 =sys.$checkNull( str.replace(E[3].getText(), ".", ""));
      if (dic.hasKey(Debits, ac2) || dic.hasKey(Credits, ac2)) {
        ui.alert(i18n.fmt(II("Account %0 is repeated"), [acc.accFormat(ac2)]));
        return;
      }

      const cAmOp =sys.$checkNull( fns.float(E[2].getValue()));
      if (!sys.asBool(cAmOp)) {
        ui.alert(i18n.fmt(II("'%0' is not a number"), [E[2].getValue()]));
        return;
      }
      const cAm =sys.$checkNull( cAmOp[0]);
      if (sys.$neq(cAm , 0)) {
        if (sys.$eq(ac2 , "")) {
          ui.alert(i18n.fmt(
            II("Account for ammount %0 is missing"), ["" + cAm]
          ));
          return;
        }
        dic.put(Credits, ac2, cAm);
        csumV[0] +=sys.$checkExists(csumV[0], cAm);
      }
    }

    if (!sys.asBool(math.eq(dsumV[0], csumV[0], 0.00001))) {
      ui.alert(II("Debits sum is different from Credits sum"));
      return;
    }

    if (sys.$eq(dsumV[0] , 0)) {
      ui.alert(II("Sums of Debits and Credits are zero"));
      return;
    }

    const Dentry =sys.$checkNull( diaryEntry.mk(date, desc, Debits, Credits));

    const ixV = [ixEditedV[0]];
    if (sys.$eq(ixEditedV[0] ,  -1)) {
      ixV[0] =sys.$checkExists(ixV[0], acc.addDiary(Dentry) + 4);
    } else if (sys.$neq(dateEditedV[0] , time.toStr(date))) {
      arr.remove(acc.diary(), ixEditedV[0]);
      ixV[0] =sys.$checkExists(ixV[0], acc.addDiary(Dentry) + 4);
    } else {
      acc.diary()[ixEditedV[0]] =sys.$checkExists(acc.diary()[ixEditedV[0]], Dentry);
    }
    dlenV[0] =sys.$checkExists(dlenV[0],sys.$checkNull( arr.size(acc.diary())));
    ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( ixV[0] >= dlenV[0] ? dlenV[0] - 1 : ixV[0]));

    const ok =sys.$checkNull( await  all.send());
    if (!sys.asBool(ok)) {
      msgPg.mk(wg, II("Data base out of date."), true);
      return;
    }
    editDiv.removeAll();
    listDiv.removeAll().add(listV[0]());
  };

  

  
  entryV[0] =sys.$checkExists(entryV[0], function()  {sys.$params(arguments.length, 0);
    
    const mkWgV = [[]];

    
     function mkAccEntry()  {sys.$params(arguments.length, 0);
      const i =sys.$checkNull( Q("div")
        .klass("frame")
        .style(
          "width:48px;color:#000000;background-color:#ffffff;" +
          "text-align:center;vertical-align:middle;"
        ))
      ;
      i.on("dblclick", function(e)  {sys.$params(arguments.length, 1); i.html("");});
       return i;
    };

    
     function mkAmmountEntry(ac)  {sys.$params(arguments.length, 1);
      const amm =sys.$checkNull( ui.field("accept")
        .style("width:65px")
        .on("focus", function(e)  {sys.$params(arguments.length, 1); entryAccSelV[0] =sys.$checkExists(entryAccSelV[0], ac);}))
      ;
      ui.changePoint(amm);
       return amm;
    };

    
     function addEntryRow(ev)  {sys.$params(arguments.length, 1);
      const d =sys.$checkNull( mkAccEntry());
      const c =sys.$checkNull( mkAccEntry());
      arr.push(EntryRows, [d, mkAmmountEntry(d), mkAmmountEntry(c), c]);
      editDiv.removeAll().add(mkWgV[0]());
    };

    
     function removeEntryRow(ev)  {sys.$params(arguments.length, 1);
      if (arr.size(EntryRows) > 1) {
        arr.pop(EntryRows);
        editDiv.removeAll().add(mkWgV[0]());
      }
    };

    
     function autoSum(ev)  {sys.$params(arguments.length, 1);
      const dsumV = [0];
      const csumV = [0];
      for (const E  of sys.$forObject( EntryRows)) {
        for (let i = 1;i < 3; ++i) {
          const vOp =sys.$checkNull( fns.float(E[i].getValue()));
          if (!sys.asBool(vOp)) {
            ui.alert(i18n.fmt(II("'%0' is not a number"), [E[i].getValue()]));
            return;
          } else {
            if (sys.$eq(i , 1)) dsumV[0] +=sys.$checkExists(dsumV[0],sys.$checkNull( vOp[0]));
            else csumV[0] +=sys.$checkExists(csumV[0],sys.$checkNull( vOp[0]));
          }
        }
      }
      if (sys.$eq(csumV[0] , dsumV[0])) {
        ui.alert(II("Difference is 0"));
        return;
      }
      const iV = [1];
      const vV = [csumV[0] - dsumV[0]];
      if (vV[0] < 0) {
        iV[0] +=sys.$checkExists(iV[0], 1);
        vV[0] =sys.$checkExists(vV[0],  -vV[0]);
      }
      const am =sys.$checkNull( math.toIso(vV[0], 2));

      for (const E  of sys.$forObject( EntryRows)) {
        if (sys.$eq(str.trim(E[iV[0]].getValue()) , "")) {
          E[iV[0]].value(am);
          return;
        }
      }
      addEntryRow(ev);
      arr.peek(EntryRows)[iV[0]].value(am);
    };

    const Diary =sys.$checkNull( acc.diary());

    const dateV = [time.now()];
    if (sys.$eq(ixEditedV[0] ,  -1)) {
      number.value("");
      if (arr.size(Diary) > 0) dateV[0] =sys.$checkExists(dateV[0],sys.$checkNull( arr.peek(Diary)[diaryEntry.date]));
      description.value("");
      const d =sys.$checkNull( mkAccEntry());
      const c =sys.$checkNull( mkAccEntry());
      arr.clear(EntryRows);
      arr.push(EntryRows, [d, mkAmmountEntry(d), mkAmmountEntry(c), c]);
    } else {
       const dentry =sys.$checkNull( Diary[ixEditedV[0]]);
      number.value("" + (ixEditedV[0] + 1));
      dateV[0] =sys.$checkExists(dateV[0],sys.$checkNull( dentry[diaryEntry.date]));
      description.value(dentry[diaryEntry.description]);
      const Ds =sys.$checkNull( dentry[diaryEntry.debits]);
      const Cs =sys.$checkNull( dentry[diaryEntry.credits]);
      const Dkeys =sys.$checkNull( dic.keys(Ds));
      const Ckeys =sys.$checkNull( dic.keys(Cs));
      const dlen =sys.$checkNull( arr.size(Dkeys));
      const clen =sys.$checkNull( arr.size(Ckeys));
      const mxlen =sys.$checkNull( dlen > clen ? dlen : clen);
      arr.clear(EntryRows);
      for (let i = 0;i < mxlen; ++i) {
        const d =sys.$checkNull( mkAccEntry().text(i >= dlen ? "" : acc.accFormat(Dkeys[i])));
        const c =sys.$checkNull( mkAccEntry().text(i >= clen ? "" : acc.accFormat(Ckeys[i])));
        arr.push(
          EntryRows,
          [
            d,
            mkAmmountEntry(d).value(i >= dlen ? "" : math.toIso(Ds[Dkeys[i]], 2)),
            mkAmmountEntry(c).value(i >= clen ? "" : math.toIso(Cs[Ckeys[i]], 2)),
            c
          ]
        );
      }
    }
    dpV[0] =sys.$checkExists(dpV[0],sys.$checkNull( datePicker.mk(i18n.getLang(), dateV[0], function(s)  {sys.$params(arguments.length, 1);})));

    mkWgV[0] =sys.$checkExists(mkWgV[0], function()  {sys.$params(arguments.length, 0);
       return Q("table")
        .att("align", "center")
        .klass("frame")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .style("text-align:left")
            .add(datePicker.mkText(dpV[0], dateField)))
          .add(Q("td")
            .att("colspan", 3)
            .add(ui.link(autoSum)
              .klass("diary")
              .html("&nbsp;&nbsp;S&nbsp;&nbsp;"))
            .add(Q("span")
              .html(" · "))
            .add(ui.link(addEntryRow)
              .klass("diary")
              .html("+"))
            .add(Q("span")
              .html(" "))
            .add(ui.link(removeEntryRow)
              .klass("diary")
              .html("-")))
          .add(Q("td")
            .att("colspan", 2)
            .style("text-align:right;")
            .add(number)))
        .add(Q("tr")
          .add(Q("td").att("colspan", 7).add(description)))
        .adds(arr.map(EntryRows, function(E)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .style("text-align:left;width:5px")
              .add(E[0]))
            .add(Q("td")
              .att("colspan", 2)
              .style("text-align:left")
              .add(E[1]))
            .add(Q("td")
              .html("||"))
            .add(Q("td")
              .att("colspan", 2)
              .style("text-align:right")
              .add(E[2]))
            .add(Q("td")
              .style("text-align:right")
              .add(E[3]))
          ;}))
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", 7)
              .style("text-align:right")
              .add(Q("button")
                .text(II("Cancel"))
                .style("width:100px")
                .on("click", cancelEntry))
              .add(Q("span")
                .html("&nbsp;&nbsp;"))
              .add(Q("button")
                .text(II("Accept"))
                .style("width:100px")
                .att("id", "accept")
                .on("click", acceptEntry))))
      ;
    });

     return mkWgV[0]();
  });

  
  listV[0] =sys.$checkExists(listV[0], function()  {sys.$params(arguments.length, 0);
    
     function td()  {sys.$params(arguments.length, 0);  return Q("td").klass("frame").style("vertical-align:top;");};
    
     function tdr()  {sys.$params(arguments.length, 0);  return td().setStyle("text-align", "right");};
    
     function tdl()  {sys.$params(arguments.length, 0);  return td().setStyle("text-align", "left");};
    const cutV = [ixFirstRowV[0] + 1];
     return Q("table")
      .att("align", "center")
      .adds(arr.map(
          arr.reverse(
            arr.drop(arr.take(acc.diary(), cutV[0]), cutV[0] - cts.tableLen)
          ),
          function( e)  {sys.$params(arguments.length, 1);
            cutV[0] -=sys.$checkExists(cutV[0], 1);
            const lix =sys.$checkNull( cutV[0]);
            const Dkeys =sys.$checkNull( arr.map(dic.toArr(e[diaryEntry.debits]), function(Kv)  {sys.$params(arguments.length, 1);  return Kv[0];}));
            const Ckeys =sys.$checkNull( arr.map(dic.toArr(e[diaryEntry.credits]), function(Kv)  {sys.$params(arguments.length, 1);  return Kv[0];}));
            const dlen =sys.$checkNull( arr.size(Dkeys));
            const clen =sys.$checkNull( arr.size(Ckeys));
            const n =sys.$checkNull( dlen > clen ? dlen : clen);

            const descDentry =sys.$checkNull( Q("table")
              .att("align", "center")
              .adds(iter.map(iter.$range(0,n), function(i)  {sys.$params(arguments.length, 1);  return Q("tr")
                  .add(td().add(i < dlen
                    ? Q("a")
                      .att("href", "?accs&" + Dkeys[i] + "&" + lix)
                      .att("title", acc.subaccounts()[Dkeys[i]])
                      .html(acc.accFormat(Dkeys[i]))
                    : Q("span")))
                  .add(tdr().add(i < dlen
                    ? Q("span").html(math.toIso(e[diaryEntry.debits][Dkeys[i]], 2))
                    : Q("span")))
                  .add(Q("td").html("||"))
                  .add(tdr().add(i < clen
                    ? Q("span").html(math.toIso(e[diaryEntry.credits][Ckeys[i]], 2))
                    : Q("span")))
                  .add(td().add(i < clen
                    ? Q("a")
                      .att("href", "?accs&" + Ckeys[i] + "&" + lix)
                      .att("title", acc.subaccounts()[Ckeys[i]])
                      .html(acc.accFormat(Ckeys[i]))
                    : Q("span")))
                ;})))
            ;
            descDentry.e.style.display =sys.$checkExists(descDentry.e.style.display, "none");
            const desc =sys.$checkNull( Q("div")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1);
                  descDentry.e.style.display =sys.$checkExists(descDentry.e.style.display,sys.$checkNull(
                    sys.$eq(descDentry.e.style.display , "none") ? "block" : "none"));}
                ).klass("link").html(e[diaryEntry.description]))
              .add(descDentry));
             return Q("tr")
              .add(Q("td").add(
                sys.$eq(lix , 0)
                  ? Q("span").add(ui.lightImg("delete"))
                  : ui.link(function(ev)  {sys.$params(arguments.length, 1); deleteClick(lix);})
                    .add(ui.img("delete"))))
              .add(tdr().html("" + (lix + 1)))
              .add(td().add(
                all.isLastYear()
                  ? ui.link(function(e)  {sys.$params(arguments.length, 1); modifyClick(lix);})
                    .klass("link")
                    .html(time.fmt(e[diaryEntry.date], "%D/%M"))
                  : Q("span")
                    .style("color:#800000;")
                    .html(time.fmt(e[diaryEntry.date], "%D/%M"))))
              .add(tdl().add(desc))
              .add(tdr().html(math.toIso(
                  arr.reduce(
                    dic.toArr(e[diaryEntry.debits]), 0, function(s,
                    Kv)  {sys.$params(arguments.length, 2);  return s + Kv[1];}
                  ), 2
                )))
            ;

          }
        ))
    ;
  });

  
   function helpAccountClick(account, desc)  {sys.$params(arguments.length, 2);
    acV[0] =sys.$checkExists(acV[0], sys.$slice(account,null,3));
    entryAccSelV[0]
      .att("title", desc)
      .text(acc.accFormat(account))
    ;
  };

  
   function left()  {sys.$params(arguments.length, 0);  return accountSelector.mk(acV[0], helpAccountClick, false).wg;};

  
   function right()  {sys.$params(arguments.length, 0);
    const r =sys.$checkNull( Q("td")
      .style("text-align:center;vertical-align:top;")
      .add(Q("div")
        .klass("head")
        .text(II("Diary")))
      .add(editDiv)
      .add(Q("hr"))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td").att("colspan", 2))
          .add(Q("td").att("colspan", 2).klass("diary").add(
            all.isLastYear()
              ? ui.link(newClick).html(II("New"))
              : Q("span").style("color: #800000;").html(II("New"))))
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
          .add(Q("td").att("colspan", 2)))
        .add(Q("tr")
          .adds(iter.map(iter.$range(1,13), function(i)  {sys.$params(arguments.length, 1);  return Q("td")
              .klass("diary")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); monthClick(i);})
                .html("&nbsp;" + i + "&nbsp;"))
            ;}))))
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
        .add(all.isLastYear() ? left() : Q("div"))
        .add(right())))
  ;
};
