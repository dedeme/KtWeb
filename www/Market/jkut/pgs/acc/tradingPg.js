import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as menu from  "../../libdm/menu.js";
import * as modalBox from  "../../libdm/modalBox.js";
import * as cts from  "../../cts.js";
import * as broker from  "../../data/broker.js";
import * as invOperation from  "../../data/invOperation.js";
import * as msg from  "../../wgs/msg.js";
import * as global from  "../../global.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 function invTd(inv)  {sys.$params(arguments.length, 1);
   return Q("td")
    .klass("borderWhite")
    .text("" + inv)
  ;};


 function ciaTd(nick)  {sys.$params(arguments.length, 1);
   return Q("td")
    .klass("borderWhite")
    .style("text-align:left")
    .text(nick)
  ;};


 function stocksTd(stocks)  {sys.$params(arguments.length, 1);
   return Q("td")
    .klass("borderWhite")
    .style("text-align:right")
    .text(math.toIso(stocks, 0))
  ;};


 function quoteTd(q)  {sys.$params(arguments.length, 1);
   return Q("td")
    .klass("borderWhite")
    .style("text-align:right")
    .text(math.toIso(q, 4))
  ;};


 function moneyTd(q)  {sys.$params(arguments.length, 1);
   return Q("td")
    .klass("borderWhite")
    .style("text-align:right")
    .text(math.toIso(q, 2))
  ;};





