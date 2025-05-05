import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as vmenu from  "../libdm/vmenu.js";
import * as smE from  "../data/smE.js";
import * as sm from  "../data/sm.js";
import * as smVal from  "../data/smVal.js";
import * as global from  "../global.js";
import * as fns from  "../fns.js";
import * as cts from  "../cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


const {sPond, sReal, sAcc, sProf} ={"sPond":"sPond", "sReal":"sReal", "sAcc":"sAcc", "sProf":"sProf"};


const [oCavg, oLast, oAvg, oDev] =[0, 1, 2, 3];




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
    const {summary} = await  client.send({
    prg: cts.appName,
    source: "SummaryPg",
    rq: "idata"
  });

  const sourceV = [sPond];
  const orderV = [oAvg];

  const showV = [[]];
  const percentChk =sys.$checkNull( Q("input")
    .att("type", "checkbox")
    .checked(false)
    .on("change", function(e)  {sys.$params(arguments.length, 1); showV[0]();}))
  ;

  

  
   function changeSource(source)  {sys.$params(arguments.length, 1);
    sourceV[0] = source;
    showV[0]();
  };

  
   function changeOrder(order)  {sys.$params(arguments.length, 1);
    orderV[0] = order;
    showV[0]();
  };

  

  
   function mkTh(id, html)  {sys.$params(arguments.length, 2);  return Q("td")
    .klass("rhead")
    .add(sys.$eq(orderV[0] , id)
      ? Q("div")
          .klass("frame")
          .html(html)
      : ui.link(function(e)  {sys.$params(arguments.length, 1); changeOrder(id);})
          .klass("link")
          .html(html))
  ;};

  showV[0] = function()  {sys.$params(arguments.length, 0);
    const isPercent =sys.$checkNull( percentChk.isChecked());

    const vmenuWg =sys.$checkNull( vmenu.mk(
      [
        vmenu.title(II("Source")),
        vmenu.separator(),
        vmenu.option(sPond, II("Points"), function()  {sys.$params(arguments.length, 0); changeSource(sPond);}),
        vmenu.option(sReal, II("Real"), function()  {sys.$params(arguments.length, 0); changeSource(sReal);}),
        vmenu.option(sAcc, II("Accounting"), function()  {sys.$params(arguments.length, 0); changeSource(sAcc);}),
        vmenu.option(sProf, II("Profits"), function()  {sys.$params(arguments.length, 0); changeSource(sProf);})
      ],
      sourceV[0]
    ));

    const titleTx =sys.$checkNull( isPercent
      ? II("Final amount from initial one of 100 €")
      :(   
          sys.$eq(sourceV[0],sPond)? II("Final amount from initial one of 1,000 points"):
          sys.$eq(sourceV[0],sReal)|| sys.$eq(sourceV[0],sAcc)? i18n.fmt(
              II("Final amount from initial one of %0 €"),
              [fns.nfmt(global.initialCapitalV[0], 0)]
            ):
           II("Final amount from initial one of 100 €")
        ));

     const Data =(  
      sys.$eq(sourceV[0],sPond)? summary[sm.Pon]:
      sys.$eq(sourceV[0],sReal)? summary[sm.Real]:
      sys.$eq(sourceV[0],sAcc)? summary[sm.Acc]:
       summary[sm.Prof]
    );

    switch (orderV[0]) {
      case oAvg:{ arr.sort(Data,
              function( e1,  e2)  {sys.$params(arguments.length, 2);  return !sys.asBool(smVal.less(e1[smE.avg], e2[smE.avg]));}
             );break;}
      case oLast:{ arr.sort(Data,
              function( e1,  e2)  {sys.$params(arguments.length, 2);  return !sys.asBool(smVal.less(e1[smE.last], e2[smE.last]));}
             );break;}
      case oCavg:{ arr.sort(Data,
              function( e1,  e2)  {sys.$params(arguments.length, 2);  return !sys.asBool(smVal.less(e1[smE.cavg], e2[smE.cavg]));}
             );break;}
      default:{ arr.sort(Data,
              function( e1,  e2)  {sys.$params(arguments.length, 2);  return smVal.less(e1[smE.dev], e2[smE.dev]);}
             );}
    }

    const Rows = [];
    for (const  r  of sys.$forObject( Data)) {
      const tr =sys.$checkNull( Q("tr"));
      tr.add(Q("td")
        .klass("lframe")
        .add(Q("a")
          .klass("plain")
          .att("href", "?results&" + r[smE.mdId])
          .text(r[smE.mdId]))
      );
      {
         const v =sys.$checkNull( r[smE.avg]);
        tr.add(Q("td")
          .klass("rframe")
          .style("width:100px")
          .att("title", fns.pfmt(r[smE.mdId], v[smVal.ix]))
          .add(Q("a")
            .klass("plain")
            .att("href", "?charts&" + r[smE.mdId] + "&" + v[smVal.ix])
            .text(isPercent || sys.$eq(sourceV[0] , sProf)
                ? fns.nfmt(v[smVal.val] * 100, 2)
                : sys.$eq(sourceV[0] , sPond)
                  ? fns.nfmt(v[smVal.val] * 1000, 0)
                  : fns.nfmt(v[smVal.val] * global.initialCapitalV[0], 0)))
        );
      }{
         const v =sys.$checkNull( r[smE.last]);
        tr.add(Q("td")
          .klass("rframe")
          .style("width:100px")
          .att("title", fns.pfmt(r[smE.mdId], v[smVal.ix]))
          .add(Q("a")
            .klass("plain")
            .att("href", "?charts&" + r[smE.mdId] + "&" + v[smVal.ix])
            .text(isPercent || sys.$eq(sourceV[0] , sProf)
                ? fns.nfmt(v[smVal.val] * 100, 2)
                : sys.$eq(sourceV[0] , sPond)
                  ? fns.nfmt(v[smVal.val] * 1000, 0)
                  : fns.nfmt(v[smVal.val] * global.initialCapitalV[0], 0)))
        );
      }{
         const v =sys.$checkNull( r[smE.cavg]);
        tr.add(Q("td")
          .klass("rframe")
          .style("width:100px")
          .att("title", fns.pfmt(r[smE.mdId], v[smVal.ix]))
          .add(Q("a")
            .klass("plain")
            .att("href", "?charts&" + r[smE.mdId] + "&" + v[smVal.ix])
            .text(isPercent || sys.$eq(sourceV[0] , sProf)
                ? fns.nfmt(v[smVal.val] * 100, 2)
                : sys.$eq(sourceV[0] , sPond)
                  ? fns.nfmt(v[smVal.val] * 1000, 0)
                  : fns.nfmt(v[smVal.val] * global.initialCapitalV[0], 0)))
        );
      }{
         const v =sys.$checkNull( r[smE.dev]);
        tr.add(Q("td")
          .klass("rframe")
          .style("width:100px")
          .add(Q("span")
            .text(fns.nfmt(v[smVal.val] * 100, 2)))
        );
      }
      arr.push(Rows,tr);
    }

    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("width:5px;vertical-align:top")
            .add(vmenuWg))
          .add(Q("td")
            .add(Q("div")
              .klass("head")
              .text(titleTx))
            .add(Q("div")
              .klass("separator"))
            .add(Q("table")
              .att("align", "center")
              .klass("flat")
              .add(Q("tr")
                .add(Q("td")
                  .style("text-align:center")
                  .add(percentChk)
                  .add(Q("span")
                    .html("&nbsp;%")))
                .add(mkTh(oAvg, "<br>" + II("Average")))
                .add(mkTh(oLast, II("Last<br>Value")))
                .add(mkTh(oCavg, II("Corrected<br>Average")))
                .add(mkTh(oDev, II("Deviation<br>%"))))
              .adds(Rows))
        )))
    ;
  };

  showV[0]();
};
