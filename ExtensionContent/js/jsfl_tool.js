(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	new $(Main.onLoad);
};
Main.onLoad = function() {
	Main.jsflTool = new project.JSFLTool();
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var adobe = {};
adobe.cep = {};
adobe.cep._CSEventScope = {};
adobe.cep._CSEventScope.CSEventScope_Impl_ = function() { };
adobe.cep._CSEventScope.CSEventScope_Impl_.__name__ = true;
adobe.cep._OpenURLInDefaultBrowserCode = {};
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_ = function() { };
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.__name__ = true;
adobe.cep._ScaleFactor = {};
adobe.cep._ScaleFactor.ScaleFactor_Impl_ = function() { };
adobe.cep._ScaleFactor.ScaleFactor_Impl_.__name__ = true;
adobe.cep._UIColorType = {};
adobe.cep._UIColorType.UIColorType_Impl_ = function() { };
adobe.cep._UIColorType.UIColorType_Impl_.__name__ = true;
var haxe = {};
haxe.Timer = function() { };
haxe.Timer.__name__ = true;
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var project = {};
project.DirectoryType = { __ename__ : true, __constructs__ : ["Local","Current","Empty"] };
project.DirectoryType.Local = ["Local",0];
project.DirectoryType.Local.toString = $estr;
project.DirectoryType.Local.__enum__ = project.DirectoryType;
project.DirectoryType.Current = ["Current",1];
project.DirectoryType.Current.toString = $estr;
project.DirectoryType.Current.__enum__ = project.DirectoryType;
project.DirectoryType.Empty = ["Empty",2];
project.DirectoryType.Empty.toString = $estr;
project.DirectoryType.Empty.__enum__ = project.DirectoryType;
project.FileList = function() {
	this.list = new Array();
};
project.FileList.__name__ = true;
project.FolderInfo = function() {
};
project.FolderInfo.__name__ = true;
project.JSFLTool = function() {
	var _g = this;
	this.jsflUtility = new project.JSFLUtility();
	this.window = new $(window);
	this.fileSelecter = new $("#jsfl_list");
	this.fileSelecter.dblclick(function(e) {
		_g.executeJSFL();
	});
	this.folderSelecter = new $("#folder_list");
	this.folderSelecter.on("change",null,$bind(this,this.changeFolder));
	this.btnAddLocal = new $("#menu_add_local");
	this.btnAddLocal.on("click",null,$bind(this,this.addLocalFolder));
	this.btnRemoveItem = new $("#button_remove_item");
	this.btnRemoveItem.on("click",null,$bind(this,this.removeItem));
	this.btnRenameItem = new $("#button_rename_item");
	this.btnRenameItem.on("click",null,$bind(this,this.renameItem));
	this.btnOpenItem = new $("#button_open_item");
	this.btnOpenItem.on("click",null,$bind(this,this.openItem));
	this.btnExecute = new $("#button_execute");
	this.btnExecute.on("click",null,$bind(this,this.executeJSFL));
	this.menuSeparate = new $("#menu_separate");
	this.menuSetting = new $("#setting_list");
	this.menuIcon = new $("#menu_icon");
	this.menuIcon.on("click",null,function(e1) {
		_g.menuSetting.toggle();
	});
	this.btnExecute.on("click",null,$bind(this,this.closeMenu));
	this.folderSelecter.on("click",null,$bind(this,this.closeMenu));
	this.fileSelecter.on("click",null,$bind(this,this.closeMenu));
	this.fileSelecter.keypress($bind(this,this.fileSelecter_keyPress));
	this.jsflUtility.addEventListener("com.adobe.events.flash.documentChanged",$bind(this,this.documentChanged));
	this.closeMenu();
	this.addResizeEvent();
	this.jsflUtility.initXML("menu.xml",$bind(this,this.initCallback));
};
project.JSFLTool.__name__ = true;
project.JSFLTool.prototype = {
	fileSelecter_keyPress: function(e) {
		if(e.which == 13) this.executeJSFL();
	}
	,openItem: function() {
		var index = this.getCurrentFolderIndex();
		var current = this.folderInfoList[index];
		this.jsflUtility.openDirectory(current.pathUrl);
	}
	,documentChanged: function() {
		var folderIndex = this.getCurrentFolderIndex();
		var current = this.folderInfoList[folderIndex];
		if(current.type == project.DirectoryType.Current) this.reloadCurrentFolder(current);
	}
	,getCurrentFolderIndex: function() {
		var folderIndexStr = this.folderSelecter.prop("selectedIndex");
		var folderIndex = 0;
		if(folderIndexStr != "0") folderIndex = Std.parseInt(folderIndexStr);
		return folderIndex;
	}
	,closeMenu: function() {
		this.menuSetting.hide();
	}
	,initCallback: function(value) {
		this.loadMenuXML().then(this.loadXMLCallback(0));
	}
	,loadXMLCallback: function(selectIndex) {
		var _g = this;
		return function(result) {
			_g.folderInfoList = new Array();
			_g.fileSelecter.empty();
			_g.folderSelecter.empty();
			_g.addItemLast("","現在のプロジェクト",project.DirectoryType.Current);
			_g.parseXML(result);
			if(_g.folderInfoList.length > selectIndex) {
				var current = _g.folderInfoList[selectIndex];
				if(current.type == project.DirectoryType.Current) _g.reloadCurrentFolder(current); else {
					_g.resetMenu(current.type);
					_g.listFolder(current);
				}
				_g.folderSelecter.prop("selectedIndex",selectIndex);
			}
		};
	}
	,parseXML: function(result) {
		var _g = this;
		new $(result).find("menu").each(function(index,node) {
			console.log(node);
			var currentNode = new $(node);
			var path = currentNode.find("path").text();
			var type = currentNode.find("type").text();
			var folderName = currentNode.find("folderName").text();
			var saveType = project.DirectoryType.Local;
			switch(type) {
			case "local":
				saveType = project.DirectoryType.Local;
				break;
			}
			_g.addItemLast(path,folderName,saveType);
		});
	}
	,openCurrentXFL: function(current) {
		var deferred = new $.Deferred();
		this.jsflUtility.getPathUri(function(uri) {
			if(uri != "") {
				var isXFL = uri.lastIndexOf(".xfl") >= 0;
				var pathFolderIndex = uri.lastIndexOf("/");
				var assetPath = uri.substring(0,pathFolderIndex);
				if(isXFL) {
					pathFolderIndex = assetPath.lastIndexOf("/");
					assetPath = uri.substring(0,pathFolderIndex);
				}
				if(current.type == project.DirectoryType.Current) current.pathUrl = assetPath;
				deferred.resolve();
				return;
			}
			deferred.reject();
		});
		return deferred.promise();
	}
	,removeItem: function() {
		var folderIndex = this.getCurrentFolderIndex();
		var current = this.folderInfoList[folderIndex];
		current.type = project.DirectoryType.Empty;
		this.jsflUtility.confirmDialog("remove:" + current.folderName).then($bind(this,this.saveToXml)).then($bind(this,this.loadMenuXML)).then(this.loadXMLCallback(0)).then($bind(this,this.closeMenu));
	}
	,loadMenuXML: function() {
		return this.jsflUtility.loadXML("menu.xml");
	}
	,saveToXml: function() {
		var d = new $.Deferred();
		var str = "<data>\n";
		var _g = 0;
		var _g1 = this.folderInfoList;
		while(_g < _g1.length) {
			var folder = _g1[_g];
			++_g;
			var folderName = folder.folderName;
			var type = folder.type;
			var pathUrl = folder.pathUrl;
			var _g2 = folder.type;
			switch(_g2[1]) {
			case 0:
				str += "  <menu>\n    <path>" + pathUrl + "</path>\n    <type>" + Std.string(type) + "</type>\n    <folderName>" + folderName + "</folderName>\n  </menu>";
				break;
			case 1:
				break;
			case 2:
				break;
			}
		}
		str += "\n</data>";
		var escaped = escape(str);
		return this.jsflUtility.saveValue("menu.xml",escaped,true);
	}
	,renameItem: function() {
		var _g = this;
		var folderIndex = this.getCurrentFolderIndex();
		var current = this.folderInfoList[folderIndex];
		this.jsflUtility.prompt(function(result) {
			if(result == "null") return; else {
				current.folderName = result;
				_g.saveToXml().then($bind(_g,_g.loadMenuXML)).then(_g.loadXMLCallback(folderIndex)).then($bind(_g,_g.closeMenu));
			}
		},"rename:" + current.folderName);
	}
	,resetMenu: function(type) {
		switch(type[1]) {
		case 0:
			this.btnRemoveItem.show();
			this.btnRenameItem.show();
			this.menuSeparate.show();
			this.btnOpenItem.show();
			break;
		case 1:
			this.btnRemoveItem.hide();
			this.menuSeparate.show();
			this.btnRenameItem.hide();
			this.btnOpenItem.show();
			break;
		case 2:
			this.btnRemoveItem.hide();
			this.menuSeparate.hide();
			this.btnRenameItem.hide();
			this.btnOpenItem.hide();
			break;
		}
	}
	,changeFolder: function(e) {
		var folderIndex = this.getCurrentFolderIndex();
		var current = this.folderInfoList[folderIndex];
		if(current.type == project.DirectoryType.Current) this.reloadCurrentFolder(current); else {
			this.resetMenu(current.type);
			this.listFolder(current);
		}
	}
	,reloadCurrentFolder: function(current) {
		this.resetMenu(current.type);
		this.openCurrentXFL(current).then(this.listFolderDeferred(current)).fail($bind(this,this.folderUndefined));
	}
	,folderUndefined: function() {
		this.fileSelecter.empty();
		this.btnOpenItem.hide();
	}
	,listFolderDeferred: function(current) {
		var _g = this;
		return function() {
			return _g.listFolder(current);
		};
	}
	,listFolder: function(current) {
		var _g = this;
		var deferred = new $.Deferred();
		this.jsflUtility.listFolder(current.pathUrl,function(list) {
			_g.listFolderCallBack(list,current);
			deferred.resolve();
		});
		return deferred.promise();
	}
	,addLocalFolder: function(e) {
		this.jsflUtility.browseForFolderUrl().then($bind(this,this.addFolderPrompt)).then($bind(this,this.saveToXml)).then($bind(this,this.closeMenu));
	}
	,addFolderPrompt: function(result) {
		var _g = this;
		var arr = result.split("/");
		var path = result;
		var fileName = arr.pop();
		var deferred = new $.Deferred();
		var message = "Enter folder name\", \"" + fileName;
		this.jsflUtility.prompt(function(result1) {
			if(result1 == "null") {
				deferred.reject();
				return;
			}
			_g.addItemLast(path,result1,project.DirectoryType.Local);
			_g.selectLastFolder();
			deferred.resolve();
		},message);
		return deferred.promise();
	}
	,selectLastFolder: function() {
		var folderCount = this.folderSelecter.children("option").length;
		this.folderSelecter.val("jsfl" + (folderCount - 1)).trigger("change");
	}
	,addItemLast: function(path,folderName,type) {
		var folderCount = this.folderSelecter.children("option").length;
		this.folderSelecter.append("<option value=\"jsfl" + folderCount + "\">" + folderName + "</option>");
		var folderInfo = new project.FolderInfo();
		folderInfo.folderName = folderName;
		folderInfo.pathUrl = path;
		folderInfo.type = type;
		this.folderInfoList.push(folderInfo);
	}
	,addResizeEvent: function() {
		var _g = this;
		var selecterHeight = this.fileSelecter.height();
		var selecterSize = Std.parseInt(this.fileSelecter.attr("size"));
		this.selecterOptionHeihgt = Math.floor(selecterHeight / selecterSize) + 1;
		this.resizeList();
		new $(window).on("resize",null,function(e) {
			_g.resizeList();
		});
	}
	,listFolderCallBack: function(list,current) {
		var lists = list.split(",");
		this.fileSelecter.empty();
		current.fileList = new project.FileList();
		var i = 0;
		var _g = 0;
		while(_g < lists.length) {
			var name = lists[_g];
			++_g;
			current.fileList.list.push(name);
			this.fileSelecter.append("<option value=\"jsfl" + i + "\">" + name + "</option>");
			i++;
		}
	}
	,resizeList: function() {
		var windowHeight = this.window.height();
		var s = Math.floor((windowHeight - 60) / this.selecterOptionHeihgt);
		if(s <= 0) s = 1;
		this.fileSelecter.attr("size",s);
	}
	,fltrace: function(value) {
		this.jsflUtility.fltrace(value);
	}
	,executeJSFL: function() {
		var folderIndex = this.getCurrentFolderIndex();
		if(folderIndex == -1) {
			this.fltrace("You have not selected a directory");
			return;
		}
		var fileName = this.fileSelecter.find("option:selected").text();
		if(fileName == "") {
			this.fltrace("You have not selected a jsfl");
			return;
		}
		var current = this.folderInfoList[folderIndex];
		var jsflUri = current.pathUrl + "/" + fileName;
		var jsfl = "fl.runScript(\"" + jsflUri + "\");";
		new CSInterface().evalScript(jsfl);
	}
};
project.JSFLUtility = function() {
	this.csInterface = new CSInterface();
};
project.JSFLUtility.__name__ = true;
project.JSFLUtility.prototype = {
	addEventListener: function(type,listener) {
		this.csInterface.addEventListener(type,listener);
	}
	,removeEventListener: function(type,listener) {
		this.csInterface.removeEventListener(type,listener);
	}
	,browseForFolderUrl: function(message) {
		if(message == null) message = "Select a folder.";
		var deferred = new $.Deferred();
		this.csInterface.evalScript("browseForFolderUrl('" + message + "')",function(result) {
			if(result == "null") {
				deferred.reject();
				return;
			}
			deferred.resolve(result);
		});
		return deferred.promise();
	}
	,confirmDialog: function(text) {
		var deferred = new $.Deferred();
		this.csInterface.evalScript("confirm('" + text + "');",function(result) {
			if(result == "true") {
				deferred.resolve();
				return;
			}
			deferred.reject();
		});
		return deferred.promise();
	}
	,saveValue: function(fileName,value,escaped) {
		var deferred = new $.Deferred();
		this.csInterface.evalScript("saveValue('" + fileName + "','" + value + "','" + (escaped == null?"null":"" + escaped) + "');",function(result) {
			deferred.resolve();
		});
		return deferred.promise();
	}
	,prompt: function(callback,text) {
		this.csInterface.evalScript("prompt(\"" + text + "\")",callback);
	}
	,loadXML: function(fileName) {
		var deferred = new $.Deferred();
		this.csInterface.evalScript("loadXML('" + fileName + "');",function(result) {
			deferred.resolve(result);
		});
		return deferred.promise();
	}
	,initXML: function(fileName,callback) {
		this.csInterface.evalScript("initXML('" + fileName + "');",callback);
	}
	,listFolder: function(fileName,callback) {
		this.csInterface.evalScript("listFolder('" + fileName + "');",callback);
	}
	,listFolderDeferred: function(fileName) {
		var deferred = new $.Deferred();
		this.csInterface.evalScript("listFolder('" + fileName + "');",function(result) {
			deferred.resolve(result);
		});
		return deferred.promise();
	}
	,getPathUri: function(callback) {
		this.csInterface.evalScript("getPathUri()",function(result) {
			callback(result);
		});
	}
	,openDirectory: function(pathUrl) {
		this.csInterface.evalScript("openDirectory(\"" + pathUrl + "\");");
	}
	,fltrace: function(value) {
		this.csInterface.evalScript("fl.trace(\"[info]JSFLTool : " + value + "\");");
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
Array.__name__ = true;
adobe.cep._CSEventScope.CSEventScope_Impl_.GLOBAL = "GLOBAL";
adobe.cep._CSEventScope.CSEventScope_Impl_.APPLICATION = "APPLICATION";
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.NO_ERROR = 0;
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.ERR_UNKNOWN = 1;
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.ERR_INVALID_PARAMS = 2;
adobe.cep._OpenURLInDefaultBrowserCode.OpenURLInDefaultBrowserCode_Impl_.ERR_INVALID_URL = 201;
adobe.cep._ScaleFactor.ScaleFactor_Impl_.FAIL = -1;
adobe.cep._ScaleFactor.ScaleFactor_Impl_.NORMAL = 1;
adobe.cep._ScaleFactor.ScaleFactor_Impl_.HiDPI = 2;
adobe.cep._UIColorType.UIColorType_Impl_.RGB = 1;
adobe.cep._UIColorType.UIColorType_Impl_.GRADATION = 2;
Main.main();
})();
