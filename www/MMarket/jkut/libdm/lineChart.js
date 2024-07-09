import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';












































































const Q =sys.$checkNull( ui.q);





export  function mkPadding(top, right, bottom, left)  {sys.$params(arguments.length, 4);
   return {top:top, right:right, bottom:bottom, left:left};};


export  function paddingCopy(P)  {sys.$params(arguments.length, 1);  return mkPadding(P.top, P.right, P.bottom, P.left);};


export  function paddingToJs(P)  {sys.$params(arguments.length, 1);  return [P.top, P.right, P.bottom, P.left];};


export  function paddingFromJs(A)  {sys.$params(arguments.length, 1);  return mkPadding(A[0], A[1], A[2], A[3]);};


export  function mkPaddingExample()  {sys.$params(arguments.length, 0);  return mkPadding(8, 10, 20, 60);};





export  function mkLine(width, color, dotted)  {sys.$params(arguments.length, 3);  return {width:width, color:color, dotted:dotted};};


export  function lineCopy(L)  {sys.$params(arguments.length, 1);  return mkLine(L.width, L.color, L.dotted);};


export  function lineToJs(L)  {sys.$params(arguments.length, 1);  return [L.width, L.color, L.dotted];};


export  function lineFromJs(A)  {sys.$params(arguments.length, 1);  return mkLine(A[0], A[1], A[2]);};


export  function mkLineExample()  {sys.$params(arguments.length, 0);  return mkLine(1, "#002040", false);};





export  function mkAreaAtts(border, background)  {sys.$params(arguments.length, 2);  return {border:border, background:background};};


export  function areaAttsCopy(A)  {sys.$params(arguments.length, 1);  return mkAreaAtts(lineCopy(A.border), A.background);};


export  function areaAttsToJs(A)  {sys.$params(arguments.length, 1);  return [lineToJs(A.border), A.background];};


export  function areaAttsFromJs(A)  {sys.$params(arguments.length, 1);  return mkAreaAtts(lineFromJs(A[0]), A[1]);};


export  function mkAreaAttsExample()  {sys.$params(arguments.length, 0);  return mkAreaAtts(mkLineExample(), "#e9eaec");};





export  function mkArea(width, height, atts)  {sys.$params(arguments.length, 3);  return {width:width, height:height, atts:atts};};


export  function areaCopy(A)  {sys.$params(arguments.length, 1);  return mkArea(A.width, A.height, areaAttsCopy(A.atts));};


export  function areaToJs(A)  {sys.$params(arguments.length, 1);  return [A.width, A.height, areaAttsToJs(A.atts)];};


export  function areaFromJs(A)  {sys.$params(arguments.length, 1);  return mkArea(A[0], A[1], areaAttsFromJs(A[2]));};


export  function mkAreaExample()  {sys.$params(arguments.length, 0);  return mkArea(400, 200, mkAreaAttsExample());};





export  function mkUnarySet(label, value, line)  {sys.$params(arguments.length, 3);  return {label:label, value:value, line:line};};


export  function mkUnarySetExample()  {sys.$params(arguments.length, 0);  return mkUnarySet("Line", 0, mkLineExample());};

















































export  function mkData(Labels, SetValues, SetAtts)  {sys.$params(arguments.length, 3);
    if (!sys.asBool(Labels)) throw new Error(("'Labels' does not have values"));
    if (!sys.asBool(SetValues)) throw new Error(("'SetValues' does not have values"));
    if (!sys.asBool(SetValues[0])) throw new Error(("'SetValues[0]' does not have values"));
    if (sys.$neq(arr.size(SetValues) , arr.size(SetAtts)))
      throw new Error( (
        "Number of values sets (" + arr.size(SetValues) +
        ") does not match number of attributes set (" + arr.size(SetAtts) + ")"
      ));

    const UnarySets = [];
    const round = 2;
     function maxMinRound(mx, mn)  {sys.$params(arguments.length, 2);  return 0;};
     function drawGrid(l, i)  {sys.$params(arguments.length, 2);  return true;};
     function drawLabel(l, i)  {sys.$params(arguments.length, 2);  return true;};
     function mapLabel(l, i)  {sys.$params(arguments.length, 2);  return l;};

     return {
        Labels:Labels, SetValues:SetValues, SetAtts:SetAtts, UnarySets:UnarySets, round:round, maxMinRound:maxMinRound,
        drawGrid:drawGrid, drawLabel:drawLabel, mapLabel:mapLabel
      };
};


