// ==UserScript==
// @name           GoogleNotInJapanese
// @namespace      tag:nullpon.moe,2018-11-07:greasemonkey
// @version        1.2.2
// @grant          none
// @description    add a menu item to display search results excluding pages written in Japanese
// @include        https://www.google.co.jp/search*
// @include        https://www.google.com/search*
// ==/UserScript==
function getAllLangLocation() {
  const allLang = document.getElementById('lr_');
  if (allLang) {
    const a = allLang.querySelector('a');
    if (a) {
      return a.getAttribute('href');
    }
  }
  return location.pathname + location.search.replace(/lr=[^?#&]+?[?#&]/g, '');
}

function createNonJapanese () {
  let href;

  const onlyJa = document.getElementById('lr_lang_1ja');
  if (onlyJa) {
    const a = onlyJa.querySelector('a');
    if (a) {
      href = a.getAttribute('href');
      href = href.replace('lr=lang_ja', 'lr=-lang_ja');
    } else {
      href = getAllLangLocation() + '&lr=-lang_ja';
    }
    onlyJa.parentNode.insertBefore(createLink(href, '日本語以外のページを検索'), onlyJa.nextSibling);
  }

  const notJa = document.getElementById('lr_-lang_1ja');
  if (notJa) {
    const a = notJa.querySelector('a');
    if (a) {
      href = a.getAttribute('href');
      href = href.replace('lr=-lang_ja', 'lr=lang_ja');
    } else {
      href = getAllLangLocation() + '&lr=lang_ja';
    }
    notJa.parentNode.insertBefore(createLink(href, '日本語のページを検索'), notJa);
    notJa.textContent = '日本語以外のページを検索';
    document.querySelectorAll('#hdtbMenus .mn-hd-txt')[0].textContent = '日本語以外のページを検索';
  }
}

function createLink(href, label) {
  const li = document.createElement('li');
  li.setAttribute('class','hdtbItm');

  const a= document.createElement('a');
  a.setAttribute('class', 'q qs');
  a.setAttribute('href', href);
  a.textContent = label;

  li.appendChild(a);

  return li;
}

createNonJapanese();

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.target.id === 'hdtbMenus') {
      createNonJapanese();
    }
  });
});

observer.observe(document.body, { childList: true , subtree: true});
