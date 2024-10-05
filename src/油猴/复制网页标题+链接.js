// ==UserScript==
// @name         share-link-copy
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  快捷复制便于分享的页面标题和URL，支持自定义快捷键，支持设置是否保留URL参数
// @license      MIT
// @author       Lainbo
// @match        *://*/*
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMTAgMTM0aDc3NXY1ODNIMTEweiIvPjxwYXRoIGQ9Ik02MjUgNjg0LjhjMjcuNSAwIDUxLTkuOCA3MC42LTI5LjMgMTkuNi0xOS42IDI5LjQtNDMuMSAyOS4zLTcwLjcgMC0yNy41LTkuOC01MS4xLTI5LjMtNzAuNi0xOS41LTE5LjUtNDMuMS0yOS4zLTcwLjYtMjkuNC0xMi41IDAtMjQuNCAyLjMtMzUuNiA2LjktMTEuMiA0LjYtMjEuNCAxMC42LTMwLjYgMTguMUw0MjUgNDQyLjN2LTE1bDEzMy44LTY3LjVjOS4yIDcuNSAxOS40IDEzLjUgMzAuNiAxOC4xczIzLjEgNi45IDM1LjYgNi45YzI3LjUgMCA1MS05LjggNzAuNi0yOS40IDE5LjYtMTkuNiAyOS40LTQzLjEgMjkuMy03MC42IDAtMjcuNS05LjgtNTEuMS0yOS4zLTcwLjYtMTkuNS0xOS41LTQzLjEtMjkuMy03MC42LTI5LjQtMjcuNi0uMS01MS4xIDkuNy03MC42IDI5LjQtMTkuNSAxOS43LTI5LjMgNDMuMi0yOS40IDcwLjZ2Ny41bC0xMzMuOCA2Ny41Yy05LjItNy41LTE5LjQtMTMuNi0zMC42LTE4LjFzLTIzLjEtNi45LTM1LjYtNi45Yy0yNy41IDAtNTEgOS44LTcwLjYgMjkuNC0xOS42IDE5LjYtMjkuNCA0My4xLTI5LjQgNzAuNiAwIDI3LjUgOS44IDUxIDI5LjQgNzAuNiAxOS42IDE5LjYgNDMuMiAyOS40IDcwLjYgMjkuMyAxMi41IDAgMjQuNC0yLjMgMzUuNi02LjggMTEuMy00LjYgMjEuNS0xMC42IDMwLjYtMTguMUw1MjUgNTc3LjN2Ny41YzAgMjcuNSA5LjggNTEgMjkuNCA3MC43IDE5LjYgMTkuNiA0My4xIDI5LjQgNzAuNiAyOS4zbS00MjUgMTUwbC0xMTUgMTE1Yy0xNS44IDE1LjgtMzQgMTkuNC01NC40IDEwLjZDMTAuMiA5NTEuOCAwIDkzNi4xIDAgOTEzLjZWMTM0LjhjMC0yNy41IDkuOC01MSAyOS40LTcwLjZTNzIuNSAzNC45IDEwMCAzNC44aDgwMGMyNy41IDAgNTEuMSA5LjggNzAuNiAyOS40IDE5LjYgMTkuNiAyOS40IDQzLjEgMjkuNCA3MC42djYwMGMwIDI3LjUtOS44IDUxLjEtMjkuNCA3MC42LTE5LjYgMTkuNi00My4xIDI5LjQtNzAuNiAyOS40SDIwMHoiIGZpbGw9IiMxNjVkZmYiLz48L3N2Zz4=
// @downloadURL https://update.greasyfork.org/scripts/511569/share-link-copy.user.js
// @updateURL https://update.greasyfork.org/scripts/511569/share-link-copy.meta.js
// ==/UserScript==

