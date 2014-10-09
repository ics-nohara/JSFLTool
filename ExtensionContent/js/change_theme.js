
/**
 * Update the theme with the AppSkinInfo retrieved from the host product.
 */
function updateThemeWithAppSkinInfo(appSkinInfo) {

    //Update the background color of the panel
    var panelBackgroundColor = appSkinInfo.panelBackgroundColor.color;
    var panelBgColor = panelBackgroundColor;
    document.body.bgColor = toHex(panelBackgroundColor);

    var blightness = Math.max(panelBgColor.red, panelBgColor.blue, panelBgColor.green) / 255;  
    if( blightness >= 0.5) {  
        //	明るめ
    	$("#topcoat").attr("href","./css/topcoat-desktop-light.css");
    	$("#mainstyle").attr("href","./css/light-style.css");
    } else {
    	//	暗め
    	$("#topcoat").attr("href","./css/topcoat-desktop-dark.css");
    	$("#mainstyle").attr("href","./css/dark-style.css");
    }
}

function reverseColor(color, delta) {
    return toHex({red:Math.abs(255-color.red), green:Math.abs(255-color.green), blue:Math.abs(255-color.blue)}, delta);
}

/**
 * Convert the Color object to string in hexadecimal format;
 */
function toHex(color, delta) {
    function computeValue(value, delta) {
        var computedValue = !isNaN(delta) ? value + delta : value;
        if (computedValue < 0) {
            computedValue = 0;
        } else if (computedValue > 255) {
            computedValue = 255;
        }
        computedValue = parseInt(computedValue);

        computedValue = computedValue.toString(16);
        return computedValue.length == 1 ? "0" + computedValue : computedValue;
    }

    var hex = "";
    if (color) {
        with (color) {
             hex = computeValue(red, delta) + computeValue(green, delta) + computeValue(blue, delta);
        };
    }
    return "#" + hex;
}

function onAppThemeColorChanged(event) {
    console.log("onAppThemeColorChanged");
    // Should get a latest HostEnvironment object from application.
    var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
    // Gets the style information such as color info from the skinInfo, 
    // and redraw all UI controls of your extension according to the style info.
    console.log("skinInfo" + skinInfo);
    updateThemeWithAppSkinInfo(skinInfo);
} 

function onLoadTheme() {

    console.log("onAppThemeColorChanged");
    new CSInterface().addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);

    onAppThemeColorChanged(null);
}