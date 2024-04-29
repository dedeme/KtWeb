import * as math from '../../_js/math.js';import * as js from '../../_js/js.js';import * as arr from '../../_js/arr.js';import * as client from '../../_js/client.js';import * as bytes from '../../_js/bytes.js';import * as str from '../../_js/str.js';import * as ui from '../../_js/ui.js';import * as dic from '../../_js/dic.js';import * as timer from '../../_js/timer.js';import * as time from '../../_js/time.js';import * as storage from '../../_js/storage.js';import * as b64 from '../../_js/b64.js';import * as sys from '../../_js/sys.js';import * as iter from '../../_js/iter.js';import * as domo from '../../_js/domo.js';import * as cryp from '../../_js/cryp.js';




import * as i18n from  "../../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);





export  function mk(wg, textArea)  {sys.$params(arguments.length, 2);
  const tx =sys.$checkNull( String.raw
`// Copyright {DATE} ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

/// {OVERVIEW}

/// Constructor.{DOC}{TYPES}{CODE}{SETS}{TOJS}{FROMJS}
`);

   const now =sys.$checkNull( time.now());
  const month =sys.$checkNull( time.toDate(now).toLocaleString("en-US", { month: "short" }));
  const dateF =sys.$checkNull( ui.field("overviewTA")
    .value(""))
  ;

  const oNameF =sys.$checkNull( ui.field("oType")
    .att("id", "oName")
    .value(""))
  ;
  const oTypeF =sys.$checkNull( ui.field("f0Name")
    .att("id", "oType")
    .style("width:100px")
    .value(""))
  ;

  const buttonsDiv =sys.$checkNull( Q("div"));
  const fieldsDiv =sys.$checkNull( Q("div"));

  
  const Fields =sys.$checkNull( []);

  
  const buttonsUpdateV =sys.$checkNull( [[]]);

  

  
   function update()  {sys.$params(arguments.length, 0);
    if (sys.$eq(str.trim(dateF.getValue()) , ""))
      dateF.value(time.format(now,"%D-" + month + "-%Y"));
    if (sys.$eq(str.trim(oNameF.getValue()) , "")) oNameF.value("new");
    if (sys.$eq(str.trim(oTypeF.getValue()) , "")) oTypeF.value("myType");
    const oType =sys.$checkNull( "<" + str.trim(oTypeF.getValue()) + ">");

    const maxV =sys.$checkNull( [0]);
    for (const [i, F]  of sys.$forObject2( Fields)) {
      const {name, type} = F;
      if (sys.$eq(str.trim(name.getValue()) , "")) name.value("f" + i);
      if (sys.$eq(str.trim(type.getValue()) , "")) type.value("s");
      const len =sys.$checkNull( str.trim(name.getValue()).length);
      maxV[0] =sys.$checkExists(maxV[0],sys.$checkNull( maxV[0] > len ? maxV[0] : len));
    }
    const adjs =sys.$checkNull( sys.$slice("                                       ",null,maxV[0]));

    
    const Doc =sys.$checkNull( []);
    for (const F  of sys.$forObject( Fields))
      arr.push(Doc,
        "///   " + sys.$slice((str.trim(F.name.getValue()) + adjs),null,maxV[0]) + ":"
      );
    
    const Types =sys.$checkNull( []);
    for (const F  of sys.$forObject( Fields)) {
      const t =sys.$checkNull( str.trim(F.type.getValue()));
      const isFn =sys.$checkNull( sys.$neq(str.index(t, "->") ,  -1));
      arr.push(Types,isFn ? "(" + t + ")" : t);
    }

    
    const Pars =sys.$checkNull( []);
    for (const F  of sys.$forObject( Fields)) arr.push(Pars,str.trim(F.name.getValue()));

    const to =sys.$checkNull( arr.any(Types,function(t)  {sys.$params(arguments.length, 1);
         return sys.$eq(t[0] , "<") || (sys.$eq(sys.$slice(t,null,2) , "[<") && sys.$eq(sys.$slice(t, -3,null) , ">.]"));})
      ? "\n\n/// \\" + oType + " -> JS\ntoJs = \\o -> return [\n" +
          arr.join(arr.fromIter(iter.map(iter.$range(0,arr.size(Fields)), function(i)  {sys.$params(arguments.length, 1);
            const n =sys.$checkNull( str.trim(Fields[i].name.getValue()));
            const t =sys.$checkNull( str.trim(Fields[i].type.getValue()));
             return sys.$eq(t[0] , "<")
              ? "    " + sys.$slice(t,1, -1) + ".toJs(o[" + n + "])"
              : sys.$eq(sys.$slice(t,null,2) , "[<") && sys.$eq(sys.$slice(t, -3,null) , ">.]")
                ? "    arr.map(o[" + n + "], " + sys.$slice(t,2, -3) + ".toJs)"
                : "    o[" + n + "]"
            ;
          })), ",\n") +
          "\n  ];;"
      : "")
    ;

    const from =sys.$checkNull( arr.any(Types,function(t)  {sys.$params(arguments.length, 1);
         return sys.$eq(t , "i") || sys.$eq(t , "[i.]") ||
          sys.$eq(t[0] , "<") || (sys.$eq(sys.$slice(t,null,2) , "[<") && sys.$eq(sys.$slice(t, -3,null) , ">.]"));}
      )
      ? "\n\n/// \\JS -> " + oType + "\nfromJs = \\A -> return [\n" +
          arr.join(arr.fromIter(iter.map(iter.$range(0,arr.size(Fields)), function(i)  {sys.$params(arguments.length, 1);
            const n =sys.$checkNull( str.trim(Fields[i].name.getValue()));
            const t =sys.$checkNull( str.trim(Fields[i].type.getValue()));
             return sys.$eq(t , "i")
              ? "    math.ftoi(A[" + n + "])"
              : sys.$eq(t , "[i.]")
                ? "    arr.map(A[" + n + "], math.ftoi)"
                : sys.$eq(t[0] , "<")
                  ? "    " + sys.$slice(t,1, -1) + ".fromJs(A[" + n + "])"
                  : sys.$eq(sys.$slice(t,null,2) , "[<") && sys.$eq(sys.$slice(t, -3,null) , ">.]")
                    ? "    arr.map(A[" + n + "], " + sys.$slice(t,2, -3) + ".fromJs)"
                    : "    A[" + n + "]"
            ;
          })), ",\n") +
          "\n  ];;"
      : "")
    ;

    const Sets =sys.$checkNull( []);
    for (const F  of sys.$forObject( Fields)) {
      const {name, type, set} = F;
      if (set.isChecked()) {
        const n =sys.$checkNull( str.trim(name.getValue()));
        const t0 =sys.$checkNull( str.trim(type.getValue()));
        const t =sys.$checkNull( sys.$neq(str.index(t0,"->") ,  -1) ? "(" + t0 + ")" : t0);
        arr.push(Sets,
          "\n\n/// \\" + oType + ", " + t + " -> ()\n" +
          "set" + str.toUpper(n[0]) + sys.$slice(n,1,null) + " = \\O, v -> O[" + n + "] = v;;"
        );
      }
    }
    const sets =sys.$checkNull( arr.join(Sets,""));

    textArea.text(str
      .replace(tx,"{DATE}", str.trim(dateF.getValue()))
      .replace("{OVERVIEW}", oType + " data definition.")
      .replace("{DOC}", "\n" + arr.join(Doc,"\n"))
      .replace(
          "{TYPES}",
          "\n/// \\" + arr.join(Types,",") + " -> " + oType
        )
      .replace(
          "{CODE}",
          "\n" + str.trim(oNameF.getValue()) + " : " +
            arr.join(Pars, ", ") + ";"
        )
      .replace("{SETS}", sets)
      .replace("{TOJS}", to)
      .replace("{FROMJS}", from)
    );
  };

  
   function mkFields() {sys.$params(arguments.length, 0);
    for (const F  of sys.$forObject( Fields)) {
      const {name, type, set} = F;
      name.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
      name.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
      type.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
      type.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
      set.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
    }
    fieldsDiv
      .removeAll()
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .style("text-align:left")
            .text(II("Name")))
          .add(Q("td")
            .style("text-align:left")
            .text(II("Type")))
          .add(Q("td")
            .style("text-align:left")
            .text(II("Set"))))
        .adds(arr.map(Fields,function(F)  {sys.$params(arguments.length, 1);  return Q("tr")
            .add(Q("td").add(F.name))
            .add(Q("td").add(F.type))
            .add(Q("td").add(F.set))
          ;})))
    ;
  };

  
   function remove() {sys.$params(arguments.length, 0);
    arr.pop(Fields);
     const F =sys.$checkNull( arr.peek(Fields));
    const n =sys.$checkNull( arr.size(Fields) - 1);
    F.type =sys.$checkExists(F.type,sys.$checkNull( ui.field("oName")
      .att("id", "f" + n + "Type")
      .style("width:100px")
      .value(F.type.getValue())));
    buttonsUpdateV[0]();
    mkFields();
    update();
  };

  
   function add() {sys.$params(arguments.length, 0);
    const n =sys.$checkNull( arr.size(Fields));
    arr.push(Fields,{
      name: ui.field("f" + n + "Type")
        .att("id", "f" + n + "Name")
        .value(""),
      type: ui.field("oName")
        .att("id", "f" + n + "Type")
        .style("width:100px")
        .value(""),
      set: Q("input")
        .att("type", "checkbox")
        .checked(false)
    });
    if (n > 0)
      Fields[n-1].type =sys.$checkExists(Fields[n-1].type,sys.$checkNull( ui.field("f" + n + "Name")
        .att("id", "f" + [n-1] + "Type")
        .style("width:100px")
        .value(Fields[n-1].type.getValue())));
    buttonsUpdateV[0]();
    mkFields();
    update();
  };

  
  buttonsUpdateV[0] =sys.$checkExists(buttonsUpdateV[0], function() {sys.$params(arguments.length, 0);
    const n =sys.$checkNull( arr.size(Fields));
    buttonsDiv
      .removeAll()
      .add(Q("table")
        .add(Q("tr")
          .add(Q("td")
            .add(n > 1
              ? ui.link(function(e)  {sys.$params(arguments.length, 1); remove();})
                .klass("link")
                .add(ui.img("remove"))
              : ui.lightImg("remove")))
          .add(Q("td").style("width:10px"))
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); add();})
            .klass("link")
            .add(ui.img("add")))))
    ;
  });

  


  dateF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  dateF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  oNameF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  oNameF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});
  oTypeF.on("change", function(e)  {sys.$params(arguments.length, 1); update();});
  oTypeF.on("focus", function(ev)  {sys.$params(arguments.length, 1); ev.target.select();});

  buttonsUpdateV[0]();
  add();
  mkFields();

  wg
    .removeAll()
    .add(Q("p")
      .style("text-align:left")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); update();})
        .klass("link")
        .text(II("Update"))))
    .add(Q("hr"))
    .add(ui.hrule(II("Date") + ":", 25))
    .add(dateF)
    .add(ui.hrule(II("Object") + ":", 25))
    .add(Q("table")
      .add(Q("tr")
        .add(Q("td")
          .style("text-align:left")
          .text(II("Name")))
        .add(Q("td")
          .style("text-align:left")
          .text(II("Type"))))
      .add(Q("tr")
        .add(Q("td")
          .add(oNameF))
        .add(Q("td")
          .add(oTypeF)))
    )
    .add(ui.hrule(II("Fields") + ":", 25))
    .add(buttonsDiv)
    .add(fieldsDiv)
    .add(Q("hr"))
  ;

  update();
};
