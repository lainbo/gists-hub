function main(content) {
  const extraDNS = {
    'nameserver': [
      'https://doh.pub/dns-query',
      'https://dns.alidns.com/dns-query',
    ],
    'nameserver-policy': {
      'geosite:cn,private': [
        'https://223.5.5.5/dns-query',
        'https://1.12.12.12/dns-query',
      ],
    },
  }
  content.dns = content.dns ? { ...content.dns, ...extraDNS } : extraDNS
  return content
}
