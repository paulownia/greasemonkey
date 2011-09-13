// ==UserScript==
// @name           GoogleNotInJapanese
// @namespace      http://paulownia.jp/
// @description    Appends a radio option excluding pages in Japanese to google website. 
// @include        http://www.google.co.jp/*
// @include        http://www.google.com/*
// ==/UserScript==
function getAllLangLocation() {
	var allLang = document.getElementById("lr_");
	if (!allLang) {
		return createAllLangLocation();	
	}
	var a = allLang.querySelector("a");
	if (!a) {
		return createAllLangLocation();	
	}
	return a.getAttribute("href");
}

function createAllLangLocation() {
	if (location.hashes.length > 1) {
		var q = function(){
			var hashes =  location.hashes.substring(1).split("&");
			for (var i=0,  l=hashes.length; i < l; i++) {
				if (hashes[i].indexOf("q=") == 0) {
					return hashes[i];
				}
			}
			return "";
		}();
		return location.pathname + location.search.replaceAll(/lr=[^?#&]+?[?#&]/, "").replaceAll(/q=[^?#&]+?([?#&])/, q + "$1");
	} else {
		return location.pathname + location.search.replaceAll(/lr=[^?#&]+?[?#&]/, "");
	}
}

function createNonJapanese () {
	var href;

	var onlyJa = document.getElementById("lr_lang_1ja");
	if (onlyJa) {
		var a = onlyJa.querySelector("a");
		if (a) {
			href = a.getAttribute("href");
			href = href.replace("lr=lang_ja", "lr=-lang_ja");
		} else {
			href = getAllLangLocation() + "&lr=-lang_ja";
		}
		onlyJa.parentNode.insertBefore(createLink(href, "日本語以外を検索"), onlyJa.nextSibling);
	}
	
	var notJa = document.getElementById("lr_-lang_1ja");
	if (notJa) {
		notJa.textContent = "日本語以外を検索";
		href = notJa.querySelector("a");
		if (a) {
			href = a.getAttribute("href");
			href = href.replace("lr=-lang_ja", "lr=lang_ja");
		} else {
			href = getAllLangLocation() + "&lr=lang_ja";
		}
		notJa.parentNode.insertBefore(createLink(href, "日本語のページを検索"), notJa);
	}
}

function createLink(href, label) {
	var li = document.createElement("li");
	li.setAttribute("class","tbou");

	var a= document.createElement("a");
	a.setAttribute("class", "q qs");
	a.setAttribute("href", href);
	a.textContent = label;
    
	li.appendChild(a);

	return li
}

createNonJapanese();

document.addEventListener("DOMNodeInserted", function(e){ 
	var id = e.target.getAttribute("id");
	if (id == "leftnav") {
		createNonJapanese();
	}
}, false);
