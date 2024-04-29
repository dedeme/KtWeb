import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( "\n{SNIPPET}\n");

  const esBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(true))
  ;

  const enBt =sys.$checkNull( Q("input")
    .att("type", "radio")
    .att("name", "unic")
    .checked(false))
  ;

  

  
   function update()  {sys.$params(arguments.length, 0);
    const esTx =sys.$checkNull( String.raw
`2 Days = 2 días
All = Todo
All log entries will be deleted.\nContinue? = Todas las entradas serán borradas.\n¿Continuar?
Click %0 to continue. = Click %0 para continuar.
Data base is out of date. = La base de datos está obsoleta.
Delete = Borrar
Errors = Errores
Session is closed.\nAuthenticating from Main. = La sesión ha sido cerrada.\nHay que autenticarse en Main.
Log = Log
Reload = Recarga
Session is expired. = La sesión ha expirado.
here = Aquí
`);

    const enTx =sys.$checkNull( String.raw
`2 Days = 2 Days
All = All
All log entries will be deleted.\nContinue? = All log entries will be deleted.\nContinue?
Click %0 to continue. = Click %0 to continue.
Data base is out of date. = Data base is out of date.
Delete = Delete
Errors = Errors
Session is closed.\nAuthenticating from Main. = Session is closed.\nAuthenticating from Main.
Log = Log
Reload = Reload
Session is expired. = Session is expired.
here = here
`);

    const t =sys.$checkNull( esBt.isChecked() ? esTx
      : enBt.isChecked() ? enTx
      : "")
    ;

    textArea.text(str
      .replace(tx,"{SNIPPET}", t)
    );
  };

  

  esBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  enBt.on("change", function(e)  {sys.$params(arguments.length, 1); update();});

  wg
    .removeAll()
    .add(Q("p")
      .style("text-align:left")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); update();})
        .klass("link")
        .text(II("Update"))))
    .add(Q("hr"))
    .add(Q("p")
      .add(esBt)
      .add(Q("span")
        .text(II("Spanish"))))
    .add(Q("p")
      .add(enBt)
      .add(Q("span")
        .text(II("English"))))
    .add(Q("hr"))
  ;

  update();
};
