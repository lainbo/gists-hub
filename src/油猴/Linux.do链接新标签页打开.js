// ==UserScript==
// @name         Linux.do 链接新标签页打开
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  强制让 linux.do 的主题列表链接在新标签页打开
// @author       You
// @match        https://linux.do/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  // 选择器数组
  const selectors = [
    '.topic-list-main-link a.title',
    '.topic-list .main-link a.title',
  ]

  // 检查元素是否匹配我们的选择器
  function isTargetLink(element) {
    return selectors.some((selector) => {
      return element.matches(selector)
    })
  }

  // 使用事件委托处理点击事件
  document.addEventListener('click', (event) => {
    const target = event.target

    // 检查点击的是否是我们要处理的链接
    if (target.tagName === 'A' && isTargetLink(target)) {
      // 阻止默认行为
      event.preventDefault()
      event.stopPropagation()

      // 获取链接地址
      const href = target.href
      if (href) {
        // 在新标签页打开
        window.open(href, '_blank', 'noopener,noreferrer')
      }
    }
  }, true) // 使用捕获阶段，确保在 Discourse 的事件处理器之前执行

  // 额外的处理：直接修改链接的 onclick 事件
  function processLinks() {
    selectors.forEach((selector) => {
      const links = document.querySelectorAll(selector)
      links.forEach((link) => {
        if (!link.hasAttribute('data-processed')) {
          // 移除可能存在的事件监听器
          link.onclick = function (e) {
            e.preventDefault()
            e.stopPropagation()
            window.open(this.href, '_blank', 'noopener,noreferrer')
            return false
          }

          // 标记为已处理
          link.setAttribute('data-processed', 'true')
        }
      })
    })
  }

  // 初始处理
  processLinks()

  // 使用 MutationObserver 监听新增的链接
  const observer = new MutationObserver((mutations) => {
    let shouldProcess = false

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const hasTargetLinks = selectors.some((selector) => {
              return node.matches && node.matches(selector)
                              || node.querySelector && node.querySelector(selector)
            })

            if (hasTargetLinks) {
              shouldProcess = true
            }
          }
        })
      }
    })

    if (shouldProcess) {
      // 延迟处理，确保元素完全加载
      setTimeout(processLinks, 100)
    }
  })

  // 开始观察
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
})()
