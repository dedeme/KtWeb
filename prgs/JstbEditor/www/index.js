(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class Authentication {
	constructor(wg,app,fnOk) {
		this.wg = wg;
		this.app = app;
		this.fnOk = fnOk;
		this.captcha = new dm_Captcha("" + app + "__captcha");
		this.failed = false;
		this.view();
	}
	view() {
		let pass = dm_Ui.pass("accept").att("id","autofocus");
		let userIn = dm_Ui.field("autofocus").value("admin");
		let persistent = dm_Ui.Q("input").att("type","checkbox").style("vertical-align: middle").checked(true);
		let _gthis = this;
		let accept = dm_Ui.Q("button").att("id","accept").on(dm_ActionType.CLICK,function(e) {
			_gthis.send(userIn.getValue().trim(),pass.getValue().trim(),!persistent.getChecked());
		}).text(I18n._("Accept"));
		let rows = dm_Ui.Q("tr").add(dm_Ui.Q("td").style("padding: 10px 0px 0px 10px;text-align:right;").html(I18n._("User"))).add(dm_Ui.Q("td").style("padding: 10px 10px 0px 10px;").add(userIn));
		let rows1 = dm_Ui.Q("tr").add(dm_Ui.Q("td").style("padding: 10px 0px 0px 10px;text-align:right;").html(I18n._("Password"))).add(dm_Ui.Q("td").style("padding: 10px 10px 5px 10px;").add(pass));
		let rows2 = dm_Ui.Q("tr");
		let rows3 = dm_Ui.Q("td").att("colspan",2).style("border-top:1px solid #c9c9c9;" + "padding: 5px 10px 10px;text-align:right;");
		let rows4 = dm_Ui.Q("table").style("border-collapse : collapse;" + "border : 0px;" + "width : 100%;").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("align","center").att("colspan",2).add(persistent).add(dm_Ui.Q("span").html("&nbsp;" + I18n._("Keep connected")))));
		let rows5 = dm_Ui.Q("tr");
		let rows6 = dm_Ui.Q("td");
		let rows7 = I18n.lang == "en" ? "ES" : "EN";
		let rows8 = [rows,rows1,rows2.add(rows3.add(rows4.add(rows5.add(rows6.add(dm_Ui.link(function(e) {
			_gthis.changeLanguage();
		}).att("class","link").html(rows7))).add(dm_Ui.Q("td").att("align","right").add(accept)))))];
		if(this.failed) {
			rows8.push(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).style("border-top:1px solid #c9c9c9;" + "adding: 10px 10px 10px;text-align:right;").add(dm_Ui.Q("table").att("align","center").style("background-color: rgb(250, 250, 250);" + "border: 1px solid rgb(110,130,150);" + "font-family: sans;font-size: 14px;" + "padding: 4px;border-radius: 4px;").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").html(I18n._("Wrong password")))))));
		}
		if(this.captcha.isUpLimit()) {
			rows8.push(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).att("align","center").add(this.captcha.wg)));
			rows8.push(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).style("padding: 5px 0px 5px 10px;text-align:center;").html(I18n._("Check gray squares"))));
		}
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").html("&nbsp;<br>" + this.app + "<br>&nbsp;")).add(dm_Ui.Q("table").att("align","center").style("background-color: #f8f8f8;" + "border-collapse: collapse;" + "padding: 10px;" + "border: 1px solid rgb(110,130,150);").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).style("background-color:#e8e8e8;" + "border-bottom:1px solid #c9c9c9;" + "padding: 10px;" + "color:#505050;").html("<big><big><b>" + I18n._("Login") + "</big></big></b>"))).adds(rows8));
		pass.e.focus();
	}
	changeLanguage() {
		if(I18n.lang == "es") {
			I18n.en();
		} else {
			I18n.es();
		}
		this.view();
	}
	send(user,pass,withExpiration) {
		if(user == "") {
			dm_Ui.alert(I18n._("User name is missing"));
			return;
		}
		if(pass == "") {
			dm_Ui.alert(I18n._("Password is missing"));
			return;
		}
		if(this.captcha.isUpLimit() && !this.captcha.check()) {
			dm_Ui.alert(I18n._("Grey squares checks are wrong"));
			this.captcha = new dm_Captcha("" + this.app + "__captcha");
			this.view();
			return;
		}
		let _gthis = this;
		Global.client.authentication(user,pass,withExpiration,function(ok) {
			if(ok) {
				_gthis.captcha.reset();
				_gthis.fnOk();
			} else {
				_gthis.failed = true;
				_gthis.captcha.increment();
				_gthis.captcha = new dm_Captcha("" + _gthis.app + "__captcha");
				_gthis.view();
			}
		});
	}
}
Authentication.__name__ = true;
Object.assign(Authentication.prototype, {
	__class__: Authentication
});
class dm_Ui {
	static Q(str,el) {
		if(str == null) {
			return new dm_Domo(el);
		}
		switch(str.charAt(0)) {
		case "#":
			return new dm_Domo(window.document.getElementById(str.substring(1)));
		case "@":
			return new dm_Domo(window.document.querySelector(str.substring(1)));
		default:
			return new dm_Domo(window.document.createElement(str));
		}
	}
	static alert(msg) {
		alert(Std.string(msg));
	}
	static confirm(msg) {
		return confirm(Std.string(msg));
	}
	static url() {
		let search = $global.location.search;
		if(search == "") {
			return new haxe_ds_StringMap();
		}
		return dm_It.from(search.substring(1).split("&")).reduce(new dm_Tp(new haxe_ds_StringMap(),0),function(s,e) {
			let ix = e.indexOf("=");
			if(ix == -1) {
				let this1 = s.e1;
				let key = s.e2 == null ? "null" : "" + s.e2;
				let value = decodeURIComponent(e.split("+").join(" "));
				this1.h[key] = value;
			} else {
				let this1 = s.e1;
				let s1 = e.substring(0,ix);
				let key = decodeURIComponent(s1.split("+").join(" "));
				let s2 = e.substring(ix + 1);
				let value = decodeURIComponent(s2.split("+").join(" "));
				this1.h[key] = value;
			}
			return new dm_Tp(s.e1,s.e2 + 1);
		}).e1;
	}
	static img(name) {
		if(name.indexOf(".") == -1) {
			name += ".png";
		}
		return dm_Ui.Q("img").att("src","img/" + name);
	}
	static field(targetId) {
		let r = dm_Ui.Q("input").att("type","text");
		r.e.onkeydown = function(e) {
			if(e.keyCode == 13) {
				e.preventDefault();
				dm_Ui.Q("#" + targetId).e.focus();
			}
		};
		return r;
	}
	static pass(targetId) {
		let r = dm_Ui.Q("input").att("type","password");
		r.e.onkeydown = function(e) {
			if(e.keyCode == 13) {
				e.preventDefault();
				dm_Ui.Q("#" + targetId).e.focus();
			}
		};
		return r;
	}
	static link(f) {
		return dm_Ui.Q("span").att("style","cursor:pointer").on(dm_ActionType.CLICK,f);
	}
	static led(color,side) {
		if(side == null) {
			side = 6;
		}
		return dm_Ui.Q("div").style("padding:" + side + "px;" + "border: 1px solid #002040;border-radius: " + side + "px;" + "background: " + color + ";");
	}
	static hrule(label,margin) {
		if(margin == null) {
			margin = 50;
		}
		return dm_Ui.Q("table").style("border-collapse: collapse;" + "border : 0px;" + "width : 100%").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width: " + margin + "px").add(dm_Ui.Q("hr"))).add(dm_Ui.Q("td").style("white-space:nowrap; width: 5px").text(" " + label + " ")).add(dm_Ui.Q("td").add(dm_Ui.Q("hr"))));
	}
}
dm_Ui.__name__ = true;
class dm_Domo {
	constructor(e) {
		this.e = e;
	}
	html(tx) {
		this.e.innerHTML = tx;
		return this;
	}
	text(tx) {
		this.e.textContent = tx;
		return this;
	}
	klass(tx) {
		this.e.className = tx;
		return this;
	}
	style(tx) {
		this.e.setAttribute("style",tx);
		return this;
	}
	setStyle(key,tx) {
		this.e.style.setProperty(key,tx);
		return this;
	}
	att(key,value) {
		this.e.setAttribute(key,value);
		return this;
	}
	disabled(v) {
		this.e.disabled = v;
		return this;
	}
	getValue() {
		return this.e.value;
	}
	value(v) {
		this.e.value = v;
		return this;
	}
	getChecked() {
		return this.e.checked;
	}
	checked(v) {
		this.e.checked = v;
		return this;
	}
	add(o) {
		this.e.appendChild(o.e);
		return this;
	}
	adds(obs) {
		let ob = $getIterator(obs);
		while(ob.hasNext()) {
			let ob1 = ob.next();
			this.e.appendChild(ob1.e);
		}
		return this;
	}
	removeAll() {
		this.e.innerHTML = "";
		return this;
	}
	on(type,action) {
		let act;
		switch(type._hx_index) {
		case 0:
			act = "blur";
			break;
		case 1:
			act = "change";
			break;
		case 2:
			act = "click";
			break;
		case 3:
			act = "dblclick";
			break;
		case 4:
			act = "focus";
			break;
		case 5:
			act = "input";
			break;
		case 6:
			act = "keydown";
			break;
		case 7:
			act = "keypress";
			break;
		case 8:
			act = "keyup";
			break;
		case 9:
			act = "load";
			break;
		case 10:
			act = "mousedown";
			break;
		case 11:
			act = "mousemove";
			break;
		case 12:
			act = "mouseout";
			break;
		case 13:
			act = "mouseover";
			break;
		case 14:
			act = "mouseup";
			break;
		case 15:
			act = "wheel";
			break;
		case 16:
			act = "select";
			break;
		case 17:
			act = "selectstart";
			break;
		case 18:
			act = "submit";
			break;
		}
		this.e.addEventListener(act,action,false);
		return this;
	}
}
dm_Domo.__name__ = true;
Object.assign(dm_Domo.prototype, {
	__class__: dm_Domo
});
class Cts {
}
Cts.__name__ = true;
class I18n {
	static en() {
		I18n.lang = "en";
	}
	static es() {
		I18n.lang = "es";
	}
	static _(key) {
		let dic = I18n.lang == "en" ? I18n.enDic : I18n.esDic;
		if(Object.prototype.hasOwnProperty.call(dic.h,key)) {
			return dic.h[key];
		} else {
			return key;
		}
	}
	static _args(key,args) {
		let bf = "";
		let v = I18n._(key);
		let isCode = false;
		let _g = 0;
		let _g1 = v.length;
		while(_g < _g1) {
			let i = _g++;
			let ch = v.charAt(i);
			if(isCode) {
				if(ch >= "0" && ch <= "9") {
					bf += args[Std.parseInt(ch)];
				} else {
					bf += "%" + ch;
				}
				isCode = false;
			} else if(ch == "%") {
				isCode = true;
			} else {
				bf += ch;
			}
		}
		return bf;
	}
}
I18n.__name__ = true;
class MsgPg {
	constructor(wg,msg,withReload) {
		if(withReload == null) {
			withReload = true;
		}
		this.wg = wg;
		this.msg = msg;
		this.withReload = withReload;
	}
	show() {
		let reload = "<p><b>" + I18n._args(I18n._("Click %0 to continue."),[MsgPg.tx]) + "</b></p>";
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").style("padding-bottom:20px;").text(Cts.appName)).add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("table").klass("border").att("width","100%").style("background-color: #f8f8f8; border-collapse: collapse").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("padding:0px 10px 0px 10px;").html("<p>" + this.msg + "<p>" + (this.withReload ? reload : ""))))))));
	}
}
MsgPg.__name__ = true;
Object.assign(MsgPg.prototype, {
	__class__: MsgPg
});
class dm_Client {
	constructor(isDmCgi,appName,fExpired) {
		this.level = "";
		this.user = "";
		this.connectionKey = "";
		this.key = "0";
		this.isDmCgi = isDmCgi;
		this.appName = appName;
		this.fExpired = fExpired;
	}
	setSessionId(value) {
		dm_Store.put("Client_sessionId_" + this.appName,value);
	}
	sendServer(rq,fn) {
		let request = new XMLHttpRequest();
		request.onload = function(_) {
			if(request.status == 200) {
				fn(StringTools.trim(request.responseText));
			} else {
				throw new haxe_Exception(request.statusText);
			}
		};
		request.onerror = function(_) {
			throw new haxe_Exception("Network Error");
		};
		request.open("POST","http://" + $global.location.host + (this.isDmCgi ? "/cgi-bin/ccgi.sh" : ""),true);
		request.setRequestHeader("Content-Type","text/plain");
		request.send(this.appName + ":" + rq);
	}
	sendCommon(isSecure,data,fn) {
		let _gthis = this;
		let fn2 = function(rp) {
			let data;
			try {
				let jdata = dm_Cryp.decryp(_gthis.key,rp);
				data = dm_Js.from(jdata).ro();
			} catch( _g ) {
				let e = haxe_Exception.caught(_g);
				try {
					let jdata = dm_Cryp.decryp("nosession",rp);
					let data = dm_Js.from(jdata).ro();
					if(Object.prototype.hasOwnProperty.call(data.h,"expired")) {
						_gthis.fExpired();
						return;
					}
					throw haxe_Exception.thrown(e);
				} catch( _g ) {
					throw haxe_Exception.thrown("RAW SERVER RESPONSE:\n" + rp + "\nCLIENT ERROR:\n" + Std.string(e));
				}
			}
			fn(data);
		};
		let rq = isSecure ? this.sessionId() + ":" + this.connectionKey + ":" + dm_Cryp.cryp(this.key,dm_Js.wo(data).to()) : this.sessionId() + ":" + dm_Cryp.cryp(this.key,dm_Js.wo(data).to());
		this.sendServer(rq,fn2);
	}
	sessionId() {
		let _g = dm_Store.get("Client_sessionId_" + this.appName);
		switch(_g._hx_index) {
		case 0:
			let ss = _g.v;
			return ss;
		case 1:
			return dm_B64.encode("0");
		}
	}
	connect(fn) {
		let _gthis = this;
		let fn2 = function(rp) {
			try {
				let jdata = dm_Cryp.decryp(_gthis.sessionId(),rp);
				let data = dm_Js.from(jdata).ro();
				_gthis.key = data.h["key"].rs();
				if(_gthis.key == "") {
					fn(false);
					return;
				}
				_gthis.user = data.h["user"].rs();
				_gthis.level = data.h["level"].rs();
				_gthis.connectionKey = data.h["conKey"].rs();
				fn(true);
			} catch( _g ) {
				let e = haxe_Exception.caught(_g);
				console.log("../../../hxlib/dm/Client.hx:118:","RAW SERVER RESPONSE:\n" + rp + "\nCLIENT ERROR:\n" + Std.string(e));
			}
		};
		this.sendServer(this.sessionId(),fn2);
	}
	authentication(user,pass,withExpiration,fn) {
		let _gthis = this;
		let fn2 = function(rp) {
			try {
				let jdata = dm_Cryp.decryp(_gthis.key,rp);
				let data = dm_Js.from(jdata).ro();
				let sessionId = data.h["sessionId"].rs();
				if(sessionId == "") {
					fn(false);
					return;
				}
				_gthis.setSessionId(sessionId);
				_gthis.user = user;
				_gthis.key = data.h["key"].rs();
				_gthis.level = data.h["level"].rs();
				_gthis.connectionKey = data.h["conKey"].rs();
				fn(true);
			} catch( _g ) {
				let e = haxe_Exception.caught(_g);
				console.log("../../../hxlib/dm/Client.hx:150:","RAW SERVER RESPONSE:\n" + rp + "\nCLIENT ERROR:\n" + Std.string(e));
			}
		};
		this.key = dm_Cryp.key(this.appName,dm_Client.klen);
		let p = dm_Client.crypPass(pass);
		let exp = withExpiration ? "1" : "0";
		this.sendServer(":" + dm_Cryp.cryp(this.key,"" + user + ":" + p + ":" + exp),fn2);
	}
	send(rq,fn) {
		this.sendCommon(false,rq,fn);
	}
	ssend(rq,fn) {
		this.sendCommon(true,rq,fn);
	}
	static crypPass(pass) {
		return dm_Cryp.key(pass,dm_Client.klen);
	}
}
dm_Client.__name__ = true;
Object.assign(dm_Client.prototype, {
	__class__: dm_Client
});
class Global {
}
Global.__name__ = true;
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
class Main {
	constructor(wg,lang) {
		this.wg = wg;
		if(lang == "es") {
			I18n.es();
		} else {
			I18n.en();
		}
	}
	show() {
		let url = dm_Ui.url();
		let tpath = dm_Option.None;
		if(Object.prototype.hasOwnProperty.call(url.h,"0")) {
			try {
				tpath = dm_Option.Some(data_Tpath.fromJs(dm_Js.from(dm_B64.decode(url.h["0"]))));
			} catch( _g ) {
			}
		}
		let body = dm_Ui.Q("div");
		switch(tpath._hx_index) {
		case 0:
			let path = tpath.v;
			pgs_Editor.mk(body,path);
			break;
		case 1:
			pgs_TlistEditor.mk(body);
			break;
		}
		this.wg.removeAll().add(body);
	}
	static mk(wg,fn) {
		Global.client.connect(function(ok) {
			if(ok) {
				let _g = new haxe_ds_StringMap();
				let value = dm_Js.ws("Main");
				_g.h["prg"] = value;
				let value1 = dm_Js.ws("Main");
				_g.h["source"] = value1;
				let value2 = dm_Js.ws("lang");
				_g.h["rq"] = value2;
				Global.client.send(_g,function(rp) {
					let lang = rp.h["lang"].rs();
					new Main(wg,lang).show();
					fn();
				});
			} else {
				new Authentication(wg,Cts.appName,function() {
					Main.mk(wg,fn);
				});
				fn();
			}
		});
	}
	static main() {
		let wg = dm_Ui.Q("div");
		Main.mk(wg,function() {
			dm_Ui.Q("@body").removeAll().add(wg).add(Cts.foot);
			haxe_Timer.delay(function() {
				let fc = dm_Ui.Q("#autofocus");
				if(fc.e != null) {
					fc.e.focus();
				}
			},120);
		});
	}
}
Main.__name__ = true;
Object.assign(Main.prototype, {
	__class__: Main
});
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
}
Std.__name__ = true;
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
}
StringTools.__name__ = true;
var ValueType = $hxEnums["ValueType"] = { __ename__:true,__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
class Type {
	static typeof(v) {
		switch(typeof(v)) {
		case "boolean":
			return ValueType.TBool;
		case "function":
			if(v.__name__ || v.__ename__) {
				return ValueType.TObject;
			}
			return ValueType.TFunction;
		case "number":
			if(Math.ceil(v) == v % 2147483648.0) {
				return ValueType.TInt;
			}
			return ValueType.TFloat;
		case "object":
			if(v == null) {
				return ValueType.TNull;
			}
			let e = v.__enum__;
			if(e != null) {
				return ValueType.TEnum($hxEnums[e]);
			}
			let c = js_Boot.getClass(v);
			if(c != null) {
				return ValueType.TClass(c);
			}
			return ValueType.TObject;
		case "string":
			return ValueType.TClass(String);
		case "undefined":
			return ValueType.TNull;
		default:
			return ValueType.TUnknown;
		}
	}
}
Type.__name__ = true;
class data_EditorRp {
	constructor(error,jdata) {
		this.error = error;
		this.jdata = jdata;
	}
	static fromJs(js) {
		let a = js.ra();
		let e1 = a[1].ra();
		return new data_EditorRp(a[0].rs(),e1.length == 0 ? dm_Option.None : dm_Option.Some(data_JsData.fromJs(e1[0])));
	}
}
data_EditorRp.__name__ = true;
Object.assign(data_EditorRp.prototype, {
	__class__: data_EditorRp
});
class data_FieldEntry {
	constructor(isMap,ix,key) {
		this.isMap = isMap;
		this.ix = ix;
		this.key = key;
	}
	toJs() {
		return dm_Js.wa([dm_Js.wb(this.isMap),dm_Js.wi(this.ix),dm_Js.ws(this.key)]);
	}
	static mkArray(ix) {
		return new data_FieldEntry(false,ix,"");
	}
	static mkMap(key) {
		return new data_FieldEntry(true,-1,key);
	}
	static fromJs(js) {
		let a = js.ra();
		return new data_FieldEntry(a[0].rb(),a[1].ri(),a[2].rs());
	}
}
data_FieldEntry.__name__ = true;
Object.assign(data_FieldEntry.prototype, {
	__class__: data_FieldEntry
});
class data_Field {
	constructor(fieldPath) {
		this.fieldPath = fieldPath;
	}
	toJs() {
		let _this = this.fieldPath;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].toJs();
		}
		return dm_Js.wa(result);
	}
	static fromJs(js) {
		let _this = js.ra();
		let f = data_FieldEntry.fromJs;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = f(_this[i]);
		}
		return new data_Field(result);
	}
}
data_Field.__name__ = true;
Object.assign(data_Field.prototype, {
	__class__: data_Field
});
class data_IndexKeyFilter {
	constructor(startRange,endRange,searchType,isUpper,text) {
		this.startRange = startRange;
		this.endRange = endRange;
		this.searchType = searchType;
		this.isUpper = isUpper;
		this.text = text;
	}
	toJs() {
		return dm_Js.wa([dm_Js.wi(this.startRange),dm_Js.wi(this.endRange),dm_Js.wi(this.searchType),dm_Js.wb(this.isUpper),dm_Js.ws(this.text)]);
	}
	static mkArray(startRange,endRange) {
		return new data_IndexKeyFilter(startRange,endRange,0,false,"");
	}
	static mkMap(searchType,isUpper,text) {
		return new data_IndexKeyFilter(0,0,searchType,isUpper,text);
	}
	static fromJs(js) {
		let a = js.ra();
		return new data_IndexKeyFilter(a[0].ri(),a[1].ri(),a[2].ri(),a[3].rb(),a[4].rs());
	}
}
data_IndexKeyFilter.__name__ = true;
Object.assign(data_IndexKeyFilter.prototype, {
	__class__: data_IndexKeyFilter
});
class data_FieldCf {
	constructor(indexKeyFilter,valueFilter) {
		this.indexKeyFilter = indexKeyFilter;
		this.valueFilter = valueFilter;
	}
	toJs() {
		let tmp;
		let _g = this.indexKeyFilter;
		switch(_g._hx_index) {
		case 0:
			let v = _g.v;
			tmp = dm_Js.wa([v.toJs()]);
			break;
		case 1:
			tmp = dm_Js.wa([]);
			break;
		}
		let _g1 = this.valueFilter;
		let tmp1;
		switch(_g1._hx_index) {
		case 0:
			let v1 = _g1.v;
			tmp1 = dm_Js.wa([dm_Js.ws(v1)]);
			break;
		case 1:
			tmp1 = dm_Js.wa([]);
			break;
		}
		return dm_Js.wa([tmp,tmp1]);
	}
	static fromJs(js) {
		let a = js.ra();
		let e0 = a[0].ra();
		let e1 = a[1].ra();
		return new data_FieldCf(e0.length == 0 ? dm_Option.None : dm_Option.Some(data_IndexKeyFilter.fromJs(e0[0])),e1.length == 0 ? dm_Option.None : dm_Option.Some(e1[0].rs()));
	}
}
data_FieldCf.__name__ = true;
Object.assign(data_FieldCf.prototype, {
	__class__: data_FieldCf
});
class data_FieldChange {
	constructor(type,hash,ix,value) {
		this.type = type;
		this.hash = hash;
		this.ix = ix;
		this.value = value;
	}
	toJs() {
		return dm_Js.wa([dm_Js.wi(this.type),dm_Js.ws(this.hash),dm_Js.wi(this.ix),this.value]);
	}
	static mkToNull(hash,oldType) {
		return new data_FieldChange(oldType,hash,-1,dm_Js.wn());
	}
	static mkNull(hash,value) {
		return new data_FieldChange(data_Type.NULL,hash,-1,dm_Js.wi(value));
	}
	static mkBoolean(hash,value) {
		return new data_FieldChange(data_Type.BOOLEAN,hash,-1,dm_Js.wb(value));
	}
	static mkInt(hash,value) {
		return new data_FieldChange(data_Type.NUMBER,hash,-1,dm_Js.wi(value));
	}
	static mkFloat(hash,value) {
		return new data_FieldChange(data_Type.NUMBER,hash,-1,dm_Js.wf(value));
	}
	static mkString(hash,value) {
		return new data_FieldChange(data_Type.STRING,hash,-1,dm_Js.ws(value));
	}
	static mkArray(hash,ix,isDuplicate) {
		return new data_FieldChange(data_Type.ARRAY,hash,ix,dm_Js.wb(isDuplicate));
	}
	static mkMap(hash,type,oldKey,newKey) {
		return new data_FieldChange(data_Type.MAP,hash,type,type == data_FieldChange.MAP_ADD ? dm_Js.ws(newKey) : type == data_FieldChange.MAP_DEL ? dm_Js.ws(oldKey) : dm_Js.wa([dm_Js.ws(oldKey),dm_Js.ws(newKey)]));
	}
}
data_FieldChange.__name__ = true;
Object.assign(data_FieldChange.prototype, {
	__class__: data_FieldChange
});
class data_JsData {
	constructor(control,tooBig,type,data) {
		this.control = control;
		this.tooBig = tooBig;
		this.type = type;
		this.data = data;
	}
	static fromJs(js) {
		let a = js.ra();
		return new data_JsData(a[0].rs(),a[1].rb(),a[2].ri(),a[3]);
	}
}
data_JsData.__name__ = true;
Object.assign(data_JsData.prototype, {
	__class__: data_JsData
});
class data_Table {
	constructor(fpath,error) {
		this.fpath = fpath;
		this.error = error;
	}
	base() {
		return dm_Path.name(this.fpath);
	}
	shortPath() {
		if(this.fpath.length > 80) {
			return "..." + this.fpath.substring(this.fpath.length - 37);
		} else {
			return this.fpath;
		}
	}
	toJs() {
		return dm_Js.wa([dm_Js.ws(this.fpath),dm_Js.ws(this.error)]);
	}
	static fromJs(js) {
		let a = js.ra();
		return new data_Table(a[0].rs(),a[1].rs());
	}
}
data_Table.__name__ = true;
Object.assign(data_Table.prototype, {
	__class__: data_Table
});
class data_Tpath {
	constructor(table,field,fieldCf) {
		this.table = table;
		this.field = field;
		this.fieldCf = fieldCf;
	}
	toJs() {
		let tmp = this.table.toJs();
		let tmp1 = this.field.toJs();
		let _g = this.fieldCf;
		let tmp2;
		switch(_g._hx_index) {
		case 0:
			let v = _g.v;
			tmp2 = dm_Js.wa([v.toJs()]);
			break;
		case 1:
			tmp2 = dm_Js.wa([]);
			break;
		}
		return dm_Js.wa([tmp,tmp1,tmp2]);
	}
	static fromJs(js) {
		let a = js.ra();
		let fCf = a[2].ra();
		return new data_Tpath(data_Table.fromJs(a[0]),data_Field.fromJs(a[1]),fCf.length == 0 ? dm_Option.None : dm_Option.Some(data_FieldCf.fromJs(fCf[0])));
	}
}
data_Tpath.__name__ = true;
Object.assign(data_Tpath.prototype, {
	__class__: data_Tpath
});
class data_Type {
	static toString(type) {
		return data_Type.values[type];
	}
}
data_Type.__name__ = true;
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			let debug = pos > 0;
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let c2 = b[i++];
					let code = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let c2 = b[i++];
					let c3 = b[i++];
					let u = (c & 15) << 18 | (c2 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	toString() {
		return this.getString(0,this.length);
	}
	static ofString(s,encoding) {
		if(encoding == haxe_io_Encoding.RawNative) {
			let buf = new Uint8Array(s.length << 1);
			let _g = 0;
			let _g1 = s.length;
			while(_g < _g1) {
				let i = _g++;
				let c = s.charCodeAt(i);
				buf[i << 1] = c & 255;
				buf[i << 1 | 1] = c >> 8;
			}
			return new haxe_io_Bytes(buf.buffer);
		}
		let a = [];
		let i = 0;
		while(i < s.length) {
			let c = s.charCodeAt(i++);
			if(55296 <= c && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
			}
			if(c <= 127) {
				a.push(c);
			} else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			} else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			} else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
}
haxe_io_Bytes.__name__ = true;
Object.assign(haxe_io_Bytes.prototype, {
	__class__: haxe_io_Bytes
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
class haxe_crypto_Base64 {
	static encode(bytes,complement) {
		if(complement == null) {
			complement = true;
		}
		let str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
		if(complement) {
			switch(bytes.length % 3) {
			case 1:
				str += "==";
				break;
			case 2:
				str += "=";
				break;
			default:
			}
		}
		return str;
	}
	static decode(str,complement) {
		if(complement == null) {
			complement = true;
		}
		if(complement) {
			while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
		}
		return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
	}
}
haxe_crypto_Base64.__name__ = true;
class dm_B64 {
	static encodeBytes(bs) {
		return haxe_crypto_Base64.encode(bs);
	}
	static encode(s) {
		return haxe_crypto_Base64.encode(haxe_io_Bytes.ofString(s));
	}
	static decodeBytes(s) {
		return haxe_crypto_Base64.decode(s);
	}
	static decode(s) {
		return haxe_crypto_Base64.decode(s).toString();
	}
}
dm_B64.__name__ = true;
class dm_Captcha {
	constructor(storeId,counterLimit,zeroColor,oneColor) {
		if(oneColor == null) {
			oneColor = "#c0c0c0";
		}
		if(zeroColor == null) {
			zeroColor = "#f0f0f0";
		}
		if(counterLimit == null) {
			counterLimit = 3;
		}
		this.wg = dm_Ui.Q("div");
		this.ch1 = dm_It.range(4).map(function(_) {
			return dm_Ui.Q("input").att("type","checkbox");
		}).to();
		this.ch0 = dm_It.range(4).map(function(_) {
			return dm_Ui.Q("input").att("type","checkbox");
		}).to();
		this.storeId = storeId;
		this.counterLimit = counterLimit;
		this.zeroColor = zeroColor;
		this.oneColor = oneColor;
		let now = new Date().getTime();
		this.counter = dm_Captcha.getCounter(storeId);
		if(now - dm_Captcha.getTime(storeId) > 900000) {
			this.counter = 0;
			dm_Captcha.setCounter(storeId,0);
			dm_Captcha.setTime(storeId,new Date().getTime());
		}
		this.view();
	}
	view() {
		let _gthis = this;
		let tds = dm_It.from(this.ch0).map(function(ch) {
			return dm_Ui.Q("td").att("style","border: 1px solid;background-color: " + _gthis.zeroColor).add(ch);
		}).cat(dm_It.from(this.ch1).map(function(ch) {
			return dm_Ui.Q("td").att("style","border: 1px solid;background-color: " + _gthis.oneColor).add(ch);
		})).to();
		let box = new dm_Box(tds);
		let tds1 = dm_It.range(4).map(function(_) {
			return box.next();
		}).to();
		let tds2 = dm_It.range(4).map(function(_) {
			return box.next();
		}).to();
		this.wg.removeAll().add(dm_Ui.Q("table").att("border",0).style("border: 1px solid;background-color: #fffff0").add(dm_Ui.Q("tr").adds(tds1)).add(dm_Ui.Q("tr").adds(tds2)));
	}
	isUpLimit() {
		return this.counter >= this.counterLimit;
	}
	check() {
		if(dm_It.from(this.ch0).every(function(ch) {
			return !ch.getChecked();
		})) {
			return dm_It.from(this.ch1).every(function(ch) {
				return ch.getChecked();
			});
		} else {
			return false;
		}
	}
	increment() {
		dm_Captcha.setCounter(this.storeId,this.counter + 1);
		dm_Captcha.setTime(this.storeId,new Date().getTime());
	}
	reset() {
		dm_Captcha.resetCounter(this.storeId);
		dm_Captcha.resetTime(this.storeId);
	}
	static getCounter(id) {
		let _g = dm_Store.get(id + "_counter");
		switch(_g._hx_index) {
		case 0:
			let v = _g.v;
			return Std.parseInt(v);
		case 1:
			return 0;
		}
	}
	static setCounter(id,n) {
		dm_Store.put(id + "_counter",n == null ? "null" : "" + n);
	}
	static resetCounter(id) {
		dm_Store.del(id + "_counter");
	}
	static getTime(id) {
		let _g = dm_Store.get(id + "_time");
		switch(_g._hx_index) {
		case 0:
			let v = _g.v;
			return parseFloat(v);
		case 1:
			return new Date().getTime();
		}
	}
	static setTime(id,n) {
		dm_Store.put(id + "_time",n == null ? "null" : "" + n);
	}
	static resetTime(id) {
		dm_Store.del(id + "_time");
	}
}
dm_Captcha.__name__ = true;
Object.assign(dm_Captcha.prototype, {
	__class__: dm_Captcha
});
class dm_Cryp {
	static key(key,lg) {
		let k = dm_B64.decodeBytes(dm_B64.encode(key + "codified in irreversibleDeme is good, very good!\n\r8@@"));
		let lenk = k.length;
		let sum = 0;
		let _g = 0;
		let _g1 = lenk;
		while(_g < _g1) {
			let i = _g++;
			sum += k.b[i];
		}
		let lg2 = lg + lenk;
		let r = new haxe_io_Bytes(new ArrayBuffer(lg2));
		let r1 = new haxe_io_Bytes(new ArrayBuffer(lg2));
		let r2 = new haxe_io_Bytes(new ArrayBuffer(lg2));
		let ik = 0;
		let _g2 = 0;
		let _g3 = lg2;
		while(_g2 < _g3) {
			let i = _g2++;
			let v1 = k.b[ik];
			let v2 = v1 + k.b[v1 % lenk];
			let v3 = v2 + k.b[v2 % lenk];
			let v4 = v3 + k.b[v3 % lenk];
			sum = (sum + i + v4) % 256;
			r1.b[i] = sum;
			r2.b[i] = sum;
			++ik;
			if(ik == lenk) {
				ik = 0;
			}
		}
		let _g4 = 0;
		let _g5 = lg2;
		while(_g4 < _g5) {
			let i = _g4++;
			let v1 = r2.b[i];
			let v2 = v1 + r2.b[v1 % lg2];
			let v3 = v2 + r2.b[v2 % lg2];
			let v4 = v3 + r2.b[v3 % lg2];
			sum = (sum + v4) % 256;
			r2.b[i] = sum;
			r.b[i] = (sum + r1.b[i]) % 256;
		}
		return dm_B64.encodeBytes(r).substring(0,lg);
	}
	static cryp(key,msg) {
		let m = dm_B64.encode(msg);
		let lg = m.length;
		let k = dm_Cryp.key(key,lg);
		let r = new haxe_io_Bytes(new ArrayBuffer(lg));
		let _g = 0;
		let _g1 = lg;
		while(_g < _g1) {
			let i = _g++;
			r.b[i] = HxOverrides.cca(m,i) + HxOverrides.cca(k,i);
		}
		return dm_B64.encodeBytes(r);
	}
	static decryp(key,c) {
		let bs = dm_B64.decodeBytes(c);
		let lg = bs.length;
		let k = dm_Cryp.key(key,lg);
		let r_b = "";
		let _g = 0;
		let _g1 = lg;
		while(_g < _g1) {
			let i = _g++;
			let code = bs.b[i] - HxOverrides.cca(k,i);
			r_b += Std.string(String.fromCodePoint(code));
		}
		return dm_B64.decode(r_b);
	}
}
dm_Cryp.__name__ = true;
class dm_Dec {
	static pow(n) {
		switch(n) {
		case 0:
			return 1;
		case 1:
			return 10;
		case 2:
			return 100;
		case 3:
			return 1000;
		case 4:
			return 10000;
		case 5:
			return 100000;
		case 6:
			return 1000000;
		case 7:
			return 10000000;
		case 8:
			return 100000000;
		default:
			return 1000000000;
		}
	}
	static eq(f1,f2,dif) {
		if(f1 < f2 + dif) {
			return f1 > f2 - dif;
		} else {
			return false;
		}
	}
	static round(f,scale) {
		if(scale < 0) {
			scale = 0;
		} else if(scale > 9) {
			scale = 9;
		}
		let mul = dm_Dec.pow(scale);
		if(f >= 0) {
			return Math.round(f * mul + 0.000000001) / mul;
		}
		return -(Math.round(-f * mul + 0.000000001) / mul);
	}
	static from(f) {
		let r = parseFloat(f);
		if(isNaN(r)) {
			return dm_Option.None;
		} else {
			return dm_Option.Some(r);
		}
	}
	static digits(n) {
		return dm_It.fromString(n).every(function(d) {
			if(d >= "0") {
				return d <= "9";
			} else {
				return false;
			}
		});
	}
}
dm_Dec.__name__ = true;
var dm_ActionType = $hxEnums["dm.ActionType"] = { __ename__:true,__constructs__:null
	,BLUR: {_hx_name:"BLUR",_hx_index:0,__enum__:"dm.ActionType",toString:$estr}
	,CHANGE: {_hx_name:"CHANGE",_hx_index:1,__enum__:"dm.ActionType",toString:$estr}
	,CLICK: {_hx_name:"CLICK",_hx_index:2,__enum__:"dm.ActionType",toString:$estr}
	,DBLCLICK: {_hx_name:"DBLCLICK",_hx_index:3,__enum__:"dm.ActionType",toString:$estr}
	,FOCUS: {_hx_name:"FOCUS",_hx_index:4,__enum__:"dm.ActionType",toString:$estr}
	,INPUT: {_hx_name:"INPUT",_hx_index:5,__enum__:"dm.ActionType",toString:$estr}
	,KEYDOWN: {_hx_name:"KEYDOWN",_hx_index:6,__enum__:"dm.ActionType",toString:$estr}
	,KEYPRESS: {_hx_name:"KEYPRESS",_hx_index:7,__enum__:"dm.ActionType",toString:$estr}
	,KEYUP: {_hx_name:"KEYUP",_hx_index:8,__enum__:"dm.ActionType",toString:$estr}
	,LOAD: {_hx_name:"LOAD",_hx_index:9,__enum__:"dm.ActionType",toString:$estr}
	,MOUSEDOWN: {_hx_name:"MOUSEDOWN",_hx_index:10,__enum__:"dm.ActionType",toString:$estr}
	,MOUSEMOVE: {_hx_name:"MOUSEMOVE",_hx_index:11,__enum__:"dm.ActionType",toString:$estr}
	,MOUSEOUT: {_hx_name:"MOUSEOUT",_hx_index:12,__enum__:"dm.ActionType",toString:$estr}
	,MOUSEOVER: {_hx_name:"MOUSEOVER",_hx_index:13,__enum__:"dm.ActionType",toString:$estr}
	,MOUSEUP: {_hx_name:"MOUSEUP",_hx_index:14,__enum__:"dm.ActionType",toString:$estr}
	,WHEEL: {_hx_name:"WHEEL",_hx_index:15,__enum__:"dm.ActionType",toString:$estr}
	,SELECT: {_hx_name:"SELECT",_hx_index:16,__enum__:"dm.ActionType",toString:$estr}
	,SELECTSTART: {_hx_name:"SELECTSTART",_hx_index:17,__enum__:"dm.ActionType",toString:$estr}
	,SUBMIT: {_hx_name:"SUBMIT",_hx_index:18,__enum__:"dm.ActionType",toString:$estr}
};
dm_ActionType.__constructs__ = [dm_ActionType.BLUR,dm_ActionType.CHANGE,dm_ActionType.CLICK,dm_ActionType.DBLCLICK,dm_ActionType.FOCUS,dm_ActionType.INPUT,dm_ActionType.KEYDOWN,dm_ActionType.KEYPRESS,dm_ActionType.KEYUP,dm_ActionType.LOAD,dm_ActionType.MOUSEDOWN,dm_ActionType.MOUSEMOVE,dm_ActionType.MOUSEOUT,dm_ActionType.MOUSEOVER,dm_ActionType.MOUSEUP,dm_ActionType.WHEEL,dm_ActionType.SELECT,dm_ActionType.SELECTSTART,dm_ActionType.SUBMIT];
class dm_Exc {
	static show(msg,pos) {
		return "" + pos.fileName + "." + pos.methodName + ":" + pos.lineNumber + ": " + msg;
	}
	static illegalArgument(argumentName,expected,actual,pos) {
		return dm_Exc.show("Illegal argument : Variable \"" + argumentName + "\"\n" + ("Expected: " + Std.string(expected) + "\nActual: " + Std.string(actual)),pos);
	}
}
dm_Exc.__name__ = true;
class dm_It {
	constructor(hasNext,next) {
		this.hasNext = hasNext;
		this.next = next;
	}
	count() {
		let r = 0;
		while(this.hasNext()) {
			++r;
			this.next();
		}
		return r;
	}
	every(fn) {
		while(this.hasNext()) if(!fn(this.next())) {
			return false;
		}
		return true;
	}
	iterator() {
		return { hasNext : this.hasNext, next : this.next};
	}
	reduce(seed,fn) {
		while(this.hasNext()) seed = fn(seed,this.next());
		return seed;
	}
	to() {
		let r = [];
		while(this.hasNext()) r.push(this.next());
		return r;
	}
	cat(it) {
		let _gthis = this;
		return new dm_It(function() {
			if(!_gthis.hasNext()) {
				return it.hasNext();
			} else {
				return true;
			}
		},function() {
			if(_gthis.hasNext()) {
				return _gthis.next();
			} else {
				return it.next();
			}
		});
	}
	map(fn,fn2) {
		let _gthis = this;
		if(fn2 == null) {
			return new dm_It(function() {
				return _gthis.hasNext();
			},function() {
				return fn(_gthis.next());
			});
		} else {
			let isFirst = true;
			return new dm_It(function() {
				return _gthis.hasNext();
			},function() {
				if(isFirst) {
					isFirst = false;
					return fn(_gthis.next());
				} else {
					return fn2(_gthis.next());
				}
			});
		}
	}
	shuffle() {
		let a = this.to();
		dm_Rnd.shuffle(a);
		return dm_It.from(a);
	}
	static from(i) {
		let it = $getIterator(i);
		return new dm_It($bind(it,it.hasNext),$bind(it,it.next));
	}
	static fromString(s) {
		let len = s.length;
		let ix = 0;
		return new dm_It(function() {
			return ix < len;
		},function() {
			ix += 1;
			return s.charAt(ix - 1);
		});
	}
	static fromMap(m) {
		let kvs_length;
		let kvs_keys;
		let kvs_h;
		let kvs_current;
		let h = m.h;
		kvs_h = h;
		kvs_keys = Object.keys(h);
		kvs_length = kvs_keys.length;
		kvs_current = 0;
		return new dm_It(function() {
			return kvs_current < kvs_length;
		},function() {
			kvs_current += 1;
			let key = kvs_keys[kvs_current - 1];
			let kv_key = key;
			let kv_value = kvs_h[key];
			return new dm_Tp(kv_key,kv_value);
		});
	}
	static range(begin,end) {
		if(end == null) {
			end = begin;
			begin = 0;
		}
		let c = begin;
		return new dm_It(function() {
			return c < end;
		},function() {
			c += 1;
			return c - 1;
		});
	}
}
dm_It.__name__ = true;
Object.assign(dm_It.prototype, {
	__class__: dm_It
});
class dm_Js {
	constructor(js) {
		this.js = js;
	}
	getType() {
		return Std.string(Type.typeof(this.js));
	}
	to() {
		return JSON.stringify(this.js);
	}
	rb() {
		try {
			return js_Boot.__cast(this.js , Bool);
		} catch( _g ) {
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				throw haxe_Exception.thrown(dm_Exc.illegalArgument("js","Bool",this.getType(),{ fileName : "../../../hxlib/dm/Js.hx", lineNumber : 116, className : "dm.Js", methodName : "rb"}));
			} else {
				throw _g;
			}
		}
	}
	ri() {
		try {
			return js_Boot.__cast(this.js , Int);
		} catch( _g ) {
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				throw haxe_Exception.thrown(dm_Exc.illegalArgument("js","Int",this.getType(),{ fileName : "../../../hxlib/dm/Js.hx", lineNumber : 124, className : "dm.Js", methodName : "ri"}));
			} else {
				throw _g;
			}
		}
	}
	rf() {
		try {
			return js_Boot.__cast(this.js , Float);
		} catch( _g ) {
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				throw haxe_Exception.thrown(dm_Exc.illegalArgument("js","Float",this.getType(),{ fileName : "../../../hxlib/dm/Js.hx", lineNumber : 132, className : "dm.Js", methodName : "rf"}));
			} else {
				throw _g;
			}
		}
	}
	rs() {
		try {
			return js_Boot.__cast(this.js , String);
		} catch( _g ) {
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				throw haxe_Exception.thrown(dm_Exc.illegalArgument("js","String",this.getType(),{ fileName : "../../../hxlib/dm/Js.hx", lineNumber : 140, className : "dm.Js", methodName : "rs"}));
			} else {
				throw _g;
			}
		}
	}
	ra() {
		try {
			let a = [];
			let _g = 0;
			let _g1 = js_Boot.__cast(this.js , Array);
			while(_g < _g1.length) {
				let e = _g1[_g];
				++_g;
				a.push(new dm_Js(e));
			}
			return a;
		} catch( _g ) {
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				throw haxe_Exception.thrown(dm_Exc.illegalArgument("js","Array<Js>",this.getType(),{ fileName : "../../../hxlib/dm/Js.hx", lineNumber : 150, className : "dm.Js", methodName : "ra"}));
			} else {
				throw _g;
			}
		}
	}
	ro() {
		try {
			let fn1 = function(o) {
				return Object.keys(o);
			};
			let fn2 = function(o,k) {
				return o[k];
			};
			let obj = this.js;
			let r = new haxe_ds_StringMap();
			let _g = 0;
			let _g1 = fn1(obj);
			while(_g < _g1.length) {
				let k = _g1[_g];
				++_g;
				let value = new dm_Js(fn2(obj,k));
				r.h[k] = value;
			}
			return r;
		} catch( _g ) {
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				throw haxe_Exception.thrown(dm_Exc.illegalArgument("js","Map<String, Js>",this.getType(),{ fileName : "../../../hxlib/dm/Js.hx", lineNumber : 178, className : "dm.Js", methodName : "ro"}));
			} else {
				throw _g;
			}
		}
	}
	static from(s) {
		try {
			return new dm_Js(JSON.parse(s));
		} catch( _g ) {
			throw haxe_Exception.thrown(dm_Exc.illegalArgument("s = " + s,"Json string","Invalid Json",{ fileName : "../../../hxlib/dm/Js.hx", lineNumber : 32, className : "dm.Js", methodName : "from"}));
		}
	}
	static wn() {
		return new dm_Js(null);
	}
	static wb(b) {
		return new dm_Js(b);
	}
	static wi(i) {
		return new dm_Js(i);
	}
	static wf(f) {
		return new dm_Js(f);
	}
	static ws(s) {
		return new dm_Js(s);
	}
	static wa(a) {
		let jsa = [];
		let _g = 0;
		while(_g < a.length) {
			let e = a[_g];
			++_g;
			jsa.push(e.js);
		}
		return new dm_Js(jsa);
	}
	static wo(o) {
		let fn1 = function() {
			return {}
		};
		let fn2 = function(o,k,v) {
			o[k]=v;
		};
		let r = fn1();
		let h = o.h;
		let k_h = h;
		let k_keys = Object.keys(h);
		let k_length = k_keys.length;
		let k_current = 0;
		while(k_current < k_length) {
			let k = k_keys[k_current++];
			let v = o.h[k];
			fn2(r,k,v.js);
		}
		return new dm_Js(r);
	}
}
dm_Js.__name__ = true;
Object.assign(dm_Js.prototype, {
	__class__: dm_Js
});
class dm_ModalBox {
	constructor(content,withClose) {
		if(withClose == null) {
			withClose = true;
		}
		let tb = dm_Ui.Q("table").att("align","center").style("background-color: rgb(250, 250, 250);" + "border: 1px solid rgb(110,130,150);" + "padding: 4px;border-radius: 4px;");
		let _gthis = this;
		if(withClose) {
			tb.add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:100%;text-align:right;padding-bottom:5px").add(dm_Ui.Q("span").text("[")).add(dm_Ui.link(function(_) {
				_gthis.show(false);
			}).style("cursor:pointer;text-decoration: none; font-family: sans;" + "color: #000080;font-weight: normal;font-size:14px;").text(" X ")).add(dm_Ui.Q("span").text("]"))));
		}
		tb.add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(content)));
		this.wg = dm_Ui.Q("div").style("display: none;" + "position: fixed;" + "z-index: 1;" + "padding-top: 100px;" + "left: 0;" + "top: 0;" + "width: 100%;" + "height: 100%;" + "overflow: auto;" + "background-color: rgb(0,0,0);" + "background-color: rgba(0,0,0,0.4);" + "text-align: center;").add(tb);
	}
	show(value) {
		if(value) {
			this.wg.setStyle("display","block");
		} else {
			this.wg.setStyle("display","none");
		}
	}
}
dm_ModalBox.__name__ = true;
Object.assign(dm_ModalBox.prototype, {
	__class__: dm_ModalBox
});
var dm_Option = $hxEnums["dm.Option"] = { __ename__:true,__constructs__:null
	,Some: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"dm.Option",toString:$estr}; },$_._hx_name="Some",$_.__params__ = ["v"],$_)
	,None: {_hx_name:"None",_hx_index:1,__enum__:"dm.Option",toString:$estr}
};
dm_Option.__constructs__ = [dm_Option.Some,dm_Option.None];
class dm_Opt {
	static get(o) {
		if(o._hx_index == 0) {
			let value = o.v;
			return value;
		} else {
			return null;
		}
	}
}
dm_Opt.__name__ = true;
class dm_Path {
	static name(path) {
		let ix = path.lastIndexOf("/");
		if(ix != -1) {
			return path.substring(ix + 1);
		}
		return path;
	}
}
dm_Path.__name__ = true;
class dm_Rnd {
	static shuffle(a) {
		let j;
		let tmp;
		let i = a.length;
		while(i > 1) {
			j = Math.floor(Math.random() * i--);
			tmp = a[i];
			a[i] = a[j];
			a[j] = tmp;
		}
	}
}
dm_Rnd.__name__ = true;
class dm_Box {
	constructor(es) {
		this.es = es;
		this.box = dm_It.from(es).shuffle().to();
	}
	next() {
		if(this.box.length == 0) {
			this.box = dm_It.from(this.es).shuffle().to();
		}
		return this.box.pop();
	}
}
dm_Box.__name__ = true;
Object.assign(dm_Box.prototype, {
	__class__: dm_Box
});
class dm_Store {
	static del(key) {
		localStorage.removeItem(key);
	}
	static get(key) {
		let r = localStorage.getItem(key);
		if(r == null) {
			return dm_Option.None;
		} else {
			return dm_Option.Some(r);
		}
	}
	static put(key,value) {
		localStorage.setItem(key, value);
	}
}
dm_Store.__name__ = true;
class dm_Str {
	static compare(s1,s2) {
		if(s1 < s2) {
			return -1;
		} else if(s1 > s2) {
			return 1;
		} else {
			return 0;
		}
	}
}
dm_Str.__name__ = true;
class dm_Tp {
	constructor(e1,e2) {
		this.e1 = e1;
		this.e2 = e2;
	}
}
dm_Tp.__name__ = true;
Object.assign(dm_Tp.prototype, {
	__class__: dm_Tp
});
class haxe_IMap {
}
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	unwrap() {
		return this.__nativeException;
	}
	toString() {
		return this.get_message();
	}
	get_message() {
		return this.message;
	}
	get_native() {
		return this.__nativeException;
	}
	static caught(value) {
		if(((value) instanceof haxe_Exception)) {
			return value;
		} else if(((value) instanceof Error)) {
			return new haxe_Exception(value.message,null,value);
		} else {
			return new haxe_ValueException(value,null,value);
		}
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
haxe_Exception.__super__ = Error;
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
});
class haxe_Timer {
	constructor(time_ms) {
		let me = this;
		this.id = setInterval(function() {
			me.run();
		},time_ms);
	}
	stop() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	run() {
	}
	static delay(f,time_ms) {
		let t = new haxe_Timer(time_ms);
		t.run = function() {
			t.stop();
			f();
		};
		return t;
	}
}
haxe_Timer.__name__ = true;
Object.assign(haxe_Timer.prototype, {
	__class__: haxe_Timer
});
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
	unwrap() {
		return this.value;
	}
}
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
});
class haxe_crypto_BaseCode {
	constructor(base) {
		let len = base.length;
		let nbits = 1;
		while(len > 1 << nbits) ++nbits;
		if(nbits > 8 || len != 1 << nbits) {
			throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
		}
		this.base = base;
		this.nbits = nbits;
	}
	encodeBytes(b) {
		let nbits = this.nbits;
		let base = this.base;
		let size = b.length * 8 / nbits | 0;
		let out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		let buf = 0;
		let curbits = 0;
		let mask = (1 << nbits) - 1;
		let pin = 0;
		let pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask];
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask];
		}
		return out;
	}
	initTable() {
		let tbl = [];
		let _g = 0;
		while(_g < 256) {
			let i = _g++;
			tbl[i] = -1;
		}
		let _g1 = 0;
		let _g2 = this.base.length;
		while(_g1 < _g2) {
			let i = _g1++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	decodeBytes(b) {
		let nbits = this.nbits;
		let base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		let tbl = this.tbl;
		let size = b.length * nbits >> 3;
		let out = new haxe_io_Bytes(new ArrayBuffer(size));
		let buf = 0;
		let curbits = 0;
		let pin = 0;
		let pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				let i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
}
haxe_crypto_BaseCode.__name__ = true;
Object.assign(haxe_crypto_BaseCode.prototype, {
	__class__: haxe_crypto_BaseCode
});
class haxe_ds_StringMap {
	constructor() {
		this.h = Object.create(null);
	}
}
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_StringMap.prototype, {
	__class__: haxe_ds_StringMap
});
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
	static __interfLoop(cc,cl) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		let intf = cc.__interfaces__;
		if(intf != null && (cc.__super__ == null || cc.__super__.__interfaces__ != intf)) {
			let _g = 0;
			let _g1 = intf.length;
			while(_g < _g1) {
				let i = _g++;
				let i1 = intf[i];
				if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
					return true;
				}
			}
		}
		return js_Boot.__interfLoop(cc.__super__,cl);
	}
	static __instanceof(o,cl) {
		if(cl == null) {
			return false;
		}
		switch(cl) {
		case Array:
			return ((o) instanceof Array);
		case Bool:
			return typeof(o) == "boolean";
		case Dynamic:
			return o != null;
		case Float:
			return typeof(o) == "number";
		case Int:
			if(typeof(o) == "number") {
				return ((o | 0) === o);
			} else {
				return false;
			}
			break;
		case String:
			return typeof(o) == "string";
		default:
			if(o != null) {
				if(typeof(cl) == "function") {
					if(js_Boot.__downcastCheck(o,cl)) {
						return true;
					}
				} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
					if(((o) instanceof cl)) {
						return true;
					}
				}
			} else {
				return false;
			}
			if(cl == Class ? o.__name__ != null : false) {
				return true;
			}
			if(cl == Enum ? o.__ename__ != null : false) {
				return true;
			}
			return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
		}
	}
	static __downcastCheck(o,cl) {
		if(!((o) instanceof cl)) {
			if(cl.__isInterface__) {
				return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static __cast(o,t) {
		if(o == null || js_Boot.__instanceof(o,t)) {
			return o;
		} else {
			throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
		}
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __isNativeObj(o) {
		return js_Boot.__nativeClassName(o) != null;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__name__ = true;
class pgs_Editor {
	constructor(wg,tpath,jsData) {
		this.wg = wg;
		this.tpath = tpath;
		this.jsData = jsData;
	}
	show() {
		let pathDiv = dm_Ui.Q("div");
		let body = dm_Ui.Q("div");
		this.wg.removeAll().add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px;text-align:left;vertical-align:top").add(pathDiv)).add(dm_Ui.Q("td").style("vertical-align:top").add(body))));
		new wgs_PathWg(pathDiv,this.tpath,pgs_Editor.reload).show();
		if(this.jsData.type == data_Type.NULL) {
			new wgs_NullEditor(body,this.jsData,$bind(this,this.set)).show();
		} else if(this.jsData.type == data_Type.BOOLEAN) {
			new wgs_BooleanEditor(body,this.jsData,$bind(this,this.set)).show();
		} else if(this.jsData.type == data_Type.NUMBER) {
			new wgs_NumberEditor(body,this.jsData,$bind(this,this.set)).show();
		} else if(this.jsData.type == data_Type.STRING) {
			new wgs_StringEditor(body,this.jsData,$bind(this,this.set)).show();
		} else if(this.jsData.type == data_Type.ARRAY) {
			new wgs_ArrayEditor(body,this.tpath,this.jsData,$bind(this,this.set)).show();
		} else if(this.jsData.type == data_Type.MAP) {
			new wgs_MapEditor(body,this.tpath,this.jsData,$bind(this,this.set)).show();
		} else {
			throw haxe_Exception.thrown("Unknown type " + this.jsData.type);
		}
	}
	set(change,newTpath) {
		let _gthis = this;
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("JstbEditor");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("Editor");
		_g.h["source"] = value1;
		let value2 = dm_Js.ws("set");
		_g.h["rq"] = value2;
		let value3 = this.tpath.toJs();
		_g.h["tpath"] = value3;
		let value4 = change.toJs();
		_g.h["change"] = value4;
		Global.client.send(_g,function(rp) {
			let response = data_EditorRp.fromJs(rp.h["response"]);
			switch(response.error) {
			case data_EditorRp.MODIFIED:
				dm_Ui.alert("Table no synchronized.\nNo change has been made");
				$global.location.assign("?");
				break;
			case data_EditorRp.NO_JSON:
				new MsgPg(_gthis.wg,I18n._args(I18n._("<p>File<br>%0<br>does not contain a JSON table.</p>"),[_gthis.tpath.table.fpath]),true).show();
				return;
			case data_EditorRp.NO_TABLE:
				new MsgPg(_gthis.wg,I18n._args(I18n._("<p>Table<br>%0<br>not found.</p>"),[_gthis.tpath.table.fpath]),true).show();
				return;
			default:
				let tmp;
				switch(newTpath._hx_index) {
				case 0:
					let tp = newTpath.v;
					tmp = tp;
					break;
				case 1:
					tmp = _gthis.tpath;
					break;
				}
				pgs_Editor.reload(tmp);
			}
		});
	}
	static mk(wg,tpath) {
		let waitDiv = dm_Ui.Q("div").add(dm_Ui.img("wait.gif"));
		let body = dm_Ui.Q("div");
		wg.removeAll().add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px").add(waitDiv)).add(dm_Ui.Q("td").klass("frame").style("text-aling:left;width:5px").text(tpath.table.base())).add(dm_Ui.Q("td").style("color:#607080;text-aling:left;" + "width:5px;white-space:nowrap").text(tpath.table.shortPath())).add(dm_Ui.Q("td").style("text-align:right").add(dm_Ui.link(function() {
			$global.location.assign("?");
		}).klass("link").text(I18n._("List"))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",4).add(dm_Ui.Q("hr")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",4).add(body))));
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("JstbEditor");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("Editor");
		_g.h["source"] = value1;
		let value2 = dm_Js.ws("idata");
		_g.h["rq"] = value2;
		let value3 = tpath.toJs();
		_g.h["tpath"] = value3;
		Global.client.send(_g,function(rp) {
			waitDiv.removeAll().add(dm_Ui.led("#104080"));
			let response = data_EditorRp.fromJs(rp.h["response"]);
			switch(response.error) {
			case data_EditorRp.MODIFIED:
				dm_Ui.alert("Table no synchronized.");
				$global.location.assign("?");
				break;
			case data_EditorRp.NO_JSON:
				new MsgPg(wg,I18n._args(I18n._("<p>File<br>%0<br>does not contain a JSON table.</p>"),[tpath.table.fpath]),true).show();
				return;
			case data_EditorRp.NO_TABLE:
				new MsgPg(wg,I18n._args(I18n._("<p>Table<br>%0<br>not found.</p>"),[tpath.table.fpath]),true).show();
				return;
			default:
				new pgs_Editor(body,tpath,dm_Opt.get(response.jdata)).show();
			}
		});
	}
	static reload(tpath) {
		let hash = dm_B64.encode(tpath.toJs().to());
		while(hash != "" && hash.charAt(hash.length - 1) == "=") hash = hash.substring(0,hash.length - 1);
		$global.location.assign("?" + hash);
	}
}
pgs_Editor.__name__ = true;
Object.assign(pgs_Editor.prototype, {
	__class__: pgs_Editor
});
class pgs_TlistEditor {
	constructor(wg,list) {
		this.newField = dm_Ui.Q("input").att("type","text").att("id","autofocus").style("width:500px");
		list.sort(function(t1,t2) {
			if(t1.base() == t2.base()) {
				return dm_Str.compare(t1.shortPath(),t2.shortPath());
			} else {
				return dm_Str.compare(t1.base(),t2.base());
			}
		});
		this.wg = wg;
		this.list = list;
	}
	show() {
		let _gthis = this;
		let trs;
		if(this.list.length == 0) {
			trs = [dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",3).klass("frame").style("text-align:center").text(I18n._("Without Tables")))];
		} else {
			let _this = this.list;
			let result = new Array(_this.length);
			let _g = 0;
			let _g1 = _this.length;
			while(_g < _g1) {
				let i = _g++;
				let t = _this[i];
				result[i] = dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("border").style("width:5px").add(dm_Ui.link(function() {
					_gthis.del(t.fpath);
				}).add(dm_Ui.img("delete").style("vertical-align:top")))).add(dm_Ui.Q("td").klass("border").style("width:5px;text-align:left").add(t.error == "" ? dm_Ui.link(function() {
					_gthis.edit(t.fpath);
				}).klass("link").text(t.base()) : dm_Ui.Q("span").style("color:#800000").att("title",t.error).text(t.base()))).add(dm_Ui.Q("td").klass("border").style("text-align:left;" + "color:" + (t.error == "" ? "#000000" : "#808080")).text(t.shortPath()));
			}
			trs = result;
		}
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").text(I18n._("Table List"))).add(dm_Ui.Q("table").att("align","center").klass("border").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",3).add(dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.link($bind(this,this.add)).klass("link").add(dm_Ui.img("add").style("vertical-align:top")))).add(dm_Ui.Q("td").add(this.newField)))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",3).add(dm_Ui.Q("hr")))).adds(trs));
	}
	add() {
		let fpath = this.newField.getValue();
		if(fpath == "") {
			dm_Ui.alert(I18n._("Path is missing"));
			return;
		}
		let _gthis = this;
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("JstbEditor");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("TlistEditor");
		_g.h["source"] = value1;
		let value2 = dm_Js.ws("new");
		_g.h["rq"] = value2;
		let value3 = dm_Js.ws(fpath);
		_g.h["fpath"] = value3;
		Global.client.ssend(_g,function(rp) {
			pgs_TlistEditor.mk(_gthis.wg);
		});
	}
	del(fpath) {
		if(!dm_Ui.confirm(I18n._args(I18n._("Remove table\n%0?"),[fpath]))) {
			return;
		}
		let _gthis = this;
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("JstbEditor");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("TlistEditor");
		_g.h["source"] = value1;
		let value2 = dm_Js.ws("del");
		_g.h["rq"] = value2;
		let value3 = dm_Js.ws(fpath);
		_g.h["fpath"] = value3;
		Global.client.ssend(_g,function(rp) {
			pgs_TlistEditor.mk(_gthis.wg);
		});
	}
	edit(fpath) {
		let tpath = new data_Tpath(new data_Table(fpath,""),new data_Field([]),dm_Option.None);
		let hash = dm_B64.encode(tpath.toJs().to());
		while(hash != "" && hash.charAt(hash.length - 1) == "=") hash = hash.substring(0,hash.length - 1);
		$global.location.assign("?" + hash);
	}
	static mk(wg) {
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("JstbEditor");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("TlistEditor");
		_g.h["source"] = value1;
		let value2 = dm_Js.ws("idata");
		_g.h["rq"] = value2;
		Global.client.send(_g,function(rp) {
			let _this = rp.h["list"].ra();
			let f = data_Table.fromJs;
			let result = new Array(_this.length);
			let _g = 0;
			let _g1 = _this.length;
			while(_g < _g1) {
				let i = _g++;
				result[i] = f(_this[i]);
			}
			let list = result;
			new pgs_TlistEditor(wg,list).show();
		});
	}
}
pgs_TlistEditor.__name__ = true;
Object.assign(pgs_TlistEditor.prototype, {
	__class__: pgs_TlistEditor
});
class wgs_ArrayEditor {
	constructor(wg,tpath,jsData,fn) {
		this.wg = wg;
		this.tpath = tpath;
		this.jsData = jsData;
		this.fn = fn;
		let d = jsData.data.ra();
		this.arrSize = d[0].ri();
		let _this = d[1].ra();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			let pair = _this[i].ra();
			result[i] = new wgs__$ArrayEditor_ArrEntry(pair[0].ri(),pair[1].rs());
		}
		this.arrValues = result;
	}
	show() {
		let toNullDiv = dm_Ui.Q("div");
		let filtersDiv = dm_Ui.Q("div");
		let type = this.jsData.tooBig ? -1 : this.jsData.type;
		new wgs_ToNullWg(toNullDiv,this.jsData.control,type,this.fn).show();
		this.filterWg(filtersDiv);
		let _gthis = this;
		let tb;
		if(this.jsData.tooBig) {
			let tb1 = dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").style("text-align:right").text("" + this.arrValues.length + " / " + this.arrSize))))));
			let tb2 = dm_Ui.Q("tr");
			let tb3 = dm_Ui.Q("table").att("align","center");
			let tb4;
			if(this.arrSize == 0) {
				tb4 = [dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("frame").style("text-align:center").text(I18n._("Without Entries")))];
			} else {
				let _this = this.arrValues;
				let result = new Array(_this.length);
				let _g = 0;
				let _g1 = _this.length;
				while(_g < _g1) {
					let i = _g++;
					let v = _this[i];
					result[i] = dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.link(function() {
						_gthis.goto(v.ix);
					}).klass("link").text("" + v.ix))).add(dm_Ui.Q("td").add(dm_Ui.Q("textarea").att("rows",2).att("cols",80).att("spellcheck",false).disabled(true).text(v.s)));
				}
				tb4 = result;
			}
			tb = tb1.add(tb2.add(tb3.adds(tb4)));
		} else {
			let tb1 = dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.link($bind(this,this.newEntry)).klass("link").text(I18n._("Add a 'null' entry")))).add(dm_Ui.Q("td").style("text-align:right").text("" + this.arrValues.length + " / " + this.arrSize))))));
			let tb2 = dm_Ui.Q("tr");
			let tb3 = dm_Ui.Q("table").att("align","center");
			let tb4;
			if(this.arrSize == 0) {
				tb4 = [dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("frame").style("text-align:center").text(I18n._("Without Entries")))];
			} else {
				let _this = this.arrValues;
				let result = new Array(_this.length);
				let _g = 0;
				let _g1 = _this.length;
				while(_g < _g1) {
					let i = _g++;
					let v = _this[i];
					result[i] = dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:right").add(dm_Ui.link(function() {
						_gthis.goto(v.ix);
					}).klass("link").text("" + v.ix))).add(dm_Ui.Q("td").add(dm_Ui.link(function() {
						_gthis.copy(v.ix);
					}).klass("link").add(dm_Ui.img("copy").att("title",I18n._("Duplicate")).style("vertical-align:top")))).add(dm_Ui.Q("td").add(dm_Ui.link(function() {
						_gthis.del(v.ix);
					}).klass("link").add(dm_Ui.img("delete").att("title",I18n._("Delete")).style("vertical-align:top")))).add(dm_Ui.Q("td").add(dm_Ui.Q("textarea").att("rows",2).att("cols",80).att("spellcheck",false).disabled(true).text(v.s)));
				}
				tb4 = result;
			}
			tb = tb1.add(tb2.add(tb3.adds(tb4)));
		}
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").text("Array")).add(toNullDiv).add(filtersDiv).add(tb);
	}
	filterWg(wg) {
		let indexCheck = dm_Ui.Q("input").att("type","checkbox");
		let from = dm_Ui.Q("input").att("type","text").style("width:80px").disabled(true);
		let to = dm_Ui.Q("input").att("type","text").style("width:80px").disabled(true);
		indexCheck.on(dm_ActionType.CHANGE,function() {
			if(indexCheck.getChecked()) {
				from.disabled(false);
				return to.disabled(false);
			} else {
				from.disabled(true).value("");
				return to.disabled(true).value("");
			}
		});
		let valueCheck = dm_Ui.Q("input").att("type","checkbox");
		let valueFilter = dm_Ui.Q("input").att("type","text").style("width:200px").disabled(true);
		valueCheck.on(dm_ActionType.CHANGE,function() {
			if(valueCheck.getChecked()) {
				return valueFilter.disabled(false);
			} else {
				return valueFilter.disabled(true).value("");
			}
		});
		let _g = this.tpath.fieldCf;
		switch(_g._hx_index) {
		case 0:
			let cf = _g.v;
			let _g1 = cf.indexKeyFilter;
			switch(_g1._hx_index) {
			case 0:
				let ixf = _g1.v;
				indexCheck.checked(true);
				from.value("" + ixf.startRange).disabled(false);
				to.value("" + ixf.endRange).disabled(false);
				break;
			case 1:
				break;
			}
			let _g2 = cf.valueFilter;
			switch(_g2._hx_index) {
			case 0:
				let vf = _g2.v;
				valueCheck.checked(true);
				valueFilter.value(vf).disabled(false);
				break;
			case 1:
				break;
			}
			break;
		case 1:
			break;
		}
		let _gthis = this;
		wg.removeAll().add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).add(dm_Ui.hrule(I18n._("Filters"))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:50%").add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px").add(indexCheck)).add(dm_Ui.Q("td").att("colspan",2).style("text-align:left").text(I18n._("Index filter")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).style("width:5px;text-align:right").add(dm_Ui.link(function() {
			if(indexCheck.getChecked()) {
				from.value("0");
			}
		}).klass("link").text(I18n._("From:")))).add(dm_Ui.Q("td").style("text-align:left").add(from))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).style("width:5px;text-align:right").add(dm_Ui.link(function() {
			if(indexCheck.getChecked()) {
				to.value(_gthis.arrSize);
			}
		}).klass("link").text(I18n._("To:")))).add(dm_Ui.Q("td").style("text-align:left").add(to))))).add(dm_Ui.Q("td").style("vertical-align: top").add(dm_Ui.Q("table").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px").add(valueCheck)).add(dm_Ui.Q("td").style("text-align:left").text(I18n._("Values filter")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").style("text-align:left").add(valueFilter)))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).style("text-align:right").add(dm_Ui.link(function() {
			_gthis.filter(indexCheck.getChecked(),from.getValue(),to.getValue(),valueCheck.getChecked(),valueFilter.getValue());
		}).klass("link").text(I18n._("Filter"))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).add(dm_Ui.Q("hr")))));
	}
	filter(indexActive,from,to,valueActive,valueFilter) {
		let err = "";
		if(indexActive || valueActive) {
			let ikf = dm_Option.None;
			if(indexActive) {
				if(from == "") {
					err = I18n._("'From' value is missing");
				} else if(to == "") {
					err = I18n._("'To' value is missing");
				} else if(!dm_Dec.digits(from)) {
					err = I18n._("'From' is not a valid index");
				} else if(!dm_Dec.digits(to)) {
					err = I18n._("'To' is not a valid index");
				}
				if(err == "") {
					let fromN = Std.parseInt(from);
					let toN = Std.parseInt(to);
					if(fromN < 0) {
						err = I18n._("'From' < 0");
					} else if(toN > this.arrSize) {
						err = I18n._args(I18n._("'To' > array size (%0)"),["" + this.arrSize]);
					} else if(toN <= fromN) {
						err = I18n._("'To' is not greater than 'From'");
					} else {
						ikf = dm_Option.Some(data_IndexKeyFilter.mkArray(fromN,toN));
					}
				}
			}
			let vf = dm_Option.None;
			if(valueActive) {
				if(valueFilter == "") {
					err = I18n._("'Values filter' is missing");
				} else {
					vf = dm_Option.Some(valueFilter);
				}
			}
			this.tpath.fieldCf = dm_Option.Some(new data_FieldCf(ikf,vf));
		} else {
			this.tpath.fieldCf = dm_Option.None;
		}
		if(err != "") {
			dm_Ui.alert(err);
			return;
		}
		pgs_Editor.reload(this.tpath);
	}
	goto(ix) {
		this.tpath.field.fieldPath.push(data_FieldEntry.mkArray(ix));
		this.tpath.fieldCf = dm_Option.None;
		pgs_Editor.reload(this.tpath);
	}
	newEntry() {
		if(!dm_Ui.confirm(I18n._("Add a 'null' entry?"))) {
			return;
		}
		let newTpath = new data_Tpath(this.tpath.table,this.tpath.field,dm_Option.Some(new data_FieldCf(dm_Option.Some(data_IndexKeyFilter.mkArray(0,1)),dm_Option.None)));
		this.fn(data_FieldChange.mkArray(this.jsData.control,-1,false),dm_Option.Some(newTpath));
	}
	copy(ix) {
		if(!dm_Ui.confirm(I18n._args(I18n._("Add a copy of '%0'?"),["" + ix]))) {
			return;
		}
		let newTpath = new data_Tpath(this.tpath.table,this.tpath.field,dm_Option.Some(new data_FieldCf(dm_Option.Some(data_IndexKeyFilter.mkArray(0,1)),dm_Option.None)));
		this.fn(data_FieldChange.mkArray(this.jsData.control,ix,true),dm_Option.Some(newTpath));
	}
	del(ix) {
		if(!dm_Ui.confirm(I18n._args(I18n._("Remove entry '%0'?"),["" + ix]))) {
			return;
		}
		this.fn(data_FieldChange.mkArray(this.jsData.control,ix,false),dm_Option.None);
	}
}
wgs_ArrayEditor.__name__ = true;
Object.assign(wgs_ArrayEditor.prototype, {
	__class__: wgs_ArrayEditor
});
class wgs__$ArrayEditor_ArrEntry {
	constructor(ix,s) {
		this.ix = ix;
		this.s = s;
	}
}
wgs__$ArrayEditor_ArrEntry.__name__ = true;
Object.assign(wgs__$ArrayEditor_ArrEntry.prototype, {
	__class__: wgs__$ArrayEditor_ArrEntry
});
class wgs_BooleanEditor {
	constructor(wg,jsData,fn) {
		this.wg = wg;
		this.jsData = jsData;
		this.fn = fn;
	}
	show() {
		let toNullDiv = dm_Ui.Q("div");
		let type = this.jsData.tooBig ? -1 : this.jsData.type;
		new wgs_ToNullWg(toNullDiv,this.jsData.control,type,this.fn).show();
		let value = this.jsData.data.rb();
		let _gthis = this;
		let tb = dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px").add(value ? dm_Ui.img("ok") : dm_Ui.Q("span"))).add(dm_Ui.Q("td").style("text-align:left").add(value || this.jsData.tooBig ? dm_Ui.Q("span").text("true") : dm_Ui.link(function() {
			_gthis.setTo(true);
		}).klass("link").text("true")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px").add(!value ? dm_Ui.img("ok") : dm_Ui.Q("span"))).add(dm_Ui.Q("td").style("text-align:left").add(!value || this.jsData.tooBig ? dm_Ui.Q("span").text("false") : dm_Ui.link(function() {
			_gthis.setTo(false);
		}).klass("link").text("false"))));
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").text("Boolean")).add(toNullDiv).add(tb);
	}
	setTo(value) {
		let v = value ? "'true'" : "'false'";
		if(!dm_Ui.confirm(I18n._args(I18n._("Set field to %0?"),[v]))) {
			return;
		}
		this.fn(data_FieldChange.mkBoolean(this.jsData.control,value),dm_Option.None);
	}
}
wgs_BooleanEditor.__name__ = true;
Object.assign(wgs_BooleanEditor.prototype, {
	__class__: wgs_BooleanEditor
});
class wgs_MapEditor {
	constructor(wg,tpath,jsData,fn) {
		this.boxWg = dm_Ui.Q("div");
		this.wg = wg;
		this.tpath = tpath;
		this.jsData = jsData;
		this.fn = fn;
		let d = jsData.data.ra();
		let _this = d[0].ra();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].rs();
		}
		this.allKeys = result;
		this.mapValues = new haxe_ds_StringMap();
		let h = d[1].ro().h;
		let _g_h = h;
		let _g_keys = Object.keys(h);
		let _g_length = _g_keys.length;
		let _g_current = 0;
		while(_g_current < _g_length) {
			let key = _g_keys[_g_current++];
			let _g1_key = key;
			let _g1_value = _g_h[key];
			let k = _g1_key;
			let v = _g1_value;
			let this1 = this.mapValues;
			let v1 = v.rs();
			this1.h[k] = v1;
		}
		this.modalBox = new dm_ModalBox(this.boxWg,false);
	}
	show() {
		let toNullDiv = dm_Ui.Q("div");
		let filtersDiv = dm_Ui.Q("div");
		let type = this.jsData.tooBig ? -1 : this.jsData.type;
		new wgs_ToNullWg(toNullDiv,this.jsData.control,type,this.fn).show();
		this.filterWg(filtersDiv);
		let _gthis = this;
		let tb = this.jsData.tooBig ? dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").style("text-align:right").text("" + dm_It.fromMap(this.mapValues).count() + " / " + this.allKeys.length)))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("table").att("align","center").adds(this.allKeys.length == 0 ? [dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("frame").style("text-align:center").text(I18n._("Without Entries")))] : dm_It.fromMap(this.mapValues).map(function(tp) {
			return dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.link(function() {
				_gthis.goto(tp.e1);
			}).klass("link").text(tp.e1))).add(dm_Ui.Q("td").add(dm_Ui.Q("textarea").att("rows",2).att("cols",80).att("spellcheck",false).disabled(true).text(tp.e2)));
		})))) : dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.link($bind(this,this.newEntry)).klass("link").text(I18n._("Add a 'null' entry")))).add(dm_Ui.Q("td").style("text-align:right").text("" + dm_It.fromMap(this.mapValues).count() + " / " + this.allKeys.length)))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("table").att("align","center").adds(this.allKeys.length == 0 ? [dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("frame").style("text-align:center").text(I18n._("Without Entries")))] : dm_It.fromMap(this.mapValues).map(function(tp) {
			return dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:right").add(dm_Ui.link(function() {
				_gthis.goto(tp.e1);
			}).klass("link").text("" + tp.e1))).add(dm_Ui.Q("td").add(dm_Ui.link(function() {
				_gthis.changeKey(tp.e1);
			}).klass("link").add(dm_Ui.img("key").att("title",I18n._("Change Key")).style("vertical-align:top")))).add(dm_Ui.Q("td").add(dm_Ui.link(function() {
				_gthis.copy(tp.e1);
			}).klass("link").add(dm_Ui.img("copy").att("title",I18n._("Duplicate")).style("vertical-align:top")))).add(dm_Ui.Q("td").add(dm_Ui.link(function() {
				_gthis.del(tp.e1);
			}).klass("link").add(dm_Ui.img("delete").att("title",I18n._("Delete")).style("vertical-align:top")))).add(dm_Ui.Q("td").add(dm_Ui.Q("textarea").att("rows",2).att("cols",80).att("spellcheck",false).disabled(true).text(tp.e2)));
		}))));
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").text("Object")).add(toNullDiv).add(filtersDiv).add(tb).add(this.modalBox.wg);
	}
	filterWg(wg) {
		let keyCheck = dm_Ui.Q("input").att("type","checkbox");
		let keyFilter = dm_Ui.Q("input").att("type","text").style("width:250px").disabled(true);
		let startsRd = dm_Ui.Q("input").att("type","radio").att("name","opt").disabled(true);
		let inRd = dm_Ui.Q("input").att("type","radio").att("name","opt").disabled(true);
		let equalsRd = dm_Ui.Q("input").att("type","radio").att("name","opt").disabled(true);
		let upCaseCheck = dm_Ui.Q("input").att("type","checkbox").disabled(true);
		keyCheck.on(dm_ActionType.CHANGE,function() {
			if(keyCheck.getChecked()) {
				keyFilter.disabled(false);
				startsRd.disabled(false).checked(true);
				inRd.disabled(false);
				equalsRd.disabled(false);
				return upCaseCheck.disabled(false);
			} else {
				keyFilter.disabled(true).value("");
				startsRd.disabled(true).checked(false);
				inRd.disabled(true).checked(false);
				equalsRd.disabled(true).checked(false);
				return upCaseCheck.disabled(true).checked(false);
			}
		});
		let valueCheck = dm_Ui.Q("input").att("type","checkbox");
		let valueFilter = dm_Ui.Q("input").att("type","text").style("width:200px").disabled(true);
		valueCheck.on(dm_ActionType.CHANGE,function() {
			if(valueCheck.getChecked()) {
				return valueFilter.disabled(false);
			} else {
				return valueFilter.disabled(true).value("");
			}
		});
		let _g = this.tpath.fieldCf;
		switch(_g._hx_index) {
		case 0:
			let cf = _g.v;
			let _g1 = cf.indexKeyFilter;
			switch(_g1._hx_index) {
			case 0:
				let kf = _g1.v;
				keyCheck.checked(true);
				keyFilter.value(kf.text).disabled(false);
				startsRd.disabled(false).checked(kf.searchType == data_FieldCf.STARTS);
				inRd.disabled(false).checked(kf.searchType == data_FieldCf.IN);
				equalsRd.disabled(false).checked(kf.searchType == data_FieldCf.EQUALS);
				upCaseCheck.disabled(false).checked(kf.isUpper);
				break;
			case 1:
				break;
			}
			let _g2 = cf.valueFilter;
			switch(_g2._hx_index) {
			case 0:
				let vf = _g2.v;
				valueCheck.checked(true);
				valueFilter.value(vf).disabled(false);
				break;
			case 1:
				break;
			}
			break;
		case 1:
			break;
		}
		let _gthis = this;
		wg.removeAll().add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).add(dm_Ui.hrule(I18n._("Filters"))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:50%").add(dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px").add(keyCheck)).add(dm_Ui.Q("td").style("text-align:left").text(I18n._("Key filter")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").style("text-align:left").add(keyFilter))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").add(dm_Ui.Q("table").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(startsRd).add(dm_Ui.Q("span").text(I18n._("Starts"))).add(dm_Ui.Q("span").html("&nbsp;&nbsp;")).add(inRd).add(dm_Ui.Q("span").text(I18n._("In"))).add(dm_Ui.Q("span").html("&nbsp;&nbsp;")).add(equalsRd).add(dm_Ui.Q("span").text(I18n._("Equals")))))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").add(dm_Ui.Q("table").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(upCaseCheck).add(dm_Ui.Q("span").text(I18n._("Uppercase")))))))))).add(dm_Ui.Q("td").style("vertical-align: top").add(dm_Ui.Q("table").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px").add(valueCheck)).add(dm_Ui.Q("td").style("text-align:left").text(I18n._("Values filter")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").style("text-align:left").add(valueFilter)))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).style("text-align:right").add(dm_Ui.link(function() {
			_gthis.filter(keyCheck.getChecked(),equalsRd.getChecked() ? data_FieldCf.EQUALS : inRd.getChecked() ? data_FieldCf.IN : data_FieldCf.STARTS,upCaseCheck.getChecked(),keyFilter.getValue(),valueCheck.getChecked(),valueFilter.getValue());
		}).klass("link").text(I18n._("Filter"))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).add(dm_Ui.Q("hr")))));
	}
	setBoxWg(fn) {
		let _gthis = this;
		let control = function(k) {
			if(k == "") {
				return I18n._("Key entry is empty");
			} else if(_gthis.allKeys.includes(k)) {
				return I18n._("Key is duplicate");
			} else {
				return "";
			}
		};
		let keyIn = dm_Ui.Q("input").att("id","keyIn").att("type","text").style("width:250px");
		this.boxWg.removeAll().add(dm_Ui.Q("div").klass("head").text(I18n._("New Key"))).add(dm_Ui.Q("table").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(keyIn))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:right").add(dm_Ui.Q("button").text(I18n._("Cancel")).on(dm_ActionType.CLICK,function() {
			_gthis.modalBox.show(false);
		})).add(dm_Ui.Q("span").html("&nbsp;")).add(dm_Ui.Q("button").text(I18n._("Accept")).on(dm_ActionType.CLICK,function() {
			let k = keyIn.getValue();
			let err = control(k);
			if(err == "") {
				fn(k);
				_gthis.modalBox.show(false);
			} else {
				dm_Ui.alert(err);
			}
		})))));
	}
	filter(keyActive,searchType,isUpper,text,valueActive,valueFilter) {
		let err = "";
		if(keyActive || valueActive) {
			let ikf = dm_Option.None;
			if(keyActive) {
				if(text == "") {
					err = I18n._("'Key filter' is missing");
				} else {
					ikf = dm_Option.Some(data_IndexKeyFilter.mkMap(searchType,isUpper,text));
				}
			}
			let vf = dm_Option.None;
			if(valueActive) {
				if(valueFilter == "") {
					err = I18n._("'Values filter' is missing");
				} else {
					vf = dm_Option.Some(valueFilter);
				}
			}
			this.tpath.fieldCf = dm_Option.Some(new data_FieldCf(ikf,vf));
		} else {
			this.tpath.fieldCf = dm_Option.None;
		}
		if(err != "") {
			dm_Ui.alert(err);
			return;
		}
		pgs_Editor.reload(this.tpath);
	}
	goto(key) {
		this.tpath.field.fieldPath.push(data_FieldEntry.mkMap(key));
		this.tpath.fieldCf = dm_Option.None;
		pgs_Editor.reload(this.tpath);
	}
	newEntry() {
		if(!dm_Ui.confirm(I18n._("Add a 'null' entry?"))) {
			return;
		}
		let _gthis = this;
		this.setBoxWg(function(newKey) {
			let newTpath = new data_Tpath(_gthis.tpath.table,_gthis.tpath.field,dm_Option.Some(new data_FieldCf(dm_Option.Some(data_IndexKeyFilter.mkMap(data_FieldCf.EQUALS,false,newKey)),dm_Option.None)));
			_gthis.fn(data_FieldChange.mkMap(_gthis.jsData.control,data_FieldChange.MAP_ADD,"",newKey),dm_Option.Some(newTpath));
		});
		this.modalBox.show(true);
		dm_Ui.Q("#keyIn").e.focus();
	}
	changeKey(key) {
		if(!dm_Ui.confirm(I18n._args(I18n._("Change key '%0'?"),[key]))) {
			return;
		}
		let _gthis = this;
		this.setBoxWg(function(newKey) {
			let newTpath = new data_Tpath(_gthis.tpath.table,_gthis.tpath.field,dm_Option.Some(new data_FieldCf(dm_Option.Some(data_IndexKeyFilter.mkMap(data_FieldCf.EQUALS,false,newKey)),dm_Option.None)));
			_gthis.fn(data_FieldChange.mkMap(_gthis.jsData.control,data_FieldChange.MAP_KEY,key,newKey),dm_Option.Some(newTpath));
		});
		this.modalBox.show(true);
		dm_Ui.Q("#keyIn").e.focus();
	}
	copy(key) {
		if(!dm_Ui.confirm(I18n._args(I18n._("Add a copy of '%0'?"),[key]))) {
			return;
		}
		let _gthis = this;
		this.setBoxWg(function(newKey) {
			let newTpath = new data_Tpath(_gthis.tpath.table,_gthis.tpath.field,dm_Option.Some(new data_FieldCf(dm_Option.Some(data_IndexKeyFilter.mkMap(data_FieldCf.EQUALS,false,newKey)),dm_Option.None)));
			_gthis.fn(data_FieldChange.mkMap(_gthis.jsData.control,data_FieldChange.MAP_DUP,key,newKey),dm_Option.Some(newTpath));
		});
		this.modalBox.show(true);
		dm_Ui.Q("#keyIn").e.focus();
	}
	del(key) {
		if(!dm_Ui.confirm(I18n._args(I18n._("Remove entry '%0'?"),[key]))) {
			return;
		}
		this.fn(data_FieldChange.mkMap(this.jsData.control,data_FieldChange.MAP_DEL,key,""),dm_Option.None);
	}
}
wgs_MapEditor.__name__ = true;
Object.assign(wgs_MapEditor.prototype, {
	__class__: wgs_MapEditor
});
class wgs_NullEditor {
	constructor(wg,jsData,fn) {
		this.wg = wg;
		this.jsData = jsData;
		this.fn = fn;
	}
	show() {
		let trs = [];
		let _gthis = this;
		let _g = 1;
		let _g1 = data_Type.MAP + 1;
		while(_g < _g1) {
			let t = _g++;
			trs.push(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:center").add(dm_Ui.link(function() {
				_gthis.setTo(t);
			}).klass("link").text(data_Type.toString(t)))));
		}
		let tb = this.jsData.tooBig ? dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("frame").text(I18n._("Table is too big to be modified")))) : dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:center").text(I18n._("Set to")))).adds(trs);
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").text("Null")).add(tb);
	}
	setTo(type) {
		if(!dm_Ui.confirm(I18n._args(I18n._("Set field to %0?"),[data_Type.toString(type)]))) {
			return;
		}
		this.fn(data_FieldChange.mkNull(this.jsData.control,type),dm_Option.None);
	}
}
wgs_NullEditor.__name__ = true;
Object.assign(wgs_NullEditor.prototype, {
	__class__: wgs_NullEditor
});
class wgs_NumberEditor {
	constructor(wg,jsData,fn) {
		this.wg = wg;
		this.jsData = jsData;
		this.fn = fn;
	}
	show() {
		let toNullDiv = dm_Ui.Q("div");
		let type = this.jsData.tooBig ? -1 : this.jsData.type;
		new wgs_ToNullWg(toNullDiv,this.jsData.control,type,this.fn).show();
		let value = this.jsData.data.rf();
		let valueIn = dm_Ui.Q("input").att("type","text").style("width:200px").value("" + value);
		let _gthis = this;
		let tb = this.jsData.tooBig ? dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("border").text("" + value))) : dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(valueIn))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:center").add(dm_Ui.link(function() {
			_gthis.setTo(valueIn.getValue());
		}).klass("link").text(I18n._("Change")))));
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").text("Number")).add(toNullDiv).add(tb);
	}
	setTo(value) {
		let _g = dm_Dec.from(value);
		switch(_g._hx_index) {
		case 0:
			let v = _g.v;
			if(!dm_Ui.confirm(I18n._args(I18n._("Set field to %0?"),["" + v]))) {
				return;
			}
			let r = dm_Dec.round(v,0);
			if(dm_Dec.eq(v,r,0.0000000001)) {
				this.fn(data_FieldChange.mkInt(this.jsData.control,r | 0),dm_Option.None);
			} else {
				this.fn(data_FieldChange.mkFloat(this.jsData.control,v),dm_Option.None);
			}
			break;
		case 1:
			dm_Ui.alert(I18n._args(I18n._("'%0' is not a valid number"),[value]));
			break;
		}
	}
}
wgs_NumberEditor.__name__ = true;
Object.assign(wgs_NumberEditor.prototype, {
	__class__: wgs_NumberEditor
});
class wgs_PathWg {
	constructor(wg,tpath,fn) {
		this.wg = wg;
		this.tpath = tpath;
		this.fn = fn;
	}
	show() {
		let _gthis = this;
		let trs = [dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:left").add(dm_Ui.link(function() {
			_gthis.go(new data_Field([]));
		}).klass("link").text(I18n._("Root")))),dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("hr")))];
		let fieldPath = this.tpath.field.fieldPath;
		let _g = 0;
		let _g1 = fieldPath.length;
		while(_g < _g1) {
			let i = _g++;
			let e = fieldPath[i];
			let tmp = dm_Ui.Q("tr");
			let tmp1 = dm_Ui.Q("td").style("text-align:left");
			let tmp2 = e.isMap ? e.key : "" + e.ix;
			trs.push(tmp.add(tmp1.add(dm_Ui.link(function() {
				_gthis.go(new data_Field(fieldPath.slice(0,i + 1)));
			}).klass("link").text(tmp2))));
		}
		this.wg.removeAll().klass("frame").add(dm_Ui.Q("table").adds(trs));
	}
	go(fieldPath) {
		this.fn(new data_Tpath(this.tpath.table,fieldPath,dm_Option.None));
	}
}
wgs_PathWg.__name__ = true;
Object.assign(wgs_PathWg.prototype, {
	__class__: wgs_PathWg
});
class wgs_StringEditor {
	constructor(wg,jsData,fn) {
		this.wg = wg;
		this.jsData = jsData;
		this.fn = fn;
	}
	show() {
		let toNullDiv = dm_Ui.Q("div");
		let type = this.jsData.tooBig ? -1 : this.jsData.type;
		new wgs_ToNullWg(toNullDiv,this.jsData.control,type,this.fn).show();
		let ltrim = dm_Ui.Q("input").att("type","checkbox").checked(true);
		let ltrimSpan = dm_Ui.Q("span").add(ltrim).add(dm_Ui.Q("span").text("ltrim"));
		let rtrim = dm_Ui.Q("input").att("type","checkbox").checked(true);
		let rtrimSpan = dm_Ui.Q("span").add(rtrim).add(dm_Ui.Q("span").text("rtrim"));
		let value = this.jsData.data.rs();
		let area = dm_Ui.Q("textarea").att("rows",5).att("cols",80).att("spellcheck",false).disabled(false).text(value);
		if(this.jsData.tooBig) {
			area.disabled(true);
		}
		let _gthis = this;
		let tb = this.jsData.tooBig ? dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(area))) : dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px;white-space:nowrap").add(ltrimSpan)).add(dm_Ui.Q("td").style("width:5px;white-space:nowrap").add(rtrimSpan)).add(dm_Ui.Q("td"))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",3).add(area))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",3).style("text-align:center").add(dm_Ui.link(function() {
			_gthis.setTo(ltrim.getChecked(),rtrim.getChecked(),area.getValue());
		}).klass("link").text(I18n._("Change")))));
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").text("String")).add(toNullDiv).add(tb);
	}
	setTo(ltrim,rtrim,value) {
		if(!dm_Ui.confirm(I18n._("Change field value?"))) {
			return;
		}
		let v = ltrim && rtrim ? StringTools.trim(value) : ltrim ? StringTools.ltrim(value) : rtrim ? StringTools.rtrim(value) : value;
		this.fn(data_FieldChange.mkString(this.jsData.control,v),dm_Option.None);
	}
}
wgs_StringEditor.__name__ = true;
Object.assign(wgs_StringEditor.prototype, {
	__class__: wgs_StringEditor
});
class wgs_ToNullWg {
	constructor(wg,hash,type,fn) {
		this.wg = wg;
		this.hash = hash;
		this.type = type;
		this.fn = fn;
	}
	show() {
		this.wg.removeAll().add(dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(this.type == -1 ? dm_Ui.Q("td").text(I18n._("Table is too big to be modified")) : dm_Ui.Q("td").klass("frame").add(dm_Ui.link($bind(this,this.setTo)).klass("link").text(I18n._("Change field to 'null'")))))).add(dm_Ui.Q("hr"));
	}
	setTo() {
		if(!dm_Ui.confirm(I18n._args(I18n._("Set field to %0?"),["'null'"]))) {
			return;
		}
		this.fn(data_FieldChange.mkToNull(this.hash,this.type),dm_Option.None);
	}
}
wgs_ToNullWg.__name__ = true;
Object.assign(wgs_ToNullWg.prototype, {
	__class__: wgs_ToNullWg
});
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.prototype.__class__ = String;
	String.__name__ = true;
	Array.__name__ = true;
	Date.prototype.__class__ = Date;
	Date.__name__ = "Date";
	var Int = { };
	var Dynamic = { };
	var Float = Number;
	var Bool = Boolean;
	var Class = { };
	var Enum = { };
}
js_Boot.__toStr = ({ }).toString;
Cts.appName = "KtWeb:JstbEditor";
Cts.version = "202301";
Cts.foot = dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("hr")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align: right;color:#808080;font-size:x-small;").html("- © ºDeme. " + Cts.appName + " (" + Cts.version + ") -")));
I18n.enDic = (function($this) {
	var $r;
	let _g = new haxe_ds_StringMap();
	_g.h["'%0' is not a valid number"] = "'%0' is not a valid number";
	_g.h["'From' < 0"] = "'From' < 0";
	_g.h["'From' is not a valid index"] = "'From' is not a valid index";
	_g.h["'From' value is missing"] = "'From' value is missing";
	_g.h["'Key filter' is missing"] = "'Key filter' is missing";
	_g.h["'To' > array size (%0)"] = "'To' > array size (%0)";
	_g.h["'To' is not a valid index"] = "'To' is not a valid index";
	_g.h["'To' is not greater than 'From'"] = "'To' is not greater than 'From'";
	_g.h["'To' value is missing"] = "'To' value is missing";
	_g.h["'Values filter' is missing"] = "'Values filter' is missing";
	_g.h["<p>File<br>%0<br>does not contain a JSON table.</p>"] = "<p>File<br>%0<br>does not contain a JSON table.</p>";
	_g.h["<p>Table<br>%0<br>not found.</p>"] = "<p>Table<br>%0<br>not found.</p>";
	_g.h["Accept"] = "Accept";
	_g.h["Add a 'null' entry"] = "Add a 'null' entry";
	_g.h["Add a 'null' entry?"] = "Add a 'null' entry?";
	_g.h["Add a copy of '%0'?"] = "Add a copy of '%0'?";
	_g.h["Cancel"] = "Cancel";
	_g.h["Change"] = "Change";
	_g.h["Change Key"] = "Change Key";
	_g.h["Change field to 'null'"] = "Change field to 'null'";
	_g.h["Change field value?"] = "Change field value?";
	_g.h["Change key '%0'?"] = "Change key '%0'?";
	_g.h["Check gray squares"] = "Check gray squares";
	_g.h["Click %0 to continue."] = "Click %0 to continue.";
	_g.h["Delete"] = "Delete";
	_g.h["Duplicate"] = "Duplicate";
	_g.h["Equals"] = "Equals";
	_g.h["Filter"] = "Filter";
	_g.h["Filters"] = "Filters";
	_g.h["From:"] = "From:";
	_g.h["Grey squares checks are wrong"] = "Grey squares checks are wrong";
	_g.h["In"] = "In";
	_g.h["Index filter"] = "Index filter";
	_g.h["Keep connected"] = "Keep connected";
	_g.h["Key entry is empty"] = "Key entry is empty";
	_g.h["Key filter"] = "Key filter";
	_g.h["Key is duplicate"] = "Key is duplicate";
	_g.h["List"] = "List";
	_g.h["Login"] = "Login";
	_g.h["New Key"] = "New Key";
	_g.h["Password"] = "Password";
	_g.h["Password is missing"] = "Password is missing";
	_g.h["Path is missing"] = "Path is missing";
	_g.h["Remove entry '%0'?"] = "Remove entry '%0'?";
	_g.h["Remove table\n%0?"] = "Remove table\n%0?";
	_g.h["Root"] = "Root";
	_g.h["Session is expired."] = "Session is expired.";
	_g.h["Set field to %0?"] = "Set field to %0?";
	_g.h["Set to"] = "Set to";
	_g.h["Starts"] = "Starts";
	_g.h["Table List"] = "Table List";
	_g.h["Table is too big to be modified"] = "Table is too big to be modified";
	_g.h["To:"] = "To:";
	_g.h["Uppercase"] = "Uppercase";
	_g.h["User"] = "User";
	_g.h["User name is missing"] = "User name is missing";
	_g.h["Values filter"] = "Values filter";
	_g.h["Without Entries"] = "Without Entries";
	_g.h["Without Tables"] = "Without Tables";
	_g.h["Wrong password"] = "Wrong password";
	_g.h["here"] = "here";
	$r = _g;
	return $r;
}(this));
I18n.esDic = (function($this) {
	var $r;
	let _g = new haxe_ds_StringMap();
	_g.h["'%0' is not a valid number"] = "'%0' no es un número válido";
	_g.h["'From' < 0"] = "'Desde' < 0";
	_g.h["'From' is not a valid index"] = "'Desde' no es un índice válido";
	_g.h["'From' value is missing"] = "No se ha introducido un valor para 'Desde'";
	_g.h["'Key filter' is missing"] = "No se ha introducido un valor para 'Filtro de Claves'";
	_g.h["'To' > array size (%0)"] = "'Hasta' > el tamaño del array (%0)";
	_g.h["'To' is not a valid index"] = "'Hasta' no es un índice válido";
	_g.h["'To' is not greater than 'From'"] = "'Hasta' es mayor que 'Desde'";
	_g.h["'To' value is missing"] = "No se ha introducido un valor para 'Hasta'";
	_g.h["'Values filter' is missing"] = "No se ha intoducido un valor para 'Filtro de Valores'";
	_g.h["<p>File<br>%0<br>does not contain a JSON table.</p>"] = "<p>El archivo<br>%0<br>no contiene una tabla JSON.</p>";
	_g.h["<p>Table<br>%0<br>not found.</p>"] = "<p>Tabla<br>%0<br>no encontrada.</p>";
	_g.h["Accept"] = "Aceptar";
	_g.h["Add a 'null' entry"] = "Añadir una entrada 'null'";
	_g.h["Add a 'null' entry?"] = "¿Añadir una entrada 'null'?";
	_g.h["Add a copy of '%0'?"] = "¿Añadir una copia de '%0'?";
	_g.h["Cancel"] = "Cancelar";
	_g.h["Change"] = "Cambiar";
	_g.h["Change Key"] = "Cambiar la clave";
	_g.h["Change field to 'null'"] = "Cambiar el campo a 'null'";
	_g.h["Change field value?"] = "¿Cambiar el valor del campo?";
	_g.h["Change key '%0'?"] = "¿Cambiar la clave '%0'?";
	_g.h["Check gray squares"] = "Marcar las casillas grises";
	_g.h["Click %0 to continue."] = "Click %0 para continuar.";
	_g.h["Delete"] = "Borrar";
	_g.h["Duplicate"] = "Hacer un duplicado";
	_g.h["Equals"] = "Igual";
	_g.h["Filter"] = "Filtro";
	_g.h["Filters"] = "Filtros";
	_g.h["From:"] = "Desde:";
	_g.h["Grey squares checks are wrong"] = "Las casillas grises está mal marcadas";
	_g.h["In"] = "En";
	_g.h["Index filter"] = "Filtro del índice";
	_g.h["Keep connected"] = "Mantenerse conectado";
	_g.h["Key entry is empty"] = "No se ha indicado la clave";
	_g.h["Key filter"] = "Filtro de Claves";
	_g.h["Key is duplicate"] = "La clave ya existe";
	_g.h["List"] = "Lista";
	_g.h["Login"] = "Identificación";
	_g.h["New Key"] = "Nueva clave";
	_g.h["Password"] = "Contraseña";
	_g.h["Password is missing"] = "Falta la contraseña";
	_g.h["Path is missing"] = "No se ha indicado la ruta";
	_g.h["Remove entry '%0'?"] = "¿Elimiar la entrada '%0'?";
	_g.h["Remove table\n%0?"] = "¿Eliminar la tabla\n%0?";
	_g.h["Root"] = "Raíz";
	_g.h["Session is expired."] = "Las sesión ha expirado.";
	_g.h["Set field to %0?"] = "¿Cambiar el campo a %0?";
	_g.h["Set to"] = "Cambiar a";
	_g.h["Starts"] = "Comienzo";
	_g.h["Table List"] = "Lista de tablas";
	_g.h["Table is too big to be modified"] = "La tabla es demasiado grande para poderse cambiar.";
	_g.h["To:"] = "Hasta:";
	_g.h["Uppercase"] = "Mayúsculas";
	_g.h["User"] = "Usuario";
	_g.h["User name is missing"] = "Falta el nombre del usuario";
	_g.h["Values filter"] = "Filtro de valores";
	_g.h["Without Entries"] = "Sin entradas";
	_g.h["Without Tables"] = "Sin tablas";
	_g.h["Wrong password"] = "Contraseña incorrecta";
	_g.h["here"] = "aquí";
	$r = _g;
	return $r;
}(this));
I18n.lang = "es";
MsgPg.tx = "<a href='?'>" + I18n._("here") + "</a>";
dm_Client.klen = 300;
Global.KwWebAppName = "KtWeb";
Global.client = new dm_Client(true,Global.KwWebAppName,function() {
	let wg = dm_Ui.Q("div");
	new MsgPg(wg,I18n._("Session is expired.")).show();
	dm_Ui.Q("@body").removeAll().add(wg).add(Cts.foot);
});
data_EditorRp.NO_TABLE = "NoTable";
data_EditorRp.NO_JSON = "NoJSON";
data_EditorRp.MODIFIED = "Modified";
data_FieldCf.EQUALS = 0;
data_FieldCf.STARTS = 1;
data_FieldCf.IN = 2;
data_FieldChange.MAP_ADD = -1;
data_FieldChange.MAP_DEL = 0;
data_FieldChange.MAP_KEY = 1;
data_FieldChange.MAP_DUP = 2;
data_Type.NULL = 0;
data_Type.BOOLEAN = 1;
data_Type.NUMBER = 2;
data_Type.STRING = 3;
data_Type.ARRAY = 4;
data_Type.MAP = 5;
data_Type.values = ["Null","Boolean","Number","String","Array","Map"];
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=index.js.map