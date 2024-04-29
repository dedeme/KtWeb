import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../data/cts.js";
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
    const isHidden =sys.$checkNull( sys.$eq(wg.e.style.getPropertyValue("opacity") , "0"));
    wg.setStyle("opacity", isHidden ? "1" : "0");
  };

  
   function changeContent(newContent)  {sys.$params(arguments.length, 1);
    content.removeAll().add(newContent);};

   return {wg:wg, changeOpacity:changeOpacity, changeContent:changeContent};
};



export  function pictureWg(group, Pict)  {sys.$params(arguments.length, 2);
  const levelV =sys.$checkNull( [Pict.level]);
  const sightsWg =sys.$checkNull( Q("div")
    .style("cursor:pointer")
    .text(Pict.sights + " / " + levelV[0]))
  ;

  
   async  function changeLevel(ev)  {sys.$params(arguments.length, 1);
    ev.preventDefault();
    ev.stopPropagation();

    levelV[0] +=sys.$checkExists(levelV[0],sys.$checkNull( 1));
    if (levelV[0] > cts.maxPictLevel) levelV[0] =sys.$checkExists(levelV[0],sys.$checkNull( cts.minPictLevel));

    await client.send({
      prg: cts.appName,
      source: "Info",
      rq: "changePictLevel",
      group:group,
      id: Pict.id,
      level: levelV[0]
    });

    sightsWg
      .text(Pict.sights + " / " + levelV[0]);
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
        .text(Pict.id))
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



export  function songWg(songGroup, Song, audio)  {sys.$params(arguments.length, 3);
  const levelV =sys.$checkNull( [Song.level]);
  const nameWg =sys.$checkNull( Q("div")
    .text(Song.id))
  ;
  const sightsWg =sys.$checkNull( sys.$eq(Song.level , 0)
    ? Q("div")
      .style("cursor:pointer")
      .text("· >> ·")
    : Q("div")
      .style("cursor:pointer")
      .text(Song.sights + " / " + levelV[0]))
  ;

  
   async  function changeLevel(ev)  {sys.$params(arguments.length, 1);
    ev.preventDefault();
    ev.stopPropagation();

    levelV[0] +=sys.$checkExists(levelV[0],sys.$checkNull( 1));
    if (levelV[0] > cts.maxSongLevel) levelV[0] =sys.$checkExists(levelV[0],sys.$checkNull( cts.minSongLevel));

    await client.send({
      prg: cts.appName,
      source: "Info",
      rq: "changeSongLevel",
      group: songGroup,
      id: Song.id,
      level: levelV[0]
    });

    sightsWg
      .text(Song.sights + " / " + levelV[0]);
  };

  
   async  function changeRadio(ev)  {sys.$params(arguments.length, 1);
    ev.preventDefault();
    ev.stopPropagation();

    const Rp =sys.$checkNull( await  client.send({
      prg: cts.appName,
      source: "Info",
      rq: "changeRadio",
      group: songGroup
    }));
    const radioName =sys.$checkNull( Rp.radioName);
    const radioUrl =sys.$checkNull( Rp.radioUrl);

    nameWg
      .text(radioName);
    audio.src =sys.$checkExists(audio.src,sys.$checkNull( radioUrl));
  };

  if (Song.level > 0) sightsWg.on("click", changeLevel);
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





export  function danceWg(songGroup, song, tm, audio)  {sys.$params(arguments.length, 4);
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
        .text(song))
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
