import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as pict from  "../data/pict.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


const prows = 4;


const pcols = 5;


export  async  function mk(wg, reload)  {sys.$params(arguments.length, 2);
  const {dbKey, groups, group, 
   Picts, page, totalSights, shownSights} 
  = await  client.send({
    prg: cts.appName,
    source: "PictsManagementPg",
    rq: "idata"
  });
  global.dbKeyV[0] = dbKey;

  arr.sort(Picts,function( p1,  p2)  {sys.$params(arguments.length, 2);
     return str.toUpper(p1[pict.id]) < str.toUpper(p2[pict.id]);}
  );
  const psize =sys.$checkNull( arr.size(Picts));

  const ptds = prows * pcols;
  const maxPage =sys.$checkNull( math.toInt((arr.size(Picts) - 1) / ptds));
  const pg =sys.$checkNull( page > maxPage ? maxPage : page);

  

  
   async  function setGroup(group)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      source: "PictsManagementPg",
      rq: "setGroup",
      dbKey: global.dbKeyV[0],
      group:group
    });
    mk(wg, reload);
  };

  
   async  function setPage(page)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      source: "PictsManagementPg",
      rq: "setPage",
      dbKey: global.dbKeyV[0],
      page:page
    });
    mk(wg, reload);
  };

  
   async  function setLevel(id, level)  {sys.$params(arguments.length, 2);
    await client.send({
      prg: cts.appName,
      source: "PictsManagementPg",
      rq: "setLevel",
      dbKey: global.dbKeyV[0],
      group:group,
      id:id,
      level:level
    });
    mk(wg, reload);
  };

  
   async  function keyDown(ev)  {sys.$params(arguments.length, 1);
    ev.preventDefault();
    switch (ev.key) {
      case "ArrowUp":{ {
        await client.send({
          prg: cts.appName,
          source: "PictsManagementPg",
          rq: "changePage",
          where: "up",
          dbKey: global.dbKeyV[0]
        });
        mk(wg, reload);
      }break;}
    case "ArrowDown":{ {
        ev.preventDefault();
        await client.send({
          prg: cts.appName,
          source: "PictsManagementPg",
          rq: "changePage",
          where: "down",
          dbKey: global.dbKeyV[0]
        });
        mk(wg, reload);
      }break;}
      case "ArrowLeft":{ {
        ev.preventDefault();
        await client.send({
          prg: cts.appName,
          source: "PictsManagementPg",
          rq: "changePage",
          where: "left",
          dbKey: global.dbKeyV[0]
        });
        mk(wg, reload);
      }break;}
      case "ArrowRight":{ {
        ev.preventDefault();
        await client.send({
          prg: cts.appName,
          source: "PictsManagementPg",
          rq: "changePage",
          where: "right",
          dbKey: global.dbKeyV[0]
        });
        mk(wg, reload);
      }break;}
    }
  };

  

  
   function showPict(id)  {sys.$params(arguments.length, 1);
    wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(ui.img("fondosEscritorio/" + group + "/" + id)
            .klass("frame")
            .style("width:800px;text-align:center")
            .on("click", function(e)  {sys.$params(arguments.length, 1); mk(wg, reload);})))))
    ;};

  
   function tdPict( p)  {sys.$params(arguments.length, 1);
    const Sels = []; 
    for (let i = cts.minPictLevel;i < cts.maxPictLevel + 1; ++i) {
      arr.push(Sels,Q("td")
        .add(Q("table")
          .klass("main")
          .add(Q("tr")
            .add(Q("td")
              .add(Q("input")
                .att("type", "radio")
                .att("name", p[pict.id])
                .checked(sys.$eq(i , p[pict.level])))
                .on("click", function(e)  {sys.$params(arguments.length, 1); setLevel(p[pict.id], i);}))
            .add(Q("td")
              .add(Q("span")
                .text("" + i)))))
      );
    }
     return Q("td")
      .style("text-align:center")
      .add(ui.img("fondosEscritorio/" + group + "/" + p[pict.id])
        .klass("frame")
        .style("width:175px")
        .att("title", p[pict.id])
        .on("click", function(e)  {sys.$params(arguments.length, 1); showPict(p[pict.id]);}))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .adds(Sels)))
    ;
  };

  
   function rows()  {sys.$params(arguments.length, 0);
    const R = []; 
    const npV = [pg * pcols * prows];
    for (let row = 0;row < prows; ++row) {
      const tr =sys.$checkNull( Q("tr"));
      for (let col = 0;col < pcols; ++col) {
        if (npV[0] < psize) {
          tr.add(tdPict(Picts[npV[0]]));
        } else {
          tr.add(Q("td"));
        }
        npV[0] += 1;
      }
      arr.push(R,tr);
    }
     return R;
  };

  
   function pagesWg()  {sys.$params(arguments.length, 0);
    const Trs = []; 
    const Tds = []; 
    const max =sys.$checkNull( maxPage * ptds < psize ? maxPage + 1 : maxPage);
    for (let i = 0;i < max; ++i) {
      const first = i * ptds;
      const last0 = first + ptds - 1;
      const last =sys.$checkNull( last0 >= psize ? psize - 1 : last0);
      for (let i = 0;i < 3; ++i) arr.push(Tds,[]);
      arr.push(Tds[0], Q("td")
        .style("text-align:center;color:#c9c9c9")
        .text(str.toUpper(sys.$slice(Picts[first][pict.id],null,2))));
      arr.push(Tds[1], Q("td")
        .klass(sys.$eq(i , pg) ? "frame3": "frame")
        .style("cursor:pointer")
        .text(fns.formatInt(i + 1, 2))
        .on("click", function(e)  {sys.$params(arguments.length, 1); setPage(i);})
      );
      arr.push(Tds[2], Q("td")
        .style("text-align:center;color:#c9c9c9")
        .text(str.toUpper(sys.$slice(Picts[last][pict.id],null,2))));
    }

    for (let i = 0;i < 3; ++i) arr.push(Trs,Q("tr").adds(Tds[i]));
     return Trs;
  };

  window.document.onkeydown = keyDown;

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(i18n.fmt(
          II("Pictures Management [ %0 / %1 ]"),
          [shownSights, totalSights]
        )))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); reload();})
            .klass("link")
            .text("[ " + II("Back") + " ]")))))
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .add(Q("table")
            .att("align", "left")
            .add(Q("tr")
              .add(Q("td")
                .att("colspan", groups)
                .style("width:150px")
                .add(ui.hrule(II("Groups"), 25)))
              .add(Q("td")
                .style("width:100px")
                .add(ui.hrule(II("Sights"), 25))))
            .add(Q("tr")
              .adds(iter.map(iter.$range(0,groups), function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                  .klass(sys.$eq("" + i , group) ? "frame3": "frame")
                  .style("cursor:pointer;text-align:center")
                  .text("" + i)
                  .on("click", function(e)  {sys.$params(arguments.length, 1); setGroup("" + i);})
                ;}))
              .add(Q("td")
                .klass("frame3")
                .style("text-align:center")
                .text("" + (arr.reduce(Picts,
                    0, function(sum,  p)  {sys.$params(arguments.length, 2);  return sum + p[pict.level];}
                  )))))
            .add(Q("tr")
              .add(Q("td")
                .att("colspan", groups)
                .add(Q("hr")))
              .add(Q("td")
                .add(Q("hr"))))))
        .add(Q("td")
          .add(Q("table")
            .att("align", "right")
            .adds(pagesWg())))))
    .add(Q("div")
      .style("padding-top:10px;"))
    .add(Q("table")
      .klass("main")
      .adds(rows()))
  ;
};
