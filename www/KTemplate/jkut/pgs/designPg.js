import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, designer, textArea, title)  {sys.$params(arguments.length, 4);

  

  
   function copy()  {sys.$params(arguments.length, 0);  navigator.clipboard.writeText(textArea.getValue());};

  

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 3)
          .klass("title")
          .style("text-align:center")
          .text(title)))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 3)
          .add(Q("hr"))))
      .add(Q("tr")
        .add(Q("td")
          .style("vertical-align:top;width:90%")
          .add(designer))
        .add(Q("td"))
        .add(Q("td")
          .style("vertical-align:top;")
          .add(ui.link(function(e) {sys.$params(arguments.length, 1);copy();})
            .klass("link")
            .text(II("Clipboard")))
          .add(textArea))))
  ;
};



export  function mkTextArea(isJkut)  {sys.$params(arguments.length, 1);  return Q("textarea")
  .style("background:" +
    (isJkut ? "rgb(250, 250, 230)" : "rgb(240, 245, 250)"))
  .att("cols", 80)
  .att("rows", 40)
  .att("readonly", true)
;};
