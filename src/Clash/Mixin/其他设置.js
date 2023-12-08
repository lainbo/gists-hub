// 应用该设置之后，需要到Clash Verge的设置-Clash字段中，将显示有叹号的字段勾选后保存，接着重启应用确保设置生效
function main(content) {
  const otherSettings = {
    'unified-delay': false,
    'tcp-concurrent': true,
    'geodata-mode': true,
    'geox-url': {
      geoip: 'https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.dat',
      geosite: 'https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
      mmdb: 'https://mirror.ghproxy.com/https://github.com/Hackl0us/GeoIP2-CN/raw/release/Country.mmdb',
    },
    'profile': {
      'store-selected': true,
      'store-fake-ip': true,
    },
  }
  return Object.assign(otherSettings, content)
}
