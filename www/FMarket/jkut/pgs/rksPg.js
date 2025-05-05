import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as menu from  "../libdm/menu.js";
import * as cts from  "../cts.js";
import * as flea from  "../data/flea.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const Url =sys.$checkNull( ui.url());
  const modelId =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "");

  const {mdId,  Models,  RksJs} 
  = await  client.send({
    prg: cts.appName,
    source: "RksPg",
    rq: "idata",
    modelId:modelId
  });

   const Rks =sys.$checkNull( dic.fromArr(
    arr.map(RksJs,function(Kv)  {sys.$params(arguments.length, 1);  return [Kv[0], arr.map(Kv[1], flea.fromJs)];})
  ));
   const Dates =sys.$checkNull( dic.keys(Rks));
  arr.sort(Dates,function(d1, d2)  {sys.$params(arguments.length, 2);  return d1 > d2;});
  const page = "rankings&" + mdId;

   const Lopts =sys.$checkNull( arr.reduce(Models,
    [],
    function( R, mId)  {sys.$params(arguments.length, 2);
      arr.push(R,menu.tlink("rankings&" + mId, mId));
      arr.push(R,menu.separator());
       return R;
    }
  ));
  arr.pop(Lopts);

  const menuWg =sys.$checkNull( menu.mk(Lopts, [], page));

  const size =sys.$checkNull( arr.size(Dates));
  const iV = [0];
  const Trs = []; 
  while (true) {
    if (sys.$eq(iV[0] , size)) break;
    const tr =sys.$checkNull( Q("tr"));
    for (let i = 0;i < 3; ++i) {
      if (sys.$eq(iV[0] , size)) {
        for (let j = i;j < 3; ++j) tr.add(Q("td"));
        break;
      }
      const d =sys.$checkNull( Dates[iV[0]]);
      const Lst =sys.$checkNull( Rks[Dates[0]]);
      const Prv =sys.$checkNull( sys.$eq(iV[0] , size - 1) ? [] : Rks[Dates[iV[0]+1]]);
      const Nxt =sys.$checkNull( sys.$eq(iV[0] , 0) ? [] : Rks[Dates[iV[0]-1]]);
      tr.add(Q("td").add(mkRk(Lst, Prv, Nxt, d, Rks[d])));
      arr.push(Trs,tr);
      iV[0] +=sys.$checkExists(iV[0], 1);
    }
  }

  const body =sys.$checkNull( Q("table")
    .att("align", "center")
    .adds(Trs))
  ;

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
  ;

};








 function mkRk( Lst,  Prv,  Nxt, date,  Rk)  {sys.$params(arguments.length, 5);
   const rk0 =sys.$checkNull( Rk[0]);
  const npars =sys.$checkNull( arr.size(rk0[flea.Params]));
  const isDate =sys.$checkNull( arr.any(
    ["ME", "ME2", "MM", "MX_MN"],
    function(m)  {sys.$params(arguments.length, 1);  return sys.$eq(m , rk0[flea.mdId]);}
  ));

  const Trs = []; 
  for (let i = 0;i < arr.size(Rk); ++i) {
     const f =sys.$checkNull( Rk[i]);
    arr.push(Trs,
      Q("tr")
        .add(Q("td")
          .klass("fnumber")
          .add(mkSym(Prv, f[flea.id], i)))
        .add(fns.mkTdN(f[flea.id], 0)
            .style("" +
              mkLineThrough(Nxt, f[flea.id]) +
              mkBackground(Lst, f[flea.id])
            )
          )
        .add(fns.mkTdN(f[flea.cycle], 0))
        .adds(sys.$eq(npars , 1)
            ? [fns.mkTdN(f[flea.Params][0], 4)]
            : [ fns.mkTdN(f[flea.Params][0], isDate ? 0 : 4),
                fns.mkTdN(f[flea.Params][1], 4)
              ]
          )
        .add(fns.mkTdN(f[flea.points], 0))
    );
  }
   return Q("table")
    .klass("border")
    .add(Q("tr")
      .add(Q("td")
        .att("colspan", sys.$eq(npars , 1) ? 5 : 6)
        .klass("header")
        .text(time.toIso(time.fromStr(date)[0]))))
    .add(Q("tr")
      .add(Q("td")
        .klass("header"))
      .add(Q("td")
        .klass("header")
        .text(II("Id.")))
      .add(Q("td")
        .klass("header")
        .text(II("Cy.")))
      .adds(sys.$eq(npars , 1)
          ? [ Q("td")
                .klass("header")
                .text(II("P1"))
            ]
          : [ Q("td")
                .klass("header")
                .text(II("P1")),
              Q("td")
                .klass("header")
                .text(II("P2"))
            ]
        )
      .add(Q("td")
        .klass("header")
        .text(II("Points"))))
    .adds(Trs)
  ;

};



 function mkSym( Prv, id, i)  {sys.$params(arguments.length, 3);
  const ix =sys.$checkNull( arr.index(Prv,function( f)  {sys.$params(arguments.length, 1);  return sys.$eq(f[flea.id] , id);}));
  const d = ix - i;
   return ui.img(
    sys.$eq(ix ,  -1)
      ? "rk-new"
      : d > 4
        ? "rk-up2"
        : d > 0
          ? "rk-up"
          : sys.$eq(d , 0)
            ? "rk-eq"
            : d >=  -4
              ? "rk-down"
              : "rk-down2"
  );
};



 function mkLineThrough( Next, id)  {sys.$params(arguments.length, 2);
   return !sys.asBool(Next)
    ? ""
    : arr.any(Next,function( f)  {sys.$params(arguments.length, 1);  return sys.$eq(f[flea.id] , id);})
      ? ""
      : "text-decoration: line-through;"
  ;
};



 function mkBackground(Last, id)  {sys.$params(arguments.length, 2);
   return sys.$eq(id , Last[0][flea.id])
    ? "background-color: #a89247;"
    : sys.$eq(id , Last[1][flea.id])
      ? "background-color: #b8b8b8;"
      : sys.$eq(id , Last[2][flea.id])
        ? "background-color: #b7805b;"
        : ""
  ;
};
