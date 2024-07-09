import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as vmenu from  "../libdm/vmenu.js";
import * as model from  "../data/model.js";
import * as fns from  "../fns.js";
import * as global from  "../global.js";
import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  function mk(wg)  {sys.$params(arguments.length, 1);
   const Url =sys.$checkNull( ui.url());
  const mdV = [
    arr.size(Url) > 1 && fns.existsModel(Url[1])
      ? fns.getModel(Url[1])
      : fns.getModel(cts.mainModel)
  ];

  const showV = [[]];

  

  
   function changeModel(mdId)  {sys.$params(arguments.length, 1); window.location.assign("?description&" + mdId);};

  

  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
     const md =sys.$checkNull( mdV[0]);

    const Ops = [
      vmenu.title(II("Models")),
      vmenu.separator()
    ];
    for (const  md  of sys.$forObject( global.Models))
      arr.push(Ops,vmenu.option(md[model.id], md[model.id], function()  {sys.$params(arguments.length, 0); changeModel(md[model.id]);}));
    const vmenuWg =sys.$checkNull( vmenu.mk(Ops, md[model.id]));

    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("vertical-align:top; width:5px")
            .add(vmenuWg))
          .add(Q("td")
            .style("vertical-align:top")
            .add(Q("div")
              .klass("head")
              .text(md[model.name]))
            .add(Q("div").klass("separator"))
            .add(Q("table")
              .att("align", "center")
              .klass("flat")
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Id") + ":"))
                .add(Q("td")
                  .klass("rframe")
                  .text(md[model.id])))
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Name") + ":"))
                .add(Q("td")
                  .klass("rframe")
                  .text(md[model.name]))))
            .add(Q("div").klass("separator"))
            .add(Q("table")
              .att("align", "center")
              .klass("flat")
              .add(Q("tr")
                .add(Q("td"))
                .adds(arr.map(md[model.ParamNames], function(n)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rhead")
                    .text(n)
                  ;})))
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Base") + ":"))
                .adds(iter.map(
                  iter.$range(0,arr.size(md[model.ParamNames])),
                  function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rframe")
                    .text(fns.pfmt1(md[model.ParamTypes][i], global.ParamBases[md[model.id]][i]))
                  ;})))
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Base Increment") + ":"))
                .adds(iter.map(
                  iter.$range(0,arr.size(md[model.ParamNames])),
                  function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rframe")
                    .text(fns.pfmt1(md[model.ParamTypes][i], global.ParamBaseIncs[md[model.id]][i]))
                  ;})))
              .add(Q("tr")
                .add(Q("td")
                  .klass("rhead")
                  .text(II("Environment Increment") + ":"))
                .adds(iter.map(
                  iter.$range(0,arr.size(md[model.ParamNames])),
                  function(i)  {sys.$params(arguments.length, 1);  return Q("td")
                    .klass("rframe")
                    .text(fns.pfmt1(md[model.ParamTypes][i], global.ParamEnvIncs[md[model.id]][i]))
                  ;}))))
            .add(Q("div").klass("separator"))
            .add(Q("div")
              .klass("frame")
              .html(md[model.doc])))))
    ;
  });

  showV[0]();
};
