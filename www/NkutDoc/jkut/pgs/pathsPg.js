import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as dpath from  "../data/dpath.js";
import * as conf from  "../data/conf.js";
import * as global from  "../global.js";
import * as i18n from  "../i18n.js";
import * as cts from  "../cts.js";
import * as main from  "../main.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg,  cf,  AllPaths)  {sys.$params(arguments.length, 3);

  
   function validateChar(chars, id)  {sys.$params(arguments.length, 2);
    for (let i = 0;i < str.len(chars); ++i) {
      const ch =sys.$checkNull( chars[i]);
      if (sys.$neq(str.index(id, ch) ,  -1))
         return i18n.fmt(II("Name '%0' contains '%1'"), [id, ch]);
    }
     return "";
  };

  
   function validateId(id)  {sys.$params(arguments.length, 1);
    const r =sys.$checkNull( sys.$eq(id , "")
      ? II("Name is missing")
      : sys.$neq(str.index(id, " ") ,  -1)
        ? i18n.fmt(II("Name '%0' contains blanks"), [id])
        : validateChar("=@/?", id))
    ;
     return sys.$eq(r , "")
      ? arr.any(AllPaths, function( p)  {sys.$params(arguments.length, 1);  return sys.$eq(p[dpath.id] , id);})
        ? i18n.fmt(II("Name '%0' is repeated"), [id])
        : ""
      : r
    ;
  };

  
   function validatePath(path)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(str.starts(path, "/")))
       return i18n.fmt(II("Path '%0' does not start with '/'"), [path]);
    const Path = [path];
    while (str.len(Path[0]) > 1 && str.ends(Path[0], "/"))
      Path[0] =sys.$checkExists(Path[0], sys.$slice(Path[0],null, -1));
     return sys.$eq(Path[0] , "/")
      ? II("Path is '/'")
      : sys.$eq(Path[0] , "")
        ? II("Path is missing")
        : ""
    ;
  };

  
   function validateIdPath(id, path)  {sys.$params(arguments.length, 2);
    const err =sys.$checkNull( validateId(id));
     return sys.$neq(err , "") ? err : validatePath(path);
  };

  
   async  function newPath(id, path)  {sys.$params(arguments.length, 2);
    const err =sys.$checkNull( validateIdPath(id, path));
    if (sys.$neq(err , "")) {
      ui.alert(err);
      return;
    }

    const pathV = [path];
    while (str.len(pathV[0]) > 1 && str.ends(pathV[0], "/"))
      pathV[0] =sys.$checkExists(pathV[0], sys.$slice(pathV[0],null, -1));

    await client.send({
      prg: cts.appName,
      source: "PathsPg",
      rq: "new",
      dbKey: global.dbKeyV[0],
      id: id,
      pth: pathV[0]
    });
    main.load();
  };

  
   async  function changeShowAll(e)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      source: "PathsPg",
      rq: "changeShowAll",
      dbKey: global.dbKeyV[0]
    });
    main.load();
  };

  
   async  function modifyPath(id, newId, path)  {sys.$params(arguments.length, 3);
    const err =sys.$checkNull( sys.$eq(id , newId)
      ? validatePath(path)
      : validateIdPath(newId, path))
    ;
    if (sys.$neq(err , "")) {
      ui.alert(err);
      return;
    }

    const Path = [path];
    while (str.len(Path[0]) > 1 && str.ends(Path[0], "/"))
      Path[0] =sys.$checkExists(Path[0], sys.$slice(Path[0],null, -1));

    await client.send({
      prg: cts.appName,
      source: "PathsPg",
      rq: "modify",
      dbKey: global.dbKeyV[0],
      id: id,
      newId: newId,
      pth: Path[0]
    });

    main.load();
  };

  
   async  function changeShown(id, error)  {sys.$params(arguments.length, 2);
    if (error) {
      ui.alert(II("This source can not be selected, because it does not exist"));
      return;
    }
    await client.send({
      prg: cts.appName,
      source: "PathsPg",
      rq: "changeShown",
      dbKey: global.dbKeyV[0],
      id: id
    });
    main.load();
  };

  
   async  function deletePath(id)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(ui.confirm(i18n.fmt(II("Delete %0?"), [id])))) return;
    await client.send({
      prg: cts.appName,
      source: "PathsPg",
      rq: "delete",
      dbKey: global.dbKeyV[0],
      id: id
    });
    main.load();
  };



   const Paths =sys.$checkNull( cf[conf.showAll]
    ? AllPaths
    : arr.filter(AllPaths,function( p)  {sys.$params(arguments.length, 1);  return p[dpath.isShown];}))
  ;
  arr.sort(Paths,function( p1,  p2)  {sys.$params(arguments.length, 2);
     return str.less(str.toUpper(p1[dpath.id]), str.toUpper(p2[dpath.id]));}
  );

  
   function modifyBegin(id)  {sys.$params(arguments.length, 1);
    Q("#newEnter")
      .removeAll()
      .add(Q("div")
        .style("width:80px")
        .add(ui.lightImg("enter")
          .att("style", ";vertical-align:-12%")))
    ;
    Q("#autofocus").value("").disabled(true);
    Q("#pathIn").value("").disabled(true);
    Q("#titleInOut")
      .removeAll()
      .add(ui.lightImg(cf[conf.showAll] ? "out" : "in"))
    ;

    for (const  p  of sys.$forObject( Paths)) {
      const pId =sys.$checkNull( p[dpath.id]);
      const path =sys.$checkNull( p[dpath.path]);
      const isShown =sys.$checkNull( p[dpath.isShown]);

      if (sys.$eq(pId , id)) {
        Q("#" + pId + ":InOut")
          .removeAll()
          .add(ui.img("blank"))
        ;
        Q("#" + pId + ":Modify")
          .removeAll()
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); main.load();})
            .add(ui.img("cancel")))
        ;
        Q("#" + pId + ":Delete")
          .removeAll()
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1);
            modifyPath(
              pId,
              Q("#nameModify").getValue(),
              Q("#pathModify").getValue()
            );}
          ).add(ui.img("enter")))
        ;
        Q("#" + pId + ":Name")
          .removeAll()
          .add(ui.field("pathModify")
            .att("id", "nameModify")
            .att("size", "20")
            .value(pId))
        ;
        Q("#" + pId + ":Path")
          .removeAll()
          .add(ui.field("nameModify")
            .att("id", "pathModify")
            .att("size", "60")
            .value(path))
        ;
        Q("#nameModify").e.focus();
      } else {
        Q("#" + pId + ":InOut")
          .removeAll()
          .add(ui.lightImg(isShown ? "out" : "in"))
        ;
        Q("#" + pId + ":Modify").removeAll().add(ui.lightImg("edit"));
        Q("#" + pId + ":Delete").removeAll().add(ui.lightImg("delete"));
      }
    }
  };

  wg
    .removeAll()
    .add(Q("h2")
      .att("align", "center")
      .text(II("Libraries")))
    .add(
      Q("table")
        .att("class", "border")
        .att("border", "0")
        .att("align", "center")
        .att("style", "background-color: rgb(255, 250, 250)")
        .add(Q("tr")
          .add(Q("td")
            .add(ui.img("new")
              .att("style", "vertical-align:-15%")))
          .add(Q("td")
            .att("id", "newEnter")
            .att("colspan", "2")
            .att("align", "center")
            .add(Q("button")
              .style("width:80px")
              .att("id", "newEnterBt")
              .add(ui.img("enter")
                .att("style", "vertical-align:-10%"))
              .on("click", function(e)  {sys.$params(arguments.length, 1);
                  newPath(Q("#autofocus").getValue(), Q("#pathIn").getValue());}
                )))
          .add(Q("td")
            .att("id", "newName")
            .add(ui.field("pathIn")
              .att("id", "autofocus").att("size", "20")))
          .add(Q("td")
            .att("id", "newPath")
            .add(ui.field("newEnterBt")
              .att("id", "pathIn")
              .att("size", "60")))
          .add(Q("td")))
        .add(Q("tr")
          .add(Q("td")
            .att("id", "titleInOut")
            .att("width", "18px")
            .add(ui.link(changeShowAll)
              .add(ui.img(cf[conf.showAll] ? "out" : "in"))))
          .add(Q("td")
            .add(ui.img("blank"))
            .att("width", "18px"))
          .add(Q("td")
            .add(ui.img("blank"))
              .att("width", "18px"))
          .add(Q("td")
            .html("&nbsp;&nbsp;<b>" + II("Name") + "</b>"))
          .add(Q("td")
            .html("&nbsp;&nbsp;<b>" + II("Path") + "</b>"))
          .add(Q("td")
            .add(ui.img("blank"))))
        .adds(
          arr.size(Paths) > 0
            ? arr.map(Paths,function( entry)  {sys.$params(arguments.length, 1);
                const id =sys.$checkNull( entry[dpath.id]);
                const path =sys.$checkNull( entry[dpath.path]);
                const sel =sys.$checkNull( entry[dpath.isShown]);
                const error = !sys.asBool(entry[dpath.isValid]);

                 return Q("tr")
                  .add(Q("td")
                    .att("id", id + ":InOut")
                    .add(ui.link(function(e)  {sys.$params(arguments.length, 1); changeShown(id, error);})
                      .add(ui.img(sel ? "out" : "in"))))
                  .add(Q("td")
                    .att("id", id + ":Modify")
                    .style("text-align:center;")
                    .add(ui.link(function(e)  {sys.$params(arguments.length, 1); modifyBegin(id);})
                      .add(ui.img("edit"))))
                  .add(Q("td")
                    .att("id", id + ":Delete")
                    .style("text-align:center;")
                    .add(ui.link(function(e)  {sys.$params(arguments.length, 1); deletePath(id);})
                        .add(ui.img("delete"))))
                  .add(Q("td")
                    .att("class", "border")
                    .att("id", id + ":Name")
                    .text(id.length > 20 ? id.substring(0, 17) + "..." : id))
                  .add(Q("td")
                    .att("class", "border")
                    .att("id", id + ":Path")
                    .text(str.len(path) > 60
                        ? sys.$slice(path,null,57) + "..."
                        : path
                      ))
                  .add(Q("td")
                    .att("id", id + ":Error")
                    .add(error ? ui.img("error") : ui.img("well")))
                ;
              })
            : [Q("tr")
              .add(Q("td")
                .att("colspan", "6")
                .att("align", "center")
                .att("class", "border")
                .text(II("There are no libraries")))
            ]))
  ;
};
