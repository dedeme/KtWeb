import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as cts from  "../cts.js";
import * as fns from  "../fns.js";
import * as image from  "../data/image.js";
import * as imgAdj from  "../data/imgAdj.js";
import * as imageViewerWg from  "../wgs/imageViewerWg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(imgDiv,  im, onChange)  {sys.$params(arguments.length, 3);
  const adjOp =sys.$checkNull( im[image.adjOp]);
  const stateV =sys.$checkNull( [!sys.asBool(adjOp) ?  -1 : adjOp[0][imgAdj.type]]);

  
   function mkIn(id, nextId, value)  {sys.$params(arguments.length, 3);  return ui.changePoint(ui.field(nextId)
      .att("id", id)
      .style("width:80px")
      .value(value)
    );};

  const startCut =sys.$checkNull( mkIn(
    "startCut", "startCut",
    sys.$eq(stateV[0] , imgAdj.cut) ? adjOp[0][imgAdj.Params][0] : 0
  ));
  const ratioBlur =sys.$checkNull( mkIn(
    "ratioBlur", "ratioLight",
    sys.$eq(stateV[0] , imgAdj.background) ? adjOp[0][imgAdj.Params][1] : 50
  ));
  const ratioLight =sys.$checkNull( mkIn(
    "ratioLight", "ratioBlur",
    sys.$eq(stateV[0] , imgAdj.background) ? adjOp[0][imgAdj.Params][2] : 30
  ));
  const pixelsStretch =sys.$checkNull( mkIn(
    "pixelsStretch", "pixelsStretch",
    sys.$eq(stateV[0] , imgAdj.stretch) ? adjOp[0][imgAdj.Params][0] : 10
  ));

  const color =sys.$checkNull( Q("input")
    .att("type", "color")
    .value(sys.$eq(stateV[0] , imgAdj.background)
        ? "#" + fns.intToColor(adjOp[0][imgAdj.Params][0])
        : "#ffffff"
      ))
  ;

  const editorDiv =sys.$checkNull( Q("div"));

  const mkEditorV =sys.$checkNull( [[]]);

  

  
   function setState(v)  {sys.$params(arguments.length, 1);
    stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( v));
    mkEditorV[0](editorDiv);
  };

  
   function restore(ev)  {sys.$params(arguments.length, 1);
    const adjOp =sys.$checkNull( im[image.adjOp]);
    const stateV =sys.$checkNull( [!sys.asBool(adjOp) ?  -1 : adjOp[0][imgAdj.type]]);

    startCut.value(sys.$eq(stateV[0] , imgAdj.cut) ? adjOp[0][imgAdj.Params][0] : 0);
    ratioBlur.value(sys.$eq(stateV[0] , imgAdj.background) ? adjOp[0][imgAdj.Params][1] : 50);
    ratioLight.value(sys.$eq(stateV[0] , imgAdj.background) ? adjOp[0][imgAdj.Params][2] : 30);
    pixelsStretch.value(sys.$eq(stateV[0] , imgAdj.stretch) ? adjOp[0][imgAdj.Params][0] : 10);
    color.value(
      sys.$eq(stateV[0] , imgAdj.background)
        ? fns.intToColor(adjOp[0][imgAdj.Params][0])
        : "#ffffff"
    );

    onChange(im);
    mkEditorV[0](editorDiv);
  };

  
   function update(ev)  {sys.$params(arguments.length, 1);
    
     function value(i, min, max, def)  {sys.$params(arguments.length, 4);
      const rV =sys.$checkNull( math.fromStr(i.getValue()));
      if (!sys.asBool(rV)) {
        arr.push(rV, def);
        i.value("" + rV[0]);
      } else if (rV[0] > max) {
        rV[0] =sys.$checkExists(rV[0],sys.$checkNull( max));
        i.value("" + rV[0]);
      } else if (rV[0] < min) {
        rV[0] =sys.$checkExists(rV[0],sys.$checkNull( min));
        i.value("" + rV[0]);
      }
       return rV[0];
    };
    const adjOp =sys.$checkNull((   
      sys.$eq(stateV[0],imgAdj.cut)? [imgAdj.mk(stateV[0], [value(startCut, 0, 10000, 0)])]:
      sys.$eq(stateV[0],imgAdj.background)? [
          imgAdj.mk(
            stateV[0],
            [ fns.colorToInt(sys.$slice(color.getValue(),1,null)),
              value(ratioBlur, 0, 100, 50),
              value(ratioLight, 0, 100, 30)
            ]
          )
        ]:
      sys.$eq(stateV[0],imgAdj.stretch)? [imgAdj.mk(stateV[0], [value(pixelsStretch, 1, 100, 10)])]:
       []
    ));

    onChange(image.setAdjOp(im, adjOp));
    mkEditorV[0](editorDiv);
  };

  
   function close(ev)  {sys.$params(arguments.length, 1); modalBox.show(cts.box, false);};

  

  
  mkEditorV[0] =sys.$checkExists(mkEditorV[0], function(div)  {sys.$params(arguments.length, 1);
    const deactivateBt =sys.$checkNull( Q("input")
      .att("type", "radio")
      .att("name", "type")
      .checked(sys.$eq(stateV[0] ,  -1))
      .on("click", function(ev)  {sys.$params(arguments.length, 1); setState( -1);}))
    ;
    const cutBt =sys.$checkNull( Q("input")
      .att("type", "radio")
      .att("name", "type")
      .checked(sys.$eq(stateV[0] , imgAdj.cut))
      .on("click", function(ev)  {sys.$params(arguments.length, 1); setState(imgAdj.cut);}))
    ;
    const backgroundBt =sys.$checkNull( Q("input")
      .att("type", "radio")
      .att("name", "type")
      .checked(sys.$eq(stateV[0] , imgAdj.background))
      .on("click", function(ev)  {sys.$params(arguments.length, 1); setState(imgAdj.background);}))
    ;
    const stretchBt =sys.$checkNull( Q("input")
      .att("type", "radio")
      .att("name", "type")
      .checked(sys.$eq(stateV[0] , imgAdj.stretch))
      .on("click", function(ev)  {sys.$params(arguments.length, 1); setState(imgAdj.stretch);}))
    ;
    const left =sys.$checkNull( Q("div")
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .add(deactivateBt))
          .add(Q("td")
            .style("text-align:left")
            .text(II("Deactivate"))))
        .add(Q("tr")
          .add(Q("td")
            .add(cutBt))
          .add(Q("td")
            .style("text-align:left")
            .text(II("Cut"))))
        .add(Q("tr")
          .add(Q("td")
            .add(backgroundBt))
          .add(Q("td")
            .style("text-align:left")
            .text(II("Background"))))
        .add(Q("tr")
          .add(Q("td")
            .add(stretchBt))
          .add(Q("td")
            .style("text-align:left")
            .text(II("Stretch"))))
      ))
    ;
    const right =sys.$checkNull( Q("div"));
    if (sys.$eq(stateV[0] , imgAdj.cut)) {
      right
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .text(II("Pixels from top / left"))))
          .add(Q("tr")
            .add(startCut)))
      ;
    } else if (sys.$eq(stateV[0] , imgAdj.background)) {
      right
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .text(II("Color")))
            .add(Q("td")
              .text(II("Blur (0 - 100)")))
            .add(Q("td")
              .text(II("Light (0 - 100)"))))
          .add(Q("tr")
            .add(Q("td")
              .add(color))
            .add(Q("td")
              .add(ratioBlur))
            .add(Q("td")
              .add(ratioLight))))
      ;
    } else if (sys.$eq(stateV[0] , imgAdj.stretch)) {
      right
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .text(II("Pixels to sample"))))
          .add(Q("tr")
            .add(pixelsStretch)))
      ;
    } else {
      right.removeAll();
    }

    div
      .removeAll()
      .add(Q("table")
        .klass("main")
        .add(Q("tr")
          .add(Q("td")
            .style("width:5px;text-align:left")
            .add(left))
          .add(Q("td")
            .add(right))))
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
