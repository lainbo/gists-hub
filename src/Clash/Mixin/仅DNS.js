// Clash Verge使用function main这一行作为开头
// Clash for Windows使用module.exports这一行作为开头

function main(content) {
  // module.exports.parse = ({ content }) => {
  // 额外的DNS设置
  const extraDNS = {
    'default-nameserver': ['223.5.5.5', '223.6.6.6', '119.29.29.29'],
    'nameserver': [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query',
      'https://cloudflare-dns.com/dns-query',
    ],
    'fallback': ['1.1.1.1', '1.0.0.1', '8.8.8.8'],
  }

  content.dns = content.dns ? { ...content.dns, ...extraDNS } : extraDNS
  return content
}
