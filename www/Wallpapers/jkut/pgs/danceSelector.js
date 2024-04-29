import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as danceSong from  "../data/danceSong.js";
import * as cts from  "../data/cts.js";
import * as dance from  "../pgs/dance.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, isShort, reload)  {sys.$params(arguments.length, 3);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    source: "DanceSelector",
    rq: "idata"
  }));

  const Groups =sys.$checkNull( Rp.groups); 
  arr.sort(Groups, function(g1, g2)  {sys.$params(arguments.length, 2);  return str.toUpper(g1) < str.toUpper(g2);});
  const group =sys.$checkNull( Rp.group);
  const DanceSongs =sys.$checkNull( arr.map(Rp.songs, danceSong.fromJs));
  arr.sort(
    DanceSongs, function(S1, S2)  {sys.$params(arguments.length, 2);  return str.toUpper(S1.id) < str.toUpper(S2.id);}
  );

  

  
   async  function changeGroup(group)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      source: "DanceSelector",
      rq: "changeGroup",
      group:group
    });
    mk(wg, isShort, reload);
  };

  
   function keyInButton(ev, isong)  {sys.$params(arguments.length, 2);
    if (sys.$eq(ev.key , "ArrowUp") && isong > 0) {
      Q("#bt:" + (isong - 1)).e.focus();
      ev.preventDefault();
      return;
    }
    if (sys.$eq(ev.key , "ArrowDown") && isong < arr.size(DanceSongs) - 1) {
      Q("#bt:" + (isong + 1)).e.focus();
      ev.preventDefault();
      return;
    }

    if (sys.$eq(ev.key , "ArrowLeft")) {
      const ix =sys.$checkNull( arr.index(Groups, function(g)  {sys.$params(arguments.length, 1);  return sys.$eq(g , group);}));
      if (ix <= 0) reload();
      else changeGroup(Groups[ix - 1]);

      ev.preventDefault();
      return;
    }

    if (sys.$eq(ev.key , "ArrowRight")) {
      const ix0 =sys.$checkNull( arr.index(Groups, function(g)  {sys.$params(arguments.length, 1);  return sys.$eq(g , group);}));
      const ix =sys.$checkNull( sys.$eq(ix0 ,  -1) ? 0 : ix0);

      if (ix >= arr.size(Groups) - 1) reload();
      else changeGroup(Groups[ix + 1]);

      ev.preventDefault();
      return;
    }
  };

  
   function play(song)  {sys.$params(arguments.length, 1); dance.mk(wg, isShort, group, song, reload);};

  

  
   function entries()  {sys.$params(arguments.length, 0);
    const Rows =sys.$checkNull( []); 
    for (const [i, S]  of sys.$forObject2( DanceSongs)) {
      arr.push(Rows, Q("tr")
        .add(Q("td")
          .att("title", II("Quality"))
          .style("width:5px")
          .klass("frame")
          .text(sys.$eq(S.level , 0) ? II("???")
              : sys.$eq(S.level , 1) ? II("Ok")
                : II("Good")
            ))
        .add(Q("td")
          .att("title", II("Speed"))
          .style("width:5px")
          .klass("frame")
          .text(sys.$eq(S.level , 0)
            ? "???"
            : sys.$eq(S.speed , 0)
              ? II("Slow")
              : II("Fast")))
        .add(Q("td")
          .add(Q("button")
            .att("id", "bt:" + i)
            .style("width:100%;white-space:nowrap;text-align:left")
            .text(S.id))
            .on("keydown", function(e)  {sys.$params(arguments.length, 1); keyInButton(e, i);})
            .on("click", function(e)  {sys.$params(arguments.length, 1); play(S.id);}))
        .add(Q("td")
          .klass("frame")
          .text(fns.formatInt(isShort ? S.shortPlays : S.longPlays, 2)))
      );
    }
     return Rows;
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
      .text(isShort
        ? II("Short Dance Songs")
        : II("Long Dance Songs")))
    .add(Q("hr"))
    .add(menuWg)
   .add(Q("table")
      .att("align", "center")
      .klass("frame3")
      .adds(entries()))
  ;

  timer.delay(100, function()  {sys.$params(arguments.length, 0);
    const mainButtonOp =sys.$checkNull( sys.$null((Q("#bt:0"))));
    if (mainButtonOp) mainButtonOp[0].e.focus();
  });

};
