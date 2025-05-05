import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as cts from  "../cts.js";
import * as image from  "../data/image.js";
import * as imgCut from  "../data/imgCut.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(imgDiv,  im, onChange)  {sys.$params(arguments.length, 3);
  const cutOp =sys.$checkNull( im[image.cutOp]);
  const isActivatedV = [!sys.asBool(cutOp) ? false: true];

  
   function mkIn(id, nextId, value)  {sys.$params(arguments.length, 3);  return ui.changePoint(ui.field(nextId)
      .att("id", id)
      .style("width:80px")
      .value(value)
    );};

  const df =sys.$checkNull( cts.pixelsCut);
  const top =sys.$checkNull( mkIn("top", "right", isActivatedV[0] ? cutOp[0][imgCut.top] : df));
  const left =sys.$checkNull( mkIn("left", "top", isActivatedV[0] ? cutOp[0][imgCut.left] : df));
  const bottom =sys.$checkNull( mkIn("bottom", "left", isActivatedV[0] ? cutOp[0][imgCut.bottom] : df));
  const right =sys.$checkNull( mkIn("right", "bottom", isActivatedV[0] ? cutOp[0][imgCut.right] : df));

  const editorDiv =sys.$checkNull( Q("div"));

  const mkEditorV = [[]];

  

  
   function activate(value)  {sys.$params(arguments.length, 1);
    isActivatedV[0] =sys.$checkExists(isActivatedV[0], value);
    mkEditorV[0](editorDiv);
  };

  
   function restore(ev)  {sys.$params(arguments.length, 1);
    const cutOp =sys.$checkNull( im[image.cutOp]);
    const isActivatedV = [!sys.asBool(cutOp) ? false : true];

    const df =sys.$checkNull( cts.pixelsCut);
    top.value(isActivatedV[0] ? cutOp[0][imgCut.top] : df);
    left.value(isActivatedV[0] ? cutOp[0][imgCut.left] : df);
    bottom.value(isActivatedV[0] ? cutOp[0][imgCut.bottom] : df);
    right.value(isActivatedV[0] ? cutOp[0][imgCut.right] : df);

    onChange(im);
    mkEditorV[0](editorDiv);
  };

  
   function update(ev)  {sys.$params(arguments.length, 1);
    
     function value(i)  {sys.$params(arguments.length, 1);
      const rOp =sys.$checkNull( math.fromStr(i.getValue()));
      if (!sys.asBool(rOp)) {
        arr.push(rOp, cts.pixelsCut);
        i.value("" + rOp[0]);
      }
       return rOp[0];
    };
    const cutOp =sys.$checkNull( isActivatedV[0]
      ? [ imgCut.mk(
            value(left), value(top), value(right), value(bottom)
          )]
      : [])
    ;

    onChange(image.setCutOp(im, cutOp));
    mkEditorV[0](editorDiv);
  };

  
   function close(ev)  {sys.$params(arguments.length, 1); modalBox.show(cts.box, false);};

  

  
  mkEditorV[0] =sys.$checkExists(mkEditorV[0], function(div)  {sys.$params(arguments.length, 1);
    left.disabled(!sys.asBool(isActivatedV[0]));
    top.disabled(!sys.asBool(isActivatedV[0]));
    right.disabled(!sys.asBool(isActivatedV[0]));
    bottom.disabled(!sys.asBool(isActivatedV[0]));

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
            .text(II("Left")))
          .add(Q("td"))
          .add(Q("td")
            .text(II("Top"))))
        .add(Q("tr")
          .add(Q("td")
            .add(left))
          .add(Q("td"))
          .add(Q("td")
            .add(top)))
        .add(Q("tr")
          .add(Q("td")
            .text(II("Right")))
          .add(Q("td"))
          .add(Q("td")
            .text(II("Bottom"))))
        .add(Q("tr")
          .add(Q("td")
            .add(right))
          .add(Q("td"))
          .add(Q("td")
            .add(bottom))))
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
