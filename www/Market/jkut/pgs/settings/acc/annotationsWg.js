import * as arr from '../../../_js/arr.js';import * as bytes from '../../../_js/bytes.js';import * as storage from '../../../_js/storage.js';import * as sys from '../../../_js/sys.js';import * as client from '../../../_js/client.js';import * as b64 from '../../../_js/b64.js';import * as ui from '../../../_js/ui.js';import * as js from '../../../_js/js.js';import * as iter from '../../../_js/iter.js';import * as math from '../../../_js/math.js';import * as str from '../../../_js/str.js';import * as timer from '../../../_js/timer.js';import * as domo from '../../../_js/domo.js';import * as dic from '../../../_js/dic.js';import * as cryp from '../../../_js/cryp.js';import * as time from '../../../_js/time.js';




import * as menu from  "../../../libdm/menu.js";
import * as datePicker from  "../../../libdm/datePicker.js";
import * as msg from  "../../../wgs/msg.js";
import * as cts from  "../../../cts.js";
import * as ann from  "../../../data/acc/ann.js";
import * as opr from  "../../../data/acc/opr.js";
import * as i18n from  "../../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);



export  function mk(wg,  As, DelFn)  {sys.$params(arguments.length, 3);
  
   function tdDate(d)  {sys.$params(arguments.length, 1);  return Q("td")
    .klass("border")
    .text(d)
  ;};
  
   function tdTp(t)  {sys.$params(arguments.length, 1);  return Q("td")
    .klass("border")
    .text(t)
  ;};
  
   function tdRest(s)  {sys.$params(arguments.length, 1);  return Q("td")
    .klass("border")
    .style("text-align: left;")
    .text(s)
  ;};

  
   function addAnn( a)  {sys.$params(arguments.length, 1);
    const date =sys.$checkNull( tdDate(time.toIso(time.fromStr(a[ann.date])[0])));
     const op =sys.$checkNull( a[ann.op]);

    switch (opr.type(op)){
      case opr.seT:{  return [date, tdTp(II("Sell")), tdRest(
          opr.nick(op) + "|" + math.toIso(opr.stocks(op), 0) + "|" +
          math.toIso(opr.price(op), 4)
        )];break;}
      case opr.buT:{  return [date, tdTp(II("Buy")), tdRest(
          opr.nick(op) + "|" + math.toIso(opr.stocks(op), 0) + "|" +
          math.toIso(opr.price(op), 4)
        )];break;}
      case opr.stT:{  return [date, tdTp(II("In Stock")), tdRest(
          opr.nick(op) + "|" + math.toIso(opr.stocks(op), 0) + "|" +
          math.toIso(opr.price(op), 4)
        )];break;}
      case opr.prT:{  return [date, tdTp(II("Profits")), tdRest(
          math.toIso(opr.amount(op), 2) + "|" + opr.cause(op)
        )];break;}
      case opr.feT:{  return [date, tdTp(II("Fees")), tdRest(
          math.toIso(opr.amount(op), 2) + "|" + opr.cause(op)
        )];break;}
      case opr.inT:{  return [date, tdTp(II("Income")), tdRest(
          math.toIso(opr.amount(op), 2)
        )];break;}
      case opr.wiT:{  return [date, tdTp(II("Withdrawal")), tdRest(
          math.toIso(opr.amount(op), 2)
        )];break;}
      case opr.pdT:{  return [date, tdTp(II("Diff. +")), tdRest(
          math.toIso(opr.amount(op), 2) + "|" + opr.cause(op)
        )];break;}
      case opr.ndT:{  return [date, tdTp(II("Diff. -")), tdRest(
          math.toIso(opr.amount(op), 2) + "|" + opr.cause(op)
        )];break;}
      default:{ throw new Error( ("Unkown operation"));}
    }
  };

  wg
    .removeAll()
    .add(Q("table")
      .att("align", "center")
      .adds(sys.$eq(arr.size(As) , 0)
        ? [ Q("tr")
            .add(Q("td")
              .klass("frame")
              .text(II("Without Data")))
          ]
        : arr.map(As,function( a)  {sys.$params(arguments.length, 1);
            if (!sys.asBool(!sys.asBool(DelFn))) {
              if (sys.$slice(a[ann.date], -4,null) > "0101" && sys.$neq(opr.type(a[ann.op]) , opr.stT))
                 return Q("tr")
                  .add(ui.link(function(e)  {sys.$params(arguments.length, 1); DelFn[0](a[ann.id]);})
                    .add(ui.img("delete")))
                  .adds(addAnn(a));
              else
               return Q("tr")
                .add(Q("td"))
                .adds(addAnn(a));
            } else {
               return Q("tr")
                .adds(addAnn(a));
            }}
          )))
  ;

};
