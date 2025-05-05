import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as captcha from  "../libdm/captcha.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);







export  function mk(wg, app, fnOk)  {sys.$params(arguments.length, 3);
  
   function mkCaptcha()  {sys.$params(arguments.length, 0);
     return captcha.mk(app + "__captcha", 3, "#f0f0f0", "#c0c0c0");};

  const captchaV = [mkCaptcha()];
  const failedV = [false];

  const showV = [[]];

  

  
   function changeLanguage(ev)  {sys.$params(arguments.length, 1);
    if (sys.$eq(i18n.getLang() , "es")) i18n.en();
    else i18n.es();
    showV[0]();
  };

  
   async  function send(user, pass, withExpiration)  {sys.$params(arguments.length, 3);
     const cpt =sys.$checkNull( captchaV[0]);
    if (sys.$eq(user , "")) {
      ui.alert(II("User name is missing"));
      return;
    }
    if (sys.$eq(pass , "")) {
      ui.alert(II("Password is missing"));
      return;
    }

    if (captcha.isUpLimit(cpt) && !sys.asBool(captcha.check(cpt))) {
      ui.alert(II("Grey squares checks are wrong"));
      captchaV[0] =sys.$checkExists(captchaV[0],sys.$checkNull( mkCaptcha()));
      showV[0]();
      return;
    }

    const ok =sys.$checkNull( await  client.authentication(user, pass, withExpiration));
    if (ok) {
      captcha.reset(cpt);
      fnOk();
    } else {
      failedV[0] =sys.$checkExists(failedV[0], true);
      captcha.increment(cpt);
      captchaV[0] =sys.$checkExists(captchaV[0],sys.$checkNull( mkCaptcha()));
      showV[0]();
    }
  };

  

  showV[0] =sys.$checkExists(showV[0], function()  {sys.$params(arguments.length, 0);
     const cpt =sys.$checkNull( captchaV[0]);
    const pass =sys.$checkNull( ui.pass("accept").att("id", "autofocus"));
    const userIn =sys.$checkNull( ui.field("autofocus").value("admin"));
    const persistent =sys.$checkNull( Q("input")
      .att("type", "checkbox")
      .style("vertical-align: middle")
      .checked(true))
    ;
    const accept =sys.$checkNull( Q("button")
      .att("id", "accept")
      .on("click", function(e)  {sys.$params(arguments.length, 1);
        send(
          str.trim(userIn.getValue()),
          str.trim(pass.getValue()),
          !sys.asBool(persistent.isChecked())
        );}
      )
      .text(II("Accept")))
    ;
    const Rows = [
      Q("tr")
        .add(Q("td")
          .style("padding: 10px 0px 0px 10px;text-align:right;")
          .html(II("User")))
        .add(Q("td")
          .style("padding: 10px 10px 0px 10px;")
          .add(userIn)),
      Q("tr")
        .add(Q("td")
          .style("padding: 10px 0px 0px 10px;text-align:right;")
          .html(II("Password")))
        .add(Q("td")
          .style("padding: 10px 10px 5px 10px;")
          .add(pass)),
      Q("tr")
        .add(Q("td")
          .att("colspan", 2)
          .style("border-top:1px solid #c9c9c9;" +
                 "padding: 5px 10px 10px;text-align:right;")
          .add(Q("table")
            .style(
              "border-collapse : collapse;" +
              "border : 0px;" +
              "width : 100%;")
            .add(Q("tr")
              .add(Q("td")
                .att("align", "center")
                .att("colspan", 2)
                .add(persistent)
                .add(Q("span")
                  .html("&nbsp;" + II("Keep connected")))))
            .add(Q("tr")
              .add(Q("td")
                .add(ui.link(changeLanguage)
                  .att("class", "link")
                  .html(sys.$eq(i18n.getLang , "en") ? "ES" : "EN")))
              .add(Q("td").att("align", "right").add(accept)))))
    ];

    if (failedV[0]) {
      arr.push(Rows,
        Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .style("border-top:1px solid #c9c9c9;" +
                   "adding: 10px 10px 10px;text-align:right;")
            .add(Q("table")
              .att("align", "center")
              .style(
                "background-color: rgb(250, 250, 250);" +
                "border: 1px solid rgb(110,130,150);" +
                "font-family: sans;font-size: 14px;" +
                "padding: 4px;border-radius: 4px;")
              .add(Q("tr")
                .add(Q("td")
                  .html(II("Wrong password"))))))
      );
    }

    if (captcha.isUpLimit(cpt)) {
      arr.push(Rows,
        Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .att("align", "center")
            .add(cpt[captcha.mkWg]))
      );
      arr.push(Rows,
        Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .style("padding: 5px 0px 5px 10px;text-align:center;")
            .html(II("Check gray squares")))
      );
    }

    wg
      .removeAll()
      .add(Q("div")
        .klass("head")
        .html("&nbsp;<br>" + app + "<br>&nbsp;"))
      .add(Q("table")
        .att("align", "center")
        .style(
          "background-color: #f8f8f8;" +
          "border-collapse: collapse;" +
          "padding: 10px;" +
          "border: 1px solid rgb(110,130,150);")
        .add(Q("tr")
          .add(Q("td")
            .att("colspan", 2)
            .style(
              "background-color:#e8e8e8;" +
              "border-bottom:1px solid #c9c9c9;" +
              "padding: 10px;" +
              "color:#505050;"
            )
            .html("<big><big><b>" + II("Login") + "</big></big></b>")))
        .adds(Rows));

    pass.e.focus();
  });

  showV[0]();
};
