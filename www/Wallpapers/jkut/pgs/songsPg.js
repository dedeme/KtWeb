import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as pict from  "../data/pict.js";
import * as song from  "../data/song.js";
import * as clocksWg from  "../wgs/clocksWg.js";
import * as infoWg from  "../wgs/infoWg.js";
import * as pictTimeWg from  "../wgs/pictTimeWg.js";
import * as media from  "../media.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, reload)  {sys.$params(arguments.length, 2);
  const {dbKey, group,  picture, songGroup,  ssong} 
  = await  client.send({
    prg: cts.appName,
    source: "SongsPg",
    rq: "idata"
  });
  global.dbKeyV[0] = dbKey;

  const groupV = [group];
  const pictV = [picture];
  const songGroupV = [songGroup];
  const songV = [ssong];

  const pictTm =sys.$checkNull( timer.mk(media.picturesTime));
  const songTm =sys.$checkNull( timer.mk(media.songsTime));

  const Visuals =sys.$checkNull( media.visuals());

  const img =sys.$checkNull( Visuals.img
    .att("src", "img/fondosEscritorio/" + group + "/" + picture[pict.id]))
  ;

  const Clocks =sys.$checkNull( clocksWg.mk(Visuals.tm));

  const audio = new  Audio();
  audio.src = "songs/" + songGroup + "/" + ssong[song.id];
  audio.controls = true;
  audio.volume =sys.$checkNull( media.volume);
  const audioLoadedV = [false];
  timer.delay (1000, function()  {sys.$params(arguments.length, 0);
    const tm1 =sys.$checkNull( timer.mk(500));
    timer.run(tm1, function()  {sys.$params(arguments.length, 0);
      const d = audio.duration - 0.1;
      audio.currentTime = d;
      if (sys.$eq(d , audio.currentTime) || sys.$eq(audio.currentTime , 0)) {
        timer.stop(tm1);
        const tm2 =sys.$checkNull( timer.mk(500));
        const t = (audio.duration * ssong[song.lapse]) / 100.0;
        timer.run(tm2, function()  {sys.$params(arguments.length, 0);
          audio.currentTime = t;
          if (sys.$eq(t , audio.currentTime) || sys.$eq(audio.currentTime , 0)) {
            audio.play();
            timer.stop(tm2);
            audioLoadedV[0] = true;
          }
        });
      }
    });
  });

  const InfoPicture =sys.$checkNull( infoWg.mk( -485, infoWg.pictureWg(group, picture)));
  const InfoSong =sys.$checkNull( infoWg.mk( -480, infoWg.songWg(songGroup, ssong, audio)));
  const PictTime =sys.$checkNull( pictTimeWg.mk( -480));

  const goBackCallsV = [0];

  

  
   function goBack(e)  {sys.$params(arguments.length, 1);
    if (goBackCallsV[0] > 0) {
      reload();
      return;
    }

    timer.stop(pictTm);
    timer.stop(songTm);
    goBackCallsV[0] += 1;
    media.fadeOut(false, audio, media.fadeOutSongEnd);
    timer.delay(math.toInt(media.fadeOutSongEnd), reload);
  };

  
   function keyDown(ev)  {sys.$params(arguments.length, 1);
    if (sys.$eq(ev.key , "ArrowUp")) {
      goBack(ev);
      ev.preventDefault();
      return;
    }

    if (sys.$eq(ev.key , "ArrowDown")) {
      InfoPicture.changeOpacity();
      InfoSong.changeOpacity();
      ev.preventDefault();
      return;
    }

    if (sys.$eq(ev.key , "ArrowLeft")) {
      Clocks.clockChangeOpacity();
      ev.preventDefault();
      return;
    }

    if (sys.$eq(ev.key , "ArrowRight")) {
      Clocks.chronChangeOpacity();
      ev.preventDefault();
      return;
    }

    if (ev.key >= "1" && ev.key <= "6") {
      PictTime.show(math.fromStr(ev.key)[0]);
      ev.preventDefault();
      return;
    }
  };

  

  const div =sys.$checkNull( Visuals.div
    .setStyle(
      "background-image",
      "url('img/fondosEscritorio/" + group + "/" + picture[pict.id] + "')"
    )
    .add(InfoPicture.wg)
    .add(InfoSong.wg)
    .add(PictTime.wg)
    .on("click", goBack))
  ;

  Q("@body")
    .on("keydown", keyDown);

  wg
    .removeAll()
    .add(div)
  ;

  div.e.requestFullscreen();
  const firstPictureV = [true];
  timer.run (pictTm, async  function()  {sys.$params(arguments.length, 0);
    if (!sys.asBool(firstPictureV[0]) && !sys.asBool(audioLoadedV[0])) return;
    firstPictureV[0] = false;

    const {dbKey, group,  picture} 
    = await  client.send({
      prg: cts.appName,
      source: "SongsPg",
      rq: "pictData"
    });
    global.dbKeyV[0] = dbKey;
    if (sys.$neq(group , groupV[0]) || sys.$neq(picture[pict.id] , pictV[0][pict.id])) {
      groupV[0] = group;
      pictV[0] = picture;
      media.changePict(div, img, InfoPicture, group, picture);
    }
  });

  timer.run (songTm, async  function()  {sys.$params(arguments.length, 0);
    if (audio.ended) {
      audio.pause();
      audioLoadedV[0] = false;
      const {dbKey, group, ssong} 
      = await  client.send({
        prg: cts.appName,
        source: "SongsPg",
        rq: "newSong",
        dbKey: global.dbKeyV[0]
      });
      global.dbKeyV[0] = dbKey;
      songGroupV[0] = group;
      songV[0] = ssong;
      audio.src = "songs/" + songGroup + "/" + ssong[song.id];
      InfoSong.changeContent(infoWg.songWg(songGroup, ssong, audio));
      timer.delay (1000, function()  {sys.$params(arguments.length, 0);
        const tm1 =sys.$checkNull( timer.mk(50));
        timer.run(tm1, function()  {sys.$params(arguments.length, 0);
          const d = audio.duration - 0.1;
          audio.currentTime = d;
          if (sys.$eq(d , audio.currentTime) || sys.$eq(audio.currentTime , 0)) {
            timer.stop(tm1);
            const tm2 =sys.$checkNull( timer.mk(50));
            const t = (audio.duration * ssong[song.lapse]) / 100.0;
            timer.run(tm2, function()  {sys.$params(arguments.length, 0);
              audio.currentTime = t;
              if (sys.$eq(t , audio.currentTime) || sys.$eq(audio.currentTime , 0)) {
                audio.play();
                timer.stop(tm2);
                audioLoadedV[0] = true;
              }
            });
          }
        });
      });
    } else if (sys.$eq(audioLoadedV[0] , true)) {
       const {dbKey} = await  client.send({
        prg: cts.appName,
        source: "SongsPg",
        rq: "setLapse",
        dbKey: global.dbKeyV[0],
        group: songGroupV[0],
        ssong: songV[0][song.id],
        lapse: audio.currentTime * 100 / audio.duration
      });
      global.dbKeyV[0] = dbKey;
    }
  });
};
