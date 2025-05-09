import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as menu from  "../libdm/menu.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);




 function mkUpMenu(selected)  {sys.$params(arguments.length, 1);
  const Lopts = [
    menu.tlink("home", II("Home")),
    menu.separator(),
    menu.tlink("market", II("Market"))
  ];

   return menu.mk(Lopts, [], selected);
};






export  function mk(wg, selected)  {sys.$params(arguments.length, 2);
  const upDiv =sys.$checkNull( Q("div").style("padding:0px"));
  const upMenu =sys.$checkNull( mkUpMenu(selected));
  const downDiv =sys.$checkNull( Q("div"));
  const hiddenV = [false];

  const showV = [[]];

  

  
   function change(ev)  {sys.$params(arguments.length, 1);
    hiddenV[0] =sys.$checkExists(hiddenV[0], !sys.asBool(hiddenV[0]));
    upDiv.removeAll().style("padding:0px");
    if (!sys.asBool(hiddenV[0])) upDiv.add(upMenu);
  };

  
  
   function setDownMenu(menuWg)  {sys.$params(arguments.length, 1);
    downDiv
      .removeAll()
      .add(menuWg)
    ;
    hiddenV[0] =sys.$checkExists(hiddenV[0], true);
    upDiv.removeAll().style("padding:0px");
  };

  

  
  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
    wg
      .removeAll()
      .add(upDiv
        .removeAll()
        .style("padding:0px")
        .add(upMenu))
      .add(downDiv)
    ;
  });

  showV[0]();

   return {setDownMenu:setDownMenu, change:change};
};



export  function setDownMenu(odmenu, downMenu)  {sys.$params(arguments.length, 2);  return odmenu.setDownMenu(downMenu);};



export  function mkHiddenButton(odmenu)  {sys.$params(arguments.length, 1);  return menu.mkEntry(
    [],
    ui.link(odmenu.change)
      .add(ui.img("menu")
        .style("vertical-align:middle"))
  );};
