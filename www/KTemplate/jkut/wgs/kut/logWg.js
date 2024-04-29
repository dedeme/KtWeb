import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`"getLog": return {FN}({
    Log: log.readJs()
  });
"resetLog": {
    log.reset();
    return {FEMPTY};
  }
`);

  const ktWebBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(true))
  ;

  const kutPostBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(false))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    const [fn, fempty] = ktWebBt.isChecked()
      ? ["rp.mkJs", "rp.mkEmpty()"]
      : ["js.wo", '"{}"']
    ;

    textArea.text(str
      .replace(tx,"{FN}", fn)
      .replace("{FEMPTY}", fempty)
    );
  };

  


  ktWebBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  kutPostBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});

  wg
    .removeAll()
    .add(Q("p")
      .style("text-align:left")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); update();})
        .klass("link")
        .text(II("Update"))))
    .add(Q("hr"))
    .add(Q("p")
      .add(ktWebBt)
      .add(Q("span")
        .text("KtWeb")))
    .add(Q("p")
      .add(kutPostBt)
      .add(Q("span")
        .text("KutPost")))
    .add(Q("hr"))
  ;

  update();
};
