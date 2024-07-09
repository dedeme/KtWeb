import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as menu from  "./libdm/menu.js";
import * as cts from  "./cts.js";
import * as global from  "./global.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as danceSelectorPg from  "./pgs/danceSelectorPg.js";
import * as picturesPg from  "./pgs/picturesPg.js";
import * as songsPg from  "./pgs/songsPg.js";
import * as radioPg from  "./pgs/radioPg.js";
import * as standByPg from  "./pgs/standByPg.js";
import * as danceManagementPg from  "./pgs/danceManagementPg.js";
import * as songsManagementPg from  "./pgs/songsManagementPg.js";
import * as pictsManagementPg from  "./pgs/pictsManagementPg.js";
import * as timesPg from  "./pgs/timesPg.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (!sys.asBool(ok)) {
    ui.alert(II("Session is closed.\nAuthenticating from Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  
   const {lang} = await  client.send({
    prg: "Main", 
    source: "Main",
    rq: "lang"
  });
  if (sys.$eq(lang , "en")) i18n.en();

   const {dbKey} = await  client.send({
    prg: cts.appName,
    source: "MainPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

   async  function fastUpdate()  {sys.$params(arguments.length, 0);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "MainPg",
      rq: "update",
      dbKey: global.dbKeyV[0]
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
  };
  fastUpdate();

  const wallpapersBt =sys.$checkNull( Q("button").text(II("Wallpapers")));
  const songsBt =sys.$checkNull( Q("button").text(II("Wallpapers with Music")));
  const radioBt =sys.$checkNull( Q("button").text(II("Wallpapers with Radio")));
  const shortDanceBt =sys.$checkNull( Q("button").text(II("Short Dance")));
  const longDanceBt =sys.$checkNull( Q("button").text(II("Long Dance")));
  const standByBt =sys.$checkNull( Q("button").text(II("Stand By")));

  const allMenuV =sys.$checkNull( [false]);
  const showV =sys.$checkNull( [[]]);

  

  
   function reload()  {sys.$params(arguments.length, 0); window.location.assign("");};

  
   function keyInButton(ev, upOp, downOp)  {sys.$params(arguments.length, 3);
    if (sys.$eq(ev.key , "ArrowUp") && !sys.asBool(!sys.asBool(upOp))) {
      upOp[0].e.focus();
      ev.preventDefault();
      return;
    }

    if (sys.$eq(ev.key , "ArrowDown") && !sys.asBool(!sys.asBool(downOp))) {
      downOp[0].e.focus();
      ev.preventDefault();
      return;
    }
  };

  
   function showAllMenu()  {sys.$params(arguments.length, 0);
    allMenuV[0] =sys.$checkExists(allMenuV[0],sys.$checkNull( true));
    showV[0]();
  };

  

  
   function moreRows()  {sys.$params(arguments.length, 0);
     return allMenuV[0]
      ? [
          Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("Pictures Management"))
                .on("click", function(e)  {sys.$params(arguments.length, 1); pictsManagementPg.mk(wg, reload);}))),
          Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("Songs Management"))
                .on("click", function(e)  {sys.$params(arguments.length, 1); songsManagementPg.mk(wg, reload);}))),
          Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("Dance Management"))
                .on("click", function(e)  {sys.$params(arguments.length, 1); danceManagementPg.mk(wg, reload);}))),
          Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("Times Management"))
                .on("click", function(e)  {sys.$params(arguments.length, 1); timesPg.mk(wg, reload);})))
        ]
      : [Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("More") + "...")
                .on("click", function(e)  {sys.$params(arguments.length, 1); showAllMenu();})))
        ]
    ;
  };

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    wallpapersBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [], [songsBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); picturesPg.mk(wg, reload);})
    ;
    songsBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [wallpapersBt], [radioBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); songsPg.mk(wg, reload);})
    ;
    radioBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [songsBt], [shortDanceBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); radioPg.mk(wg, reload);})
    ;
    shortDanceBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [songsBt], [longDanceBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); danceSelectorPg.mk(wg, true, reload);})
    ;
    longDanceBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [shortDanceBt], [standByBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); danceSelectorPg.mk(wg, false, reload);})
    ;
    standByBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [longDanceBt], []);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); standByPg.mk(wg, reload);})
    ;

    wg
      .removeAll()
      .klass("margin")
      .add(Q("div")
        .klass("head")
        .text(II("Wallpapers")))
      .add(Q("div")
        .html("&nbsp;"))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .add(wallpapersBt)))
        .add(Q("tr")
          .add(Q("td")
            .add(songsBt)))
        .add(Q("tr")
          .add(Q("td")
            .add(radioBt)))
        .add(Q("tr")
          .add(Q("td")
            .add(shortDanceBt)))
        .add(Q("tr")
          .add(Q("td")
            .add(longDanceBt)))
        .add(Q("tr")
          .add(Q("td")
            .add(standByBt)))
        .add(Q("tr")
          .add(Q("td")
            .add(Q("hr"))))
        .adds(moreRows()))
    ;

    timer.delay(100, function()  {sys.$params(arguments.length, 0);
      const mainButtonOp =sys.$checkNull( sys.$null((wallpapersBt)));
      if (!sys.asBool(!sys.asBool(mainButtonOp))) {
        const eOp =sys.$checkNull( sys.$null((mainButtonOp[0].e)));
        if (!sys.asBool(!sys.asBool(eOp))) eOp[0].focus();
      }
    });
  });

  showV[0]();
};



const wg =sys.$checkNull( Q("div"));


export  function load()  {sys.$params(arguments.length, 0);
  mk(wg);
};


client.init(true, "KtWeb", function(isExpired)  {sys.$params(arguments.length, 1);
  const message =sys.$checkNull( isExpired
    ? II("Session is expired.")
    : II("Data base is out of date."))
  ;
  const msgWg =sys.$checkNull( Q("div"));
  msgPg.mk(msgWg, message, true);
  Q("@body")
    .removeAll()
    .add(msgWg)
    .add(cts.foot)
  ;
});

Q("@body")
  .removeAll()
  .add(wg)
  .add(cts.foot)
  .add(ui.upTop("up"))
;

load();
