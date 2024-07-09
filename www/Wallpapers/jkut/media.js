import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as pict from  "./data/pict.js";
import * as infoWg from  "./wgs/infoWg.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export const screenWidth =sys.$checkNull( window.screen.width);


export const screenHeight =sys.$checkNull( window.screen.height);


export const picturesWidth =sys.$checkNull( 1920);


export const picturesHeight =sys.$checkNull( 1080);


export const picturesProportion =sys.$checkNull( 0.5625);


export const picturesTime =sys.$checkNull( 15000);


export const volume =sys.$checkNull( 0.5);


export const songsTime =sys.$checkNull( 5000);


export const fadeOutSongEnd =sys.$checkNull( 12000.0); 


export const fadeOutDanceTime =sys.$checkNull( 300000.0); 





export  function redimPicture()  {sys.$params(arguments.length, 0);
  const prop =sys.$checkNull(  screenHeight / screenWidth);
  if (sys.$eq(screenWidth , picturesWidth) && sys.$eq(screenHeight , picturesWidth)) {
     return {
        w: picturesWidth,
        h: picturesHeight,
        leftPadding: 0,
        topPadding: 0
      };
  } else if (prop < picturesProportion) {
    const w2 =sys.$checkNull( math.toInt(picturesWidth * screenHeight / picturesHeight));
     return {
        w: w2,
        h: screenHeight,
        leftPadding: math.toInt((screenWidth - w2) / 2),
        topPadding: 0
      };
  } else {
    const h2 =sys.$checkNull( math.toInt(picturesHeight * screenWidth / picturesWidth));
     return {
        w: screenWidth,
        h: h2,
        leftPadding: 0,
        topPadding: math.toInt((screenHeight - h2) / 2)
      };
  }
};



export  function visuals()  {sys.$params(arguments.length, 0);
  const redim =sys.$checkNull( redimPicture());

  const img =sys.$checkNull( Q("img")
    .style(
      "width:" + redim.w +"px;" +
      "height:" + redim.h + "px;" +
      "padding-top:" + redim.topPadding + "px;" +
      "padding-left:" + redim.leftPadding + "px;" +
      "z-index:1;" +
      "transition: opacity 5s linear;"
    ))
  ;

  const tm =sys.$checkNull( Q("div")
    .style(
      "z-index:2;" +
      "position:relative;" +
      "top:-250px;" +
      "left:0px;"
    ))
  ;

  const div =sys.$checkNull( Q("div")
    .style(
      "width:" + screenWidth +"px;" +
      "height:" + screenHeight + "px;" +
      "background-position: " +
        "top " + redim.topPadding + "px " +
        "right " + redim.leftPadding + "px;" +
      "background-repeat: no-repeat;" +
      "background-size:" + redim.w + "px " + redim.h + "px;"
    )
    .add(img)
    .add(tm))
  ;

   return {div:div, img:img, tm:tm};
};








export  function changePict(div, img, Info, group,  pic)  {sys.$params(arguments.length, 5);
  const url =sys.$checkNull( "img/fondosEscritorio/" + group + "/" + pic[pict.id]);
  div
    .setStyle(
      "background-image",
      "url('" + url + "')"
    );
  timer.delay(2000, function()  {sys.$params(arguments.length, 0);
    img
      .setStyle("opacity", "0")
    ;
    timer.delay(8000, function()  {sys.$params(arguments.length, 0);
      Info.changeContent(infoWg.pictureWg(group, pic));
      img
        .att("src", url)
        .setStyle("opacity", "1")
      ;
    });
  });
};



export  function fadeOut(withSignal, audio, millis)  {sys.$params(arguments.length, 3);
  const fadeSec =sys.$checkNull( millis / 1000);
  const volV =sys.$checkNull( [audio.volume]);
  if (withSignal) volV[0] /=sys.$checkExists(volV[0],sys.$checkNull( 3));
  audio.volume =sys.$checkExists(audio.volume,sys.$checkNull( volV[0]));
  const delta =sys.$checkNull( volV[0] / (fadeSec * 10));
  const tm2 =sys.$checkNull( timer.mk(100));
  timer.run(tm2, function()  {sys.$params(arguments.length, 0);
    volV[0] -=sys.$checkExists(volV[0],sys.$checkNull( delta));
    if (volV[0] <= 0) {
      audio.volume =sys.$checkExists(audio.volume,sys.$checkNull( 0));
      timer.stop(tm2);
      return;
    }
    audio.volume =sys.$checkExists(audio.volume,sys.$checkNull( volV[0]));
  });
};
