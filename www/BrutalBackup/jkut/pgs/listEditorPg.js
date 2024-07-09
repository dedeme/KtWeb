import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as cts from  "../cts.js";
import * as bkEntry from  "../data/bkEntry.js";
import * as fromServer from  "../data/fromServer.js";
import * as fromClient from  "../data/fromClient.js";
import * as reportPg from  "../pgs/reportPg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
   const {List,  sv, dbKey} = await  client.send({
    prg: cts.appName,
    source: "ListEditor",
    rq: "idata"
  });

  const boxDiv =sys.$checkNull( Q("div"));
  const box =sys.$checkNull( modalBox.mk(boxDiv, false));
  const inId =sys.$checkNull( ui.field("inSource").att("id", "inId").style("width: 150px"));
  const inSource =sys.$checkNull( ui.field("inBackup").att("id", "inSource").style("width: 500px"));
  const inBackup =sys.$checkNull( ui.field("inId").att("id", "inBackup").style("width: 500px"));

  

  
   async  function add()  {sys.$params(arguments.length, 0);
    const id =sys.$checkNull( str.trim(inId.getValue()));
    const fromV =sys.$checkNull( [str.trim(inSource.getValue())]);
    const toV =sys.$checkNull( [str.trim(inBackup.getValue())]);
    while (str.len(fromV[0]) > 1 && str.ends(fromV[0], "/")) fromV[0] =sys.$checkExists(fromV[0],sys.$checkNull( sys.$slice(fromV[0],null, -1)));
    while (str.len(toV[0]) > 1 && str.ends(toV[0], "/")) toV[0] =sys.$checkExists(toV[0],sys.$checkNull( sys.$slice(toV[0],null, -1)));
    const from =sys.$checkNull( fromV[0]);
    const to =sys.$checkNull( toV[0]);

    const err =sys.$checkNull( [""]);
    if (sys.$eq(id , "")) err[0] =sys.$checkExists(err[0],sys.$checkNull( II("'Id' is missing")));
    else if (sys.$eq(from , "")) err[0] =sys.$checkExists(err[0],sys.$checkNull( II("'From' is missing")));
    else if (sys.$eq(to , "")) err[0] =sys.$checkExists(err[0],sys.$checkNull( II("'To' is missing")));
    else if (sys.$eq(from , "/")) err[0] =sys.$checkExists(err[0],sys.$checkNull( II("'From' is root")));
    else if (sys.$eq(to , "/")) err[0] =sys.$checkExists(err[0],sys.$checkNull( II("'To' is root")));
    if (sys.$neq(err[0] , "")) {
      ui.alert(err[0]);
      return;
    }

    if (arr.any(List,function( e)  {sys.$params(arguments.length, 1);  return sys.$eq(e[bkEntry.id] , id);})) {
      if (!sys.asBool(ui.confirm(i18n.fmt(
        II("Already exists a backup with id '%0'\nOverwrite?"), [id]
      )))) {
        return;
      }
    }

    await client.send({
      prg: cts.appName,
      source: "ListEditor",
      rq: "addModify",
      dbKey:dbKey,
      id:id,
      from:from,
      to:to
    });
    mk(wg);
  };

  
   function edit( bk)  {sys.$params(arguments.length, 1);
    inId.value(bk[bkEntry.id]);
    inSource.value(bk[bkEntry.source]);
    inBackup.value(bk[bkEntry.backup]);
  };

  
   async  function del( bk)  {sys.$params(arguments.length, 1);
    const id =sys.$checkNull( bk[bkEntry.id]);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Delete '%0'?"), [id])))) {
      return;
    }

    await client.send({
      prg: cts.appName,
      source: "ListEditor",
      rq: "del",
      dbKey:dbKey,
      id: id
    });
    mk(wg);
  };

  
   async  function run( bk)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      source: "ListEditor",
      rq: "run",
      dbKey:dbKey,
      fromClient: fromClient.mk(
          fromClient.start,
          bk[bkEntry.source],
          bk[bkEntry.backup]
        )
    });
    
    window.location.reload(true);
  };

  

  const tbEntry =sys.$checkNull( Q("table")
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 2))
      .add(Q("td")
        .style("text-align:left")
        .text(II("Id")))
      .add(Q("td"))
      .add(Q("td")
        .style("text-align:left")
        .text(II("Paths"))))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 5)
        .add(Q("hr"))))
    .add(Q("tr")
      .add(Q("td")
        .style("width;5px")
        .add(ui.img("blank")))
      .add(Q("td")
        .style("width;5px")
        .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); add();})
          .klass("link")
          .add(ui.img("add"))))
      .add(Q("td")
        .add(inId))
      .add(Q("td")
        .style("text-align:right")
        .text(II("From")))
      .add(Q("td")
        .add(inSource)))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", 3))
      .add(Q("td")
        .style("text-align:right")
        .text(II("To")))
      .add(Q("td")
        .add(inBackup))))
    ;

  const trs =sys.$checkNull( !sys.asBool(!sys.asBool(List))
    ? arr.map(List,function( e)  {sys.$params(arguments.length, 1);  return Q("tr")
        .add(Q("td")
          .klass("border")
          .add(Q("table")
            .add(Q("tr")
              .add(Q("td")
                .style("width;5px")
                .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); edit(e);})
                    .klass("link")
                    .add(ui.img("edit"))))
              .add(Q("td")
                .style("width;5px")
                .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); del(e);})
                    .klass("link")
                    .add(ui.img("delete"))))
              .add(Q("td")
                .add(sys.$neq(e[bkEntry.sourceError] , "") || sys.$neq(e[bkEntry.backupError] , "")
                  ? Q("input").att("type", "text").disabled(true)
                      .style("width:150px;color:#800000")
                      .value(e[bkEntry.id])
                  : ui.link(function(ev)  {sys.$params(arguments.length, 1); run(e);})
                      .add(Q("input").att("type", "text")
                        .att("readonly", true)
                        .style("width:150px;color:#000000;cursor:pointer")
                        .value(e[bkEntry.id]))
                  ))
              .add(Q("td")
                .style("text-align:right")
                .text(II("From")))
              .add(Q("td")
                .add(Q("input").att("type", "text").disabled(true)
                  .style("width:500px;text-align:right;color:#000000;")
                  .value(e[bkEntry.source])))
              .add(Q("td")
                .att("title", e[bkEntry.sourceError])
                .add(ui.img(
                    sys.$neq(e[bkEntry.sourceError] , "")
                      ? "error"
                      : "ok"
                  )))
                )
            .add(Q("tr")
              .add(Q("td")
                .att("colspan", 3))
              .add(Q("td")
                .style("text-align:right")
                .text(II("To")))
              .add(Q("td")
                .add(Q("input").att("type", "text").disabled(true)
                  .style("width:500px;text-align:right;color:#000000;")
                  .value(e[bkEntry.backup])))
              .add(Q("td")
                .att("title", e[bkEntry.backupError])
                .add(ui.img(
                    sys.$neq(e[bkEntry.backupError] , "")
                      ? "error"
                      : "ok"
                  ))))))
      ;})
    : [
        Q("tr")
          .add(Q("td")
            .add(Q("table")
              .att("align", "center")
              .add(Q("tr")
                .add(Q("td")
                  .klass("frame")
                  .text(II("Without Backups"))))))
      ])
  ;

  wg
    .removeAll()
    .add(Q("table")
      .style("border-collapse : collapse;")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(tbEntry)))
      .add(Q("tr")
        .add(Q("td")
          .add(Q("hr"))))
      .adds(trs))
    .add(modalBox.mkWg(box))
  ;

  if (sys.$neq(sv[fromServer.state] , fromServer.end)) {
    reportPg.mk(boxDiv, box);
    modalBox.show(box,true);
  } else inId.e.focus();
};
