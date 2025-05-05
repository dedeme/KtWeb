import * as arr from '../../../_js/arr.js';import * as bytes from '../../../_js/bytes.js';import * as storage from '../../../_js/storage.js';import * as sys from '../../../_js/sys.js';import * as client from '../../../_js/client.js';import * as b64 from '../../../_js/b64.js';import * as ui from '../../../_js/ui.js';import * as js from '../../../_js/js.js';import * as iter from '../../../_js/iter.js';import * as math from '../../../_js/math.js';import * as str from '../../../_js/str.js';import * as timer from '../../../_js/timer.js';import * as domo from '../../../_js/domo.js';import * as dic from '../../../_js/dic.js';import * as cryp from '../../../_js/cryp.js';import * as time from '../../../_js/time.js';




import * as menu from  "../../../libdm/menu.js";
import * as modalBox from  "../../../libdm/modalBox.js";
import * as co from  "../../../data/co.js";
import * as msg from  "../../../wgs/msg.js";
import * as nickEditorPg from  "../../../pgs/settings/nicks/nickEditorPg.js";
import * as global from  "../../../global.js";
import * as cts from  "../../../cts.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const msgWait =sys.$checkNull( Q("div"));

  
  
  const {dbKey, mainNick,  Cos,  Volumes} = await  client.send({
    prg: cts.appName,
    module: "Settings",
    source: "NicksPg",
    rq: "idata"
  });
  global.dbKeyV[0] = dbKey;

  const mainNickV = [mainNick];
  const optionV = ["*v"];
  const cosSize =sys.$checkNull( arr.size(Cos));

  const selectedsSize =sys.$checkNull( arr.reduce(Cos,0, function(r,  c)  {sys.$params(arguments.length, 2);  return c[co.isSelected] ? r + 1 : r;}));
  const stats =sys.$checkNull( Q("span")
    .text(i18n.fmt(
        II("Total: %0. Selected: %1."),
        [cosSize, selectedsSize])))
  ;
  const showWaitV = [[]];
  const showV = [[]];

  

   function showVolume()  {sys.$params(arguments.length, 0);
    optionV[0] = "*v";
    showV[0]();
  };

   function showList()  {sys.$params(arguments.length, 0);
    optionV[0] = "*l";
    showV[0]();
  };

   async  function setMainNick(nk)  {sys.$params(arguments.length, 1);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "NicksPg",
      rq: "setMain",
      dbKey: global.dbKeyV[0],
      nick: nk
    });
    global.dbKeyV[0] = dbKey;
    mainNickV[0] = nk;
    showV[0]();
  };

   async  function select(nk)  {sys.$params(arguments.length, 1);
    const cV =sys.$checkNull( arr.find(Cos,function( c)  {sys.$params(arguments.length, 1);  return sys.$eq(c[co.nick] , nk);}));
    if (!sys.asBool(!sys.asBool(cV))) {
       const c =sys.$checkNull( cV[0]);

       const {dbKey} = await  client.send({
        prg: cts.appName,
        module: "Settings",
        source: "NicksPg",
        rq: "select",
        dbKey: global.dbKeyV[0],
        nick: nk,
        value: !sys.asBool(c[co.isSelected])
      });
      global.dbKeyV[0] = dbKey;

      co.setSelected(c,!sys.asBool(c[co.isSelected]));
      const selectedsSize =sys.$checkNull(
        arr.reduce(Cos,0, function(r,  c)  {sys.$params(arguments.length, 2);  return c[co.isSelected] ? r + 1 : r;}));
      stats
        .removeAll()
        .text(i18n.fmt(
            II("Total: %0. Selected: %1."),
            [cosSize, selectedsSize]))
      ;
      showV[0]();
    }
  };

   function edit(nk)  {sys.$params(arguments.length, 1);
    optionV[0] = nk;
    showV[0]();
  };

   function download()  {sys.$params(arguments.length, 0);
    const withErrorsV = [false];
    const withWarningsV = [false];
     async  function download2( Nks)  {sys.$params(arguments.length, 1);
      if (!sys.asBool(Nks)) {
        showWaitV[0]("");
        if (withErrorsV[0] && withWarningsV[0])
          msg.error(II("Errors and warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
        else if (withErrorsV[0])
          msg.error(II("Errors found.<br>See log."), function(){sys.$params(arguments.length, 0);});
        else if (withWarningsV[0])
          msg.error(II("Warnings found.<br>See log."), function(){sys.$params(arguments.length, 0);});
        else
          msg.ok(II("Download ok."), function(){sys.$params(arguments.length, 0);});
        return;
      }
      const nk =sys.$checkNull( arr.pop(Nks));
      showWaitV[0](nk);
      const {dbKey, result} = await  client.send({
        prg: cts.appName,
        module: "Settings",
        source: "NickEditorPg", 
        dbKey: global.dbKeyV[0],
        rq: "download",
        mainNick: mainNickV[0],
        nick: nk
      });
      global.dbKeyV[0] = dbKey;
      if (sys.$eq(result , "error")) withErrorsV[0] = true;
      else if (sys.$eq(result , "warnings")) withWarningsV[0] = true;
      download2(Nks);
    };
     const Nicks =sys.$checkNull( arr.filter(
      arr.map(Cos,function( c)  {sys.$params(arguments.length, 1);  return c[co.nick];}),
      function(nk)  {sys.$params(arguments.length, 1);  return sys.$neq(nk , mainNickV[0]);}
    ));

    arr.unshift(Nicks,mainNickV[0]);
    download2(arr.reverse(Nicks));
  };

   function test()  {sys.$params(arguments.length, 0);
    const withErrorsV = [false];
    const withWarningsV = [false];
     async  function test2( Cs)  {sys.$params(arguments.length, 1);
      if (!sys.asBool(Cs)) {
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

       const c =sys.$checkNull(  arr.pop(Cs));
      showWaitV[0](c[co.nick]);
      const {withErrors, withWarnings} = await  client.send({
        prg: cts.appName,
        module: "Settings",
        source: "NicksPg",
        rq: "test",
        nick: c[co.nick]
      });
      withErrorsV[0] ||= withErrors;
      withWarningsV[0] ||= withWarnings;
      test2(Cs);
    };
    test2(arr.reverse(Cos));
  };

  

  
   function coTd( c)  {sys.$params(arguments.length, 1);  return Q("td")
      .style(
          "border-left: 1px solid rgb(110,130,150);" +
          "border-right: 1px solid rgb(110,130,150);" +
          "width:100px;white-space:nowrap;"
        )
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .att("title", II("Main"))
            .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); setMainNick(c[co.nick]);})
              .add(ui.img(sys.$eq(mainNickV[0] , c[co.nick]) ? "star" : "star2"))))
          .add(Q("td")
            .att("title", II("Selection"))
            .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); select(c[co.nick]);})
              .add(c[co.isSelected]
                  ? ui.img(Volumes[co.nick] < cts.trading ? "flag2" : "flag1")
                  : ui.led("#d0ddde", 6).setStyle("padding", "5px")
                )))
          .add(Q("td")
            .att(
                "title",
                sys.$eq(i18n.getLang() , "es")
                  ? math.toIso(Volumes[c[co.nick]], 0)
                  : math.toEn(Volumes[c[co.nick]], 0)
              )
            .add(ui.link(function(ev) {sys.$params(arguments.length, 1); edit(c[co.nick]);})
              .klass("link")
              .text(c[co.nick])))))
    ;};

  
   function list()  {sys.$params(arguments.length, 0);
    if (sys.$eq(optionV[0] , "*l")) arr.sort(Cos,function( c1,  c2)  {sys.$params(arguments.length, 2);  return c1[co.nick] < c2[co.nick];});
    else arr.sort(Cos,function( c1,  c2)  {sys.$params(arguments.length, 2);  return Volumes[c1[co.nick]] > Volumes[c2[co.nick]];});

    const Rows = [];
    const ncols = 6;
    const nrows =sys.$checkNull( math.toInt(Math.ceil(cosSize / ncols)));
    for (let i = 0;i < nrows; ++i) {
      const Tds = [];
      for (let j = 0;j < ncols; ++j) {
        const ico = j * nrows + i;
        arr.push(Tds,
          ico >= cosSize
            ? Q("td")
            : coTd(Cos[ico])
        );
      }
      arr.push(Rows,
        Q("tr")
          .adds(Tds)
      );
    }

     return Q("table")
      .klass("main")
      .add(Q("tr")
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
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .add(Q("table")
            .klass("white")
            .att("align", "center")
            .adds(Rows))))
    ;
  };

  showV[0] = function()  {sys.$params(arguments.length, 0);
    if (sys.$eq(mainNickV[0] , "")) {
      wg
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .klass("frame")
          .add(Q("tr")
            .add(Q("td")
              .text(II("Without companies")))))
      ;
      return;
    }

    if (!sys.asBool(arr.any(Cos,function( c)  {sys.$params(arguments.length, 1);  return sys.$eq(c[co.nick] , optionV[0]);})) && sys.$neq(optionV[0] , "*l"))
      optionV[0] = "*v";

    const menuWg =sys.$checkNull( menu.mk(
      [ menu.mkEntry([], stats)],
      [ menu.toption("*v", II("Volume"), showVolume),
        menu.separator(),
        menu.toption("*l", II("List"), showList)
      ],
      optionV[0]
    ));

    const body =sys.$checkNull( Q("div"));

    if (sys.$eq(optionV[0][0] , "*")) body.add(list());
    else nickEditorPg.mk(
        body, arr.map(Cos,function( c)  {sys.$params(arguments.length, 1);  return c[co.nick];}), mainNickV[0], optionV[0]
      );

    wg
      .removeAll()
      .add(menuWg)
      .add(body)
      .add(msgWait)
    ;
  };

  
  showWaitV[0] = function(nick)  {sys.$params(arguments.length, 1);
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
      modalBox.show(box,box);
    }
  };

  showV[0]();
};
