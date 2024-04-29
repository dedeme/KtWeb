import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as modalBox from  "../../libdm/modalBox.js";
import * as menu from  "../../libdm/menu.js";
import * as msg from  "../../wgs/msg.js";
import * as model from  "../../data/model.js";
import * as investor from  "../../data/investor/investor.js";
import * as istrategy from  "../../data/investor/istrategy.js";
import * as global from  "../../global.js";
import * as cts from  "../../cts.js";
import * as fns from  "../../fns.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
  const {dbKey,  Models,  inv} = await  client.send({
    prg: cts.appName,
    module: "Settings",
    source: "InvestorsPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

  const waitBox =sys.$checkNull( modalBox.mk(ui.img("wait2.gif"), false));
  const editorDiv =sys.$checkNull( Q("div"));
  const paramsDiv =sys.$checkNull( Q("div"));

  const editorViewV =sys.$checkNull( [[]]);

  

  
   async  function update()  {sys.$params(arguments.length, 0);
    modalBox.show(waitBox, true);
    const {dbKey, ok} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "InvestorsPg",
      rq: "updateAll",
      dbKey: global.dbKeyV[0]
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

    modalBox.show(waitBox, false);
    if (ok) {
      msg.error(cts.failMsg, function()  {sys.$params(arguments.length, 0);});
      return;
    }
    mk(wg);
  };

  
   function edit(nick)  {sys.$params(arguments.length, 1);
    editorViewV[0](nick);
    window.scroll(0, 0);
  };

  
   function cancel()  {sys.$params(arguments.length, 0); editorDiv.removeAll();};

  
   async  function accept(nickName, modelId, Params)  {sys.$params(arguments.length, 3);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "InvestorsPg",
      rq: "update",
      nickName:nickName,
      modelId:modelId,
      Params:Params,
      dbKey: global.dbKeyV[0]
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0],sys.$checkNull( dbKey));

    mk(wg);
  };
  

  
   function paramsView(nick, modelId, Params)  {sys.$params(arguments.length, 3);
     const md =sys.$checkNull( arr.find(Models,function(md)  {sys.$params(arguments.length, 1);  return sys.$eq(md[model.id] , modelId);})[0]);
    const sel =sys.$checkNull( Q("select"));
    for (const  m  of sys.$forObject( Models)) {
      const op =sys.$checkNull( Q("option").text(m[model.id]));
      if (sys.$eq(m[model.id] , md[model.id])) op.att("selected", true);
      sel.e.add(op.e);
    }
    sel.on(
      "change",
      function(e)  {sys.$params(arguments.length, 1);
           const md =sys.$checkNull( Models[sel.e.selectedIndex]);
          paramsView(nick, md[model.id], arr.map(md[model.ParamTypes], function(t)  {sys.$params(arguments.length, 1);
             return sys.$eq(t , model.dayParam) ? 10 : 0.1;}
          ));
        }
    );

    const paramsWg =sys.$checkNull( Q("table").klass("frame")
      .add(Q("tr")
        .adds(iter.map(
          iter.$range(0,arr.size(md[model.ParamNames])),
          function(i)  {sys.$params(arguments.length, 1);  return Q("td")
            .add(Q("div")
              .add(Q("div")
                .style("text-align:center")
                .text(md[model.ParamNames][i]))
              .add(function() {sys.$params(arguments.length, 0);
                  const inp =sys.$checkNull( ui.field("Zord" + (i + 1))
                    .att("id", "Zord" + i)
                    .style("width:80px")
                    .on("change", function(e)  {sys.$params(arguments.length, 1);
                        const V =sys.$checkNull( math.fromIso(e.target.value));
                        if (!sys.asBool(V)) {
                          ui.alert(i18n.fmt(
                            II("Bad number [%0]"), [e.target.value]
                          ));
                          paramsView(nick, modelId, Params);
                          return;
                        }
                        const v =sys.$checkNull( V[0]);
                        Params[i] =sys.$checkExists(Params[i],sys.$checkNull( v));
                      })
                    .value(math.toIso(Params[i], 6)))
                  ;
                  ui.changePoint(inp);
                   return inp;
                }()))
          ;}))))
    ;

     const base =sys.$checkNull( inv[investor.base]);
    paramsDiv
      .removeAll()
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .add(sel))
          .add(Q("td")
            .style("text-align:right")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1);
                paramsView(
                  nick,
                  base[istrategy.modelId],
                  base[istrategy.Params]
                )
              ;}).klass("link")
              .text(II("Default Model")))))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .att("align", "center")
            .add(paramsWg)))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .style("text-align:center")
            .add(Q("button")
              .text(II("Cancel"))
              .on("click", function(e)  {sys.$params(arguments.length, 1); cancel();}))
            .add(Q("span").text(" "))
            .add(Q("button")
              .att("id", "Zord" + arr.size(md[model.ParamNames]))
              .text(II("Accept"))
              .on("click", function(e)  {sys.$params(arguments.length, 1);
                accept(nick, modelId, Params);
              })))))
    ;
  };

  
  editorViewV[0] =sys.$checkExists(editorViewV[0], function(nick)  {sys.$params(arguments.length, 1);
     const is =sys.$checkNull( sys.$eq(nick , "") ? inv[investor.base] : inv[investor.Nicks][nick]);
     const md =sys.$checkNull( arr.find(Models,function( m)  {sys.$params(arguments.length, 1);  return sys.$eq(m[model.id] , is[istrategy.modelId]);})[0]);
    paramsView(nick, md[model.id], is[istrategy.Params]);

    editorDiv
      .removeAll()
      .add(Q("div")
        .klass("head")
        .text(sys.$eq(nick , "")
          ? II("Default Model")
          : i18n.fmt(II("%0 Model"), [nick])
        ))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .add(paramsDiv))))
      .add(Q("hr"))
    ;
  });

  const Ropts =sys.$checkNull( [menu.toption("update", II("Update"), update)]);
  const menuWg =sys.$checkNull( menu.mk([], Ropts, ""));

   const base =sys.$checkNull( inv[investor.base]);
   const md =sys.$checkNull( arr.find(Models,function( m)  {sys.$params(arguments.length, 1);  return sys.$eq(m[model.id] , base[istrategy.modelId]);})[0]);
   const NickStrs =sys.$checkNull( dic.toArr(inv[investor.Nicks]));
  arr.sort(NickStrs,function(N1, N2)  {sys.$params(arguments.length, 2);  return N1[0] < N2[0];});
  const maxNParams =sys.$checkNull( arr.reduce(NickStrs,0, function(r, NS)  {sys.$params(arguments.length, 2);
     const is =sys.$checkNull( NS[1]);
     return arr.size(is[istrategy.Params]) > r ? arr.size(is[istrategy.Params]) : r;
  }));
  wg
    .removeAll()
    .add(modalBox.mkWg(waitBox))
    .add(menuWg)
    .add(editorDiv)
      .add(Q("div")
        .klass("head")
        .html(II("Default Model")))
      .add(Q("table")
        .klass("white")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("header")
            .html(II("Model")))
          .adds(arr.map(md[model.ParamNames], function(n)  {sys.$params(arguments.length, 1);  return Q("td")
              .klass("header")
              .html(n)
            ;})))
        .add(Q("tr")
          .add(Q("td")
            .klass("border")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); edit("");})
              .klass("link")
              .html(md[model.id])))
          .adds(iter.map(
            iter.$range(0,arr.size(base[istrategy.Params])),
            function(ix)  {sys.$params(arguments.length, 1);  return Q("td")
              .klass("number")
              .text(fns.paramFmt(
                  md[model.ParamTypes][ix],
                  base[istrategy.Params][ix]
                ))
            ;}))))
      .add(Q("div")
        .klass("head")
        .html(II("Nick models")))
      .add(Q("table")
        .klass("white")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("header")
            .html(II("Nick")))
          .add(Q("td")
            .klass("header")
            .html(II("Model")))
          .adds(iter.map(
            iter.$range(0,maxNParams),
            function(n)  {sys.$params(arguments.length, 1);  return Q("td")
              .klass("header")
              .html("P. " + (n + 1))
            ;}))
          .add(Q("td")
            .klass("header")
            .text("·")))
        .adds(arr.map(NickStrs,function(NS)  {sys.$params(arguments.length, 1);
          const nk =sys.$checkNull( NS[0]);
           const is =sys.$checkNull( NS[1]);
           const md =sys.$checkNull( arr.find(Models,function( m)  {sys.$params(arguments.length, 1);  return sys.$eq(m[model.id] , is[istrategy.modelId]);})[0]);
           return Q("tr")
            .add(Q("td")
              .klass("border")
              .text(nk))
            .add(Q("td")
              .klass("border")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); edit(nk);})
                .klass("link")
                .text(md[model.id])))
            .adds(iter.map(
              iter.$range(0,maxNParams),
              function(ix)  {sys.$params(arguments.length, 1); 
                return ix >= arr.size(is[istrategy.Params])
                  ? Q("td")
                    .klass("border")
                  : Q("td")
                    .klass("number")
                    .text(fns.paramFmt(md[model.ParamTypes][ix], is[istrategy.Params][ix]))
              ;}))
            .add(Q("td")
              .klass("border")
              .add(ui.img(istrategy.eq(base, is) ? "blank" : "warning")))
          ;
        })))
  ;
};
