// ==UserScript==
// @name 全局鸿蒙黑体
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  修改为鸿蒙字体
// @license      MIT
// @author       Lainbo
// @grant        GM_addStyle
// @match        *://*/*
// @run-at       document-start
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABLxJREFUeF7tmleoXUUYhb+oMWpUMKA+WMBgUFAUe4+mvPlkLEQiKIm9hIjdN1+s0YQU06xgQ2N58sluYi8oCoqi2B4UUTCxxCQmrLhvuB7m3+f/9569j7nnDBwu3PPPzFrr7LPOzJoZRZ+3UX3On4EAgyegzxUYfAX6/AHoqQluMsRv9alsdbJhhM8CnjIEOBtY2daT2SsB3gBOMEi+CZw4kgXYB/i+C8F9gR/aEKEXT8Bc4Jou5O4Grh2pAvwDXc1XBrndSBTgzIDBySifblqEtr8Cq4CTnKRWAyc7ayuXtSnAfsC3QaT7A98F+4TK2xTgLsPY3isQH51ALsO8LsQoWNymABuA7RP4Li7+tzzx3kZghyCnUHlbAkwzDE2/CEMEJVDK+WWcz4RYBYrbEuB1w9CWApcVeJcAlyawyzhPCXAKlbYhwAHAVwaqI4EPi/eOAD4w6sYDX4eYOYvbEOBOw8jeAY7rwPk2cGwCuwz0eienUFkbAqw3jOxC4P4OtLOA+xIM5A+jQ8ycxU0LcIZhYCK0EyCXH970K/GXIZiM9FknL3dZ0wK8CkxMoLkXuMJAuRi4PPHea8CpbmbOwiYFOBD4wsBxVInhyRjfN/pNAL50cnOVNSnA7cANCRRvlYQhQ+UKRY5P9L0DuNHFzFnUpADrgB0TOGR0D3TBNzNhkOryNzDGyc1V1pQAyvWeTCCQKLsXRMoASrjfDLLnlOSJLtLDi5oS4BXDsBYCs50oFwBXJWplrKc5x+ha1oQABwGfGTNrkfNuV1T/FhwDaLGUagcDnzvHKS1rQoDbDKOqEnBYAYoM9qb/qwBayKSM6iJjlVfGQ6vFFYaXaCFVu+V+AqYDjydQ/QmMK1Z5EdAi+Quwc6LTucATkcFStbkFeNkwqEWGoXnwyzivTBTKaCd5BiirySnAIcAnxmRa1GinV6Vpx6jFU6odCnxaZdChPjkFsFZ+OQINK1CpvTLMKcAfxndVKc+yOp8ScAmg9KizyVt2qTN2LgFmAI8kgPwO7A3ob502FvgR0N/Odh7waNXBcwnwIjA5AUI5X2prWwWvttBD+eHw/i8BU6oMqD45BDgM+MgAoFMgHYXnaDoy12Iq1Q4HPq4ySQ4BPKe9VbBF+lQ+Ta4rgPqvrWtEEaZGrQx4V8C6dmNOUVeA84GHMhDIMcQFwMPRgeoK8EIdA4qC7VIvI54aHbOOAGXZXRRHrvqyrDE5Rx0B5gFzciHPNM584OrIWFUF0IHmr4XxdM53j+MOUARjqlZzpIjKkPcAdO7galUFsEJLTdrGDS9dnPjGYOgJXbd2rSqAlfnl2Pi4PrkiLlNs1tlCmWEVAcqyOh2FPedlULNOgchjxhju7LGKAFZAocg7S0wVEMZa+LgDmKgAIvgTsFsCpMLQmwPgc5Ra54hrgL08EVxUAN3nsfb2ewI/52AVGKPs/FEZQure0X+GjwpgJTOVVmEBomWl2olqR9rZXIYcEUC5ng4tU+104PlMhKLDaA/woNFJN9KtPHFLl4gAViCh75vO+3rZLDPsGsh4BVAUVXZ7+5Zesi8OXLQAU0aorbFeiuH0urUskvMK0GN+zU0/EKA5bbeNkQdPwLbxOTWHsu+fgM2bZLZBKTYnVwAAAABJRU5ErkJggg==
// ==/UserScript==

