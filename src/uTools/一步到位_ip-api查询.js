const url = 'https://ip-api.com/'
const inputStr = ENTER.payload.trim()
const reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/
if (reg.test(inputStr)) {
  utools.shellOpenExternal(`${url}#${inputStr}`)
} else {
  utools.shellOpenExternal(url)
}
