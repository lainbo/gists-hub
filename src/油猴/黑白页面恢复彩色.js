// ==UserScript==
// @name        黑白页面恢复彩色
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 2022/12/1 14:26:18
// ==/UserScript==

(function () {
  const css = 'html,body,[class*="gray"]{filter:none!important}'
  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css)
  }
  else {
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(css));
    (document.querySelector('head') || document.documentElement).appendChild(
      styleNode,
    )
  }
})()
