import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx = "\n{SNIPPET}\n";

  const serverSendBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(true))
  ;

  const serverUpdateBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(false))
  ;


  

  
   function update()  {sys.$params(arguments.length, 0);
    const serverSendTx = String.raw
`, dbKey : await client.send({
  prg: cts.appName,
  source: "Home",
  rq: "idata"
});
global.dbKeyV! = dbKey;
`;

    const serverUpdateTx = String.raw
`, dbKey : await client.send({
  prg: cts.appName,
  source: "Home",
  rq: "update",
  dbKey: global.dbKeyV!
});
global.dbKeyV! = dbKey;
`;

    const t =sys.$checkNull( serverSendBt.isChecked() ? serverSendTx
      : serverUpdateBt.isChecked() ? serverUpdateTx
      : "")
    ;

    textArea.text(str
      .replace(tx,"{SNIPPET}", t)
    );
  };

  


  serverSendBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  serverUpdateBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});

  wg
    .removeAll()
    .add(Q("p")
      .style("text-align:left")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); update();})
        .klass("link")
        .text(II("Update"))))
    .add(Q("hr"))
    .add(Q("p")
      .add(serverSendBt)
      .add(Q("span")
        .text(II("Send to Server, getting dbKey"))))
    .add(Q("p")
      .add(serverUpdateBt)
      .add(Q("span")
        .text(II("Send to Server, sending dbKey"))))
    .add(Q("hr"))
  ;

  update();
};
