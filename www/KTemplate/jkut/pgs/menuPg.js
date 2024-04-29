import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as designPg from  "../pgs/designPg.js";
import * as ctsWg from  "../wgs/kut/ctsWg.js";
import * as emptyWg from  "../wgs/kut/emptyWg.js";
import * as ktWebMainWg from  "../wgs/kut/ktWebMainWg.js";
import * as kutPostMainWg from  "../wgs/kut/kutPostMainWg.js";
import * as recordWg from  "../wgs/kut/recordWg.js";
import * as pageWg from  "../wgs/kut/pageWg.js";
import * as dbMainWg from  "../wgs/kut/dbMainWg.js";
import * as jstbWg from  "../wgs/kut/jstbWg.js";
import * as logWg from  "../wgs/kut/logWg.js";
import *  as  jctsWg from  "../wgs/jkut/ctsWg.js";
import * as globalWg from  "../wgs/jkut/globalWg.js";
import *  as  jemptyWg from  "../wgs/jkut/emptyWg.js";
import * as mainWg from  "../wgs/jkut/mainWg.js";
import * as msgWg from  "../wgs/jkut/msgWg.js";
import * as i18nWg from  "../wgs/jkut/i18nWg.js";
import *  as  jsnippetsWg from  "../wgs/jkut/snippetsWg.js";
import *  as  jrecordWg from  "../wgs/jkut/recordWg.js";
import *  as  jlogWg from  "../wgs/jkut/logWg.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg)  {sys.$params(arguments.length, 1);

  

  

  
   function constants(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    ctsWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function empty(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    emptyWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function ktWebMain(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    ktWebMainWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function kutPostMain(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    kutPostMainWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function record(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    recordWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function page(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    pageWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function dbMain(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    dbMainWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function jstb(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    jstbWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function log(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(false));
    const designerWg =sys.$checkNull( Q("div"));
    logWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  

  
   function jconstants(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    jctsWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function jglobal(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    globalWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function jempty(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    jemptyWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function main(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    mainWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function msg(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    msgWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function i18nn(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    i18nWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function jrecord(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    jrecordWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function jlog(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    jlogWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  
   function jsnippets(title)  {sys.$params(arguments.length, 1);
    const viewer =sys.$checkNull( designPg.mkTextArea(true));
    const designerWg =sys.$checkNull( Q("div"));
    jsnippetsWg.mk(designerWg, viewer);
    designPg.mk(wg, designerWg, viewer, title);
  };

  

  const KutOptions =sys.$checkNull( [
    [II("Constants"), constants],
    [II("Empty Module"), empty],
    [II("KtWeb Main"), ktWebMain],
    [II("KutPost Main"), kutPostMain],
    [II("Record Module"), record],
    [II("Web Page Hub"), page],
    [II("Database Main"), dbMain],
    [II("JSON table"), jstb],
    [II("Log"), log]
  ]);
  arr.sort(KutOptions,function(e1, e2)  {sys.$params(arguments.length, 2);  return str.less(e1[0], e2[0]);});

  const JkutOptions =sys.$checkNull( [
    [II("Constants"), jconstants],
    [II("Global Variables"), jglobal],
    [II("Empty Page"), jempty],
    [II("Main Page"), main],
    [II("Message Page"), msg],
    [II("Record Page"), jrecord],
    [II("Log"), jlog],
    [II("Snippets"), jsnippets],
    ["I18n", i18nn]
  ]);
  arr.sort(JkutOptions,function(e1, e2)  {sys.$params(arguments.length, 2);  return str.less(e1[0], e2[0]);});

  const max =sys.$checkNull( arr.size(KutOptions) > arr.size(JkutOptions)
    ? arr.size(KutOptions)
    : arr.size(JkutOptions))
  ;

  for (let i = arr.size(KutOptions);i < max; ++i) arr.push(KutOptions, []);
  for (let i = arr.size(JkutOptions);i < max; ++i) arr.push(JkutOptions, []);

  const tkut =sys.$checkNull( Q("table")
    .klass("frame3")
    .add(Q("tr").add(Q("td")
      .klass("title")
      .style("text-align:center;")
      .text("Kut")))
    .adds(arr.map(KutOptions,function(Op)  {sys.$params(arguments.length, 1);  return !sys.asBool(Op)
        ? Q("tr").add(Q("td").html("&nbsp"))
        : Q("tr").add(Q("td")
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); Op[1](Op[0]);})
          .klass("link")
          .text(Op[0])))
      ;})))
  ;

  const tjkut =sys.$checkNull( Q("table")
    .klass("frame2")
    .add(Q("tr")
      .add(Q("td")
        .klass("title")
        .style("text-align:center;")
        .text("JKut")))
    .adds(arr.map(JkutOptions,function(Op)  {sys.$params(arguments.length, 1);  return !sys.asBool(Op)
        ? Q("tr").add(Q("td").html("&nbsp;"))
        : Q("tr").add(Q("td")
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); Op[1](Op[0]);})
          .klass("link")
          .text(Op[0])))
      ;})))
  ;

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .style("vertical-align:top;")
          .add(tkut))
        .add(Q("td"))
        .add(Q("td")
          .style("vertical-align:top;")
          .add(tjkut))))
  ;

  
};
