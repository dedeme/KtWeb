import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as lineChart from  "../../libdm/lineChart.js";
import * as cts from  "../../cts.js";
import * as profitsEntry from  "../../data/profitsEntry.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  
  
  const {initialAssets,  Profits,  Ibex}
  = await  client.send({
    prg: cts.appName,
    module: "Market",
    source: "PercentsPg",
    rq: "idata"
  });

  const pfColor = "#000000";
  const ibexColor = "#800000";

  if (!sys.asBool(Profits)) {
    arr.push(Profits,profitsEntry.mk(
      time.toStr(time.mkDate(31, 12, time.year(time.now()) - 1)), [0, 0, 0]
    ));
    arr.push(Ibex,["000000", 0]);
  }
  if (sys.$eq(arr.size(Profits) , 1)) {
    arr.push(Profits,Profits[0]);
    arr.push(Ibex,Ibex[0]);
  }

   const Ibexdts =sys.$checkNull( arr.map(Ibex,function(E)  {sys.$params(arguments.length, 1);  return E[0];}));
  const base =sys.$checkNull( Ibex[0][1]);
   const Ibexrts =sys.$checkNull( arr.map(Ibex,function(E)  {sys.$params(arguments.length, 1);  return (E[1] - base) / base;}));

  

  
   function badData()  {sys.$params(arguments.length, 0);
    wg
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .klass("frame")
            .text(II("Dates of profits and ibex does not match"))))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align: center;width:50%")
            .klass("border")
            .text(II("Profits")))
          .add(Q("td")
            .style("text-align: center")
            .klass("border")
            .text(II("Ibex"))))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:center; vertical-align:top")
            .html("<tt>" +
                arr.join(arr.map(Profits,function( p)  {sys.$params(arguments.length, 1);  return p[profitsEntry.date];}), "<br>") +
                "<tt>"
              ))
          .add(Q("td")
            .style("text-align:center; vertical-align:top")
            .html("<tt>" +
                arr.join(Ibexdts, "<br>") +
                "<tt>"
              ))))
  ;};

  
   function caption()  {sys.$params(arguments.length, 0);
     return Q("table")
      .klass("frame")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("width:30px")
          .add(ui.led(ibexColor, 6)))
        .add(Q("td")
          .style("vertical-align: middle;text-align:left;")
          .text("ibex")))
      .add(Q("tr")
        .add(Q("td")
          .style("width:30px")
          .add(ui.led(pfColor, 6)))
        .add(Q("td")
          .style("vertical-align: middle;text-align:left;")
          .text(II("Investor"))))
  ;};

  
   function caption2()  {sys.$params(arguments.length, 0);
     return Q("table")
      .klass("frame")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("width:30px")
          .add(ui.led(pfColor, 6)))
        .add(Q("td")
          .style("vertical-align: middle;text-align:left;")
          .text(II("Investors - Ibex"))))
  ;};

  if (sys.$neq(arr.map(Profits,function( p)  {sys.$params(arguments.length, 1);  return p[profitsEntry.date];}) , Ibexdts)) {
    badData();
    return;
  }

  
  const Sets = [];
  
  const Difs = [];
  
  const Labels = [];
  const initialPfs =sys.$checkNull( Profits[0][profitsEntry.profits]);
  for (const  e  of sys.$forObject( Profits)) {
    arr.push(Labels,sys.$slice(e[profitsEntry.date],6,null) + "/" + sys.$slice(e[profitsEntry.date],4,6));
    const pfs =sys.$checkNull( e[profitsEntry.profits]);
    const dif = (pfs - initialPfs) * 100 / initialAssets;
    arr.push(Difs,[dif]);
  }
  arr.push(Sets,arr.map(Ibexrts,function(v)  {sys.$params(arguments.length, 1);  return [v * 100];}));
  arr.push(Sets,Difs);

  
  const SetAtts = [];
  const IbexAtts =sys.$checkNull( lineChart.mkLineExample());
  IbexAtts.color =sys.$checkExists(IbexAtts.color, ibexColor);
  IbexAtts.width =sys.$checkExists(IbexAtts.width, 3);
  arr.push(SetAtts,IbexAtts);
  const PfAtts =sys.$checkNull( lineChart.mkLineExample());
  PfAtts.color =sys.$checkExists(PfAtts.color, pfColor);
  PfAtts.width =sys.$checkExists(PfAtts.width, 3);
  arr.push(SetAtts,PfAtts);

  const Data =sys.$checkNull( lineChart.mkData(Labels, Sets, SetAtts));
  const lenGroup = math.toInt(arr.size(Labels) / 10) + 1;
  Data.drawLabel =sys.$checkExists(Data.drawLabel, function(l, i)  {sys.$params(arguments.length, 2);  return i > 0 && sys.$eq(i % lenGroup , 0);});
  Data.drawGrid =sys.$checkExists(Data.drawGrid, function(l, i)  {sys.$params(arguments.length, 2);
     return i > 0 && sys.$eq(i % lenGroup , 0) && i < arr.size(Labels) - 1;});

  const Chart =sys.$checkNull( lineChart.mkExample());
  Chart.exArea.width =sys.$checkExists(Chart.exArea.width, 600);
  Chart.exArea.height =sys.$checkExists(Chart.exArea.height, 400);
  Chart.inPadding =sys.$checkExists(Chart.inPadding,sys.$checkNull( lineChart.mkPadding(25, 25, 30, 100)));

  const Data2 =sys.$checkNull( lineChart.mkData(
    Labels,
    [arr.fromIter(iter.map(iter.$range(0,arr.size(Difs)), function(i)  {sys.$params(arguments.length, 1);
        const difOp =sys.$checkNull( Difs[i]);
         return !sys.asBool(difOp) ? [] : [difOp[0] - Ibexrts[i] * 100];
      }))
    ],
    [PfAtts]
  ));
  Data2.drawLabel =sys.$checkExists(Data2.drawLabel,sys.$checkNull( Data.drawLabel));
  Data2.drawGrid =sys.$checkExists(Data2.drawGrid,sys.$checkNull( Data.drawGrid));

  const Chart2 =sys.$checkNull( lineChart.mkExample());
  Chart2.exArea.width =sys.$checkExists(Chart2.exArea.width, 600);
  Chart2.exArea.height =sys.$checkExists(Chart2.exArea.height, 200);
  Chart2.inPadding =sys.$checkExists(Chart2.inPadding,sys.$checkNull( lineChart.mkPadding(25, 25, 30, 100)));

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .add(caption())))
      .add(Q("tr")
        .add(Q("td")
          .style("width:5px;")
          .text("%"))
        .add(Q("td")
          .add(lineChart.mkWg(Chart, Data))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", "2")
          .style("height:15px")
          .text(" ")))
      .add(Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .add(caption2())))
      .add(Q("tr")
        .add(Q("td")
          .style("width:5px;")
          .text("%"))
        .add(Q("td")
          .add(lineChart.mkWg(Chart2, Data2))))
      )
  ;
};