export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const {dbKey, ok,
   InvOperations, 
   Portfolio, 
   Closes, 
   Rebuys, 
   IbexCos} 
  = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "TradingPg",
    rq: "idata"
  });
  global.dbKeyV[0] = dbKey;
   const IbexNicks =sys.$checkNull( dic.keys(IbexCos));
  arr.sort(IbexNicks,function(nick1, nick2)  {sys.$params(arguments.length, 2);  return nick1 < nick2;});
  arr.unshift(IbexNicks,"+");

  if (!sys.asBool(ok)) {
    msg.error(cts.failMsg, function(){sys.$params(arguments.length, 0);});
    return;
  }

  const msgWait =sys.$checkNull( Q("div"));

  const bibex =sys.$checkNull( ui.select("bibex", IbexNicks));
  const biinv =sys.$checkNull( Q("div").klass("frame").style("text-align:right").text("0"));
  const bentry =sys.$checkNull( ui.field("pentry")
    .style("width:80px")
    .value(math.toIso(cts.bet, 0)));
  ui.changePoint(bentry);
  const pentry =sys.$checkNull( ui.field("calcBuyBt")
    .style("width:80px")
    .att("id", "pentry"));
  ui.changePoint(pentry);
  const btotal =sys.$checkNull( Q("div").klass("frame").style("text-align:right"));
  const bportfolio =sys.$checkNull( Q("div").klass("frame").style("text-align:right"));
  const bbuy =sys.$checkNull( Q("div").klass("frame").style("text-align:right"));

  const sibex =sys.$checkNull( ui.select("sibex", IbexNicks));
  const siinv =sys.$checkNull( Q("div").klass("frame").style("text-align:right").text("0"));
  const sentry =sys.$checkNull( ui.field("calcSellBt")
    .style("width:80px")
    .att("id", "sentry"));
  ui.changePoint(sentry);
  const sportfolio =sys.$checkNull( Q("div").klass("frame").style("text-align:right"));
  const ssibex =sys.$checkNull( Q("div").klass("frame").style("text-align:right"));
  const ssell =sys.$checkNull( Q("div").klass("frame").style("text-align:right"));

  

  
   async  function update()  {sys.$params(arguments.length, 0);
     const box =sys.$checkNull( modalBox.mk(
      Q("div")
        .add(Q("div")
          .style("text-align:center")
          .add(ui.img("wait2.gif").klass("frame"))),
      false
    ));
    msgWait.add(modalBox.mkWg(box));
    modalBox.show(box, true);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      module: "Acc",
      source: "TradingPg",
      rq: "update",
      dbKey: global.dbKeyV[0]
    });
    global.dbKeyV[0] = dbKey;

    modalBox.show(box, false);
    mk(wg);
  };

  
   function changeBCo()  {sys.$params(arguments.length, 0);
    const comp =sys.$checkNull( bibex.getValue());
    if (sys.$eq(comp , "")) biinv.text("0");
    else {
      const vOp =sys.$checkNull( dic.get(IbexCos,comp));
      biinv.text(math.toIso(!sys.asBool(vOp) ? 0 : vOp[0], 0));
    }
    pentry.value(0);
    btotal.text("");
    bportfolio.text("");
    bbuy.text("");
  };

  
   function changeSCo()  {sys.$params(arguments.length, 0);
    const comp =sys.$checkNull( sibex.getValue());
    if (sys.$eq(comp , "")) siinv.text("0");
    else {
      const vOp =sys.$checkNull( dic.get(IbexCos,comp));
      siinv.text(math.toIso(!sys.asBool(vOp) ? 0 : vOp[0], 0));
    }
    sentry.value(0);
    sportfolio.text("");
    ssibex.text("");
    ssell.text("");
  };

  
   function calculateBuy()  {sys.$params(arguments.length, 0);
    const comp =sys.$checkNull( bibex.getValue());
    const ixOp =sys.$checkNull( sys.$eq(comp , "")
      ? []
      : dic.get(IbexCos,comp))
    ;
    const ix =sys.$checkNull( !sys.asBool(ixOp) ? 0 : ixOp[0]);

    const bs =sys.$checkNull( bentry.getValue());
    const bOp =sys.$checkNull( math.fromIso(bs));
    if (!sys.asBool(bOp)) {
      ui.alert(i18n.fmt(II("'%0' is not a valid number."), [bs]));
      return;
    }
    const b =sys.$checkNull( bOp[0]);

    const ps =sys.$checkNull( pentry.getValue());
    const pOp =sys.$checkNull( math.fromIso(ps));
    if (!sys.asBool(pOp)) {
      ui.alert(i18n.fmt(II("'%0' is not a valid number."), [ps]));
      return;
    }
    const p =sys.$checkNull( pOp[0]);
    if (p <= 0) {
      ui.alert(II("Price is <Eq 0"));
      return;
    }

    const pfOp =sys.$checkNull( dic.get(Portfolio,comp));
    const pf =sys.$checkNull( !sys.asBool(pfOp) ? 0 : pfOp[0][0]);

    const amount = ix + b - pf * p;
    const am = amount - broker.buyFees(amount);

    const rs =sys.$checkNull( math.toInt(am / p));

    btotal.text(math.toIso(rs + pf, 0));
    bportfolio.text(math.toIso(pf, 0));
    bbuy.text(math.toIso(rs, 0));
  };

  
   function calculateSell()  {sys.$params(arguments.length, 0);
    const comp =sys.$checkNull( sibex.getValue());
    const ixOp =sys.$checkNull( sys.$eq(comp , "")
      ? []
      : dic.get(IbexCos,comp))
    ;
    const ix =sys.$checkNull( !sys.asBool(ixOp) ? 0 : ixOp[0]);

    const pfOp =sys.$checkNull( dic.get(Portfolio,comp));
    const pf =sys.$checkNull( !sys.asBool(pfOp) ? 0 : pfOp[0][0]);

    const ps =sys.$checkNull( sentry.getValue());
    const pOp =sys.$checkNull( math.fromIso(ps));
    if (!sys.asBool(pOp)) {
      ui.alert(i18n.fmt(II("'%0' is not a valid number."), [ps]));
      return;
    }
    const p =sys.$checkNull( pOp[0]);
    if (p <= 0) {
      ui.alert(II("Price is <Eq 0"));
      return;
    }

    const ixSt =sys.$checkNull( math.toInt(ix / pOp[0]));

    const rs0 = pf - ixSt;
    const rs =sys.$checkNull( rs0 < 0 ? 0 : rs0);

    sportfolio.text(math.toIso(pf, 0));
    ssibex.text(math.toIso(ixSt, 0));
    ssell.text(math.toIso(rs, 0));
  };

  

  bibex.on("change", function(ev)  {sys.$params(arguments.length, 1); changeBCo();});
  sibex.on("change", function(ev)  {sys.$params(arguments.length, 1); changeSCo();});

  
   function buyWg()  {sys.$params(arguments.length, 0);
     return Q("table")
      .klass("frame4")
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("div")
            .klass("head")
            .text(II("Buy")))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Company") + ":</b>")))
        .add(Q("td")
          .add(bibex)))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + "Ibex" + ":</b>")))
        .add(Q("td")
          .add(biinv)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Invest") + ":</b>")))
        .add(Q("td")
          .add(bentry)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Price") + ":</b>")))
        .add(Q("td")
          .add(pentry)))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .style("text-align:center")
          .add(Q("button")
            .att("id", "calcBuyBt")
            .text(II("Calculate"))
            .on("click", function(e)  {sys.$params(arguments.length, 1); calculateBuy();}))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("div")
            .klass("head")
            .text(II("Stocks")))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Total") + ":</b>")))
        .add(Q("td")
          .add(btotal)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Portfolio") + ":</b>")))
        .add(Q("td")
          .add(bportfolio)))
      .add(Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Buy") + ":</b>")))
        .add(Q("td")
          .add(bbuy)))
  ;};

  
   function sellWg()  {sys.$params(arguments.length, 0);
     return Q("table")
      .klass("frame3")
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("div")
            .klass("head")
            .text(II("Sell")))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Company") + ":</b>")))
        .add(Q("td")
          .add(sibex)))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + "Ibex" + ":</b>")))
        .add(Q("td")
          .add(siinv)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Price") + ":</b>")))
        .add(Q("td")
          .add(sentry)))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .style("text-align:center")
          .add(Q("button")
            .att("id", "calcSellBt")
            .text(II("Calculate"))
            .on("click", function(e)  {sys.$params(arguments.length, 1); calculateSell();}))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .add(Q("div")
            .klass("head")
            .text(II("Stocks")))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Portfolio") + ":</b>")))
        .add(Q("td")
          .add(sportfolio)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Ibex") + ":</b>")))
        .add(Q("td")
          .add(ssibex)))
      .add(Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:right")
          .add(Q("div")
            .html("<b>" + II("Sell") + ":</b>")))
        .add(Q("td")
          .add(ssell)))
    ;};

   const RebuysArr =sys.$checkNull( dic.toArr(Rebuys));
  arr.sort(RebuysArr,function(Tp1, Tp2)  {sys.$params(arguments.length, 2);
     return sys.$eq(Tp1[1] , Tp2[1]) ? Tp1[0] < Tp2[0] : Tp1[1] < Tp2[1];});
  const RebuyTrs =sys.$checkNull( !sys.asBool(RebuysArr)
    ? [ Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .klass("borderWhite")
          .html(II("Without operations")))
      ]
    : function()  {sys.$params(arguments.length, 0);
      const Trs = [];
      const iV =[0];
      const trV = [Q("tr")];
      while (iV[0] < arr.size(RebuysArr)) {
        const Tp =sys.$checkNull( RebuysArr[iV[0]]);
        trV[0]
          .add(ciaTd(Tp[0]))
          .add(ciaTd(
            sys.$eq(i18n.getLang() , "es")
              ? time.toIso(time.fromStr(Tp[1])[0])
              : time.toEn(time.fromStr(Tp[1])[0])))
        ;
        if (sys.$neq(iV[0] % 3 , 2))
          trV[0].add(Q("td").klass("separator"));
        iV[0] += 1;
        if (sys.$eq(iV[0] % 3 , 0)) {
          arr.push(Trs,trV[0]);
          trV[0] =sys.$checkNull( Q("tr"));
        }
      }
      if (sys.$neq(iV[0] % 3 , 0)) arr.push(Trs,trV[0]);
       return Trs;
    }())
  ;

  arr.sort(InvOperations,
    function( o1,  o2)  {sys.$params(arguments.length, 2);  return o1[invOperation.nick] < o2[invOperation.nick];}
  );
   const BuyOps =sys.$checkNull( arr.filter(InvOperations,
    function( o)  {sys.$params(arguments.length, 1);  return o[invOperation.stocks] <= 0;}
  ));
  const BuyTrs =sys.$checkNull( !sys.asBool(BuyOps)
    ? [ Q("tr")
        .add(Q("td")
          .klass("borderWhite")
          .html(II("Without operations")))
      ]
    : arr.map(BuyOps,
        function( o)  {sys.$params(arguments.length, 1);  return Q("tr")
          .add(ciaTd(o[invOperation.nick]).setStyle(
              "text-decoration",
              arr.any(RebuysArr,function(Tp)  {sys.$params(arguments.length, 1);  return sys.$eq(Tp[0] , o[invOperation.nick]);})
              ? "line-through"
              : ""
            ))
      ;}))
  ;

   const SellOps =sys.$checkNull( arr.filter(InvOperations,function( o)  {sys.$params(arguments.length, 1);
     return o[invOperation.stocks] > 0 && dic.hasKey(Portfolio, o[invOperation.nick]);}
  ));
  const SellTrs =sys.$checkNull( !sys.asBool(SellOps)
    ? [ Q("tr")
        .add(Q("td")
          .att("colspan", 5)
          .klass("borderWhite")
          .html(II("Without operations")))
      ]
    : arr.map(SellOps,
        function( o)  {sys.$params(arguments.length, 1);
          const pr =sys.$checkNull( Portfolio[o[invOperation.nick]][1]);
          const cl =sys.$checkNull( Closes[o[invOperation.nick]]);
          const dif = (cl - pr) * 100 / pr;
          const color =sys.$checkNull( dif >= 0 ? "#d0d9f0" : dif >=  -5 ? "#f0f0d9" : "#ffffff");
           return Q("tr")
            .add(ciaTd(o[invOperation.nick]).setStyle("background", color))
            .add(stocksTd(o[invOperation.stocks]).setStyle("background", color))
            .add(quoteTd(pr).setStyle("background", color))
            .add(quoteTd(cl).setStyle("background", color))
            .add(quoteTd(dif).setStyle("background", color))
          ;
      }))
  ;

  wg
    .removeAll()
    .add(msgWait)
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td")
          .style("vertical-align:top;width:5px")
          .add(buyWg()))
        .add(Q("td")
          .style("text-align:center")
            .add(Q("table")
              .att("align", "center")
              .add(Q("tr")
                .add(Q("td")
                  .add(ui.link(function(e)  {sys.$params(arguments.length, 1);update();})
                    .klass("link")
                    .text(II("Update")))))
              .add(Q("tr")
                .add(Q("td")
                  .klass("head")
                  .html("&nbsp;"))))
            .add(Q("table")
              .klass("frame")
              .att("align", "center")
              .add(Q("tr")
                .add(Q("td")
                  .add(Q("div")
                    .klass("head")
                    .html(II("Rebuys")))
                  .add(Q("table")
                    .klass("frame2")
                    .style("border-collapse : collapse;")
                    .add(Q("tr")
                      .adds(iter.reduce(
                          iter.$range(0,(arr.size(RebuysArr) > 2 ? 2 : arr.size(RebuysArr) -1)),
                          [ Q("td").klass("head").html(II("Co.")),
                            Q("td").klass("head").html(II("Date")),
                            Q("td").klass("separator")
                          ],
                          function(R, i)  {sys.$params(arguments.length, 2);
                            arr.push(R, Q("td").klass("head").html(II("Co.")));
                            arr.push(R, Q("td").klass("head").html(II("Date")));
                            if (sys.$neq(i % 3 , 1))
                              arr.push(R, Q("td").klass("separator"));
                             return R;
                          }
                        )))
                    .adds(RebuyTrs)))))
          .add(Q("div")
            .klass("head")
            .html("&nbsp;"))
          .add(Q("div")
            .klass("head")
            .html(II("Buys")))
          .add(Q("table")
            .att("align", "center")
            .klass("buys")
            .add(Q("tr")
              .add(Q("td").klass("head").html(II("Co."))))
            .adds(BuyTrs))
          .add(Q("div")
            .klass("head")
            .html(II("Sells")))
          .add(Q("table")
            .att("align", "center")
            .klass("sells")
            .add(Q("tr")
              .add(Q("td").klass("head").html(II("Co.")))
              .add(Q("td").klass("head").html(II("Stocks")))
              .add(Q("td").klass("head").html(II("Price")))
              .add(Q("td").klass("head").html(II("Quote")))
              .add(Q("td").klass("head").html("%&Delta;"))
              )
            .adds(SellTrs)
            ))
        .add(Q("td")
          .style("vertical-align:top;width:5px")
          .add(sellWg()))))
  ;
};
