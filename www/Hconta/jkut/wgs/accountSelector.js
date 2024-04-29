import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as acc from  "../data/acc.js";
import * as accValue from  "../data/accValue.js";
import * as cts from  "../cts.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);








export  function mk(ac, fn, forCash)  {sys.$params(arguments.length, 3);
  const planDiv =sys.$checkNull( Q("div"));
  const acV =sys.$checkNull( [ac]);

  const planHelpfV =sys.$checkNull( [[]]);

  

  
   function changeTo(a)  {sys.$params(arguments.length, 1);
    acV[0] =sys.$checkExists(acV[0],sys.$checkNull( sys.$eq(str.len(a) , 1)
      ? iter.next(dic.toIter(
          acc.subOf(iter.next(dic.toIter(acc.subOf(a)))[0])
        ))[0]
      : sys.$eq(str.len(a) , 2)
        ? iter.next(dic.toIter(acc.subOf(a)))[0]
        : a))
    ;
    planDiv
      .removeAll()
      .add(planHelpfV[0]())
    ;
  };

  

  
  planHelpfV[0] =sys.$checkExists(planHelpfV[0], function() {sys.$params(arguments.length, 0);  return Q("ul")
    .style("list-style:none;padding-left:0px;")
    .adds(iter.map(iter.$range(1,4), function(lg)  {sys.$params(arguments.length, 1);  return Q("li")
        .html("<a href='#' onclick='return false;'>" +
          fns.cutRight(acc.descriptionOf(sys.$slice(acV[0],null,lg)), cts.helpLen) +
          "</a>")
        .add(Q("ul")
          .att("id", "hlist")
          .style("list-style:none;padding-left:10px;")
          .adds(function()  {sys.$params(arguments.length, 0);
               const Subs =sys.$checkNull( dic.toArr(acc.subOf(sys.$slice(acV[0],null,lg - 1))));
              arr.sort(Subs,function(Kv1, Kv2)  {sys.$params(arguments.length, 2);  return Kv1[0] < Kv2[0];});
               return arr.map(Subs,function(Kv)  {sys.$params(arguments.length, 1);
                 return Q("li")
                  .add(ui.link(function(e)  {sys.$params(arguments.length, 1); changeTo(Kv[0]);})
                    .klass("link")
                    .att("title", Kv[0])
                    .html(fns.cutRight(Kv[1][accValue.description], cts.helpLen)))
                ;}
              );
            }()));}))
    .add(Q("li")
      .add(Q("hr")))
    .adds(function()  {sys.$params(arguments.length, 0);
      const Subs =sys.$checkNull( arr.filter(
        dic.toArr(acc.sub(acV[0])),
        function(Kv)  {sys.$params(arguments.length, 1);  return sys.$neq(Kv[0] , cts.cash) || !sys.asBool(forCash);}
      ));
      arr.sort(Subs,function(Kv1, Kv2)  {sys.$params(arguments.length, 2);  return Kv1[0] < Kv2[0];});
       return arr.map(Subs,function(Kv)  {sys.$params(arguments.length, 1);
         return Q("li")
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); fn(Kv[0], Kv[1][accValue.description]);})
            .klass("link")
            .att("title", acc.accFormat(Kv[0]))
            .html(fns.cutRight(Kv[1][accValue.description], cts.helpLen)))
        ;}
      );
    }())
  ;});

  
   function getWg()  {sys.$params(arguments.length, 0);
    changeTo(acV[0]);
     return Q("td")
      .klass("frame")
      .style("width:250px;vertical-align:top;white-space:nowrap")
      .add(Q("p")
        .html("<b>" + II("Most used accounts") + "</b>"))
      .add(Q("ul")
        .style("list-style:none;padding-left:0px;")
        .adds(arr.map(
            acc.mostUsedSubaccounts(forCash),
            function(Kv)  {sys.$params(arguments.length, 1);  return Q("li")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); fn(Kv[0], Kv[1]);})
                .klass("link")
                .att("title", acc.accFormat(Kv[0]))
                .text(fns.cutRight(Kv[1], cts.helpLen)));}
          )))
      .add(Q("p")
        .html("<b>" + II("Plan") + "</b>"))
      .add(planDiv)
    ;
  };

   return {wg: getWg()};
};
