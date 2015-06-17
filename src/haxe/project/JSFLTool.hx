package project;

import jQuery.*;
import adobe.cep.*;
import project.FolderInfo;
import project.FileList;
import haxe.Timer;
import project.JSFLUtility;
import project.DirectoryType;

/**
 * JSFLToolのメインクラス
 * @author Nozomi Nohara
 */
class JSFLTool {

	public function new() {

		jsflUtility = new JSFLUtility();

		window = new JQuery(js.Browser.window);

		//	リストボックス
    	fileSelecter = new JQuery("#jsfl_list");
    	fileSelecter.dblclick(function (e) : Void{
    		executeJSFL();
    	} );


    	folderSelecter = new JQuery("#folder_list");
		folderSelecter.on("change", changeFolder);

		//	ボタン類
		btnAddLocal = new JQuery("#menu_add_local");
		btnAddLocal.on("click",addLocalFolder);

		btnRemoveItem = new JQuery("#button_remove_item");
		btnRemoveItem.on("click", removeItem);

		btnRenameItem = new JQuery("#button_rename_item");
		btnRenameItem.on("click", renameItem);

		btnOpenItem = new JQuery("#button_open_item");
		btnOpenItem.on("click", openItem);

		btnExecute = new JQuery("#button_execute");
		btnExecute.on("click", executeJSFL);

		menuSeparate = new JQuery('#menu_separate');

		menuSetting = new JQuery("#setting_list");

		menuIcon = new JQuery("#menu_icon");
		menuIcon.on("click",
			function(e) :Void{
				menuSetting.toggle();
			}
		);

		//	他の部分触ったらメニュー閉じる
		btnExecute.on("click",closeMenu);
		folderSelecter.on("click",closeMenu);
		fileSelecter.on("click",closeMenu);

		fileSelecter.keypress(fileSelecter_keyPress);

		//	ドキュメント変更時のイベント
		jsflUtility.addEventListener("com.adobe.events.flash.documentChanged",documentChanged);
		jsflUtility.addEventListener("com.adobe.events.flash.documentSaved",documentChanged);

		closeMenu();

		addResizeEvent();

		jsflUtility.initXML("menu.xml",initCallback);
	}

	private var folderInfoList:Array<FolderInfo> ;
	private var jsflUtility:JSFLUtility;
	private var currentFolder:FolderInfo;

	private var csInterface:CSInterface;

	private var window:JQuery;
	private var fileSelecter:JQuery;
	private var folderSelecter:JQuery;
	private var btnAddLocal:JQuery;
	private var btnRemoveItem:JQuery;
	private var btnRenameItem:JQuery;
	private var btnOpenItem:JQuery;
	private var btnExecute:JQuery;
	private var menuSeparate:JQuery;
	private var menuSetting:JQuery;
	private var menuIcon:JQuery;
	

	private function fileSelecter_keyPress(e:jQuery.Event) : Void {
		if (e.which == 13) { // enter key
			executeJSFL();
		}
	}


	private function openItem() : Void {
		var index:Int = getCurrentFolderIndex();

		var current:FolderInfo = folderInfoList[index];

		jsflUtility.openDirectory(current.pathUrl);
	}
	
    private function documentChanged() {
    	var folderIndex = getCurrentFolderIndex();

		var current:FolderInfo = folderInfoList[folderIndex];

		if( current.type == DirectoryType.Current) {
			reloadCurrentFolder(current);
		}
	}
	private function getCurrentFolderIndex() : Int{

    	var folderIndexStr = folderSelecter.prop("selectedIndex") ;

		var folderIndex:Int = 0; 

		if( folderIndexStr != "0") {
			folderIndex = Std.parseInt( folderIndexStr );
		}

		return folderIndex;
	}

    private function closeMenu() : Void{
		menuSetting.hide();
    }

    private function initCallback(value:Dynamic) : Void
    {
    	loadMenuXML().then( loadXMLCallback(0) );
    }


    private function loadXMLCallback(selectIndex:Int) : Dynamic->Void
    {
    	return function (result:Dynamic) : Void{

			//	
			folderInfoList = new Array<FolderInfo>();

			fileSelecter.empty();
			folderSelecter.empty();

			//trace(result);

			addItemLast("","現在のプロジェクト",DirectoryType.Current);

			parseXML(result);

			if( folderInfoList.length > selectIndex) {
				var current:FolderInfo = folderInfoList[selectIndex];

				if( current.type == DirectoryType.Current) {
					reloadCurrentFolder(current);
				} else {
					resetMenu(current.type);
					listFolder(current);
				}

				folderSelecter.prop("selectedIndex", selectIndex);
			 
			}
    	}
	}

