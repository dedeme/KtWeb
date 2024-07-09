import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as menu from  "../../libdm/menu.js";
import * as dmenu from  "../../wgs/dmenu.js";
import * as nicksPg from  "../../pgs/settings/nicks/nicksPg.js";
import * as annsPg from  "../../pgs/settings/acc/annsPg.js";
import * as calendarPg from  "../../pgs/settings/calendar/calendarPg.js";
import * as serversPg from  "../../pgs/settings/serversPg.js";
import * as investorsPg from  "../../pgs/settings/investorsPg.js";
import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);






export  function mk(wg,  dbmenu,  LcPath)  {sys.$params(arguments.length, 3);
  if (!sys.asBool(LcPath)) arr.push(LcPath,"nicks");
  const target = "settings&" +(   
      sys.$eq(LcPath[0],"settings")|| sys.$eq(LcPath[0],"calendar")|| sys.$eq(LcPath[0],"servers")|| sys.$eq(LcPath[0],"annotations")|| sys.$eq(LcPath[0],"investors")?
        LcPath[0]:
      
        "nicks"
    );

  const Lopts = [
    dmenu.mkHiddenButton(dbmenu),
    menu.separator2(),
    menu.tlink("settings&nicks", II("Nicks")),
    menu.separator(),
    menu.tlink("settings&servers", II("Servers")),
    menu.separator2(),
    menu.tlink("settings&annotations", II("Annotations")),
    menu.separator2(),
    menu.tlink("settings&investors", II("Investors"))
  ];

  const Ropts = [
    menu.tlink("settings&calendar", II("Calendar"))
  ];

  dmenu.setDownMenu(dbmenu,menu.mk(Lopts, Ropts, target));

  switch (target) {
    case "settings&servers":{
      serversPg.mk(wg, "");break;}
    case "settings&annotations":{
      annsPg.mk(wg, "");break;}
    case "settings&investors":{
      investorsPg.mk(wg);break;}
    case "settings&calendar":{
      calendarPg.mk(wg);break;}
    default:{
      nicksPg.mk(wg);}
  }
};
