import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as image from  "../data/image.js";
import * as dms from  "../data/dms.js";
import * as dimSelectorWg from  "../wgs/dimSelectorWg.js";
import * as trWg from  "../wgs/trWg.js";
import * as cts from  "../cts.js";
import * as global from  "../global.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const {dbKey,  Images} 
  = await  client.send({
    prg: cts.appName,
    source: "HomePg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

  const groupV =sys.$checkNull( [0]);

  

  
   async  function save(ev)  {sys.$params(arguments.length, 1);
    if (ui.confirm(i18n.fmt(II("Save pictures in group %0?"), [groupV[0]]))) {
      cts.boxContent
        .removeAll()
        .add(ui.img("wait.gif"))
      ;
      modalBox.show(cts.box, true);
      await client.send({
        prg: cts.appName,
        source: "HomePg",
        rq: "save",
        dbKey: global.dbKeyV[0],
        group: groupV[0]
      });
      window.location.reload(true);
    }}
  ;

  
   async  function mkSave(td)  {sys.$params(arguments.length, 1);
    td
      .removeAll()
      .add(ui.img("wait.gif"));
    const {dbKey, Duplicates, group} 
    = await  client.send({
      prg: cts.appName,
      source: "HomePg",
      rq: "idata2"
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
    groupV[0] =sys.$checkExists(groupV[0],sys.$checkNull( group));

    if (!sys.asBool(Duplicates)) {
      td
        .removeAll()
        .add(ui.link(save)
          .klass("link")
          .text(i18n.fmt(II("Save in Group %0"), [groupV[0]])))
      ;
    } else {
      td
        .removeAll()
        .html("<p>" + II("There are duplicated pictures") + ":</p><p>" +
            arr.join(Duplicates, "<br>") + "</p>")
      ;
    }
  };

  
   function changeDim(dim)  {sys.$params(arguments.length, 1);
    
     function cancel()  {sys.$params(arguments.length, 0); modalBox.show(cts.box, false);};
    
     async  function accept( dim)  {sys.$params(arguments.length, 1);
      await client.send({
        prg: cts.appName,
        source: "HomePg",
        rq: "changeDim",
        dbKey: global.dbKeyV[0],
        width: dim[dms.width],
        height: dim[dms.height]
      });
      window.location.reload(true);
    };

    dimSelectorWg.mk(cts.boxContent, dim, cancel, accept);
    modalBox.show(cts.box, true);
  };

  
   async  function mkDim(td)  {sys.$params(arguments.length, 1);
    td
      .removeAll()
      .add(ui.img("wait.gif"));
    const {dbKey, width, height} 
    = await  client.send({
      prg: cts.appName,
      source: "HomePg",
      rq: "dim"
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
    const dim =sys.$checkNull( "" + width + " x " + height);

    td
      .removeAll()
      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); changeDim(dim);})
        .klass("link")
        .text(dim))
    ;
  };

  

  if (!sys.asBool(Images)) {
    wg
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
          .klass("frame")
          .text(II("There are no pictures to adjust")))))
    ;
    return;
  }

  const tdSave =sys.$checkNull( Q("td")
    .klass("frame")
    .style("text-aling:left;width:5px;white-space:nowrap"))
  ;
  const tdDim =sys.$checkNull( Q("td")
    .klass("frame")
    .style("text-align:right;width:5px;white-space:nowrap"))
  ;
  const Trs =sys.$checkNull( []);
  arr.push(Trs,Q("tr")
    .add(Q("td")
      .att("colspan", 5)
      .style(
          "pading-top:15px;" +
          "pading-bottom:10px"
        )
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(tdSave)
          .add(Q("td"))
          .add(tdDim))))
  );
  arr.push(Trs,Q("tr")
    .add(Q("td")
      .att("colspan", 5)
      .add(Q("hr")))
  );

  mkSave(tdSave);
  mkDim(tdDim);

  arr.eachSync(Images,
    async  function(ix, im)  {sys.$params(arguments.length, 2);
        const tr =sys.$checkNull( await  trWg.mk(Images, ix));
        arr.push(Trs,tr);
        wg
          .removeAll()
          .add(Q("table")
            .att("align", "center")
            .adds(Trs))
        ;
      },
    function()  {sys.$params(arguments.length, 0);
        wg
          .removeAll()
          .add(Q("table")
            .att("align", "center")
            .adds(Trs))
          .add(cts.box.wg)
        ;
      }
  );

  wg
    .removeAll()
    .add(ui.img("wait.gif"))
  ;
};
