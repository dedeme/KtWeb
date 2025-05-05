import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




const Q =sys.$checkNull( ui.q);















export function mk0 (isEs,date,fn,dateView,floating,elMonth,elYear,elDays,exTr,tr4,tb) { sys.$params(arguments.length, 11); return [ isEs, date, fn, dateView, floating, elMonth, elYear, elDays, exTr, tr4, tb];}export const isEs = 0;export const date = 1;export const fn = 2;export const dateView = 3;export const floating = 4;export const elMonth = 5;export const elYear = 6;export const elDays = 7;export const exTr = 8;export const tr4 = 9;export const tb = 10;








export  function mk(isEs, date, fn)  {sys.$params(arguments.length, 3);  return mk0(
    isEs, [date], fn,
    time.mkDate(1, time.month(date), time.year(date)), 
    false, 
    Q("span"), 
    Q("span"), 
    [], 
    Q("tr"), 
    Q("tr"), 
    Q("table") 
  );};



export  function getDate(dp)  {sys.$params(arguments.length, 1);  return dp[date];};




export  function setDate(dp, newDate)  {sys.$params(arguments.length, 2);
  dp[date] =sys.$checkExists(dp[date], [newDate]);
  dp[dateView] =sys.$checkExists(dp[dateView],sys.$checkNull( time.mkDate(1, time.month(newDate), time.year(newDate))));
};


 function months(dp)  {sys.$params(arguments.length, 1);  return dp[isEs]
    ? ["ene", "feb", "mar", "abr", "may", "jun", "jul",
      "ago", "sep", "oct", "nov", "dic"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec"]
  ;};


 function weekDays(dp)  {sys.$params(arguments.length, 1);  return dp[isEs]
    ? ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  ;};


 function i18n(dp)  {sys.$params(arguments.length, 1);  return dp[isEs]
    ? {firstWeekDay: 1, today: "Hoy", none: "Nada"}
    : {firstWeekDay: 0, today: "Today", none: "None"}
  ;};


 function load(dp)  {sys.$params(arguments.length, 1);
  dp[elMonth].html(months(dp)[time.month(dp[dateView]) - 1]);
  dp[elYear].html("" + time.year(dp[dateView]));

  const ix0 = time.weekday(dp[dateView]) - i18n(dp).firstWeekDay;
  const ix =sys.$checkNull( ix0 < 0 ? 7 + ix0 : ix0);
  const month =sys.$checkNull( time.month(dp[dateView]));
  const Date1 = [time.mkDate(time.day(dp[dateView]) - ix, month, time.year(dp[dateView]))];

  const today =sys.$checkNull( time.now());
  const tyear =sys.$checkNull( time.year(today));
  const tmonth =sys.$checkNull( time.month(today));
  const tday =sys.$checkNull( time.day(today));

  const Dyear = [tyear];
  const Dmonth = [tmonth];
  const Dday = [tday];

  if (!sys.asBool(!sys.asBool(dp[date]))) {
    Dyear[0] =sys.$checkExists(Dyear[0],sys.$checkNull( time.year(dp[date][0])));
    Dmonth[0] =sys.$checkExists(Dmonth[0],sys.$checkNull( time.month(dp[date][0])));
    Dday[0] =sys.$checkExists(Dday[0],sys.$checkNull( time.day(dp[date][0])));
  }

  const ExtraRow = [false];
  iter.each(iter.$range(0,6), function(i)  {sys.$params(arguments.length, 1);
    if (sys.$eq(i , 5) && sys.$eq(time.month(Date1[0]) , month)) ExtraRow[0] =sys.$checkExists(ExtraRow[0], true);
    iter.each(iter.$range(0,7), function(j)  {sys.$params(arguments.length, 1);
      const d =sys.$checkNull( dp[elDays][i][j].removeAll());
      const year1 =sys.$checkNull( time.year(Date1[0]));
      const month1 =sys.$checkNull( time.month(Date1[0]));
      const day1 =sys.$checkNull( time.day(Date1[0]));

      if (sys.$eq(day1 , Dday[0]) && sys.$eq(month1 , Dmonth[0]) && sys.$eq(year1 , Dyear[0])) {
        d.klass("select");
      } else {
        d.klass("day");
        if (sys.$neq(time.month(Date1[0]) , month)) d.klass("dayOut");
        if (sys.$eq(time.weekday(Date1[0]) , 6) || sys.$eq(time.weekday(Date1[0]) , 0)) {
          d.klass("weekend");
          if (sys.$neq(time.month(Date1[0]) , month)) d.klass("weekendOut");
        }
      }
      if (sys.$eq(day1 , tday) && sys.$eq(month1 , tmonth) && sys.$eq(year1 , tyear))
        d.klass("today");

      const ddate1 =sys.$checkNull( Date1[0]);
      d.html("<span class='day'>" + time.day(ddate1) + "</span>");
      d.att("id", math.toStr(ddate1));
      Date1[0] =sys.$checkExists(Date1[0],sys.$checkNull( time.mkDate(
        time.day(Date1[0]) + 1, time.month(Date1[0]), time.year(Date1[0])
      )));
    });
  });

  if (sys.$eq(dp[tb].getAtt("hasTrEx") , "true")) {
    dp[tb].remove(dp[exTr]);
    dp[tb].att("hasTrEx", "false");
  }

  if (ExtraRow[0]) {
    dp[tb].remove(dp[tr4]);

    dp[tb].add(dp[exTr]).add(dp[tr4]);
    dp[tb].att("hasTrEx", "true");
  }
};


 function previousMonth(dp)  {sys.$params(arguments.length, 1);
  dp[dateView] =sys.$checkExists(dp[dateView],sys.$checkNull( time.mkDate(
    1, time.month(dp[dateView]) - 1, time.year(dp[dateView])
  )));
  load(dp);
};


 function nextMonth(dp)  {sys.$params(arguments.length, 1);
  dp[dateView] =sys.$checkExists(dp[dateView],sys.$checkNull( time.mkDate(
    1, time.month(dp[dateView]) + 1, time.year(dp[dateView])
  )));
  load(dp);
};


 function previousYear(dp)  {sys.$params(arguments.length, 1);
  dp[dateView] =sys.$checkExists(dp[dateView],sys.$checkNull( time.mkDate(
    1, time.month(dp[dateView]), time.year(dp[dateView]) - 1
  )));
  load(dp);
};


 function nextYear(dp)  {sys.$params(arguments.length, 1);
  dp[dateView] =sys.$checkExists(dp[dateView],sys.$checkNull( time.mkDate(
    1, time.month(dp[dateView]), time.year(dp[dateView]) + 1
  )));
  load(dp);
};


 function today(dp)  {sys.$params(arguments.length, 1);
  const today =sys.$checkNull( time.now());
  dp[date][0] =sys.$checkExists(dp[date][0], today);
  dp[dateView] =sys.$checkExists(dp[dateView],sys.$checkNull( time.mkDate(1, time.month(today), time.year(today))));
  load(dp);
};



 function none(dp)  {sys.$params(arguments.length, 1);
  dp[date] =sys.$checkExists(dp[date], []);
  load(dp);
  dp[fn]("");
};



 function clickDay(dp, newDate)  {sys.$params(arguments.length, 2);
  dp[date] =sys.$checkExists(dp[date], [newDate]);
  load(dp);
  dp[fn](time.toStr(newDate));
};




export  function mkWg(dp)  {sys.$params(arguments.length, 1);
  
   function mkArrow(tx, f)  {sys.$params(arguments.length, 2);  return Q("td")
    .klass("arrow")
    .add(Q("span")
      .html(tx)
      .on("click", function(e)  {sys.$params(arguments.length, 1); f();}))
  ;};

  
   function mkHeader(colspan, txarr1, farr1, element, txarr2, farr2)  {sys.$params(arguments.length, 6);  return Q("td")
    .att("colspan", colspan)
    .add(Q("table")
      .klass("in")
      .add(Q("tr")
        .add(mkArrow(txarr1, farr1))
        .add(Q("td")
          .style("vertical-align:bottom")
          .add(element.klass("title")))
        .add(mkArrow(txarr2, farr2))))
  ;};

  dp[elMonth] =sys.$checkExists(dp[elMonth],sys.$checkNull( Q("span")));
  dp[elYear] =sys.$checkExists(dp[elYear],sys.$checkNull( Q("span")));
  dp[elDays] =sys.$checkExists(dp[elDays], []);

  dp[tr4] =sys.$checkExists(dp[tr4],sys.$checkNull( Q("tr")
    .add(Q("td")
      .att("colspan", 4)
      .klass("left")
      .add(Q("span").klass("link")
        .html(i18n(dp).today)
        .on("click", function(e)  {sys.$params(arguments.length, 1); today(dp);})))
    .add(Q("td")
      .att("colspan", 3)
      .klass("right")
      .add(Q("span")
        .klass("link")
        .html(i18n(dp).none)
        .on("click", function(e)  {sys.$params(arguments.length, 1); none(dp);})))));

  dp[tb] =sys.$checkExists(dp[tb],sys.$checkNull( Q("table")
    .att("hasTrEx", "false")
    .klass("dmDatePicker")
    .add(Q("tr")
      .add(mkHeader(
        3, "&laquo",
        function()  {sys.$params(arguments.length, 0); previousMonth(dp);},
        dp[elMonth],
        "&raquo;",
        function()  {sys.$params(arguments.length, 0); nextMonth(dp);}
      ))
      .add(Q("td"))
      .add(mkHeader(
        3, "&laquo",
        function()  {sys.$params(arguments.length, 0); previousYear(dp);},
        dp[elYear],
        "&raquo;",
        function()  {sys.$params(arguments.length, 0); nextYear(dp);}
      )))
    .add(Q("tr")
      .adds(iter.map(iter.$range(0,7), function(i)  {sys.$params(arguments.length, 1);
        const ix0 = i + i18n(dp).firstWeekDay;
        const ix =sys.$checkNull( ix0 > 6 ? ix0 - 7 : ix0);
         return Q("td")
          .html(weekDays(dp)[ix])
        ;
      })))
    .adds((function()  {sys.$params(arguments.length, 0);
        const Rows =sys.$checkNull( arr.fromIter(iter.map(iter.$range(0,5), function(i)  {sys.$params(arguments.length, 1);
          const Tds = [];
          const tr =sys.$checkNull( Q("tr")
            .adds(iter.map(iter.$range(0,7), function(j)  {sys.$params(arguments.length, 1);
              const td =sys.$checkNull( Q("td"));
              td.on("click", function(e)  {sys.$params(arguments.length, 1); clickDay(dp, math.fromStr(td.getAtt("id"))[0]);});
              arr.push(Tds,td);
               return td;
            })))
          ;
          dp[elDays].push(Tds);
           return tr;
        })));
        const Tds = [];
        dp[exTr] =sys.$checkExists(dp[exTr],sys.$checkNull( Q("tr")
          .adds(iter.map(iter.$range(0,7), function(i)  {sys.$params(arguments.length, 1);
            const td =sys.$checkNull( Q("td"));
            td.on("click", function(e)  {sys.$params(arguments.length, 1); clickDay(dp, math.fromStr(td.getAtt("id"))[0]);});
            arr.push(Tds,td);
             return td;
          }))))
        ;
        dp[elDays].push(Tds);
         return Rows;
      })())
    .add(dp[tr4])));
  load(dp);
   return Q("div")
    .style(dp[floating] ? "position:absolute" : "position:relative")
    .add(dp[tb])
  ;
};





export  function mkButton(dp, button)  {sys.$params(arguments.length, 2);
  const span =sys.$checkNull( Q("span"));
  const IsShow = [false];

  
   function btAction(ev)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(IsShow[0])) {
      span.add(mkWg(dp));
      IsShow[0] =sys.$checkExists(IsShow[0], true);
      return;
    }
    span.removeAll();
    IsShow[0] =sys.$checkExists(IsShow[0], false);
  };
  button.on("click", btAction);

  const previousFn =sys.$checkNull( dp[fn]);
  dp[fn] =sys.$checkExists(dp[fn], function(s)  {sys.$params(arguments.length, 1);
    previousFn(s);
    span.removeAll();
    IsShow[0] =sys.$checkExists(IsShow[0], false);
  });

  dp[floating] =sys.$checkExists(dp[floating], true);
   return Q("span")
    .add(button)
    .add(span)
  ;
};





