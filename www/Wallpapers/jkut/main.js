import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as menu from  "./libdm/menu.js";
import * as cts from  "./data/cts.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as danceSelector from  "./pgs/danceSelector.js";
import * as pictures from  "./pgs/pictures.js";
import * as songs from  "./pgs/songs.js";
import * as radio from  "./pgs/radio.js";
import * as standBy from  "./pgs/standBy.js";
import * as danceManagement from  "./pgs/danceManagement.js";
import * as songsManagement from  "./pgs/songsManagement.js";
import * as pictsManagement from  "./pgs/pictsManagement.js";
import * as times from  "./pgs/times.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (!sys.asBool(ok)) {
    ui.alert(II("KtWeb session is closed.\nAuthenticating from KtWeb:Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  const rp =sys.$checkNull( await  client.send({
    prg: "Main", 
    source: "Main",
    rq: "lang"
  }));
  if (sys.$eq(rp.lang , "en")) i18n.en();

  client.send({
    prg: cts.appName,
    source: "Main",
    rq: "update"
  });

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
                .on("click", function(e)  {sys.$params(arguments.length, 1); pictsManagement.mk(wg, reload);}))),
          Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("Songs Management"))
                .on("click", function(e)  {sys.$params(arguments.length, 1); songsManagement.mk(wg, reload);}))),
          Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("Dance Management"))
                .on("click", function(e)  {sys.$params(arguments.length, 1); danceManagement.mk(wg, reload);}))),
          Q("tr")
            .add(Q("td")
              .add(Q("button")
                .text(II("Times Management"))
                .on("click", function(e)  {sys.$params(arguments.length, 1); times.mk(wg, reload);})))
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
      .on("click", function(e)  {sys.$params(arguments.length, 1); pictures.mk(wg, reload);})
    ;
    songsBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [wallpapersBt], [radioBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); songs.mk(wg, reload);})
    ;
    radioBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [songsBt], [shortDanceBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); radio.mk(wg, reload);})
    ;
    shortDanceBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [songsBt], [longDanceBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); danceSelector.mk(wg, true, reload);})
    ;
    longDanceBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [shortDanceBt], [standByBt]);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); danceSelector.mk(wg, false, reload);})
    ;
    standByBt
      .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, [longDanceBt], []);})
      .on("click", function(e)  {sys.$params(arguments.length, 1); standBy.mk(wg, reload);})
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
        const EOp =sys.$checkNull( sys.$null((mainButtonOp[0].e)));
        if (!sys.asBool(!sys.asBool(EOp))) EOp[0].focus();
      }
    });
  });

  showV[0]();
};



const wg =sys.$checkNull( Q("div"));


export  function load()  {sys.$params(arguments.length, 0);
  mk(wg);
};

client.init(true, "KtWeb", function()  {sys.$params(arguments.length, 0);
  const msgWg =sys.$checkNull( Q("div"));
  msgPg.mk(msgWg, II("Session is expired."), true);
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
