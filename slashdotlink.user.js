// ==UserScript==
// @name           SlashdotLink
// @namespace      http://paulownia.jp/
// @include        http://slashdot.jp/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
	var link = links[i];
	if (!link) {
		continue;
	}
	var href = link.getAttribute("href");
	if (href && href.indexOf("slashdot.jp/link.pl") > 0) {
		var newHref = decodeURIComponent(href.substring(href.indexOf("=") + 1, href.lastIndexOf("&ref=")));
		link.setAttribute("href", newHref);
	}
}

