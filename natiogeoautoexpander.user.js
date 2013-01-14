// ==UserScript==
// @name           NatioGeoAutoExpander
// @namespace      paulownia.jp
// @description    ナショジオの記事の続きを自動的に表示する
// @include        http://www.nationalgeographic.co.jp/news/news_article.php?file_id=*
// ==/UserScript==

window.addEventListener("load", function(){
    var anchors = document.querySelectorAll("#DispDefault1 a");
    for (var i = 0; i < anchors.length; i++) {
    	var a = anchors[i];
    	if (a.href === "javascript:;") {
    		doClick(a);
    	}
    }
});


function doClick(obj) {
	var event = document.createEvent("MouseEvents");
	event.initMouseEvent("click", true, true, null, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	obj.dispatchEvent(event);
}