;(function () {
  let css = ''
  css += `
  /* 字体设定 */
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: 'HarmonyOS Sans SC', 'Source Han Sans SC', 'Noto Sans CJK SC',
      'HanHei SC', '方正兰亭黑_GB18030', '方正兰亭黑_GBK', system-ui,
      -apple-system, ui-sans-serif, sans-serif, 'Apple Color Emoji',
      'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji', emoji;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: 'Source Han Mono SC', 'Noto Sans Mono CJK SC', 'JetBrainsMono NFM', 'Twemoji Mozilla',
      'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace, monospace,
      'Apple Color Emoji', 'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji',
      emoji;
  }

  button,
  input,
  keygen,
  optgroup,
  select,
  textarea {
    font-family: inherit;
  }

  html:lang(zh) body,
  html:lang(zh-CN) body,
  html:lang(zh-SG) body,
  html:lang(zh-Hans) body,
  html:lang(cmn) body,
  html:lang(cmn-Hans) body,
  html:lang(zh-cmn-Hans) body {
    font-family: 'HarmonyOS Sans SC', 'Source Han Sans SC', 'Noto Sans CJK SC',
      'HanHei SC', '方正兰亭黑_GB18030', '方正兰亭黑_GBK', system-ui,
      -apple-system, ui-sans-serif, sans-serif, 'Apple Color Emoji',
      'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji', emoji;
    quotes: '“' '”';
  }
  html:lang(zh) pre,
  html:lang(zh) code,
  html:lang(zh) kbd,
  html:lang(zh) samp,
  html:lang(zh-CN) pre,
  html:lang(zh-CN) code,
  html:lang(zh-CN) kbd,
  html:lang(zh-CN) samp,
  html:lang(zh-SG) pre,
  html:lang(zh-SG) code,
  html:lang(zh-SG) kbd,
  html:lang(zh-SG) samp,
  html:lang(zh-Hans) pre,
  html:lang(zh-Hans) code,
  html:lang(zh-Hans) kbd,
  html:lang(zh-Hans) samp,
  html:lang(cmn) pre,
  html:lang(cmn) code,
  html:lang(cmn) kbd,
  html:lang(cmn) samp,
  html:lang(cmn-Hans) pre,
  html:lang(cmn-Hans) code,
  html:lang(cmn-Hans) kbd,
  html:lang(cmn-Hans) samp,
  html:lang(zh-cmn-Hans) pre,
  html:lang(zh-cmn-Hans) code,
  html:lang(zh-cmn-Hans) kbd,
  html:lang(zh-cmn-Hans) samp {
    font-family: 'Source Han Mono SC', 'Noto Sans Mono CJK SC', 'JetBrainsMono NFM', 'Twemoji Mozilla',
      'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace, monospace,
      'Apple Color Emoji', 'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji',
      emoji;
  }
  html:lang(zh-TW) body,
  html:lang(zh-Hant) body,
  html:lang(cmn-Hant) body,
  html:lang(zh-cmn-Hant) body {
    font-family: 'HarmonyOS Sans TC', 'Source Han Sans TC', 'Noto Sans CJK TC',
      'HanHei TC', system-ui, -apple-system, ui-sans-serif, sans-serif,
      'Apple Color Emoji', 'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji',
      emoji;
    quotes: '「' '」';
  }
  html:lang(zh-TW) pre,
  html:lang(zh-TW) code,
  html:lang(zh-TW) kbd,
  html:lang(zh-TW) samp,
  html:lang(zh-Hant) pre,
  html:lang(zh-Hant) code,
  html:lang(zh-Hant) kbd,
  html:lang(zh-Hant) samp,
  html:lang(cmn-Hant) pre,
  html:lang(cmn-Hant) code,
  html:lang(cmn-Hant) kbd,
  html:lang(cmn-Hant) samp,
  html:lang(zh-cmn-Hant) pre,
  html:lang(zh-cmn-Hant) code,
  html:lang(zh-cmn-Hant) kbd,
  html:lang(zh-cmn-Hant) samp {
    font-family: 'Source Han Mono TC', 'Noto Sans Mono CJK TC', 'JetBrainsMono NFM', 'Twemoji Mozilla',
      'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace, monospace,
      'Apple Color Emoji', 'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji',
      emoji;
  }
  html:lang(zh-HK) body,
  html:lang(zh-MO) body,
  html:lang(yue) body,
  html:lang(yue-Hant) body,
  html:lang(zh-yue-Hant) body {
    font-family: 'HarmonyOS Sans TC', 'Source Han Sans HC', 'Noto Sans CJK HC',
      'HarmonyOS Sans TC', 'Source Han Sans TC', 'Noto Sans CJK TC', 'HanHei TC',
      system-ui, -apple-system, ui-sans-serif, sans-serif, 'Apple Color Emoji',
      'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji', emoji;
    quotes: '「' '」';
  }
  html:lang(zh-HK) pre,
  html:lang(zh-HK) code,
  html:lang(zh-HK) kbd,
  html:lang(zh-HK) samp,
  html:lang(zh-MO) pre,
  html:lang(zh-MO) code,
  html:lang(zh-MO) kbd,
  html:lang(zh-MO) samp,
  html:lang(yue) pre,
  html:lang(yue) code,
  html:lang(yue) kbd,
  html:lang(yue) samp,
  html:lang(yue-Hant) pre,
  html:lang(yue-Hant) code,
  html:lang(yue-Hant) kbd,
  html:lang(yue-Hant) samp,
  html:lang(zh-yue-Hant) pre,
  html:lang(zh-yue-Hant) code,
  html:lang(zh-yue-Hant) kbd,
  html:lang(zh-yue-Hant) samp {
    font-family: 'Source Han Mono HC', 'Noto Sans Mono CJK HC',
      'Source Han Mono TC', 'Noto Sans Mono CJK TC', 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Mono',
      'SF Mono', 'Roboto Mono', ui-monospace, monospace, 'Apple Color Emoji',
      'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji', emoji;
  }
  html:lang(de) body,
  html:lang(nl) body,
  html:lang(en) body,
  html:lang(nb) body,
  html:lang(no) body,
  html:lang(is) body,
  html:lang(da) body,
  html:lang(sv) body,
  html:lang(pt) body,
  html:lang(es) body,
  html:lang(fr) body,
  html:lang(it) body,
  html:lang(ro) body,
  html:lang(lv) body,
  html:lang(lt) body,
  html:lang(pl) body,
  html:lang(cs) body,
  html:lang(sk) body,
  html:lang(bs) body,
  html:lang(hr) body,
  html:lang(sr) body,
  html:lang(bg) body,
  html:lang(sl) body,
  html:lang(ru) body,
  html:lang(uk) body,
  html:lang(be) body,
  html:lang(el) body,
  html:lang(hu) body,
  html:lang(et) body,
  html:lang(fi) body,
  html:lang(tr) body,
  html:lang(id) body,
  html:lang(ms) body {
    font-family: 'HarmonyOS Sans', 'Source Sans 3', 'Source Sans Pro', 'Noto Sans',
      'Roboto', ui-sans-serif, sans-serif, 'Apple Color Emoji', 'Twemoji Mozilla',
      'Segoe UI Symbol', 'Noto Color Emoji', emoji;
  }
  html:lang(de) pre,
  html:lang(de) code,
  html:lang(de) kbd,
  html:lang(de) samp,
  html:lang(nl) pre,
  html:lang(nl) code,
  html:lang(nl) kbd,
  html:lang(nl) samp,
  html:lang(en) pre,
  html:lang(en) code,
  html:lang(en) kbd,
  html:lang(en) samp,
  html:lang(nb) pre,
  html:lang(nb) code,
  html:lang(nb) kbd,
  html:lang(nb) samp,
  html:lang(no) pre,
  html:lang(no) code,
  html:lang(no) kbd,
  html:lang(no) samp,
  html:lang(is) pre,
  html:lang(is) code,
  html:lang(is) kbd,
  html:lang(is) samp,
  html:lang(da) pre,
  html:lang(da) code,
  html:lang(da) kbd,
  html:lang(da) samp,
  html:lang(sv) pre,
  html:lang(sv) code,
  html:lang(sv) kbd,
  html:lang(sv) samp,
  html:lang(pt) pre,
  html:lang(pt) code,
  html:lang(pt) kbd,
  html:lang(pt) samp,
  html:lang(es) pre,
  html:lang(es) code,
  html:lang(es) kbd,
  html:lang(es) samp,
  html:lang(fr) pre,
  html:lang(fr) code,
  html:lang(fr) kbd,
  html:lang(fr) samp,
  html:lang(it) pre,
  html:lang(it) code,
  html:lang(it) kbd,
  html:lang(it) samp,
  html:lang(ro) pre,
  html:lang(ro) code,
  html:lang(ro) kbd,
  html:lang(ro) samp,
  html:lang(lv) pre,
  html:lang(lv) code,
  html:lang(lv) kbd,
  html:lang(lv) samp,
  html:lang(lt) pre,
  html:lang(lt) code,
  html:lang(lt) kbd,
  html:lang(lt) samp,
  html:lang(pl) pre,
  html:lang(pl) code,
  html:lang(pl) kbd,
  html:lang(pl) samp,
  html:lang(cs) pre,
  html:lang(cs) code,
  html:lang(cs) kbd,
  html:lang(cs) samp,
  html:lang(sk) pre,
  html:lang(sk) code,
  html:lang(sk) kbd,
  html:lang(sk) samp,
  html:lang(bs) pre,
  html:lang(bs) code,
  html:lang(bs) kbd,
  html:lang(bs) samp,
  html:lang(hr) pre,
  html:lang(hr) code,
  html:lang(hr) kbd,
  html:lang(hr) samp,
  html:lang(sr) pre,
  html:lang(sr) code,
  html:lang(sr) kbd,
  html:lang(sr) samp,
  html:lang(bg) pre,
  html:lang(bg) code,
  html:lang(bg) kbd,
  html:lang(bg) samp,
  html:lang(sl) pre,
  html:lang(sl) code,
  html:lang(sl) kbd,
  html:lang(sl) samp,
  html:lang(ru) pre,
  html:lang(ru) code,
  html:lang(ru) kbd,
  html:lang(ru) samp,
  html:lang(uk) pre,
  html:lang(uk) code,
  html:lang(uk) kbd,
  html:lang(uk) samp,
  html:lang(be) pre,
  html:lang(be) code,
  html:lang(be) kbd,
  html:lang(be) samp,
  html:lang(el) pre,
  html:lang(el) code,
  html:lang(el) kbd,
  html:lang(el) samp,
  html:lang(hu) pre,
  html:lang(hu) code,
  html:lang(hu) kbd,
  html:lang(hu) samp,
  html:lang(et) pre,
  html:lang(et) code,
  html:lang(et) kbd,
  html:lang(et) samp,
  html:lang(fi) pre,
  html:lang(fi) code,
  html:lang(fi) kbd,
  html:lang(fi) samp,
  html:lang(tr) pre,
  html:lang(tr) code,
  html:lang(tr) kbd,
  html:lang(tr) samp,
  html:lang(id) pre,
  html:lang(id) code,
  html:lang(id) kbd,
  html:lang(id) samp,
  html:lang(ms) pre,
  html:lang(ms) code,
  html:lang(ms) kbd,
  html:lang(ms) samp {
    font-family: 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Mono', 'SF Mono', 'Roboto Mono',
      ui-monospace, monospace, 'Apple Color Emoji', 'Twemoji Mozilla',
      'Segoe UI Symbol', 'Noto Color Emoji', emoji;
  }
  html:lang(de) body {
    quotes: '„' '“';
  }
  html:lang(nb) body,
  html:lang(no) body,
  html:lang(es) body {
    quotes: '«' '»';
  }
  html:lang(fr) body {
    quotes: '« ' ' »';
  }
  html:lang(ar) body,
  html:lang(he) body,
  html:lang(th) body,
  html:lang(vi) body {
    font-family: system-ui, -apple-system, ui-sans-serif, sans-serif,
      'Apple Color Emoji', 'Twemoji Mozilla', 'Segoe UI Symbol', 'Noto Color Emoji',
      emoji;
  }
  html:lang(ar) pre,
  html:lang(ar) code,
  html:lang(ar) kbd,
  html:lang(ar) samp,
  html:lang(he) pre,
  html:lang(he) code,
  html:lang(he) kbd,
  html:lang(he) samp,
  html:lang(th) pre,
  html:lang(th) code,
  html:lang(th) kbd,
  html:lang(th) samp,
  html:lang(vi) pre,
  html:lang(vi) code,
  html:lang(vi) kbd,
  html:lang(vi) samp {
    font-family: ui-monospace, monospace, 'Apple Color Emoji', 'Twemoji Mozilla',
      'Segoe UI Symbol', 'Noto Color Emoji', emoji;
  }

  /* 字体替换 */
  @font-face {
    font-family: 'Georgia';
    src: local('Source Serif 4');
  }
  @font-face {
    font-family: 'New York';
    src: local('Source Serif 4');
  }
  @font-face {
    font-family: 'Times';
    src: local('Source Serif 4');
  }
  @font-face {
    font-family: 'Time New Roman';
    src: local('Source Serif 4');
  }
  @font-face {
    font-family: 'Arial';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Calibri';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Helvetica';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Helvetica Neue';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Lucida Sans Unicode';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Microsoft Sans Serif';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Open Sans';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'San Francisco';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Segoe UI';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Tahoma';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Trebuchet';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Trebuchet MS';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Ubuntu';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Verdana';
    src: local('HarmonyOS Sans');
  }
  @font-face {
    font-family: 'Consolas';
    src: local('JetBrainsMono NFM', 'Twemoji Mozilla');
  }
  @font-face {
    font-family: 'Courier';
    src: local('JetBrainsMono NFM', 'Twemoji Mozilla');
  }
  @font-face {
    font-family: 'Courier New';
    src: local('JetBrainsMono NFM', 'Twemoji Mozilla');
  }
  @font-face {
    font-family: 'DejaVu Sans Mono';
    src: local('JetBrainsMono NFM', 'Twemoji Mozilla');
  }
  @font-face {
    font-family: 'Lucida Console';
    src: local('JetBrainsMono NFM', 'Twemoji Mozilla');
  }
  @font-face {
    font-family: 'SF Mono';
    src: local('JetBrainsMono NFM', 'Twemoji Mozilla');
  }
  @font-face {
    font-family: 'Ubuntu Mono';
    src: local('JetBrainsMono NFM', 'Twemoji Mozilla');
  }
  @font-face {
    font-family: 'SimSun';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'SimSun-ExtB';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: '宋体';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'NSimSun';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: '新宋体';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'SimHei';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: '黑体';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'DengXian';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: '等线';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'Microsoft YaHei UI';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'Microsoft YaHei';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: '微软雅黑';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'STHeiti SC';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'PingFang SC';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: '苹方-简';
    src: local('HarmonyOS Sans SC');
  }
  @font-face {
    font-family: 'MingLiU';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'MingLiU-ExtB';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'PMingLiU';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'PMingLiU-ExtB';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'Microsoft JhengHei UI';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'Microsoft JhengHei';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: '微軟正黑體';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'STHeiti TC';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'PingFang TC';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: '蘋方-繁';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'MingLiU_HKSCS';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'MingLiU_HKSCS-ExtB';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: 'PingFang HK';
    src: local('HarmonyOS Sans TC');
  }
  @font-face {
    font-family: '蘋方-港';
    src: local('HarmonyOS Sans TC');
  }
  `

  if (location.hostname === 'baidu.com' || location.hostname.endsWith('.baidu.com')) {
    css += `
      * {
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif;
      }
    `
  }
  if (
    location.hostname === 'element-plus.org'
    || location.hostname.endsWith('.element-plus.org')
  ) {
    css += `
      .doc-content>div .vp-table>table tr td:nth-child(2) {
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
      }
    `
  }
  if (location.hostname === 'mail.qq.com' || location.hostname.endsWith('mail.qq.com')) {
    css += `
      td, input, button, select, body {
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
      }
    `
  }
  if (location.hostname === 'feishu.cn' || location.hostname.endsWith('.feishu.cn')) {
    css += `
      #zh-CN button,
      #zh-CN input,
      #zh-CN select,
      #zh-CN textarea,
      .markdown-body{
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
      }
      .code-block-content,
      .markdown-body code,
      .markdown-body pre{
         font-family: 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Sans Mono CJK SC',
        'Source Code Pro', 'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace,
        monospace, 'Segoe UI Symbol' !important;
      }
    `
  }
  if (location.hostname === 'yuque.com' || location.hostname.endsWith('.yuque.com')) {
    css += `
    .doc-title,
    .ne-engine,
    .ne-viewer-body,
    .ne-toc-view,
    .DocReader-module_title_fXOQi>h1,
    .catalogTreeItem-module_title_snpKw{
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
    }
    .cm-line,
    ne-code-content{
      font-family: 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Sans Mono CJK SC',
        'Source Code Pro', 'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace,
        monospace, 'Segoe UI Symbol' !important;
    }
    `
  }
  if (
    location.hostname === 'bilibili.com'
    || location.hostname.endsWith('.bilibili.com')
  ) {
    css += `
      .lite-room,
      .header-channel,
      .channel-menu-mini,
      .bb-comment,
      .list-item .user .text-con,
      .video-page-card-small .card-box .info .title,
      .video-info-v1 .video-title,
      .carousel-tool,
      .bili-comment.browser-pc *,
      .bili-dyn-content,
      .bili-rich-text,
      .bili-dyn-item,
      .bili-video-card__info--bottom,
      .bili-header,
      .bili-video-card__info--tit,
      .bili-video-card__info--tit a,
      .browser-pc *,
      .video-page-card-small .card-box .info .title,
      .up-info-v1 .up-info_right .name,
      .first-line-title,
      .pl__head,
      .pl__title{
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
      }
    `
  }
  if (location.hostname === 'gitee.com' || location.hostname.endsWith('.gitee.com')) {
    css += `
    .file_holder .file_content.code .lines pre,
    .file_holder .file_content.blame .lines pre {
        font-family: 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Sans Mono CJK SC',
        'Source Code Pro', 'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace,
        monospace, 'Segoe UI Symbol' !important;
      }
    `
  }
  if (location.hostname === 'github.com' || location.hostname.endsWith('.github.com')) {
    css += `
      .text-mono {
        font-family: 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Sans Mono CJK SC',
          'Source Code Pro', 'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace,
          monospace, 'Segoe UI Symbol' !important;
      }
      .blob-num,
      .blob-code-inner {
        font-family: 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Sans Mono CJK SC',
          'Source Code Pro', 'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace,
          monospace, 'Segoe UI Symbol';
      }
      .markdown-body {
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
      }
    `
  }
  if (
    location.hostname === 'greasyfork.org'
    || location.hostname.endsWith('.greasyfork.org')
  ) {
    css += `
      #script_version_code,
      .ace_editor {
        font-family: 'JetBrainsMono NFM', 'Twemoji Mozilla', 'Noto Sans Mono CJK SC',
          'Source Code Pro', 'Noto Mono', 'SF Mono', 'Roboto Mono', ui-monospace,
          monospace,   'Segoe UI Symbol' !important;
      }
    `
  }
  if (location.hostname === 'ithome.com' || location.hostname.endsWith('.ithome.com')) {
    css += `
      .post_comment {
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif;
      }
    `
  }
  if (location.hostname === 'sspai.com' || location.hostname.endsWith('.sspai.com')) {
    css += `
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      .title,
      .content,
      p,
      a {
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
      }
    `
  }

  if (
    new RegExp('^(?:https://www\\.baidu\\.com/(s|#)?.*)$').test(location.href)
    || new RegExp('^(?:https://(\\w+\\.)?bing\\.com/(search)?.*)$').test(location.href)
    || new RegExp('^(?:https://www\\.google(\\.\\w+){1,2}/(search)?.*)$').test(
      location.href,
    )
    || new RegExp('^(?:https://www\\.so\\.com/s?.*)$').test(location.href)
    || new RegExp('^(?:https://(www\\.)?sogou\\.com/(web|sogou)?.*)$').test(location.href)
  ) {
    css += `
      * {
        font-family: 'HarmonyOS Sans SC', 'HarmonyOS', 'Twemoji Mozilla', 'system-ui',
          -apple-system, ui-sans-serif, sans-serif !important;
      }
    `
  }
  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css)
  } else {
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(css))
    ;(document.querySelector('head') || document.documentElement).appendChild(styleNode)
  }
})()
