const inputStr = ENTER.payload.trim()
const ipApiUrl = 'https://ip-api.com'
const fraudUrl = 'https://scamalytics.com'
const ipInfoUrl = 'https://ipinfo.io'
const ipapiIsUrl = 'ipapi.is'

const reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/
if (reg.test(inputStr)) {
  utools.shellOpenExternal(`${ipApiUrl}/#${inputStr}`)
  utools.shellOpenExternal(`${fraudUrl}/ip/${inputStr}`)
  utools.shellOpenExternal(`${ipInfoUrl}/${inputStr}`)
  utools.shellOpenExternal(`https://api.${ipapiIsUrl}/?q=${inputStr}`)
}
else {
  utools.shellOpenExternal(ipApiUrl)
  utools.shellOpenExternal(fraudUrl)
  utools.shellOpenExternal(ipInfoUrl)
  utools.shellOpenExternal(`https://${ipapiIsUrl}`)
}
