import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as menu from  "../libdm/menu.js";
import * as acc from  "../data/acc.js";
import * as accValue from  "../data/accValue.js";
import * as all from  "../data/all.js";
import * as cts from  "../cts.js";
import * as balance from  "../data/balance.js";
import * as profits from  "../data/profits.js";
import * as diaryEntry from  "../data/diaryEntry.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);






export  function mk(wg, stype, sdeep)  {sys.$params(arguments.length, 3);
  const type =sys.$checkNull( sys.$neq(stype , "S") && sys.$neq(stype , "P") && sys.$neq(stype , "B") ? "P" : stype);
  const deep =sys.$checkNull( sys.$neq(sdeep , "M") && sys.$neq(sdeep , "A") && sys.$neq(sdeep , "S") ? "M" : sdeep);

  
   function blanks(tx, n)  {sys.$params(arguments.length, 2);
    const bsV = [""];
    for (let i = 0;i < n; ++i) bsV[0] +=sys.$checkExists(bsV[0], "&nbsp;");
     return bsV[0] + tx + bsV[0];
  };

  
   function fnm(n)  {sys.$params(arguments.length, 1);  return math.toIso(n, 2);};

  
   function normal(tx)  {sys.$params(arguments.length, 1);  return tx;};

  
   function bold(tx)  {sys.$params(arguments.length, 1);  return "<b>" + tx + "</b>";};

  
   function italic(tx)  {sys.$params(arguments.length, 1);  return "<i><b>" + tx + "</b></i>";};

  
   function underline(tx)  {sys.$params(arguments.length, 1);  return "<u><i><b>" + tx + "</u></i></b>";};

  const Ropts1 = [
    menu.toption("S", II("Statements"), function()  {sys.$params(arguments.length, 0); mk(wg, "S", deep);}),
    menu.separator(),
    menu.toption("P", blanks(II("P & L"), 6), function()  {sys.$params(arguments.length, 0); mk(wg, "P", deep);}),
    menu.separator(),
    menu.toption("B", II("Balance"), function()  {sys.$params(arguments.length, 0); mk(wg, "B", deep);}),
    menu.separator2()
  ];
  const menu1Wg =sys.$checkNull( menu.mk([], Ropts1, type));
  const Lopts2 = [
    menu.separator2(),
    menu.toption("M", II("Summary"), function()  {sys.$params(arguments.length, 0); mk(wg, type, "M");}),
    menu.separator(),
    menu.toption("A", II("Accounts"), function()  {sys.$params(arguments.length, 0); mk(wg, type, "A");}),
    menu.separator(),
    menu.toption("S", II("Subaccounts"), function()  {sys.$params(arguments.length, 0); mk(wg, type, "S");})
  ];
  const menu2Wg =sys.$checkNull( menu.mk(Lopts2, [], deep));

  

  
  
   function calcSubStats(Accs, ac, sac, am)  {sys.$params(arguments.length, 4);
    const missingV = [true];
    for (const A  of sys.$forObject( Accs)) {
      if (sys.$eq(A[0].id , ac)) {
        const missing3V = [true];
         const Saccs =sys.$checkNull( A[1]);
        for (const Sa  of sys.$forObject( Saccs)) {
          if (sys.$eq(Sa.id , sac)) {
            Sa.am +=sys.$checkExists(Sa.am, am);
            missing3V[0] =sys.$checkExists(missing3V[0], false);
            break;
          }
        }
        if (missing3V[0])
          arr.push(Saccs,{id: sac, desc: acc.descriptionOf(sac), am:am});
        A[0].am +=sys.$checkExists(A[0].am, am);
        missingV[0] =sys.$checkExists(missingV[0], false);
        break;
      }
    }
     return missingV[0];
  };

  
  
   function calcStats()  {sys.$params(arguments.length, 0);
    const Diary =sys.$checkNull( acc.diary());
    const Stats= []; 

    for (const  e  of sys.$forObject( Diary)) {
      
       function process(sac, am)  {sys.$params(arguments.length, 2);
        const gr =sys.$checkNull( sac[0]);
        const ac = sys.$slice(sac,null,3);
        const missingV = [true];
        for (const G  of sys.$forObject( Stats)) {
          if (sys.$eq(G[0].id , gr)) {
            const missing2V = [calcSubStats(G[1], ac, sac, am)];
            if (missing2V[0]) {
              const S3 = {id: sac, desc: acc.descriptionOf(sac), am:am};
              arr.push(G[1], [
                {id: ac, desc: acc.descriptionOf(ac), am:am},
                [S3]
              ]);
            }
            G[0].am +=sys.$checkExists(G[0].am, am);
            missingV[0] =sys.$checkExists(missingV[0], false);
            break;
          }
        }
        if (missingV[0]) {
          const S3 = {id: sac, desc: acc.descriptionOf(sac), am:am};
          const S2 = [
            {id: ac, desc: acc.descriptionOf(ac), am:am},
            [S3]
          ];
          arr.push(Stats,[
            {id: gr, desc: acc.descriptionOf(gr), am:am},
            [S2]
          ]);
        }
      };

      iter.each(dic.toIter(e[diaryEntry.debits]), function(Kv)  {sys.$params(arguments.length, 1); process(Kv[0], Kv[1]);});
      iter.each(dic.toIter(e[diaryEntry.credits]), function(Kv)  {sys.$params(arguments.length, 1); process(Kv[0],  -Kv[1]);});
    }
    for (const G  of sys.$forObject( Stats)) {
      for (const A  of sys.$forObject( G[1])) arr.sort(A[1], function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.id < E2.id;});
      arr.sort(G[1], function(E1, E2)  {sys.$params(arguments.length, 2);  return E1[0].id < E2[0].id;});
    }
    arr.sort(Stats,function(E1, E2)  {sys.$params(arguments.length, 2);  return E1[0].id < E2[0].id;});

     return Stats;
  };

  
  
   function calcPl()  {sys.$params(arguments.length, 0);
    const Pls = []; 

    const Accs =sys.$checkNull( acc.accounts());
    
     function filter(nm, smm)  {sys.$params(arguments.length, 2);  return str.starts(smm, "P") && sys.$eq(sys.$slice(smm,1,null) , nm);};
    
     function diary(nm)  {sys.$params(arguments.length, 1);
       return arr.map(acc.diary(), function( e)  {sys.$params(arguments.length, 1);
         return diaryEntry.mk(
          e[diaryEntry.date], e[diaryEntry.description],
          dic.fromArr(arr.filter(
            dic.toArr(e[diaryEntry.debits]),
            function(Kv)  {sys.$params(arguments.length, 1);  return filter(nm, Accs[sys.$slice(Kv[0],null,3)][accValue.summary]);}
          )),
          dic.fromArr(arr.filter(
            dic.toArr(e[diaryEntry.credits]),
            function(Kv)  {sys.$params(arguments.length, 1);  return filter(nm, Accs[sys.$slice(Kv[0],null,3)][accValue.summary]);}
          ))
        );}
      );};

    const sumTV = [0];
    const Letters = ["A", "B", "C"];
    for (const l  of sys.$forObject( Letters)) {
       const Es =sys.$checkNull( arr.filter(
        dic.toArr(profits.entries()),
        function(Kv)  {sys.$params(arguments.length, 1);  return sys.$eq(profits.groupOf(Kv[0]) , l);}
      ));
      arr.sort(Es,function(Kv1, Kv2)  {sys.$params(arguments.length, 2);  return Kv1[0] < Kv2[0];});
       const Stats =sys.$checkNull( arr.map(
        Es,
        function(Kv)  {sys.$params(arguments.length, 1);
          const sumV = [0];
          const Accs = []; 
                     
          for (const  e  of sys.$forObject( diary(Kv[0]))) {
            
             function process(sac, am)  {sys.$params(arguments.length, 2);
              const ac = sys.$slice(sac,null,3);
              const missing =sys.$checkNull( calcSubStats(Accs, ac, sac, am));
              if (missing) {
                arr.push(Accs,[
                  {id: ac, desc: acc.descriptionOf(ac), am:am},
                  [{id: sac, desc: acc.descriptionOf(sac), am:am}]
                ]);
              }
              sumV[0] +=sys.$checkExists(sumV[0], am);
            };
            iter.each(dic.toIter(e[diaryEntry.debits]), function(Kv)  {sys.$params(arguments.length, 1); process(Kv[0], Kv[1]);});
            iter.each(dic.toIter(e[diaryEntry.credits]), function(Kv)  {sys.$params(arguments.length, 1); process(Kv[0],  -Kv[1]);});
          }

           return [{id: Kv[0], desc: Kv[1], am: sumV[0]}, Accs];
        }
      ));

      for (const G  of sys.$forObject( Stats)) {
        for (const A  of sys.$forObject( G[1])) arr.sort(A[1], function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.id < E2.id;});
        arr.sort(G[1], function(E1, E2)  {sys.$params(arguments.length, 2);  return E1[0].id < E2[0].id;});
      }
      const sum =sys.$checkNull( arr.reduce(Stats,0, function(r, E)  {sys.$params(arguments.length, 2);  return r + E[0].am;}));
      arr.push(Pls,[
        { id: l,
          desc: profits.groups()[l],
          am: sys.$eq(l , "C") ? sumTV[0] : sum
        },
        Stats
      ]);
      sumTV[0] +=sys.$checkExists(sumTV[0], sum);
    }
    arr.push(Pls,[
      {id: "D", desc: profits.groups()["D"], am: sumTV[0]},
      []
    ]);

     return Pls;
  };

  
  
   function calcBalance()  {sys.$params(arguments.length, 0);
    const Bal = []; 

    const Accs =sys.$checkNull( acc.accounts());
    
     function filter(nm, smm)  {sys.$params(arguments.length, 2);  return str.starts(smm, "B") && sys.$eq(sys.$slice(smm,1,null) , nm);};
    
     function diary(nm)  {sys.$params(arguments.length, 1);
       return arr.map(acc.diary(), function( e)  {sys.$params(arguments.length, 1);
         return diaryEntry.mk(
          e[diaryEntry.date], e[diaryEntry.description],
          dic.fromArr(arr.filter(
            dic.toArr(e[diaryEntry.debits]),
            function(Kv)  {sys.$params(arguments.length, 1);  return filter(nm, Accs[sys.$slice(Kv[0],null,3)][accValue.summary]);}
          )),
          dic.fromArr(arr.filter(
            dic.toArr(e[diaryEntry.credits]),
            function(Kv)  {sys.$params(arguments.length, 1);  return filter(nm, Accs[sys.$slice(Kv[0],null,3)][accValue.summary]);}
          ))
        );}
      );};


    const sumTV = [0];
    const Letters = ["AA", "AB", "PA", "PB", "PC"];
    for (const l  of sys.$forObject( Letters)) {
       const Es =sys.$checkNull( arr.filter(
        dic.toArr(balance.entries()),
        function(Kv)  {sys.$params(arguments.length, 1);  return sys.$eq(balance.groupOf(Kv[0]) , l);}
      ));
      arr.sort(Es,function(Kv1, Kv2)  {sys.$params(arguments.length, 2);  return Kv1[0] < Kv2[0];});
       const Stats =sys.$checkNull( arr.map(Es,
        function(Kv)  {sys.$params(arguments.length, 1);
          const sumV = [0];
          const Accs = []; 
                     
          for (const  e  of sys.$forObject( diary(Kv[0]))) {
            
             function process(sac, am)  {sys.$params(arguments.length, 2);
              const ac = sys.$slice(sac,null,3);
              const missing =sys.$checkNull( calcSubStats(Accs, ac, sac, am));
              if (missing) {
                arr.push(Accs,[
                  {id: ac, desc: acc.descriptionOf(ac), am:am},
                  [{id: sac, desc: acc.descriptionOf(sac), am:am}]
                ]);
              }
              sumV[0] +=sys.$checkExists(sumV[0], am);
            };
            iter.each(dic.toIter(e[diaryEntry.debits]), function(Kv)  {sys.$params(arguments.length, 1); process(Kv[0], Kv[1]);});
            iter.each(dic.toIter(e[diaryEntry.credits]), function(Kv)  {sys.$params(arguments.length, 1); process(Kv[0],  -Kv[1]);});
          }

           return [{id: Kv[0], desc: Kv[1], am: sumV[0]}, Accs];
        }
      ));

      for (const G  of sys.$forObject( Stats)) {
        for (const A  of sys.$forObject( G[1])) arr.sort(A[1], function(E1, E2)  {sys.$params(arguments.length, 2);  return E1.id < E2.id;});
        arr.sort(G[1], function(E1, E2)  {sys.$params(arguments.length, 2);  return E1[0].id < E2[0].id;});
      }
      const sum =sys.$checkNull( arr.reduce(Stats,0, function(r, E)  {sys.$params(arguments.length, 2);  return r + E[0].am;}));
      arr.push(Bal,[{id: l, desc: balance.groups()[l], am: sum}, Stats]);
      sumTV[0] +=sys.$checkExists(sumTV[0], sum);
    }

     return Bal;
  };

  

  
   function fS(level)  {sys.$params(arguments.length, 1);
    const Stats =sys.$checkNull( calcStats());
    const table =sys.$checkNull( Q("table")
      .klass("summary")
      .att("align", "center"))
    ;
    for (const G  of sys.$forObject( Stats)) {
      const V =sys.$checkNull( G[0]);
      const desc =sys.$checkNull( V.desc);
      const am =sys.$checkNull( V.am);
      const fmt =sys.$checkNull( sys.$eq(level , 0) ? normal : sys.$eq(level , 1) ? bold : italic);
      table.add(Q("tr")
        .add(Q("td").klass("summary0cp")
          .att("colspan", 3)
          .add(ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + V.id);})
            .klass("link")
            .html(fmt(V.id + ". " + desc))))
        .add(Q("td").klass("summary0d")
          .html(am > 0 ? fmt(fnm(am)) : ""))
        .add(Q("td").klass("summary0c")
          .html(am < 0 ? fmt(fnm( -am)) : "")));
      if (sys.$eq(level , 0)) continue;

      for (const A  of sys.$forObject( G[1])) {
        const V =sys.$checkNull( A[0]);
        const desc =sys.$checkNull( V.desc);
        const am =sys.$checkNull( V.am);
        const fmt =sys.$checkNull( sys.$eq(level , 1) ? normal : bold);
        table.add(Q("tr")
          .add(Q("td").style("width:40px"))
          .add(Q("td").klass("summary0cp")
            .att("colspan", 2)
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + V.id);})
              .klass("link")
              .html(fmt(V.id + ". " + desc))))
          .add(Q("td").klass("summary0d")
            .html(am > 0 ? fmt(fnm(am)) : ""))
          .add(Q("td").klass("summary0c")
            .html(am < 0 ? fmt(fnm( -am)) : "")));

        if (sys.$eq(level , 1)) continue;
        for (const V  of sys.$forObject( A[1])) {
          const desc =sys.$checkNull( V.desc);
          const am =sys.$checkNull( V.am);
          table.add(Q("tr")
            .add(Q("td").style("width:40px"))
            .add(Q("td").style("width:40px"))
            .add(Q("td").klass("summary0cp")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + V.id);})
                .klass("link")
                .html(V.id + ". " + desc)))
            .add(Q("td").klass("summary0d")
              .html(am > 0 ? fnm(am) : ""))
            .add(Q("td").klass("summary0c")
              .html(am < 0 ? fnm( -am) : "")));
        }
      }
    }
     return Q("div")
      .add(Q("div")
        .klass("head")
        .html(II("Statements") + "<br><i>" + II("Summary") + "</i>"))
      .add(table)
    ;
  };

  
   function fSM()  {sys.$params(arguments.length, 0);  return fS(0);};

  
   function fSA()  {sys.$params(arguments.length, 0);  return fS(1);};

  
   function fSS()  {sys.$params(arguments.length, 0);  return fS(2);};

  
   function fPB(isP, level)  {sys.$params(arguments.length, 2);
    const Entries =sys.$checkNull( isP ? calcPl() : calcBalance());
    const table =sys.$checkNull( Q("table")
      .klass("summary")
      .att("align", "center"))
    ;
    for (const L  of sys.$forObject( Entries)) {
      const V =sys.$checkNull( L[0]);
      const desc =sys.$checkNull( V.desc);
      const am =sys.$checkNull( V.am);
      const fmt =sys.$checkNull( sys.$eq(level , 0) ? bold : sys.$eq(level , 1) ? italic : underline);
      table.add(Q("tr")
        .add(Q("td").klass("summary0cp")
          .att("colspan", 4)
          .html(fmt(V.id + ". " + desc)))
        .add(Q("td").klass("summary0d")
          .html(am > 0 ? fmt(fnm(am)) : ""))
        .add(Q("td").klass("summary0c")
          .html(am < 0 ? fmt(fnm( -am)) : "")));

      for (const G  of sys.$forObject( L[1])) {
        const V =sys.$checkNull( G[0]);
        const desc =sys.$checkNull( V.desc);
        const am =sys.$checkNull( V.am);
        const fmt =sys.$checkNull( sys.$eq(level , 0) ? normal : sys.$eq(level , 1) ? bold : italic);
        table.add(Q("tr")
          .add(Q("td").style("width:40px"))
          .add(Q("td").klass("summary0cp")
            .att("colspan", 3)
            .html(fmt(V.id + ". " + desc)))
          .add(Q("td").klass("summary0d")
            .html(am > 0 ? fmt(fnm(am)) : ""))
          .add(Q("td").klass("summary0c")
            .html(am < 0 ? fmt(fnm( -am)) : "")));
        if (sys.$eq(level , 0)) continue;

        for (const A  of sys.$forObject( G[1])) {
          const V =sys.$checkNull( A[0]);
          const desc =sys.$checkNull( V.desc);
          const am =sys.$checkNull( V.am);
          const fmt =sys.$checkNull( sys.$eq(level , 1) ? normal : bold);
          table.add(Q("tr")
            .add(Q("td").style("width:40px"))
            .add(Q("td").style("width:40px"))
            .add(Q("td").klass("summary0cp")
              .att("colspan", 2)
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + V.id);})
                .klass("link")
                .html(fmt(V.id + ". " + desc))))
            .add(Q("td").klass("summary0d")
              .html(am > 0 ? fmt(fnm(am)) : ""))
            .add(Q("td").klass("summary0c")
              .html(am < 0 ? fmt(fnm( -am)) : "")));

          if (sys.$eq(level , 1)) continue;
          for (const V  of sys.$forObject( A[1])) {
            const desc =sys.$checkNull( V.desc);
            const am =sys.$checkNull( V.am);
            table.add(Q("tr")
              .add(Q("td").style("width:40px"))
              .add(Q("td").style("width:40px"))
              .add(Q("td").style("width:40px"))
              .add(Q("td").klass("summary0cp")
                .add(ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?accs&" + V.id);})
                  .klass("link")
                  .html(V.id + ". " + desc)))
              .add(Q("td").klass("summary0d")
                .html(am > 0 ? fnm(am) : ""))
              .add(Q("td").klass("summary0c")
                .html(am < 0 ? fnm( -am) : "")));
          }
        }
      }
    }
     return Q("div")
      .add(Q("div")
        .klass("head")
        .html((isP
            ? II("P & L")
            : II("Balance")
          ) + "<br><i>" + II("Summary") + "</i>"))
      .add(table)
    ;
  };

  
   function fPM()  {sys.$params(arguments.length, 0);  return fPB(true, 0);};

  
   function fPA()  {sys.$params(arguments.length, 0);  return fPB(true, 1);};

  
   function fPS()  {sys.$params(arguments.length, 0);  return fPB(true, 2);};

  
   function fBM()  {sys.$params(arguments.length, 0);  return fPB(false, 0);};

  
   function fBA()  {sys.$params(arguments.length, 0);  return fPB(false, 1);};

  
   function fBS()  {sys.$params(arguments.length, 0);  return fPB(false, 2);};

  
   function summary()  {sys.$params(arguments.length, 0); return (   
      sys.$eq(type,"S")?(   
          sys.$eq(deep,"M")? fSM():
          sys.$eq(deep,"A")? fSA():
            fSS()
        ):
      sys.$eq(type,"P")?(   
          sys.$eq(deep,"M")? fPM():
          sys.$eq(deep,"A")? fPA():
            fPS()
        ):
       (   
          sys.$eq(deep,"M")? fBM():
          sys.$eq(deep,"A")? fBA():
            fBS()
        )
    );};

  wg
    .removeAll()
    .add(Q("div")
      .klass("head")
      .text(II("Summaries")))
    .add(Q("table")
      .att("align", "center")
      .add(Q("tr")
        .add(Q("td")
          .add(menu1Wg))
        .add(Q("td")
          .add(menu2Wg))))
    .add(summary())
  ;
};
