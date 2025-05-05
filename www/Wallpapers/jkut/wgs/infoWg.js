import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as pict from  "../data/pict.js";
import * as song from  "../data/song.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  function mk(padding, continedWg)  {sys.$params(arguments.length, 2);
  const content =sys.$checkNull( Q("div")
    .add(continedWg))
  ;
  const wg =sys.$checkNull( Q("div")
    .style(
        "z-index:3;" +
        "position:relative;" +
        "top: " + padding + "px;" +
        "left:15px;" +
        "opacity:0;" +
        "transition: opacity 2s linear;"
      )
    .add(content))
  ;

  
   function changeOpacity()  {sys.$params(arguments.length, 0);
    const isHidden = sys.$eq(wg.e.style.getPropertyValue("opacity") , "0");
    wg.setStyle("opacity", isHidden ? "1" : "0");
  };

  
   function changeContent(newContent)  {sys.$params(arguments.length, 1);
    content.removeAll().add(newContent);};

   return {wg:wg, changeOpacity:changeOpacity, changeContent:changeContent};
};



export  function pictureWg(group,  p)  {sys.$params(arguments.length, 2);
  const levelV = [p[pict.level]];
  const sightsWg =sys.$checkNull( Q("div")
    .style("cursor:pointer")
    .text(p[pict.sights] + " / " + levelV[0]))
  ;

  
   async  function changeLevel(ev)  {sys.$params(arguments.length, 1);
    ev.preventDefault();
    ev.stopPropagation();

    levelV[0] += 1;
    if (levelV[0] > cts.maxPictLevel) levelV[0] =sys.$checkNull( cts.minPictLevel);

     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "InfoWg",
      rq: "changePictLevel",
      dbKey: global.dbKeyV[0],
      group:group,
      id: p[pict.id],
      level: levelV[0]
    });
    global.dbKeyV[0] = dbKey;

    sightsWg
      .text(p[pict.sights] + " / " + levelV[0]);
  };

  sightsWg.on("click", changeLevel);

  const tb =sys.$checkNull( Q("table")
    .klass("frame3")
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", "3")
        .add(ui.hrule(II("Picture"), 50))))
    .add(Q("tr")
      .add(Q("td")
        .style("text-align:center")
        .text(II("Group")))
      .add(Q("td")
        .style("padding-left:5px")
        .text(II("Name")))
      .add(Q("td")
        .style("text-align:center")
        .text(II("Sights"))))
    .add(Q("tr")
      .add(Q("td")
        .klass("frame")
        .style("width:45px;white-space:nowrap;text-align:center")
        .text(group))
      .add(Q("td")
        .klass("frame")
        .style("max-width: 500px;white-space:nowrap;overflow: hidden;")
        .text(p[pict.id]))
      .add(Q("td")
        .style("width:45px;white-space:nowrap;text-align:center")
        .klass("frame")
        .add(sightsWg))))
  ;
  tb.on("click", function(e)  {sys.$params(arguments.length, 1);
    e.preventDefault();
    e.stopPropagation();
  });
   return tb;
};



export  function songWg(songGroup,  s, audio)  {sys.$params(arguments.length, 3);
  const levelV = [s[song.level]];
  const nameWg =sys.$checkNull( Q("div")
    .text(s[song.id]))
  ;
  const sightsWg =sys.$checkNull( sys.$eq(s[song.level] , 0)
    ? Q("div")
      .style("cursor:pointer")
      .text("· >> ·")
    : Q("div")
      .style("cursor:pointer")
      .text(s[song.sights] + " / " + levelV[0]))
  ;

  
   async  function changeLevel(ev)  {sys.$params(arguments.length, 1);
    ev.preventDefault();
    ev.stopPropagation();

    levelV[0] += 1;
    if (levelV[0] > cts.maxSongLevel) levelV[0] =sys.$checkNull( cts.minSongLevel);

     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "InfoWg",
      rq: "changeSongLevel",
      dbKey: global.dbKeyV[0],
      group: songGroup,
      id: s[song.id],
      level: levelV[0]
    });
    global.dbKeyV[0] = dbKey;

    sightsWg
      .text(s[song.sights] + " / " + levelV[0]);
  };

  
   async  function changeRadio(ev)  {sys.$params(arguments.length, 1);
    ev.preventDefault();
    ev.stopPropagation();

    const {dbKey, radioName, radioUrl} 
    = await  client.send({
      prg: cts.appName,
      source: "InfoWg",
      rq: "changeRadio",
      dbKey: global.dbKeyV[0]
    });
    global.dbKeyV[0] = dbKey;

    nameWg
      .text(radioName);
    audio.src = radioUrl;
  };

  if (s[song.level] > 0) sightsWg.on("click", changeLevel);
  else sightsWg.on("click", changeRadio);

  const tb =sys.$checkNull( Q("table")
    .klass("frame3")
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", "3")
        .add(ui.hrule(II("Song"), 50))))
    .add(Q("tr")
      .add(Q("td")
        .style("text-align:center")
        .text(II("Group")))
      .add(Q("td")
        .style("padding-left:5px")
        .text(II("Name")))
      .add(Q("td")
        .style("text-align:center")
        .text(II("Sights"))))
    .add(Q("tr")
      .add(Q("td")
        .klass("frame")
        .style("width:45px;white-space:nowrap;text-align:center")
        .text(songGroup))
      .add(Q("td")
        .klass("frame")
        .style("max-width: 500px;white-space:nowrap;overflow: hidden;")
        .add(nameWg))
      .add(Q("td")
        .style("width:45px;white-space:nowrap;text-align:center")
        .klass("frame")
        .add(sightsWg)))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", "3")
        .style("text-align:center")
        .add(Q(audio)))))
  ;
  tb.on("click", function(e)  {sys.$params(arguments.length, 1);
    e.preventDefault();
    e.stopPropagation();
  });
   return tb;
};





export  function danceWg(songGroup, ssong, tm, audio)  {sys.$params(arguments.length, 4);
   return Q("table")
    .klass("frame3")
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", "3")
        .add(ui.hrule(II("Dance Song"), 50))))
    .add(Q("tr")
      .add(Q("td")
        .style("text-align:center")
        .text(II("Group")))
      .add(Q("td")
        .style("padding-left:5px")
        .text(II("Name")))
      .add(Q("td")
        .style("text-align:center")
        .text(II("Time"))))
    .add(Q("tr")
      .add(Q("td")
        .klass("frame")
        .style("width:45px;white-space:nowrap;text-align:center")
        .text(songGroup))
      .add(Q("td")
        .klass("frame")
        .style("max-width: 500px;white-space:nowrap;overflow: hidden;")
        .text(ssong))
      .add(Q("td")
        .style("width:45px;white-space:nowrap;text-align:center")
        .klass("frame")
        .text(tm + "'")))
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", "3")
        .style("text-align:center")
        .add(Q(audio))))
  ;
};
