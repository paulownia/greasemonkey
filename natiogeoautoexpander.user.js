// ==UserScript==
// @name           NatioGeoAutoExpander
// @namespace      paulownia.jp
// @description    ナショジオの記事の続きを自動的に表示する
// @include        http://www.nationalgeographic.co.jp/news/news_article.php?file_id=*
// ==/UserScript==

window.addEventListener("load", function(){
    if (switchDisp) {
        switchDisp(1); 
    }
});

