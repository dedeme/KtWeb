import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




const Q =sys.$checkNull( ui.q);















export function mk0 (isChron,start,width,height,bg,number,axis,hhand,mhand,shand,fn) { sys.$params(arguments.length, 11); return [ isChron, start, width, height, bg, number, axis, hhand, mhand, shand, fn];}export const isChron = 0;export const start = 1;export const width = 2;export const height = 3;export const bg = 4;export const number = 5;export const axis = 6;export const hhand = 7;export const mhand = 8;export const shand = 9;export const fn = 10;






export  function mk()  {sys.$params(arguments.length, 0);  return mk0(
    false, time.now(), 120, 120,
    "#ffffff", "#000033", "#446688", "#446688", "#446688", "#000033",
      function(tm)  {sys.$params(arguments.length, 1);}
  );};


export  function setChron(O, v)  {sys.$params(arguments.length, 2); O[isChron] = v;};


export  function setStart(O, v)  {sys.$params(arguments.length, 2); O[start] = v;};


export  function setWidth(O, v)  {sys.$params(arguments.length, 2); O[width] = v;};


export  function setHeight(O, v)  {sys.$params(arguments.length, 2); O[height] = v;};


export  function setBg(O, v)  {sys.$params(arguments.length, 2); O[bg] = v;};


export  function setNumber(O, v)  {sys.$params(arguments.length, 2); O[number] = v;};


export  function setAxis(O, v)  {sys.$params(arguments.length, 2); O[axis] = v;};


export  function setHhand(O, v)  {sys.$params(arguments.length, 2); O[hhand] = v;};


export  function setMhand(O, v)  {sys.$params(arguments.length, 2); O[mhand] = v;};


export  function setShand(O, v)  {sys.$params(arguments.length, 2); O[shand] = v;};


export  function setFn(O, v)  {sys.$params(arguments.length, 2); O[fn] = v;};



export  function mkWg(c)  {sys.$params(arguments.length, 1);
  const cv =sys.$checkNull( Q("canvas")
    .att("width", c[width])
    .att("height", c[height]))
  ;
  const el =sys.$checkNull( cv.e);
  const ctx =sys.$checkNull( el.getContext("2d"));
  const radius0 = el.height / 2;
  ctx.translate(radius0, radius0);
  const radius = radius0 * 0.90;

  
   function drawBack()  {sys.$params(arguments.length, 0);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle =sys.$checkNull( c[bg]);
    ctx.fill();
    const grad =sys.$checkNull( ctx.createRadialGradient(
      0, 0, radius * 0.95, 0, 0, radius * 1.05
    ));
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
  };

  
   function drawBorder()  {sys.$params(arguments.length, 0);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.93, 0, 2 * Math.PI);
    ctx.fillStyle =sys.$checkNull( c[bg]);
    ctx.fill();
  };

  
   function drawNumbers()  {sys.$params(arguments.length, 0);
    ctx.fillStyle =sys.$checkNull( c[number]);
    ctx.font = radius * 0.16 + "px sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1;num < 13; ++num) {
      const ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0,  -radius * 0.82);
      ctx.rotate( -ang);
      ctx.fillText(math.toStr(num), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.82);
      ctx.rotate( -ang);
    }
  };

  
   function drawHand(pos, len, width, color)  {sys.$params(arguments.length, 4);
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0,  -len);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate( -pos);
  };

  
   function drawTime()  {sys.$params(arguments.length, 0);
    const now =sys.$checkNull( c[isChron]
      ? time.now() - c[start] - 3600000
      : time.now())
    ;

    
    c[fn](now);

    const hour0 = time.hour(now) % 12;
    const minute0 =sys.$checkNull( time.minute(now));
    const second0 =sys.$checkNull( time.second(now));
    
    const hour = (hour0 * Math.PI / 6) +
      (minute0 * Math.PI / (6 * 60)) +
      (second0 * Math.PI / (360 * 60));
    drawHand(hour, radius * 0.5, radius * 0.07, c[hhand]);
    
    const minute = (minute0 * Math.PI / 30) + (second0 * Math.PI / (30 * 60));
    drawHand(minute, radius * 0.8, radius * 0.07, c[mhand]);
    
    const second = second0 * Math.PI / 30;
    drawHand(second, radius * 0.9, radius * 0.02, c[shand]);
  };

  
   function drawAxis()  {sys.$params(arguments.length, 0);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle =sys.$checkNull( c[axis]);
    ctx.fill();
  };

  
   function paint()  {sys.$params(arguments.length, 0);
    drawBorder();
    drawNumbers();
    drawTime();
    drawAxis();
  };

  drawBack();
  paint();
  timer.run(timer.mk(1000), paint);

   return cv;
};
