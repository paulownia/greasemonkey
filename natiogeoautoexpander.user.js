// ==UserScript==
// @name           NatioGeoAutoExpander
// @namespace      paulownia.jp
// @description    ナショジオの記事の続きを自動的に表示する
// @include        http://www.nationalgeographic.co.jp/news/news_article.php?file_id=*
// ==/UserScript==
if (!isTarget()) {
	return;
}
var xmlHttp = new XMLHttpRequest();
var expandLocation = getExpandLocation();
xmlHttp.open("GET", expandLocation, true);
xmlHttp.onload = function() {
	if (xmlHttp.status != 200) {
		return;
	}
	var text = xmlHttp.responseText;
	text = text.replace(/<script(.|\r|\n)+?script>/g, "");
	var result = text.match(/<body.+?>((.|\n|\r)+?)<\/body>/);

	
	if (result && result.length) {
		var exDoc = document.implementation.createHTMLDocument("");
		var exRange = exDoc.createRange();
		exDoc.documentElement.appendChild(exRange.createContextualFragment(result[0]));
	
		var expandedArticle = exDoc.getElementsByClassName("story")[0] || exDoc.getElementsByClassName("galleryContentWell")[0];
		var shrinkedArticle = document.getElementsByClassName("story")[0] || document.getElementsByClassName("galleryContentWell")[0];

		shrinkedArticle.parentNode.replaceChild(document.importNode(expandedArticle, true), shrinkedArticle);
	
		history.replaceState("", document.title, expandLocation);
	}
};
xmlHttp.send();

function getExpandLocation() {
	var query = location.search.substring(1);
	var fileId = query.split("&").filter(function(e){ return e.indexOf("file_id") > -1 }).join("&");
	var url = location.href.substring(0, location.href.indexOf("?")) + "?" +  fileId + "&expand";
	return url;
}

function isTarget() {
	if (location.search.indexOf("expand") > 0) {
		return false;
	}
	var links = document.getElementsByTagName("a");
	for (var i = 0, l = links.length; i < l ; i++) {
		var link = links[i];
		var href = link.getAttribute("href");
		if (!href) { 
			continue;
		}
		if (href.indexOf("expand#title") > 0) {
			return true;
		}
	}
	return false;
}
