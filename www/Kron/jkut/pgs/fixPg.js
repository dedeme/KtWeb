import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as ann from  "../data/ann.js";
import * as cts from  "../cts.js";
import * as fns from  "../fns.js";
import * as global from  "../global.js";
import * as datePicker from  "../libdm/datePicker.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
  const {dbKey, Anns} = await  client.send({
    prg: cts.appName,
    source: "FixPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);

  
   const As =sys.$checkNull( arr.map(Anns, ann.fromJs));
  arr.sort(As,function( a1,  a2)  {sys.$params(arguments.length, 2);  return a1[ann.date] < a2[ann.date];});
  const idV = [ -1];

  const showV = [[]];

  
  
   async  function update(id,  dayDp, hWg, mWg, txWg)  {sys.$params(arguments.length, 5);
    const dateOp =sys.$checkNull( datePicker.getDate(dayDp));
    const tx =sys.$checkNull( txWg.getValue().trim());

    if (!sys.asBool(dateOp)) {
      ui.alert(II("Day value is missing"));
      return;
    }
     const date =sys.$checkNull( dateOp[0]);

    const errV = [""];
    const tm =sys.$checkNull( time.mk(
      time.day(date), time.month(date), time.year(date),
      math.fromStr(hWg.getValue())[0], math.fromStr(mWg.getValue())[0], 0
    ));
    const now =sys.$checkNull( time.now());
    if (tm - now <= 0)
      errV[0] =sys.$checkExists(errV[0],sys.$checkNull( II("Time is equals or previous to the current one")));

    if (sys.$eq(tx , "")) errV[0] =sys.$checkExists(errV[0],sys.$checkNull( II("Command value is missing")));

    if (sys.$neq(errV[0] , "")) {
      ui.alert(errV[0]);
      return;
    }

    await client.send({
      prg: cts.appName,
      source: "FixPg",
      rq: sys.$eq(idV[0] ,  -1) ? "new" : "modify",
      dbKey: global.dbKeyV[0],
      annotation: ann.toJs(
          ann.mk(idV[0], ann.typeFIX, js.w(math.toInt(tm / 1000)), tx
        ))
    });
    mk(wg);
  };

  
   function edit(id)  {sys.$params(arguments.length, 1);
    idV[0] =sys.$checkExists(idV[0], id);
    showV[0]();
  };

  
   function editCancel()  {sys.$params(arguments.length, 0);
    idV[0] =sys.$checkExists(idV[0],  -1);
    showV[0]();
  };

  
   async  function del(id)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(ui.confirm(II("Delete annotation?")))) return;

    await client.send({
      prg: cts.appName,
      source: "FixPg",
      rq: "delete",
      dbKey: global.dbKeyV[0],
      id:id
    });
    mk(wg);
  };

  
   async  function run(runSpan, id)  {sys.$params(arguments.length, 2);
    runSpan
      .removeAll()
      .add(ui.img("wait.gif"))
    ;

    
     const {error} = await  client.send({
      prg: cts.appName,
      source: "FixPg",
      rq: "run",
      id:id
    });

    if (sys.$neq(error , "")) {
      ui.alert(error);
      mk(wg);
    } else {
      runSpan
        .removeAll()
        .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); run(runSpan, id);})
          .add(ui.img("run")))
      ;
    }
  };

  

  
   function th()  {sys.$params(arguments.length, 0);  return Q("td").style("text-align:center");};

  
   function trsNew()  {sys.$params(arguments.length, 0);
    const dayWg =sys.$checkNull( Q("input")
      .att("type", "text")
      .style("width:80px")
      .disabled(sys.$neq(idV[0] ,  -1)))
    ;
     const dayDp =sys.$checkNull( datePicker.mk(
      sys.$eq(i18n.getLang() , "es"),
      time.now(),
      function(s)  {sys.$params(arguments.length, 1);}
    ));
    const hWg =sys.$checkNull( ui.select(
      "h-new", arr.fromIter(iter.map(iter.$range(0,24), function(i)  {sys.$params(arguments.length, 1);  return fns.formatN00(i);}))
    ).disabled(sys.$neq(idV[0] ,  -1)));
    const mWg =sys.$checkNull( ui.select(
      "m-new", arr.fromIter(iter.map(iter.$range(0,60), function(i)  {sys.$params(arguments.length, 1);  return fns.formatN00(i);}))
    ).disabled(sys.$neq(idV[0] ,  -1)));
    const txWg =sys.$checkNull( Q("textarea")
      .att("spellcheck", false)
      .att("cols", 60)
      .att("rows", 3)
      .disabled(sys.$neq(idV[0] ,  -1)))
    ;

     return [
      Q("tr")
        .add(Q("td")
          .att("colspan", "2"))
        .add(th()
          .text(II("Day")))
        .add(th()
          .att("colspan", "2")
          .text(II("Hour - Minute")))
        .add(th()
          .text(II("Command")))
        .add(Q("td")),
      Q("tr").add(Q("td").klass("line").att("colspan", "8")),
      Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .add(sys.$neq(idV[0] ,  -1)
            ? ui.lightImg("add")
                .setStyle("vertical-align", "middle")
            : ui.link(function(ev)  {sys.$params(arguments.length, 1); update( -1, dayDp, hWg, mWg, txWg);})
              .add(ui.img("add")
                .style("vertical-align:middle"))))
        .add(Q("td")
          .add(datePicker.mkText(dayDp,dayWg)))
        .add(Q("td")
          .add(hWg))
        .add(Q("td")
          .add(mWg))
        .add(Q("td")
          .add(txWg))
        .add(Q("td")),
      Q("tr").add(Q("td").att("colspan", "8").add(Q("hr")))
    ];
  };

  
   function mkTr( a)  {sys.$params(arguments.length, 1);
    const isSel = sys.$eq(a[ann.id] , idV[0]);
    const isNew = sys.$eq(idV[0] ,  -1);

    const dayWg =sys.$checkNull( Q("input")
      .att("type", "text")
      .style("width:75px")
      .disabled(!sys.asBool(isSel)));

     const dayDp =sys.$checkNull( datePicker.mk(
      sys.$eq(i18n.getLang() , "es"),
      ann.date(a),
      function(s)  {sys.$params(arguments.length, 1);}
    ));

    const hWg =sys.$checkNull( ui.select(
        "h-new",
        arr.fromIter(iter.map(iter.$range(0,24), function(i)  {sys.$params(arguments.length, 1); 
          return (sys.$eq(time.hour(ann.date(a)) , i) ? "+" : "") + fns.formatN00(i)
        ;}))
      ).disabled(!sys.asBool(isSel)))
    ;
    const mWg =sys.$checkNull( ui.select(
        "m-new",
        arr.fromIter(iter.map(iter.$range(0,60), function(i)  {sys.$params(arguments.length, 1); 
          return (sys.$eq(time.minute(ann.date(a)) , i) ? "+" : "") + fns.formatN00(i)
        ;}))
      ).disabled(!sys.asBool(isSel)))
    ;


    const txWg =sys.$checkNull( Q("textarea")
      .att("spellcheck", false)
      .att("cols", 60)
      .att("rows", 3)
      .disabled(!sys.asBool(isSel))
      .value(a[ann.text]))
    ;
    const runSpan =sys.$checkNull( Q("span"));

     return Q("tr")
      .add(Q("td")
        .add(isNew
          ? ui.link(function(ev)  {sys.$params(arguments.length, 1); edit(a[ann.id]);})
            .add(ui.img("edit"))
          : isSel
            ? ui.link(function(ev)  {sys.$params(arguments.length, 1); editCancel();})
              .add(ui.img("cancel"))
            : ui.lightImg("edit")))
      .add(Q("td")
        .add(isNew
          ? ui.link(function(ev)  {sys.$params(arguments.length, 1); del(a[ann.id]);})
            .add(ui.img("delete"))
          : isSel
            ? ui.link(function(ev)  {sys.$params(arguments.length, 1); update(a[ann.id], dayDp, hWg, mWg, txWg);})
              .add(ui.img("enter"))
            : ui.lightImg("delete")))
      .add(Q("td")
        .add(datePicker.mkText(dayDp,dayWg)))
      .add(Q("td")
        .add(hWg))
      .add(Q("td")
        .add(mWg))
      .add(Q("td")
        .add(txWg))
      .add(Q("td")
        .add(runSpan
          .removeAll()
          .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); run(runSpan, a[ann.id]);})
            .add(ui.img("run")))))
    ;
  };

  
   function trs()  {sys.$params(arguments.length, 0);
    if (sys.$eq(arr.size(As) , 0)) {
       return [
        Q("tr")
          .add(th()
          .att("colspan", "7")
          .klass("frame")
          .text(II("Without entries")))
      ];
    }

     return arr.map(As, function(a)  {sys.$params(arguments.length, 1);  return mkTr(a);});
  };

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    const tb =sys.$checkNull( Q("table")
      .att("align", "center")
      .adds(trsNew())
      .adds(trs()))
    ;

    wg
      .removeAll()
      .add(Q("div")
        .klass("head")
        .text(II("Fixed days")))
      .add(Q("div")
        .klass("separator"))
      .add(tb)
    ;
  });

  showV[0]();
};
