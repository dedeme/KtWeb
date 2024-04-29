import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as menu from  "../libdm/menu.js";
import * as cts from  "../cts.js";
import * as flea from  "../data/flea.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


 function mk2(wg, Fleas, order)  {sys.$params(arguments.length, 3);
  switch (order) {
    case "1id":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return f1[flea.id] < f2[flea.id];});break;}
    case "2id":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return f1[flea.id] > f2[flea.id];});break;}
    case "1cy":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.cycle] , f2[flea.cycle])
        ? flea.greater(f1, f2)
        : f1[flea.cycle] > f2[flea.cycle]
      ;});break;}
    case "2cy":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.cycle] , f2[flea.cycle])
        ? flea.greater(f1, f2)
        : f1[flea.cycle] < f2[flea.cycle]
      ;});break;}
    case "1p1":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.Params][0] , f2[flea.Params][0])
        ? flea.greater(f1, f2)
        : f1[flea.Params][0] < f2[flea.Params][0]
      ;});break;}
    case "2p1":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.Params][0] , f2[flea.Params][0])
        ? flea.greater(f1, f2)
        : f1[flea.Params][0] > f2[flea.Params][0]
      ;});break;}
    case "1p2":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.Params][1] , f2[flea.Params][1])
        ? flea.greater(f1, f2)
        : f1[flea.Params][1] < f2[flea.Params][1]
      ;});break;}
    case "2p2":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.Params][1] , f2[flea.Params][1])
        ? flea.greater(f1, f2)
        : f1[flea.Params][1] > f2[flea.Params][1]
      ;});break;}
    case "1as":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.assets] , f2[flea.assets])
        ? flea.greater(f1, f2)
        : f1[flea.assets] > f2[flea.assets]
      ;});break;}
    case "2as":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.assets] , f2[flea.assets])
        ? flea.greater(f1, f2)
        : f1[flea.assets] < f2[flea.assets]
      ;});break;}
    case "1pr":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.profits] , f2[flea.profits])
        ? flea.greater(f1, f2)
        : f1[flea.profits] > f2[flea.profits]
      ;});break;}
    case "2pr":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.profits] , f2[flea.profits])
        ? flea.greater(f1, f2)
        : f1[flea.profits] < f2[flea.profits]
      ;});break;}
    case "1po":{
      arr.sort(Fleas, flea.greater);break;}
    case "2po":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return !sys.asBool(flea.greater(f1, f2));});break;}
    case "1sa":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.sales] , f2[flea.sales])
        ? flea.greater(f1, f2)
        : f1[flea.profits] > f2[flea.profits]
      ;});break;}
    case "2sa":{
      arr.sort(Fleas, function( f1,  f2)  {sys.$params(arguments.length, 2);  return sys.$eq(f1[flea.sales] , f2[flea.sales])
        ? flea.greater(f1, f2)
        : f1[flea.profits] < f2[flea.profits]
      ;});break;}
    default:{
      arr.sort(Fleas, flea.greater);}
  }
   const f0 =sys.$checkNull( Fleas[0]);
  const npars =sys.$checkNull( arr.size(f0[flea.Params]));
  const isDate =sys.$checkNull( arr.any(
    ["ME", "ME2", "MM", "MX_MN"],
    function(m)  {sys.$params(arguments.length, 1);  return sys.$eq(m , f0[flea.mdId]);}
  ));

  

   function setOrder(o)  {sys.$params(arguments.length, 1);
    if (sys.$eq("1" + o , order)) mk2(wg, Fleas, "2" + o);
    else mk2(wg, Fleas, "1" + o);}
  ;

  

  const rId =sys.$checkNull( 0);
  const rCy =sys.$checkNull( 1);
  const rP1 =sys.$checkNull( 2);
  const rP2 =sys.$checkNull( 3);
  const rAs =sys.$checkNull( 4);
  const rPr =sys.$checkNull( 5);
  const rPo =sys.$checkNull( 6);
  const rSa =sys.$checkNull( 7);
  const Rows =sys.$checkNull( arr.map(Fleas, function( f)  {sys.$params(arguments.length, 1);  return [
      f[flea.id], f[flea.cycle], f[flea.Params][0],
      sys.$eq(npars , 2) ? f[flea.Params][1] :  -1,
      f[flea.assets], f[flea.profits], f[flea.points], f[flea.sales]
    ];}));

  wg
    .removeAll()
    .add(Q("table")
      .klass("border")
      .att("align", "center")
      .add(Q("tr")
        .adds(function()  {sys.$params(arguments.length, 0);
            const Tds =sys.$checkNull( []);
            arr.push(Tds,fns.mkTh(II("Id."), function() {sys.$params(arguments.length, 0); setOrder("id");}));
            arr.push(Tds,fns.mkTh(II("Cy."), function() {sys.$params(arguments.length, 0); setOrder("cy");}));
            arr.push(Tds,fns.mkTh(II("P1"), function() {sys.$params(arguments.length, 0); setOrder("p1");}));
            if (npars > 1) arr.push(Tds,fns.mkTh(II("P2"), function() {sys.$params(arguments.length, 0); setOrder("p2");}));
            arr.push(Tds,fns.mkTh(II("Assets"), function() {sys.$params(arguments.length, 0); setOrder("as");}));
            arr.push(Tds,fns.mkTh(II("Profits"), function() {sys.$params(arguments.length, 0); setOrder("pr");}));
            arr.push(Tds,fns.mkTh(II("Points"), function() {sys.$params(arguments.length, 0); setOrder("po");}));
            arr.push(Tds,fns.mkTh(II("Sales"), function() {sys.$params(arguments.length, 0); setOrder("sa");}));
             return Tds;
          }()))
      .adds(arr.map(Rows, function(R)  {sys.$params(arguments.length, 1);
          const Tds =sys.$checkNull( []);
          arr.push(Tds,fns.mkTdN(R[rId], 0));
          arr.push(Tds,fns.mkTdN(R[rCy], 0));
          arr.push(Tds,fns.mkTdN(R[rP1], isDate ? 0 : 4));
          if (npars > 1) arr.push(Tds,fns.mkTdN(R[rP2], 4));
          arr.push(Tds,fns.mkTdN(R[rAs], 2));
          arr.push(Tds,fns.mkTdN(R[rPr], 4));
          arr.push(Tds,fns.mkTdN(R[rPo], 0));
          arr.push(Tds,fns.mkTdN(R[rSa], 0));
           return Q("tr").adds(Tds);
        })))
  ;

};


export  async  function mk(wg)  {sys.$params(arguments.length, 1);
   const Url =sys.$checkNull( ui.url());
  const modelId =sys.$checkNull( arr.size(Url) > 1 ? Url[1] : "");

  const {mdId,  Models,  FleasJs} 
  = await  client.send({
    prg: cts.appName,
    source: "FleasPg",
    rq: "idata",
    modelId:modelId
  });

  const Fleas =sys.$checkNull( arr.map(FleasJs, flea.fromJs));
  const page =sys.$checkNull( "fleas&" + mdId);

   const Lopts =sys.$checkNull( arr.reduce(Models,
    [],
    function( R, mId)  {sys.$params(arguments.length, 2);
      arr.push(R,menu.tlink("fleas&" + mId, mId));
      arr.push(R,menu.separator());
       return R;
    }
  ));
  arr.pop(Lopts);

  const menuWg =sys.$checkNull( menu.mk(Lopts, [], page));

  const body =sys.$checkNull( Q("div"));

  wg
    .removeAll()
    .add(menuWg)
    .add(body)
  ;

  mk2(body, Fleas, "1po");
};
