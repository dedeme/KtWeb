import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(Labels, Values)  {sys.$params(arguments.length, 2);
  const back = "#fafafa";

  const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.exArea.width = 610;
  Chart.exArea.height = 160;
  Chart.exArea.atts.border.width = 0;
  Chart.exArea.atts.background = back;
  Chart.inPadding.right = 6;
  Chart.inPadding.bottom = 12;
  Chart.inPadding.left = 85;
  Chart.chartPadding.top = 4;
  Chart.chartPadding.right = 4;
  Chart.chartPadding.bottom = 4;
  Chart.chartPadding.left = 4;
  Chart.inAtts.background = "#e9e9e9";

  const Atts = [
    lineChart.mkLine(1, "#000080", false),
    lineChart.mkLine(1, "#008000", false)
  ];

  const Data =sys.$checkNull( lineChart.mkData(Labels, Values, Atts));
  Data.UnarySets = [lineChart.mkUnarySet(
    II("Dif. 0"), 0, lineChart.mkLine(1, "#000000", false)
  )];
  Data.round = 2;
  Data.drawGrid = function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(Labels[i - 1] , lb);
  };
  Data.drawLabel =sys.$checkNull( Data.drawGrid);
  Data.maxMinRound = function(x, n)  {sys.$params(arguments.length, 2);   return -2;};

   return Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back)
        .add(lineChart.mkWg(Chart, Data))))
  ;
};
