import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as all from  "../data/all.js";
import * as report from  "../data/report.js";
import * as cts from  "../data/cts.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg) {sys.$params(arguments.length, 1);
  const txEs =sys.$checkNull( String.raw
`<h2>Cambio de ejercicio</h2>
<p>El cambio de ejercicio se realiza automáticamente al apuntar una
anotación en un año posterior al de la última.</p>
<p>Como los informes se realizan teniendo en cuenta únicamente las
anotaciones del año en curso (página principal) o del seleccionado (Informe
de Hacienda), es preciso anotar manualmente <i>con fecha 1 de enero</i>
las existencias finales del año anterior como compras, para que sean
utilizadas en su elaboración.</p>
<p>La anotación en el 1 de enero se realiza 'clickando' el hipervínculo
'0101' de la paǵina de apuntes, y elimina cualquier previa anotación en tal
día. Ello es debido a que las fichas de almacén se realizan con las
anotaciones de todos los años, saltándose las correspondientes a los 1 de
Enero, pare evitar así duplicados.</p>
`);

  const txEn =sys.$checkNull( String.raw
`<h2>Change of Year</h2>
<p>The change of year is made automatically when an annotation of a
new year is done.</p>
<p>Because reports are made only with annotations of the current year
(main page) or annotations of the selected one (Treasury report),
is necessary to annotate manually <i>with date of the first of Junary</i>
the final existences of previous year. Oterwise they are not used by
reports.</p>
<p>The first of January annotation is made clicking over the hyperlink
'0101' on anntations page. This operation deletes any previous one
in such day, because stock forms use annotatations from all the years and
skip that of the first of January, avoiding in this way to duplicate
entries.</p>
`);

  wg
    .removeAll()
    .add(Q("div")
      .style("text-align:center")
      .add(Q("div")
        .klass("head")
        .html(II("Help")))
      .add(Q("table")
        .att("align", "center")
        .add(Q("tr")
          .add(Q("td")
            .klass("frame")
            .style("Text-align: left")
            .html(sys.asBool(sys.$eq(i18n.getLang() , "es")) ? txEs : txEn)))))
  ;
};
