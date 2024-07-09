import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as cts from  "./cts.js";
import * as menu from  "./libdm/menu.js";
import * as dpath from  "./data/dpath.js";
import * as conf from  "./data/conf.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as pathsPg from  "./pgs/pathsPg.js";
import * as indexPg from  "./pgs/indexPg.js";
import * as modulePg from  "./pgs/modulePg.js";
import * as codePg from  "./pgs/codePg.js";
import * as global from  "./global.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (!sys.asBool(ok)) {
    ui.alert(II("Session is closed.\nAuthenticating from Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  
   const {lang} = await  client.send({
    prg: "Main", 
    source: "Main",
    rq: "lang"
  });
  if (sys.$eq(lang , "en")) i18n.en();

  
  const {dbKey,  cf,  Paths} = await  client.send({
    prg: "KutDoc",
    source: "MainPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));
  arr.sort(Paths,function( p1,  p2)  {sys.$params(arguments.length, 2);  return str.less(p1[dpath.id], p2[dpath.id]);});

   const Url =sys.$checkNull( ui.url());
  const page =sys.$checkNull( !sys.asBool(Url) ? cf[conf.path] : Url[0]);

   const Parts =sys.$checkNull( page.split("@"));
  const pack =sys.$checkNull( sys.$eq(page , "@") ? page : Parts[0]);
  const pkPathOp =sys.$checkNull( arr.size(Parts) > 1 && sys.$neq(pack , "@") ? [Parts[1]] : []);

  const anchorOp =sys.$checkNull( arr.size(Url) > 1 ? [Url[1]] : []);

   const Rp =sys.$checkNull( await  client.send({
    prg: "KutDoc",
    source: "MainPg",
    rq: "savePath",
    dbKey: global.dbKeyV[0],
    npath: !sys.asBool(pkPathOp) ? pack : pack + "@" + pkPathOp[0]
  }));
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( Rp.dbKey));

  const Lopts =sys.$checkNull( [menu.ilink("@", "asterisk")]);

  for (const  p  of sys.$forObject( Paths)) {
    if (p[dpath.isValid] && p[dpath.isShown]) {
      arr.push(Lopts, menu.separator());
      arr.push(Lopts, menu.tlink(p[dpath.id], p[dpath.id]));
    }
  }
  const menuWg =sys.$checkNull( menu.mk(Lopts, [], pack));

  const body =sys.$checkNull( Q("div"));
  if (sys.$eq(pack , "@")) pathsPg.mk(body, cf, Paths);
  else if (!sys.asBool(pkPathOp)) indexPg.mk(body, pack);
  else if (!sys.asBool(!sys.asBool(anchorOp))) codePg.mk(body, pack, pkPathOp[0], anchorOp[0]);
  else modulePg.mk(body, pack, pkPathOp[0]);

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
  ;

};



const wg =sys.$checkNull( Q("div"));


export  async  function load()  {sys.$params(arguments.length, 0);

  await mk(wg);

  const Fc =sys.$checkNull( ui.qOp("#autofocus"));
  if (!sys.asBool(!sys.asBool(Fc))) Fc[0].e.focus();
};


client.init(true, "KtWeb", function(isExpired)  {sys.$params(arguments.length, 1);
  const message =sys.$checkNull( isExpired
    ? II("Session is expired.")
    : II("Data base is out of date."))
  ;
  const msgWg =sys.$checkNull( Q("div"));
  msgPg.mk(msgWg, message, true);
  Q("@body")
    .removeAll()
    .add(msgWg)
    .add(cts.foot)
  ;
});

Q("@body")
  .removeAll()
  .add(wg)
  .add(cts.foot)
  .add(ui.upTop("up"))
;

load();
