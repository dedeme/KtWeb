import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as cts from  "../data/cts.js";
import * as pict from  "../data/pict.js";
import * as song from  "../data/song.js";
import * as clocks from  "../wgs/clocks.js";
import * as info from  "../wgs/info.js";
import * as pictTime from  "../wgs/pictTime.js";
import * as media from  "../media.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, reload)  {sys.$params(arguments.length, 2);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "Radio",
    rq: "idata"
  }));

  const group =sys.$checkNull( Rp.group);
  const groupV =sys.$checkNull( [group]);
  const Pict =sys.$checkNull( pict.fromJs(Rp.pict));
  const PictV =sys.$checkNull( [Pict]);
  const radioName =sys.$checkNull( Rp.radioName);
  const radioUrl =sys.$checkNull( Rp.radioUrl);


  const pictTm =sys.$checkNull( timer.mk(media.picturesTime));

  const Visuals =sys.$checkNull( media.visuals());

  const img =sys.$checkNull( Visuals.img
    .att("src", "img/fondosEscritorio/" + group + "/" + Pict.id))
  ;

  const Clocks =sys.$checkNull( clocks.mk(Visuals.tm));

  const audio =sys.$checkNull( new  Audio());
  audio.src =sys.$checkExists(audio.src,sys.$checkNull( radioUrl));
  audio.controls =sys.$checkExists(audio.controls,sys.$checkNull( true));
  audio.volume =sys.$checkExists(audio.volume,sys.$checkNull( media.volume));
  audio.autoplay =sys.$checkExists(audio.autoplay,sys.$checkNull( true));


  const InfoPicture =sys.$checkNull( info.mk( -485, info.pictureWg(group, Pict)));
  const InfoSong =sys.$checkNull( info.mk( 
    -480,
    info.songWg("Radio", song.mk(0, 0, 0, radioName), audio)
  ));
  const PictTime =sys.$checkNull( pictTime.mk( -480));

  const goBackCallsV =sys.$checkNull( [0]);

  

  
   function goBack(e)  {sys.$params(arguments.length, 1);
    if (goBackCallsV[0] > 0) {
      reload();
      return;
    }

    timer.stop(pictTm);
    goBackCallsV[0] +=sys.$checkExists(goBackCallsV[0],sys.$checkNull( 1));
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
      "url('img/fondosEscritorio/" + group + "/" + Pict.id + "')"
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
  timer.run (pictTm, async  function()  {sys.$params(arguments.length, 0);
    const Rp =sys.$checkNull( await  client.send({
      prg: cts.appName,
      source: "Songs",
      rq: "pictData"
    }));
    const newGroup =sys.$checkNull( Rp.group);
    const NewPict =sys.$checkNull( pict.fromJs(Rp.pict));
    if (sys.$neq(newGroup , groupV[0]) || sys.$neq(NewPict.id , PictV[0].id)) {
      groupV[0] =sys.$checkExists(groupV[0],sys.$checkNull( newGroup));
      PictV[0] =sys.$checkExists(PictV[0],sys.$checkNull( NewPict));
      media.changePict(div, img, InfoPicture, newGroup, NewPict);
    }
  });
};
