// ==UserScript==
// @name           HatenaWarp
// @namespace      paulownia.jp
// @description    はてなサービス間を移動するリンクをページ下に作成します。
// @include        *.hatena.ne.jp/*
// @exclude        http://a.hatena.ne.jp/category*
// @exclude        http://b.hatena.ne.jp/entry/*
// @exclude        http://b.hatena.ne.jp/entrylist*
// @exclude        http://b.hatena.ne.jp/bookmarklet?*
// @exclude        http://b.hatena.ne.jp/add?*
// @exclude        http://d.hatena.ne.jp/keyword/*
// @exclude        http://d.hatena.ne.jp/hotkeyword*
// @exclude        http://cdn.api.b.hatena.ne.jp/*
// @exclude        http://blog.hatena.ne.jp/*

// ==/UserScript==
if (location.pathname.length == 1) {
	return;
}
if (window.top != window.self) {
	return;
}

var loc = location.pathname.substring(1);
var pos = loc.indexOf("/");
if (pos > 0) {
	loc = loc.substring(0, pos);
}
var services = ["a","d","b","f","q","c","s","h"];

var style = window.getComputedStyle(document.body, "");
var color = style.backgroundColor;

if (color == "transparent") {
	color = "rgba(80,80,80,0.8)"
} else if (color.indexOf("rgba") == 0) {
	// do nothing
} else if (color.indexOf("rgb") == 0) {
	color = "rgba" +  color.substring(color.indexOf("("), color.indexOf(")")) + ", 0.8)" ;
} else {
	color = "rgba(28,128,128,0.8)";
}

var d = document.createElement("div");
d.style.backgroundColor = "rgba(255,255,255,0.1)";
d.style.border = "none";
d.style.position = "fixed";
d.style.MozBorderRadius = "8px";
d.style.MozBoxShadow = "2px 2px 2px rgba(32,32,32,0.4)";
d.style.borderRadius = "8px";
d.style.boxShadow = "2px 2px 2px rgba(32,32,32,0.4)";
d.style.display = "block";
d.style.bottom = "8px";
d.style.left = "8px";
d.style.padding = "6px 8px";
d.style.margin = "0";
d.style.fontFamily = "monospace";
d.style.textShadow = "-1px -1px 1px #707070";
d.style.zIndex = "1";

var d2 = document.createElement("div");
d2.style.padding = "0";
d2.style.margin = "0";
d2.style.visibility = "hidden";
d2.style.background = "none";

d.appendChild(d2);

services.forEach(function(service){
	var a = document.createElement("a");
	a.textContent = service.toUpperCase();
	a.href = "http://" + service + ".hatena.ne.jp/" + loc + "/"; 
	a.style.color = "#fff";
	a.style.margin = "5px";
	d2.appendChild(a);
});

d.addEventListener("mouseover", function(){
	//ev.stopPropagation();
	d.style.backgroundColor = "transparent";
	d.style.backgroundImage = "-moz-linear-gradient(" + color + " 0%, rgba(0,0,0,0.8) 100%)";
	d2.style.visibility = "visible";
}, true);
document.documentElement.addEventListener("mouseover", function(){
	d.style.backgroundColor = "rgba(255,255,255,0.1)";
	d.style.backgroundImage = "none";
	d2.style.visibility = "hidden";
}, true);
document.body.appendChild(d);
