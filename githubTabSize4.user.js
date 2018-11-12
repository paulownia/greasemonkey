// ==UserScript==
// @name         githubTabSize4
// @namespace    tag:nullpon.moe,2018-11-07:greasemonkey
// @version      0.2
// @description  change tab-size 4 on github
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

function fixAttribute() {
  'use strict';
  const url = new URL(location.href);
  if (url.searchParams.has('ts')) {
    return;
  }

  const ts = document.getElementsByClassName('tab-size');
  if (ts.length === 0) {
    return;
  }

  for (const i of ts) {
    i.setAttribute('data-tab-size', 4);
  }
  // url.searchParams.set('ts', 4);
  // history.replaceState(history.state, window.title, url.toString());
}

fixAttribute();
new MutationObserver(fixAttribute).observe(document.body, {childList: true});


