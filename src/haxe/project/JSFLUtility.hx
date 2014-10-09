package project;
import adobe.cep.*;
import jQuery.*;

/**
 * JSFLとJSをつなぐ為のユーティリティクラス
 * CSInterfaceのevalScriptをラッピング
 * @author Nozomi Nohara
 */
class JSFLUtility {

	var csInterface:CSInterface;
	
	public function new() {
		csInterface = new CSInterface();
	}

	public function addEventListener(type:String,listener:Void->Void) {
		csInterface.addEventListener(type,listener);
	}

	public function removeEventListener(type:String,listener:Void->Void) {
		csInterface.removeEventListener(type,listener);
	}

	public function browseForFolderUrl(message:String='Select a folder.') : Promise{
		var deferred:jQuery.Deferred = new jQuery.Deferred();
		csInterface.evalScript("browseForFolderUrl('"+message+"')",
			function (result:Dynamic) : Void{
				if(result == "null"){
					deferred.reject();
					return ;
				}
				deferred.resolve(result);
			}
		);
		return deferred.promise();
	}

	public function confirmDialog(text:String) : Promise {
		var deferred:jQuery.Deferred = new jQuery.Deferred();
		csInterface.evalScript("confirm('" + text + "');", function(result:Dynamic) :Void {
				if (result == "true"){
					deferred.resolve();
					return ;
				}
				deferred.reject();

		});
		return deferred.promise();	
	}
	
	public function saveValue(fileName:String, value:String, escaped:Bool) : Promise {
		var deferred:jQuery.Deferred = new jQuery.Deferred();
		csInterface.evalScript("saveValue('" + fileName + "','" + value + "','" + escaped + "');", 
			function (result:String) : Void{
				deferred.resolve();
			}
		);

		return deferred.promise();
	}

	public function prompt(callback:String->Void,text:String): Void {
		csInterface.evalScript('prompt("'+text+'")', callback );
	}

	public function loadXML(fileName:String) : Promise{
		var deferred:jQuery.Deferred = new jQuery.Deferred();
		csInterface.evalScript("loadXML('" + fileName + "');", function (result:Dynamic) : Void
			{
				deferred.resolve(result);
			}
		);
		return deferred.promise();
	}
	

	public function initXML(fileName:String,callback:Dynamic->Void) : Void{
		csInterface.evalScript("initXML('" + fileName + "');", callback);
	}

	public function listFolder(fileName:String, callback:Dynamic->Void) {
		csInterface.evalScript("listFolder('" + fileName + "');", callback);
	}

	public function listFolderDeferred(fileName:String) : Promise {
		var deferred:jQuery.Deferred = new jQuery.Deferred();
		csInterface.evalScript("listFolder('" + fileName + "');", function (result:Dynamic) : Void
			{
				deferred.resolve(result);
			});
		return deferred.promise();
	}

	public function getPathUri(callback:String->Void) : Void{
		csInterface.evalScript('getPathUri()', 
			function (result:Dynamic) : Void{
				callback( result);
			}
		);
	}

	public function openDirectory(pathUrl:String) : Void{
		csInterface.evalScript('openDirectory("'+pathUrl+'");');
	}

	public function fltrace(value) :Void {
		csInterface.evalScript('fl.trace("[info]JSFLTool : ' + value + '");');
	}

}