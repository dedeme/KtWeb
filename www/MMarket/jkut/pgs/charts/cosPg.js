import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as modalBox from  "../../libdm/modalBox.js";
import * as order from  "../../data/order.js";
import * as stRs from  "../../data/stRs.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);








export  function mk(wg,  Dates,  Cos,  Closes,  rs)  {sys.$params(arguments.length, 5);

  const nlossesV = [0];
  const ratiosSumV = [0];


  const modalDiv =sys.$checkNull( Q("div"));
  const mBox =sys.$checkNull( modalBox.mk(modalDiv, true));
  const clientResultsDiv =sys.$checkNull( Q("div"));
  const GrDivs = []; 

  const nrows = math.toInt((arr.size(Cos) - 1) / 3) + 1;
  for (let i = 0;i < nrows; ++i) {
    const Row = []; 
    for (let j = 0;j < 3; ++j) {
      const dv =sys.$checkNull( Q("div"));
      const ico = i * 3 + j;
      if (ico < arr.size(Cos)) {
        wait(dv, Cos[ico]);
      }
      arr.push(Row, dv);
    }
    arr.push(GrDivs, Row);
  }

  
   function showBigChart(co, Data)  {sys.$params(arguments.length, 2);
     const Ch =sys.$checkNull( lineChart.mkExample());
    Ch.exArea.width =sys.$checkExists(Ch.exArea.width, 800);
    Ch.exArea.height =sys.$checkExists(Ch.exArea.height, 400);
    Ch.exArea.atts.background =sys.$checkExists(Ch.exArea.atts.background, "#ffffff");
    Ch.inAtts.background =sys.$checkExists(Ch.inAtts.background, "#e9e9e9");
    Ch.labels.onPopup =sys.$checkExists(Ch.labels.onPopup, true);

    modalDiv
      .removeAll()
      .add(Q("div")
        .klass("head")
        .text(co))
      .add(lineChart.mkWg(Ch, Data))
      .add(Q("button")
        .text(II("Close"))
        .on("click", function(e)  {sys.$params(arguments.length, 1); modalBox.show(mBox,false);}))
    ;
    modalBox.show(mBox,true);
  };

  
   function mkCharts()  {sys.$params(arguments.length, 0);
    
     function mkChart(ico)  {sys.$params(arguments.length, 1);
      const co =sys.$checkNull( Cos[ico]);
      const div =sys.$checkNull( GrDivs[math.toInt(ico / 3)][ico % 3]);

      const Refs =sys.$checkNull( arr.dropWhile(
        arr.map(rs[stRs.Refs], function(Row)  {sys.$params(arguments.length, 1);  return Row[ico];}),
        function(r)  {sys.$params(arguments.length, 1);  return r < 0;}
      ));
      const skip = arr.size(Closes) - arr.size(Refs);
      const Dts =sys.$checkNull( arr.drop(Dates, skip));
      const Qs =sys.$checkNull( arr.map(arr.drop(Closes, skip), function(Row)  {sys.$params(arguments.length, 1);  return Row[ico];}));
      const Labels =sys.$checkNull( arr.map(Dts, function(d)  {sys.$params(arguments.length, 1);  return sys.$slice(d,4,6);}));
      const profits =sys.$checkNull( rs[stRs.Profits][ico]);
      const sales =sys.$checkNull( arr.size(rs[stRs.Sales][ico]));

      const RefsUp =sys.$checkNull( arr.fromIter(iter.map(
        iter.$range(0,arr.size(Qs)),
        function(i)  {sys.$params(arguments.length, 1);
          const q =sys.$checkNull( Qs[i]);
          const r =sys.$checkNull( Refs[i]);
           return r > q ? [r] : [];
        }
      )));
      const RefsDown =sys.$checkNull( arr.fromIter(iter.map(
        iter.$range(0,arr.size(Qs)),
        function(i)  {sys.$params(arguments.length, 1);
          const q =sys.$checkNull( Qs[i]);
          const r =sys.$checkNull( Refs[i]);
           return r < q ? [r] : [];
        }
      )));
      if (profits < 0) nlossesV[0] +=sys.$checkExists(nlossesV[0], 1);
      ratiosSumV[0] +=sys.$checkExists(ratiosSumV[0], profits);

       const Ch =sys.$checkNull( lineChart.mkExample());
      Ch.exArea.width =sys.$checkExists(Ch.exArea.width, 300);
      Ch.exArea.height =sys.$checkExists(Ch.exArea.height, 150);
      Ch.exArea.atts.background =sys.$checkExists(Ch.exArea.atts.background, "#ffffff");
      Ch.inAtts.background =sys.$checkExists(Ch.inAtts.background, "#e9e9e9");

       const Data =sys.$checkNull( lineChart.mkData(
        Labels,
        [ RefsUp,
          RefsDown,
          arr.map(Qs, function(q)  {sys.$params(arguments.length, 1);  return [q];})],
        [ lineChart.mkLine(1, "#4060a0", false),
          lineChart.mkLine(1, "#a06040", false),
          lineChart.mkLine(1, "#000000", false)
        ]
      ));

      Data.maxMinRound =sys.$checkExists(Data.maxMinRound, function(mx, mn)  {sys.$params(arguments.length, 2);  return mx > 10 ? 0 :  -1;});
      const PrevLabel = [Labels[0]];
      Data.drawLabel =sys.$checkExists(Data.drawLabel, function(l, i)  {sys.$params(arguments.length, 2);
        if (sys.$eq(i , 0))  return false;
        if (sys.$neq(l , PrevLabel[0]) && (sys.$eq(l , "01") || sys.$eq(l , "05") || sys.$eq(l , "09"))) {
          PrevLabel[0] =sys.$checkExists(PrevLabel[0], l);
           return true;
        }
         return false;
      });
      Data.drawGrid =sys.$checkExists(Data.drawGrid, function(l, i)  {sys.$params(arguments.length, 2);  return false;});

      div
        .removeAll()
        .add(Q("table")
          .add(Q("tr")
            .add(Q("td")
              .style("text-align:left")
              .text(co))
            .add(Q("td")
              .style("text-align:right")
              .add(Q("span")
                .text(
                    math.toIso(profits * 100, 2) + "% [" +
                    math.toIso(sales, 0) + "] "
                  ))
              .add(ui.img(profits < 0 ? "losses" : "profits")
                .style("vertical-align:middle"))))
          .add(Q("tr")
            .add(Q("td")
              .att("colspan", 2)
              .add(lineChart.mkWg(Ch, Data)
                .on("click", function(e)  {sys.$params(arguments.length, 1); showBigChart(co, Data);})))))
      ;
    };

    for (let i = 0;i < arr.size(Cos); ++i) mkChart(i);

    clientResultsDiv
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("rframe")
            .add(Q("span")
              .text("" + (arr.size(Cos) - nlossesV[0]) + " "))
            .add(ui.img("profits")
              .style("vertical-align: middle")))
          .add(Q("td")
            .klass("rframe")
            .add(Q("span")
              .text("" + nlossesV[0]))
            .add(ui.img("losses")
              .style("vertical-align: middle")))
          .add(Q("td")
            .klass("rframe")
            .text(math.toIso(ratiosSumV[0] * 100 / arr.size(Cos), 2) + "%"))))
     ;
  };

  wg
    .removeAll()
    .add(clientResultsDiv)
    .add(Q("div").klass("separator2"))
    .add(Q("table")
      .att("align", "center")
      .klass("frame")
      .adds(arr.map(GrDivs, function(R)  {sys.$params(arguments.length, 1);  return Q("tr")
          .adds(arr.map(R, function(dv)  {sys.$params(arguments.length, 1);  return Q("td").add(dv);}))
        ;})))
    .add(modalBox.mkWg(mBox))
  ;

  mkCharts();
};


 function wait(div, co)  {sys.$params(arguments.length, 2); div
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center")
          .text(co)))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:center")
          .add(ui.img("wait.gif")))))
  ;};
