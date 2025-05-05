import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as i18n from  "../i18n.js";
import * as cts from  "../cts.js";
import * as msgPg from  "../pgs/msgPg.js";
import * as doc from  "../data/doc.js";
import * as docEntry from  "../data/docEntry.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";


export  async  function mk(wg, pack, path)  {sys.$params(arguments.length, 3);
  const {error,  D} = await  client.send({
    prg: "KuttDoc",
    source: "ModulePg",
    rq: "doc",
    pack: pack,
    pth: path
  });

  if (sys.$neq(error , "")) {
    msgPg.mk(wg, i18n.fmt("[%0] %1.", [path, error]), true);
    return;
  }

  arr.sort(
    D[doc.Imports],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );
  arr.sort(
    D[doc.Types],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );
  arr.sort(
    D[doc.Values],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );
  arr.sort(
    D[doc.Enumerations],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );
  arr.sort(
    D[doc.Indexeds],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );
  arr.sort(
    D[doc.Functions],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );

  
   function index() {sys.$params(arguments.length, 0);
    
     function block( Entries, name)  {sys.$params(arguments.length, 2);
      if (!sys.asBool(Entries))  return [];

      const R = [];
      arr.push(R,Q("tr")
        .add(Q("td")
          .att("colspan", "3")
          .html("<i>" + name + "</i>"))
      );
      const size =sys.$checkNull( arr.size(Entries));
      const h = Math.floor((size - 1) / 3) + 1;
      for (let y = 0;y < h; ++y) {
        arr.push(R,Q("tr")
          .adds(iter.map(iter.$range(0,3), function(x)  {sys.$params(arguments.length, 1);
              const pos = x * h + y;
              if (pos < size) {
                 const e =sys.$checkNull( Entries[pos]);
                 return Q("td")
                  .add(Q("a")
                    .att("href", "#hp:" + e[docEntry.name])
                    .html(tab + e[docEntry.name]))
                ;
              } else {
                 return Q("td");
              }
            }))
        );
      }
       return R;
    };

     return Q("div")
      .add(Q("p")
        .klass("frame2")
        .html("<b>" + path + "</b>"))
      .add(Q("table")
        .klass("main")
        .adds(block(D[doc.Types], "Types"))
        .adds(block(D[doc.Values], "Values"))
        .adds(block(D[doc.Enumerations], "Enumerations"))
        .adds(block(D[doc.Indexeds], "Indexeds"))
        .adds(block(D[doc.Functions], "Functions")))
    ;
  };

  
   function overview()  {sys.$params(arguments.length, 0);
     return Q("div")
      .add(Q("p")
        .klass("frame")
        .html("<b>" + II("Overview") + "</b>"))
      .adds(mkHelp(D[doc.docTx]))
      .add(Q("p")
        .html("<b>" + II("File") + "</b>")
        .add(Q("br"))
        .add(Q("a")
          .att("href", "?" + pack + "@" + path + "&hp:1")
          .text(path + ".kutt")))
        .add(Q("p")
          .klass("frame")
          .html(arr.join(arr.map(D[doc.Imports], function( e)  {sys.$params(arguments.length, 1);
             return "<tt>" + e[docEntry.code] + "</tt>";}
          ), "<br>")))
      .add(Q("hr"))
    ;
  };

  
   function body()  {sys.$params(arguments.length, 0);
    
     function block( Entries, name)  {sys.$params(arguments.length, 2);
      
       function endEntry( e)  {sys.$params(arguments.length, 1);
        const isNewLineV = [true];
        const bfV = [""];
        const code =sys.$checkNull( e[docEntry.code]);
        for (let i = 0;i < str.len(code); ++i) {
          const ch =sys.$checkNull( code[i]);
          if (isNewLineV[0] && sys.$neq(ch , "\n")) {
            if (ch <= " ") {
              bfV[0] += "&nbsp;";
            } else {
              bfV[0] += ch;
              isNewLineV[0] = false;
            }
          } else if (sys.$eq(ch , "\n")) {
            bfV[0] += "<br>";
            isNewLineV[0] = true;
          } else {
            bfV[0] += ch;
          }
        }
         return Q("div")
          .add(Q("p")
            .html("<tt>" + bfV[0] + "</tt>"))
          .adds(mkHelp(e[docEntry.docTx]))
          .add(Q("hr"))
        ;
      };

       return arr.map(Entries,function( e)  {sys.$params(arguments.length, 1);
         return Q("div")
          .add(Q("h3")
            .att("id", "hp:" + e[docEntry.name])
            .add(Q("span")
              .text(name + " "))
            .add(Q("a")
              .att(
                "href",
                "?" + pack + "@" + path + "&hp:" + e[docEntry.link]
              ).text(e[docEntry.name])))
          .add(endEntry(e))
        ;}
      );
    };

     return Q("div")
      .adds(block(D[doc.Types], "Type"))
      .adds(block(D[doc.Values], "Value"))
      .adds(block(D[doc.Enumerations], "Enumeration"))
      .adds(block(D[doc.Indexeds], "Indexed"))
      .adds(block(D[doc.Functions], "Function"))
    ;
  };

  const barIx = str.lastIndex(path, "/") + 1;
  Q("@title").text(cts.appName + " - " + sys.$slice(path,barIx,null));

  wg
    .removeAll()
    .add(index())
    .add(overview())
    .add(Q("hr").klass("frame"))
    .add(body())
    .adds(iter.map(iter.$range(0,30), function(i)  {sys.$params(arguments.length, 1);  return Q("p").html("&nbsp;");}))
  ;

  const lc =sys.$checkNull( window.location.href);
  const ix =sys.$checkNull( str.index(lc, "#"));
  if (sys.$neq(ix ,  -1)) {
    const tg = sys.$slice(lc,ix,null);
    if (sys.$neq(tg , "#")) {
      const eOp = sys.$null((Q(tg).e));
      if (!sys.asBool(!sys.asBool(eOp))) eOp[0].scrollIntoView(true);
    }
  }

};


 function mkHelp(tx)  {sys.$params(arguments.length, 1);
  if (sys.$eq(str.trim(tx) , ""))  return [];

  const html =sys.$checkNull( str.replace(str.replace(tx, "&", "&amp;"), "<", "&lt;"));
  const R = [];
  arr.push(R,Q("table")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame")
        .style("white-space: nowrap")
        .add(Q("pre")
          .style("font-size: 14px;")
          .html(html))))
  );
   return R;
};
