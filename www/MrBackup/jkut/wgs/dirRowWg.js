import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as testRs from  "../data/testRs.js";
import * as busyPg from  "../pgs/busyPg.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(dirName,  test, reload)  {sys.$params(arguments.length, 3);
  const tr =sys.$checkNull( Q("tr"));

  const geditDiv =sys.$checkNull( Q("div"));
  const execDiv =sys.$checkNull( Q("div"));
  const dirEditDiv =sys.$checkNull( Q("div"));
  const dirDelDiv =sys.$checkNull( Q("div"));
  const dirBigDiv =sys.$checkNull( Q("div"));
  const dirInDiv =sys.$checkNull( Q("div").style("width: 220px"));
  const pathEditDiv =sys.$checkNull( Q("div"));
  const pathOkDiv =sys.$checkNull( Q("div"));
  const pathInDiv =sys.$checkNull( Q("div").style("width: 320px"));

  const dirIn =sys.$checkNull( Q("input").style("width: 200px"));
  const pathIn =sys.$checkNull( Q("input").style("width: 300px"));

  const isGeditV = [false];
  const isDirEditV = [false];
  const isPathEditV = [false];

  const mkExecDivV = [[]];
  const updateTrV = [[]];

  

  
   function geditOn(ev)  {sys.$params(arguments.length, 1);
    isGeditV[0] =sys.$checkExists(isGeditV[0], true);
    updateTrV[0]();
  };

  
   function geditOff(ev)  {sys.$params(arguments.length, 1);
    isGeditV[0] =sys.$checkExists(isGeditV[0], false);
    isDirEditV[0] =sys.$checkExists(isDirEditV[0], false);
    isPathEditV[0] =sys.$checkExists(isPathEditV[0], false);
    updateTrV[0]();
  };

  
   async  function copyToBase(ev)  {sys.$params(arguments.length, 1);
     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "copyToBase",
      id: dirName
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    reload();
  };

  
   async  function copyFromBase(ev)  {sys.$params(arguments.length, 1);
     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "copyFromBase",
      id: dirName
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    reload();
  };

  
   async  function createPathTxt(ev)  {sys.$params(arguments.length, 1);
     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "createPathTxt",
      id: dirName
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    reload();
  };

  
   async  function execUpdate(ev)  {sys.$params(arguments.length, 1);
    execDiv
      .removeAll()
      .add(ui.img("wait.gif"))
    ;
     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "update",
      id: dirName
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    mkExecDivV[0]();
  };

  
   function dirEditOff(ev)  {sys.$params(arguments.length, 1);
    isDirEditV[0] =sys.$checkExists(isDirEditV[0], false);
    updateTrV[0]();
  };

  
   function dirEditOn(ev)  {sys.$params(arguments.length, 1);
    isDirEditV[0] =sys.$checkExists(isDirEditV[0], true);
    updateTrV[0]();
  };

  
   async  function changeDir(ev)  {sys.$params(arguments.length, 1);
    const newId =sys.$checkNull( str.trim(dirIn.getValue()));
    const rs =sys.$checkNull( fns.validateDirId(newId));
    if (sys.$neq(rs , "")) {
      ui.alert(rs);
      return;
    }

     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "changeDir",
      id: dirName,
      newId:newId
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    reload();
  };

  
   async  function delDir(ev)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Delete '%0'?"), [dirName])))) return;

     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "delete",
      id: dirName
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    reload();
  };

  
   async  function changeBig(ev)  {sys.$params(arguments.length, 1);
    const size =sys.$checkNull( test[testRs.isBig] ? II("normal") : II("big"));
    if (!sys.asBool(ui.confirm(i18n.fmt(
      II("Change size of '%0' to %1?"), [dirName, size]
    )))) return;

     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "changeBig",
      id: dirName
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    reload();
  };

  
   function pathEditOff(ev)  {sys.$params(arguments.length, 1);
    isPathEditV[0] =sys.$checkExists(isPathEditV[0], false);
    updateTrV[0]();
  };

  
   function pathEditOn(ev)  {sys.$params(arguments.length, 1);
    isPathEditV[0] =sys.$checkExists(isPathEditV[0], true);
    updateTrV[0]();
  };

   async  function changePath(ev)  {sys.$params(arguments.length, 1);
    const newPathV = [str.trim(pathIn.getValue())];
    while (str.ends(newPathV[0], "/")) newPathV[0] =sys.$checkExists(newPathV[0], sys.$slice(newPathV[0],null, -1));

    if (test[testRs.withBackups]) {
      if (!sys.asBool(ui.confirm(
        II("There are backups inside the directory.\nChange the path anyway?")
      ))) return;
    }

     const {isBusy} = await  client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "changePath",
      id: dirName,
      newPath: newPathV[0]
    });
    if (isBusy) {
      busyPg.mk();
      return;
    }
    reload();
  };

  
   function showDirs(ev)  {sys.$params(arguments.length, 1);
    client.send({
      prg: cts.appName,
      source: "DirRowWg",
      rq: "showDirs",
      id: dirName
    })
  ;};


  

  
   function mkGedit()  {sys.$params(arguments.length, 0);
    geditDiv.removeAll();
    if (isGeditV[0]) {
      geditDiv.add(ui.link(geditOff)
        .add(ui.img("editCancel")))
      ;
    } else {
      if (test[testRs.notInBase] || test[testRs.isMissing] || !sys.asBool(test[testRs.synchronized])) {
        geditDiv.add(ui.lightImg("edit"));
      } else {
        geditDiv.add(ui.link(geditOn)
          .add(ui.img("edit")))
        ;
      }
    }
  };

  
  mkExecDivV[0] =sys.$checkExists(mkExecDivV[0], function()  {sys.$params(arguments.length, 0);
    const txFn =sys.$checkNull( test[testRs.notInBase]
      ? [II("Copy directory to base"), copyToBase]
      : test[testRs.isMissing] || !sys.asBool(test[testRs.synchronized])
        ? [II("Copy directory base in the others"), copyFromBase]
        : !sys.asBool(test[testRs.withPathTxt])
          ? [II("Create 'path.txt'"), createPathTxt]
          : sys.$eq(test[testRs.dpath] , "")
            ? [II("Put a directory in 'path.txt' manually"),
                function(e)  {sys.$params(arguments.length, 1); ui.alert(txFn[0]);}]
            : !sys.asBool(test[testRs.pathOk])
              ? [II("Put a valid directory in 'path.txt' manually"),
                  function(e)  {sys.$params(arguments.length, 1); ui.alert(txFn[0]);}]
              : [II("Update"), execUpdate])
    ;

    execDiv
      .removeAll()
      .add(ui.link(txFn[1])
        .add(ui.img("run"))
        .att("title", txFn[0]))
    ;
  });

  
   function mkDirEdit()  {sys.$params(arguments.length, 0);
    dirEditDiv.removeAll();
    if (isGeditV[0]) {
      if (isDirEditV[0]) {
        dirEditDiv.add(ui.link(dirEditOff)
          .add(ui.img("editCancel")))
        ;
      } else {
        dirEditDiv.add(ui.link(dirEditOn)
          .add(ui.img("edit")))
        ;
      }
    } else {
      dirEditDiv.add(ui.lightImg("edit"));
    }
  };

  
   function mkDirDel()  {sys.$params(arguments.length, 0);
    dirDelDiv.removeAll();
    if (isGeditV[0]) {
      if (isDirEditV[0]) {
        dirDelDiv.add(ui.link(changeDir)
          .add(ui.img("editOk")))
        ;
      } else {
        dirDelDiv.add(ui.link(delDir)
          .add(ui.img("delete")))
        ;
      }
    } else {
      dirDelDiv.add(ui.lightImg("delete"));
    }
  };

  
   function mkDirBig()  {sys.$params(arguments.length, 0);
    const img =sys.$checkNull( test[testRs.isBig] ? "bigFolder" : "normalFolder");
    dirBigDiv.removeAll();
    if (isGeditV[0]) {
      if (isDirEditV[0]) {
        dirBigDiv.add(ui.img("blank"));
      } else {
        dirBigDiv.add(ui.link(changeBig)
          .add(ui.img(img)))
        ;
      }
    } else {
      dirBigDiv.add(ui.lightImg(img));
    }
  };

  
   function mkDirIn()  {sys.$params(arguments.length, 0);
    dirInDiv.removeAll();
    if (isDirEditV[0]) {
      dirIn.value(dirName);
      dirInDiv.add(dirIn);
    } else {
      dirInDiv.text(fns.cut(dirName, 195));
    }
  };

  
   function mkPathEdit()  {sys.$params(arguments.length, 0);
    pathEditDiv.removeAll();
    if (isGeditV[0] && test[testRs.withPathTxt]) {
      if (isPathEditV[0]) {
        pathEditDiv.add(ui.link(pathEditOff)
          .add(ui.img("editCancel")))
        ;
      } else {
        pathEditDiv.add(ui.link(pathEditOn)
          .add(ui.img("edit")))
        ;
      }
    } else {
      pathEditDiv.add(ui.lightImg("edit"));
    }
  };

  
   function mkPathOk()  {sys.$params(arguments.length, 0);
    pathOkDiv.removeAll();
    if (isGeditV[0] && test[testRs.withPathTxt]) {
      if (isPathEditV[0]) {
        pathOkDiv.add(ui.link(changePath)
          .add(ui.img("editOk")))
        ;
      } else {
        pathOkDiv.add(ui.lightImg("editOk"));
      }
    } else {
      pathOkDiv.add(ui.lightImg("editOk"));
    }
  };

  
   function mkPathIn()  {sys.$params(arguments.length, 0);
    pathInDiv.removeAll();
    if (isPathEditV[0] && test[testRs.withPathTxt]) {
      pathIn.value(test[testRs.dpath]);
      pathInDiv.add(pathIn);
    } else {
      pathInDiv.text(fns.cut(test[testRs.dpath], 295));
    }
  };

  
   function sep()  {sys.$params(arguments.length, 0);  return Q("td")
      .style(
        "border-right: 1px solid rgb(110,130,150);" +
        "border-left: 1px solid rgb(110,130,150);"
      )
    ;};

  
   function info()  {sys.$params(arguments.length, 0);
    const tx =sys.$checkNull( test[testRs.notInBase]
      ? II("Directory is not in base")
      : test[testRs.isMissing]
        ? II("Directory is missing in some pool")
        : !sys.asBool(test[testRs.synchronized])
          ? II("Directories are no synchronized")
          : !sys.asBool(test[testRs.withPathTxt])
            ? II("'path.txt' is missing")
            : sys.$eq(test[testRs.dpath] , "")
              ? II("'path.txt' is empty")
              : !sys.asBool(test[testRs.pathOk])
                ? i18n.fmt(II("'%0' not found"), [test[testRs.dpath]])
                : II("Ok"))
    ;
    const img =sys.$checkNull( sys.$eq(tx , II("Ok")) ? "well" : "warning");

     return Q("td")
      .add(ui.img(img)
        .att("title", tx))
    ;
  };

  
   function dirsView()  {sys.$params(arguments.length, 0);  return Q("td")
    .add(ui.link(showDirs)
      .add(ui.img("view")))
  ;};

  
  updateTrV[0] =sys.$checkExists(updateTrV[0], function()  {sys.$params(arguments.length, 0);
    mkGedit();
    mkExecDivV[0]();
    mkDirEdit();
    mkDirDel();
    mkDirBig();
    mkDirIn();
    mkPathEdit();
    mkPathOk();
    mkPathIn();

    tr
      .removeAll()
      .add(Q("td").add(geditDiv))
      .add(Q("td").add(execDiv))
      .add(sep())
      .add(Q("td").add(dirEditDiv))
      .add(Q("td").add(dirDelDiv))
      .add(Q("td").add(dirBigDiv))
      .add(Q("td").add(dirInDiv))
      .add(sep())
      .add(Q("td").add(pathEditDiv))
      .add(Q("td").add(pathOkDiv))
      .add(Q("td").add(pathInDiv))
      .add(sep())
      .add(info())
      .add(sep())
      .add(dirsView())
    ;
  });

  updateTrV[0]();
   return tr;
};
