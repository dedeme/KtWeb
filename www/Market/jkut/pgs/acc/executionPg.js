import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as modalBox from  "../../libdm/modalBox.js";
import * as cts from  "../../cts.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const msgWait =sys.$checkNull( Q("div"));



export  async  function mk(wg)  {sys.$params(arguments.length, 1);
  const body =sys.$checkNull( Q("div"));

  wg
    .removeAll()
    .add(body)
    .add(msgWait)
  ;

   const box =sys.$checkNull( modalBox.mk(
    Q("div")
      .add(Q("div")
        .style("text-align:center")
        .add(ui.img("wait2.gif").klass("frame"))),
    false
  ));
  msgWait
    .removeAll()
    .add(modalBox.mkWg(box));
  modalBox.show(box,true);

  
  
   const {Operations,  Errors} = await  client.send({
    prg: cts.appName,
    module: "Acc",
    source: "ExecutionPg",
    rq: "idata"
  });

  const [capital, profits] = arr.reduce(Operations,
      [0, 0],
      function(r, o)  {sys.$params(arguments.length, 2);  return [r[0] + Math.abs(o[2]), r[1] + o[3] - o[2]];}
    );

  if (!sys.asBool(!sys.asBool(Errors))) {
    body
      .add(Q("div")
        .klass("head")
        .text(II("Errors")))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .style("text-align: left")
            .html(arr.join(Errors,"<br>")))))
    ;
  }

  body
    .add(Q("div")
      .klass("head")
      .text(II("Summary")))
    .add(Q("table")
      .klass("border")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("header")
          .style("text-align:right")
          .text(II("Capital")))
        .add(Q("td")
          .klass("header")
          .style("text-align:right")
          .text(II("Profits")))
        .add(Q("td")
          .klass("header")
          .style("text-align:right")
          .text("%")))
      .add(Q("tr")
        .add(Q("td")
          .klass("number")
          .text(math.toIso(capital, 0)))
        .add(Q("td")
          .klass("number2")
          .text(math.toIso(profits, 2)))
        .add(Q("td")
          .klass("number2")
          .text(math.toIso(profits * 100 / capital, 2)))))
   ;

  body
    .add(Q("div")
      .klass("head")
      .text(II("Operations")))
    .add(Q("table")
      .klass("border")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .klass("header")
          .text(II("B / S")))
        .add(Q("td")
          .klass("header")
          .text(II("Date")))
        .add(Q("td")
          .klass("header")
          .style("text-align:left")
          .text("Nick"))
        .add(Q("td")
          .klass("header")
          .style("text-align:rigth")
          .text(II("Teoric")))
        .add(Q("td")
          .klass("header")
          .style("text-align:rigth")
          .text(II("Real")))
        .add(Q("td")
          .klass("header")
          .style("text-align:rigth")
          .text(II("Dif.")))
        .add(Q("td")
          .klass("header")
          .style("text-align:rigth")
          .text(II("Dif. %"))))
      .adds(
          arr.map(Operations,function(o)  {sys.$params(arguments.length, 1);
            const t =sys.$checkNull( o[2]);
            const r =sys.$checkNull( o[3]);
            const dif = r - t;
            const difPer = dif * 100 / Math.abs(t);
             return Q("tr")
              .add(Q("td")
                  .klass("borderWhite")
                  .style("text-align: center")
                  .text(t < 0
                      ? II("(B)uy")
                      : II("(S)ale")
                    ))
              .add(Q("td")
                  .klass("borderWhite")
                  .text(time.toIso(time.fromStr(o[1])[0])))
              .add(Q("td")
                  .klass("borderWhite")
                  .style("text-align:left")
                  .text(o[0]))
              .add(Q("td")
                  .klass("borderWhite")
                  .style("text-align:right")
                  .text(math.toIso(t, 0)))
              .add(Q("td")
                  .klass("borderWhite")
                  .style("text-align:right")
                  .text(math.toIso(r, 0)))
              .add(Q("td")
                  .klass("borderWhite")
                  .style("text-align:right")
                  .text(math.toIso(dif, 2)))
              .add(Q("td")
                  .klass("borderWhite")
                  .style("text-align:right")
                  .text(math.toIso(difPer, 2)))
              ;
          })
        ))
   ;

  modalBox.show(box,false);

};