    private function parseXML(result:String) : Void
    {
		new JQuery(result).find("menu").each(
			function(index:Int ,node:js.html.Node) : Void{
				trace(node);
				
				var currentNode = new JQuery(node);

				var path = currentNode.find('path').text();
				var type = currentNode.find('type').text();

				var folderName = currentNode.find('folderName').text();

				var saveType:DirectoryType = DirectoryType.Local;

				switch(type) {
					case "local":
					saveType = DirectoryType.Local;
				}
				addItemLast(path,folderName,saveType);
			});

    }


    private function openCurrentXFL(current:FolderInfo) : Promise {
    	var deferred:Deferred = new Deferred();
		jsflUtility.getPathUri(function (uri:String) : Void{

			if( uri != "" ) {

				var isXFL = uri.lastIndexOf(".xfl") >= 0; //xflかどうか確認
				var pathFolderIndex = uri.lastIndexOf("/");
				var assetPath = uri.substring( 0, pathFolderIndex);

				//  相対でresディレクトリ
				if (isXFL) {
					pathFolderIndex = assetPath.lastIndexOf("/");
					assetPath = uri.substring( 0, pathFolderIndex);
				}
						
				if( current.type == DirectoryType.Current) {
					current.pathUrl = assetPath;
				}
				deferred.resolve();
				return;
			}

			deferred.reject();
		});
		return deferred.promise();
    }

    private function removeItem() : Void
    {
    	var folderIndex = getCurrentFolderIndex();

		var current:FolderInfo = folderInfoList[folderIndex];

		current.type = DirectoryType.Empty;

		jsflUtility.confirmDialog( "remove:" + current.folderName )
		.then( saveToXml )
		.then( loadMenuXML )
		.then( loadXMLCallback(0))
		.then( closeMenu );
    }

    private function loadMenuXML() : Promise
    {
    	return jsflUtility.loadXML("menu.xml");
    }

    private function saveToXml() :Promise {

  		var d:Deferred = new Deferred();
  		
		var str = "<data>\n";
	
		for ( folder in  folderInfoList) {
			//if (folder == null)
			//	continue;
			var folderName = folder.folderName;
			var type = folder.type;
			var pathUrl = folder.pathUrl;
			switch(folder.type) {
				case DirectoryType.Local:
					str += '  <menu>
    <path>$pathUrl</path>
    <type>$type</type>
    <folderName>$folderName</folderName>
  </menu>';
				case DirectoryType.Current:
				case DirectoryType.Empty:
			}
		}
	
		str += "\n</data>";

  		var escaped:Dynamic = untyped escape( str );

  		return jsflUtility.saveValue( "menu.xml", escaped, true );
	}


    private function renameItem() : Void
    {
    	var folderIndex = getCurrentFolderIndex();

		var current:FolderInfo = folderInfoList[folderIndex];

    	jsflUtility.prompt(function (result:String) : Void
    	{
    		if (result == "null")
    		{
				return;
			} else {
				current.folderName = result;
				saveToXml()
				.then( loadMenuXML )
				.then( loadXMLCallback(folderIndex) )
				.then( closeMenu );

			}
		}, "rename:" + current.folderName);
    }

    private function resetMenu(type:DirectoryType) : Void{

    	switch(type) {
    		case DirectoryType.Local:
				btnRemoveItem.show();
				btnRenameItem.show();
				menuSeparate.show();
				btnOpenItem.show();
			
			case DirectoryType.Current:
				btnRemoveItem.hide();
				menuSeparate.show();
				btnRenameItem.hide();
				btnOpenItem.show();
			
			case DirectoryType.Empty:

				btnRemoveItem.hide();
				menuSeparate.hide();
				btnRenameItem.hide();
				btnOpenItem.hide();
    	}
    }