export  function mkDataExample()  {sys.$params(arguments.length, 0);
  const Labels = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  const setValues = [
    arr.map([1, 2, 9.54, 10.2, 6.2,  -7, 7], function(e)  {sys.$params(arguments.length, 1);  return [e];}),
    arr.map([2,  -4,  -2.15,  -5.2, 7, 3, 4], function(e)  {sys.$params(arguments.length, 1);  return [e];})
  ];
  const setAtts = [mkLineExample(),mkLineExample()];
  setAtts[0].color =sys.$checkExists(setAtts[0].color, "#000080");
  setAtts[1].color =sys.$checkExists(setAtts[1].color, "#800000");

   return mkData(Labels, setValues, setAtts);
};







export  function mkLabels(show, onPopup)  {sys.$params(arguments.length, 2);  return {show:show, onPopup:onPopup};};


export  function labelsCopy(L)  {sys.$params(arguments.length, 1);  return mkLabels(L.show, L.onPopup);};


export  function labelsToJs(L)  {sys.$params(arguments.length, 1);  return [L.show, L.onPopup];};


export  function labelsFromJs(A)  {sys.$params(arguments.length, 1);  return mkLine(A[0], A[1]);};


export  function mkLabelsExample()  {sys.$params(arguments.length, 0);  return mkLabels(true, false);};











export  function mkX(fontSize, isMonospace, isItalic, isBold, fontColor, grid)  {sys.$params(arguments.length, 6);  return {
    fontSize:fontSize, isMonospace:isMonospace, isItalic:isItalic, isBold:isBold, fontColor:fontColor, grid:grid
  };};


export  function xCopy(X)  {sys.$params(arguments.length, 1);  return mkX(
    X.fontSize, X.isMonospace, X.isItalic, X.isBold, X.fontColor, X.grid
  );};


export  function xToJs(X)  {sys.$params(arguments.length, 1);  return [
    X.fontSize, X.isMonospace, X.isItalic, X.isBold, X.fontColor, lineToJs(X.grid)
  ];};


export  function xFromJs(A)  {sys.$params(arguments.length, 1);  return mkX(
    A[0], A[1], A[3], A[4], lineFromJs(A[5])
  );};


export  function mkXExample()  {sys.$params(arguments.length, 0);  return mkX(
    12, false, false, false, "#000000", mkLine(1, "#808080", true)
  );};












export  function mkY(fontSize, isMonospace, isItalic, isBold, fontColor, grid, parts)  {sys.$params(arguments.length, 7);  return {
    fontSize:fontSize, isMonospace:isMonospace, isItalic:isItalic, isBold:isBold, fontColor:fontColor, grid:grid, parts:parts
  };};


export  function yCopy(Y)  {sys.$params(arguments.length, 1);  return mkY(
    Y.fontSize, Y.isMonospace, Y.isItalic, Y.isBold, Y.fontColor, Y.grid, Y.parts
  );};


export  function yToJs(Y)  {sys.$params(arguments.length, 1);  return [
    Y.fontSize, Y.isMonospace, Y.isItalic, Y.isBold, Y.fontColor,
    lineToJs(Y.grid), Y.parts
  ];};


export  function yFromJs(A)  {sys.$params(arguments.length, 1);  return mkY(
    A[0], A[1], A[3], A[4], lineFromJs(A[5]), A[6]
  );};


export  function mkYExample()  {sys.$params(arguments.length, 0);  return mkY(
    12, false, false, false, "#000000", mkLine(1, "#808080", true), 4
  );};













export  function mk(exArea, inPadding, inAtts, chartPadding, labels, xAxis, yAxis, lang)  {sys.$params(arguments.length, 8);  return {
    exArea:exArea, inPadding:inPadding, inAtts:inAtts, chartPadding:chartPadding, labels:labels, xAxis:xAxis, yAxis:yAxis, lang:lang
  };};


