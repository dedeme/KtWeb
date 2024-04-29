import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as oldChart from  "../../libdm/oldChart.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);








export  function mk(Labels, Values, isRebuy, withRef, ref)  {sys.$params(arguments.length, 5);
  const q =sys.$checkNull( arr.peek(Values[0])[0]);
  const back =sys.$checkNull( withRef > 0 && q > ref
    ? "#fff0f0"
    : withRef < 0 && q < ref
      ? "#f0f0ff"
      : "#f5f5f5")
  ;

  const Chart =sys.$checkNull( oldChart.mkExample());
  Chart.ExArea.width =sys.$checkExists(Chart.ExArea.width,sys.$checkNull( 305));
  Chart.ExArea.height =sys.$checkExists(Chart.ExArea.height,sys.$checkNull( 160));
  Chart.ExArea.Atts.Border.width =sys.$checkExists(Chart.ExArea.Atts.Border.width,sys.$checkNull( 0));
  Chart.InPadding.left =sys.$checkExists(Chart.InPadding.left,sys.$checkNull( 45));
  Chart.XAxis.fontSize =sys.$checkExists(Chart.XAxis.fontSize,sys.$checkNull( 10));
  Chart.YAxis.fontSize =sys.$checkExists(Chart.YAxis.fontSize,sys.$checkNull( 10));

  Chart.ExArea.Atts.background =sys.$checkExists(Chart.ExArea.Atts.background,sys.$checkNull( back));

  const Atts =sys.$checkNull( [
    oldChart.mkLine(1.2, isRebuy ? "#a9a9a9" : "#202020", false)
  ]);
  const Data =sys.$checkNull( oldChart.mkData(Labels, Values, Atts));
  Data.drawGrid =sys.$checkExists(Data.drawGrid, function(lb, i)  {sys.$params(arguments.length, 2);
    if (sys.$eq(i , 0))  return false;
     return sys.$neq(Labels[i - 1] , lb);
  });
  Data.drawLabel =sys.$checkExists(Data.drawLabel,sys.$checkNull( Data.drawGrid));
  Data.maxMinRound =sys.$checkExists(Data.maxMinRound, function(mx, mn)  {sys.$params(arguments.length, 2);
    if (mn > 10) {
      Data.round =sys.$checkExists(Data.round,sys.$checkNull( 2));
        return -2;
    } else if (mn > 1) {
      Data.round =sys.$checkExists(Data.round,sys.$checkNull( 3));
        return -3;
    } else {
      Data.round =sys.$checkExists(Data.round,sys.$checkNull( 4));
        return -4;
    }
  });
  if (withRef > 0)
    Data.UnarySets =sys.$checkExists(Data.UnarySets,sys.$checkNull( [
        oldChart.mkUnarySet(
          II("Reference"), ref,
          oldChart.mkLine(1.5, isRebuy ? "#a9a9a9" : "#00aaff", false
        ))
      ]));
  else if (withRef < 0)
    Data.UnarySets =sys.$checkExists(Data.UnarySets,sys.$checkNull( [
        oldChart.mkUnarySet(
          II("Reference"), ref,
          oldChart.mkLine(1.5, isRebuy ? "#a9a9a9" : "#ff8100", false
        ))
      ]));

   return Q("table")
    .att("align", "center")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame0")
        .style("background-color:" + back)
        .add(oldChart.mkWg(Chart, Data))))
  ;
};