    private function changeFolder(e) : Void 
	{
		var folderIndex:Int = getCurrentFolderIndex();
		var current:FolderInfo = folderInfoList[folderIndex];

		if( current.type == DirectoryType.Current) {
			reloadCurrentFolder(current);
		} else {
			resetMenu(current.type);
			listFolder(current);
		}
	}
	private function reloadCurrentFolder(current:FolderInfo) : Void
	{
		resetMenu(current.type);
		openCurrentXFL(current).then(listFolderDeferred(current)).fail(folderUndefined);
	}

	private function folderUndefined() : Void
	{
		fileSelecter.empty();
		btnOpenItem.hide();
	}

	private function listFolderDeferred(current:FolderInfo) : Void->Promise{
		return function () : Promise{
			return listFolder(current);
		}
	}

	private function listFolder(current:FolderInfo) : Promise{
		var deferred:Deferred = new Deferred();
		jsflUtility.listFolder(current.pathUrl, function (list:Dynamic) : Void
			{
				listFolderCallBack(list,current);
				deferred.resolve();
			}
		);
		return deferred.promise();
	}
    private function addLocalFolder(e) : Void
    {
    	jsflUtility.browseForFolderUrl()
    	.then( addFolderPrompt )
    	.then( saveToXml )
    	.then( closeMenu )  ;
    }
    
    private function addFolderPrompt(result:Dynamic) : Promise
    {
		var arr = result.split("/");
    	var path:String = result;
    	var fileName:String = arr.pop();
 

   		var deferred:Deferred = new Deferred();
  		
    	var message = 'Enter folder name", "' + fileName;

    	jsflUtility.prompt(function (result:String) : Void
    	{
    		if (result == "null")
    		{
    			deferred.reject();
				return;
			}
			addItemLast(path,result,DirectoryType.Local);
			
			selectLastFolder();

    		deferred.resolve();
    	},message);
    	
    	return deferred.promise();
    }

    private function selectLastFolder() : Void
    {
    	// new JQuery("#folder-list option").length
		var folderCount:Int = folderSelecter.children("option").length;
		folderSelecter.val("jsfl" + (folderCount-1)) .trigger('change');
    }

    private function addItemLast(path:String,folderName:String,type:DirectoryType) : Void
    {
    	var folderCount:Int = folderSelecter.children("option").length;
    	folderSelecter.append('<option value="jsfl' + folderCount + '">' + folderName + '</option>');
    	var folderInfo = new FolderInfo();
    	
    	folderInfo.folderName = folderName;
    	folderInfo.pathUrl = path;
    	folderInfo.type = type;
	
		folderInfoList.push(folderInfo);
    }

    var useTimer:Bool;
    var timer:Timer;
    var selecterOptionHeihgt:Int;

    private function addResizeEvent() : Void{


    	var selecterHeight:Float = fileSelecter.height();
    	var selecterSize:Int =  Std.parseInt( fileSelecter.attr("size") );

    	selecterOptionHeihgt =  Math.floor( selecterHeight / selecterSize ) + 1;

    	resizeList();
		new JQuery(js.Browser.window).on("resize",function(e) :Void {
			resizeList();
		});
    }

	private function listFolderCallBack(list:String,current:FolderInfo ) {

		var lists = list.split(",");
		fileSelecter.empty();

		current.fileList = new FileList();

		var i = 0;
		for ( name in  lists) {
			current.fileList.list.push( name );

			fileSelecter.append(
					'<option value="jsfl' + i + '">' + name+ '</option>');
			i ++;
		}
	}

    private function resizeList() : Void
    {
    	var windowHeight:Float = window.height();
		var s = Math.floor(( windowHeight - 60) / selecterOptionHeihgt);
		if (s <= 0)
			s = 1;
		fileSelecter.attr("size", s);
    }

	private function fltrace(value) :Void {
		jsflUtility.fltrace(value);
	}

	private function executeJSFL() {

		var folderIndex:Int = getCurrentFolderIndex();

		if( folderIndex == -1 ) {
			fltrace("You have not selected a directory");
			return ;
		}

		var fileName:String = fileSelecter.find("option:selected").text();

		if( fileName == "" ) {
			fltrace("You have not selected a jsfl");
			return ;
		}

		var current:FolderInfo = folderInfoList[folderIndex];
		var jsflUri = current.pathUrl + "/" + fileName;

		var jsfl = 'fl.runScript("' + jsflUri + '");';

		new CSInterface().evalScript(jsfl);
	}
}