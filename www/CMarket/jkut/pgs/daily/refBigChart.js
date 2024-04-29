import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(Labels, Values)  {sys.$params(arguments.length, 2);
  const chart =sys.$checkNull( lineChart.mkExample());
  chart.exArea.width =sys.$checkExists(chart.exArea.width,sys.$checkNull( 305));
  chart.exArea.height =sys.$checkExists(chart.exArea.height,sys.$checkNull( 160));
  chart.exArea.atts.border.width =sys.$checkExists(chart.exArea.atts.border.width,sys.$checkNull( 0));
  chart.inPadding.left =sys.$checkExists(chart.inPadding.left,sys.$checkNull( 45));
  chart.xAxis.fontSize =sys.$checkExists(chart.xAxis.fontSize,sys.$checkNull( 10));
  chart.yAxis.fontSize =sys.$checkExists(chart.yAxis.fontSize,sys.$checkNull( 10));

  chart.exArea.atts.background =sys.$checkExists(chart.exArea.atts.background,sys.$checkNull( "#f5f5f5"));

  const Atts =sys.$checkNull( [
    lineChart.mkLine(1.2, "#ff8100", false),
    lineChart.mkLine(1.2, "#404040", false),
    lineChart.mkLine(1.2, "#00aaff", false)
  ]);
  const data =sys.$checkNull( lineChart.mkData(Labels, Values, Atts));
  data.drawGrid =sys.$checkExists(data.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(Labels[i - 1] , lb);
  });
  data.drawLabel =sys.$checkExists(data.drawLabel,sys.$checkNull( data.drawGrid));
  data.maxMinRound =sys.$checkExists(data.maxMinRound, function(mx, mn)  {sys.$params(arguments.length, 2);
    data.round =sys.$checkExists(data.round,sys.$checkNull( 0));
     return 0;
  });

   return Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + "#f5f5f5")
        .add(lineChart.mkWg(chart, data))))
  ;
};
