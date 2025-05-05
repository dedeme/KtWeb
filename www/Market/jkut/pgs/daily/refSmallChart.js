import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);






export  function mk(Labels, Values, inPortfolio, isRebuy)  {sys.$params(arguments.length, 4);
  const q =sys.$checkNull( arr.peek(Values[0])[0]);
  const back =sys.$checkNull( q < 0
    ? inPortfolio
      ? "#f0f0ff"
      : "#fff0f0"
    : "#f5f5f5")
  ;
  const line =sys.$checkNull( inPortfolio
    ? "#ff8100"
    : isRebuy
      ? "aaaaaa"
      : "#00aaff")
  ;

  const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.exArea.width = 140;
  Chart.exArea.height = 70;
  Chart.exArea.atts.border.width = 0;
  Chart.inPadding.left = 32;
  Chart.inPadding.right = 5;
  Chart.inPadding.bottom = 5;
  Chart.labels.show = false;
  Chart.xAxis.fontSize = 0;
  Chart.yAxis.fontSize = 10;
  Chart.yAxis.parts = 1;

  Chart.exArea.atts.background = back;

  const Atts = [
    lineChart.mkLine(1.2, line, false)
  ];
  const Data =sys.$checkNull( lineChart.mkData(Labels, Values, Atts));
  Data.drawGrid = function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
    if (sys.$eq(i , 1))  return true;
     return sys.$neq(Labels[i - 1] , lb);
  };
  Data.drawLabel = function(lb, i)  {sys.$params(arguments.length, 2);  return false;};
  Data.maxMinRound = function(mx, mn)  {sys.$params(arguments.length, 2);
    Data.round = 0;
     return 0;
  };

   return Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back)
        .add(lineChart.mkWg(Chart, Data))))
  ;

};
