import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as global from  "../global.js";
import * as cts from  "../cts.js";
import * as song from  "../data/song.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, reload)  {sys.$params(arguments.length, 2);
  const {dbKey,   Groups, group, 
   Songs, songGroup, ssong} 
  = await  client.send({
    prg: cts.appName,
    source: "SongsManagementPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
  arr.sort(Groups,function(g1, g2)  {sys.$params(arguments.length, 2);  return g1 < g2;});
  arr.sort(Songs,function( s1,  s2)  {sys.$params(arguments.length, 2);
     return str.toUpper(s1[song.id]) < str.toUpper(s2[song.id]);}
  );

  

  
   async  function changeGroup(g)  {sys.$params(arguments.length, 1);
    if (sys.$eq(g , group)) return;
    await client.send({
      prg: cts.appName,
      source: "SongsManagementPg",
      rq: "changeGroup",
      dbKey: global.dbKeyV[0],
      group: g
    });
    mk(wg, reload);
  };

  
   async  function setLevel(ssong, level)  {sys.$params(arguments.length, 2);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "SongsManagementPg",
      rq: "setLevel",
      dbKey: global.dbKeyV[0],
      group:group,
      ssong:ssong,
      level:level
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
  };

  
   async  function setSel(songId)  {sys.$params(arguments.length, 1);
    if (sys.$eq(songId , ssong)) return;
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "SongsManagementPg",
      rq: "setSel",
      dbKey: global.dbKeyV[0],
      group:group,
      songId:songId
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
  };

  
   async  function setLapse(song, lapse)  {sys.$params(arguments.length, 2);
    await client.send({
      prg: cts.appName,
      source: "SongsManagementPg",
      rq: "setLapse",
      dbKey: global.dbKeyV[0],
      group:group,
      ssong:ssong,
      lapse:lapse
    });
    mk(wg, reload);
  };

  

  
   function rows()  {sys.$params(arguments.length, 0);
    const R =sys.$checkNull( []); 
    for (const  s  of sys.$forObject( Songs)) {
      const Tds =sys.$checkNull( []); 

      arr.push(Tds,Q("td")
        .style("width:5px")
        .add(Q("input")
          .att("type", "radio")
          .att("name", "sel")
          .checked(sys.$eq(ssong , s[song.id]) && sys.$eq(group , songGroup)))
          .on("click", function(e)  {sys.$params(arguments.length, 1); setSel(s[song.id]);})
      );

      const range =sys.$checkNull( Q("input")
        .att("type", "range")
        .att("min", 0)
        .att("max", 100)
        .att("value", s[song.lapse]))
      ;
      range.on("change", function(e)  {sys.$params(arguments.length, 1); setLapse(s[song.id], range.e.valueAsNumber);});

      arr.push(Tds,Q("td")
        .klass("frame")
        .style("width:5px;")
        .add(range)
      );

      for (let i = 1;i < 4; ++i) {
        arr.push(Tds,Q("td")
          .style("width:5px")
          .add(Q("input")
            .att("type", "radio")
            .att("name", s[song.id])
            .checked(sys.$eq(i , s[song.level])))
            .on("click", function(e)  {sys.$params(arguments.length, 1); setLevel(s[song.id], i);})
        );
        arr.push(Tds,Q("td")
          .style("width:5px")
          .text("" + i)
        );
        arr.push(Tds,Q("td")
          .style("width:5px")
          .html("&nbsp;")
        );
      }
      arr.push(Tds,Q("td")
        .klass("frame")
        .text(s[song.id])
      );
      arr.push(R,Q("tr").adds(Tds));
    }
     return R;
  };

  const Lopts =sys.$checkNull( []);
  const firstV =sys.$checkNull( [true]);
  for (const g  of sys.$forObject( Groups)) {
    if (firstV[0]) firstV[0] =sys.$checkExists(firstV[0],sys.$checkNull( false));
    else arr.push(Lopts,menu.separator());

    arr.push(Lopts,menu.toption(g, g, function()  {sys.$params(arguments.length, 0); changeGroup(g);}));
  }
  const Ropts =sys.$checkNull( [
    menu.toption("_back_", II("Back"), reload)
  ]);

  const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, group));

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