export  function mkText(dp, textInput)  {sys.$params(arguments.length, 2);
  
   function format(s)  {sys.$params(arguments.length, 1);
    const d =sys.$checkNull( time.fromStr(s)[0]);
     return dp[isEs] ? time.toIso(d) : time.toEn(d);
  };
  const span =sys.$checkNull( Q("span"));
  const IsShow = [false];

  
   function btAction(ev)  {sys.$params(arguments.length, 1);
    if (!sys.asBool(IsShow[0])) {
      span.add(mkWg(dp));
      IsShow[0] =sys.$checkExists(IsShow[0], true);
      return;
    }
    span.removeAll();
    IsShow[0] =sys.$checkExists(IsShow[0], false);
  };

  const Date =sys.$checkNull( getDate(dp));
  const val =sys.$checkNull( !sys.asBool(Date) ? "" : format(time.toStr(Date[0])));
  textInput.value(val);
  textInput.on("click", btAction);
  textInput.on("keydown", function(e)  {sys.$params(arguments.length, 1);  e.preventDefault();;});

  const previousFn =sys.$checkNull( dp[fn]);
  dp[fn] =sys.$checkExists(dp[fn], function(s)  {sys.$params(arguments.length, 1);
    textInput.value(sys.$eq(s , "") ? "" : format(s));
    previousFn(s);
    span.removeAll();
    IsShow[0] =sys.$checkExists(IsShow[0], false);
  });

  dp[floating] =sys.$checkExists(dp[floating], true);
   return Q("span")
    .add(textInput)
    .add(span)
  ;
};
