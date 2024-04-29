import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";
import * as cts from  "../cts.js";
import * as msgPg from  "../pgs/msgPg.js";
import * as doc from  "../data/doc.js";
import * as docEntry from  "../data/docEntry.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const tab =sys.$checkNull( "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");


 function fsort( e1,  e2)  {sys.$params(arguments.length, 2);  return e1[docEntry.name] < e2[docEntry.name];};


export  async  function mk(wg, module, path)  {sys.$params(arguments.length, 3);

   const {docOp} = await  client.send({
    prg: "CDoc",
    source: "ModulePg",
    rq: "doc",
    pack: module,
    path: path
  });

  if (!sys.asBool(docOp)) {
    msgPg.mk(wg, i18n.fmt(II("[%0] Kut file not found."), [path]), true);
    return;
  }

   const dc =sys.$checkNull( docOp[0]);

  arr.sort(dc[doc.Enums], fsort);
  arr.sort(dc[doc.Structs], fsort);
  arr.sort(dc[doc.Unions], fsort);
  arr.sort(dc[doc.Typedefs], fsort);
  arr.sort(dc[doc.Functions], fsort);
  arr.sort(dc[doc.Vars], fsort);
  arr.sort(dc[doc.Defines], fsort);

  Q("@title").text(cts.appName + " - " + arr.peek(str.split(path, "/")));

  
   function index()  {sys.$params(arguments.length, 0);
    
     function block( Entries, name)  {sys.$params(arguments.length, 2);
      const sz =sys.$checkNull( arr.size(Entries));
      if (sys.$eq(sz , 0))  return [];

      const R =sys.$checkNull( []); 
      arr.push(R,Q("tr")
        .add(Q("td")
          .att("colspan", "3")
          .html("<i>" + name + "</i>"))
      );
      const h =sys.$checkNull( Math.floor((sz - 1) / 3) + 1);
      for (let y = 0;y < h; ++y) {
        arr.push(R,Q("tr")
          .adds(iter.map(iter.$range(0,3), function(x)  {sys.$params(arguments.length, 1);
              const pos =sys.$checkNull( x * h + y);
              if (pos < sz) {
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
        .adds(block(dc[doc.Defines], "Defines"))
        .adds(block(dc[doc.Enums], "Enums"))
        .adds(block(dc[doc.Structs], "Structs"))
        .adds(block(dc[doc.Unions], "Unions"))
        .adds(block(dc[doc.Typedefs], "Typedefs"))
        .adds(block(dc[doc.Functions], "Functions"))
        .adds(block(dc[doc.Vars], "Variables")))
    ;
  };

  
   function overview()  {sys.$params(arguments.length, 0);
     return Q("div")
      .add(Q("p")
        .klass("frame")
        .html("<b>" + II("Overview") + "</b>"))
      .adds(mkHelp(dc[doc.docTx]))
      .add(Q("p")
        .html("<b>" + II("File") + "</b>")
        .add(Q("br"))
        .add(Q("a")
          .att("href", "?" + module + "@" + path + "&hp:")
          .text(path + ".h"))
        .add(Q("span")
          .text(" | "))
        .add(Q("a")
          .att("href", "?" + module + "@" + path + "&hp::")
          .text(path + ".c")))
      .add(Q("hr"))
    ;
  };

  
   function body()  {sys.$params(arguments.length, 0);
    
     function block( Entries, name, isFunction)  {sys.$params(arguments.length, 3);
      
       function endEntry( e)  {sys.$params(arguments.length, 1);
        const isNewLineV =sys.$checkNull( [true]);
        const Bf2 =sys.$checkNull( []); 
        const code =sys.$checkNull( str.replace(
          str.replace(e[docEntry.code], "&", "&amp;"),
          "<", "&lt;"
        ));
        for (let i = 0;i < str.len(code); ++i) {
          const ch =sys.$checkNull( code[i]);
          if (isNewLineV[0] && sys.$neq(ch , "\n")) {
            if (ch <= " ") {
              arr.push(Bf2,"&nbsp;");
            } else {
              arr.push(Bf2,ch);
              isNewLineV[0] =sys.$checkExists(isNewLineV[0],sys.$checkNull( false));
            }
          } else if (sys.$eq(ch , "\n")) {
            arr.push(Bf2,"<br>");
            isNewLineV[0] =sys.$checkExists(isNewLineV[0],sys.$checkNull( true));
          } else {
            arr.push(Bf2,ch);
          }
        }
         return Q("div")
          .add(Q("p")
            .html("<tt>" + arr.join(Bf2,"") + "</tt>"))
          .adds(mkHelp(e[docEntry.doc]))
          .add(Q("hr"))
        ;
      };

       return arr.map(Entries,function( e)  {sys.$params(arguments.length, 1);  return Q("div")
          .add(Q("h3")
            .att("id", "hp:" + e[docEntry.name])
            .add(Q("span")
              .text(name + " "))
            .add(Q("a")
              .att(
                "href",
                "?" + module + "@" + path + "&hp" +
                  (isFunction ? "::" : ":") + e[docEntry.link]
              ).text(e[docEntry.name])))
          .add(endEntry(e))
        ;});
    };

     return Q("div")
      .adds(block(dc[doc.Defines], "Defines", false))
      .adds(block(dc[doc.Enums], "Enums", false))
      .adds(block(dc[doc.Structs], "Structs", false))
      .adds(block(dc[doc.Unions], "Unions", false))
      .adds(block(dc[doc.Typedefs], "Typedefs", false))
      .adds(block(dc[doc.Functions], "Functions", true))
      .adds(block(dc[doc.Vars], "Variables", false))
    ;
  };

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
      const eOp =sys.$checkNull( sys.$null((window.document.getElementById(sys.$slice(tg,1,null)))));
      if (!sys.asBool(!sys.asBool(eOp))) eOp[0].scrollIntoView(true);
    }
  }

};


 function mkHelp(tx)  {sys.$params(arguments.length, 1);
  if (sys.$eq(str.trim(tx) , ""))  return [];

  const R =sys.$checkNull( []); 
  const Tx1 =sys.$checkNull( []); 
  const Tx2 =sys.$checkNull( []); 
  const TxxV =sys.$checkNull( [Tx1]);
  for (const l  of sys.$forObject( str.split(tx, "\n"))) {
    if (str.starts(l, "  ")) {
      const ix =sys.$checkNull( str.index(l, ":"));
      if (sys.$neq(ix ,  -1)) {
        const word =sys.$checkNull( str.trim(sys.$slice(l,null,ix)));
        if (sys.$eq(str.index(word," ") ,  -1)) {
          TxxV[0] =sys.$checkExists(TxxV[0],sys.$checkNull( Tx2));
        }
      }
    }
    arr.push(TxxV[0], l);
  }

  arr.push(R,Q("table")
    .add(Q("tr")
      .add(Q("td")
        .klass("GrFrame")
        .style("white-space: nowrap")
        .add(Q("pre")
          .style("font-size: 14px;")
          .html(str.replace(
            str.replace(arr.join(Tx1,"\n"), "&", "&amp;"),
            "<", "&lt;")))))
  );
  if (arr.size(Tx2) > 0)
    arr.push(R,Q("table")
      .add(Q("tr")
        .add(Q("td")
          .style("white-space: nowrap")
          .add(Q("div")
            .klass("frame")
            .style("padding-right:20px")
              .add(Q("pre")
                .html(str.replace(
                  str.replace(arr.join(Tx2,"\n"), "&", "&amp;"),
                  "<", "&lt;"))))))
    );

   return R;
};
