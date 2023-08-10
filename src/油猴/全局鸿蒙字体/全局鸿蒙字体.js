// ==UserScript==
// @name 全局自定义字体
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  修改为自定义字体
// @license      MIT
// @author       Lainbo
// @grant        GM_addStyle
// @match        *://*/*
// @run-at       document-start
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDE1IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yLjUgNC41QzIuNSAzLjA5OSAzLjU5OSAyIDUgMmg3LjQ5OWEuNS41IDAgMCAxIC4wMDEgMUg4LjY5MmwtLjI4Ny44NTVBMTg4Ny4zOSAxODg3LjM5IDAgMCAxIDcuMzQzIDdIOC41YS41LjUgMCAwIDEgMCAxSDcuMDA0YTI4Ni4xMiAyODYuMTIgMCAwIDEtMS4wNDYgMy4wMzljLS4zMjIuOS0uNzUgMS40NDctMS4yOSAxLjczOWMtLjUwNS4yNzMtMS4wMjYuMjcyLTEuMzg0LjI3MkgzLjI1YS41NS41NSAwIDAgMSAwLTEuMWMuMzkyIDAgLjY1NC0uMDEuODk0LS4xNGMuMjItLjExOS41MTEtLjM5NS43NzgtMS4xNDJjLjE4NS0uNTE3LjUzMi0xLjUyNy45Mi0yLjY2OEg0LjVhLjUuNSAwIDAgMSAwLTFoMS42ODJhMTM1MC4xMTggMTM1MC4xMTggMCAwIDAgMS4xOC0zLjQ5Nkw3LjUzMyAzSDVjLS44NDkgMC0xLjUuNjUxLTEuNSAxLjVhLjUuNSAwIDAgMS0xIDBaIi8+PC9zdmc+
// ==/UserScript==

;(function () {
  let cssContent = '@font-face{font-family:Cus_Emoji;src:local("Twemoji Mozilla"),local("Segoe UI Emoji"),local("Segoe UI Symbol"),local("Apple Color Emoji"),local("Noto Color Emoji");unicode-range:U+1F000-1F644,U+203C-3299}html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}body,html,html:lang(zh) body,html:lang(zh-CN) body,html:lang(zh-SG) body,html:lang(zh-Hans) body,html:lang(cmn) body,html:lang(cmn-Hans) body,html:lang(zh-cmn-Hans) body,html:lang(de) body,html:lang(nl) body,html:lang(en) body,html:lang(nb) body,html:lang(no) body,html:lang(is) body,html:lang(da) body,html:lang(sv) body,html:lang(pt) body,html:lang(es) body,html:lang(fr) body,html:lang(it) body,html:lang(ro) body,html:lang(lv) body,html:lang(lt) body,html:lang(pl) body,html:lang(cs) body,html:lang(sk) body,html:lang(bs) body,html:lang(hr) body,html:lang(sr) body,html:lang(bg) body,html:lang(sl) body,html:lang(ru) body,html:lang(uk) body,html:lang(be) body,html:lang(el) body,html:lang(hu) body,html:lang(et) body,html:lang(fi) body,html:lang(tr) body,html:lang(id) body,html:lang(ms) body{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}html:lang(ja) body{font-family:"HarmonyOS Sans","Noto Sans JP","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}html:lang(ko) body{font-family:"HarmonyOS Sans","Noto Sans KR","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}pre,code,kbd,samp{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}button,input,keygen,optgroup,select,textarea{font-family:inherit}@font-face{font-family:"Microsoft YaHei";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"微软雅黑";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"-apple-system";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"TwitterChirp";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"PingFang SC";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"Helvetica";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}'
  const fuzzyMatchValueOfMap = (mapMain, key) => {
    const foundEntry = Array.from(mapMain.entries()).find(([k, v]) => key.includes(k))
    return foundEntry ? foundEntry[1] : null
  }
  const domainCssMap = new Map([['baidu.com', '*{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}'], ['bilibili.com', '.lite-room,.header-channel,.channel-menu-mini,.bb-comment,.list-item .user .text-con,.video-page-card-small .card-box .info .title,.video-info-v1 .video-title,.carousel-tool,.bili-comment.browser-pc *,.bili-dyn-content,.bili-rich-text,.bili-dyn-item,.bili-video-card__info--bottom,.bili-header,.bili-video-card__info--tit,.bili-video-card__info--tit a,.browser-pc *,.video-page-card-small .card-box .info .title,.up-info-v1 .up-info_right .name,.first-line-title,.pl__head,.pl__title{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['bing.com', 'h1,h2,h3,.b_searchboxForm{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['feishu.cn', '#zh-CN button,#zh-CN input,#zh-CN select,#zh-CN textarea,.markdown-body{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}.code-block-content,.markdown-body code,.markdown-body pre{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['github.com', '.react-code-text{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}#read-only-cursor-text-area,.text-mono{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['google.com', '*,textarea{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}h3,textarea{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['mail.qq.com', 'td,input,button,select,body{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['miit.gov.cn', '*{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['mp.weixin.qq.com', '.wx_wap_page{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['yuque.com', '.doc-title,.ne-engine,.ne-viewer-body,.ne-toc-view,.DocReader-module_title_fXOQi>h1,.catalogTreeItem-module_title_snpKw{font-family:"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}.cm-line,ne-code-content{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}']])
  const domainCss = fuzzyMatchValueOfMap(domainCssMap, window.location.hostname)
  if (domainCss) {
    cssContent += domainCss
  }

  // 通过GM_addStyle添加样式,并且返回是否成功
  function addStyleWithGM(cssText) {
    if (typeof GM_addStyle !== 'undefined') {
      GM_addStyle(cssText)
      return true
    } else {
      return false
    }
  }

  // 通过DOM添加样式
  function addStyleWithDOM(cssText) {
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(cssText));
    (document.querySelector('head') || document.documentElement).appendChild(styleNode)
  }

  // 执行，并且判断是否成功
  const resultsOfEnforcement = addStyleWithGM(cssContent)

  // 如果不成功，则使用DOM方式
  if (!resultsOfEnforcement) {
    addStyleWithDOM(cssContent)
  }
})()
