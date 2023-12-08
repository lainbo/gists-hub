function main(content) {
  const cnDnsList = [
    'https://223.5.5.5/dns-query',
    'https://1.12.12.12/dns-query',
  ]
  const trustDnsList = [
    'https://dns.google/dns-query',
    'https://1.0.0.1/dns-query',
  ]
  const extraDNS = {
    'enable': true,
    'default-nameserver': cnDnsList, // 用于解析DNS服务器 的域名,必须为IP, 可为加密DNS
    'nameserver-policy': {
      'geosite:cn': cnDnsList,
      'geosite:geolocation-!cn': trustDnsList,
    },
    'nameserver': cnDnsList, // 默认的域名解析服务器，如不配置fallback/proxy-server-nameserver,则所有域名都由nameserver解析
  }
  content.dns = content.dns ? { ...content.dns, ...extraDNS } : extraDNS
  return content
}
