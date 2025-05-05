import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as cts from  "../cts.js";
import * as image from  "../data/image.js";
import * as imageViewerWg from  "../wgs/imageViewerWg.js";
import * as cutEditorWg from  "../wgs/cutEditorWg.js";
import * as adjustmentEditorWg from  "../wgs/adjustmentEditorWg.js";
import * as blurEditorWg from  "../wgs/blurEditorWg.js";
import * as global from  "../global.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk( Images, ix)  {sys.$params(arguments.length, 2);
  const imV = [Images[ix]];

  const optionsDiv =sys.$checkNull( Q("div"));
  const sourceDiv =sys.$checkNull( Q("div"));
  const targetDiv =sys.$checkNull( Q("div"));
  const imgEditorDiv =sys.$checkNull( Q("div"));

  const updateImageV = [[]];

  

  
   function editCut(ev)  {sys.$params(arguments.length, 1);
    cutEditorWg.mk(imgEditorDiv, imV[0], updateImageV[0]);
    modalBox.show(cts.box, true);
  };

  
   function editAdjustment(ev)  {sys.$params(arguments.length, 1);
    adjustmentEditorWg.mk(imgEditorDiv, imV[0], updateImageV[0]);
    modalBox.show(cts.box, true);
  };

  
   function editBlur(ev)  {sys.$params(arguments.length, 1);
    blurEditorWg.mk(imgEditorDiv, imV[0], updateImageV[0]);
    modalBox.show(cts.box, true);
  };

  

  
   function showSourceImg()  {sys.$params(arguments.length, 0);
     function action()  {sys.$params(arguments.length, 0);
      imageViewerWg.mk(
        cts.boxContent, "source/" + imV[0][image.id], 800,
        function()  {sys.$params(arguments.length, 0); modalBox.show(cts.box, false);}
      );
      modalBox.show(cts.box, true);
    };

    imageViewerWg.mk(sourceDiv, "source/" + imV[0][image.id], 240, action);
  };

  
   function showOptions()  {sys.$params(arguments.length, 0);
    optionsDiv
      .removeAll()
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .add(Q("input")
              .att("type", "checkbox")
              .disabled(true)
              .checked(!sys.asBool(!sys.asBool(imV[0][image.cutOp])))))
          .add(Q("td")
            .add(ui.link(editCut)
              .klass("link")
              .text(II("Cut")))))
        .add(Q("tr")
          .add(Q("td")
            .add(Q("input")
              .att("type", "checkbox")
              .disabled(true)
              .checked(!sys.asBool(!sys.asBool(imV[0][image.adjOp])))))
          .add(Q("td")
            .add(ui.link(editAdjustment)
              .klass("link")
              .text(II("Adjustment")))))
        .add(Q("tr")
          .add(Q("td")
            .add(Q("input")
              .att("type", "checkbox")
              .disabled(true)
              .checked(!sys.asBool(!sys.asBool(imV[0][image.blurOp])))))
          .add(Q("td")
            .add(ui.link(editBlur)
              .klass("link")
              .text(II("Blur")))))
      )
    ;
  };

  
   function showTargetImg()  {sys.$params(arguments.length, 0);
    const ix =sys.$checkNull( str.lastIndex(imV[0][image.id], "."));
    const newId =sys.$checkNull( sys.$eq(ix ,  -1)
      ? imV[0][image.id] + ".jpg"
      : sys.$slice(imV[0][image.id],null,ix) + ".jpg")
    ;

     function action()  {sys.$params(arguments.length, 0);
      imageViewerWg.mk(
        cts.boxContent, "target/" + newId, 800,
        function()  {sys.$params(arguments.length, 0); modalBox.show(cts.box, false);}
      );
      modalBox.show(cts.box, true);
    };

    imageViewerWg.mk(targetDiv, "target/" + newId, 240, action);
    imageViewerWg.mk(imgEditorDiv, "target/" + newId, 800, function()  {sys.$params(arguments.length, 0);});
  };

  
   async  function showTarget()  {sys.$params(arguments.length, 0);
    optionsDiv.removeAll().add(ui.img("wait.gif"));
    targetDiv.removeAll().add(ui.img("wait.gif"));
    imgEditorDiv.removeAll().add(ui.img("wait.gif"));
     const {ok} = await  client.send({
      prg: cts.appName,
      source: "TrWg",
      rq: "idata",
      im: imV[0]
    });
    if (!sys.asBool(ok)) {
      ui.alert(i18n.fmt(II("Image '%0' can not be processed"), [imV[0][image.id]]));
      window.location.reload(true);
    } else {
      showOptions();
      showTargetImg();
    }
  };

  
  updateImageV[0] =sys.$checkExists(updateImageV[0], async  function( im)  {sys.$params(arguments.length, 1);
    imV[0] =sys.$checkExists(imV[0], im);
    Images[ix] =sys.$checkExists(Images[ix], im);
     const {dbKey} = await  client.send({
      prg: cts.appName,
      source: "TrWg",
      rq: "update",
      dbKey: global.dbKeyV[0],
      Images:Images
    });
    global.dbKeyV[0] =sys.$checkExists(global.dbKeyV[0], dbKey);

    showTarget();
  });

  
   async  function update()  {sys.$params(arguments.length, 0);
    showSourceImg();
    await showTarget();
  };

  await update();
   return Q("tr")
    .add(Q("td")
      .style("text-align:left;vertical-align:middle")
      .add(optionsDiv))
    .add(Q("td").klass("separator"))
    .add(Q("td")
      .style("text-align:center;vertical-align:middle")
      .add(sourceDiv))
    .add(Q("td").klass("separator"))
    .add(Q("td")
      .style("text-align:center;vertical-align:middle")
      .add(targetDiv))
    .add(Q("td").klass("separator"))
  ;
};
