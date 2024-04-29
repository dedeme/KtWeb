import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";
import * as cts from  "../cts.js";
import * as msgPg from  "../pgs/msgPg.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const reserved =sys.$checkNull( "async await break catch class continue default do else " +
  "eval false finally for if import new null return switch trace throw " +
  "true try while")
;
const lib =sys.$checkNull( "arr b64 bytes client cryp dic domo iter js math regex storage " +
  "str sys time ui")
;
const special =sys.$checkNull( "Q Math window II");


const stCode =sys.$checkNull( 0);
const stLong =sys.$checkNull( stCode + 1); 
const stQ =sys.$checkNull( stLong + 1); 


export  async  function mk(wg, pack, path, anchor)   {sys.$params(arguments.length, 4);
  const prefix =sys.$checkNull( anchor.startsWith("hp::") ? "hp::" : "hp:");
  const Left =sys.$checkNull( [""]);
  const Right =sys.$checkNull( [""]);
  const LineCounter =sys.$checkNull( [0]);
  const CharQuotes =sys.$checkNull( [""]);
  const State =sys.$checkNull( [stCode]);

  
   function newLine() {sys.$params(arguments.length, 0);
    LineCounter[0] +=sys.$checkExists(LineCounter[0],sys.$checkNull( 1));
    Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<br>"));
    Left[0] +=sys.$checkExists(Left[0],sys.$checkNull( "<span style='font-family: monospace;font-size: 12px;" +
      "background-color: rgb(215, 215, 215);color: #998866;'>" +
      formatN(LineCounter[0]) +
      "</span><br>"));
  };

  
   function processCode(l)  {sys.$params(arguments.length, 1);
    
     function makeLink(code)  {sys.$params(arguments.length, 1);
      const ix0 =sys.$checkNull( code.indexOf("="));
      const ix =sys.$checkNull( sys.$eq(ix0 ,  -1) ? code.indexOf(":") : ix0);

       return sys.$eq(ix ,  -1) ? "*" : str.trim(sys.$slice(code,null,ix));
    };

    const R =sys.$checkNull( [toHtml(l)]);

    for (const w  of sys.$forObject( reserved.split(" "))) {
      const Ix =sys.$checkNull( [str.index(R[0], w)]);
      while (sys.$neq(Ix[0] ,  -1)) {
        const ix1 =sys.$checkNull( Ix[0]);
        const ix2 =sys.$checkNull( ix1 + w.length);
        if ((sys.$eq(ix1 , 0) || isNotId(R[0][ix1 - 1])) &&
            (sys.$eq(ix1 , str.len(R[0])) || isNotId(R[0][ix2]))
        ) {
          R[0] =sys.$checkExists(R[0],sys.$checkNull( sys.$slice(R[0],null,Ix[0]) + "<span==>" + w +
            "</span>" + sys.$slice(R[0],Ix[0] + w.length,null)));
        }
        Ix[0] =sys.$checkExists(Ix[0],sys.$checkNull( str.indexFrom(R[0], w, ix2 + 25)));
      }
    }
    R[0] =sys.$checkExists(R[0],sys.$checkNull( str.replace(R[0], "<span==>", "<span class='reserved'>")));

    for (const w  of sys.$forObject( lib.split(" "))) {
      const Ix =sys.$checkNull( [str.index(R[0], w)]);
      while (sys.$neq(Ix[0] ,  -1)) {
        const ix1 =sys.$checkNull( Ix[0]);
        const ix2 =sys.$checkNull( ix1 + w.length);
        if ((sys.$eq(ix1 , 0) || isNotId(R[0][ix1 - 1])) &&
            (sys.$eq(ix1 , str.len(R[0])) || isNotId(R[0][ix2]))
        ) {
          R[0] =sys.$checkExists(R[0],sys.$checkNull( sys.$slice(R[0],null,Ix[0]) + "<span class='package'>" + w +
            "</span>" + sys.$slice(R[0],Ix[0] + w.length,null)));
        }
        Ix[0] =sys.$checkExists(Ix[0],sys.$checkNull( str.indexFrom(R[0], w, ix2 + 25)));
      }
    }

    for (const w  of sys.$forObject( special.split(" "))) {
      const Ix =sys.$checkNull( [str.index(R[0], w)]);
      while (sys.$neq(Ix[0] ,  -1)) {
        const ix1 =sys.$checkNull( Ix[0]);
        const ix2 =sys.$checkNull( ix1 + w.length);
        if ((sys.$eq(ix1 , 0) || isNotId(R[0][ix1 - 1])) &&
            (sys.$eq(ix1 , str.len(R[0])) || isNotId(R[0][ix2]))
        ) {
          R[0] =sys.$checkExists(R[0],sys.$checkNull( sys.$slice(R[0],null,Ix[0]) + "<span class='special'>" + w +
            "</span>" + sys.$slice(R[0],Ix[0] + w.length,null)));
        }
        Ix[0] =sys.$checkExists(Ix[0],sys.$checkNull( str.indexFrom(R[0], w, ix2 + 25)));
      }
    }

    const UpperBf =sys.$checkNull( [""]);
    const St =sys.$checkNull( [0]);
    Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( arr.reduce(str.split(R[0], ""), "", function(seed, ch)  {sys.$params(arguments.length, 2);
      if (sys.$eq(St[0] , 0) || sys.$eq(St[0] , 3)) { 
        if (isNumber(ch)) {
          St[0] =sys.$checkExists(St[0],sys.$checkNull( 1));
           return seed + "<span class='number'>" + ch;
        }
        if (isUpper(ch)) {
          UpperBf[0] =sys.$checkExists(UpperBf[0],sys.$checkNull( ch));
          St[0] =sys.$checkExists(St[0],sys.$checkNull( 2));
           return seed;
        }
        if (isNotId(ch)) {
          St[0] =sys.$checkExists(St[0],sys.$checkNull( 3));
           return seed + ch;
        }
        St[0] =sys.$checkExists(St[0],sys.$checkNull( 4));
         return seed + ch;
      }
      if (sys.$eq(St[0] , 1)) { 
        if (isNumber(ch))
           return seed + ch;
        St[0] =sys.$checkExists(St[0],sys.$checkNull( 4));
        if (isNotId(ch)) {
          St[0] =sys.$checkExists(St[0],sys.$checkNull( 3));
        }
         return seed + "</span>" + ch;
      }
      if (sys.$eq(St[0] , 2)) { 
        if (isNotId(ch)) {
          St[0] =sys.$checkExists(St[0],sys.$checkNull( 3));
          if (sys.$eq(str.index(" " + special + " ", " " + UpperBf[0] + " ") ,  -1))
             return seed + "<span class='container'>" + UpperBf[0] + "</span>" + ch;
          else
             return seed + UpperBf[0] + ch;
        }
        UpperBf[0] +=sys.$checkExists(UpperBf[0],sys.$checkNull( ch));
         return seed;
      } 
      if (isNotId(ch))
        St[0] =sys.$checkExists(St[0],sys.$checkNull( 3));
       return seed + ch;
    })));
    if (sys.$eq(St[0] , 1) || sys.$eq(St[0] , 2)) {
      Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "</span>"));
    }

    if (str.len(l) > 0) {
      const ch =sys.$checkNull( l[0]);
      if (ch > " " &&
        sys.$neq(ch , "(") &&
        sys.$neq(ch , "}")
      ) {
        Left[0] +=sys.$checkExists(Left[0],sys.$checkNull( "<span id='" + prefix +
          makeLink(str.trim(l)) +
          "'></span>"));
      }
    }

  };

  
   function processLine(l)  {sys.$params(arguments.length, 1);
    if (sys.$eq(State[0] , stLong)) { 
      const ix =sys.$checkNull( l.indexOf("*/"));
      if (sys.$neq(ix ,  -1)) {
        State[0] =sys.$checkExists(State[0],sys.$checkNull( stCode));
        Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(sys.$slice(l,null,ix + 2)) + "</span>"));
        processLine(sys.$slice(l,ix + 2,null));
      } else {
        Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(l)));
        newLine();
      }
    } else if (sys.$eq(State[0] , stQ)) { 
      const qix =sys.$checkNull( l.indexOf(CharQuotes[0]));
      if (sys.$eq(qix ,  -1)) {
        if (sys.$eq(str.len(CharQuotes[0]) , 3)) {
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(l)));
          newLine();
        } else {
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(l) + "</span>"));
          newLine();
          State[0] =sys.$checkExists(State[0],sys.$checkNull( stCode));
        }
        return;
      }
      if (sys.$eq(CharQuotes[0].length , 3)) {
        State[0] =sys.$checkExists(State[0],sys.$checkNull( stCode));
        Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(sys.$slice(l,null,qix + 3)) + "</span>"));
        processLine(sys.$slice(l,qix + 3,null));
      } else {
        const bix =sys.$checkNull( l.indexOf("\\"));
        if (sys.$neq(bix ,  -1) && bix < qix) {
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(sys.$slice(l,null,bix + 2))));
          processLine(sys.$slice(l,bix + 2,null));
        } else {
          State[0] =sys.$checkExists(State[0],sys.$checkNull( stCode));
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(sys.$slice(l,null,qix + 1)) + "</span>"));
          processLine(sys.$slice(l,qix + 1,null));
        }
      }
    } else { 
      if (sys.$eq(l.trim() , "")) {
        newLine();
        return;
      }
      const R =sys.$checkNull( [0]);
      const Pos =sys.$checkNull( [2000]);
      const Ix =sys.$checkNull( [l.indexOf("/*")]); 
      if (sys.$neq(Ix[0] ,  -1)) {
        R[0] =sys.$checkExists(R[0],sys.$checkNull( 1));
        Pos[0] =sys.$checkExists(Pos[0],sys.$checkNull( Ix[0]));
      }
      Ix[0] =sys.$checkExists(Ix[0],sys.$checkNull( l.indexOf("//"))); 
      if (sys.$neq(Ix[0] ,  -1) && Ix[0] < Pos[0]) {
        R[0] =sys.$checkExists(R[0],sys.$checkNull( 2));
        Pos[0] =sys.$checkExists(Pos[0],sys.$checkNull( Ix[0]));
      }
      Ix[0] =sys.$checkExists(Ix[0],sys.$checkNull( l.indexOf("\""))); 
      if (sys.$neq(Ix[0] ,  -1) && Ix[0] < Pos[0]) {
        R[0] =sys.$checkExists(R[0],sys.$checkNull( 3));
        Pos[0] =sys.$checkExists(Pos[0],sys.$checkNull( Ix[0]));
      }
      Ix[0] =sys.$checkExists(Ix[0],sys.$checkNull( l.indexOf("'"))); 
      if (sys.$neq(Ix[0] ,  -1) && Ix[0] < Pos[0]) {
        R[0] =sys.$checkExists(R[0],sys.$checkNull( 4));
        Pos[0] =sys.$checkExists(Pos[0],sys.$checkNull( Ix[0]));
      }

      if (sys.$eq(R[0] , 1)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        const l2 =sys.$checkNull( sys.$slice(l,Pos[0] + 2,null));
        if (str.starts(l2, "*")) {
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<span class='docComment'>/*"));
          State[0] =sys.$checkExists(State[0],sys.$checkNull( stLong));
        } else {
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<span class='comment'>/*"));
          State[0] =sys.$checkExists(State[0],sys.$checkNull( stLong));
        }
        processLine(l2);
      } else if (sys.$eq(R[0] , 2)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        const l2 =sys.$checkNull( sys.$slice(l,Pos[0] + 2,null));
        if (str.starts(l2, "/")) {
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<span class='docComment'>//"));
        } else {
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<span class='docComment'>//"));
        }
        Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( toHtml(l2) + "</span>"));
        newLine();
      } else if (sys.$eq(R[0] , 3)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        State[0] =sys.$checkExists(State[0],sys.$checkNull( stQ));
        const l2 =sys.$checkNull( sys.$slice(l,Pos[0] + 1,null));
        if (str.starts(l2, "\"\"")) {
          CharQuotes[0] =sys.$checkExists(CharQuotes[0],sys.$checkNull( "\"\"\""));
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<span class='quote'>\"\"\""));
          processLine(sys.$slice(l2,2,null));
        } else {
          CharQuotes[0] =sys.$checkExists(CharQuotes[0],sys.$checkNull( "\""));
          Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<span class='quote'>\""));
          processLine(l2);
        }
      } else if (sys.$eq(R[0] , 4)) { 
        processCode(sys.$slice(l,null,Pos[0]));
        State[0] =sys.$checkExists(State[0],sys.$checkNull( stQ));
        CharQuotes[0] =sys.$checkExists(CharQuotes[0],sys.$checkNull( "'"));
        Right[0] +=sys.$checkExists(Right[0],sys.$checkNull( "<span class='quote'>'"));
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

  

  const Rp =sys.$checkNull( await  client.send({
    prg: "JkutDoc",
    source: "CodePg",
    rq: "code",
    pack: pack,
    path: path
  }));

  if (sys.$eq(Rp.code , "")) {
    msgPg.mk(wg, i18n.fmt(II("[%0] Jkut file not found."), [path]), true);
    return;
  }

  const code =sys.$checkNull( Rp.code[0]);
  process(code);

  const barIx =sys.$checkNull( str.lastIndex(path, "/") + 1);
  Q("@title").text(
    cts.appName + " - " + sys.$slice(path,barIx,null) + ".jkut"
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
          .html(Left[0]))
        .add(Q("td")
          .klass("prer")
          .html(Right[0]))))
    .adds(iter.map(iter.$range(0,30), function(i)  {sys.$params(arguments.length, 1);  return Q("p").html("&nbsp;");}))
  ;

  const Tg =sys.$checkNull( sys.$null((Q("#" + anchor).e)));
  if (!sys.asBool(!sys.asBool(Tg))) Tg[0].scrollIntoView(true);
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
  const r =sys.$checkNull( "" + n);
   return iter.reduce(
    iter.$range(0, 4 - str.len(r)), r, function(seed, i)  {sys.$params(arguments.length, 2);  return "&nbsp;" + seed;}
  );
};
