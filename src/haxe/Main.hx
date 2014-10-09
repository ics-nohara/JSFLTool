import project.JSFLTool;
import jQuery.*;

/**
 * JSFLToolのクラス呼び出しのみ
 * @author Nozomi Nohara
 */
class Main {
	static var jsflTool:JSFLTool;
	static function main(){
		new JQuery(onLoad);
    }

    private static function onLoad() : Void
    {
    	jsflTool = new JSFLTool();
    }
}