export  function copy(lC)  {sys.$params(arguments.length, 1);  return mk(
    areaCopy(lC.exArea), paddingCopy(lC.inPadding), areaAttsCopy(lC.inAtts),
    paddingCopy(lC.chartPadding), labelsCopy(lC.labels), xCopy(lC.xAxis),
    yCopy(lC.yAxis), lC.lang
  );};


export  function toJs(lC)  {sys.$params(arguments.length, 1);  return [
    areaToJs(lC.exArea), paddingToJs(lC.inPadding), areaAttsToJs(lC.inAtts),
    paddingToJs(lC.chartPadding), labelsToJs(lC.labels), xToJs(lC.xAxis),
    yToJs(lC.yAxis), lC.lang
  ];};


export  function fromJs(A)  {sys.$params(arguments.length, 1);  return mk(
    areaFromJs(A[0]), paddingFromJs(A[1]), areaAttsFromJs(A[2]),
    paddingFromJs(A[3]), labelsFromJs(A[4]), xFromJs(A[5]), yFromJs(A[6]), A[7]
  );};


export  function mkExample()  {sys.$params(arguments.length, 0);
  const inAtts =sys.$checkNull( mkAreaAttsExample());
  inAtts.background =sys.$checkExists(inAtts.background, "#fbfdff");
   return mk(
    mkAreaExample(),
    mkPaddingExample(),
    inAtts,
    mkPadding(2, 4, 2, 4),
    mkLabelsExample(),
    mkXExample(),
    mkYExample(),
    "es"
  );
};





