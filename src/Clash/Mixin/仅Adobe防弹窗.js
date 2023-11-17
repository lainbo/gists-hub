function main(content) {
  const groups = content?.['proxy-groups'] || []
  const adobeGroup = {
    name: '🖼️ Adobe拦截',
    type: 'select',
    proxies: ['REJECT'],
  }
  const adobeRules = ['DOMAIN-SUFFIX,adobe.io,🖼️ Adobe拦截']
  if (groups?.length > 1) {
    groups.splice(1, 0, adobeGroup)
  }
  content.rules = content.rules ? adobeRules.concat(content.rules) : adobeRules

  const extraDNS = {
    nameserver: [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query',
    ],
  }

  content.dns = content.dns ? { ...content.dns, ...extraDNS } : extraDNS
  return content
}
