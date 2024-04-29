import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as modalBox from  "../../libdm/modalBox.js";
import * as vmenu from  "../../libdm/vmenu.js";
import * as server from  "../../data/server.js";
import * as msg from  "../../wgs/msg.js";
import * as global from  "../../global.js";
import * as cts from  "../../cts.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  async  function mk(wg, selected)  {sys.$params(arguments.length, 2);
  
  const {dbKey,  Svs, dailySv, historicSv,  Codes} = await  client.send({
    prg: cts.appName,
    module: "Settings",
    source: "ServersPg",
    rq: "idata",
    selected:selected
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

  const svSelectedOp =sys.$checkNull( arr.find(Svs,function( sv)  {sys.$params(arguments.length, 1);  return sys.$eq(sv[server.id] , selected);}));
   const svSelected =sys.$checkNull( !sys.asBool(svSelectedOp)
    ? server.mk("", "", false, false)
    : svSelectedOp[0])
  ;

  const dailyTestImg =sys.$checkNull( Q("span"));
  const historicTestImg =sys.$checkNull( Q("span"));
  const CodeFields =sys.$checkNull( []);
  const TestSpans =sys.$checkNull( []);
  const msgWait =sys.$checkNull( Q("div"));
  const showWaitV =sys.$checkNull( [[]]);

  const showV =sys.$checkNull( [[]]);

  

  
   function select(svId)  {sys.$params(arguments.length, 1); mk(wg, svId);};

   async  function dailyTest() {sys.$params(arguments.length, 0);
    dailyTestImg
      .removeAll()
      .add(ui.img("wait.gif"))
    ;
    const {withErrors, withWarnings} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "ServersPg",
      rq: "testDaily",
      svId: svSelected[server.id]
    });
    if (withErrors && withWarnings)
      msg.error(II("Errors and warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
    else if (withErrors)
      msg.error(II("Errors found.<br>See log."), function(){sys.$params(arguments.length, 0);});
    else if (withWarnings)
      msg.error(II("Warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
    else
      msg.ok(II("Test ok."), function(){sys.$params(arguments.length, 0);});

    dailyTestImg
      .removeAll()
      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); dailyTest();})
        .add(ui.img("unknown")
        .style("vertical-align:top")))
    ;
  };

   function historicTest() {sys.$params(arguments.length, 0);
     const NksCds =sys.$checkNull( dic.toArr(Codes));
    arr.sort(NksCds,function(Tp1, Tp2)  {sys.$params(arguments.length, 2);  return Tp1[0] > Tp2[0];});

    const withErrorsV =sys.$checkNull( [false]);
    const withWarningsV =sys.$checkNull( [false]);
     async  function test2(NksCds)  {sys.$params(arguments.length, 1);
      if (!sys.asBool(NksCds)) {
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

      const [nick, code] = arr.pop(NksCds);
      showWaitV[0](nick);
      const {withErrors, withWarnings} = await  client.send({
        prg: cts.appName,
        module: "Settings",
        source: "ServersPg",
        rq: "testCo",
        svId: svSelected[server.id],
        nick:nick,
        code:code
      });
      withErrorsV[0] ||=sys.$checkExists(withErrorsV[0],sys.$checkNull( withErrors));
      withWarningsV[0] ||=sys.$checkExists(withWarningsV[0],sys.$checkNull( withWarnings));
      test2(NksCds);
    };
    test2(NksCds);
  };

  
   async  function coTest(span, nick, field)  {sys.$params(arguments.length, 3);
    const code =sys.$checkNull( str.trim(field.getValue()));
    if (sys.$eq(code , "")) {
      msg.error("Code is empty", function(){sys.$params(arguments.length, 0);});
      return;
    }

    span
      .removeAll()
      .add(ui.img("wait.gif"))
    ;
    const {withErrors, withWarnings} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "ServersPg",
      rq: "testCo",
      svId: svSelected[server.id],
      nick: nick,
      code: code
    });
    if (withErrors && withWarnings)
      msg.error(II("Errors and warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
    else if (withErrors)
      msg.error(II("Errors found.<br>See log."), function(){sys.$params(arguments.length, 0);});
    else if (withWarnings)
      msg.error(II("Warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
    else
      msg.ok(II("Test ok."), function(){sys.$params(arguments.length, 0);});

    span
      .removeAll()
      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); coTest(span, nick, field);})
        .add(ui.img("unknown")
          .style("vertical-align:top")))
    ;
  };

  
   function reset()  {sys.$params(arguments.length, 0); mk(wg, svSelected[server.id]);};

  
   async  function modify()  {sys.$params(arguments.length, 0);
    
    const Codes =sys.$checkNull( {});
    for (const field  of sys.$forObject( CodeFields))
      dic.put(Codes, field.getAtt("id"), str.trim(field.getValue()));
     const {dbKey} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "ServersPg",
      rq: "setCodes",
      dbKey: global.dbKeyV[0],
      svId: svSelected[server.id],
      Codes: Codes
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
    mk(wg, svSelected[server.id]);
  };

  

  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    const Opts =sys.$checkNull( [vmenu.title(II("Servers")), vmenu.separator()]);
    for (const  sv  of sys.$forObject( Svs)) {
       function dailyWg() {sys.$params(arguments.length, 0);  return sv[server.withDaily]
        ? sys.$eq(sv[server.id] , dailySv)
          ? ui.img("star")
          : ui.led("#d0ddde", 6)
        : ui.img("stopped")
      ;};

       function historicWg()  {sys.$params(arguments.length, 0);  return sv[server.withHistoric]
        ? sys.$eq(sv[server.id] , historicSv)
          ? ui.img("star")
          : ui.led("#d0ddde", 6)
        : ui.img("stopped")
      ;};

      const normalWg =sys.$checkNull( Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("width:5px")
            .add(dailyWg().setStyle("vertical-align", "top")))
          .add(Q("td")
            .style("width:5px")
            .add(historicWg().setStyle("vertical-align", "top")))
          .add(Q("td")
            .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); select(sv[server.id]);})
            .klass("link")
            .setStyle("text-align", "left")
            .setStyle("padding-left", "4px")
            .text(sv[server.id])))))
      ;
      const selectWg =sys.$checkNull( Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("width:5px")
            .add(dailyWg().setStyle("vertical-align", "top")))
          .add(Q("td")
            .style("width:5px")
            .add(historicWg().setStyle("vertical-align", "top")))
          .add(Q("td")
            .add(Q("span")
              .style(
                  "padding-left:4px;" +
                  "text-align:left;" +
                  "font-style:italic;" +
                  "color:#803010"
                )
              .text(sv[server.id])))))
      ;

      arr.push(Opts,vmenu.mkEntry([sv[server.id]], normalWg, selectWg));
    }

    const vmenuWg =sys.$checkNull( vmenu.mk(Opts, svSelected[server.id]));

    const Rows =sys.$checkNull( []);
    const cols =sys.$checkNull( 4);
    if (sys.$neq(svSelected[server.id] , "")) {
      arr.push(Rows,
        Q("tr")
          .add(Q("td")
            .att("colspan", cols)
            .add(Q("div")
              .klass("head")
              .text(svSelected[server.name])))
      );

      dailyTestImg
        .removeAll()
        .add(svSelected[server.withDaily]
          ? ui.link(function(ev)  {sys.$params(arguments.length, 1); dailyTest();})
              .add(ui.img("unknown")
                .style("vertical-align:top"))
          : ui.img("unknown2")
            .style("vertical-align:top"))
      ;
      historicTestImg
        .removeAll()
        .add(svSelected[server.withHistoric]
          ? ui.link(function(ev)  {sys.$params(arguments.length, 1); historicTest();})
              .add(ui.img("unknown")
                .style("vertical-align:top"))
          : ui.img("unknown2")
            .style("vertical-align:top"))
      ;

      arr.push(Rows,
        Q("tr")
          .add(Q("td")
            .att("colspan", cols)
            .style("padding-top:4px;padding-bottom: 4px;" +
                   "border-bottom: 1px solid rgb(110,130,150);")
            .add(Q("table")
              .att("align", "center")
              .add(Q("tr")
                .add(Q("td")
                  .style(
                      "white-space:nowrap;text-align:right;" +
                      "width:50%;padding-rigth:4px"
                    )
                  .add(Q("span")
                    .add(dailyTestImg)
                    .add(Q("span")
                      .style("padding-left:4px")
                      .text(II("Daily Test")))))
                .add(Q("td")
                  .style(
                      "white-space:nowrap;text-align:left;" +
                      "width:50%;padding-left:4px"
                    )
                  .add(Q("span")
                    .add(historicTestImg)
                    .add(Q("span")
                      .style("padding-left:4px")
                      .text(II("Historic Test"))))))))
      );

      arr.push(Rows,
        Q("tr")
          .add(Q("td")
            .att("colspan", cols)
            .style("padding-top:4px;padding-bottom: 4px;" +
                   "border-bottom: 1px solid rgb(110,130,150);" +
                   "text-align:right;")
            .add(Q("button")
              .text(II("Reset"))
              .on("click", function(e)  {sys.$params(arguments.length, 1); reset();}))
            .add(Q("span")
              .text(" "))
            .add(Q("button")
              .text(II("Modify"))
              .on("click", function(e)  {sys.$params(arguments.length, 1); modify();})))
      );

      const Tds =sys.$checkNull( []);
      const len =sys.$checkNull( dic.size(Codes));
       const Nicks =sys.$checkNull( dic.keys(Codes));
      arr.sort(Nicks,str.less);
      for (let i = 0;i < len; ++i) {
        const nk =sys.$checkNull( Nicks[i]);
        const i1 =sys.$checkNull( i + 1);
        const nextNk =sys.$checkNull( i1 < len ? Nicks[i1] : Nicks[0]);

        const field =sys.$checkNull( ui.field(nextNk)
          .att("id", nk)
          .setStyle("width", "125px")
          .value(Codes[nk]));
        arr.push(CodeFields,field);

        const span =sys.$checkNull( Q("span")
          .add(svSelected[server.withHistoric]
            ? ui.link(function(ev)  {sys.$params(arguments.length, 1); coTest(span, nk, field);})
              .add(ui.img("unknown")
                .style("vertical-align:top"))
            : ui.img("unknown2")
                .style("vertical-align:top")));
        arr.push(TestSpans,span);

        arr.push(Tds,Q("td")
          .style("text-align:right;white-space: nowrap;")
          .add(Q("span")
            .text(nk + ": "))
          .add(field)
          .add(span)
        );
      }

      const rowsLen =sys.$checkNull( Math.ceil(len / cols));
      if (sys.$eq(rowsLen , 0)) {
        arr.push(Rows,Q("tr").add(Q("td").text(II("Without Nicks"))));
      } else {
        for (let i = 0;i < rowsLen; ++i) {
          const RowTds =sys.$checkNull( []);
          for (let j = 0;j < cols; ++j) {
            const tdix =sys.$checkNull( i + j * rowsLen);
            arr.push(RowTds,
              tdix < len
                ? sys.$eq(j , 0)
                  ? Tds[tdix]
                  : Tds[tdix].setStyle("border-left", "1px solid rgb(110,130,150)")
                : Q("td").setStyle("border-left", "1px solid rgb(110,130,150)")
            );
          }
          arr.push(Rows,Q("tr").adds(RowTds));
        }
      }
    }

    const body =sys.$checkNull( Q("table")
      .att("align", "center")
      .style("border-top: 1px solid rgb(110,130,150);" +
             "border-bottom: 1px solid rgb(110,130,150);" +
             "border-collapse: collapse;")
      .adds(Rows))
    ;

    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("width:5px;vertical-align:top")
            .add(vmenuWg))
          .add(Q("td")
            .add(body))))
      .add(msgWait)
    ;
  });

  
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

  showV[0]();
};
