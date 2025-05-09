import * as arr from '../_js/arr.js';import * as bytes from '../_js/bytes.js';import * as storage from '../_js/storage.js';import * as sys from '../_js/sys.js';import * as client from '../_js/client.js';import * as b64 from '../_js/b64.js';import * as ui from '../_js/ui.js';import * as js from '../_js/js.js';import * as iter from '../_js/iter.js';import * as math from '../_js/math.js';import * as str from '../_js/str.js';import * as timer from '../_js/timer.js';import * as domo from '../_js/domo.js';import * as dic from '../_js/dic.js';import * as cryp from '../_js/cryp.js';import * as time from '../_js/time.js';




import * as i18n from  "../i18n.js";
import * as msgPg from  "../pgs/msgPg.js";
import * as cts from  "../cts.js";
import * as indexTree from  "../data/indexTree.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  async  function mk(wg, pack)  {sys.$params(arguments.length, 2);
  
   const {treeOp} = await  client.send({
    prg: cts.appName,
    source: "IndexPg",
    rq: "index",
    pack:pack
  });

  if (!sys.asBool(treeOp)) {
    msgPg.mk(wg, II("Library path not found o not valid."), true);
    return;
  }

   const tree =sys.$checkNull( treeOp[0]);
  const linkPrefix = "?" + pack + "@";

  Q("@title").text(cts.appName + " - " + pack);

  const Trs = [];
  add(Trs, tree[indexTree.Trees], "", 0, linkPrefix);

  wg
    .removeAll()
    .add(Q("div")
      .klass("frame")
      .add(Q("table")
        .klass("main")
        .adds(Trs)))
  ;
};


 function add( Trs,  Trees, ppath, space, linkPrefix)  {sys.$params(arguments.length, 5);
  const path =sys.$checkNull( sys.$neq(ppath , "") ? ppath + "/" : ppath);

  arr.sort(Trees,function( t1,  t2)  {sys.$params(arguments.length, 2);
     return !sys.asBool(t1[indexTree.docOp])
      ? !sys.asBool(t2[indexTree.docOp])
        ? str.less(str.toUpper(t1[indexTree.id]), str.toUpper(t2[indexTree.id]))
        : true
      : !sys.asBool(t2[indexTree.docOp])
        ? false
        : str.less(str.toUpper(t1[indexTree.id]), str.toUpper(t2[indexTree.id]))
    ;}
  );
  for (const  t  of sys.$forObject( Trees)) {
    if (!sys.asBool(!sys.asBool(t[indexTree.docOp]))) {
      arr.push(Trs,Q("tr")
        .add(Q("td")
          .style('width:10px;padding-left:' + space + 'px')
          .html(str.fmt(
              '<a href="%v%v%v">%v</a>',
              [linkPrefix, path, t[indexTree.id], t[indexTree.id]]
            )))
        .add(Q("td")
          .style("padding-left:10px")
          .text(t[indexTree.docOp][0]))
      );
    } else {
      arr.push(Trs,Q("tr")
        .add(Q("td")
          .style('padding-left:' + space + 'px')
          .html('<b>' + t[indexTree.id] + '</b>'))
        .add(Q("td"))
      );
      add(Trs, t[indexTree.Trees], path + t[indexTree.id], space + 20, linkPrefix);
    }
  }
};
