import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as testRs from  "../data/testRs.js";
import * as dirRowWg from  "../wgs/dirRowWg.js";
import * as busyPg from  "../pgs/busyPg.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const {isBusy,  TestRss} 
  = await  client.send({
    prg: cts.appName,
    source: "DirectoriesPg",
    rq: "idata"
  });

  if (isBusy) {
    busyPg.mk();
    return;
  }

  const newIn =sys.$checkNull( Q("input")
    .style("width:200px")
    .disabled(true))
  ;

  

  
   async  function newDirectory(ev)  {sys.$params(arguments.length, 1);
    const id =sys.$checkNull( str.trim(newIn.getValue()));
    const err =sys.$checkNull( fns.validateDirId(id));
    if (sys.$neq(err , "")) {
      ui.alert(err);
      return;
    }
    if (dic.hasKey(TestRss, id)) {
      ui.alert(II("Directory is duplicated"));
      return;
    }

     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirectoriesPg",
      rq: "new",
      id:id
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    mk(wg);
  };

  

  
   function mkNewWg()  {sys.$params(arguments.length, 0);
    const editWg =sys.$checkNull( Q("div"));
    const doWg =sys.$checkNull( Q("div"));

    
     function editf(ev)  {sys.$params(arguments.length, 1);
      
       function cancelf(ev)  {sys.$params(arguments.length, 1);
        editWg
          .removeAll()
          .add(ui.link(editf)
            .add(ui.img("edit"))
        );

        doWg
          .removeAll()
          .add(ui.lightImg("editOk"))
        ;
        newIn
          .value("")
          .disabled(true)
        ;
      };

      editWg
        .removeAll()
        .add(ui.link(cancelf)
          .add(ui.img("editCancel")))
      ;
      doWg
        .removeAll()
        .add(ui.link(newDirectory)
          .add(ui.img("editOk")))
      ;
      newIn.disabled(false);
    };

    editWg.add(ui.link(editf)
      .add(ui.img("edit"))
    );
    doWg.add(ui.lightImg("editOk"));

     return Q("div")
      .add(Q("div")
        .klass("head")
        .text(II("New")))
      .add(Q("table")
        .klass("frame")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .add(editWg))
          .add(Q("td")
            .add(doWg))
          .add(Q("td")
            .add(newIn))
        ))
    ;
  };

  
   function mkTableWg()  {sys.$params(arguments.length, 0);
     const DirNames =sys.$checkNull( dic.keys(TestRss));
    arr.sort(DirNames,function(n1, n2)  {sys.$params(arguments.length, 2);  return str.toUpper(n1) < str.toUpper(n2);});
     return Q("div")
      .add(Q("div")
        .klass("head")
        .text(II("Directories")))
      .add(Q("table")
        .klass("white")
        .att("align", "center")
        .adds(arr.map(DirNames,
            function(dname)  {sys.$params(arguments.length, 1);  return dirRowWg.mk(dname, TestRss[dname], function() {sys.$params(arguments.length, 0); mk(wg);});}
          )))
    ;
  };

  wg
    .removeAll()
    .add(mkNewWg())
    .add(mkTableWg())
  ;
};
