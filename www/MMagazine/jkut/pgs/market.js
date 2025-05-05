import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as menu from  "../libdm/menu.js";
import * as dmenu from  "../wgs/dmenu.js";
import * as profitsPg from  "../pgs/market/profitsPg.js";
import * as percentsPg from  "../pgs/market/percentsPg.js";
import * as i18n from  "../i18n.js";

const II =sys.$checkNull( i18n.tlt);






export  function process(wg, dbmenu, LcPath)  {sys.$params(arguments.length, 3);
  if (!sys.asBool(LcPath)) arr.push(LcPath, "profits");

  const lopts = [
    dmenu.mkHiddenButton(dbmenu),
    menu.separator2(),
    menu.tlink("market&profits", II("Profits")),
    menu.separator(),
    menu.tlink("market&percents", II("Percentages"))
  ];
  const menuWg =sys.$checkNull( menu.mk(lopts, [], "market&" + LcPath[0]));
  dmenu.setDownMenu(dbmenu, menuWg);

  switch (LcPath[0]) {
    case "percents":{ percentsPg.mk(wg);break;}
    default:{ profitsPg.mk(wg);}
  }
};
