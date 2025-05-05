import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as cts from  "../cts.js";
import * as image from  "../data/image.js";
import * as imgBlur from  "../data/imgBlur.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(imgDiv,  im, onChange)  {sys.$params(arguments.length, 3);
  const blurOp =sys.$checkNull( im[image.blurOp]);
  const isActivatedV = [!sys.asBool(blurOp) ? false : true];

  
   function mkIn(id, nextId, value)  {sys.$params(arguments.length, 3);  return ui.changePoint(ui.field(nextId)
      .att("id", id)
      .style("width:80px")
      .value(value)
    );};

  const ratio =sys.$checkNull( mkIn(
    "ratio", "ratio", isActivatedV[0] ? blurOp[0][imgBlur.ratio] : cts.ratioBlur
  ));

  const editorDiv =sys.$checkNull( Q("div"));

  const mkEditorV = [[]];

  

  
   function activate(value)  {sys.$params(arguments.length, 1);
    isActivatedV[0] =sys.$checkExists(isActivatedV[0], value);
    mkEditorV[0](editorDiv);
  };

  
   function restore(ev)  {sys.$params(arguments.length, 1);
    const blurOp =sys.$checkNull( im[image.blurOp]);
    const isActivatedV = [!sys.asBool(blurOp) ? false : true];

    ratio.value(isActivatedV[0] ? blurOp[0][imgBlur.ratio] : cts.ratioBlur);

    onChange(im);
    mkEditorV[0](editorDiv);
  };

  
   function update(ev)  {sys.$params(arguments.length, 1);
    
     function value(i)  {sys.$params(arguments.length, 1);
      const rV =sys.$checkNull( math.fromStr(i.getValue()));
      if (!sys.asBool(rV)) {
        arr.push(rV, cts.ratioBlur);
        i.value("" + rV[0]);
      }
       return rV[0];
    };
    const blurOp =sys.$checkNull( isActivatedV[0]
      ? [imgBlur.mk(value(ratio))]
      : [])
    ;

    onChange(image.setBlurOp(im, blurOp));
    mkEditorV[0](editorDiv);
  };

  
   function close(ev)  {sys.$params(arguments.length, 1); modalBox.show(cts.box, false);};

  

  
  mkEditorV[0] =sys.$checkExists(mkEditorV[0], function(div)  {sys.$params(arguments.length, 1);
    ratio.disabled(!sys.asBool(isActivatedV[0]));
    div
      .removeAll()
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 3)
            .add(isActivatedV[0]
                ? ui.link(function(ev)  {sys.$params(arguments.length, 1); activate(false);})
                    .klass("link")
                    .text(II("Deactivate"))
                : ui.link(function(ev)  {sys.$params(arguments.length, 1); activate(true);})
                    .klass("link")
                    .text(II("Activate"))
              )))
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:center")
            .text(II("Percentage (0 - 100)"))))
        .add(Q("tr")
          .add(Q("td")
            .add(ratio))))
    ;
  });

  mkEditorV[0](editorDiv);

  cts.boxContent
    .removeAll()
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(Q("td"))
        .add(Q("td")
          .style("text-align:right")
          .add(ui.link(close)
            .klass("link")
            .text(II("Close")))))
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:left")
          .add(ui.link(update)
            .klass("link")
            .text(II("Update")))
          .add(Q("span")
            .html("&nbsp;&nbsp;"))
          .add(ui.link(restore)
            .klass("link")
            .text(II("Restore"))))
        .add(Q("td"))))
    .add(Q("hr"))
    .add(editorDiv)
    .add(Q("hr"))
    .add(imgDiv)
  ;

};
