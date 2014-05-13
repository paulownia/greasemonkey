// ==UserScript==
// @name           GoogleNotInJapanese
// @namespace      http://paulownia.jp/
// @version        1.1.0
// @grant          none
// @description    This script adds a link to exclude pages written in Japanese from google's search results.
// @include        http://www.google.co.jp/search*
// @include        http://www.google.com/search*
// @include        https://www.google.co.jp/search*
// @include        https://www.google.com/search*
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
        var q = (function(){
            var hashes =  location.hashes.substring(1).split("&");
            for (var i=0,  l=hashes.length; i < l; i++) {
                if (hashes[i].indexOf("q=") === 0) {
                    return hashes[i];
                }
            }
            return "";
        })();
        return location.pathname + location.search.replaceAll(/lr=[^?#&]+?[?#&]/, "").replaceAll(/q=[^?#&]+?([?#&])/, q + "$1");
    } else {
        return location.pathname + location.search.replaceAll(/lr=[^?#&]+?[?#&]/, "");
    }
}

function createNonJapanese () {

    var href, a;

    var onlyJa = document.getElementById("lr_lang_1ja");
    if (onlyJa) {
        a = onlyJa.querySelector("a");
        if (a) {
            href = a.getAttribute("href");
            href = href.replace("lr=lang_ja", "lr=-lang_ja");
        } else {
            href = getAllLangLocation() + "&lr=-lang_ja";
        }
        onlyJa.parentNode.insertBefore(createLink(href, "日本語以外のページを検索"), onlyJa.nextSibling);
    }
    
    var notJa = document.getElementById("lr_-lang_1ja");
    if (notJa) {
        a = notJa.querySelector("a");
        if (a) {
            href = a.getAttribute("href");
            href = href.replace("lr=-lang_ja", "lr=lang_ja");
        } else {
            href = getAllLangLocation() + "&lr=lang_ja";
        }
        notJa.parentNode.insertBefore(createLink(href, "日本語のページを検索"), notJa);
        notJa.textContent = "日本語以外のページを検索";
        document.querySelectorAll("#hdtbMenus .mn-hd-txt")[0].textContent = "日本語以外のページを検索";
    }
}

function createLink(href, label) {
    var li = document.createElement("li");
    li.setAttribute("class","hdtbItm");

    var a= document.createElement("a");
    a.setAttribute("class", "q qs");
    a.setAttribute("href", href);
    a.textContent = label;
    
    li.appendChild(a);

    return li;
}

createNonJapanese();

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation) {
        if (mutation.target.id === "hdtbMenus") {
            createNonJapanese();
        }
    });
});

var target = document.body;
observer.observe(target, { childList: true , subtree: true});
