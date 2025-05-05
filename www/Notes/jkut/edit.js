import * as arr from './_js/arr.js';import * as bytes from './_js/bytes.js';import * as storage from './_js/storage.js';import * as sys from './_js/sys.js';import * as client from './_js/client.js';import * as b64 from './_js/b64.js';import * as ui from './_js/ui.js';import * as js from './_js/js.js';import * as iter from './_js/iter.js';import * as math from './_js/math.js';import * as str from './_js/str.js';import * as timer from './_js/timer.js';import * as domo from './_js/domo.js';import * as dic from './_js/dic.js';import * as cryp from './_js/cryp.js';import * as time from './_js/time.js';




import * as cts from  "./cts.js";
import * as msgPg from  "./msgPg.js";
import * as edit from  "./edit.js";
import * as global from  "./global.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, isTrash)  {sys.$params(arguments.length, 2);
  const {dbKey, List, text} 
  = await  client.send({
    prg: cts.appName,
    source: "Edit",
    rq: "idata",
    isTrash:isTrash
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);

  const textV = [text]; 
  const selV = [!sys.asBool(List) ? "" : List[0]];

   const tm =sys.$checkNull( timer.mk(1000));

  const bodyEd =sys.$checkNull( Q("textarea")
    .att("cols", 100)
    .att("rows", 25)
    .att("spellcheck", false)
    .klass("frame"));
  if (isTrash) bodyEd.disabled(true);

  const listDiv =sys.$checkNull( Q("div"));
  const titleDiv =sys.$checkNull( Q("div"));

  const showV = [[]];
  const show2V = [[]];

  

  
   async  function newNote(ev)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      source: "Edit",
      dbKey: global.dbKeyV[0],
      rq: "new"
    });

    window.location.assign("?normal");
  };

  
   async  function download(id, name)  {sys.$params(arguments.length, 2);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Download '%0'?"), [name])))) return;
    const {dbKey, text} 
    = await  client.send({
      prg: cts.appName,
      source: "Edit",
      rq: "download",
      name:name,
      id:id
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);

    const text2 =sys.$checkNull( window.encodeURIComponent(text));

    const link =sys.$checkNull( Q("a")
      .att("href", "data:text/plain;charset=utf-8," + text2)
      .att("download", name)
      .setStyle("display", "none"))
    ;

    Q("@body").add(link);
    link.e.click();

    window.document.body.removeChild(link.e);
  };

  
   async  function remove(id, name)  {sys.$params(arguments.length, 2);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Remove '%0'?"), [name])))) return;
    timer.stop(tm);
    await client.send({
      prg: cts.appName,
      source: "Edit",
      rq: "remove",
      dbKey: global.dbKeyV[0],
      id:id
    });

    window.location.assign("?normal");
  };

  
   async  function rescue(id, name)  {sys.$params(arguments.length, 2);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Restore '%0'?"), [name])))) return;
    await client.send({
      prg: cts.appName,
      source: "Edit",
      rq: "rescue",
      dbKey: global.dbKeyV[0],
      id:id
    });

    window.location.assign("?normal");
  };

  
   async  function select(E)  {sys.$params(arguments.length, 1);
    const {dbKey, text} 
    = await  client.send({
      prg: cts.appName,
      source: "Edit",
      rq: "getText",
      isTrash:isTrash,
      id: E.id
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
    selV[0] =sys.$checkExists(selV[0], E);
    bodyEd.value(text);
    textV[0] =sys.$checkExists(textV[0], text);
    showV[0]();
  };

  
   async  function refresh()  {sys.$params(arguments.length, 0);
    const text =sys.$checkNull( bodyEd.getValue());
    if (sys.$neq(text , textV[0])) {
      const E =sys.$checkNull( selV[0]);
      const {dbKey, name} 
      = await  client.send({
        prg: cts.appName,
        source: "Edit",
        rq: "setText",
        dbKey: global.dbKeyV[0],
        id: E.id,
        text:text
      });
      global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
      textV[0] =sys.$checkExists(textV[0], text);

      if (sys.$neq(name , E.name)) {
        E.name =sys.$checkExists(E.name, name);
        show2V[0]();
      }
    }
  };

  

  
  show2V[0] =sys.$checkExists(show2V[0], function()  {sys.$params(arguments.length, 0);
    listDiv
      .removeAll()
      .add(Q("table")
        .adds(arr.map(List, function(E)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td")
              .add(isTrash
                ? ui.link(function(ev)  {sys.$params(arguments.length, 1); rescue(E.id, E.name);})
                  .add(ui.img("rescue"))
                : ui.link(function(ev)  {sys.$params(arguments.length, 1); download(E.id, E.name);})
                  .add(ui.img("download"))))
            .adds(
              isTrash
                ? [Q("td")]
                : [ Q("td"),
                    Q("td")
                      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); remove(E.id, E.name);})
                        .add(ui.img("remove"))),
                    Q("td")
                  ]
              )
            .add(Q("td")
              .klass(sys.$eq(E.id , selV[0].id) ? "frame" : "")
              .add(
                (isTrash
                  ? ui.link(function(ev)  {sys.$params(arguments.length, 1); select(E);})
                    .klass("link")
                    .setStyle("color", "#800000")
                  : ui.link(function(ev)  {sys.$params(arguments.length, 1); select(E);})
                    .klass("link")
                ).text(E.name)))
          ;})))
    ;

    const head =sys.$checkNull( Q("div").klass("head").text(selV[0].name));
    if (isTrash) head.setStyle("color", "#a9a9a9");
    titleDiv
      .removeAll()
      .add(head)
    ;
  });

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    
     function left()  {sys.$params(arguments.length, 0);
       return Q("table")
        .klass("frame")
        .add(Q("tr")
          .add(Q("td")
            .add(isTrash
              ? ui.lightImg("archive-insert")
              : ui.link(newNote)
                .add(ui.img("archive-insert"))))
          .add(Q("td"))
          .add(Q("td")
            .style("text-align:right")
            .add(isTrash
              ? ui.link(function(ev)  {sys.$params(arguments.length, 1); window.location.assign("?normal");})
                .add(ui.img("folder"))
              : ui.link(function(ev)  {sys.$params(arguments.length, 1); window.location.assign("?trash");})
                .add(ui.img("trash")))))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 3)
            .add(Q("hr")
              .style("width:150px"))))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 3)
            .add(listDiv)))
      ;
    };

    
     function right()  {sys.$params(arguments.length, 0);
      if (!sys.asBool(List)) {
         return Q("table")
          .att("align", "center")
          .klass("frame")
          .add(Q("tr").add(Q("td").text(II("Witout Notes"))))
        ;
      }

      const head =sys.$checkNull( Q("div").klass("head"));
      if (isTrash) head.setStyle("color", "#a9a9a9");
       return Q("div")
        .style("text-align:center")
        .add(titleDiv)
        .add(bodyEd.text(textV[0]))
      ;
    };

    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("vertical-align:top;width:5px")
            .add(left()))
          .add(Q("td")
            .style("vertical-align:top")
            .add(right()))))
    ;

    show2V[0]();
  });

  showV[0]();
  if (!sys.asBool(isTrash)) timer.run(tm,refresh);
};
