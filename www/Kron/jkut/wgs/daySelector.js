import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);











export  function mk(wg,  Days, editable)  {sys.$params(arguments.length, 3);
  
  const showV = [[]];

  
   function click(n)  {sys.$params(arguments.length, 1);
    const ix =sys.$checkNull( arr.index(Days,function(d)  {sys.$params(arguments.length, 1);  return sys.$eq(d , n);}));
    if (sys.$neq(ix ,  -1)) arr.remove(Days,ix);
    else arr.push(Days,n);
    showV[0]();
  };

  showV[0] =sys.$checkExists(showV[0], function() {sys.$params(arguments.length, 0);
    const ds =sys.$checkNull( II("MTWRFSU"));
     const Tds =sys.$checkNull( editable
      ? arr.fromIter(iter.map(iter.$range(0,7), function(i)  {sys.$params(arguments.length, 1);
          const selected =sys.$checkNull( arr.any(Days,function(d)  {sys.$params(arguments.length, 1);  return sys.$eq(d , i);}));
           return Q("td")
            .klass(selected ? "frame" : "GrFrame")
            .style("font-family:monospace;cursor:pointer;" +
              (selected ? "font-weight:bold;" : "color:#a9a9a9;"))
            .on("click", function(ev)  {sys.$params(arguments.length, 1); click(i);})
            .text(ds[i])
          ;
        }))
      : arr.fromIter(iter.map(iter.$range(0,7), function(i)  {sys.$params(arguments.length, 1);
          const selected =sys.$checkNull( arr.any(Days,function(d)  {sys.$params(arguments.length, 1);  return sys.$eq(d , i);}));
           return Q("td")
            .klass("GrFrame")
            .style("font-family:monospace;"+
              (selected ? "font-weight:bold;" : "color:#a9a9a9;"))
            .text(ds[i])
          ;
        })))
    ;

    wg
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .add(Q("table")
              .add(Q("tr")
                .adds(arr.take(Tds,4))))))
        .add(Q("tr")
          .add(Q("td")
            .add(Q("table")
              .att("align", "center")
              .add(Q("tr")
                .adds(arr.drop(Tds,4)))))))
    ;
  });

   return {Days:Days, editable:editable, show: showV[0]};
};
