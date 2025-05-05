import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as clock from  "../libdm/clock.js";
import * as cts from  "../cts.js";
import * as alarm from  "../data/alarm.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const {Alarms, dbKey} = await  client.send({
    prg: cts.appName,
    source: "Home",
    rq: "idata"
  });
  arr.sort(Alarms,function( a1,  a2)  {sys.$params(arguments.length, 2);  return a1[alarm.tm] < a2[alarm.tm];});

   const clk =sys.$checkNull( clock.mk());
  const butonSpan =sys.$checkNull( Q("span"));
  const entry =sys.$checkNull( ui.field("_accept")
    .style("width:50px"))
  ;
  const accept =sys.$checkNull( Q("button")
    .att("id", "_accept")
    .text(II("Add")))
  ;
  const dclockDiv =sys.$checkNull( Q("div")
    .klass("frame")
    .style("text-align:center"))
  ;
  clock.setFn(clk,function(tm)  {sys.$params(arguments.length, 1); dclockDiv.text(time.fmt(tm, "%t"));});

  

  
   async  function add(t)  {sys.$params(arguments.length, 1);
    
     function badFormat()  {sys.$params(arguments.length, 0);
      const or =sys.$checkNull( II("or"));
       return II("Bad Format. Use") + ":\n"+
        "  HH,MM " + or + " HH.MM " + or + " HH:MM"
      ;
    };

    const sep =sys.$checkNull( t.includes(",")
      ? ","
      : t.includes(".")
        ? "."
        : t.includes(":")
          ? ":"
          : "");
    if (sys.$eq(sep , "")) {
      ui.alert(II("Separator is missing"));
      return;
    }

     const Parts =sys.$checkNull( t.split(sep));
    if (sys.$neq(arr.size(Parts) , 2)) {
      ui.alert(badFormat());
      return;
    }
    const hOp =sys.$checkNull( math.fromStr(Parts[0]));
    const ms =sys.$checkNull( sys.$eq(Parts[1].length , 1) ? "0" + Parts[1] : Parts[1]);
    const mOp =sys.$checkNull( math.fromStr(ms));
    if (!sys.asBool(hOp) || !sys.asBool(mOp)) {
      ui.alert(badFormat());
      return;
    }
    const h =sys.$checkNull( hOp[0]);
    const m =sys.$checkNull( mOp[0]);
    if (h < 0 || h > 23) {
      ui.alert(II("Hour out of range"));
      return;
    }
    if (m < 0 || m > 59) {
      ui.alert(II("Minutes out of range"));
      return;
    }

     const tm =sys.$checkNull( time.now());
    const hnow =sys.$checkNull( time.hour(tm));
    const mnow =sys.$checkNull( time.minute(tm));

     const dayAlarm =sys.$checkNull( h > hnow || (sys.$eq(hnow , h) && m > mnow)
      ? tm
      : time.addDays(tm,1))
    ;

    butonSpan.removeAll().add(ui.img("wait.gif"));
    const {isDup} = await  client.send({
      prg: cts.appName,
      source: "Home",
      rq: "add",
      dbKey:dbKey,
      key: cryp.genK(6) + ":" + tm,
      tm: time.mk(
          time.day(dayAlarm), time.month(dayAlarm), time.year(dayAlarm),
          h, m, 0
        )
    });

    if (isDup) ui.alert(II("Duplicated alarm"));
    window.location.reload(true);
  };

  
   async  function del( a)  {sys.$params(arguments.length, 1);
    if (ui.confirm(II("Remove the alarm") + " '" + alarm.timeToStr(a) + "'")) {
      await client.send({
        prg: cts.appName,
        source: "Home",
        rq: "del",
        dbKey:dbKey,
        alarm: a
      });
      mk(wg);
    }
  };

  

  accept.on("click", function(e)  {sys.$params(arguments.length, 1); add(entry.getValue());});

  const trs =sys.$checkNull( arr.map(Alarms,function( a)  {sys.$params(arguments.length, 1);  return Q("tr")
      .add(Q("td")
        .att("colspan", 2)
        .klass("frame")
        .style("text-align: right")
        .text(alarm.timeToStr(a)))
      .add(Q("td")
        .style("Text-align: left")
        .add(ui.link(function(e)  {sys.$params(arguments.length, 1); del(a);})
          .add(ui.img("delete"))))
    ;}));

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 3)
          .add(Q("div")
            .klass("head")
            .text(II("New Alarm")))))
      .add(Q("tr")
        .add(Q("td")
          .att("rowspan", 2)
          .add(clock.mkWg(clk)))
        .add(Q("td")
          .add(entry))
        .add(Q("td")
          .add(butonSpan
            .add(accept))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .add(dclockDiv)))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 3)
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 3)
          .add(Q("div")
            .klass("head")
            .text(II("Programmed Alarms")))))
      .adds(!sys.asBool(Alarms)
          ? [Q("tr")
              .add(Q("td")
                .klass("frame")
                .att("colspan", 3)
                .style("text-align:center")
                .text(II("Without Alarms")))
            ]
          : trs
        ))
  ;

  entry.e.focus();
};
