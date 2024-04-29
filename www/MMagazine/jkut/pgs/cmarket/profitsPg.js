import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as oldChart from  "../../libdm/oldChart.js";
import * as cts from  "../../data/cts.js";
import * as profitsEntry from  "../../data/profitsEntry.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const Rp =sys.$checkNull( await  client.send({
    prg: cts.appName,
    module: "CMarket",
    source: "ProfitsPg",
    rq: "idata"
  }));
  const Profits =sys.$checkNull( arr.map(Rp.profits, profitsEntry.fromJs));

  if (!sys.asBool(Profits)) {
    arr.push(Profits, profitsEntry.mk(
      time.toStr(time.mkDate(1, 1, time.year(time.now()))), 0
    ));
  }

  if (sys.$eq(arr.size(Profits) , 1)) arr.push(Profits, Profits[0]);

  

  
   function caption()  {sys.$params(arguments.length, 0);
     return Q("table")
      .klass("frame")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("width:30px")
          .add(ui.led(cts.ToSellColors[0], 6)))
        .add(Q("td")
          .style("vertical-align: middle")
          .text(II("Investor"))))
    ;};

  
  const Labels =sys.$checkNull( []);
  
  const Sets =sys.$checkNull( [[]]);
  for (const E  of sys.$forObject( Profits)) {
    arr.push(Labels, sys.$slice(E.date,6,null) + "/" + sys.$slice(E.date,4,6));
    arr.push(Sets[0], [E.profits]);
  }
  const SetAtts =sys.$checkNull( [oldChart.mkLineExample()]);
  SetAtts[0].color =sys.$checkExists(SetAtts[0].color,sys.$checkNull( cts.ToSellColors[0]));
  const Chart =sys.$checkNull( oldChart.mkExample());
  Chart.ExArea.width =sys.$checkExists(Chart.ExArea.width,sys.$checkNull( 600));
  Chart.ExArea.height =sys.$checkExists(Chart.ExArea.height,sys.$checkNull( 400));
  Chart.InPadding =sys.$checkExists(Chart.InPadding,sys.$checkNull( oldChart.mkPadding(25, 25, 30, 100)));

  const Data =sys.$checkNull( oldChart.mkData(Labels, Sets, SetAtts));
  const lenGroup =sys.$checkNull( math.toInt(arr.size(Labels) / 10) + 1);
  Data.drawLabel =sys.$checkExists(Data.drawLabel, function(l, i)  {sys.$params(arguments.length, 2);  return i > 0 && sys.$eq(i % lenGroup , 0);});
  Data.drawGrid =sys.$checkExists(Data.drawGrid, function(l, i)  {sys.$params(arguments.length, 2);
     return i > 0 && sys.$eq(i % lenGroup , 0) && i < arr.size(Labels) - 1;});

  wg
    .removeAll()
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .add(caption())))
        .add(Q("tr")
          .add(Q("td")
            .add(oldChart.mkWg(Chart, Data)))))
  ;
};
