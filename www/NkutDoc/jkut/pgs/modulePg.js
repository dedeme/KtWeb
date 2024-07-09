import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";
import * as cts from  "../cts.js";
import * as msgPg from  "../pgs/msgPg.js";
import * as doc from  "../data/doc.js";
import * as docEntry from  "../data/docEntry.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const tab =sys.$checkNull( "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");


export  async  function mk(wg, pack, path)  {sys.$params(arguments.length, 3);
  
   const {docOp} = await  client.send({
    prg: cts.appName,
    source: "ModulePg",
    rq: "doc",
    pack: pack,
    pth: path
  });

  if (!sys.asBool(docOp)) {
    msgPg.mk(wg, i18n.fmt(II("[%0] Jkut file not found."), [path]), true);
    return;
  }

   const d =sys.$checkNull( docOp[0]);

  arr.sort(
    d[doc.Indexeds],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );
  arr.sort(
    d[doc.Functions],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );
  arr.sort(
    d[doc.Values],
    function( e1,  e2)  {sys.$params(arguments.length, 2);  return str.less(e1[docEntry.name], e2[docEntry.name]);}
  );

  
   function index() {sys.$params(arguments.length, 0);
    
     function block( Entries, name)  {sys.$params(arguments.length, 2);
      if (!sys.asBool(Entries))  return [];

      const R =sys.$checkNull( []);
      arr.push(R,Q("tr")
        .add(Q("td")
          .att("colspan", "3")
          .html("<i>" + name + "</i>"))
      );
      const size =sys.$checkNull( arr.size(Entries));
      const h =sys.$checkNull( Math.floor((size - 1) / 3) + 1);
      for (let y = 0;y < h; ++y) {
        arr.push(R,Q("tr")
          .adds(iter.map(iter.$range(0,3), function(x)  {sys.$params(arguments.length, 1);
              const pos =sys.$checkNull( x * h + y);
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
        .adds(block(d[doc.Values], "Values"))
        .adds(block(d[doc.Indexeds], "Indexeds"))
        .adds(block(d[doc.Functions], "Functions")))
    ;
  };

  
   function overview()  {sys.$params(arguments.length, 0);
     return Q("div")
      .add(Q("p")
        .klass("frame")
        .html("<b>" + II("Overview") + "</b>"))
      .adds(mkHelp(d[doc.docTx]))
      .add(Q("p")
        .html("<b>" + II("File") + "</b>")
        .add(Q("br"))
        .add(Q("a")
          .att("href", "?" + pack + "@" + path + "&hp:")
          .text(path + ".jkut")))
      .add(Q("hr"))
    ;
  };

  
   function body()  {sys.$params(arguments.length, 0);
    
     function block( Entries, name, isFunction)  {sys.$params(arguments.length, 3);
      
       function endEntry( e)  {sys.$params(arguments.length, 1);
        const isNewLineV =sys.$checkNull( [true]);
        const bfV =sys.$checkNull( [""]);
        const code =sys.$checkNull( e[docEntry.code]);
        for (let i = 0;i < str.len(code); ++i) {
          const ch =sys.$checkNull( code[i]);
          if (isNewLineV[0] && sys.$neq(ch , "\n")) {
            if (ch <= " ") {
              bfV[0] +=sys.$checkExists(bfV[0],sys.$checkNull( "&nbsp;"));
            } else {
              bfV[0] +=sys.$checkExists(bfV[0],sys.$checkNull( ch));
              isNewLineV[0] =sys.$checkExists(isNewLineV[0],sys.$checkNull( false));
            }
          } else if (sys.$eq(ch , "\n")) {
            bfV[0] +=sys.$checkExists(bfV[0],sys.$checkNull( "<br>"));
            isNewLineV[0] =sys.$checkExists(isNewLineV[0],sys.$checkNull( true));
          } else {
            bfV[0] +=sys.$checkExists(bfV[0],sys.$checkNull( ch));
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
      .adds(block(d[doc.Values], "Value", false))
      .adds(block(d[doc.Indexeds], "Indexed", false))
      .adds(block(d[doc.Functions], "Function", true))
    ;
  };

  const barIx =sys.$checkNull( str.lastIndex(path, "/") + 1);
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
    const tg =sys.$checkNull( sys.$slice(lc,ix,null));
    if (sys.$neq(tg , "#")) {
      const eOp =sys.$checkNull( sys.$null((Q(tg).e)));
      if (!sys.asBool(!sys.asBool(eOp))) eOp[0].scrollIntoView(true);
    }
  }

};


 function mkHelp(tx)  {sys.$params(arguments.length, 1);
  if (sys.$eq(str.trim(tx) , ""))  return [];

  const html =sys.$checkNull( str.replace(str.replace(tx, "&", "&amp;"), "<", "&lt;"));
  const r =sys.$checkNull( []);
  arr.push(r,Q("table")
    .add(Q("tr")
      .add(Q("td")
        .klass("frame")
        .style("white-space: nowrap")
        .add(Q("pre")
          .style("font-size: 14px;")
          .html(html))))
  );
   return r;
};
