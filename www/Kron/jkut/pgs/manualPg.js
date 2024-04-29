import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as ann from  "../data/ann.js";
import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
  const {dbKey, Anns} = await  client.send({
    prg: cts.appName,
    source: "ManualPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

  
   const As =sys.$checkNull( arr.map(Anns, ann.fromJs));
  const idV =sys.$checkNull( [ -1]);

  const showV =sys.$checkNull( [[]]);

  

  
   async  function update(id, txWg)  {sys.$params(arguments.length, 2);
    const tx =sys.$checkNull( txWg.getValue().trim());

    const err =sys.$checkNull( sys.$eq(tx , "") ? II("Command value is missing") : "");

    if (sys.$neq(err , "")) {
      ui.alert(err);
      return;
    }

    await client.send({
      prg: cts.appName,
      source: "ManualPg",
      rq: sys.$eq(idV[0] ,  -1) ? "new" : "modify",
      dbKey: global.dbKeyV[0],
      annotation: ann.toJs(ann.mk(idV[0], ann.typeMANUAL, js.w(""), tx))
    });
    mk(wg);
  };

  
   function edit(id)  {sys.$params(arguments.length, 1);
    idV[0] =sys.$checkExists(idV[0],sys.$checkNull( id));
    showV[0]();
  };

  
   function editCancel()  {sys.$params(arguments.length, 0);
    idV[0] =sys.$checkExists(idV[0],sys.$checkNull(  -1));
    showV[0]();
  };

  
   async  function del(id)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(ui.confirm(II("Delete annotation?")))) return;

    await client.send({
      prg: cts.appName,
      source: "ManualPg",
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
      source: "ManualPg",
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
          .text(II("Command")))
        .add(Q("td")),
      Q("tr").add(Q("td").klass("line").att("colspan", "8")),
      Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .add(sys.$neq(idV[0] ,  -1)
            ? ui.lightImg("add")
                .setStyle("vertical-align", "middle")
            : ui.link(function(ev)  {sys.$params(arguments.length, 1); update( -1, txWg);})
              .add(ui.img("add")
                .style("vertical-align:middle"))))
        .add(Q("td")
          .add(txWg))
        .add(Q("td")),
      Q("tr").add(Q("td").att("colspan", "4").add(Q("hr")))
    ];
  };

  
   function mkTr( a)  {sys.$params(arguments.length, 1);
    const isSel =sys.$checkNull( sys.$eq(a[ann.id] , idV[0]));
    const isNew =sys.$checkNull( sys.$eq(idV[0] ,  -1));
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
            ? ui.link(function(ev)  {sys.$params(arguments.length, 1); update(a[ann.id], txWg);})
              .add(ui.img("enter"))
            : ui.lightImg("delete")))
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
        .text(II("Manual")))
      .add(Q("div")
        .klass("separator"))
      .add(tb)
    ;
  });

  showV[0]();
};
