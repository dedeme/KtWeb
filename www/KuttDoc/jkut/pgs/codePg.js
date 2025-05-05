import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as i18n from  "../i18n.js";
import * as cts from  "../cts.js";
import * as msgPg from  "../pgs/msgPg.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const Reserved =sys.$checkNull( str.split(
  "break catch continue default else false finally for if import " +
  "return switch throw trace true try while",
  " "
));

 const Lib =sys.$checkNull( str.split(
  "arr b64 bytes cryp dic file iter js math path regex str sys tcp " +
  "thread time",
  " "
));


const stCode = 0;
const stLong = stCode + 1; 
const stQ = stLong + 1; 
const stType = stQ + 1; 


export  async  function mk(wg, pack, path, anchor)   {sys.$params(arguments.length, 4);
  const prefix =sys.$checkNull( anchor.startsWith("hp::") ? "hp::" : "hp:");
  const leftV = [""];
  const rightV = [""];
  const lineCounterV = [0];
  const charQuotesV = [""];
  const stateV = [stCode];

  
   function newLine() {sys.$params(arguments.length, 0);
    lineCounterV[0] += 1;
    rightV[0] += "<br>";
    if (sys.$eq(anchor , "hp:" + lineCounterV[0]))
      leftV[0] += "<span id='" + anchor + "'></spam>";
    leftV[0] += "<span style='font-family: monospace;font-size: 12px;" +
      "background-color: rgb(215, 215, 215);color: #998866;'>" +
      formatN(lineCounterV[0]) +
      "</span><br>";
  };

  
   function processCode(l)  {sys.$params(arguments.length, 1);
    const rV = [toHtml(l)];

    for (const w  of sys.$forObject( Reserved)) {
      const ixV = [str.index(rV[0], w)];
      while (sys.$neq(ixV[0] ,  -1)) {
        const ix1 =sys.$checkNull( ixV[0]);
        const ix2 = ix1 + w.length;
        if ((sys.$eq(ix1 , 0) || isNotId(rV[0][ix1 - 1])) &&
            (sys.$eq(ix2 , str.len(rV[0])) || isNotId(rV[0][ix2]))
        ) {
          rV[0] = sys.$slice(rV[0],null,ixV[0]) + "<span==>" + w +
            "</span>" + sys.$slice(rV[0],ixV[0] + w.length,null);
        }
        ixV[0] =sys.$checkNull( str.indexFrom(rV[0], w, ix2 + 25));
      }
    }
    rV[0] =sys.$checkNull( str.replace(rV[0], "<span==>", "<span class='reserved'>"));

    for (const w  of sys.$forObject( Lib)) {
      const ixV = [str.index(rV[0], w)];
      while (sys.$neq(ixV[0] ,  -1)) {
        const ix1 =sys.$checkNull( ixV[0]);
        const ix2 = ix1 + w.length;
        if ((sys.$eq(ix1 , 0) || isNotId(rV[0][ix1 - 1])) &&
            (sys.$eq(ix2 , str.len(rV[0])) || isNotId(rV[0][ix2]))
        ) {
          rV[0] = sys.$slice(rV[0],null,ixV[0]) + "<span class='package'>" + w +
            "</span>" + sys.$slice(rV[0],ixV[0] + w.length,null);
        }
        ixV[0] =sys.$checkNull( str.indexFrom(rV[0], w, ix2 + 25));
      }
    }

    const stV = [0];
    rightV[0] +=sys.$checkNull( arr.reduce(str.split(rV[0], ""), "", function(seed, ch)  {sys.$params(arguments.length, 2);
      if (sys.$eq(stV[0] , 0) || sys.$eq(stV[0] , 3)) { 
        if (isNumber(ch)) {
          stV[0] = 1;
           return seed + "<span class='number'>" + ch;
        }
        if (isUpper(ch)) {
          stV[0] = 2;
           return seed + "<span class='container'>" + ch;
        }
        if (isNotId(ch)) {
          stV[0] = 3;
           return seed + ch;
        }
        stV[0] = 4;
         return seed + ch;
      }
      if (sys.$eq(stV[0] , 1)) { 
        if (isNumber(ch))
           return seed + ch;
        stV[0] = 4;
        if (isNotId(ch)) {
          stV[0] = 3;
        }
         return seed + "</span>" + ch;
      }
      if (sys.$eq(stV[0] , 2)) { 
        if (isNotId(ch)) {
          stV[0] = 3;
           return seed + "</span>" + ch;
        }
         return seed + ch;
      } 
      if (isNotId(ch))
        stV[0] = 3;
       return seed + ch;
    }));
    if (sys.$eq(stV[0] , 1) || sys.$eq(stV[0] , 2)) {
      rightV[0] += "</span>";
    }
  };

  
   function processLine(l)  {sys.$params(arguments.length, 1);
    if (sys.$eq(stateV[0] , stType)) { 
      const lTrim =sys.$checkNull( str.trim(l));
      if (str.starts(lTrim, "//")){
        rightV[0] += "<span class='type'>" + toHtml(l) + "</span>";
        newLine();
        return;
      } else {
        stateV[0] = stCode;
        
      }
    }

    if (sys.$eq(stateV[0] , stLong)) { 
      const ix =sys.$checkNull( l.indexOf("*/"));
      if (sys.$neq(ix ,  -1)) {
        stateV[0] = stCode;
        rightV[0] += toHtml(sys.$slice(l,null,ix + 2)) + "</span>";
        processLine(sys.$slice(l,ix + 2,null));
      } else {
        rightV[0] +=sys.$checkNull( toHtml(l));
        newLine();
      }
    } else if (sys.$eq(stateV[0] , stQ)) { 
      const qix =sys.$checkNull( l.indexOf(charQuotesV[0]));
      if (sys.$eq(qix ,  -1)) {
        if (sys.$eq(str.len(charQuotesV[0]) , 3)) {
          rightV[0] +=sys.$checkNull( toHtml(l));
          newLine();
        } else {
          rightV[0] += toHtml(l) + "</span>";
          newLine();
          stateV[0] = stCode;
        }
        return;
      }
      if (sys.$eq(charQuotesV[0].length , 3)) {
        stateV[0] = stCode;
        rightV[0] += toHtml(sys.$slice(l,null,qix + 3)) + "</span>";
        processLine(sys.$slice(l,qix + 3,null));
      } else {
        const bix =sys.$checkNull( l.indexOf("\\"));
        if (sys.$neq(bix ,  -1) && bix < qix) {
          rightV[0] +=sys.$checkNull( toHtml(sys.$slice(l,null,bix + 2)));
          processLine(sys.$slice(l,bix + 2,null));
        } else {
          stateV[0] = stCode;
          rightV[0] += toHtml(sys.$slice(l,null,qix + 1)) + "</span>";
          processLine(sys.$slice(l,qix + 1,null));
        }
      }
    } else { 
      if (sys.$eq(l.trim() , "")) {
        newLine();
        return;
      }
      const rV = [0];
      const Pos = [2000];
      const ixV = [l.indexOf("/*")]; 
      if (sys.$neq(ixV[0] ,  -1)) {
        rV[0] = 1;
        Pos[0] =sys.$checkNull( ixV[0]);
      }
      ixV[0] =sys.$checkNull( l.indexOf("//")); 
      if (sys.$neq(ixV[0] ,  -1) && ixV[0] < Pos[0]) {
        rV[0] = 2;
        Pos[0] =sys.$checkNull( ixV[0]);
      }
      ixV[0] =sys.$checkNull( l.indexOf("\"")); 
      if (sys.$neq(ixV[0] ,  -1) && ixV[0] < Pos[0]) {
        rV[0] = 3;
        Pos[0] =sys.$checkNull( ixV[0]);
      }
      ixV[0] =sys.$checkNull( l.indexOf("'")); 
      if (sys.$neq(ixV[0] ,  -1) && ixV[0] < Pos[0]) {
        rV[0] = 4;
        Pos[0] =sys.$checkNull( ixV[0]);
      }

      if (sys.$eq(rV[0] , 1)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        const l2 = sys.$slice(l,Pos[0] + 2,null);
        if (str.starts(l2, "*")) {
          rightV[0] += "<span class='comment'>/*";
          stateV[0] = stLong;
        } else {
          rightV[0] += "<span class='comment'>/*";
          stateV[0] = stLong;
        }
        processLine(l2);
      } else if (sys.$eq(rV[0] , 2)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        const l2 = sys.$slice(l,Pos[0] + 2,null);
        if (str.starts(l2, ":")) {
          rightV[0] += "<span class='type'>//";
          stateV[0] = stType;
        } else {
          rightV[0] += "<span class='comment'>//";
        }
        rightV[0] += toHtml(l2) + "</span>";
        newLine();
      } else if (sys.$eq(rV[0] , 3)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        stateV[0] = stQ;
        const l2 = sys.$slice(l,Pos[0] + 1,null);
        if (str.starts(l2, "\"\"")) {
          charQuotesV[0] = "\"\"\"";
          rightV[0] += "<span class='quote'>\"\"\"";
          processLine(sys.$slice(l2,2,null));
        } else {
          charQuotesV[0] = "\"";
          rightV[0] += "<span class='quote'>\"";
          processLine(l2);
        }
      } else if (sys.$eq(rV[0] , 4)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        stateV[0] = stQ;
        charQuotesV[0] = "'";
        rightV[0] += "<span class='quote'>'";
        processLine(sys.$slice(l,Pos[0] + 1,null));
      } else {
        processCode(l);
        newLine();
      }
    }
  };

  
   function process(code)  {sys.$params(arguments.length, 1);
    for (const l  of sys.$forObject( code.split("\n"))) processLine(l);
  };

  

  
  const {Mods, codeOp} = await  client.send({
    prg: "KuttDoc",
    source: "CodePg",
    rq: "code",
    pack:pack,
    pth: path
  });

  if (!sys.asBool(codeOp)) {
    msgPg.mk(wg, i18n.fmt(II("[%0] Kutt file not found."), [path]), true);
    return;
  }

  arr.cat(Lib,Mods);
  process(codeOp[0]);

  const barIx = str.lastIndex(path, "/") + 1;
  Q("@title").text(
    cts.appName + " - " + sys.$slice(path,barIx,null) + ".kut"
  );

  wg
    .removeAll()
    .add(Q("table")
      .att("id", prefix)
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .add(Q("a")
            .att("href", "?" + pack + "@" + path)
            .text(path)))))
    .add(Q("table")
      .style("boder:0;width:100%")
      .att("cellspacing", "0")
      .add(Q("tr")
        .add(Q("td")
          .klass("prel")
          .style("width:10px")
          .html(leftV[0]))
        .add(Q("td")
          .klass("prer")
          .html(rightV[0]))))
    .adds(iter.map(iter.$range(0,30), function(i)  {sys.$params(arguments.length, 1);  return Q("p").html("&nbsp;");}))
  ;

  const tgOp = sys.$null((Q("#" + anchor).e));
  if (!sys.asBool(!sys.asBool(tgOp))) tgOp[0].scrollIntoView(true);
};


 function isNumber(ch)  {sys.$params(arguments.length, 1);  return ch >= "0" && ch <= "9";};


 function isUpper(ch)  {sys.$params(arguments.length, 1);  return (ch >= "A" && ch <= "Z");};


 function isLetter(ch)  {sys.$params(arguments.length, 1);  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");};


 function isNotId(ch)  {sys.$params(arguments.length, 1);  return !sys.asBool(isNumber(ch)) && !sys.asBool(isLetter(ch));};


 function toHtml(s)  {sys.$params(arguments.length, 1);  return s
  .split("&").join("&amp;")
  .split(" ").join("&nbsp;")
  .split("<").join("&lt;")
;};


 function formatN(n)  {sys.$params(arguments.length, 1);
  const r = "" + n;
   return iter.reduce(
    iter.$range(0, 4 - str.len(r)), r, function(seed, i)  {sys.$params(arguments.length, 2);  return "&nbsp;" + seed;}
  );
};
