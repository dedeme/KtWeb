import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as cts from  "../data/cts.js";
import * as danceSong from  "../data/danceSong.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, reload)  {sys.$params(arguments.length, 2);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "DanceManagement",
    rq: "idata"
  }));
  const Groups =sys.$checkNull( Rp.groups); 
  arr.sort(Groups, function(g1, g2)  {sys.$params(arguments.length, 2);  return g1 < g2;});
  const group =sys.$checkNull( Rp.group);
  const DanceSongs =sys.$checkNull( arr.map(Rp.songs, danceSong.fromJs));
  arr.sort(DanceSongs, function(S1, S2)  {sys.$params(arguments.length, 2);  return str.toUpper(S1.id) < str.toUpper(S2.id);});

  

  
   async  function changeGroup(g)  {sys.$params(arguments.length, 1);
    if (sys.$eq(g , group)) return;
    await client.send({
      prg: cts.appName,
      source: "DanceManagement",
      rq: "changeGroup",
      group: g
    });
    mk(wg, reload);
  };

  
   async  function setLevel(song, level)  {sys.$params(arguments.length, 2);
    await client.send({
      prg: cts.appName,
      source: "DanceManagement",
      rq: "setLevel",
      group:group,
      song:song,
      level:level
    });
  };

  
   async  function setSpeed(song, speed)  {sys.$params(arguments.length, 2);
    await client.send({
      prg: cts.appName,
      source: "DanceManagement",
      rq: "setSpeed",
      group:group,
      song:song,
      speed:speed
    });
  };

  

  
   function rows()  {sys.$params(arguments.length, 0);
     return arr.map(DanceSongs, function(S)  {sys.$params(arguments.length, 1);  return Q("tr")
        .add(Q("td")
          .att("title", II("Quality"))
          .style("width:5px")
          .klass("frame")
          .add(Q("table")
            .klass("main")
            .add(Q("tr")
              .add(Q("td")
                .add(Q("input")
                  .att("type", "radio")
                  .att("name", "level|" + S.id)
                  .checked(sys.$eq(0 , S.level)))
                  .on("click", function(e)  {sys.$params(arguments.length, 1); setLevel(S.id, 0);}))
              .add(Q("td")
                .html("?&nbsp;"))
              .add(Q("td")
                .add(Q("input")
                  .att("type", "radio")
                  .att("name", "level|" + S.id)
                  .checked(sys.$eq(1 , S.level)))
                  .on("click", function(e)  {sys.$params(arguments.length, 1); setLevel(S.id, 1);}))
              .add(Q("td")
                .html("&#8722;&nbsp;"))
              .add(Q("td")
                .add(Q("input")
                  .att("type", "radio")
                  .att("name", "level|" + S.id)
                  .checked(sys.$eq(2 , S.level)))
                  .on("click", function(e)  {sys.$params(arguments.length, 1); setLevel(S.id, 2);}))
              .add(Q("td")
                .html("+&nbsp;"))
                  )))
        .add(Q("td")
          .att("title", II("Speed"))
          .style("width:5px")
          .klass("frame")
          .add(Q("table")
            .klass("main")
            .add(Q("tr")
              .add(Q("td")
                .add(Q("input")
                  .att("type", "radio")
                  .att("name", "speed|" + S.id)
                  .checked(sys.$eq(0 , S.speed)))
                  .on("click", function(e)  {sys.$params(arguments.length, 1); setSpeed(S.id, 0);}))
              .add(Q("td")
                .html("&#171;&nbsp;"))
              .add(Q("td")
                .add(Q("input")
                  .att("type", "radio")
                  .att("name", "speed|" + S.id)
                  .checked(sys.$eq(1 , S.speed)))
                  .on("click", function(e)  {sys.$params(arguments.length, 1); setSpeed(S.id, 1);}))
              .add(Q("td")
                .html("&#187;&nbsp;"))
                  )))
        .add(Q("td")
          .klass("frame")
          .text(S.id))
        .add(Q("td")
          .klass("frame")
          .text(fns.formatInt(S.shortPlays, 2)))
        .add(Q("td")
          .klass("frame")
          .text(fns.formatInt(S.longPlays, 2)))
    ;});
  };

  const Lopts =sys.$checkNull( []);
  const firstV =sys.$checkNull( [true]);
  for (const g  of sys.$forObject( Groups)) {
    if (firstV[0]) firstV[0] =sys.$checkExists(firstV[0],sys.$checkNull( false));
    else arr.push(Lopts, menu.separator());

    arr.push(Lopts, menu.toption(g, g, function()  {sys.$params(arguments.length, 0); changeGroup(g);}));
  }
  const Ropts =sys.$checkNull( [
    menu.toption("_back_", II("Back"), reload)
  ]);

  const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, group, false));

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Songs Management")))
    .add(Q("hr"))
    .add(menuWg)
    .add(Q("table")
      .att("align", "center")
      .klass("frame3")
      .adds(rows()))
  ;
};
