import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as pict from  "../data/pict.js";
import * as clocksWg from  "../wgs/clocksWg.js";
import * as infoWg from  "../wgs/infoWg.js";
import * as pictTimeWg from  "../wgs/pictTimeWg.js";
import * as media from  "../media.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, reload)  {sys.$params(arguments.length, 2);
  const {dbKey, group,  picture} 
  = await  client.send({
    prg: cts.appName,
    source: "PicturesPg",
    rq: "idata"
  });
  global.dbKeyV[0] = dbKey;

  const groupV = [group];
  const pictV = [picture];

  const tm =sys.$checkNull( timer.mk(media.picturesTime));

  const Visuals =sys.$checkNull( media.visuals());

  const img =sys.$checkNull( Visuals.img
    .att("src", "img/fondosEscritorio/" + group + "/" + picture[pict.id]))
  ;

  const Info =sys.$checkNull( infoWg.mk( -350, infoWg.pictureWg(group, picture)));
  const PictTime =sys.$checkNull( pictTimeWg.mk( -350));

  const Clocks =sys.$checkNull( clocksWg.mk(Visuals.tm));

  

  
   function goBack(e)  {sys.$params(arguments.length, 1);
    timer.stop(tm);
    reload();
  };

  
   function keyDown(ev)  {sys.$params(arguments.length, 1);
    if (sys.$eq(ev.key , "ArrowUp")) {
      goBack(ev);
      ev.preventDefault();
      return;
    }

    if (sys.$eq(ev.key , "ArrowDown")) {
      Info.changeOpacity();
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
    .add(Info.wg)
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
  timer.run (tm, async  function()  {sys.$params(arguments.length, 0);
    const {dbKey, group,  picture} 
    = await  client.send({
      prg: cts.appName,
      source: "PicturesPg",
      rq: "idata"
    });
    global.dbKeyV[0] = dbKey;

    if (sys.$neq(group , groupV[0]) || sys.$neq(picture[pict.id] , pictV[0][pict.id])) {
      groupV[0] = group;
      pictV[0] = picture;
      media.changePict(div, img, Info, group, picture);
    }
  });
};
