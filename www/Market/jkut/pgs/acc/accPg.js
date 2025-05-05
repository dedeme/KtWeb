import * as arr from '../../_js/arr.js';import * as bytes from '../../_js/bytes.js';import * as storage from '../../_js/storage.js';import * as sys from '../../_js/sys.js';import * as client from '../../_js/client.js';import * as b64 from '../../_js/b64.js';import * as ui from '../../_js/ui.js';import * as js from '../../_js/js.js';import * as iter from '../../_js/iter.js';import * as math from '../../_js/math.js';import * as str from '../../_js/str.js';import * as timer from '../../_js/timer.js';import * as domo from '../../_js/domo.js';import * as dic from '../../_js/dic.js';import * as cryp from '../../_js/cryp.js';import * as time from '../../_js/time.js';




import * as menu from  "../../libdm/menu.js";
import * as dmenu from  "../../wgs/dmenu.js";
import * as i18n from  "../../i18n.js";
import * as companiesPg from  "../../pgs/acc/companiesPg.js";
import * as balancePg from  "../../pgs/acc/balancePg.js";
import * as tradingPg from  "../../pgs/acc/tradingPg.js";
import * as profitsPg from  "../../pgs/acc/profitsPg.js";
import * as ibexPg from  "../../pgs/acc/ibexPg.js";
import * as speedometersPg from  "../../pgs/acc/speedometersPg.js";
import * as executionPg from  "../../pgs/acc/executionPg.js";
import * as quotesPg from  "../../pgs/acc/quotesPg.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);






export  function mk(wg, dbMenu, LcPath)  {sys.$params(arguments.length, 3);
  const mSel =sys.$checkNull( !sys.asBool(LcPath) ? "profits" : LcPath[0]);

  

  

  const Lopts = [
    dmenu.mkHiddenButton(dbMenu),
    menu.separator2(),
    menu.tlink("acc&companies", II("Companies")),
    menu.separator(),
    menu.tlink("acc&balance", II("Balance")),
    menu.separator(),
    menu.tlink("acc&trading", II("Trading")),
    menu.separator(),
    menu.tlink("acc&profits", II("Profits")),
    menu.separator2(),
    menu.tlink("acc&ibex", "Ibex"),
    menu.separator(),
    menu.tlink("acc&speedometers", II("Speedometers")),
    menu.separator(),
    menu.tlink("acc&execution", II("Execution")),
    menu.separator(),
    menu.tlink("acc&quotes", II("Quotes"))
  ];
  dmenu.setDownMenu(dbMenu, menu.mk(Lopts, [], "acc&" + mSel));

  switch (mSel) {
    case "companies":{ companiesPg.mk(wg);break;}
    case "balance":{ balancePg.mk(wg);break;}
    case "trading":{ tradingPg.mk(wg);break;}
    case "profits":{ profitsPg.mk(wg);break;}
    case "ibex":{ ibexPg.mk(wg);break;}
    case "speedometers":{ speedometersPg.mk(wg);break;}
    case "execution":{ executionPg.mk(wg);break;}
    case "quotes":{ quotesPg.mk(wg);break;}
    default:{ balancePg.mk(wg);} 
  }
};
