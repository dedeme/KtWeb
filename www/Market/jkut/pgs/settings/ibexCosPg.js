import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as modalBox from  "../../libdm/modalBox.js";
import * as global from  "../../global.js";
import * as ibexCo from  "../../data/ibexCo.js";
import * as msg from  "../../wgs/msg.js";
import * as cts from  "../../cts.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const stInpWidth = "110px";
const wInpWidth = "50px";




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
  const {dbKey, capital,  Cos,  Ponds} = await  client.send({
    prg: cts.appName,
    module: "Settings",
    source: "IbexCosPg",
    rq: "idata"
  });
  global.dbKeyV[0] = dbKey;
  arr.sort(Cos,function( c1,  c2)  {sys.$params(arguments.length, 2);  return c1 < c2;});

  const b1Divs = []; 
  const b2Divs = []; 
  const stDivs = []; 
  const wDivs = []; 

  const stImp =sys.$checkNull( ui.field("wImp").att("id", "stImp").style("width:" + stInpWidth));
  const wImp =sys.$checkNull( ui.field("stImp").att("id", "wImp").style("width:" + wInpWidth));

  const boxWg =sys.$checkNull( Q("div"));
   const box =sys.$checkNull( modalBox.mk(boxWg, false));

  

  const cancelV = [[]]; 

  
   function importFn()  {sys.$params(arguments.length, 0);
    const NewCos = []; 
    const inpArea =sys.$checkNull( Q("textarea")
      .att("cols", 50)
      .att("rows", 40)
      .att("spellcheck", false))
    ;
    const modArea =sys.$checkNull( Q("textarea")
      .att("cols", 40)
      .att("rows", 10)
      .att("spellcheck", false)
      .disabled(true))
    ;
    const errArea =sys.$checkNull( Q("textarea")
      .att("cols", 40)
      .att("rows", 10)
      .att("spellcheck", false)
      .disabled(true)
      .text(II("No data read")))
    ;
    const modBt =sys.$checkNull( Q("button")
      .disabled(true))
    ;

    
     function cancel()  {sys.$params(arguments.length, 0); modalBox.show(box,false);};

    
     function read()  {sys.$params(arguments.length, 0);
      modBt.disabled(true);
      errArea.text("");
      modArea.text("");
       const tx =sys.$checkNull( str.trim(inpArea.getValue()));
      if (sys.$eq(tx , "")) {
        errArea.text(II("No data read"));
        return;
      }
      arr.clear(NewCos);
      for (const [i, l]  of sys.$forObject2( str.splitTrim(tx,"\n"))) {
        if (sys.$eq(l , "")) continue;
         const Fs =sys.$checkNull( str.splitTrim(l, " "));
        if (arr.size(Fs) < 3) {
          errArea.text(i18n.fmt(II("%0:\n  Wrong line"), [l]));
          return;
        }
        const pondOp =sys.$checkNull( math.fromStr(arr.pop(Fs)));
        if (!sys.asBool(pondOp)) {
          errArea.text(i18n.fmt(II("%0:\n  Wrong ponderation value"), [l]));
          return;
        }
        const pond =sys.$checkNull( math.toInt(pondOp[0]));
        if (pond < 0) {
          errArea.text(i18n.fmt(II("%0:\n  Ponderation value < 0"), [l]));
          return;
        }
        if (pond > 100) {
          errArea.text(i18n.fmt(II("%0:\n  Ponderation value > 100"), [l]));
          return;
        }
        const stocksOp =sys.$checkNull( math.fromStr(str.replace(arr.pop(Fs), ".", "")));
        if (!sys.asBool(stocksOp)) {
          errArea.text(i18n.fmt(II("%0:\n  Wrong stocks number"), [l]));
          return;
        }
        const stocks =sys.$checkNull( math.toInt(stocksOp[0]));
        if (stocks <= 0) {
          errArea.text(i18n.fmt(II("%0:\n  Stocks value <Eq 0"), [l]));
          return;
        }
        arr.push(NewCos,ibexCo.mk(Fs[0], false, stocks, pond));
      }

      for (const  c  of sys.$forObject( Cos))
        if (!sys.asBool(arr.any(NewCos,function( nc)  {sys.$params(arguments.length, 1);  return sys.$eq(c[ibexCo.nick] , nc[ibexCo.nick]);}))) {
          errArea.text(i18n.fmt(II("Data of %0 is missing."), [c[ibexCo.nick]]));
          return;
        }
      const ModTx = []; 
      for (const  nc  of sys.$forObject( NewCos)) {
        const cOp =sys.$checkNull( arr.find(Cos,function( c)  {sys.$params(arguments.length, 1);  return sys.$eq(c[ibexCo.nick] , nc[ibexCo.nick]);}));
        if (!sys.asBool(cOp)) {
          errArea.text(i18n.fmt(II("Unknown new company."), [nc[ibexCo.nick]]));
          return;
        }
         const c =sys.$checkNull( cOp[0]);
        nc[ibexCo.sel] =sys.$checkNull( c[ibexCo.sel]);

        if (sys.$neq(c[ibexCo.stocks] , nc[ibexCo.stocks]))
          arr.push(ModTx,c[ibexCo.nick] + ": " + c[ibexCo.stocks] + " -> " + nc[ibexCo.stocks]);
        if (sys.$neq(c[ibexCo.pond] , nc[ibexCo.pond]))
          arr.push(ModTx,c[ibexCo.nick] + ": " + c[ibexCo.pond] + " -> " + nc[ibexCo.pond]);
      }
      modArea.text(arr.join(ModTx,"\n"));

      modBt.disabled(false);
    };

    
     async  function update()  {sys.$params(arguments.length, 0);
      await client.send({
        prg: cts.appName,
        module: "Settings",
        source: "IbexCosPg",
        rq: "updateAll",
        Cos: NewCos,
        dbKey: global.dbKeyV[0]
      });

      mk(wg);
    };

    boxWg
      .removeAll()
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .add(Q("div")
              .klass("head")
              .text(II("Data"))))
          .add(Q("td")
            .add(Q("div")
              .klass("head")
              .text(II("Modifications")))))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:right")
            .add(Q("button")
              .on("click", function(ev)  {sys.$params(arguments.length, 1); read();})
              .text(II("Read"))))
          .add(Q("td")
            .style("text-align:right")
            .add(Q("button")
              .text(II("Cancel"))
                .on("click", function(ev)  {sys.$params(arguments.length, 1); cancel();}))
            .add(modBt
              .text(II("Modify"))
                .on("click", function(ev)  {sys.$params(arguments.length, 1); update();}))))
        .add(Q("tr")
          .add(Q("td")
            .att("rowspan", 3)
            .add(inpArea))
          .add(Q("td")
            .style("vertical-align:top")
            .add(modArea)))
        .add(Q("tr")
          .add(Q("td")
            .style("vertical-align:top")
            .add(Q("div")
              .klass("head")
              .text(II("Errors")))))
        .add(Q("tr")
          .add(Q("td")
            .style("vertical-align:top")
            .add(errArea)))
      );
    modalBox.show(box,true);
  };

  
   async  function list()  {sys.$params(arguments.length, 0);
    
    const Rp =sys.$checkNull( await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "IbexCosPg",
      rq: "list"
    }));
     const Cos =sys.$checkNull( Rp.Cos);
    arr.sort(Cos,function(E1, E2)  {sys.$params(arguments.length, 2);  return E1[2] > E2[2];});

    boxWg
      .removeAll()
      .add(Q("div")
        .klass("head")
        .text(II("Weights list")))
      .add(Q("div")
        .add(Q("textarea")
          .att("cols", 18)
          .att("rows", 20)
          .att("spellcheck", false)
          .disabled(true)
          .text(arr.join(
              arr.map(Cos,function(E)  {sys.$params(arguments.length, 1); 
                return (E[1] ? "+" : "-") +
                sys.$slice(("   " + E[0]), -5,null) + ": " +
                math.toIso(E[2], 4) + "%"
              ;}),
              "\n"
            ))))
      .add(Q("button")
        .text(II("Close"))
        .on("click", function(ev)  {sys.$params(arguments.length, 1); modalBox.show(box,false);}))
    ;
    modalBox.show(box,true);
  };

  
   async  function update(i)  {sys.$params(arguments.length, 1);
     const c =sys.$checkNull( Cos[i]);

    const stocks =sys.$checkNull( str.replace(stImp.getValue(), ".", ""));
    if (!sys.asBool(math.isDigits(stocks))) {
      msg.error(II("Stocks error: wrong integer"), function(){sys.$params(arguments.length, 0);});
      return;
    }
    const stocksN =sys.$checkNull( math.fromStr(stocks)[0]);
    if (stocksN <= 0) {
      msg.error(II("Stocks error: value <Eq 0"), function(){sys.$params(arguments.length, 0);});
      return;
    }
    const weight =sys.$checkNull( str.replace(wImp.getValue(), ".", ""));
    if (!sys.asBool(math.isDigits(weight))) {
      msg.error(II("Weight error: wrong integer"), function(){sys.$params(arguments.length, 0);});
      return;
    }
    const weightN =sys.$checkNull( math.fromStr(weight)[0]);
    if (weightN < 0) {
      msg.error(II("Weight error: value < 0"), function(){sys.$params(arguments.length, 0);});
      return;
    }
    if (weightN > 100) {
      msg.error(II("Weight error: value > 100"), function(){sys.$params(arguments.length, 0);});
      return;
    }

    await client.send({
      prg: cts.appName,
      module: "Settings",
      source: "IbexCosPg",
      rq: "update",
      ibexC: ibexCo.mk(c[ibexCo.nick], c[ibexCo.sel], stocksN, weightN),
      dbKey: global.dbKeyV[0]
    });

    mk(wg);
  };

  
   function edit(i)  {sys.$params(arguments.length, 1);
    for (let ix = 0;ix < arr.size(Cos); ++ix) {
      b1Divs[ix]
        .removeAll()
        .add(ui.img("blank"))
      ;
      b2Divs[ix]
        .removeAll()
        .add(ui.img("blank"))
      ;
    }

    b1Divs[i]
      .removeAll()
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); update(i);})
        .add(ui.img("ok")))
    ;
    b2Divs[i]
      .removeAll()
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); cancelV[0]();})
        .add(ui.img("cancel")))
    ;
     const c =sys.$checkNull( Cos[i]);
    stImp.value(c[ibexCo.stocks]);
    stDivs[i]
      .removeAll()
      .add(stImp)
    ;
    wImp.value(c[ibexCo.pond]);
    wDivs[i]
      .removeAll()
      .add(wImp)
    ;
  };

  
   async  function select(i)  {sys.$params(arguments.length, 1);
     const c =sys.$checkNull( Cos[i]);
    if (sys.$eq(c[ibexCo.stocks] , 0)) {
      msg.error(II("Error: Stocks number is 0"), function(){sys.$params(arguments.length, 0);});
      return;
    }

    await client.send({
      prg: cts.appName,
      module: "Settings",
      source: "IbexCosPg",
      rq: "select",
      nick: c[ibexCo.nick],
      dbKey: global.dbKeyV[0]
    });

    mk(wg);
  };

  
  cancelV[0] = function()  {sys.$params(arguments.length, 0);
    for ( const [i, c]  of sys.$forObject2( Cos)) {
      b1Divs[i]
        .removeAll()
        .add(ui.link(function(e)  {sys.$params(arguments.length, 1); edit(i);})
          .add(ui.img("edit")))
      ;
      b2Divs[i]
        .removeAll()
        .add(ui.link(function(e)  {sys.$params(arguments.length, 1); select(i);})
          .add(ui.img(!sys.asBool(dic.get(Ponds,c[ibexCo.nick])) ? "plus" : "minus2")))
      ;
      stDivs[i]
        .removeAll()
        .text(math.toIso(c[ibexCo.stocks], 0))
      ;
      wDivs[i]
        .removeAll()
        .text(math.toIso(c[ibexCo.pond], 0))
      ;
    }
  };

  

  for ( const [i, c]  of sys.$forObject2( Cos)) {
    arr.push(b1Divs,Q("div")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); edit(i);})
        .add(ui.img("edit")))
    );
    arr.push(b2Divs,!sys.asBool(dic.get(Ponds,c[ibexCo.nick]))
      ? Q("div")
        .add(ui.link(function(e)  {sys.$params(arguments.length, 1); select(i);})
          .add(ui.img("plus")))
      : Q("div")
        .add(ui.link(function(e)  {sys.$params(arguments.length, 1); select(i);})
          .add(ui.img("minus2")))
    );
    arr.push(stDivs,Q("div").text(math.toIso(c[ibexCo.stocks], 0)));
    arr.push(wDivs,Q("div").text(math.toIso(c[ibexCo.pond], 0)));
  }

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .text(II("Investment") + ": "))
        .add(Q("td")
          .klass("border")
          .text(math.toIso(capital, 2)))))
    .add(Q("div")
      .klass("head")
      .text(" "))
    .add(Q("div")
      .style("text-align:center")
      .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); importFn();})
        .klass("link")
        .text(II("Import")))
      .add(Q("div")
        .style("height:5px")))
    .add(Q("table")
      .klass("white")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(ui.link(function(ev)  {sys.$params(arguments.length, 1); list();})
            .add(ui.img("transOn"))))
        .add(Q("td"))
        .add(Q("td")
          .klass("header")
          .html(II("Nick")))
        .add(Q("td")
          .klass("header")
          .style("width:" + stInpWidth)
          .html(II("Stocks")))
        .add(Q("td")
          .klass("header")
          .html(II("Weight")))
        .add(Q("td")
          .klass("header")
          .html(" "))
        .add(Q("td")
          .klass("header")
          .html(II("Pond.")))
        .add(Q("td")
          .klass("header")
          .html(II("Amount"))))
      .adds(function()  {sys.$params(arguments.length, 0);
        const R = []; 
        for ( const [i, c]  of sys.$forObject2( Cos)) {
          arr.push(R,Q("tr")
            .add(Q("td")
              .add(b1Divs[i]))
            .add(Q("td")
              .add(b2Divs[i]))
            .add(Q("td")
              .klass("border")
              .text(c[ibexCo.nick]))
            .add(Q("td")
              .klass("number")
              .add(stDivs[i]))
            .add(Q("td")
              .klass("number")
              .add(wDivs[i]))
            .add(Q("td")
              .klass("border")
              .text(" "))
            .add(Q("td")
              .klass("number")
              .text(function()  {sys.$params(arguments.length, 0);
                  const pOp =sys.$checkNull( dic.get(Ponds,c[ibexCo.nick]));
                   return math.toIso(!sys.asBool(pOp) ? 0 : pOp[0], 4);
                }()))
            .add(Q("td")
              .klass("number")
              .text(function()  {sys.$params(arguments.length, 0);
                  const pOp =sys.$checkNull( dic.get(Ponds,c[ibexCo.nick]));
                   return math.toIso(!sys.asBool(pOp) ? 0 : pOp[0] * capital, 2);
                }()))
          );
        }
         return R;
      }())
      .add(modalBox.mkWg(box)))
  ;
};
