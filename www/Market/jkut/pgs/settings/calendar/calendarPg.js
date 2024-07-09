import * as math from '../../../_js/math.js';import * as js from '../../../_js/js.js';import * as arr from '../../../_js/arr.js';import * as client from '../../../_js/client.js';import * as bytes from '../../../_js/bytes.js';import * as str from '../../../_js/str.js';import * as ui from '../../../_js/ui.js';import * as dic from '../../../_js/dic.js';import * as timer from '../../../_js/timer.js';import * as time from '../../../_js/time.js';import * as storage from '../../../_js/storage.js';import * as b64 from '../../../_js/b64.js';import * as sys from '../../../_js/sys.js';import * as iter from '../../../_js/iter.js';import * as domo from '../../../_js/domo.js';import * as cryp from '../../../_js/cryp.js';




import * as datePicker from  "../../../libdm/datePicker.js";
import * as calendar from  "../../../data/calendar/calendar.js";
import * as timetable from  "../../../data/calendar/timetable.js";
import * as mktDay from  "../../../data/calendar/mktDay.js";
import * as msg from  "../../../wgs/msg.js";
import * as hourWg from  "../../../pgs/settings/calendar/hourWg.js";
import * as cts from  "../../../cts.js";
import * as fns from  "../../../fns.js";
import * as global from  "../../../global.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const {dbKey,  cal} = await  client.send({
    prg: cts.appName,
    module: "Settings",
    source: "CalendarPg",
    rq: "idata"
  });
  global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);

  const generalDiv =sys.$checkNull( Q("div").style("padding-bottom:15px"));
  const holidaysDiv =sys.$checkNull( Q("div"));
  const specialDaysDiv =sys.$checkNull( Q("div"));

  const openGroupV = [[]];
  const closeGroupV = [[]];

  

  
   async  function generalChange()  {sys.$params(arguments.length, 0);
     const og =sys.$checkNull( openGroupV[0]);
     const cg =sys.$checkNull( closeGroupV[0]);
    const tt =sys.$checkNull( timetable.mk(hourWg.hour(og), hourWg.minute(og), hourWg.hour(cg), hourWg.minute(cg)));
     const {dbKey} = await  client.send({
      prg: cts.appName,
      module: "Settings",
      source: "CalendarPg",
      rq: "setGeneral",
      dbKey: global.dbKeyV[0],
      tt:tt
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
  };

  
   async  function holidaysChange(Hs)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      module: "Settings",
      source: "CalendarPg",
      rq: "setHolidays",
      dbKey: global.dbKeyV[0],
      Holidays: Hs
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);
    mk(wg);
  };

  
   async  function specialDaysChange(Ls)  {sys.$params(arguments.length, 1);
    await client.send({
      prg: cts.appName,
      module: "Settings",
      source: "CalendarPg",
      rq: "setSpecialDays",
      dbKey: global.dbKeyV[0],
      SpecialDays: Ls
    });
    mk(wg);
  };

  
   function addHoliday( Hs, d)  {sys.$params(arguments.length, 2);
    const now =sys.$checkNull( time.toStr(time.now()));
    if (d < now) {
      msg.error(II("Date before today"), function()  {sys.$params(arguments.length, 0);});
      return;
    }
    if (arr.any(Hs,function(e)  {sys.$params(arguments.length, 1);  return sys.$eq(e , d);})) {
      msg.error(i18n.fmt(II("Date '%0' is duplicated"), [d]), function()  {sys.$params(arguments.length, 0);});
      return;
    }
    arr.push(Hs,d);
    holidaysChange(Hs);
  };

  
   function delHoliday( Ls, d)  {sys.$params(arguments.length, 2);
    if (ui.confirm(i18n.fmt(II("Delete '%0'?"), [d])))
      holidaysChange(arr.filter(Ls,function(e)  {sys.$params(arguments.length, 1);  return sys.$neq(e , d);}));
  };

  
   function addSpecialDay( Ls, d, hopen, mopen, hclose, mclose)  {sys.$params(arguments.length, 6);
    const now =sys.$checkNull( time.toStr(time.now()));
    if (d < now) {
      msg.error(II("Date before today"), function()  {sys.$params(arguments.length, 0);});
      return;
    }
    if (arr.any(Ls,function( s)  {sys.$params(arguments.length, 1);  return sys.$eq(s[mktDay.date] , d);})) {
      msg.error(i18n.fmt(II("Date '%0' is duplicated"), [d]), function()  {sys.$params(arguments.length, 0);});
      return;
    }
    arr.push(Ls,mktDay.mk(d, hopen, mopen, hclose, mclose));
    specialDaysChange(Ls);
  };

  
   function delSpecialDay( Ls, d)  {sys.$params(arguments.length, 2);
    if (ui.confirm(i18n.fmt(II("Delete '%0'?"), [d]))) {
      specialDaysChange(arr.filter(Ls,function( s)  {sys.$params(arguments.length, 1);  return sys.$neq(s[mktDay.date] , d);}));
    }
  };

  

   const gral =sys.$checkNull( cal[calendar.general]);
  const openGroup =sys.$checkNull( hourWg.mk(gral[timetable.hopen], gral[timetable.mopen], generalChange));
  const closeGroup =sys.$checkNull( hourWg.mk(gral[timetable.hclose], gral[timetable.mclose], generalChange));
  openGroupV[0] =sys.$checkExists(openGroupV[0], openGroup);
  closeGroupV[0] =sys.$checkExists(closeGroupV[0], closeGroup);

  
   function generalWg()  {sys.$params(arguments.length, 0); generalDiv
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .klass("frame")
        .add(Q("tr")
          .add(Q("td")
            .klass("head")
            .text(II("Open")))
          .add(Q("td")
            .klass("head")
            .text(II("CloseN"))))
        .add(Q("tr")
          .add(Q("td").style("padding:0px")
            .add(Q("hr")))
          .add(Q("td").style("padding:0px")
            .add(Q("hr"))))
        .add(Q("tr")
          .add(Q("td")
            .add(hourWg.wg(openGroup).klass("frame")))
          .add(Q("td")
            .add(hourWg.wg(closeGroup).klass("frame")))))
    ;};

  
   function holidaysWg()  {sys.$params(arguments.length, 0);
    const Hs =sys.$checkNull( arr.copy(cal[calendar.Holidays]));
    arr.sort(Hs,function(e1, e2)  {sys.$params(arguments.length, 2);  return e1 < e2;});

    
     function list()  {sys.$params(arguments.length, 0);  return !sys.asBool(Hs)
      ? [ Q("tr")
          .add(Q("td"))
          .add(Q("td")
            .add(Q("table")
              .att("align", "center")
              .klass("frame4")
              .add(Q("tr")
                .add(Q("td")
                  .html(II("Without dates"))))))
        ]
      : arr.map(Hs,function(d)  {sys.$params(arguments.length, 1);  return Q("tr")
          .add(Q("td")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); delHoliday(Hs, d);})
              .add(ui.img("minus"))))
          .add(Q("td")
            .style("text-align:center")
            .text(sys.$eq(i18n.getLang() , "es")
                ? time.toIso(time.fromStr(d)[0])
                : time.toEn(time.fromStr(d)[0])))
        ;})
      ;};

    const dpInput =sys.$checkNull( Q("input")
      .att("type", "text")
      .style("text-align:center;width:166px"))
    ;
    const dp =sys.$checkNull( datePicker.mk(
      sys.$eq(i18n.getLang() , "es"),
      time.now(),
      function(d)  {sys.$params(arguments.length, 1); if (sys.$eq(d , "")) {
          const dt =sys.$checkNull( time.now());
          dp.setDate(dt);
          dpInput.value(sys.$eq(i18n.getLang() , "es")
            ? time.toIso(time.fromStr(dt)[0])
            : time.toEn(time.fromStr(dt)[0])
          );
        }}
    ));

    holidaysDiv
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .klass("frame")
        .add(Q("tr")
          .add(Q("td")
            .add(ui.link(
                function(e)  {sys.$params(arguments.length, 1); addHoliday(Hs, time.toStr(datePicker.getDate(dp)[0]));}
              ).add(ui.img("plus"))))
          .add(Q("td")
            .add(datePicker.mkText(dp,dpInput))))
        .add(Q("tr")
          .add(Q("td").att("colspan", 2)
            .add(Q("hr"))))
        .adds(list()))
    ;
  };

  
   function specialDaysWg()  {sys.$params(arguments.length, 0);
    const Ss =sys.$checkNull( arr.copy(cal[calendar.SpecialDays]));
    arr.sort(Ss,function( s1,  s2)  {sys.$params(arguments.length, 2);  return s1[mktDay.date] < s2[mktDay.date];});

  
     function list()  {sys.$params(arguments.length, 0);  return !sys.asBool(Ss)
      ? [ Q("tr")
          .add(Q("td"))
          .add(Q("td")
            .add(Q("table")
              .att("align", "center")
              .klass("frame4")
              .add(Q("tr")
                .add(Q("td")
                  .html(II("Without dates"))))))
          .add(Q("td"))
          .add(Q("td"))
        ]
      : arr.map(Ss,function( s)  {sys.$params(arguments.length, 1);  return Q("tr")
          .add(Q("td")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); delSpecialDay(Ss, s[mktDay.date]);})
              .add(ui.img("minus"))))
          .add(Q("td")
            .style("text-align:center")
            .text(sys.$eq(i18n.getLang() , "es")
                ? time.toIso(time.fromStr(s[mktDay.date])[0])
                : time.toEn(time.fromStr(s[mktDay.date])[0])))
          .add(Q("td")
            .style("text-align:center")
            .text(fns.format00(s[mktDay.hopen]) + ":" + fns.format00(s[mktDay.mopen])))
          .add(Q("td")
            .style("text-align:center")
            .text(fns.format00(s[mktDay.hclose]) + ":" + fns.format00(s[mktDay.mclose])))
        ;})
      ;};

    const dpInput =sys.$checkNull( Q("input")
      .att("type", "text")
      .style("text-align:center;width:166px"))
    ;
    const dp =sys.$checkNull( datePicker.mk(
      sys.$eq(i18n.getLang() , "es"),
      time.now(),
      function(d)  {sys.$params(arguments.length, 1); if (sys.$eq(d , "")) {
          const dt =sys.$checkNull( time.now());
          dp.setDate(dt);
          dpInput.value(sys.$eq(i18n.getLang() , "es")
            ? time.toIso(time.fromStr(dt)[0])
            : time.toEn(time.fromStr(dt)[0])
          );
        }}
    ));

    const open =sys.$checkNull( hourWg.mk(hourWg.hour(openGroup), hourWg.minute(openGroup), function()  {sys.$params(arguments.length, 0);}));
    const close =sys.$checkNull( hourWg.mk(hourWg.hour(closeGroup), hourWg.minute(closeGroup), function()  {sys.$params(arguments.length, 0);}));
    specialDaysDiv
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .klass("frame")
        .add(Q("tr")
          .add(Q("td")
            .add(ui.link(function(ev)  {sys.$params(arguments.length, 1);
              addSpecialDay(
                Ss, time.toStr(datePicker.getDate(dp)[0]),
                hourWg.hour(open), hourWg.minute(open),
                hourWg.hour(close), hourWg.minute(close)
              );
            }).add(ui.img("plus"))))
          .add(Q("td")
            .add(datePicker.mkText(dp,dpInput)))
          .add(Q("td")
            .add(hourWg.wg(open).klass("frame")))
          .add(Q("td")
            .add(hourWg.wg(close).klass("frame"))))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 4).add(Q("hr"))))
        .add(Q("tr")
          .add(Q("td"))
          .add(Q("td")
            .klass("head")
            .text(II("Date")))
          .add(Q("td")
            .klass("head")
            .text(II("Open")))
          .add(Q("td")
            .klass("head")
            .text(II("CloseN"))))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 4)
            .add(Q("hr"))))
        .adds(list()))
    ;
  };

  generalWg();
  holidaysWg();
  specialDaysWg();

  wg
    .removeAll()
    .add(Q("div")
      .style("text-align:center")
      .add(Q("div")
        .klass("head")
        .text(II("Calendar")))
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .add(ui.hrule(II("General Time Table"), 50))))
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .add(generalDiv)))
        .add(Q("tr")
          .add(Q("td")
            .style("width:50%;vertical-align:top")
            .add(ui.hrule(II("Holidays"), 50))
            .add(holidaysDiv))
          .add(Q("td")
            .style("width:50%;vertical-align:top")
            .add(ui.hrule(II("Special days"), 50))
            .add(specialDaysDiv)))))
  ;
};
