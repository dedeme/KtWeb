import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as acc from  "../data/acc.js";
import * as accValue from  "../data/accValue.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as cts from  "../cts.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, account, ix)  {sys.$params(arguments.length, 3);
  
   function mostUsed()  {sys.$params(arguments.length, 0);
    const As =sys.$checkNull( acc.mostUsedSubaccounts(false));
     return !sys.asBool(As)
      ? ""
      : sys.$eq(As[0][0] , cts.cash)
        ? As[1][0]
        : As[0][0]
    ;
  };

  const ac =sys.$checkNull( sys.$eq(account , "") || sys.$eq(acc.descriptionOf(account) , "")
    ? sys.$eq(account , "*") ? "" : mostUsed()
    : account)
  ;

   const CashEntryIxs =sys.$checkNull( acc.usedAccs(ac));
  const lastIx =sys.$checkNull( !sys.asBool(CashEntryIxs) ?  -1 : arr.peek(CashEntryIxs));
  const ixn =sys.$checkNull( math.isDigits(ix) ? math.toInt(math.fromStr(ix)[0]) : lastIx);

  const ixFirstRowV =sys.$checkNull( [ixn > lastIx ? lastIx : ixn]);

  const listDiv =sys.$checkNull( Q("div"));

  const listV =sys.$checkNull( [[]]);

  

  
   function getEntriesIndex(ix)  {sys.$params(arguments.length, 1);
    const size =sys.$checkNull( arr.size(CashEntryIxs));
    for (let i = 0;i < size; ++i) if (sys.$eq(CashEntryIxs[i] , ix))  return i;
     return size - 1;
  };

  
   function upClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]));
    if (ixFirstRowV[0] >  -1 && i < arr.size(CashEntryIxs) - 1) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[i + 1]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function downClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]));
    if (i > 0) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[i - 1]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function dupClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]) + math.toInt(cts.tableLen / 2));
    if(ixFirstRowV[0] >  -1) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( i < arr.size(CashEntryIxs)
        ? CashEntryIxs[i]
        : arr.peek(CashEntryIxs)))
      ;
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function ddownClick(e)  {sys.$params(arguments.length, 1);
    const i =sys.$checkNull( getEntriesIndex(ixFirstRowV[0]) - math.toInt(cts.tableLen / 2));
    if (i > 0) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[i]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function topClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1) {
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( arr.peek(CashEntryIxs)));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function bottomClick(e)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1) {
      const size =sys.$checkNull( arr.size(CashEntryIxs));
      const i0 =sys.$checkNull( [cts.tableLen - 1]);
      const i =sys.$checkNull( i0 >= size ? size - 1 : i0);
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[i]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function monthClick(m)  {sys.$params(arguments.length, 1);
    if (ixFirstRowV[0] >  -1) {
      const diary =sys.$checkNull( acc.diary());
      const size =sys.$checkNull( arr.size(CashEntryIxs));
      const iV =sys.$checkNull( [0]);
      while (true) {
         const e =sys.$checkNull( diary[CashEntryIxs[iV[0]]]);
        iV[0] +=sys.$checkExists(iV[0],sys.$checkNull( 1));
        if (time.month(e[diaryEntry.date]) >= m || sys.$eq(iV[0] , size)) break;
      }
      ixFirstRowV[0] =sys.$checkExists(ixFirstRowV[0],sys.$checkNull( CashEntryIxs[iV[0] - 1]));
      listDiv.removeAll().add(listV[0]());
    }
  };

  
   function goToDiary(diaryIx)  {sys.$params(arguments.length, 1); window.location.assign(
      "?diary&" + account + "&" + diaryIx
    );};


  

  
  listV[0] =sys.$checkExists(listV[0], function()  {sys.$params(arguments.length, 0);
    const sumV =sys.$checkNull( [0]);
     const Entries =sys.$checkNull( arr.map(CashEntryIxs,function(i)  {sys.$params(arguments.length, 1);
       const e =sys.$checkNull( acc.diary()[i]);
      const amV =sys.$checkNull( [0]);
      for (const [a, v]  of sys.$forObject2( e[diaryEntry.debits])) if (str.starts(a, ac)) amV[0] +=sys.$checkExists(amV[0],sys.$checkNull( v));
      for (const [a, v]  of sys.$forObject2( e[diaryEntry.credits])) if (str.starts(a, ac)) amV[0] -=sys.$checkExists(amV[0],sys.$checkNull( v));
      sumV[0] +=sys.$checkExists(sumV[0],sys.$checkNull( amV[0]));
       return {
          ix: i,
          date: e[diaryEntry.date],
          desc: e[diaryEntry.description],
          amm: amV[0],
          sum: sumV[0]
        };
    }));

    
     function td()  {sys.$params(arguments.length, 0);  return Q("td").klass("frame").style("vertical-align:top;");};
    
     function tdr()  {sys.$params(arguments.length, 0);  return td().setStyle("text-align", "right");};
    
     function tdl()  {sys.$params(arguments.length, 0);  return td().setStyle("text-align", "left");};

    const cutV =sys.$checkNull( [0]);
    for (let ix = 0;ix < arr.size(Entries); ++ix) {
       const E =sys.$checkNull( Entries[ix]);
      if (E.ix >= ixFirstRowV[0]) {
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
              .html(""+ (E.ix + 1)))
            .add(td()
              .html(time.format(E.date, "%D/%M")))
            .add(tdl()
              .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); goToDiary(E.ix);})
                .klass("link")
                .html(E.desc)))
            .add(tdr()
              .html(E.amm > 0 ? math.toIso(E.amm, 2) : ""))
            .add(tdr()
              .html(E.amm < 0 ? math.toIso( -E.amm, 2) : ""))
            .add(tdr()
              .html(math.toIso(E.sum, 2)))
          ;}
        )
      );
  });

  
   function left()  {sys.$params(arguments.length, 0);
     return Q("td")
      .klass("frame")
      .style("width:250px;vertical-align:top;white-space:nowrap")
      .add(Q("ul")
        .style("list-style:none;padding-left:0px;")
        .adds(iter.map(iter.$range(1,str.len(ac) + 1), function(lg)  {sys.$params(arguments.length, 1);  return Q("li")
          .html("<a href='#' onclick='return false;'>" +
            fns.cutRight(acc.descriptionOf(sys.$slice(ac,null,lg)), cts.helpLen) + "</a>")
          .add(Q("ul")
            .att("id", "hlist")
            .style("list-style:none;padding-left:10px;")
            .adds(function()  {sys.$params(arguments.length, 0);
                 const A =sys.$checkNull( dic.toArr(acc.subOf(sys.$slice(ac,null,lg - 1))));
                arr.sort(A,function(Kv1, Kv2)  {sys.$params(arguments.length, 2);  return Kv1[0] < Kv2[0];});
                 return arr.map(A,function(Kv)  {sys.$params(arguments.length, 1);  return Q("li")
                  .add(ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + Kv[0]);})
                    .klass("link")
                    .att("title", Kv[0])
                    .html(fns.cutRight(Kv[1][accValue.description], cts.helpLen)))
                ;});
              }()));}))
        .add(Q("li")
          .add(Q("hr")))
        .adds(sys.$eq(str.len(ac) , 5)
          ? []
          : function()  {sys.$params(arguments.length, 0);
               const A =sys.$checkNull( dic.toArr(acc.sub(ac)));
              arr.sort(A,function(Kv1, Kv2)  {sys.$params(arguments.length, 2);  return Kv1[0] < Kv2[0];});
               return arr.map(A,function(Kv)  {sys.$params(arguments.length, 1);  return Q("li")
                .add(ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + Kv[0]);})
                  .klass("link")
                  .att("title", acc.accFormat(Kv[0]))
                  .html(fns.cutRight(Kv[1][accValue.description], cts.helpLen)))
              ;});
            }()))
    ;
  };

  
   function right()  {sys.$params(arguments.length, 0);
    
     function mkSubmenu()  {sys.$params(arguments.length, 0);
      
       function separator()  {sys.$params(arguments.length, 0);  return Q("span").text("|");};
      
       function entry(tx, lk)  {sys.$params(arguments.length, 2);
         return ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + lk);})
          .klass("link")
          .text(" " + tx + " ")
        ;};

      const Es =sys.$checkNull( [separator(), entry("*", "*"), separator()]);
      
       function add(tx, lk)  {sys.$params(arguments.length, 2);
        arr.push(Es,entry(tx, lk));
        arr.push(Es,separator());
      };
      const acLen =sys.$checkNull( str.len(ac));
      if (acLen > 0) add(ac[0], ac[0]);
      if (acLen > 1) add(ac[1], sys.$slice(ac,null,2));
      if (acLen > 2) add(ac[2], sys.$slice(ac,null,3));
      if (acLen > 3) add(sys.$slice(ac,3,null), ac);
       return Q("div")
        .add(Q("p").adds(Es))
        .add(Q("p")
          .add(Q("span")
            .klass("frame")
            .html(sys.$eq(ac , "") ? II("All") : acc.descriptionOf(ac))))
      ;
    };

    const r =sys.$checkNull( Q("td")
      .style("text-align:center;vertical-align:top;")
      .add(Q("div")
        .klass("head")
        .text(II("Accs")))
      .add(mkSubmenu())
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td"))))
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
        .add(left())
        .add(right())))
  ;
};
