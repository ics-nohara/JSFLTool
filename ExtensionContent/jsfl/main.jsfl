var cashURL = "jp.ics-web/JSFLTools/";

function loadXML(url) {
    var rootURL = fl.configURI + cashURL;
    var str = FLfile.read(rootURL + url);
    return str;
}

function listFolder(url) {
    var folderURI = "" + url;
    var fileMask = "*.jsfl";
    var list = FLfile.listFolder(folderURI + "/" + fileMask, "files");
    return list.join(",");
}

function initXML(url) {
    var rootURL = fl.configURI + cashURL;
    if (!FLfile.exists(rootURL + url)) {
        FLfile.createFolder(fl.configURI + cashURL);
        FLfile.write(rootURL + url, "<data></data>");
    } else {}
}

function browseForFolderUrl(text) {
    var folderURI = fl.browseForFolderURL(text);
    return folderURI;
}

function saveValue(url, value, escaped) {
    var rootURL = fl.configURI + cashURL;
    var folderUrl = rootURL + url;
    arr = folderUrl.split("/");
    arr.pop();
    folderUrl = arr.join("/");
    if (!FLfile.exists(folderUrl)) {
        FLfile.createFolder(folderUrl);
    }
    if (escaped) {
        FLfile.write(rootURL + url, unescape(value));
    } else {
        FLfile.write(rootURL + url, value);
    }
}

function getPathUri() {
    if (fl.getDocumentDOM() == null) {
        return "";
    }
    return fl.getDocumentDOM().pathURI;
}

function openDirectory(path) {
    var uri = FLfile.uriToPlatformPath(path);
    if (isMac()) {
        FLfile.runCommandLine("open " + "\"" + uri + "\"");
    } else {
        FLfile.runCommandLine("explorer " + "\"" + uri + "\"");
    }
}

function isMac() {
    return (fl.version.search(/mac/i) > -1);
}