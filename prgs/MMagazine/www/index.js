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
	static mouseX(ev) {
		return window.document.documentElement.scrollLeft + window.document.body.scrollLeft + ev.clientX;
	}
	static mouseY(ev) {
		return window.document.documentElement.scrollTop + window.document.body.scrollTop + ev.clientY;
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
	getAtt(key) {
		return this.e.getAttribute(key);
	}
	att(key,value) {
		this.e.setAttribute(key,value);
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
class DateTools {
	static __format_get(d,e) {
		switch(e) {
		case "%":
			return "%";
		case "A":
			return DateTools.DAY_NAMES[d.getDay()];
		case "B":
			return DateTools.MONTH_NAMES[d.getMonth()];
		case "C":
			return StringTools.lpad(Std.string(d.getFullYear() / 100 | 0),"0",2);
		case "D":
			return DateTools.__format(d,"%m/%d/%y");
		case "F":
			return DateTools.__format(d,"%Y-%m-%d");
		case "I":case "l":
			let hour = d.getHours() % 12;
			return StringTools.lpad(Std.string(hour == 0 ? 12 : hour),e == "I" ? "0" : " ",2);
		case "M":
			return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
		case "R":
			return DateTools.__format(d,"%H:%M");
		case "S":
			return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
		case "T":
			return DateTools.__format(d,"%H:%M:%S");
		case "Y":
			return Std.string(d.getFullYear());
		case "a":
			return DateTools.DAY_SHORT_NAMES[d.getDay()];
		case "b":case "h":
			return DateTools.MONTH_SHORT_NAMES[d.getMonth()];
		case "d":
			return StringTools.lpad(Std.string(d.getDate()),"0",2);
		case "e":
			return Std.string(d.getDate());
		case "H":case "k":
			return StringTools.lpad(Std.string(d.getHours()),e == "H" ? "0" : " ",2);
		case "m":
			return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
		case "n":
			return "\n";
		case "p":
			if(d.getHours() > 11) {
				return "PM";
			} else {
				return "AM";
			}
			break;
		case "r":
			return DateTools.__format(d,"%I:%M:%S %p");
		case "s":
			return Std.string(d.getTime() / 1000 | 0);
		case "t":
			return "\t";
		case "u":
			let t = d.getDay();
			if(t == 0) {
				return "7";
			} else if(t == null) {
				return "null";
			} else {
				return "" + t;
			}
			break;
		case "w":
			return Std.string(d.getDay());
		case "y":
			return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
		default:
			throw new haxe_exceptions_NotImplementedException("Date.format %" + e + "- not implemented yet.",null,{ fileName : "DateTools.hx", lineNumber : 101, className : "DateTools", methodName : "__format_get"});
		}
	}
	static __format(d,f) {
		let r_b = "";
		let p = 0;
		while(true) {
			let np = f.indexOf("%",p);
			if(np < 0) {
				break;
			}
			let len = np - p;
			r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
			r_b += Std.string(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
			p = np + 2;
		}
		let len = f.length - p;
		r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
		return r_b;
	}
	static format(d,f) {
		return DateTools.__format(d,f);
	}
}
DateTools.__name__ = true;
class Fns {
	static paramFormatter(n1,n2) {
		let r = function(n) {
			return dm_Dec.toIso(n,4);
		};
		if(!r(n1).endsWith("0") || !r(n2).endsWith("0")) {
			return r;
		}
		let r1 = function(n) {
			return dm_Dec.toIso(n,3);
		};
		if(!r1(n1).endsWith("0") || !r1(n2).endsWith("0")) {
			return r1;
		}
		let r2 = function(n) {
			return dm_Dec.toIso(n,2);
		};
		if(!r2(n1).endsWith("0") || !r2(n2).endsWith("0")) {
			return r2;
		}
		let r3 = function(n) {
			return dm_Dec.toIso(n,1);
		};
		if(!r3(n1).endsWith("0") || !r3(n2).endsWith("0")) {
			return r3;
		}
		return function(n) {
			return dm_Dec.toIso(n,0);
		};
	}
	static valueColor(max,min) {
		let df = max - min;
		return function(value) {
			let red = (max - value) * 256 / df | 0;
			let blue = (value - min) * 256 / df | 0;
			return "rgb(" + red + ",80," + blue + ")";
		};
	}
}
Fns.__name__ = true;
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
class Lambda {
	static iter(it,f) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			f(x1);
		}
	}
}
Lambda.__name__ = true;
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
		let search = $global.location.search;
		let lcPath = search == "" ? [] : search.substring(1).split("&");
		if(lcPath.length == 0) {
			lcPath.push("home");
		}
		let target;
		switch(lcPath[0]) {
		case "acc":case "ktmarket":case "mmarket":case "models":
			target = lcPath[0];
			break;
		default:
			target = "home";
		}
		lcPath.shift();
		let menuDiv = dm_Ui.Q("div");
		let bodyDiv = dm_Ui.Q("div");
		let menu = new wgs_Dmenu(menuDiv,target);
		switch(target) {
		case "acc":
			pgs_main_Home.mk(bodyDiv);
			break;
		case "home":
			pgs_main_Home.mk(bodyDiv);
			break;
		case "ktmarket":
			pgs_Ktmarket.mk(bodyDiv,menu,lcPath);
			break;
		case "mmarket":
			pgs_Mmarket.mk(bodyDiv,menu,lcPath);
			break;
		default:
			pgs_main_Home.mk(bodyDiv);
		}
		this.wg.removeAll().add(menuDiv).add(bodyDiv);
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
	static lpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		let buf_b = "";
		l -= s.length;
		while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
		buf_b += s == null ? "null" : "" + s;
		return buf_b;
	}
	static rpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		let buf_b = "";
		buf_b += s == null ? "null" : "" + s;
		while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
		return buf_b;
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
class data_Dated {
}
data_Dated.__name__ = true;
data_Dated.__isInterface__ = true;
class data_HotMap {
	constructor(date,entries) {
		this.date = date;
		this.entries = entries;
	}
	static fromJs(js) {
		let m = js.ro();
		let tmp = m.h["date"].rs();
		let _this = m.h["entries"].ra();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = data_ParamsEval.fromJs(_this[i]);
		}
		return new data_HotMap(tmp,result);
	}
}
data_HotMap.__name__ = true;
data_HotMap.__interfaces__ = [data_Dated];
Object.assign(data_HotMap.prototype, {
	__class__: data_HotMap
});
class data_IbexSundays {
	constructor(data) {
		this.data = data;
	}
	dates() {
		let _this = this.data;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].e1;
		}
		return result;
	}
	values() {
		let _this = this.data;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].e2;
		}
		return result;
	}
	ratios() {
		let base = 0.0;
		if(this.data.length > 0) {
			base = this.data[0].e2;
		}
		let _this = this.values();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = (_this[i] - base) / base;
		}
		return result;
	}
	static fromJs(js) {
		let _this = js.ra();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			let a = _this[i].ra();
			result[i] = new dm_Tp(dm_Opt.eget(dm_Dt.from(a[0].rs())),dm_Opt.eget(dm_Dec.from(a[1].rs())));
		}
		return new data_IbexSundays(result);
	}
}
data_IbexSundays.__name__ = true;
Object.assign(data_IbexSundays.prototype, {
	__class__: data_IbexSundays
});
class data_ModelFloat {
	constructor(model,value) {
		this.model = model;
		this.value = value;
	}
	static fromJs(js) {
		let a = js.ra();
		return new data_ModelFloat(a[0].rs(),a[1].rf());
	}
}
data_ModelFloat.__name__ = true;
Object.assign(data_ModelFloat.prototype, {
	__class__: data_ModelFloat
});
class data_ModelFloats {
	constructor(date,values) {
		this.date = date;
		this.values = values;
	}
	static fromJs(js) {
		let a = js.ra();
		let tmp = a[0].rs();
		let _this = a[1].ra();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = data_ModelFloat.fromJs(_this[i]);
		}
		return new data_ModelFloats(tmp,result);
	}
}
data_ModelFloats.__name__ = true;
data_ModelFloats.__interfaces__ = [data_Dated];
Object.assign(data_ModelFloats.prototype, {
	__class__: data_ModelFloats
});
class data_ParamsEval {
	constructor(params,$eval) {
		this.params = params;
		this.eval = $eval;
	}
	static fromJs(js) {
		let a = js.ra();
		let _this = a[0].ra();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].rf();
		}
		return new data_ParamsEval(result,a[1].ri());
	}
}
data_ParamsEval.__name__ = true;
Object.assign(data_ParamsEval.prototype, {
	__class__: data_ParamsEval
});
class data_ProfitsEntry {
	constructor(date,profits) {
		this.date = date;
		this.profits = profits;
	}
	static fromJs(js) {
		let a = js.ra();
		let tmp = a[0].rs();
		let _this = a[1].ra();
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i].rf();
		}
		return new data_ProfitsEntry(tmp,result);
	}
}
data_ProfitsEntry.__name__ = true;
Object.assign(data_ProfitsEntry.prototype, {
	__class__: data_ProfitsEntry
});
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
	static format(f,scale,thousand,dec) {
		let parts = dm_Dec.to(f,scale).split(".");
		let left = parts[0];
		let end = f < 0 ? left.length - 1 : left.length;
		let cut = 3;
		while(end > cut) {
			let ix = left.length - cut;
			left = left.substring(0,ix) + thousand + left.substring(ix);
			cut += 4;
			++end;
		}
		if(parts.length == 1) {
			return left;
		} else {
			return left + dec + parts[1];
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
	static to(f,scale) {
		let parts = Std.string(dm_Dec.round(f,scale)).split(".");
		if(parts.length == 1) {
			if(scale == 0) {
				return parts[0];
			} else {
				return StringTools.rpad(parts[0] + ".","0",parts[0].length + 1 + scale);
			}
		}
		return StringTools.rpad(parts[0] + "." + parts[1],"0",parts[0].length + 1 + scale);
	}
	static toIso(f,scale) {
		return dm_Dec.format(f,scale,".",",");
	}
	static toEn(f,scale) {
		return dm_Dec.format(f,scale,",",".");
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
class dm_Dt {
	static froms(s,isEn) {
		let d = s.substring(0,2);
		let m = s.substring(3,5);
		if(isEn) {
			let tmp = d;
			d = m;
			m = tmp;
		}
		return dm_Dt.from(s.substring(6) + m + d);
	}
	static mk(day,month,year) {
		return new Date(year,month - 1,day,0,0,0);
	}
	static year(d) {
		return d.getFullYear();
	}
	static dfMillis(d1,d2) {
		return d1.getTime() - d2.getTime();
	}
	static df(d1,d2) {
		return Math.round(dm_Dt.dfMillis(new Date(d1.getFullYear(),d1.getMonth(),d1.getDate(),0,0,0),new Date(d2.getFullYear(),d2.getMonth(),d2.getDate(),0,0,0)) / 86400000.0);
	}
	static to(d) {
		return DateTools.format(d,"%Y%m%d");
	}
	static toIso(d,sep) {
		if(sep == null) {
			sep = "/";
		}
		return DateTools.format(d,"%d" + sep + "%m" + sep + "%Y");
	}
	static from(s) {
		if(s.length != 8 || !dm_Dec.digits(s)) {
			return dm_Option.None;
		}
		let y = Std.parseInt(s.substring(0,4));
		if(y < 1000) {
			return dm_Option.None;
		}
		return dm_Option.Some(dm_Dt.mk(Std.parseInt(s.substring(6)),Std.parseInt(s.substring(4,6)),y));
	}
	static fromIso(s) {
		return dm_Dt.froms(s,false);
	}
	static fromEn(s) {
		return dm_Dt.froms(s,true);
	}
}
dm_Dt.__name__ = true;
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
	eq(it,feq) {
		if(feq == null) {
			while(this.hasNext()) if(it.hasNext() && this.next() == it.next()) {
				continue;
			} else {
				return false;
			}
		} else {
			while(this.hasNext()) if(it.hasNext() && feq(this.next(),it.next())) {
				continue;
			} else {
				return false;
			}
		}
		return !it.hasNext();
	}
	every(fn) {
		while(this.hasNext()) if(!fn(this.next())) {
			return false;
		}
		return true;
	}
	indexf(fn) {
		let c = 0;
		while(this.hasNext()) {
			if(fn(this.next())) {
				return c;
			}
			++c;
		}
		return -1;
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
	takeWhile(fn) {
		let e;
		let nxt = this.hasNext();
		let _gthis = this;
		if(nxt) {
			e = this.next();
			return new dm_It(function() {
				if(nxt) {
					return fn(e);
				} else {
					return false;
				}
			},function() {
				let r = e;
				nxt = _gthis.hasNext();
				if(nxt) {
					e = _gthis.next();
				}
				return r;
			});
		}
		return dm_It.empty();
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
	static empty() {
		return new dm_It(function() {
			return false;
		},function() {
			return null;
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
	static join(it,sep) {
		return it.map(function(e) {
			return e;
		},function(e) {
			return sep + e;
		}).reduce("",function(seed,e) {
			return seed + e;
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
	static ws(s) {
		return new dm_Js(s);
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
class dm_LineChart {
	constructor(exArea,inPadding,inAtts,chartPadding,xAxis,yAxis,lang) {
		this.exArea = exArea;
		this.inPadding = inPadding;
		this.inAtts = inAtts;
		this.chartPadding = chartPadding;
		this.xAxis = xAxis;
		this.yAxis = yAxis;
		this.lang = lang;
		this.data = dm_LineChartData.mk();
	}
	mkWg() {
		let _gthis = this;
		let decFmt = function(n) {
			if(_gthis.lang == "en") {
				return dm_Dec.toEn(n,_gthis.data.round);
			}
			return dm_Dec.toIso(n,_gthis.data.round);
		};
		let hotLabels = [];
		let hotSetlines = [];
		let hotSets = [];
		let max = dm_Option.None;
		let min = 0.0;
		let gap = 0.0;
		let _g = 0;
		let _g1 = this.data.sets;
		while(_g < _g1.length) {
			let s = _g1[_g];
			++_g;
			let _g2 = 0;
			while(_g2 < s.length) {
				let val = s[_g2];
				++_g2;
				switch(val._hx_index) {
				case 0:
					let v = val.v;
					switch(max._hx_index) {
					case 0:
						let m = max.v;
						max = dm_Option.Some(v > m ? v : m);
						if(v < min) {
							min = v;
						}
						break;
					case 1:
						max = dm_Option.Some(v);
						min = v;
						break;
					}
					break;
				case 1:
					break;
				}
			}
		}
		let _g2 = 0;
		let _g3 = this.data.setLines;
		while(_g2 < _g3.length) {
			let s = _g3[_g2];
			++_g2;
			switch(max._hx_index) {
			case 0:
				let m = max.v;
				max = dm_Option.Some(s.value > m ? s.value : m);
				if(s.value < min) {
					min = s.value;
				}
				break;
			case 1:
				max = dm_Option.Some(s.value);
				min = s.value;
				break;
			}
		}
		let round = Math.pow(10,this.data.maxMinRound);
		switch(max._hx_index) {
		case 0:
			let m = max.v;
			let maxVal = (Math.round(m / round) + 1) * round;
			max = dm_Option.Some(maxVal);
			min = (Math.round(min / round) - 1) * round;
			gap = maxVal - min;
			break;
		case 1:
			break;
		}
		let w = this.exArea.width - this.inPadding.left - this.inPadding.right - this.chartPadding.left - this.chartPadding.right;
		let h = this.exArea.height - this.inPadding.top - this.inPadding.bottom - this.chartPadding.top - this.chartPadding.bottom;
		let x0 = this.inPadding.left + this.chartPadding.left;
		let xEnd = x0 + w;
		let y0 = this.exArea.height - this.inPadding.bottom - this.chartPadding.bottom;
		let yEnd = y0 - h;
		let wg = dm_Ui.Q("div");
		let cv = dm_Ui.Q("canvas").att("width",this.exArea.width).att("height",this.exArea.height).style("background:" + this.exArea.atts.background);
		let cv2 = dm_Ui.Q("canvas").att("width",0).att("height",0).style("border: 1px solid black;" + "background:" + this.inAtts.background + ";" + "position: absolute;" + "visibility: hidden;");
		cv2.on(dm_ActionType.MOUSEMOVE,function(ev) {
			if(ev.offsetX < cv2.getAtt("width") - 6 || ev.offsetY < cv2.getAtt("height") - 6) {
				cv2.setStyle("visibility","hidden");
			}
		});
		let ctx = (js_Boot.__cast(cv.e , HTMLCanvasElement)).getContext("2d",null);
		if(this.exArea.atts.border.width > 0) {
			ctx.setLineDash(this.exArea.atts.border.dotted ? [4,2] : []);
			ctx.lineWidth = this.exArea.atts.border.width;
			ctx.strokeStyle = this.exArea.atts.border.color;
			ctx.beginPath();
			ctx.rect(dm_LineChart.corr(0),dm_LineChart.corr(0),Math.round(this.exArea.width - 1),Math.round(this.exArea.height - 1));
			ctx.stroke();
		}
		let ilf = this.inPadding.left;
		let itop = this.inPadding.top;
		let iw = this.exArea.width - this.inPadding.left - this.inPadding.right - 1;
		let ih = this.exArea.height - this.inPadding.top - this.inPadding.bottom - 1;
		ctx.fillStyle = this.inAtts.background;
		ctx.beginPath();
		ctx.rect(ilf,itop,iw,ih);
		ctx.fill();
		ctx.fillStyle = this.xAxis.fontColor;
		ctx.font = "" + this.xAxis.fontSize + "px " + (this.xAxis.isMonospace ? "monospace" : "sans") + (this.xAxis.isItalic ? " italic" : "") + (this.xAxis.isBold ? " bold" : "");
		let _g4 = 0;
		let _g5 = this.data.labels.length;
		while(_g4 < _g5) {
			let i = _g4++;
			let l = this.data.labels[i];
			if(!this.data.drawLabel(l,i)) {
				continue;
			}
			let lw = ctx.measureText(l).width;
			ctx.fillText(l,x0 + i * w / (this.data.labels.length - 1) - lw / 2,y0 + this.chartPadding.bottom + this.xAxis.fontSize);
		}
		let _g6 = 0;
		let _g7 = this.data.labels.length;
		while(_g6 < _g7) {
			let i = _g6++;
			let l = this.data.labels[i];
			let cx = dm_LineChart.corr(x0 + i * w / (this.data.labels.length - 1));
			hotLabels.push(cx);
			if(i == 0 || i >= this.data.labels.length || !this.data.drawGrid(l,i)) {
				continue;
			}
			ctx.setLineDash(this.xAxis.grid.dotted ? [4,2] : []);
			ctx.lineWidth = this.xAxis.grid.width;
			ctx.strokeStyle = this.xAxis.grid.color;
			ctx.beginPath();
			ctx.moveTo(cx,dm_LineChart.corr(y0));
			ctx.lineTo(cx,dm_LineChart.corr(yEnd));
			ctx.stroke();
		}
		ctx.fillStyle = this.yAxis.fontColor;
		ctx.font = "" + this.yAxis.fontSize + "px " + (this.yAxis.isMonospace ? "monospace" : "sans") + (this.yAxis.isItalic ? " italic" : "") + (this.yAxis.isBold ? " bold" : "");
		let parts = this.yAxis.parts;
		if(parts < 1) {
			parts = 1;
		}
		let _g8 = 0;
		let _g9 = parts + 1;
		while(_g8 < _g9) {
			let i = _g8++;
			let yVal = min + i * gap / parts;
			let y = y0 - (yVal - min) * h / gap;
			let n = decFmt(yVal);
			let ms = ctx.measureText(n);
			ctx.fillText(n,this.inPadding.left - 4 - ms.width,y + this.yAxis.fontSize / 2.5);
			if(i == 0 || i == parts) {
				continue;
			}
			ctx.setLineDash(this.yAxis.grid.dotted ? [4,2] : []);
			ctx.lineWidth = this.yAxis.grid.width;
			ctx.strokeStyle = this.yAxis.grid.color;
			ctx.beginPath();
			ctx.moveTo(dm_LineChart.corr(x0),dm_LineChart.corr(y));
			ctx.lineTo(dm_LineChart.corr(xEnd),dm_LineChart.corr(y));
			ctx.stroke();
		}
		let _g10 = 0;
		let _g11 = this.data.setLines;
		while(_g10 < _g11.length) {
			let dl = _g11[_g10];
			++_g10;
			let cy = y0 - (dl.value - min) * h / gap;
			hotSetlines.push(dm_LineChart.corr(cy));
			ctx.setLineDash(dl.line.dotted ? [4,2] : []);
			ctx.lineWidth = dl.line.width;
			ctx.strokeStyle = dl.line.color;
			ctx.beginPath();
			ctx.moveTo(dm_LineChart.corr(x0),dm_LineChart.corr(cy));
			ctx.lineTo(dm_LineChart.corr(xEnd),dm_LineChart.corr(cy));
			ctx.stroke();
		}
		switch(max._hx_index) {
		case 0:
			let mx = max.v;
			let _g12 = 0;
			let _g13 = this.data.sets.length;
			while(_g12 < _g13) {
				let i = _g12++;
				let s = this.data.sets[i];
				let hotSetRow = [];
				let cy0 = 0.0;
				let ixStart = 0;
				let _g = 0;
				let _g1 = s.length;
				while(_g < _g1) {
					let j = _g++;
					let sval = dm_Opt.get(s[j]);
					if(sval == null) {
						hotSetRow.push(dm_Option.None);
						continue;
					}
					ixStart = j + 1;
					cy0 = dm_LineChart.corr(y0 - (sval - min) * h / gap);
					hotSetRow.push(dm_Option.Some(cy0));
					break;
				}
				ctx.setLineDash(this.data.setAtts[i].dotted ? [4,2] : []);
				ctx.lineWidth = this.data.setAtts[i].width;
				ctx.strokeStyle = this.data.setAtts[i].color;
				ctx.beginPath();
				ctx.moveTo(dm_LineChart.corr(x0 + (ixStart - 1) * w / (s.length - 1)),cy0);
				let j = ixStart;
				while(j < s.length) {
					let _g = s[j];
					switch(_g._hx_index) {
					case 0:
						let v = _g.v;
						let cy = dm_LineChart.corr(y0 - (v - min) * h / gap);
						hotSetRow.push(dm_Option.Some(cy));
						ctx.lineTo(dm_LineChart.corr(x0 + j * w / (s.length - 1)),cy);
						++j;
						break;
					case 1:
						hotSetRow.push(dm_Option.None);
						++j;
						_hx_loop11: while(j < s.length) {
							let _g = s[j];
							switch(_g._hx_index) {
							case 0:
								let v = _g.v;
								let cy = dm_LineChart.corr(y0 - (v - min) * h / gap);
								hotSetRow.push(dm_Option.Some(cy));
								ctx.moveTo(dm_LineChart.corr(x0 + j * w / (s.length - 1)),cy);
								++j;
								break _hx_loop11;
							case 1:
								hotSetRow.push(dm_Option.None);
								++j;
								break;
							}
						}
						break;
					}
				}
				ctx.stroke();
				hotSets.push(hotSetRow);
			}
			break;
		case 1:
			break;
		}
		if(this.inAtts.border.width > 0) {
			ctx.setLineDash(this.inAtts.border.dotted ? [4,2] : []);
			ctx.lineWidth = this.inAtts.border.width;
			ctx.strokeStyle = this.inAtts.border.color;
			ctx.beginPath();
			ctx.rect(dm_LineChart.corr(ilf),dm_LineChart.corr(itop),Math.round(iw),Math.round(ih));
			ctx.stroke();
		}
		cv.on(dm_ActionType.MOUSEMOVE,function(ev) {
			let cx = ev.offsetX;
			let cy = ev.offsetY;
			let x = (cx - x0) * _gthis.data.labels.length / w;
			let y = min + (y0 - cy) * gap / h;
			let setlineIx = -1;
			let setlineDif = 0.0;
			let _g = 0;
			let _g1 = hotSetlines.length;
			while(_g < _g1) {
				let i = _g++;
				let v = hotSetlines[i];
				let dif = Math.abs(v - cy);
				if(dif < 4 && (setlineIx == -1 || dif < setlineDif)) {
					setlineIx = i;
					setlineDif = dif;
				}
			}
			let setIx = -1;
			let setValIx = -1;
			let setDif = 0.0;
			let _g2 = 0;
			let _g3 = _gthis.data.sets.length;
			while(_g2 < _g3) {
				let i = _g2++;
				let vs = _gthis.data.sets[i];
				let _g = 0;
				let _g1 = vs.length;
				while(_g < _g1) {
					let j = _g++;
					let hotSet = dm_Opt.get(hotSets[i][j]);
					if(hotSet == null) {
						continue;
					}
					let xdif = hotLabels[j] - cx;
					let ydif = hotSet - cy;
					let dif = Math.sqrt(xdif * xdif + ydif * ydif);
					if(dif < 4 && (setIx == -1 || dif <= setDif)) {
						setIx = i;
						setValIx = j;
						setDif = dif;
					}
				}
			}
			if(setlineIx != -1 || setIx != -1) {
				let yfirst = _gthis.yAxis.fontSize;
				let ysecond = yfirst * 2 + yfirst / 4;
				let ysize = yfirst * 2.75;
				let tx1;
				let tx2;
				let color;
				if(setIx != -1) {
					tx1 = _gthis.data.labels[setValIx];
					tx2 = decFmt(dm_Opt.get(_gthis.data.sets[setIx][setValIx]));
					color = _gthis.data.setAtts[setIx].color;
				} else {
					tx1 = "Line";
					tx2 = decFmt(_gthis.data.setLines[setlineIx].value);
					color = _gthis.data.setLines[setlineIx].line.color;
				}
				let ctx2 = (js_Boot.__cast(cv2.e , HTMLCanvasElement)).getContext("2d",null);
				ctx2.font = "" + _gthis.yAxis.fontSize + "px " + (_gthis.yAxis.isMonospace ? "monospace" : "sans") + (_gthis.yAxis.isItalic ? " italic" : "") + (_gthis.yAxis.isBold ? " bold" : "");
				let ms1 = ctx2.measureText(tx1).width;
				let ms2 = ctx2.measureText(tx2).width;
				let margin1 = 4.0;
				let margin2 = Math.abs(ms1 - ms2) / 2 + margin1;
				let ms = ms1 + margin1 * 2;
				if(ms2 > ms1) {
					margin1 = margin2;
					margin2 = 4;
					ms = ms2 + margin2 * 2;
				}
				cv2.att("height",ysize).att("width",ms).setStyle("top","" + (dm_Ui.mouseY(ev) - ysize) + "px").setStyle("left","" + (dm_Ui.mouseX(ev) - ms) + "px").setStyle("visibility","visible");
				ctx2 = (js_Boot.__cast(cv2.e , HTMLCanvasElement)).getContext("2d",null);
				ctx2.fillStyle = color;
				ctx2.font = "" + _gthis.yAxis.fontSize + "px " + (_gthis.yAxis.isMonospace ? "monospace" : "sans") + (_gthis.yAxis.isItalic ? " italic" : "") + (_gthis.yAxis.isBold ? " bold" : "");
				ctx2.fillText(tx1,margin1,yfirst);
				ctx2.fillText(tx2,margin2,ysecond);
			} else {
				cv2.setStyle("visibility","hidden");
			}
		});
		return wg.add(cv).add(cv2);
	}
	static mk() {
		let atts = dm_LineChartAreaAtts.mk();
		atts.background = "#e9eaec";
		return new dm_LineChart(dm_LineChartArea.mk(),dm_LineChartPadding.mk(),atts,new dm_LineChartPadding(2,1,2,1),dm_LineChartX.mk(),dm_LineChartY.mk(),"es");
	}
	static corr(x) {
		return Math.floor(x) + 0.5;
	}
}
dm_LineChart.__name__ = true;
Object.assign(dm_LineChart.prototype, {
	__class__: dm_LineChart
});
class dm_LineChartPadding {
	constructor(top,right,bottom,left) {
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.left = left;
	}
	static mk() {
		return new dm_LineChartPadding(8,10,20,60);
	}
}
dm_LineChartPadding.__name__ = true;
Object.assign(dm_LineChartPadding.prototype, {
	__class__: dm_LineChartPadding
});
class dm_LineChartLine {
	constructor(width,color,dotted) {
		this.width = width;
		this.color = color;
		this.dotted = dotted;
	}
	static mk() {
		return new dm_LineChartLine(1,"#002040",false);
	}
}
dm_LineChartLine.__name__ = true;
Object.assign(dm_LineChartLine.prototype, {
	__class__: dm_LineChartLine
});
class dm_LineChartAreaAtts {
	constructor(border,background) {
		this.border = border;
		this.background = background;
	}
	static mk() {
		return new dm_LineChartAreaAtts(dm_LineChartLine.mk(),"#fbfdff");
	}
}
dm_LineChartAreaAtts.__name__ = true;
Object.assign(dm_LineChartAreaAtts.prototype, {
	__class__: dm_LineChartAreaAtts
});
class dm_LineChartArea {
	constructor(width,height,atts) {
		this.width = width;
		this.height = height;
		this.atts = atts;
	}
	static mk() {
		return new dm_LineChartArea(400,200,dm_LineChartAreaAtts.mk());
	}
}
dm_LineChartArea.__name__ = true;
Object.assign(dm_LineChartArea.prototype, {
	__class__: dm_LineChartArea
});
class dm_LineChartSetLine {
	constructor(value,line) {
		this.value = value;
		this.line = line;
	}
}
dm_LineChartSetLine.__name__ = true;
Object.assign(dm_LineChartSetLine.prototype, {
	__class__: dm_LineChartSetLine
});
class dm_LineChartData {
	constructor(labels,sets,setAtts) {
		if(labels.length == 0) {
			throw new haxe_Exception("'labels' does not have values");
		}
		if(sets.length == 0) {
			throw new haxe_Exception("'sets' does not have values");
		}
		if(labels.length != sets[0].length) {
			throw new haxe_Exception("Number of labels (" + labels.length + ") does not match number of sets values (" + sets[0].length + ")");
		}
		if(sets.length != setAtts.length) {
			throw new haxe_Exception("Number of sets (" + sets.length + ") does not match number of sets Attributes (" + setAtts.length + ")");
		}
		this.labels = labels;
		this.sets = sets;
		this.setAtts = setAtts;
		this.setLines = [];
		this.drawLabel = function(l,i) {
			return true;
		};
		this.drawGrid = function(l,i) {
			return true;
		};
		this.round = 2;
		this.maxMinRound = 0;
	}
	static mk() {
		let labels = ["Mon","Tue","Wen","Thu","Fri","Sat","Sun"];
		let _this = [1.0,2.0,9.54,10.2,6.2,-7,7];
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = dm_Option.Some(_this[i]);
		}
		let sets = result;
		let _this1 = [2,-4,-2.15,-5.2,7,3,4];
		let result1 = new Array(_this1.length);
		let _g2 = 0;
		let _g3 = _this1.length;
		while(_g2 < _g3) {
			let i = _g2++;
			result1[i] = dm_Option.Some(_this1[i]);
		}
		let sets1 = [sets,result1];
		let setAtts = [dm_LineChartLine.mk(),dm_LineChartLine.mk()];
		setAtts[0].color = "#000080";
		setAtts[1].color = "#800000";
		return new dm_LineChartData(labels,sets1,setAtts);
	}
}
dm_LineChartData.__name__ = true;
Object.assign(dm_LineChartData.prototype, {
	__class__: dm_LineChartData
});
class dm_LineChartX {
	constructor(fontSize,isMonospace,isItalic,isBold,fontColor,grid) {
		this.fontSize = fontSize;
		this.isMonospace = isMonospace;
		this.isItalic = isItalic;
		this.isBold = isBold;
		this.fontColor = fontColor;
		this.grid = grid;
	}
	static mk() {
		return new dm_LineChartX(12,false,false,false,"#000000",new dm_LineChartLine(1,"#808080",true));
	}
}
dm_LineChartX.__name__ = true;
Object.assign(dm_LineChartX.prototype, {
	__class__: dm_LineChartX
});
class dm_LineChartY {
	constructor(fontSize,isMonospace,isItalic,isBold,fontColor,grid,parts) {
		this.fontSize = fontSize;
		this.isMonospace = isMonospace;
		this.isItalic = isItalic;
		this.isBold = isBold;
		this.fontColor = fontColor;
		this.grid = grid;
		this.parts = parts;
	}
	static mk() {
		return new dm_LineChartY(12,false,false,false,"#000000",new dm_LineChartLine(1,"#808080",true),4);
	}
}
dm_LineChartY.__name__ = true;
Object.assign(dm_LineChartY.prototype, {
	__class__: dm_LineChartY
});
class dm_Log {
	constructor(wg,load,reset,rows,_,minified,lineWidth,linesNumber) {
		this.tableFrame = "background-color: rgb(240, 245, 250);" + "border: 1px solid rgb(110,130,150);" + "font-family: sans;font-size: 14px;" + "padding: 4px;border-radius: 4px;";
		this.wg = wg;
		this.load = load;
		this.reset = reset;
		this.rows = rows;
		this._ = _;
		this.minified = minified;
		this.lineWidth = lineWidth;
		this.linesNumber = linesNumber;
		this.is2Days = false;
		this.isErrors = true;
		this.show();
	}
	show() {
		if(this.minified) {
			this.view2();
		} else {
			this.view1();
		}
	}
	view1() {
		let mkOption = function(isSel,id,action) {
			let frame = "background-color: rgb(250, 250, 250);" + "border: 1px solid rgb(110,130,150);" + "padding: 4px;border-radius: 4px;";
			let link = "text-decoration: none;color: #000080;" + "font-weight: normal;cursor:pointer;";
			let r = dm_Ui.Q("span").style(frame);
			if(!isSel) {
				r = dm_Ui.link(function(e) {
					action();
				}).style(link);
			}
			return r.text(id);
		};
		let lmenu = dm_Ui.Q("div");
		let rmenu = dm_Ui.Q("div");
		let area = dm_Ui.Q("textarea").att("spellcheck",false).att("readOnly",true).att("rows",this.linesNumber).att("cols",this.lineWidth + 5);
		let _gthis = this;
		lmenu.add(dm_Ui.Q("span").add(mkOption(this.is2Days,this._("2 Days"),function() {
			_gthis.on2Days();
		}))).add(dm_Ui.Q("span").html(" · ")).add(dm_Ui.Q("span").add(mkOption(!this.is2Days,this._("All"),function() {
			_gthis.onAllD();
		})));
		rmenu.add(dm_Ui.Q("span").add(mkOption(false,this._("Reload"),function() {
			_gthis.onReload();
		}))).add(dm_Ui.Q("span").html(" · ")).add(dm_Ui.Q("span").add(mkOption(false,this._("Delete"),function() {
			_gthis.onDelete();
		}))).add(dm_Ui.Q("span").html(" | ")).add(dm_Ui.Q("span").add(mkOption(this.isErrors,this._("Errors"),function() {
			_gthis.onErrors();
		}))).add(dm_Ui.Q("span").html(" · ")).add(dm_Ui.Q("span").add(mkOption(!this.isErrors,this._("All"),function() {
			_gthis.onAll();
		})));
		let today = new Date();
		let log = this.rows.slice();
		log.reverse();
		let _g = [];
		let _g1 = 0;
		let _g2 = log;
		while(_g1 < _g2.length) {
			let v = _g2[_g1];
			++_g1;
			if((_gthis.is2Days ? dm_Dt.df(today,v.get_date()) < 3 : true) && (_gthis.isErrors ? v.isError : true)) {
				_g.push(v);
			}
		}
		let _this = _g;
		let result = new Array(_this.length);
		let _g3 = 0;
		let _g4 = _this.length;
		while(_g3 < _g4) {
			let i = _g3++;
			result[i] = _this[i].format(_gthis.lineWidth);
		}
		area.value(result.join("\n"));
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").style("padding-bottom:10px").text(this._("Log"))).add(dm_Ui.Q("table").att("align","center").style(this.tableFrame).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:left;width:40%").add(lmenu)).add(this.led()).add(dm_Ui.Q("td").style("text-align:right;widht:80%").add(rmenu))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",3))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",3).add(area))));
	}
	view2() {
		this.wg.removeAll().add(dm_Ui.Q("div").klass("head").style("padding-bottom:10px").text(this._("Log"))).add(dm_Ui.Q("table").att("align","center").style(this.tableFrame).add(dm_Ui.Q("tr").add(dm_Ui.Q("tr").add(this.led()))));
	}
	led() {
		let warns = this.rows.length != 0;
		let errs = dm_It.from(this.rows).indexf(function(e) {
			return e.isError;
		}) != -1;
		let _gthis = this;
		return dm_Ui.Q("td").style("text-align:center;width:20%").add(dm_Ui.Q("span").style("border: 1px solid rgb(110,130,150);" + "border-radius: 8px;" + "background: " + (errs ? "#e04040" : warns ? "#e0e040" : "#ffffff") + ";" + "cursor:pointer").html("&nbsp;&nbsp;").on(dm_ActionType.CLICK,function() {
			_gthis.minified = !_gthis.minified;
			_gthis.show();
		}));
	}
	on2Days() {
		this.is2Days = true;
		this.view1();
	}
	onAllD() {
		this.is2Days = false;
		this.view1();
	}
	onReload() {
		let _gthis = this;
		this.load(function(rows) {
			_gthis.rows = rows;
			_gthis.show();
		});
	}
	onDelete() {
		let _gthis = this;
		if(dm_Ui.confirm(this._("All log entries will be deleted.\nContinue?"))) {
			this.reset(function() {
				_gthis.onReload();
			});
		}
	}
	onErrors() {
		this.isErrors = true;
		this.view1();
	}
	onAll() {
		this.isErrors = false;
		this.view1();
	}
	static mk(wg,load,reset,_,minified,lineWidth,linesNumber) {
		if(linesNumber == null) {
			linesNumber = 25;
		}
		if(lineWidth == null) {
			lineWidth = 120;
		}
		if(minified == null) {
			minified = false;
		}
		load(function(rows) {
			dm_Log.log = new dm_Log(wg,load,reset,rows,_,minified,lineWidth,linesNumber);
		});
	}
}
dm_Log.__name__ = true;
Object.assign(dm_Log.prototype, {
	__class__: dm_Log
});
class dm_LogRow {
	constructor(isError,time,msg) {
		this.isError = isError;
		this.time = time;
		this.msg = msg;
	}
	get_date() {
		let ix = this.time.indexOf("(");
		if(this.time.charAt(2) == "-") {
			return dm_Opt.eget(dm_Dt.fromEn(StringTools.trim(this.time.substring(0,ix))));
		} else {
			return dm_Opt.eget(dm_Dt.fromIso(StringTools.trim(this.time.substring(0,ix))));
		}
	}
	format(lineWidth) {
		let indent = this.time.length + 3;
		let len = lineWidth - indent;
		let sep = this.isError ? " = " : " - ";
		return this.time + sep + dm_LogRow.format2(this.msg,indent,len);
	}
	static fromJs(js) {
		let a = js.ra();
		return new dm_LogRow(a[0].rb(),a[1].rs(),a[2].rs());
	}
	static format2(m,indent,len) {
		if(StringTools.trim(m) == "") {
			return m;
		}
		let r = [];
		Lambda.iter(m.split("\n"),function(l) {
			let subr = [];
			while(l.length > len) {
				let line = l.substring(0,len);
				l = l.substring(len);
				let ix = line.lastIndexOf(" ");
				if(ix != -1 && StringTools.trim(line.substring(0,ix)) != "") {
					l = line.substring(ix + 1) + l;
					line = line.substring(0,ix);
				}
				subr.push(line);
			}
			if(StringTools.trim(l) != "") {
				subr.push(l);
			}
			Lambda.iter(subr,function(subl) {
				r.push(subl);
			});
		});
		let ind = "";
		let _g = 0;
		let _g1 = indent;
		while(_g < _g1) {
			let i = _g++;
			ind += " ";
		}
		return r.join("\n" + ind);
	}
}
dm_LogRow.__name__ = true;
Object.assign(dm_LogRow.prototype, {
	__class__: dm_LogRow
});
class dm_MenuEntry {
	constructor(id,wg) {
		this.id = id;
		this.wg = wg;
	}
}
dm_MenuEntry.__name__ = true;
Object.assign(dm_MenuEntry.prototype, {
	__class__: dm_MenuEntry
});
class dm_Menu {
	constructor(lopts,ropts,selected,withSeparator) {
		if(withSeparator == null) {
			withSeparator = false;
		}
		this.wg = dm_Ui.Q("div");
		let setId = function(o) {
			let _g = o.id;
			switch(_g._hx_index) {
			case 0:
				let v = _g.v;
				o.wg.style(v == selected ? "background-color: rgb(250, 250, 250);" + "border: 1px solid rgb(110,130,150);" + "padding: 4px;border-radius: 4px;" : "text-decoration: none;color: #000080;" + "font-weight: normal;cursor:pointer;");
				break;
			case 1:
				break;
			}
		};
		let _g = 0;
		while(_g < lopts.length) {
			let o = lopts[_g];
			++_g;
			setId(o);
		}
		let _g1 = 0;
		while(_g1 < ropts.length) {
			let o = ropts[_g1];
			++_g1;
			setId(o);
		}
		this.wg.add(dm_Ui.Q("table").style("border-collapse:collapse;width:100%;").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:left;padding-right:4px;" + "${withSeparator ? 'border-right: 1px solid #000000;' : ''}").adds(dm_It.from(lopts).map(function(e) {
			return e.wg;
		}).to())).add(dm_Ui.Q("td").style("padding-left:4px;vertical-align:top;" + "text-align:right;white-space:nowrap").adds(dm_It.from(ropts).map(function(e) {
			return e.wg;
		}).to())))).add(dm_Ui.Q("hr"));
	}
	static separator() {
		return new dm_MenuEntry(dm_Option.None,dm_Ui.Q("span").text(" · "));
	}
	static separator2() {
		return new dm_MenuEntry(dm_Option.None,dm_Ui.Q("span").text(" | "));
	}
	static tlink(id,tx,module) {
		return new dm_MenuEntry(dm_Option.Some(id),dm_Ui.Q("a").att("href","?" + (module == null ? "" : module + "&") + id).html(tx));
	}
}
dm_Menu.__name__ = true;
Object.assign(dm_Menu.prototype, {
	__class__: dm_Menu
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
	static eget(o) {
		if(o._hx_index == 0) {
			let value = o.v;
			return value;
		} else {
			throw haxe_Exception.thrown("Option is None");
		}
	}
	static bind(e,fn) {
		if(e._hx_index == 0) {
			let value = e.v;
			return fn(value);
		} else {
			return dm_Option.None;
		}
	}
}
dm_Opt.__name__ = true;
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
class haxe_exceptions_PosException extends haxe_Exception {
	constructor(message,previous,pos) {
		super(message,previous);
		if(pos == null) {
			this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
		} else {
			this.posInfos = pos;
		}
	}
	toString() {
		return "" + super.toString() + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
}
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
Object.assign(haxe_exceptions_PosException.prototype, {
	__class__: haxe_exceptions_PosException
});
class haxe_exceptions_NotImplementedException extends haxe_exceptions_PosException {
	constructor(message,previous,pos) {
		if(message == null) {
			message = "Not implemented";
		}
		super(message,previous,pos);
	}
}
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
Object.assign(haxe_exceptions_NotImplementedException.prototype, {
	__class__: haxe_exceptions_NotImplementedException
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
class pgs_Ktmarket {
	static mk(wg,dmenu,lcPath) {
		if(lcPath.length == 0) {
			lcPath = ["profits"];
		}
		let lopts = [dmenu.hiddingButton(),dm_Menu.separator2(),dm_Menu.tlink("profits",I18n._("Profits"),"ktmarket"),dm_Menu.separator(),dm_Menu.tlink("percents",I18n._("Percentages"),"ktmarket")];
		let ropts = [];
		let menu = new dm_Menu(lopts,ropts,lcPath[0]);
		dmenu.setDownMenu(menu);
		switch(lcPath[0]) {
		case "percents":
			pgs_ktmarket_PercentsPg.mk(wg);
			break;
		case "profits":
			pgs_ktmarket_ProfitsPg.mk(wg);
			break;
		default:
			pgs_ktmarket_ProfitsPg.mk(wg);
		}
	}
}
pgs_Ktmarket.__name__ = true;
class pgs_Mmarket {
	static mk(wg,dmenu,lcPath) {
		if(lcPath.length == 0) {
			lcPath = ["models"];
		}
		let lopts = [dmenu.hiddingButton(),dm_Menu.separator2(),dm_Menu.tlink("models",I18n._("Models"),"mmarket"),dm_Menu.separator(),dm_Menu.tlink("hotmaps",I18n._("Hot Maps"),"mmarket")];
		let ropts = [];
		let menu = new dm_Menu(lopts,ropts,lcPath[0]);
		dmenu.setDownMenu(menu);
		switch(lcPath[0]) {
		case "hotmaps":
			pgs_mmarket_HotMapsPg.mk(wg);
			break;
		case "models":
			pgs_mmarket_ModelsPg.mk(wg);
			break;
		default:
			pgs_mmarket_ModelsPg.mk(wg);
		}
	}
}
pgs_Mmarket.__name__ = true;
class pgs_ktmarket_PercentsPg {
	constructor(wg,investors,initialAssets,profits,ibex) {
		if(profits.length == 0) {
			profits = [new data_ProfitsEntry(dm_Dt.to(dm_Dt.mk(1,1,dm_Dt.year(new Date()))),[0,0,0])];
		}
		if(profits.length == 1) {
			profits.push(profits[0]);
		}
		let ibexdts = ibex.dates();
		let ibexrts = ibex.ratios();
		if(ibexdts.length == 0) {
			ibexdts.push(new Date());
			ibexrts.push(0.0);
		}
		if(ibexdts.length == 1) {
			ibexdts.push(ibexdts[0]);
			ibexrts.push(0.0);
		}
		this.ibexdts = ibexdts;
		this.ibexrts = ibexrts;
		this.wg = wg;
		this.invs = investors;
		this.initialAssets = initialAssets;
		this.profits = profits;
	}
	show() {
		if(this.profits[0].profits.length != this.invs) {
			throw new haxe_Exception("Investor number is not " + this.invs);
		}
		if(!dm_It.from(this.profits).map(function(p) {
			return p.date;
		}).eq(dm_It.from(this.ibexdts).map(function(d) {
			return dm_Dt.to(d);
		}),function(p,i) {
			return p == i;
		})) {
			this.badData();
			return;
		}
		let sumInitialAssets = 0.0;
		let sumInitialPfs = 0.0;
		let initialPfs = [];
		let sums = [];
		let labels = [];
		let sets = [];
		let _g = 0;
		let _g1 = this.invs;
		while(_g < _g1) {
			let i = _g++;
			let pfs = this.profits[0].profits[i];
			initialPfs.push(pfs);
			sumInitialPfs += pfs;
			sumInitialAssets += this.initialAssets[i];
			sets.push([]);
		}
		let _g2 = 0;
		let _g3 = this.profits;
		while(_g2 < _g3.length) {
			let e = _g3[_g2];
			++_g2;
			labels.push(e.date.substring(6) + "/" + e.date.substring(4,6));
			let pfs = e.profits;
			let sum = 0.0;
			let _g = 0;
			let _g1 = this.invs;
			while(_g < _g1) {
				let i = _g++;
				let dif = pfs[i] - initialPfs[i];
				sets[i].push(dm_Option.Some(dif * 100 / this.initialAssets[i]));
				sum += dif;
			}
			sums.push(dm_Option.Some(sum * 100 / sumInitialAssets));
		}
		let _this = this.ibexrts;
		let result = new Array(_this.length);
		let _g4 = 0;
		let _g5 = _this.length;
		while(_g4 < _g5) {
			let i = _g4++;
			result[i] = dm_Option.Some(_this[i] * 100);
		}
		sets.push(result);
		sets.push(sums);
		let setAtts = [];
		let _g6 = 0;
		let _g7 = this.invs;
		while(_g6 < _g7) {
			let i = _g6++;
			let atts = dm_LineChartLine.mk();
			atts.color = Cts.toSellColors[i];
			setAtts.push(atts);
		}
		let ibexAtts = dm_LineChartLine.mk();
		ibexAtts.color = pgs_ktmarket_PercentsPg.ibexColor;
		ibexAtts.width = 3;
		setAtts.push(ibexAtts);
		let pfAtts = dm_LineChartLine.mk();
		pfAtts.color = pgs_ktmarket_PercentsPg.pfColor;
		pfAtts.width = 3;
		setAtts.push(pfAtts);
		let data = new dm_LineChartData(labels,sets,setAtts);
		let lenGroup = (labels.length / 10 | 0) + 1;
		data.drawLabel = function(l,i) {
			if(i > 0) {
				return i % lenGroup == 0;
			} else {
				return false;
			}
		};
		data.drawGrid = function(l,i) {
			if(i > 0 && i % lenGroup == 0) {
				return i < labels.length - 1;
			} else {
				return false;
			}
		};
		let chart = dm_LineChart.mk();
		chart.exArea.width = 600;
		chart.exArea.height = 400;
		chart.inPadding = new dm_LineChartPadding(25,25,30,100);
		chart.data = data;
		let _gthis = this;
		let data2 = new dm_LineChartData(labels,[dm_It.range(sums.length).map(function(i) {
			return dm_Opt.bind(sums[i],function(sum) {
				return dm_Option.Some(sum - _gthis.ibexrts[i] * 100);
			});
		}).to()],[pfAtts]);
		data2.drawLabel = data.drawLabel;
		data2.drawGrid = data.drawGrid;
		let chart2 = dm_LineChart.mk();
		chart2.exArea.width = 600;
		chart2.exArea.height = 200;
		chart2.inPadding = new dm_LineChartPadding(25,25,30,100);
		chart2.data = data2;
		this.wg.removeAll().add(dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").add(this.caption()))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px;").text("%")).add(dm_Ui.Q("td").add(chart.mkWg()))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan","2").style("height:15px").text(" "))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td")).add(dm_Ui.Q("td").add(this.caption2()))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:5px;").text("%")).add(dm_Ui.Q("td").add(chart2.mkWg()))));
	}
	caption() {
		return dm_Ui.Q("table").klass("frame").att("align","center").adds(dm_It.range(this.invs).map(function(i) {
			return dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:30px").add(dm_Ui.led(Cts.toSellColors[i],6))).add(dm_Ui.Q("td").style("vertical-align: middle;text-align:left;").text(I18n._("Investor") + "-" + i));
		}).to()).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).add(dm_Ui.Q("hr")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:30px").add(dm_Ui.led(pgs_ktmarket_PercentsPg.ibexColor,6))).add(dm_Ui.Q("td").style("vertical-align: middle;text-align:left;").text("ibex"))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:30px").add(dm_Ui.led(pgs_ktmarket_PercentsPg.pfColor,6))).add(dm_Ui.Q("td").style("vertical-align: middle;text-align:left;").text(I18n._("Investors average"))));
	}
	caption2() {
		return dm_Ui.Q("table").klass("frame").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:30px").add(dm_Ui.led(pgs_ktmarket_PercentsPg.pfColor,6))).add(dm_Ui.Q("td").style("vertical-align: middle;text-align:left;").text(I18n._("Investors - Ibex"))));
	}
	badData() {
		this.wg.removeAll().add(dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").att("colspan",2).klass("frame").text(I18n._("Dates of profits and ibex does not match")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align: center;width:50%").klass("border").text(I18n._("Profits"))).add(dm_Ui.Q("td").style("text-align: center").klass("border").text(I18n._("Ibex")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align:center; vertical-align:top").html("<tt>" + dm_It.join(dm_It.from(this.profits).map(function(p) {
			return p.date;
		}),"<br>") + "<tt>")).add(dm_Ui.Q("td").style("text-align:center; vertical-align:top").html("<tt>" + dm_It.join(dm_It.from(this.ibexdts).map(function(d) {
			return dm_Dt.to(d);
		}),"<br>") + "<tt>"))));
	}
	static mk(wg) {
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("MMagazine");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("KtMarket");
		_g.h["module"] = value1;
		let value2 = dm_Js.ws("PercentsPg");
		_g.h["source"] = value2;
		let value3 = dm_Js.ws("idata");
		_g.h["rq"] = value3;
		Global.client.send(_g,function(rp) {
			let investors = rp.h["investors"].ri();
			let _this = rp.h["initialAssets"].ra();
			let result = new Array(_this.length);
			let _g = 0;
			let _g1 = _this.length;
			while(_g < _g1) {
				let i = _g++;
				result[i] = _this[i].rf();
			}
			let initialAssets = result;
			let _this1 = rp.h["profits"].ra();
			let result1 = new Array(_this1.length);
			let _g2 = 0;
			let _g3 = _this1.length;
			while(_g2 < _g3) {
				let i = _g2++;
				result1[i] = data_ProfitsEntry.fromJs(_this1[i]);
			}
			let profits = result1;
			let ibex = data_IbexSundays.fromJs(rp.h["ibex"]);
			new pgs_ktmarket_PercentsPg(wg,investors,initialAssets,profits,ibex).show();
		});
	}
}
pgs_ktmarket_PercentsPg.__name__ = true;
Object.assign(pgs_ktmarket_PercentsPg.prototype, {
	__class__: pgs_ktmarket_PercentsPg
});
class pgs_ktmarket_ProfitsPg {
	constructor(wg,investors,profits) {
		if(profits.length == 0) {
			profits = [new data_ProfitsEntry(dm_Dt.to(dm_Dt.mk(1,1,dm_Dt.year(new Date()))),[0,0,0])];
		}
		if(profits.length == 1) {
			profits.push(profits[0]);
		}
		this.wg = wg;
		this.invs = investors;
		this.profits = profits;
	}
	show() {
		if(this.profits[0].profits.length != this.invs) {
			throw new haxe_Exception("Investor number is not " + this.invs);
		}
		let labels = [];
		let sets = [];
		let _g = 0;
		let _g1 = this.invs;
		while(_g < _g1) {
			let i = _g++;
			sets.push([]);
		}
		let _g2 = 0;
		let _g3 = this.profits;
		while(_g2 < _g3.length) {
			let e = _g3[_g2];
			++_g2;
			labels.push(e.date.substring(6) + "/" + e.date.substring(4,6));
			let pfs = e.profits;
			let _g = 0;
			let _g1 = this.invs;
			while(_g < _g1) {
				let i = _g++;
				sets[i].push(dm_Option.Some(pfs[i]));
			}
		}
		let setAtts = [dm_LineChartLine.mk(),dm_LineChartLine.mk(),dm_LineChartLine.mk()];
		let _g4 = 0;
		let _g5 = this.invs;
		while(_g4 < _g5) {
			let i = _g4++;
			setAtts[i].color = Cts.toSellColors[i];
		}
		let data = new dm_LineChartData(labels,sets,setAtts);
		let lenGroup = (labels.length / 10 | 0) + 1;
		data.drawLabel = function(l,i) {
			if(i > 0) {
				return i % lenGroup == 0;
			} else {
				return false;
			}
		};
		data.drawGrid = function(l,i) {
			if(i > 0 && i % lenGroup == 0) {
				return i < labels.length - 1;
			} else {
				return false;
			}
		};
		let chart = dm_LineChart.mk();
		chart.exArea.width = 600;
		chart.exArea.height = 400;
		chart.inPadding = new dm_LineChartPadding(25,25,30,100);
		chart.data = data;
		this.wg.removeAll().add(dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(this.caption()))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(chart.mkWg()))));
	}
	caption() {
		return dm_Ui.Q("table").klass("frame").att("align","center").adds(dm_It.range(this.invs).map(function(i) {
			return dm_Ui.Q("tr").add(dm_Ui.Q("td").style("width:30px").add(dm_Ui.led(Cts.toSellColors[i],6))).add(dm_Ui.Q("td").style("vertical-align: middle").text(I18n._("Investor") + "-" + i));
		}).to());
	}
	static mk(wg) {
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("MMagazine");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("KtMarket");
		_g.h["module"] = value1;
		let value2 = dm_Js.ws("ProfitsPg");
		_g.h["source"] = value2;
		let value3 = dm_Js.ws("idata");
		_g.h["rq"] = value3;
		Global.client.send(_g,function(rp) {
			let investors = rp.h["investors"].ri();
			let _this = rp.h["profits"].ra();
			let result = new Array(_this.length);
			let _g = 0;
			let _g1 = _this.length;
			while(_g < _g1) {
				let i = _g++;
				result[i] = data_ProfitsEntry.fromJs(_this[i]);
			}
			let profits = result;
			new pgs_ktmarket_ProfitsPg(wg,investors,profits).show();
		});
	}
}
pgs_ktmarket_ProfitsPg.__name__ = true;
Object.assign(pgs_ktmarket_ProfitsPg.prototype, {
	__class__: pgs_ktmarket_ProfitsPg
});
class pgs_main_Home {
	constructor(wg,iparamsEvals,models,paramsEvals) {
		this.wg = wg;
		this.models = models;
		this.paramsEvals = paramsEvals;
		this.iparamsEvals = iparamsEvals;
	}
	show() {
		let logDiv = dm_Ui.Q("div");
		let load = function(fn) {
			let _g = new haxe_ds_StringMap();
			let value = dm_Js.ws("MMagazine");
			_g.h["prg"] = value;
			let value1 = dm_Js.ws("Main");
			_g.h["module"] = value1;
			let value2 = dm_Js.ws("Home");
			_g.h["source"] = value2;
			let value3 = dm_Js.ws("getLog");
			_g.h["rq"] = value3;
			Global.client.send(_g,function(rp) {
				let log = rp.h["log"].ra();
				let fn1 = fn;
				let result = new Array(log.length);
				let _g = 0;
				let _g1 = log.length;
				while(_g < _g1) {
					let i = _g++;
					result[i] = dm_LogRow.fromJs(log[i]);
				}
				fn1(result);
			});
		};
		let reset = function(fn) {
			let _g = new haxe_ds_StringMap();
			let value = dm_Js.ws("MMagazine");
			_g.h["prg"] = value;
			let value1 = dm_Js.ws("Main");
			_g.h["module"] = value1;
			let value2 = dm_Js.ws("Home");
			_g.h["source"] = value2;
			let value3 = dm_Js.ws("resetLog");
			_g.h["rq"] = value3;
			Global.client.ssend(_g,function(rp) {
				fn();
			});
		};
		dm_Log.mk(logDiv,load,reset,I18n._,true);
		let _gthis = this;
		this.wg.removeAll().adds(dm_It.range(2).map(function(i) {
			return dm_Ui.Q("div").klass("separator");
		}).to()).add(dm_Ui.Q("table").klass("frame").att("align","center").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("span").html("Los mejores resultados de los modelos usados por los inversores son:<br>" + "<pre>" + dm_It.range(this.models.length).map(function(i) {
			return "Inv-" + i + " (" + Std.string(_gthis.iparamsEvals[i].params) + ": " + Std.string(_gthis.iparamsEvals[i].eval / 100) + ") -> " + _gthis.models[i] + Std.string(_gthis.paramsEvals[i].params) + ": " + Std.string(_gthis.paramsEvals[i].eval / 100);
		}).to().join("\n") + "</pre>"))))).add(logDiv);
	}
	static mk(wg) {
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("MMagazine");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("Main");
		_g.h["module"] = value1;
		let value2 = dm_Js.ws("Home");
		_g.h["source"] = value2;
		let value3 = dm_Js.ws("idata");
		_g.h["rq"] = value3;
		Global.client.send(_g,function(rp) {
			let _this = rp.h["iparamsEvals"].ra();
			let result = new Array(_this.length);
			let _g = 0;
			let _g1 = _this.length;
			while(_g < _g1) {
				let i = _g++;
				result[i] = data_ParamsEval.fromJs(_this[i]);
			}
			let iparamsEvals = result;
			let _this1 = rp.h["models"].ra();
			let result1 = new Array(_this1.length);
			let _g2 = 0;
			let _g3 = _this1.length;
			while(_g2 < _g3) {
				let i = _g2++;
				result1[i] = _this1[i].rs();
			}
			let models = result1;
			let _this2 = rp.h["paramsEvals"].ra();
			let result2 = new Array(_this2.length);
			let _g4 = 0;
			let _g5 = _this2.length;
			while(_g4 < _g5) {
				let i = _g4++;
				result2[i] = data_ParamsEval.fromJs(_this2[i]);
			}
			let paramsEvals = result2;
			new pgs_main_Home(wg,iparamsEvals,models,paramsEvals).show();
		});
	}
}
pgs_main_Home.__name__ = true;
Object.assign(pgs_main_Home.prototype, {
	__class__: pgs_main_Home
});
class pgs_mmarket_HotMapsPg {
	constructor(wg,models,modelSel,mapsGroups) {
		this.wg = wg;
		this.models = models;
		this.modelSel = modelSel;
		this.mapsGroups = mapsGroups;
	}
	show() {
		let lopts = [];
		let _g = 0;
		let _g1 = this.models;
		while(_g < _g1.length) {
			let m = _g1[_g];
			++_g;
			lopts.push(dm_Menu.separator());
			lopts.push(dm_Menu.tlink(m,m,"mmarket&hotmaps"));
		}
		lopts.splice(0,1);
		let menu = new dm_Menu(lopts,[],this.modelSel);
		let groups = this.mapsGroups.length;
		this.wg.removeAll().add(menu.wg).add(this.rowGroups(0,groups >= 4 ? 4 : groups));
		if(groups >= 4) {
			this.wg.add(this.rowGroups(4,groups >= 8 ? 8 : groups));
		}
		if(groups >= 8) {
			this.wg.add(dm_Ui.Q("hr")).add(this.rowGroups(8,groups >= 13 ? 13 : groups));
		}
		if(groups >= 13) {
			this.wg.add(this.rowGroups(13,groups >= 18 ? 18 : groups));
		}
		if(groups >= 18) {
			this.wg.add(dm_Ui.Q("hr")).add(this.rowGroups(18,groups));
		}
	}
	rowGroups(start,end) {
		let _gthis = this;
		return dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").adds(dm_It.range(start,end).map(function(i) {
			return dm_Ui.Q("td").add(_gthis.mapChart(_gthis.mapsGroups[i]));
		}).to()));
	}
	mapChart(map) {
		return dm_Ui.Q("table").klass("flat").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("frame").style("text-align:center").text(dm_Dt.toIso(dm_Opt.get(dm_Dt.from(map.date)))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(map.entries[0].params.length == 1 ? this.oneChart(map.entries) : this.twoChart(map.entries))));
	}
	oneChart(es) {
		let nfmt = Fns.paramFormatter(es[0].params[0],es[1].params[0]);
		let max = dm_It.from(es).reduce(es[0].eval,function(r,e) {
			if(e.eval > r) {
				return e.eval;
			} else {
				return r;
			}
		});
		let min = dm_It.from(es).reduce(es[0].eval,function(r,e) {
			if(e.eval < r) {
				return e.eval;
			} else {
				return r;
			}
		});
		let color = Fns.valueColor(max,min);
		let tmp = dm_Ui.Q("table").klass("flat");
		let result = new Array(es.length);
		let _g = 0;
		let _g1 = es.length;
		while(_g < _g1) {
			let i = _g++;
			let e = es[i];
			result[i] = dm_Ui.Q("tr").add(dm_Ui.Q("td").style("padding:0px;" + "width: 120px; height: 6px;" + "background: " + color(e.eval)).att("title",nfmt(e.params[0]) + "\n" + dm_Dec.toIso(e.eval / 100,2)));
		}
		return tmp.adds(result);
	}
	twoChart(es) {
		let firstParam = es[0].params[0];
		let cols = dm_It.from(es).takeWhile(function(e) {
			return e.params[0] == firstParam;
		}).count();
		let rows = es.length / cols | 0;
		let nfmt0 = Fns.paramFormatter(es[0].params[0],es[cols].params[0]);
		let nfmt1 = Fns.paramFormatter(es[0].params[1],es[1].params[1]);
		let max = dm_It.from(es).reduce(es[0].eval,function(r,e) {
			if(e.eval > r) {
				return e.eval;
			} else {
				return r;
			}
		});
		let min = dm_It.from(es).reduce(es[0].eval,function(r,e) {
			if(e.eval < r) {
				return e.eval;
			} else {
				return r;
			}
		});
		let color = Fns.valueColor(max,min);
		return dm_Ui.Q("table").klass("flat").adds(dm_It.range(0,rows).map(function(row) {
			return dm_Ui.Q("tr").adds(dm_It.range(0,cols).map(function(col) {
				let i = row * cols + col;
				let e = es[i];
				return dm_Ui.Q("td").style("padding:0px;" + "width: 6px; height: 6px;" + "background: " + color(e.eval)).att("title",nfmt0(e.params[0]) + " - " + nfmt1(e.params[1]) + "\n" + dm_Dec.toIso(e.eval / 100,2));
			}).to());
		}).to());
	}
	static mk(wg) {
		let url = dm_Ui.url();
		let model = Object.prototype.hasOwnProperty.call(url.h,"2") ? StringTools.trim(url.h["2"]) : "";
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("MMagazine");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("MMarket");
		_g.h["module"] = value1;
		let value2 = dm_Js.ws("HotMapsPg");
		_g.h["source"] = value2;
		let value3 = dm_Js.ws("idata");
		_g.h["rq"] = value3;
		let value4 = dm_Js.ws(model);
		_g.h["model"] = value4;
		Global.client.send(_g,function(rp) {
			let _this = rp.h["models"].ra();
			let result = new Array(_this.length);
			let _g = 0;
			let _g1 = _this.length;
			while(_g < _g1) {
				let i = _g++;
				result[i] = _this[i].rs();
			}
			let models = result;
			let model = rp.h["model"].rs();
			let _this1 = rp.h["mapsGroup"].ra();
			let result1 = new Array(_this1.length);
			let _g2 = 0;
			let _g3 = _this1.length;
			while(_g2 < _g3) {
				let i = _g2++;
				result1[i] = data_HotMap.fromJs(_this1[i]);
			}
			let mapsGroup = result1;
			new pgs_mmarket_HotMapsPg(wg,models,model,mapsGroup).show();
		});
	}
}
pgs_mmarket_HotMapsPg.__name__ = true;
Object.assign(pgs_mmarket_HotMapsPg.prototype, {
	__class__: pgs_mmarket_HotMapsPg
});
class pgs_mmarket_ModelsPg {
	constructor(wg,typeSel,dataGroups) {
		this.wg = wg;
		this.typeSel = typeSel;
		let _g = 0;
		while(_g < dataGroups.length) {
			let vs = dataGroups[_g];
			++_g;
			vs.values.sort(function(e1,e2) {
				if(e1.value < e2.value) {
					return 1;
				} else {
					return -1;
				}
			});
		}
		this.dataGroups = dataGroups;
	}
	show() {
		let lopts = [dm_Menu.tlink("points",I18n._("Points"),"mmarket&models"),dm_Menu.separator(),dm_Menu.tlink("total",I18n._("Assets"),"mmarket&models"),dm_Menu.separator(),dm_Menu.tlink("cash",I18n._("Cash Prfs."),"mmarket&models"),dm_Menu.separator(),dm_Menu.tlink("ref",I18n._("Risk"),"mmarket&models")];
		let menu = new dm_Menu(lopts,[],this.typeSel);
		let groups = this.dataGroups.length;
		this.wg.removeAll().add(menu.wg).add(this.rowGroups(0,groups >= 4 ? 4 : groups));
		if(groups >= 4) {
			this.wg.add(this.rowGroups(4,groups >= 8 ? 8 : groups));
		}
		if(groups >= 8) {
			this.wg.add(dm_Ui.Q("hr")).add(this.rowGroups(8,groups >= 13 ? 13 : groups));
		}
		if(groups >= 13) {
			this.wg.add(this.rowGroups(13,groups >= 18 ? 18 : groups));
		}
		if(groups >= 18) {
			this.wg.add(dm_Ui.Q("hr")).add(this.rowGroups(18,groups));
		}
	}
	rowGroups(start,end) {
		let _gthis = this;
		return dm_Ui.Q("table").att("align","center").add(dm_Ui.Q("tr").adds(dm_It.range(start,end).map(function(i) {
			return dm_Ui.Q("td").add(_gthis.groupTable(_gthis.dataGroups[i]));
		}).to()));
	}
	groupTable(values) {
		let tmp = dm_Ui.Q("table").klass("flat").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("frame").att("colspan",2).style("text-align:center").text(dm_Dt.toIso(dm_Opt.get(dm_Dt.from(values.date)))))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("lhead").text(I18n._("Model"))).add(dm_Ui.Q("td").klass("rhead").text(this.typeSel == "points" ? I18n._("Points") : "€")));
		let _this = values.values;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			let e = _this[i];
			result[i] = dm_Ui.Q("tr").add(dm_Ui.Q("td").klass("lframe").text(e.model)).add(dm_Ui.Q("td").klass("rframe").text(dm_Dec.toIso(e.value,2)));
		}
		return tmp.adds(result);
	}
	static mk(wg) {
		let url = dm_Ui.url();
		let type = Object.prototype.hasOwnProperty.call(url.h,"2") ? StringTools.trim(url.h["2"]) : "";
		let _g = new haxe_ds_StringMap();
		let value = dm_Js.ws("MMagazine");
		_g.h["prg"] = value;
		let value1 = dm_Js.ws("MMarket");
		_g.h["module"] = value1;
		let value2 = dm_Js.ws("ModelsPg");
		_g.h["source"] = value2;
		let value3 = dm_Js.ws("idata");
		_g.h["rq"] = value3;
		let value4 = dm_Js.ws(type);
		_g.h["type"] = value4;
		Global.client.send(_g,function(rp) {
			let type = rp.h["type"].rs();
			let _this = rp.h["dataGroups"].ra();
			let result = new Array(_this.length);
			let _g = 0;
			let _g1 = _this.length;
			while(_g < _g1) {
				let i = _g++;
				result[i] = data_ModelFloats.fromJs(_this[i]);
			}
			let dataGroups = result;
			new pgs_mmarket_ModelsPg(wg,type,dataGroups).show();
		});
	}
}
pgs_mmarket_ModelsPg.__name__ = true;
Object.assign(pgs_mmarket_ModelsPg.prototype, {
	__class__: pgs_mmarket_ModelsPg
});
class wgs_Dmenu {
	constructor(wg,selected) {
		this.wg = wg;
		this.selected = selected;
		this.upDiv = dm_Ui.Q("div").style("padding:0px");
		this.upMenu = this.mkUpMenu();
		this.downDiv = dm_Ui.Q("div");
		this.hidden = false;
		this.view();
	}
	view() {
		this.wg.removeAll().add(this.upDiv.removeAll().add(this.upMenu.wg)).add(this.downDiv);
	}
	mkUpMenu() {
		let lopts = [dm_Menu.tlink("home",I18n._("Home")),dm_Menu.separator(),dm_Menu.tlink("ktmarket",I18n._("KtMarket")),dm_Menu.separator(),dm_Menu.tlink("mmarket",I18n._("MMarket")),dm_Menu.separator(),dm_Menu.tlink("acc",I18n._("Accounting"))];
		let ropts = [];
		return new dm_Menu(lopts,ropts,this.selected);
	}
	hiddingButton() {
		let _gthis = this;
		return new dm_MenuEntry(dm_Option.None,dm_Ui.link(function(e) {
			_gthis.change();
		}).add(dm_Ui.img("menu").style("vertical-align:middle")));
	}
	change() {
		this.hidden = !this.hidden;
		this.upDiv.removeAll();
		if(!this.hidden) {
			this.upDiv.add(this.upMenu.wg);
		}
	}
	setDownMenu(menu) {
		this.downDiv.removeAll().add(menu.wg);
		this.hidden = true;
		this.upDiv.removeAll();
	}
}
wgs_Dmenu.__name__ = true;
Object.assign(wgs_Dmenu.prototype, {
	__class__: wgs_Dmenu
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
Cts.appName = "KtWeb:MMagazine";
Cts.version = "202301";
Cts.foot = dm_Ui.Q("table").klass("main").add(dm_Ui.Q("tr").add(dm_Ui.Q("td").add(dm_Ui.Q("hr")))).add(dm_Ui.Q("tr").add(dm_Ui.Q("td").style("text-align: right;color:#808080;font-size:x-small;").html("- © ºDeme. " + Cts.appName + " (" + Cts.version + ") -")));
Cts.toSellColors = ["rgba(0, 0, 160)","rgba(0, 160, 224)","rgba(0, 160, 0)"];
DateTools.DAY_SHORT_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
DateTools.DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
DateTools.MONTH_SHORT_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
DateTools.MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
I18n.enDic = (function($this) {
	var $r;
	let _g = new haxe_ds_StringMap();
	_g.h["2 Days"] = "2 Days";
	_g.h["Accept"] = "Accept";
	_g.h["Accounting"] = "Accounting";
	_g.h["All"] = "All";
	_g.h["All log entries will be deleted.\nContinue?"] = "All log entries will be deleted.\nContinue?";
	_g.h["Assets"] = "Assets";
	_g.h["Cash Prfs."] = "Cash Prfs.";
	_g.h["Check gray squares"] = "Check gray squares";
	_g.h["Click %0 to continue."] = "Click %0 to continue.";
	_g.h["Dates of profits and ibex does not match"] = "Dates of profits and ibex does not match";
	_g.h["Delete"] = "Delete";
	_g.h["Errors"] = "Errors";
	_g.h["Grey squares checks are wrong"] = "Grey squares checks are wrong";
	_g.h["Home"] = "Home";
	_g.h["Hot Maps"] = "Hot Maps";
	_g.h["Ibex"] = "Ibex";
	_g.h["Investor"] = "Investor";
	_g.h["Investors - Ibex"] = "Investors - Ibex";
	_g.h["Investors average"] = "Investors average";
	_g.h["Keep connected"] = "Keep connected";
	_g.h["KtMarket"] = "KtMarket";
	_g.h["Log"] = "Log";
	_g.h["Login"] = "Login";
	_g.h["MMarket"] = "MMarket";
	_g.h["Model"] = "Model";
	_g.h["Models"] = "Models";
	_g.h["Password"] = "Password";
	_g.h["Password is missing"] = "Password is missing";
	_g.h["Percentages"] = "Percentages";
	_g.h["Points"] = "Points";
	_g.h["Profits"] = "Profits";
	_g.h["Reload"] = "Reload";
	_g.h["Reset must be made from server!"] = "Reset must be made from server!";
	_g.h["Risk"] = "Risk";
	_g.h["Session is expired."] = "Session is expired.";
	_g.h["User"] = "User";
	_g.h["User name is missing"] = "User name is missing";
	_g.h["Wrong password"] = "Wrong password";
	_g.h["here"] = "here";
	$r = _g;
	return $r;
}(this));
I18n.esDic = (function($this) {
	var $r;
	let _g = new haxe_ds_StringMap();
	_g.h["2 Days"] = "2 días";
	_g.h["Accept"] = "Aceptar";
	_g.h["Accounting"] = "Contabilidad";
	_g.h["All"] = "Todo";
	_g.h["All log entries will be deleted.\nContinue?"] = "\"Todas las entradas serán borradas.\n¿Continuar?";
	_g.h["Assets"] = "Capital";
	_g.h["Cash Prfs."] = "Bfs. de Caja";
	_g.h["Check gray squares"] = "Marcar los cuadrados grises";
	_g.h["Click %0 to continue."] = "Hacer click %0 para continuar.";
	_g.h["Dates of profits and ibex does not match"] = "Fechas de beneficios e Ibex no coinciden";
	_g.h["Delete"] = "Borrar";
	_g.h["Errors"] = "Errores";
	_g.h["Grey squares checks are wrong"] = "Las casillas grises están mal marcadas";
	_g.h["Home"] = "Inicio";
	_g.h["Hot Maps"] = "Mapas de calor";
	_g.h["Ibex"] = "Ibex";
	_g.h["Investor"] = "Inversor";
	_g.h["Investors - Ibex"] = "Inversores - Ibex";
	_g.h["Investors average"] = "Media de los inversores";
	_g.h["Keep connected"] = "Mantenerse conectado";
	_g.h["KtMarket"] = "KtMarket";
	_g.h["Log"] = "Registro";
	_g.h["Login"] = "Identificación";
	_g.h["MMarket"] = "MMarket";
	_g.h["Model"] = "Modelo";
	_g.h["Models"] = "Modelos";
	_g.h["Password"] = "Contraseña";
	_g.h["Password is missing"] = "Falta indicar la contraseña";
	_g.h["Percentages"] = "Porcentajes";
	_g.h["Points"] = "Puntos";
	_g.h["Profits"] = "Beneficios";
	_g.h["Reload"] = "Recargar";
	_g.h["Reset must be made from server!"] = "¡El borrado debe ser hecho desde el servidor!";
	_g.h["Risk"] = "Riesgo";
	_g.h["Session is expired."] = "La sesión ha expirado.";
	_g.h["User"] = "Usuario";
	_g.h["User name is missing"] = "Falta indicar el nombre del usuario";
	_g.h["Wrong password"] = "La contraseña es incorrecta";
	_g.h["here"] = "aquí";
	$r = _g;
	return $r;
}(this));
I18n.lang = "es";
MsgPg.tx = "<a href=''>" + I18n._("here") + "</a>";
dm_Client.klen = 300;
Global.KwWebAppName = "KtWeb";
Global.client = new dm_Client(true,Global.KwWebAppName,function() {
	let wg = dm_Ui.Q("div");
	new MsgPg(wg,I18n._("Session is expired.")).show();
	dm_Ui.Q("@body").removeAll().add(wg).add(Cts.foot);
});
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
pgs_ktmarket_PercentsPg.pfColor = "#000000";
pgs_ktmarket_PercentsPg.ibexColor = "#800000";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=index.js.map