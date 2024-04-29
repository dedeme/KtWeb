import * as math from '../../../_js/math.js';import * as js from '../../../_js/js.js';import * as arr from '../../../_js/arr.js';import * as client from '../../../_js/client.js';import * as bytes from '../../../_js/bytes.js';import * as str from '../../../_js/str.js';import * as ui from '../../../_js/ui.js';import * as dic from '../../../_js/dic.js';import * as timer from '../../../_js/timer.js';import * as time from '../../../_js/time.js';import * as storage from '../../../_js/storage.js';import * as b64 from '../../../_js/b64.js';import * as sys from '../../../_js/sys.js';import * as iter from '../../../_js/iter.js';import * as domo from '../../../_js/domo.js';import * as cryp from '../../../_js/cryp.js';




import * as menu from  "../../../libdm/menu.js";
import * as modalBox from  "../../../libdm/modalBox.js";
import * as quote from  "../../../data/quote.js";
import * as msg from  "../../../wgs/msg.js";
import * as global from  "../../../global.js";
import * as cts from  "../../../cts.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const updatingServerV =sys.$checkNull( [false]);


export  async  function mk(wg,  Nicks, mainNick, nick)  {sys.$params(arguments.length, 4);
  const {dbKey, ok,  Quotes, manuals, 
   Mquotes,  SvIdCodes} = await  client.send({ 
    prg: cts.appName,
    module: "Settings",
    source: "NickEditorPg",
    rq: "idata",
    mainNick:mainNick,
    nick:nick
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
  if (!sys.asBool(ok)) {
    msg.error(cts.failMsg, function()  {sys.$params(arguments.length, 0);});
    return;
  }

  arr.sort(Nicks,str.less);
  
   const SIdCodes =sys.$checkNull( arr.map(SvIdCodes,
    
    function(A)  {sys.$params(arguments.length, 1);  return {id: A[0], withHistoric: A[1], code: A[2]};}
  ));
  arr.sort(SIdCodes,function(S1, S2)  {sys.$params(arguments.length, 2);  return S1.id < S2.id;});

  const serverTestSpan =sys.$checkNull( Q("span"));
  const editBt =sys.$checkNull( Q("button")
    .text(II("Edit")))
  ;
  const cancelBt =sys.$checkNull( Q("button")
    .text(II("Cancel"))
    .disabled(true))
  ;
  const modifyBt =sys.$checkNull( Q("button")
    .text(II("Modify"))
    .disabled(true))
  ;
  const leftArea =sys.$checkNull( Q("textarea")
    .att("spellcheck", false)
    .att("rows", 25)
    .att("cols", 60)
    .disabled(true));
  const rightArea =sys.$checkNull( Q("textarea")
    .att("spellcheck", false)
    .att("rows", 25)
    .att("cols", 60)
    .disabled(true))
  ;
  const msgWait =sys.$checkNull( Q("div"));

  const showWaitV =sys.$checkNull( [[]]);

  

  
   function qEdit()  {sys.$params(arguments.length, 0);
    editBt.disabled(true);
    cancelBt.disabled(false);
    modifyBt.disabled(false);
    leftArea.disabled(false);
  };

  
   function qCancel() {sys.$params(arguments.length, 0);
    mk(wg, Nicks, mainNick, nick);
  };

  
   async  function qModify() {sys.$params(arguments.length, 0);
    const {dbKey, ok} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "NickEditorPg",
      rq: "qModify",
      dbKey: global.dbKeyV[0],
      mainNick: mainNick,
      nick: nick,
      qts: str.trim(leftArea.getValue())
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
    if (ok) {
      msg.ok(II("Quotes were successfully modified"), function(){sys.$params(arguments.length, 0);});
      mk(wg, Nicks, mainNick, nick);
    } else {
      msg.error(II("No modification was performed.<br>See Log."), function(){sys.$params(arguments.length, 0);});
    }
  };

  
   async  function download()  {sys.$params(arguments.length, 0);
    showWaitV[0](II("Downloading..."));
     const {result} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "NickEditorPg",
      rq: "download",
      dbKey: global.dbKeyV[0],
      mainNick: mainNick,
      nick: nick
    });
    showWaitV[0]("");

    switch (result) {
      case "error" :{ msg.error(II("Some error was found.<br>See Log."), function(){sys.$params(arguments.length, 0);});break;}
      case "warnings":{ msg.info(II("Some quote was modified.<br>See Log."), function(){sys.$params(arguments.length, 0);});break;}
      default:{ msg.ok(II("Download ok."), function(){sys.$params(arguments.length, 0);});}
    }
    mk(wg, Nicks, mainNick, nick);
  };

  
   async  function test()  {sys.$params(arguments.length, 0);
     const {result} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "NickEditorPg",
      rq: "test",
      mainNick: mainNick,
      nick: nick,
      qts: str.trim(leftArea.getValue())
    });
    switch (result) {
      case "error" :{ msg.error(II("An error was found.<br>See Log."), function(){sys.$params(arguments.length, 0);});break;}
      case "warnings":{ msg.info(II("Some warnings were found.<br>See Log."), function(){sys.$params(arguments.length, 0);});break;}
      default:{ msg.ok(II("Test ok."), function(){sys.$params(arguments.length, 0);});}
    }
  };

  
   async  function updateCode(sId, code)  {sys.$params(arguments.length, 2);
    if (sys.$eq(code , ""))
      msg.error(i18n.fmt(II("Nick code of %0 is missing"), [sId]), function()  {sys.$params(arguments.length, 0);});
    else {
      updatingServerV[0] =sys.$checkExists(updatingServerV[0],sys.$checkNull( true));
       const {dbKey} = await  client.send({
        prg: cts.appName,
        module: "Settings",
        source: "NickEditorPg",
        rq: "updateCode",
        dbKey: global.dbKeyV[0],
        nick: nick,
        svId: sId,
        code: code
      });
      global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
      mk(wg, Nicks, mainNick, nick);
    }
  };

  
   async  function serverTests() {sys.$params(arguments.length, 0);
    await timer.delay(timer.mk(100), function()  {sys.$params(arguments.length, 0);});
    if (updatingServerV[0]) {
      ui.alert("Updating server. Try again.");
      updatingServerV[0] =sys.$checkExists(updatingServerV[0],sys.$checkNull( false));
      return;
    }

    const withErrorsV =sys.$checkNull( [false]);
    const withWarningsV =sys.$checkNull( [false]);
     async  function test( SICs)  {sys.$params(arguments.length, 1);
      if (!sys.asBool(SICs)) {
        showWaitV[0]("");
        if (withErrorsV[0] && withWarningsV[0])
          msg.error(II("Errors and warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
        else if (withErrorsV[0])
          msg.error(II("Errors found.<br>See log."), function(){sys.$params(arguments.length, 0);});
        else if (withWarningsV[0])
          msg.error(II("Warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
        else
          msg.ok(II("Test ok."), function(){sys.$params(arguments.length, 0);});
        return;
      }

       const SIC =sys.$checkNull( arr.pop(SICs));
      if (SIC.withHistoric) {
        showWaitV[0](SIC.id);
        const {withErrors, withWarnings} = await  client.send({
          prg: cts.appName,
          module: "Settings",
          source: "NickEditorPg",
          rq: "serverTest",
          nick: nick,
          server: SIC.id,
          code: SIC.code
        });
        withErrorsV[0] ||=sys.$checkExists(withErrorsV[0],sys.$checkNull( withErrors));
        withWarningsV[0] ||=sys.$checkExists(withWarningsV[0],sys.$checkNull( withWarnings));
      }
      test(SICs);
    };
    test(SIdCodes);
  };

  
   async  function setRightArea(nick)  {sys.$params(arguments.length, 1);
    const {ok,  Quotes} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "NickEditorPg",
      rq: "getQuotes",
      nick: nick
    });
    if (!sys.asBool(ok)) {
      msg.error(i18n.fmt(
        II("Quotes of %0 can not be loaded.<br>See Log."), [nick]
      ));
      mk(wg, Nicks, mainNick, nick);
    }
    rightArea.text(arr.join(arr.map(Quotes,quote.toStr), "\n"));
  };

  

  editBt.on("click", function(e)  {sys.$params(arguments.length, 1); qEdit();});
  cancelBt.on("click", function(e)  {sys.$params(arguments.length, 1); qCancel();});
  modifyBt.on("click", function(e)  {sys.$params(arguments.length, 1); qModify();});

  
   function serversDiv()  {sys.$params(arguments.length, 0);
    
     function svTd(S)  {sys.$params(arguments.length, 1);
      const color =sys.$checkNull( S.withHistoric ? "#000000" : "#909090");
      const field =sys.$checkNull( Q("input")
        .att("type", "text")
        .style("width:125px")
        .value(S.code));
      field.on("change", function(e)  {sys.$params(arguments.length, 1); updateCode(S.id, str.trim(field.getValue()));});

       return Q("td").add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:center;color:" + color)
            .text(S.id)))
        .add(Q("tr")
          .add(Q("td")
            .add(field))))
      ;
    };

    const sz =sys.$checkNull( arr.size(SIdCodes));
    const cols =sys.$checkNull( 4);
    const rows =sys.$checkNull( Math.ceil(sz / cols));
    const Trs =sys.$checkNull( []); 
    for (let r = 0;r < rows; ++r) {
      const tr =sys.$checkNull( Q("tr"));
      for (let c = 0;c < cols; ++c) {
        const i =sys.$checkNull( r * cols + c);
        tr.add(i < sz
          ? svTd(SIdCodes[i])
          : Q("td")
        );
      }
      arr.push(Trs,tr);
    }

     return Q("div")
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .style("vertical-align:middle")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); serverTests();})
              .klass("link")
              .text(II("Test"))))
          .add(Q("td"))
          .add(Q("td")
            .add(serverTestSpan
              .removeAll()
              .add(ui.img("unknown"))))))
      .add(Q("table")
        .klass("frame")
        .att("align", "center")
        .adds(Trs))
    ;
  };

  
   function leftMenu()  {sys.$params(arguments.length, 0);
    const Lopts =sys.$checkNull( [
      menu.mkEntry([], editBt)
    ]);
    const Ropts =sys.$checkNull( [
      menu.mkEntry([], cancelBt),
      menu.mkEntry([], Q("span").html("&nbsp;")),
      menu.mkEntry([], modifyBt)
    ]);
     return menu.mk(Lopts, Ropts, "");
  };

  
   function rightMenu()  {sys.$params(arguments.length, 0);
     const sel =sys.$checkNull( ui.select("nks", arr.map(Nicks,
      function(n)  {sys.$params(arguments.length, 1);  return (sys.$eq(n , mainNick) ? "+" : "") + n;}
    )));
    const selEl =sys.$checkNull( sel.e);
    sel.on("change", function(e)  {sys.$params(arguments.length, 1); setRightArea(Nicks[selEl.selectedIndex]);});
    const Lopts =sys.$checkNull( [
      menu.mkEntry([], sel)
    ]);
     return menu.mk(Lopts, [], "");
  };

  
   function textAreaHeader()  {sys.$params(arguments.length, 0);  return Q("td")
      .klass("frame")
      .text(
        II("Date") + ":" +
        II("Open") + ":" +
        II("CloseN") + ":" +
        II("Max") + ":" +
        II("Min") + ":" +
        II("Vol") + ":" +
        II("State")
      )
    ;};

  
  showWaitV[0] =sys.$checkExists(showWaitV[0], function(nick)  {sys.$params(arguments.length, 1);
    msgWait.removeAll();

    if (sys.$neq(nick , "")) {
      const box =sys.$checkNull( modalBox.mk(
        Q("div")
          .add(Q("div")
            .style("text-align:center")
            .add(ui.img("wait2.gif").klass("frame")))
          .add(Q("div").style("text-align:center").html(nick)),
        false
      ));
      msgWait.add(modalBox.mkWg(box));
      modalBox.show(box,true);
    }
  });

  wg
    .removeAll()
    .add(msgWait)
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .style("font-size: 24px;")
          .text(str.fmt("%v [%v](%v)", [nick, arr.size(Quotes), manuals])))
        .add(Q("td")
          .style("text-align:right")
          .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); download();})
            .klass("link")
            .text(II("Download")))
          .add(Q("span").text(" · "))
          .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); test();})
            .klass("link")
            .text(II("Test")))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .add(ui.hrule(II("Servers"), 50))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .add(serversDiv())))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .add(ui.hrule(II("Quotes"), 50))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
        .add(Q("table").att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .add(Q("table")
                .style("width:100%")
                .add(Q("tr")
                  .add(Q("td")
                    .add(leftMenu())))
                .add(Q("tr")
                  .add(textAreaHeader()))
                .add(Q("tr")
                  .add(Q("td")
                    .add(leftArea
                      .text(arr.join(arr.map(Quotes,quote.toStr), "\n")))))))
            .add(Q("td")
              .add(Q("table")
                .style("width:100%")
                .add(Q("tr")
                  .add(Q("td")
                    .add(rightMenu())))
                .add(Q("tr")
                  .add(textAreaHeader()))
                .add(Q("tr")
                  .add(Q("td")
                    .add(rightArea
                      .text(arr.join(arr.map(Mquotes,quote.toStr), "\n")))))))))))
  );
};
