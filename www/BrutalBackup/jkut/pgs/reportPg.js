import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as modalBox from  "../libdm/modalBox.js";
import * as cts from  "../cts.js";
import * as fromServer from  "../data/fromServer.js";
import * as fromClient from  "../data/fromClient.js";
import * as progressBar from  "../wgs/progressBar.js";
import * as i18n from  "../i18n.js";


const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




export  async  function mk(wg, box)  {sys.$params(arguments.length, 2);
    const {cl} = await  client.send({
    prg: cts.appName,
    source: "Report",
    rq: "idata"
  });

  const tm =sys.$checkNull( timer.mk(1000));
  const stopBtDiv =sys.$checkNull( Q("div"));
  const reportDiv =sys.$checkNull( Q("div"));
  const warea =sys.$checkNull( Q("textarea")
    .att("readonly", true)
    .att("spellcheck", false)
    .att("cols", 50)
    .att("rows", 5))
  ;

  

  
   async  function update()  {sys.$params(arguments.length, 0);
      const {sv} = await  client.send({
      prg: cts.appName,
      source: "Report",
      rq: "update"
    });

    const progressDiv =sys.$checkNull( Q("div"));
    progressBar.mk(progressDiv, sv[fromServer.currentCount], sv[fromServer.totalCount]);
    warea.text(arr.join(sv[fromServer.Warnings], "\n"));

    switch(sv[fromServer.state]) {
      case fromServer.end:{ {
        timer.stop(tm);
        modalBox.show(box, false);
      }break;}
      case fromServer.error:{ reportDiv
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .klass("frame4")
              .text(sv[fromServer.errorMsg]))))
        ;break;}
      case fromServer.readingSource:{ reportDiv
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .klass("frame")
              .html(II("Reading source data") + "<br>" + sv[fromServer.currentCount]))))
        ;break;}
      case fromServer.readingTarget:{ reportDiv
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .klass("frame")
              .html(II("Reading target data") + "<br>" + sv[fromServer.currentCount]))))
        ;break;}
      case fromServer.selecting:{ reportDiv
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .klass("frame")
              .html(II("Selecting files to copy"))))
          .add(Q("tr")
            .add(Q("td")
              .add(progressDiv))))
        ;break;}
      case fromServer.copying:{ reportDiv
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .klass("frame")
              .html(II("Copying data"))))
          .add(Q("tr")
            .add(Q("td")
              .add(progressDiv))))
        ;break;}
      case fromServer.deleting:{ reportDiv
        .removeAll()
        .add(Q("table")
          .att("align", "center")
          .add(Q("tr")
            .add(Q("td")
              .klass("frame")
              .html(II("Deleting data")))))
        ;break;}
      default:{ throw new Error( ("State " + sv[fromServer.state] + " unknown"));}
    }
  };

  
   async  function stop()  {sys.$params(arguments.length, 0);
    await client.send({
      prg: cts.appName,
      source: "Report",
      rq: "stop"
    });
    stopBtDiv
      .removeAll()
      .add(ui.img("wait.gif"))
    ;
    update();
  };

  

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .klass("head")
          .text(II("Backup"))))
      .add(Q("tr")
        .add(Q("td")
          .style("width:5px;text-align:right;padding-right:5px")
          .text(II("From") + ":"))
        .add(Q("td")
          .style("text-align:left")
          .text(cl[fromClient.source])))
      .add(Q("tr")
        .add(Q("td")
          .style("width:5px;text-align:right;padding-right:5px")
          .text(II("to") + ":"))
        .add(Q("td")
          .style("text-align:left")
          .text(cl[fromClient.target])))
      .add(Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .add(stopBtDiv
            .add(Q("button")
              .style("with:100px")
              .on("click", function(ev)  {sys.$params(arguments.length, 1); stop();})
              .text(II("stop")))))))
    .add(ui.hrule(II("State"), 50))
    .add(reportDiv)
    .add(ui.hrule(II("Warnings"), 50))
    .add(warea)
  ;

  update();

  timer.run(tm,update);
};
