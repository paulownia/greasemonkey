// ==UserScript==
// @name         sradForceMobileSite
// @namespace    tag:nullpon.moe,2018-11-07:greasemonkey
// @version      0.1
// @description  redirect to mobile site
// @exclude      https://m.srad.jp/
// @match        https://srad.jp/*
// @match        https://*.srad.jp/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const mobileSite = 'm.srad.jp';

  const url = new URL(location.href);
  if (url.hostname === mobileSite) {
    return;
  }

  const path = url.pathname;
  if (path !== '/' && path.endsWith('/')) {
    url.pathname = path.slice(0, -1);
  }

  url.hostname = mobileSite;
  location.href = url.toString();
})();