export  function mkWg(lC, data)  {sys.$params(arguments.length, 2);
  
  
   function corr(x)  {sys.$params(arguments.length, 1);  return Math.floor(x) + 0.5;};

  
   function decFmt(n)  {sys.$params(arguments.length, 1);  return sys.$eq(lC.lang , "es")
      ? math.toIso(n, data.round)
      : math.toEn(n, data.round)
    ;};

  
  const HotLabels = [];
  
  const HotUnarySets = [];
  
  const HotSetValues = [];

  
  const Max = [[]];
  const Min = [0.0];
  const Gap = [0.0];

  

  for (const S  of sys.$forObject( data.SetValues)) for (const Val  of sys.$forObject( S)) {
    if (!sys.asBool(!sys.asBool(Val))) {
      if (!sys.asBool(!sys.asBool(Max[0]))) {
        Max[0][0] =sys.$checkExists(Max[0][0],sys.$checkNull( Val[0] > Max[0][0] ? Val[0] : Max[0][0]));
        Min[0] =sys.$checkExists(Min[0],sys.$checkNull( Val[0] < Min[0] ? Val[0] : Min[0]));
      } else {
        arr.push(Max[0], Val[0]);
        Min[0] =sys.$checkExists(Min[0],sys.$checkNull( Val[0]));
      }
    }
  }
  for (const S  of sys.$forObject( data.UnarySets)) {
    if (!sys.asBool(!sys.asBool(Max[0]))) {
      Max[0][0] =sys.$checkExists(Max[0][0],sys.$checkNull( S.value > Max[0][0] ? S.value : Max[0][0]));
      Min[0] =sys.$checkExists(Min[0],sys.$checkNull( S.value < Min[0] ? S.value : Min[0]));
    } else {
      arr.push(Max[0], S.value);
      Min[0] =sys.$checkExists(Min[0],sys.$checkNull( S.value));
    }
  }
  if (!sys.asBool(!sys.asBool(Max[0]))) {
    const round =sys.$checkNull( Math.pow(10, data.maxMinRound(Max[0][0], Min[0])));
    Max[0][0] =sys.$checkExists(Max[0][0], (Math.round(Max[0][0] / round) + 1) * round);
    Min[0] =sys.$checkExists(Min[0], (Math.round(Min[0] / round) - 1) * round);
    Gap[0] =sys.$checkExists(Gap[0], Max[0][0] - Min[0]);
  }

  

  const w = lC.exArea.width -
    lC.inPadding.left - lC.inPadding.right -
    lC.chartPadding.left - lC.chartPadding.right
  ;
  const h = lC.exArea.height -
    lC.inPadding.top - lC.inPadding.bottom -
    lC.chartPadding.top - lC.chartPadding.bottom
  ;
  const x0 = lC.inPadding.left + lC.chartPadding.left;
  const xEnd = x0 + w;
  const y0 = lC.exArea.height - lC.inPadding.bottom - lC.chartPadding.bottom;
  const yEnd = y0 - h;

  

  const wg =sys.$checkNull( Q("div"));

  const cv =sys.$checkNull( Q("canvas")
    .att("width", lC.exArea.width)
    .att("height", lC.exArea.height)
    .style("background:" + lC.exArea.atts.background))
  ;
  const cv2 =sys.$checkNull( Q("canvas")
    .att("width", 0)
    .att("height", 0)
    .style(
        "border: 1px solid black;" +
        "background:" + lC.inAtts.background + ";" +
        "position: absolute;" +
        "visibility: hidden;"
      ))
  ;
  cv2.on("mousemove", function(ev)  {sys.$params(arguments.length, 1);
    if (
      ev.offsetX < cv2.getAtt("width") - 6 ||
      ev.offsetY < cv2.getAtt("height") - 6
    ) cv2.setStyle("visibility", "hidden");}
  );
  const ctx =sys.$checkNull( cv.e.getContext("2d"));

  

  if (lC.exArea.atts.border.width > 0) {
    ctx.setLineDash(lC.exArea.atts.border.dotted ? [4, 2] : []);
    ctx.lineWidth =sys.$checkExists(ctx.lineWidth,sys.$checkNull( lC.exArea.atts.border.width));
    ctx.strokeStyle =sys.$checkExists(ctx.strokeStyle,sys.$checkNull( lC.exArea.atts.border.color));
    ctx.beginPath();
    ctx.rect(
      corr(0),
      corr(0),
      Math.round(lC.exArea.width - 1),
      Math.round(lC.exArea.height - 1)
    );
    ctx.stroke();
  }

  

  const ilf =sys.$checkNull( lC.inPadding.left);
  const itop =sys.$checkNull( lC.inPadding.top);
  const iw = lC.exArea.width - lC.inPadding.left - lC.inPadding.right - 1;
  const ih = lC.exArea.height - lC.inPadding.top - lC.inPadding.bottom - 1;

  ctx.fillStyle =sys.$checkExists(ctx.fillStyle,sys.$checkNull( lC.inAtts.background));
  ctx.beginPath();
  ctx.rect(ilf, itop, iw, ih);
  ctx.fill();

  

  ctx.fillStyle =sys.$checkExists(ctx.fillStyle,sys.$checkNull( lC.xAxis.fontColor));
  ctx.font =sys.$checkExists(ctx.font, "" + lC.xAxis.fontSize + "px " +
    (lC.xAxis.isMonospace ? "monospace" : "sans") +
    (lC.xAxis.isItalic ? " italic" : "") +
    (lC.xAxis.isBold ? " bold" : ""))
  ;
  for (let i = 0;i < arr.size(data.Labels); ++i) {
    const l0 =sys.$checkNull( data.Labels[i]);

    if (!sys.asBool(data.drawLabel(l0, i))) continue;
    const l =sys.$checkNull( data.mapLabel(l0, i));

    const lw =sys.$checkNull( ctx.measureText(l).width);
    ctx.fillText(l,
      x0  + i * w / (data.Labels.length - 1) - lw / 2,
      y0 + lC.chartPadding.bottom + lC.xAxis.fontSize
    );
  }

  for (let i = 0;i < arr.size(data.Labels); ++i) {
    const l =sys.$checkNull( data.Labels[i]);
    const cx =sys.$checkNull( corr(x0 + i * w / (arr.size(data.Labels) - 1)));

    arr.push(HotLabels, cx);

    if (sys.$eq(i , 0) || i >= arr.size(data.Labels) || !sys.asBool(data.drawGrid(l, i))) continue;

    ctx.setLineDash(lC.xAxis.grid.dotted ? [4, 2] : []);
    ctx.lineWidth =sys.$checkExists(ctx.lineWidth,sys.$checkNull( lC.xAxis.grid.width));
    ctx.strokeStyle =sys.$checkExists(ctx.strokeStyle,sys.$checkNull( lC.xAxis.grid.color));
    ctx.beginPath();
    ctx.moveTo(cx, corr(y0 + lC.chartPadding.bottom));
    ctx.lineTo(cx, corr(yEnd - lC.chartPadding.top));
    ctx.stroke();
  }

  

  ctx.fillStyle =sys.$checkExists(ctx.fillStyle,sys.$checkNull( lC.yAxis.fontColor));
  ctx.font =sys.$checkExists(ctx.font, "" + lC.yAxis.fontSize + "px " +
    (lC.yAxis.isMonospace ? "monospace" : "sans") +
    (lC.yAxis.isItalic ? " italic" : "") +
    (lC.yAxis.isBold ? " bold" : ""))
  ;

  const parts =sys.$checkNull( lC.yAxis.parts < 1 ? 1 : lC.yAxis.parts);
  for (let i = 0;i < parts+1; ++i) {
    const yVal = Min[0] + i * Gap[0] / parts;
    const y = y0 - (yVal - Min[0]) * h / Gap[0];

    const n =sys.$checkNull( decFmt(yVal));
    const ms =sys.$checkNull( ctx.measureText(n).width);
    ctx.fillText(
      n,
      lC.inPadding.left - 4 - ms,
      y + lC.yAxis.fontSize / 2.5
    );

    if (sys.$eq(i , 0) || sys.$eq(i , parts)) continue;

    ctx.setLineDash(lC.yAxis.grid.dotted ? [4, 2] : []);
    ctx.lineWidth =sys.$checkExists(ctx.lineWidth,sys.$checkNull( lC.yAxis.grid.width));
    ctx.strokeStyle =sys.$checkExists(ctx.strokeStyle,sys.$checkNull( lC.yAxis.grid.color));
    ctx.beginPath();
    ctx.moveTo(x0 - lC.chartPadding.left, corr(y));
    ctx.lineTo(xEnd + lC.chartPadding.right, corr(y));
    ctx.stroke();
  }

  
  for (const Ul  of sys.$forObject( data.UnarySets)) {
    const cy = y0 - (Ul.value - Min[0]) * h / Gap[0];
    arr.push(HotUnarySets, corr(cy));

    ctx.setLineDash(Ul.line.dotted ? [4, 2] : []);
    ctx.lineWidth =sys.$checkExists(ctx.lineWidth,sys.$checkNull( Ul.line.width));
    ctx.strokeStyle =sys.$checkExists(ctx.strokeStyle,sys.$checkNull( Ul.line.color));
    ctx.beginPath();
    ctx.moveTo(corr(x0), corr(cy));
    ctx.lineTo(corr(xEnd), corr(cy));
    ctx.stroke();
  }

  

  if (!sys.asBool(!sys.asBool(Max[0]))) {
    for (let i = 0;i < arr.size(data.SetValues); ++i) {
      const S =sys.$checkNull( data.SetValues[i]);
      const sSize =sys.$checkNull( arr.size(S));
      
      const HotSetRow = [];

      const Cy0 = [0];
      const IxStart = [0];
      for (let j = 0;j < sSize; ++j) {
        const Sval =sys.$checkNull( S[j]);
        if (!sys.asBool(Sval)) {
          arr.push(HotSetRow, []);
          continue;
        }
        IxStart[0] =sys.$checkExists(IxStart[0], j + 1);
        Cy0[0] =sys.$checkExists(Cy0[0],sys.$checkNull( corr(y0 - (Sval[0] - Min[0]) * h / Gap[0])));
        arr.push(HotSetRow, [Cy0[0]]);
        break;
      }

      ctx.setLineDash(data.SetAtts[i].dotted ? [4, 2] : []);
      ctx.lineWidth =sys.$checkExists(ctx.lineWidth,sys.$checkNull( data.SetAtts[i].width));
      ctx.strokeStyle =sys.$checkExists(ctx.strokeStyle,sys.$checkNull( data.SetAtts[i].color));
      ctx.beginPath();
      ctx.moveTo(corr(x0 + (IxStart[0] - 1) * w / (sSize - 1)), Cy0[0]);
      if (IxStart[0] >= sSize || !sys.asBool(S[IxStart[0]])) {
        ctx.arc(
          corr(x0 + (IxStart[0] - 1) * w / (sSize - 1)), Cy0[0],
          ctx.lineWidth / 2, 0, 2 * Math.PI
        );
      }
      const J = [IxStart[0]];
      while (J[0] < sSize) {
        if (!sys.asBool(!sys.asBool(S[J[0]]))) {
          const v =sys.$checkNull( S[J[0]][0]);
          const cy =sys.$checkNull( corr(y0 - (v - Min[0]) * h / Gap[0]));
          arr.push(HotSetRow, [cy]);
          ctx.lineTo(corr(x0 + J[0] * w / (sSize - 1)), cy);
          J[0] +=sys.$checkExists(J[0], 1);
        } else {
          arr.push(HotSetRow, []);
          J[0] +=sys.$checkExists(J[0], 1);
          while (J[0] < sSize) {
            if (!sys.asBool(!sys.asBool(S[J[0]]))) {
              const v =sys.$checkNull( S[J[0]][0]);
              const cy =sys.$checkNull( corr(y0 - (v - Min[0]) * h / Gap[0]));
              arr.push(HotSetRow, [cy]);
              ctx.moveTo(corr(x0 + J[0] * w / (sSize - 1)), cy);
              J[0] +=sys.$checkExists(J[0], 1);
              if (J[0] >= sSize || !sys.asBool(S[J[0]])) {
                ctx.arc(
                  corr(x0 + (J[0] - 1) * w / (sSize - 1)), cy,
                  ctx.lineWidth / 2, 0, 2 * Math.PI
                );
              }
              break;
            } else {
              arr.push(HotSetRow, []);
              J[0] +=sys.$checkExists(J[0], 1);
            }
          }
        }
      }
      ctx.stroke();

      arr.push(HotSetValues, HotSetRow);
    }
  }

  

  if (lC.inAtts.border.width > 0) {
    ctx.setLineDash(lC.inAtts.border.dotted ? [4, 2] : []);
    ctx.lineWidth =sys.$checkExists(ctx.lineWidth,sys.$checkNull( lC.inAtts.border.width));
    ctx.strokeStyle =sys.$checkExists(ctx.strokeStyle,sys.$checkNull( lC.inAtts.border.color));
    ctx.beginPath();
    ctx.rect(corr(ilf), corr(itop), Math.round(iw), Math.round(ih));
    ctx.stroke();
  }

  

  cv.on("mousemove", function(ev)  {sys.$params(arguments.length, 1);
    const cx =sys.$checkNull( ev.offsetX);
    const cy =sys.$checkNull( ev.offsetY);

    
    

    const UnarySetIx = [ -1];
    const UnarySetDif = [0];
    for (let i = 0;i < arr.size(HotUnarySets); ++i) {
      const v =sys.$checkNull( HotUnarySets[i]);
      const dif =sys.$checkNull( Math.abs(v - cy));
      if (dif < 4 && (sys.$eq(UnarySetIx[0] ,  -1) || dif < UnarySetDif[0])) {
        UnarySetIx[0] =sys.$checkExists(UnarySetIx[0], i);
        UnarySetDif[0] =sys.$checkExists(UnarySetDif[0], dif);
      }
    }

    const SetIx = [ -1];
    const SetValIx = [ -1];
    const SetDif = [0];
    for (let i = 0;i < arr.size(data.SetValues); ++i) {
      if (i < 0 || i > arr.size(HotSetValues)) continue;
      const HotSetValuesRow =sys.$checkNull( HotSetValues[i]);
      const Vs =sys.$checkNull( data.SetValues[i]);
      for (let j = 0;j < arr.size(Vs); ++j) {
        if (j < 0 || j > arr.size(HotSetValuesRow)) continue;
        const HotSet =sys.$checkNull( HotSetValuesRow[j]);
        if (!sys.asBool(HotSet)) continue;

        const xdif = HotLabels[j] - cx;
        const ydif = HotSet[0] - cy;
        const dif =sys.$checkNull( Math.sqrt(xdif * xdif + ydif * ydif));

        if (dif < 4 && (sys.$eq(SetIx[0] ,  -1) || dif <= SetDif[0])) {
          SetIx[0] =sys.$checkExists(SetIx[0], i);
          SetValIx[0] =sys.$checkExists(SetValIx[0], j);
          SetDif[0] =sys.$checkExists(SetDif[0], dif);
        }
      }
    }

    if (sys.$neq(UnarySetIx[0] ,  -1) || sys.$neq(SetIx[0] ,  -1)) {
      const yfirst =sys.$checkNull( lC.yAxis.fontSize);
      const ysecond = yfirst * 2 + yfirst / 4;
      const ysize = yfirst * 2.75;

      const Tx1 = [""];
      const Tx2 = [""];
      const Color = [""];

      if (sys.$neq(SetIx[0] ,  -1)) {
        Tx1[0] =sys.$checkExists(Tx1[0],sys.$checkNull( data.Labels[SetValIx[0]]));
        Tx2[0] =sys.$checkExists(Tx2[0],sys.$checkNull( decFmt(data.SetValues[SetIx[0]][SetValIx[0]][0])));
        Color[0] =sys.$checkExists(Color[0],sys.$checkNull( data.SetAtts[SetIx[0]].color));
      } else {
        Tx1[0] =sys.$checkExists(Tx1[0],sys.$checkNull( data.UnarySets[UnarySetIx[0]].label));
        Tx2[0] =sys.$checkExists(Tx2[0],sys.$checkNull( decFmt(data.UnarySets[UnarySetIx[0]].value)));
        Color[0] =sys.$checkExists(Color[0],sys.$checkNull( data.UnarySets[UnarySetIx[0]].line.color));
      }

      const ctx2 =sys.$checkNull( cv2.e.getContext("2d"));
      ctx2.font =sys.$checkExists(ctx2.font, "" + lC.yAxis.fontSize + "px " +
        (lC.yAxis.isMonospace ? "monospace" : "sans") +
        (lC.yAxis.isItalic ? " italic" : "") +
        (lC.yAxis.isBold ? " bold" : ""))
      ;
      const ms1 =sys.$checkNull( ctx2.measureText(Tx1[0]).width);
      const ms2 =sys.$checkNull( ctx2.measureText(Tx2[0]).width);

      const Margin1 = [4.0];
      const Margin2 = [Math.abs(ms1 - ms2) / 2 + Margin1[0]];
      const Ms = [ms1 + Margin1[0] * 2];
      if (ms2 > ms1) {
        Margin1[0] =sys.$checkExists(Margin1[0],sys.$checkNull( Margin2[0]));
        Margin2[0] =sys.$checkExists(Margin2[0], 4);
        Ms[0] =sys.$checkExists(Ms[0], ms2 + Margin2[0] * 2);
      }

      if (lC.labels.show) {
        const posY =sys.$checkNull( lC.labels.onPopup ? ev.clientY : ui.mouseY(ev));
        const posX =sys.$checkNull( lC.labels.onPopup ? ev.clientX : ui.mouseX(ev));
        cv2
          .att("height", ysize)
          .att("width", Ms[0])
          .setStyle("top", "" + (posY - ysize) + "px")
          .setStyle("left", "" + (posX - Ms[0]) + "px")
          .setStyle("visibility", "visible")
        ;

        const ctx3 =sys.$checkNull( cv2.e.getContext("2d"));
        ctx3.fillStyle =sys.$checkExists(ctx3.fillStyle,sys.$checkNull( Color[0]));
        ctx3.font =sys.$checkExists(ctx3.font, "" + lC.yAxis.fontSize + "px " +
          (lC.yAxis.isMonospace ? "monospace" : "sans") +
          (lC.yAxis.isItalic ? " italic" : "") +
          (lC.yAxis.isBold ? " bold" : ""))
        ;
        ctx3.fillText(Tx1[0], Margin1[0], yfirst);
        ctx3.fillText(Tx2[0], Margin2[0], ysecond);
      }
    } else {
      cv2.setStyle("visibility", "hidden");
    }
  });

   return wg.add(cv).add(cv2);
};


export  function mkWgExample() {sys.$params(arguments.length, 0);  return mkWg(mkExample(), mkDataExample());};
