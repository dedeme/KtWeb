import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as i18n from  "../i18n.js";
import * as cts from  "../cts.js";
import * as msgPg from  "../pgs/msgPg.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);

const reserved =sys.$checkNull( "asm auto break bool case char const continue " +
  "default do double else enum extern float for goto if inline int long " +
  "register frestrict return short signed sizeof static struct switch " +
  "typedef union unsigned void volatile while")
;
const directive =sys.$checkNull( "#include #define #undef #ifdef #ifndef #error " +
  "#else #elif #pragma #endif #if")
;


const stCode =sys.$checkNull( 0);
const stLong =sys.$checkNull( stCode + 1); 
const stQ =sys.$checkNull( stLong + 1); 


export  async  function mk(wg, module, path, anchor)   {sys.$params(arguments.length, 4);
  const isHeader =sys.$checkNull( !sys.asBool(str.starts(anchor, "hp::")));

   const {codeOp} = await  client.send({
    prg: "CDoc",
    source: "CodePg",
    rq: "code",
    module:module,
    path:path,
    isHeader:isHeader
  });

  if (!sys.asBool(codeOp)) {
    msgPg.mk(wg, i18n.fmt(II("[%0] File not found."), [path]), true);
    return;
  }

  const code =sys.$checkNull( codeOp[0]);

  const prefix =sys.$checkNull( str.starts(anchor, "hp::") ? "hp::" : "hp:");
  const leftV =sys.$checkNull( [""]);
  const rightV =sys.$checkNull( [""]);
  const lineCounterV =sys.$checkNull( [0]);
  const charQuotesV =sys.$checkNull( [""]);
  const stateV =sys.$checkNull( [stCode]);

  
   function newLine()  {sys.$params(arguments.length, 0);
    lineCounterV[0] +=sys.$checkExists(lineCounterV[0],sys.$checkNull( 1));
    rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "<br>"));
    leftV[0] +=sys.$checkExists(leftV[0],sys.$checkNull( "<span style='font-family: monospace;font-size: 12px;" +
      "background-color: rgb(215, 215, 215);color: #998866;'>" +
      formatN(lineCounterV[0]) +
      "</span><br>"));
  };

  
   function processCode(l)  {sys.$params(arguments.length, 1);
    
     function makeLink(code)  {sys.$params(arguments.length, 1);
      const bfV =sys.$checkNull( [""]);
      for (let i = 0;i < str.len(code); ++i) {
        const ch =sys.$checkNull( code[i]);
        if (sys.$eq(ch , "#")) {
          bfV[0] +=sys.$checkExists(bfV[0],sys.$checkNull( "_"));
        } else if (ch > " ") {
          bfV[0] +=sys.$checkExists(bfV[0],sys.$checkNull( ch));
        }
      }

      const ixV =sys.$checkNull( [str.index(bfV[0], "=")]);
      const ix2 =sys.$checkNull( str.index(bfV[0], "("));
      if (sys.$eq(ixV[0] ,  -1) || (sys.$neq(ix2 ,  -1) && ix2 < ixV[0])) {
        ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( ix2));
        if (sys.$neq(ixV[0] ,  -1)) {
          if (str.starts(sys.$slice(bfV[0],ixV[0],null), "(*")) {
            const ix2 =sys.$checkNull( str.indexFrom(bfV[0], "(", ixV[0] + 1));
            if (sys.$neq(ix2 ,  -1)) {
              ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( ix2));
            }
          }
        }
      }
      if (sys.$eq(ixV[0] ,  -1)) ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.index(bfV[0], ";")));
      if (sys.$eq(ixV[0] ,  -1)) ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.len(bfV[0])));

       return sys.$slice(bfV[0],null,ixV[0]);
    };

    const rV =sys.$checkNull( [toHtml(l)]);

    for (const w  of sys.$forObject( str.split(reserved, " "))) {
      const ixV =sys.$checkNull( [str.index(rV[0], w)]);
      while (sys.$neq(ixV[0] ,  -1)) {
        const r =sys.$checkNull( rV[0]);
        const ix2 =sys.$checkNull( ixV[0] + str.len(w));
        if ((sys.$eq(ixV[0] , 0) || isNotId(r[ixV[0] - 1])) &&
            (sys.$eq(ixV[0] , str.len(r)) || isNotId(r[ix2]))
        ) {
          rV[0] =sys.$checkExists(rV[0],sys.$checkNull( sys.$slice(r,null,ixV[0]) + "<span class='reserved'>" + w +
            "</span>" + sys.$slice(r,ixV[0] + arr.size(w),null)));
          ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.indexFrom(rV[0], w, ix2 + 30)));
        } else {
          ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.indexFrom(r, w, ix2)));
        }
      }
    }

    for (const w  of sys.$forObject( str.split(directive, " "))) {
      const ixV =sys.$checkNull( [str.index(rV[0], w)]);
      while (sys.$neq(ixV[0] ,  -1)) {
        const ix2 =sys.$checkNull( ixV[0] + str.len(w));
        rV[0] =sys.$checkExists(rV[0],sys.$checkNull( sys.$slice(rV[0],null,ixV[0]) + "<span class='annotation'>" + w +
          "</span>" + sys.$slice(rV[0],ixV[0] + str.len(w),null)));
        ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.indexFrom(rV[0], w, ix2 + 32)));
      }
    }

    const stV =sys.$checkNull( [0]);
    rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( arr.reduce(str.split(rV[0], ""), "", function(seed, ch)  {sys.$params(arguments.length, 2);
      if (sys.$eq(stV[0] , 0) || sys.$eq(stV[0] , 3)) { 
        if (isNumber(ch)) {
          stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 1));
           return seed + "<span class='number'>" + ch;
        }
        if (isUpper(ch)) {
          stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 2));
           return seed + "<span class='className'>" + ch;
        }
        if (isNotId(ch)) {
          stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 3));
           return seed + ch;
        }
        stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 4));
         return seed + ch;
      }
      if (sys.$eq(stV[0] , 1)) { 
        if (isNumber(ch))
           return seed + ch;
        stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 4));
        if (isNotId(ch)) {
          stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 3));
        }
         return seed + "</span>" + ch;
      }
      if (sys.$eq(stV[0] , 2)) { 
        if (isNotId(ch)) {
          stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 3));
           return seed + "</span>" + ch;
        }
         return seed + ch;
      } 
      if (isNotId(ch))
        stV[0] =sys.$checkExists(stV[0],sys.$checkNull( 3));
       return seed + ch;
    })));
    if (sys.$eq(stV[0] , 1) || sys.$eq(stV[0] , 2)) {
      rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "</span>"));
    }

    if (str.len(l) > 0) {
      const ch =sys.$checkNull( l[0]);
      if (ch > " " &&
        sys.$neq(ch , "(") &&
        sys.$neq(ch , "}")
      ) {
        leftV[0] +=sys.$checkExists(leftV[0],sys.$checkNull( "<span id='" + prefix +
          makeLink(str.trim(l)) +
          "'></span>"));
      }
    }
  };

  
   function processLine(l)  {sys.$params(arguments.length, 1);
    if (sys.$eq(stateV[0] , stLong)) { 
      const ix =sys.$checkNull( str.index(l, "*/"));
      if (sys.$neq(ix ,  -1)) {
        stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( stCode));
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( toHtml(sys.$slice(l,null, ix + 2)) + "</span>"));
        processLine(sys.$slice(l,ix + 2,null));
      } else {
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( toHtml(l)));
        newLine();
      }
    } else if (sys.$eq(stateV[0] , stQ)) { 
      const qix =sys.$checkNull( str.index(l, charQuotesV[0]));
      if (sys.$eq(qix ,  -1)) {
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( toHtml(l) + charQuotesV[0] + "</span>"));
        newLine();
        stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( stCode));
        return;
      }
      const bix =sys.$checkNull( str.index(l, "\\"));
      if (sys.$neq(bix ,  -1) && bix < qix) {
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( toHtml(sys.$slice(l,null,bix + 2))));
        processLine(sys.$slice(l,bix + 2,null));
      } else {
        stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( stCode));
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( toHtml(sys.$slice(l,null,qix + 1)) + "</span>"));
        processLine(sys.$slice(l,qix + 1,null));
      }
    } else { 
      if (sys.$eq(str.trim(l) , "")) {
        newLine();
        return;
      }
      const rV =sys.$checkNull( [0]);
      const posV =sys.$checkNull( [2000]);
      const ixV =sys.$checkNull( [str.index(l, "/*")]); 
      if (sys.$neq(ixV[0] ,  -1)) {
        rV[0] =sys.$checkExists(rV[0],sys.$checkNull( 1));
        posV[0] =sys.$checkExists(posV[0],sys.$checkNull( ixV[0]));
      }
      ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.index(l, "//"))); 
      if (sys.$neq(ixV[0] ,  -1) && ixV[0] < posV[0]) {
        rV[0] =sys.$checkExists(rV[0],sys.$checkNull( 2));
        posV[0] =sys.$checkExists(posV[0],sys.$checkNull( ixV[0]));
      }
      ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.index(l, "\""))); 
      if (sys.$neq(ixV[0] ,  -1) && ixV[0] < posV[0]) {
        rV[0] =sys.$checkExists(rV[0],sys.$checkNull( 3));
        posV[0] =sys.$checkExists(posV[0],sys.$checkNull( ixV[0]));
      }
      ixV[0] =sys.$checkExists(ixV[0],sys.$checkNull( str.index(l, "'"))); 
      if (sys.$neq(ixV[0] ,  -1) && ixV[0] < posV[0]) {
        rV[0] =sys.$checkExists(rV[0],sys.$checkNull( 4));
        posV[0] =sys.$checkExists(posV[0],sys.$checkNull( ixV[0]));
      }

      if (sys.$eq(rV[0] , 1)) { 
        processCode(sys.$slice(l,null,posV[0]));
        const l2=sys.$checkNull( sys.$slice(l,posV[0] + 2,null));
        if (str.starts(l2, "*")) {
          rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "<span class='docComment'>/*"));
          stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( stLong));
        } else {
          rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "<span class='comment'>/*"));
          stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( stLong));
        }
        processLine(l2);
      } else if (sys.$eq(rV[0] , 2)) { 
        processCode(sys.$slice(l,null,posV[0]));
        const l2 =sys.$checkNull( sys.$slice(l,posV[0] + 2,null));
        if (str.starts(l2, "/")) {
          rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "<span class='docComment'>//"));
        } else {
          rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "<span class='docComment'>//"));
        }
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( toHtml(l2) + "</span>"));
        newLine();
      } else if (sys.$eq(rV[0] , 3)) { 
        processCode(sys.$slice(l,null,posV[0]));
        stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( stQ));
        charQuotesV[0] =sys.$checkExists(charQuotesV[0],sys.$checkNull( "\""));
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "<span class='quote2'>\""));
        processLine(sys.$slice(l,posV[0] + 1,null));
      } else if (sys.$eq(rV[0] , 4)) { 
        processCode(sys.$slice(l,null,posV[0]));
        stateV[0] =sys.$checkExists(stateV[0],sys.$checkNull( stQ));
        charQuotesV[0] =sys.$checkExists(charQuotesV[0],sys.$checkNull( "'"));
        rightV[0] +=sys.$checkExists(rightV[0],sys.$checkNull( "<span class='quote1'>'"));
        processLine(sys.$slice(l,posV[0] + 1,null));
      } else {
        processCode(l);
        newLine();
      }
    }
  };

  

  for (const l  of sys.$forObject( str.split(code, "\n"))) processLine(l);

  Q("@title").text(cts.appName + " - " + arr.peek(str.split(path, "/")) +
    (sys.$eq(prefix , "hp::") ? ".c" : ".h"));

  wg
    .removeAll()
    .add(Q("table")
      .att("id", prefix)
      .add(Q("tr")
        .add(Q("td")
          .klass("frame")
          .add(Q("a")
            .att("href", "?" + module + "@" + path)
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

  const eOp =sys.$checkNull( sys.$null((window.document.getElementById(anchor))));
  if (!sys.asBool(!sys.asBool(eOp))) eOp[0].scrollIntoView(true);
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
