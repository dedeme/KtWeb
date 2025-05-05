import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as modalBox from  "../../libdm/modalBox.js";
import * as msg from  "../../wgs/msg.js";
import * as cts from  "../../cts.js";
import * as tableCheck from  "../../data/tableCheck.js";
import * as co from  "../../data/co.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
  const {dbKey,  Cos,  Checks} = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "QuotesPg",
    rq: "idata"
  });
  arr.sort(Cos,function( c1,  c2)  {sys.$params(arguments.length, 2);  return c1[co.nick] < c2[co.nick];});

  const CheckBoxes = []; 
  const filterV = [true];

  const divWait =sys.$checkNull( Q("div"));
  const showV = [[]]; 

  

  
  
   async  function readNick(dbK, nick)  {sys.$params(arguments.length, 2);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      module: "Acc",
      source: "QuotesPg",
      rq: "readNick",
      dbKey: dbK,
      nick:nick
    });
     return dbKey;
  };

  
   function showWait(nick)  {sys.$params(arguments.length, 1);
    divWait.removeAll();
     const box =sys.$checkNull( modalBox.mk(
      Q("div")
        .add(Q("div")
          .style("text-align:center")
          .add(ui.img("wait2.gif").klass("frame")))
        .add(Q("div").style("text-align:center").html(nick)),
      false
    ));
    divWait.add(modalBox.mkWg(box));
    modalBox.show(box,box);
  };

  
   async  function updateNick(nick)  {sys.$params(arguments.length, 1);
    showWait(nick);
    await readNick(dbKey, nick);
    window.location.reload();
  };

  
   function updateSelected()  {sys.$params(arguments.length, 0);
    const dbKeyV = [dbKey];
    arr.eachSync(
      arr.filter(CheckBoxes,function(ch)  {sys.$params(arguments.length, 1);  return ch.isChecked();}),
      async  function(ix, ch)  {sys.$params(arguments.length, 2);
          const nick =sys.$checkNull( ch.getValue());
          showWait(nick);
          dbKeyV[0] =sys.$checkNull( await  readNick(dbKeyV[0], nick));
        },
      function()  {sys.$params(arguments.length, 0); window.location.reload();}
    );
  };

  
   function updateAll()  {sys.$params(arguments.length, 0);
    const dbKeyV = [dbKey];
    arr.eachSync(
      CheckBoxes,
      async  function(ix, ch)  {sys.$params(arguments.length, 2);
          const nick =sys.$checkNull( ch.getValue());
          showWait(nick);
          dbKeyV[0] =sys.$checkNull( await  readNick(dbKeyV[0], nick));
        },
      function()  {sys.$params(arguments.length, 0); window.location.reload();}
    );
  };

  
   async  function del(tc)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      module: "Acc",
      source: "QuotesPg",
      rq: "delNick",
      dbKey:dbKey,
      tc:tc
    });
    window.location.reload();
  };

  
   async  function undel(tc)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      module: "Acc",
      source: "QuotesPg",
      rq: "undelNick",
      dbKey:dbKey,
      tc:tc
    });
    window.location.reload();
  };

  
   async  function update(tc)  {sys.$params(arguments.length, 1);
     const {ok} = await  client.send({
      prg: cts.appName,
      module: "Acc",
      source: "QuotesPg",
      rq: "updateNick",
      dbKey:dbKey,
      tc:tc
    });
    if (ok) window.location.reload();
    else msg.error(cts.failMsg, function()  {sys.$params(arguments.length, 0);});
  };

  
   function filter(ok)  {sys.$params(arguments.length, 1);
    filterV[0] = ok;
    showV[0]();
  };

  
  
   function fieldToStr(f)  {sys.$params(arguments.length, 1); return (  
      sys.$eq(f,"o")? II("Open"):
      sys.$eq(f,"c")? II("CloseN"):
      sys.$eq(f,"x")? II("Max."):
      sys.$eq(f,"n")? II("Min."):
       II("Vol.")
    );};


  

  
   function mkNickReadingWg()  {sys.$params(arguments.length, 0);
    arr.clear(CheckBoxes);
    const R = [];
    for (const  c  of sys.$forObject( Cos)) {
      const ch =sys.$checkNull( Q("input").att("type", "checkbox").value(c[co.nick]));
      arr.push(CheckBoxes,ch);

      arr.push(R,Q("span").text(" · "));
      arr.push(R,ch);
      arr.push(R,ui.link(function(e)  {sys.$params(arguments.length, 1); updateNick(c[co.nick]);}).klass("link").text(c[co.nick]));
    }
     return sys.$slice(R,1,null);
  };

  
  showV[0] = function()  {sys.$params(arguments.length, 0);
     const Chks =sys.$checkNull( filterV[0]
      ? arr.filter(Checks,function( t)  {sys.$params(arguments.length, 1);  return !sys.asBool(t[tableCheck.deleted]);})
      : Checks)
    ;
    arr.sort(Chks,function( t1,  t2)  {sys.$params(arguments.length, 2); 
        return sys.$eq(t1[tableCheck.nick] , t2[tableCheck.nick])
          ? sys.$eq(t1[tableCheck.date] , t2[tableCheck.date])
            ? sys.$eq(t1[tableCheck.field] , t2[tableCheck.field])
              ? t1[tableCheck.svId] < t2[tableCheck.svId]
              :t1[tableCheck.field] < t2[tableCheck.field]
            : t1[tableCheck.date] > t2[tableCheck.date]
          : t1[tableCheck.nick] < t2[tableCheck.nick]
      ;});

    if (filterV[0]) {
      const Groups = []; 
      const Gr = []; 
      for (const  c  of sys.$forObject( Chks)) {
        if (sys.$eq(arr.size(Gr) , 0) || tableCheck.eqQuote(c,Gr[0])) arr.push(Gr,c);
        else {
          arr.push(Groups,arr.copy(Gr));
          arr.clear(Gr);
          arr.push(Gr,c);
        }
      }
      if (sys.$neq(arr.size(Gr) , 0)) arr.push(Groups,Gr);
      arr.clear(Chks);
      for (const  G  of sys.$forObject( Groups)) {
        if (arr.size(G) < 2) continue;
         const c0 =sys.$checkNull( G[0]);
        if (sys.$eq(arr.size(G) , 2)) {
           const c1 =sys.$checkNull( G[1]);
          if (sys.$neq(c1[tableCheck.svValue] , c0[tableCheck.svValue])) continue;
        }
        if (sys.$eq(c0[tableCheck.field] , tableCheck.v)) {
          const val =sys.$checkNull( c0[tableCheck.tbValue]);
          const dif = val * 0.05;
          const up = val + dif;
          const down = val - dif;
          if (arr.any(G,function( c)  {sys.$params(arguments.length, 1);  return c[tableCheck.svValue] < up && c[tableCheck.svValue] > down;}))
            continue;
        }
        for (const c  of sys.$forObject( G)) arr.push(Chks,c);
      }
    }

    wg
      .removeAll()
      .add(ui.hrule(II("Reading"), 50))
      .add(Q("table")
        .klass("white")
        .add(Q("tr")
          .add(Q("td")
            .add(ui.link(function(ev)  {sys.$params(arguments.length, 1);  return updateAll();})
              .klass("link")
              .text(II("All"))))
          .add(Q("span")
            .text(" · "))
          .add(Q("td")
            .add(ui.link(function(ev)  {sys.$params(arguments.length, 1);  return updateSelected();})
              .klass("link")
              .text(II("Selected"))))))
      .add(Q("div")
        .klass("separator"))
      .add(Q("table")
        .klass("white")
        .add(Q("tr")
          .add(Q("td")
            .adds(mkNickReadingWg()))))
      .add(ui.hrule(II("Data"), 50))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .add(Q("input")
              .att("type", "checkbox")
              .on("click", function(e)  {sys.$params(arguments.length, 1); filter(Q(e.target).isChecked());})
              .checked(filterV[0]))
            .add(Q("span")
              .text(II("filter"))))))
      .add(Q("table")
        .klass("white")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("header"))
          .add(Q("td")
            .klass("header")
            .text("Nick"))
          .add(Q("td")
            .klass("header")
            .text("Date"))
          .add(Q("td")
            .klass("header")
            .text("Field"))
          .add(Q("td")
            .klass("header")
            .text("Server"))
          .add(Q("td")
            .klass("header")
            .text(II("Tb Val")))
          .add(Q("td")
            .klass("header")
            .text(II("Sv Val")))
          .add(Q("td")
            .klass("header")))
        .adds(arr.map(Chks,function( ch)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .klass("borderWhite")
              .add(ch[tableCheck.deleted]
                ? ui.img("blank")
                : ui.link(function(ev)  {sys.$params(arguments.length, 1); update(ch);})
                    .klass("link")
                    .add(ui.img("ok"))))
            .add(Q("td")
              .klass("borderWhite")
              .text(ch[tableCheck.nick]))
            .add(Q("td")
              .klass("borderWhite")
              .text(ch[tableCheck.date]))
            .add(Q("td")
              .klass("borderWhite")
              .text(fieldToStr(ch[tableCheck.field])))
            .add(Q("td")
              .klass("borderWhite")
              .text(ch[tableCheck.svId]))
            .add(Q("td")
              .klass("borderWhite")
              .style("text-align:right")
              .text(ch[tableCheck.tbValue]))
            .add(Q("td")
              .klass("borderWhite")
              .style("text-align:right")
              .text(ch[tableCheck.svValue]))
            .add(Q("td")
              .klass("borderWhite")
              .add(ch[tableCheck.deleted]
                ? ui.link(function(ev)  {sys.$params(arguments.length, 1); undel(ch);})
                    .klass("link")
                    .add(ui.img("reload"))
                : ui.link(function(ev)  {sys.$params(arguments.length, 1); del(ch);})
                    .klass("link")
                    .add(ui.img("delete"))))
            ;}
          )))
      .add(divWait)
    ;
  };

  showV[0]();
};
