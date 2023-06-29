// Clash Verge使用function main这一行作为开头
// Clash for Windows使用module.exports这一行作为开头

function main(content) {
// module.exports.parse = ({ content }) => {
  const groups = content['proxy-groups']
  const adobeGroup = {
    name: '🖼️ Adobe拦截',
    type: 'select',
    proxies: ['REJECT', 'DIRECT'],
  }
  const adobeRules = ['DOMAIN-SUFFIX,adobe.io,🖼️ Adobe拦截']
  if (groups.length > 1) {
    groups.splice(1, 0, adobeGroup)
  }
  content.rules = [...adobeRules, ...content.rules]

  // 额外的DNS设置
  const extraDNS = {
    'default-nameserver': ['223.5.5.5', '223.6.6.6', '119.29.29.29'],
    'nameserver': [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query',
      'https://doh.opendns.com/dns-query',
    ],
    'fallback': ['1.1.1.1', '208.67.222.222'],
  }

  content.dns = content.dns ? { ...content.dns, ...extraDNS } : extraDNS

  return content
}
