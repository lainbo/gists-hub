// Clash Verge使用function main这一行作为开头
// Clash for Windows使用module.exports这一行作为开头

function main(content) {
  // module.exports.parse = ({ content }) => {
  // 额外的DNS设置
  const extraDNS = {
    nameserver: [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query',
    ],
  }

  content.dns = content.dns ? { ...content.dns, ...extraDNS } : extraDNS
  return content
}
