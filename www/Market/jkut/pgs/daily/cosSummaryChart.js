import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as lineChart from  "../../libdm/lineChart.js";

const Q =sys.$checkNull( ui.q);


export  function mk(Labels, Values)  {sys.$params(arguments.length, 2);
   const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.exArea.width =sys.$checkExists(Chart.exArea.width,sys.$checkNull( 610));
  Chart.exArea.height =sys.$checkExists(Chart.exArea.height,sys.$checkNull( 320));
  Chart.exArea.atts.border.width =sys.$checkExists(Chart.exArea.atts.border.width,sys.$checkNull( 0));
  Chart.inPadding.top =sys.$checkExists(Chart.inPadding.top,sys.$checkNull( 10));
  Chart.inPadding.right =sys.$checkExists(Chart.inPadding.right,sys.$checkNull( 10));
  Chart.inPadding.bottom =sys.$checkExists(Chart.inPadding.bottom,sys.$checkNull( 20));
  Chart.inPadding.left =sys.$checkExists(Chart.inPadding.left,sys.$checkNull( 85));
  Chart.chartPadding.top =sys.$checkExists(Chart.chartPadding.top,sys.$checkNull( 18));
  Chart.chartPadding.right =sys.$checkExists(Chart.chartPadding.right,sys.$checkNull( 4));
  Chart.chartPadding.bottom =sys.$checkExists(Chart.chartPadding.bottom,sys.$checkNull( 18));
  Chart.chartPadding.left =sys.$checkExists(Chart.chartPadding.left,sys.$checkNull( 4));

  const dif =sys.$checkNull( arr.peek(Values[0])[0] - Values[0][0]);
  const back =sys.$checkNull( dif > 0
    ? "#e9e9f2"
    : dif < 0
      ? "#f2e9e9"
      : "#e9e9e9")
    ;
  Chart.exArea.atts.background =sys.$checkExists(Chart.exArea.atts.background,sys.$checkNull( back));

  const Atts =sys.$checkNull( [
    lineChart.mkLine(1.2, "#414141", false)
  ]);
   const Data =sys.$checkNull( lineChart.mkData(Labels, Values, Atts));
  Data.round =sys.$checkExists(Data.round,sys.$checkNull( 0));
  Data.drawGrid =sys.$checkExists(Data.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(Labels[i - 1] , lb);
  });
  Data.drawLabel =sys.$checkExists(Data.drawLabel,sys.$checkNull( Data.drawGrid));

   return Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back)
        .add(lineChart.mkWg(Chart, Data))))
  ;
};
