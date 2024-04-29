import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as log from  "../libdm/log.js";
import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const wgV =sys.$checkNull( [[]]);
const dirsDiv =sys.$checkNull( Q("div"));
const filesDiv =sys.$checkNull( Q("div"));
const bkDiv =sys.$checkNull( Q("div"));
const logDiv =sys.$checkNull( Q("div"));



 function showLog()  {sys.$params(arguments.length, 0);
  
   async  function load(fn)  {sys.$params(arguments.length, 1);
      const {Log} = await  client.send({
      prg: cts.appName,
      source: "SummaryPg",
      rq: "getLog"
    });
    fn(Log);
  };

  
   async  function reset(fn)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      source: "SummaryPg",
      rq: "resetLog"
    });
    fn();
  };

  
   function tlt(tx)  {sys.$params(arguments.length, 1); return (   
    sys.$eq(tx,"All log entries will be deleted.\nContinue?")?
      II("All log entries will be deleted.\nContinue?"):
    sys.$eq(tx,"2 Days")? II("2 Days"):
    sys.$eq(tx,"All")? II("All"):
    sys.$eq(tx,"Reload")? II("Reload"):
    sys.$eq(tx,"Delete")? II("Delete"):
    sys.$eq(tx,"Errors")? II("Errors"):
    sys.$eq(tx,"Log")? II("Log"):
     tx
  );};

  log.mk(logDiv, load, reset, tlt, true, 100, 25);
};


 async  function updateDirs()  {sys.$params(arguments.length, 0);
  dirsDiv
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Directories")))
  ;

  const {isBusy, pools, badPools, dirs, badDirs} 
  = await  client.send({
    prg: cts.appName,
    source: "SummaryPg",
    rq: "dirs"
  });

  if (isBusy) {
    dirsDiv
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .text(II("Server is busy.")))))
    ;
    return;
  }

  dirsDiv
    .add(Q("table")
      .att("align", "center")
      .klass("white")
      .add(mkTr(II("Pools"),  -1, pools))
      .add(mkTr(II("Pools in bad condition"), badPools,  -1))
      .add(mkTr(II("Directories"),  -1, dirs))
      .add(mkTr(II("Directories in bad condition"), badDirs,  -1)))
  ;
};


 async  function updateFiles(read, up)  {sys.$params(arguments.length, 2);
  filesDiv
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Files")))
  ;

  if (!sys.asBool(read)) {
    filesDiv
      .add(Q("div")
        .style("text-align: center")
        .add(Q("button")
          .text(II("Test"))
          .on("click", async  function(e)  {sys.$params(arguments.length, 1);
            await updateDirs();
            await updateFiles(true, false);
            await update(false);
            showLog();
          })))
    ;
    return;
  }

  const body =sys.$checkNull( Q("div")
    .style("text-align: center")
    .add(ui.img("wait.gif")))
  ;
  filesDiv.add(body);

  const {isBusy, files, outdatedDirs, outdatedFiles} 
  = await  client.send({
    prg: cts.appName,
    source: "SummaryPg",
    rq: "files"
  });

  if (isBusy) {
    body
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .text(II("Server is busy.")))))
    ;
    return;
  }

  body
    .removeAll()
    .style("text-align: center")
    .add(Q("table")
      .att("align", "center")
      .klass("white")
      .add(mkTr(II("Files"),  -1, files))
      .add(mkTr(II("Directories out of data"), outdatedDirs,  -1))
      .add(mkTr(II("Files out of data"), outdatedFiles,  -1)))
    .add(Q("div")
      .style("height:10px"))
    .add(Q("button")
      .text(II("Update"))
      .on("click", function(e)  {sys.$params(arguments.length, 1);
        Q(e.target).disabled(true);
        update(true);
      }))
  ;
};


 async  function update(read)  {sys.$params(arguments.length, 1);
  bkDiv.removeAll();

  if (!sys.asBool(read)) return;

  bkDiv
    .style("text-align: center; padding-top: 10px")
    .add(ui.img("wait.gif"))
  ;

  await client.send({
    prg: cts.appName,
    source: "SummaryPg",
    rq: "update"
  });

  const tm =sys.$checkNull( timer.mk(1000));
  await timer.run(tm, async  function()  {sys.$params(arguments.length, 0);
     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "SummaryPg",
      rq: "isBusy"
    });
    if (!sys.asBool(isBusy)) timer.stop(tm);
  });

  await update(false);
  await updateDirs();
  await updateFiles(true, false);
  showLog();
};




 function mkTr(title, n1, n2)  {sys.$params(arguments.length, 3);
  const tab =sys.$checkNull( n1 < 0 ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;");
   return Q("tr")
    .add(Q("td")
      .klass("entry")
      .html(tab + title))
    .add(Q("td")
      .klass("number2")
      .text(n1 >= 0 ? "" + n1 : ""))
    .add(Q("td")
      .klass("number2")
      .text(n2 >= 0 ? "" + n2 : ""))
  ;
};


 function show()  {sys.$params(arguments.length, 0);
  wgV[0]
    .removeAll()
    .add(dirsDiv)
    .add(filesDiv)
    .add(bkDiv)
    .add(logDiv)
  ;

  updateDirs();
  updateFiles(false, false);
  showLog();
};


export  function mk(wg)  {sys.$params(arguments.length, 1);
  wgV[0] =sys.$checkExists(wgV[0],sys.$checkNull( wg));
  show();
};
