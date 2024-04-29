import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';




import * as menu from  "./libdm/menu.js";
import * as vmenu from  "./libdm/vmenu.js";
import * as cts from  "./data/cts.js";
import * as msgPg from  "./pgs/msgPg.js";
import * as descriptionPg from  "./pgs/descriptionPg.js";
import * as resultsPg from  "./pgs/resultsPg.js";
import * as hotPg from  "./pgs/hotPg.js";
import * as chartsPg from  "./pgs/chartsPg.js";
import * as i18n from  "./i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 async  function mk(wg)  {sys.$params(arguments.length, 1);
  const ok =sys.$checkNull( await  client.connect());
  if (!sys.asBool(ok)) {
    ui.alert(II("KtWeb session is closed.\nAuthenticating from KtWeb:Main."));
    window.location.assign("http://" + window.location.host + "/Main");
    return;
  }

  const Rp0 =sys.$checkNull( await  client.send({
    prg: "Main", 
    source: "Main",
    rq: "lang"
  }));
  if (sys.$eq(Rp0.lang , "en")) i18n.en();

  const Rp =sys.$checkNull( await  client.send({
    prg: "CMMarket",
    source: "Main",
    rq: "idata"
  }));
  
  const ModelIds =sys.$checkNull( Rp.modelIds);

  const Url =sys.$checkNull( ui.url());
  const modelOp =sys.$checkNull( !sys.asBool(Url) ? [] : [Url[0]]);
  const pgOp =sys.$checkNull( arr.size(Url) > 1 ? [Url[1]] : []);

  const pg =sys.$checkNull( !sys.asBool(pgOp)
    ? "description"
    :(   
        sys.$eq(pgOp[0],"description")|| sys.$eq(pgOp[0],"results")|| sys.$eq(pgOp[0],"hot")|| sys.$eq(pgOp[0],"charts") ? pgOp[0]:
         "description"
      ))
  ;

  const modelV =sys.$checkNull( [ModelIds[0]]);
  const ymarkV =sys.$checkNull( [""]);
  if (!sys.asBool(!sys.asBool(modelOp))) {
    const mV =sys.$checkNull( [modelOp[0]]);
    if (sys.$eq(mV[0][0] , "-")) {
      ymarkV[0] =sys.$checkExists(ymarkV[0],sys.$checkNull( "-"));
      mV[0] =sys.$checkExists(mV[0],sys.$checkNull( sys.$slice(mV[0],1,null)));
    }
    if (arr.any(ModelIds, function(id)  {sys.$params(arguments.length, 1);  return sys.$eq(id , mV[0]);})) modelV[0] =sys.$checkExists(modelV[0],sys.$checkNull( mV[0]));
  }
  const model =sys.$checkNull( modelV[0]);

  const Lopts =sys.$checkNull( [
    menu.tlink("description", II("Description"), [model]),
    menu.separator2(),
    menu.tlink("results", II("Results"), [model]),
    menu.separator(),
    menu.tlink("hot", II("Hot Map"), [model]),
    menu.separator(),
    menu.tlink("charts", II("Charts"), [model])
  ]);
  const Ropts =sys.$checkNull( []);
  const menuWg =sys.$checkNull( menu.mk(Lopts, Ropts, pg, false));

  const body =sys.$checkNull( Q("div"));

  const body2 =sys.$checkNull( Q("div"));
  const Vopts =sys.$checkNull( [
    vmenu.title(II("Models")),
    vmenu.separator()
  ]);
  for (const id  of sys.$forObject( ModelIds))
    arr.push(
      Vopts,
      vmenu.option(
        id,
        id,
        function()  {sys.$params(arguments.length, 0); window.location.assign("?" + id + "&" + pg);}
      )
    );
  const vmenuWg =sys.$checkNull( vmenu.mk(Vopts, model));

  body
    .removeAll()
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .style("width: 5px; vertical-align: top")
          .add(vmenuWg))
        .add(Q("td")
          .style("vertical-align: top")
          .add(body2))))
  ;

  switch (pg) {
    case "results":{ resultsPg.mk(body2, model);break;}
    case "hot":{ hotPg.mk(body2, model);break;}
    case "charts":{ chartsPg.mk(body2, model);break;}
    default:{ descriptionPg.mk(body2, model);}
  }

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
  ;
};



const wg =sys.$checkNull( Q("div"));


export  function load()  {sys.$params(arguments.length, 0);
  mk(wg);
};

client.init(true, "KtWeb", function()  {sys.$params(arguments.length, 0);
  const msgWg =sys.$checkNull( Q("div"));
  msgPg.mk(msgWg, II("Session is expired."), true);
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
