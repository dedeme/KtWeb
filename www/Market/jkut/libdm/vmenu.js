import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




const Q =sys.$checkNull( ui.q);







export function mkEntry (id,wg,selWg) { sys.$params(arguments.length, 3); return [ id, wg, selWg];}export const id = 0;export const wg = 1;export const selWg = 2;





export  function mk( Opts, selected)  {sys.$params(arguments.length, 2);
   function td()  {sys.$params(arguments.length, 0);  return Q("td").style("white-space:nowrap");};

   return Q("div")
    .add(Q("table")
      .klass("frame")
      .adds(arr.map(Opts,function(e)  {sys.$params(arguments.length, 1);
           return Q("tr").add(td().add(
            !sys.asBool(!sys.asBool(e[id])) && sys.$eq(e[id][0] , selected) ? e[selWg] : e[wg]
          ));}
        )))
  ;
};



export  function separator() {sys.$params(arguments.length, 0);  return mkEntry([], Q("hr"), Q("div"));};



export  function title(tx)  {sys.$params(arguments.length, 1);  return mkEntry(
    [], Q("span").style("text-align:center").html("<b>" + tx + "</b>"), Q("div")
  );};






export  function option(id, tx, fn)  {sys.$params(arguments.length, 3);
   return mkEntry(
      [id],
      ui.link(function(ev)  {sys.$params(arguments.length, 1); fn();}).setStyle("text-align", "left").klass("link").html(tx),
      Q("span").style("text-align:left;font-style:italic;color:#803010").html(tx)
    );};
