import * as math from '../_js/math.js';import * as js from '../_js/js.js';import * as arr from '../_js/arr.js';import * as client from '../_js/client.js';import * as bytes from '../_js/bytes.js';import * as str from '../_js/str.js';import * as ui from '../_js/ui.js';import * as dic from '../_js/dic.js';import * as timer from '../_js/timer.js';import * as time from '../_js/time.js';import * as storage from '../_js/storage.js';import * as b64 from '../_js/b64.js';import * as sys from '../_js/sys.js';import * as iter from '../_js/iter.js';import * as domo from '../_js/domo.js';import * as cryp from '../_js/cryp.js';




import * as acc from  "../data/acc.js";
import * as all from  "../data/all.js";
import * as cts from  "../data/cts.js";
import * as balance from  "../data/balance.js";
import * as profits from  "../data/profits.js";
import * as fns from  "../fns.js";
import * as i18n from  "../i18n.js";

const Q =sys.$checkNull( ui.q);
const II =sys.$checkNull( i18n.tlt);


export  function mk(wg, account)  {sys.$params(arguments.length, 2);
  const ac =sys.$checkNull(sys.asBool( sys.asBool(sys.$eq(acc.descriptionOf(account) , "")) || sys.asBool(str.len(account) > 3)) ? "" : account);
  const acLen =sys.$checkNull( str.len(ac));
  const modIdV =sys.$checkNull( [""]);

  const selectIdDiv =sys.$checkNull( Q("div"));
  const selectIdV =sys.$checkNull( [[]]);

  const nameField =sys.$checkNull( ui.field("newBt")
    .att("id", "autofocus"))
  ;
  const groupField =sys.$checkNull( Q("input")
    .att("type", "text")
    .klass("frame")
    .style("width:45px;color:#000000;text-align:center;")
    .disabled(true))
  ;

  const modIdTd =sys.$checkNull( Q("td")
    .att("colspan", "2"))
  ;
  

  
   async  function update()  {sys.$params(arguments.length, 0);
    const desc =sys.$checkNull( nameField.getValue().trim());
    if (sys.asBool(sys.$eq(desc , ""))) {
      ui.alert(II("Description is missing"));
      return;
    }
    const summary =sys.$checkNull( groupField.getValue().trim());
    if (sys.asBool(sys.asBool(sys.$eq(acLen , 2)) && sys.asBool(sys.$eq(summary , "")))) {
      ui.alert(II("Group is missing"));
      return;
    }
    const id =sys.$checkNull( ac + selectIdV[0].getValue());

    const error =sys.$checkNull(sys.asBool( sys.$eq(modIdV[0] , ""))
    ?   
        sys.$eq(acLen,1)? acc.subgroupAdd(id, desc):
        sys.$eq(acLen,2)? acc.accountAdd(id, desc, summary):
         acc.subaccountAdd(id, desc)
      
    :   
        sys.$eq(acLen,1)? acc.subgroupMod(modIdV[0], id, desc):
        sys.$eq(acLen,2)? acc.accountMod(modIdV[0], id, desc, summary):
         acc.subaccountMod(modIdV[0], id, desc)
      )
    ;

    if (sys.asBool(sys.$neq(error , ""))) {
      ui.alert(error);
      return;
    }
    await all.send();
    mk(wg, ac);
  };

  
   function modifyCancel()  {sys.$params(arguments.length, 0);
    modIdV[0] =sys.$checkExists(modIdV[0],sys.$checkNull( ""));
    modIdTd
      .removeAll()
      .att("colspan", "2");
    const selectId =sys.$checkNull( ui.select("enterId", acc.available(ac, "")));
    selectIdDiv
      .removeAll()
      .add(selectId)
    ;
    nameField.value("");
    groupField.value("");
  };

  
   function modifyStart(id, description, summary)  {sys.$params(arguments.length, 3);
    modIdV[0] =sys.$checkExists(modIdV[0],sys.$checkNull( id));
    modIdTd
      .removeAll()
      .att("colspan", "2")
      .add(ui.link(function(e)  {sys.$params(arguments.length, 1); modifyCancel();})
            .add(ui.img("cancel")));
    const idKey =sys.$checkNull( sys.$slice(id,acLen,null));
    selectIdV[0] =sys.$checkExists(selectIdV[0],sys.$checkNull( ui.select("enterId", acc.available(ac, idKey))));
    selectIdV[0].value(idKey);
    selectIdDiv
      .removeAll()
      .add(selectIdV[0])
    ;
    nameField.value(description);
    groupField.value(summary);
  };

  
   async  function del(id, description)  {sys.$params(arguments.length, 2);
    if (sys.asBool(!sys.asBool(ui.confirm(i18n.fmt(II("Delete '%0'?"), [id + " - " + description]))))) {
      return;
    }
    const error =sys.$checkNull(   
      sys.$eq(acLen,1)? acc.subgroupDeletable(id):
      sys.$eq(acLen,2)? acc.accountDeletable(id):
       acc.subaccountDeletable(id)
    );
    if (sys.asBool(sys.$neq(error , ""))) {
      ui.alert(error);
      return;
    }
    switch (acLen) {
      case 1:{ acc.subgroupDel(id);break;}
      case 2:{ acc.accountDel(id);break;}
      default:{ acc.subaccountDel(id);}
    }
    await all.send();
    mk(wg, ac);
  };

  

  
   function left() {sys.$params(arguments.length, 0);
    
     function mkBalance()  {sys.$params(arguments.length, 0);
      const R =sys.$checkNull( []); 
      const Groups =sys.$checkNull( balance.groups());
      for (const [gkey, gname]  of sys.$forObject2( Groups)) {
        const Sub =sys.$checkNull( []); 
        const Entries =sys.$checkNull( balance.entries());
        for (const [ekey, ename]  of sys.$forObject2( Entries)) {
          if (sys.asBool(sys.$eq(balance.groupOf(ekey) , gkey))) {
            arr.push(Sub, Q("li")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); groupField.value("B" + ekey);})
                .klass("link")
                .att("title", "B" + ekey)
                .html(fns.cutRight(ename, 45)))
            );
          }
        }
        arr.push(R, Q("li")
          .html("<a href='#' onclick='return false;'>" + gname + "</a>")
          .add(Q("ul").att("id", "hlist")
            .style("list-style:none;padding-left:10px;")
            .adds(Sub))
        );
      }
       return R;
    };

    
     function mkProfits()  {sys.$params(arguments.length, 0);
      const R =sys.$checkNull( []); 
      const Groups =sys.$checkNull( profits.groups());
      for (const [gkey, gname]  of sys.$forObject2( Groups)) {
        const Sub =sys.$checkNull( []); 
        const Entries =sys.$checkNull( profits.entries());
        for (const [ekey, ename]  of sys.$forObject2( Entries)) {
          if (sys.asBool(sys.$eq(profits.groupOf(ekey) , gkey))) {
            arr.push(Sub, Q("li")
              .add(ui.link(function(e)  {sys.$params(arguments.length, 1); groupField.value("P" + ekey);})
                .klass("link")
                .att("title", "P" + ekey)
                .html(fns.cutRight(ename, 45)))
            );
          }
        }
        arr.push(R, Q("li")
          .html("<a href='#' onclick='return false;'>" + gname + "</a>")
          .add(Q("ul").att("id", "hlist")
            .style("list-style:none;padding-left:10px;")
            .adds(Sub))
        );
      }
       return R;
    };

     return Q("td")
      .klass("frame")
      .style("width:350px;vertical-align:top;")
        .add(Q("p")
          .html("<b>Balance</b>"))
        .add(Q("ul")
          .style("list-style:none;padding-left:0px;")
          .adds(mkBalance()))
        .add(Q("p")
          .html("<b>PyG</b>"))
        .add(Q("ul")
          .style("list-style:none;padding-left:0px;")
          .adds(mkProfits()))
    ;
  };

  
   function right()  {sys.$params(arguments.length, 0);
    const title =sys.$checkNull(   
      sys.$eq(arr.size(ac),1)? II("Subgroups"):
      sys.$eq(arr.size(ac),2)? II("Accounts"):
      sys.$eq(arr.size(ac),3)? II("Subaccounts"):
       II("Groups")
    );

    
     function mkSubmenu()  {sys.$params(arguments.length, 0);
      
       function separator()  {sys.$params(arguments.length, 0);  return Q("span").text("|");};

      
       function entry(tx, lk)  {sys.$params(arguments.length, 2);
         return ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?plan&" + lk);})
          .klass("link")
          .text(" " + tx + " ")
      ;};

      const Es =sys.$checkNull( [separator(), entry("*", ""), separator()]);
      
       function add(tx, lk)  {sys.$params(arguments.length, 2);
        arr.push(Es, entry(tx, lk));
        arr.push(Es, separator());
      };
      if (sys.asBool(acLen > 0)) add(ac[0], ac[0]);
      if (sys.asBool(acLen > 1)) add(ac[1], sys.$slice(ac,null,2));
      if (sys.asBool(acLen > 2)) add(ac[2], ac);
       return Q("p").adds(Es);
    };

    nameField.value("");
    groupField.value("");
    selectIdV[0] =sys.$checkExists(selectIdV[0],sys.$checkNull( ui.select("enterId", acc.available(ac, ""))));
    selectIdDiv
      .removeAll()
      .add(selectIdV[0])
    ;
    if (sys.asBool(!sys.asBool(all.isLastYear()))) {
      nameField.disabled(true);
      selectIdV[0].disabled(true);
    }

    const Rows =sys.$checkNull( []); 
    const colsV =sys.$checkNull( [2]);
    if (sys.asBool(sys.$neq(ac , ""))) colsV[0] +=sys.$checkExists(colsV[0],sys.$checkNull( 2));
    if (sys.asBool(sys.$eq(acLen , 2))) colsV[0] +=sys.$checkExists(colsV[0],sys.$checkNull( 1));
    const cols =sys.$checkNull( colsV[0]);

    
    if (sys.asBool(sys.$neq(ac , ""))) {
      const Tds =sys.$checkNull( [
        Q("td")
          .att("colspan", 2)
          .add(Q("button")
            .style("border:1px solid #a0a9ae;padding:0px;width:32px;")
            .att("id", "newBt")
              .add(ui.img("enter")
                .att("style", "padding:0px;margin:0px;vertical-align:-20%"))
            .disabled(!sys.asBool(all.isLastYear()))
            .on("click", function(e)  {sys.$params(arguments.length, 1); update();})),
        Q("td")
          .add(selectIdDiv),
        Q("td")
          .add(nameField)
      ]);
      if (sys.asBool(sys.$eq(acLen , 2))) arr.push(Tds, Q("td").add(groupField));

      arr.push(Rows, Q("tr").adds(Tds));
      arr.push(Rows, Q("tr")
        .add(Q("td")
          .att("colspan", cols)
          .add(Q("hr")))
      );
    }

    
    const Tds =sys.$checkNull( []); 
    if (sys.asBool(sys.$neq(ac , ""))) {
      arr.push(Tds, modIdTd);
    }
    arr.push(Tds, Q("td")
      .html(II("Nº")));
    arr.push(Tds, Q("td")
      .style("text-align:left;").html(II("Description")));
    if (sys.asBool(sys.$eq(acLen , 2))) {
      arr.push(Tds, Q("td")
        .html(II("Group")));
    }
    arr.push(Rows, Q("tr").adds(Tds));
    arr.push(Rows, Q("tr")
      .add(Q("td")
        .att("colspan", cols)
        .add(Q("hr")))
    );

    
    const Sub =sys.$checkNull( acc.sub(ac));
    for (const [k, V]  of sys.$forObject2( Sub)) {
      const Tds =sys.$checkNull( []); 
      if (sys.asBool(sys.$neq(ac , ""))) {
        if (sys.asBool(
          sys.asBool(sys.asBool(sys.asBool(sys.asBool(sys.asBool(sys.asBool(sys.asBool(sys.asBool(sys.asBool(sys.$eq(k , sys.$slice(cts.cash,null,2))) ||
          sys.asBool(sys.$eq(k , sys.$slice(cts.cash,null,3)))) ||
          sys.asBool(sys.$eq(k , cts.cash))) ||
          sys.asBool(sys.$eq(k , sys.$slice(cts.capital,null,2)))) ||
          sys.asBool(sys.$eq(k , sys.$slice(cts.capital,null,3)))) ||
          sys.asBool(sys.$eq(k , cts.capital))) ||
          sys.asBool(sys.$eq(k , sys.$slice(cts.results,null,2)))) ||
          sys.asBool(sys.$eq(k , sys.$slice(cts.results,null,3)))) ||
          sys.asBool(sys.$eq(k , cts.results))) ||
          sys.asBool(!sys.asBool(all.isLastYear())))
        ) {
          arr.push(Tds, Q("td").add(ui.lightImg("edit")));
          arr.push(Tds, Q("td").add(ui.lightImg("delete")));
        } else {
          arr.push(Tds, Q("td")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); modifyStart(k, V.description, V.summary);})
              .add(ui.img("edit"))));
          arr.push(Tds, Q("td")
            .add(ui.link(function(e)  {sys.$params(arguments.length, 1); del(k, V.description);})
              .add(ui.img("delete"))));
        }
      }
      arr.push(Tds, Q("td")
        .style("text-align:right;")
        .text(sys.$slice(k,acLen,null))
      );
      arr.push(Tds, Q("td")
        .style("text-align:left;")
        .add(sys.asBool(acLen < 3)
          ? ui.link(function(e)  {sys.$params(arguments.length, 1); window.location.assign("?plan&" + k);})
            .klass("link")
            .add(Q("span").text(V.description))
          : Q("span").text(V.description))
      );
      if (sys.asBool(sys.$eq(acLen , 2))) {
        arr.push(Tds, Q("td")
          .style("text-align:left;")
          .text(V.summary)
        );
      }
      arr.push(Rows, Q("tr").adds(Tds));
    }

     return Q("td")
      .style("text-align:center;vertical-align:top;")
      .add(Q("div")
        .klass("head")
        .html(title))
      .add(mkSubmenu())
      .add(Q("table")
        .att("align", "center")
        .klass("frame")
        .adds(Rows))
    ;
  };

  wg
    .removeAll()
    .add(Q("table")
      .klass("main")
      .add(Q("tr")
        .add(sys.asBool(sys.asBool(sys.$eq(acLen , 2)) && sys.asBool(all.isLastYear())) ? left() : Q("div"))
        .add(right())))
  ;
};
