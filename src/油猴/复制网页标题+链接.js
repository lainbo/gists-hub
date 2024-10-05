// ==UserScript==
// @name         share-link-copy
// @namespace    http://tampermonkey.net/
// @version      1.0.1
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

  // 从存储中获取保留参数的域名列表，如果没有则使用默认值
  let domainsToKeepParams = GM_getValue('domainsToKeepParams', ['youtube.com', 'youtu.be'])

  // 处理URL，根据域名决定是否保留参数
  function processUrl(url) {
    const urlObj = new URL(url)
    const domain = urlObj.hostname

    if (!domainsToKeepParams.some(d => domain.endsWith(d))) {
      urlObj.search = '' // 移除所有参数
    }

    return urlObj.toString()
  }

  // 获取保存的快捷键，默认为 'alt+c'
  let shortcut = GM_getValue('easyLinkShareShortcut', 'alt+c')

  // 创建设置界面
  function createSettingsUI() {
    GM_addStyle(`
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
            z-index: 9999;
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
          .modal-content input, .modal-content textarea {
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
        `)

    const modalHTML = `
        <div class="modal-overlay">
          <div class="modal-content">
            <div class="modal-title">Easy Link Share 设置</div>
            <div class="modal-description">设置快捷键组合以快速复制页面标题和链接。按 ESC 键撤销更改。</div>
            <input type="text" id="els-shortcut" placeholder="按下快捷键组合" value="${shortcut}" readonly>
            <div class="modal-description">设置需要保留参数的域名（每行一个）：</div>
            <div class="modal-hint">下方添加的域名在复制链接时会保留 URL 参数。</div>
            <div class="modal-hint">· 例如：YouTube的url参数形如 ?v=dQw4w9WgXcQ 这样的是有用的，应声明</div>
            <div class="modal-hint">· 又例如：Bilibili的url参数形如 ?spm_id_from=abcd 这样的追踪参数是无用的，不应声明</div>
            <div class="modal-hint">当你需要保留url上的参数时，请在此处添加，默认不会复制参数部分。</div>
            <textarea id="els-domains">${domainsToKeepParams.join('\n')}</textarea>
            <div class="modal-buttons">
             <button id="els-cancel" class="cancel">取消</button>
             <button id="els-save">保存</button>
            </div>
          </div>
        </div>
      `

    const modalContainer = document.createElement('div')
    modalContainer.innerHTML = modalHTML
    document.body.appendChild(modalContainer)

    const shortcutInput = document.getElementById('els-shortcut')
    const domainsTextarea = document.getElementById('els-domains')
    let listeningForShortcut = false
    let currentShortcut = []

    shortcutInput.addEventListener('focus', () => {
      listeningForShortcut = true
      currentShortcut = []
      shortcutInput.value = '按下快捷键组合...'
    })

    function resetShortcut() {
      shortcutInput.value = shortcut
      currentShortcut = shortcut.split('+')
      listeningForShortcut = false
    }

    function closeSettings() {
      modalContainer.remove()
      document.removeEventListener('keydown', escapeHandler)
    }

    function escapeHandler(e) {
      if (e.key === 'Escape') {
        resetShortcut()
        domainsTextarea.value = domainsToKeepParams.join('\n')
      }
    }

    document.addEventListener('keydown', escapeHandler)

    document.addEventListener('keydown', (e) => {
      if (listeningForShortcut) {
        e.preventDefault()
        if (e.key === 'Escape') {
          resetShortcut()
          return
        }
        const key = e.key.toLowerCase()
        if (['alt', 'control', 'shift', 'meta'].includes(key)) {
          if (!currentShortcut.includes(key)) {
            currentShortcut.push(key)
          }
        }
        else {
          if (!currentShortcut.includes(key)) {
            currentShortcut.push(key)
          }
          listeningForShortcut = false
        }
        shortcutInput.value = currentShortcut.join('+')
      }
    })

    document.addEventListener('keyup', (e) => {
      if (listeningForShortcut && ['alt', 'control', 'shift', 'meta'].includes(e.key.toLowerCase())) {
        listeningForShortcut = false
      }
    })

    document.getElementById('els-save').addEventListener('click', () => {
      const newShortcut = shortcutInput.value
      GM_setValue('easyLinkShareShortcut', newShortcut)
      shortcut = newShortcut

      const newDomains = domainsTextarea.value.split('\n').filter(d => d.trim() !== '')
      GM_setValue('domainsToKeepParams', newDomains)
      domainsToKeepParams = newDomains

      closeSettings()
    })

    document.getElementById('els-cancel').addEventListener('click', closeSettings)
  }

  // 添加通知样式
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
      `)

  // 显示通知的函数
  function showNotification(message) {
    const notification = document.createElement('div')
    notification.className = 'els-notification'
    notification.textContent = message
    document.body.appendChild(notification)

    // 使通知可见
    setTimeout(() => {
      notification.style.opacity = '1'
    }, 10)

    // 3秒后隐藏通知
    setTimeout(() => {
      notification.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // 复制链接的主要函数
  function copyLink() {
    const title = document.title
    const url = processUrl(window.location.href)
    const text = `${title}\n${url}`

    GM_setClipboard(text, 'text')
    showNotification('链接已复制到剪贴板！')
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

  // 添加快捷键监听
  document.addEventListener('keydown', (e) => {
    const { altKey, ctrlKey, shiftKey, metaKey, keys } = parseShortcut(shortcut)

    if (e.altKey === altKey
          && e.ctrlKey === ctrlKey
          && e.shiftKey === shiftKey
          && e.metaKey === metaKey
          && keys.every(key => e.key.toLowerCase() === key)) {
      e.preventDefault() // 防止默认行为
      copyLink()
    }
  })

  // 注册油猴菜单命令
  GM_registerMenuCommand('设置', createSettingsUI)
})()
