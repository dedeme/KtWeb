import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);






export  function mk(Labels, Values, inPortfolio)  {sys.$params(arguments.length, 3);
  const q =sys.$checkNull( arr.peek(Values[0])[0]);
  const back =sys.$checkNull( q < 0
    ? inPortfolio
      ? "#f0f0ff"
      : "#fff0f0"
    : "#f5f5f5")
  ;
  const line =sys.$checkNull( inPortfolio ? "#ff8100" : "#00aaff");

  const chart =sys.$checkNull( lineChart.mkExample());
  chart.exArea.width =sys.$checkExists(chart.exArea.width,sys.$checkNull( 140));
  chart.exArea.height =sys.$checkExists(chart.exArea.height,sys.$checkNull( 70));
  chart.exArea.atts.border.width =sys.$checkExists(chart.exArea.atts.border.width,sys.$checkNull( 0));
  chart.inPadding.left =sys.$checkExists(chart.inPadding.left,sys.$checkNull( 32));
  chart.inPadding.right =sys.$checkExists(chart.inPadding.right,sys.$checkNull( 5));
  chart.inPadding.bottom =sys.$checkExists(chart.inPadding.bottom,sys.$checkNull( 5));
  chart.labels.show =sys.$checkExists(chart.labels.show,sys.$checkNull( false));
  chart.xAxis.fontSize =sys.$checkExists(chart.xAxis.fontSize,sys.$checkNull( 0));
  chart.yAxis.fontSize =sys.$checkExists(chart.yAxis.fontSize,sys.$checkNull( 10));
  chart.yAxis.parts =sys.$checkExists(chart.yAxis.parts,sys.$checkNull( 1));

  chart.exArea.atts.background =sys.$checkExists(chart.exArea.atts.background,sys.$checkNull( back));

  const Atts =sys.$checkNull( [
    lineChart.mkLine(1.2, line, false)
  ]);
  const data =sys.$checkNull( lineChart.mkData(Labels, Values, Atts));
  data.drawGrid =sys.$checkExists(data.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
    if (sys.$eq(i , 1))  return true;
     return sys.$neq(Labels[i - 1] , lb);
  });
  data.drawLabel =sys.$checkExists(data.drawLabel, function(lb, i)  {sys.$params(arguments.length, 2);  return false;});
  data.maxMinRound =sys.$checkExists(data.maxMinRound, function(mx, mn)  {sys.$params(arguments.length, 2);
    data.round =sys.$checkExists(data.round,sys.$checkNull( 0));
     return 0;
  });

   return Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back)
        .add(lineChart.mkWg(chart, data))))
  ;

};