(function () {
  'use strict'

  // 创建Trusted Types策略
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy('default', {
      createHTML: string => string,
    })
  }

  GM_addStyle(`
    .els-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #2da44e;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      z-index: 9999;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;
    }
    .modal-content {
      background-color: #f6f8fa;
      padding: 24px;
      border-radius: 6px;
      width: 460px;
      box-shadow: 0 8px 24px rgba(140,149,159,0.2);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .modal-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #24292f;
    }
    .modal-description {
      font-size: 14px;
      color: #57606a;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    .modal-content input[type="text"], .modal-content textarea {
      width: 100%;
      margin-bottom: 16px;
      padding: 5px 12px;
      font-size: 14px;
      line-height: 20px;
      color: #24292f;
      vertical-align: middle;
      background-color: #ffffff;
      background-repeat: no-repeat;
      background-position: right 8px center;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      box-shadow: inset 0 1px 0 rgba(208,215,222,0.2);
      box-sizing: border-box;
    }
    .modal-content textarea {
      height: 100px;
      resize: vertical;
    }
    .modal-content button {
      color: #ffffff;
      background-color: #2da44e;
      padding: 5px 16px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      border: 1px solid;
      border-radius: 6px;
      appearance: none;
      user-select: none;
      margin-left: 8px;
    }
    .modal-content button.cancel {
      color: #24292f;
      background-color: #f6f8fa;
      border-color: rgba(27,31,36,0.15);
    }
    .modal-content button:hover {
      background-color: #2c974b;
    }
    .modal-content button.cancel:hover {
      background-color: #f3f4f6;
    }
    .modal-hint {
      font-size: 10px;
      color: #57606a;
      line-height: 1.1;
      font-style: italic;
      margin: 0;
      user-select: none;
    }
    #els-domains {
      resize: none;
      margin-top: 12px;
    }
    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
    .modal-checkbox-container {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    .modal-checkbox-container input[type="checkbox"] {
      margin-right: 8px;
      width: auto;
    }
    .modal-checkbox-container label {
      font-size: 14px;
      color: #24292f;
      user-select: none;
    }
    .modal-content input[type="text"]:focus, .modal-content textarea:focus {
      outline: none;
      border-color: #0969da;
      box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
    }
  `)

  // 从存储中获取保留参数的域名列表，如果没有则使用默认值
  let domainsToKeepParams = GM_getValue('domainsToKeepParams', ['youtube.com', 'google.com'])

  // 获取保存的快捷键，默认为 'alt+c'
  let shortcut = GM_getValue('easyLinkShareShortcut', 'alt+c')
  // 获取保存的 Markdown 格式快捷键，默认为 'alt+shift+c'
  let markdownShortcut = GM_getValue('easyLinkShareMarkdownShortcut', 'alt+shift+c')

  // 添加新的 GM_getValue 调用来获取列表模式
  let isBlacklistMode = GM_getValue('isBlacklistMode', false)

  // 用来跟踪模态框是否打开
  let isModalOpen = false

  // 修改 URL 处理函数
  function processUrl(url, domainsToKeepParams) {
    const urlObj = new URL(url)
    const domain = urlObj.hostname
    // 域名在列表中
    const isInList = domainsToKeepParams.some(d => domain.endsWith(d))

    if (isBlacklistMode) {
      // 黑名单模式：如果域名在列表中，则移除参数
      if (isInList) {
        urlObj.search = ''
      }
    }
    else {
      // 白名单模式：如果域名不在列表中，则移除参数
      if (!isInList) {
        urlObj.search = ''
      }
    }

    return urlObj.toString()
  }

  // 创建通知功能
  function createNotification() {
    return function showNotification(message) {
      const notification = document.createElement('div')
      notification.className = 'els-notification'
      notification.textContent = message
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.style.opacity = '1'
      }, 10)

      setTimeout(() => {
        notification.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 3000)
    }
  }

  const showNotification = createNotification()

  // 复制链接的主要函数
  function copyLink(isMarkdown = false) {
    const title = document.title
    const url = processUrl(window.location.href, domainsToKeepParams)
    const text = isMarkdown ? `[${title}](${url})` : `${title}\n${url}`

    GM_setClipboard(text, 'text')
    showNotification(isMarkdown ? 'Markdown 格式链接已复制到剪贴板！' : '链接已复制到剪贴板！')
  }

  // 解析快捷键字符串
  function parseShortcut(shortcutStr) {
    const parts = shortcutStr.toLowerCase().split('+')
    return {
      altKey: parts.includes('alt'),
      ctrlKey: parts.includes('ctrl') || parts.includes('control'),
      shiftKey: parts.includes('shift'),
      metaKey: parts.includes('meta') || parts.includes('win'),
      keys: parts.filter(part => !['alt', 'ctrl', 'control', 'shift', 'meta', 'win'].includes(part)),
    }
  }

  // 修改设置界面创建函数
  function createSettingsUI(options) {
    const { shortcut, markdownShortcut, domainsToKeepParams, isBlacklistMode, onSave } = options

    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-title">设置</div>
          <div class="modal-description">设置快捷键组合以快速复制页面标题和链接。按 ESC 键撤销更改。</div>
          <input type="text" id="els-shortcut" placeholder="按下快捷键组合" value="${shortcut}" readonly>
          <div class="modal-description">设置快捷键组合以复制 Markdown 格式的链接：</div>
          <input type="text" id="els-markdown-shortcut" placeholder="按下快捷键组合" value="${markdownShortcut}" readonly>
          <div class="modal-description">参数去除模式：</div>
          <div class="modal-checkbox-container">
            <input type="checkbox" id="els-blacklist-mode" ${isBlacklistMode ? 'checked' : ''}>
            <label for="els-blacklist-mode">黑名单模式（勾选后，列表中的域名复制时将不保留参数）</label>
          </div>
          <div class="modal-description" id="els-domains-description">设置需要${isBlacklistMode ? '移除' : '保留'}参数的域名（每行一个）：</div>
          <div class="modal-hint" id="els-domains-hint">当前为${isBlacklistMode ? '黑名单' : '白名单'}模式。${isBlacklistMode ? '列表中的域名将不保留参数，其他域名将保留参数。' : '列表中的域名将保留参数，其他域名将不保留参数。'}</div>
          <textarea id="els-domains">${domainsToKeepParams.join('\n')}</textarea>
          <div class="modal-buttons">
           <button id="els-cancel" class="cancel">取消</button>
           <button id="els-save">保存</button>
          </div>
        </div>
      </div>
    `

    const modalContainer = document.createElement('div')
    if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
      modalContainer.innerHTML = window.trustedTypes.defaultPolicy.createHTML(modalHTML)
    }
    else {
      modalContainer.innerHTML = modalHTML
    }
    document.body.appendChild(modalContainer)

    const markdownShortcutInput = document.getElementById('els-markdown-shortcut')
    const shortcutInput = document.getElementById('els-shortcut')
    const domainsTextarea = document.getElementById('els-domains')
    let listeningForShortcut = false
    let currentShortcut = []
    let currentMarkdownShortcut = []
    let listeningForMarkdownShortcut = false

    function resetShortcut() {
      shortcutInput.value = shortcut
      currentShortcut = shortcut.split('+')
      listeningForShortcut = false
    }

    function resetMarkdownShortcut() {
      markdownShortcutInput.value = markdownShortcut
      currentMarkdownShortcut = markdownShortcut.split('+')
      listeningForMarkdownShortcut = false
    }

    function closeSettings() {
      modalContainer.remove()
      document.removeEventListener('keydown', escapeHandler)
      isModalOpen = false
    }

    function escapeHandler(e) {
      if (e.key === 'Escape') {
        resetShortcut()
        resetMarkdownShortcut()
        domainsTextarea.value = domainsToKeepParams.join('\n')
      }
    }

    document.addEventListener('keydown', escapeHandler)

    shortcutInput.addEventListener('focus', () => {
      if (listeningForMarkdownShortcut) {
        resetMarkdownShortcut()
      }
      listeningForShortcut = true
      currentShortcut = []
      shortcutInput.value = '按下快捷键组合...'
    })

    markdownShortcutInput.addEventListener('focus', () => {
      if (listeningForShortcut) {
        resetShortcut()
      }
      listeningForMarkdownShortcut = true
      currentMarkdownShortcut = []
      markdownShortcutInput.value = '按下快捷键组合...'
    })

    document.addEventListener('keydown', (e) => {
      if (listeningForShortcut || listeningForMarkdownShortcut) {
        e.preventDefault()
        if (e.key === 'Escape') {
          listeningForShortcut ? resetShortcut() : resetMarkdownShortcut()
          return
        }
        const key = e.key.toLowerCase()
        const currentArray = listeningForShortcut ? currentShortcut : currentMarkdownShortcut
        const inputElement = listeningForShortcut ? shortcutInput : markdownShortcutInput

        if (['alt', 'control', 'shift', 'meta'].includes(key)) {
          if (!currentArray.includes(key)) {
            currentArray.push(key)
          }
        }
        else {
          if (!currentArray.includes(key)) {
            currentArray.push(key)
          }
          listeningForShortcut = false
          listeningForMarkdownShortcut = false
        }
        inputElement.value = currentArray.join('+')
      }
    })

    document.addEventListener('keyup', (e) => {
      if ((listeningForShortcut || listeningForMarkdownShortcut) && ['alt', 'control', 'shift', 'meta'].includes(e.key.toLowerCase())) {
        listeningForShortcut = false
        listeningForMarkdownShortcut = false
      }
    })

    const blacklistModeCheckbox = document.getElementById('els-blacklist-mode')
    const domainsDescription = document.getElementById('els-domains-description')
    const domainsHint = document.getElementById('els-domains-hint')

    blacklistModeCheckbox.addEventListener('change', (e) => {
      const isBlacklist = e.target.checked
      domainsDescription.textContent = `设置需要${isBlacklist ? '移除' : '保留'}参数的域名（每行一个）：`
      domainsHint.textContent = `当前为${isBlacklist ? '黑名单' : '白名单'}模式。${isBlacklist ? '列表中的域名将不保留参数，其他域名将保留参数。' : '列表中的域名将保留参数，其他域名将不保留参数。'}`
    })

    document.getElementById('els-save').addEventListener('click', () => {
      const newShortcut = shortcutInput.value
      const newMarkdownShortcut = markdownShortcutInput.value
      const newDomains = domainsTextarea.value.split('\n').filter(d => d.trim() !== '')
      const newIsBlacklistMode = blacklistModeCheckbox.checked

      onSave({
        shortcut: newShortcut,
        markdownShortcut: newMarkdownShortcut,
        domainsToKeepParams: newDomains,
        isBlacklistMode: newIsBlacklistMode,
      })

      closeSettings()
    })

    document.getElementById('els-cancel').addEventListener('click', closeSettings)

    return closeSettings
  }

  // 修改打开设置界面函数
  function openSettings() {
    isModalOpen = true
    createSettingsUI({
      shortcut,
      markdownShortcut,
      domainsToKeepParams,
      isBlacklistMode,
      onSave: (newSettings) => {
        shortcut = newSettings.shortcut
        markdownShortcut = newSettings.markdownShortcut
        domainsToKeepParams = newSettings.domainsToKeepParams
        isBlacklistMode = newSettings.isBlacklistMode
        GM_setValue('easyLinkShareShortcut', shortcut)
        GM_setValue('easyLinkShareMarkdownShortcut', markdownShortcut)
        GM_setValue('domainsToKeepParams', domainsToKeepParams)
        GM_setValue('isBlacklistMode', isBlacklistMode)
        isModalOpen = false
      },
    })
  }

  // 修改快捷键监听
  document.addEventListener('keydown', (e) => {
    // 如果模态框打开，不响应复制快捷键
    if (isModalOpen) { return }

    const normalShortcut = parseShortcut(shortcut)
    const mdShortcut = parseShortcut(markdownShortcut)

    if (e.altKey === normalShortcut.altKey
          && e.ctrlKey === normalShortcut.ctrlKey
          && e.shiftKey === normalShortcut.shiftKey
          && e.metaKey === normalShortcut.metaKey
          && normalShortcut.keys.every(key => e.key.toLowerCase() === key)) {
      e.preventDefault()
      copyLink(false)
    }
    else if (e.altKey === mdShortcut.altKey
          && e.ctrlKey === mdShortcut.ctrlKey
          && e.shiftKey === mdShortcut.shiftKey
          && e.metaKey === mdShortcut.metaKey
          && mdShortcut.keys.every(key => e.key.toLowerCase() === key)) {
      e.preventDefault()
      copyLink(true)
    }
  })

  // 注册油猴菜单命令
  GM_registerMenuCommand('设置', openSettings)
})()
