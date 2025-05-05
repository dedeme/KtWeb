import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as lineChart from  "../../libdm/lineChart.js";

const Q =sys.$checkNull( ui.q);


export  function mk(Labels, Values)  {sys.$params(arguments.length, 2);
  const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.exArea.width = 610;
  Chart.exArea.height = 320;
  Chart.exArea.atts.border.width = 0;
  Chart.inPadding.top = 10;
  Chart.inPadding.right = 10;
  Chart.inPadding.bottom = 20;
  Chart.inPadding.left = 85;
  Chart.chartPadding.top = 18;
  Chart.chartPadding.right = 4;
  Chart.chartPadding.bottom = 18;
  Chart.chartPadding.left = 4;

  const dif = arr.peek(Values[0])[0] - Values[0][0];
  const back =sys.$checkNull( dif > 0
    ? "#e9e9f2"
    : dif < 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background = back;

  const Atts = [
    lineChart.mkLine(1.2, "#414141", false)
  ];
  const Data =sys.$checkNull( lineChart.mkData(Labels, Values, Atts));
  Data.round = 0;
  Data.drawGrid = function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(Labels[i - 1] , lb);
  };
  Data.drawLabel =sys.$checkNull( Data.drawGrid);

   return Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back)
        .add(lineChart.mkWg(Chart, Data))))
  ;
};
