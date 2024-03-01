// 应用该设置之后，需要到Clash Verge的设置-Clash字段中，将显示有叹号的字段勾选后保存，接着重启应用确保设置生效
function main(content) {
  // GitHub加速前缀
  const githubPrefix = 'https://mirror.ghproxy.com/'

  // GEO数据GitHub资源原始下载地址
  const rawGeoxURLs = {
    geoip: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat',
    geosite: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
    mmdb: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
  }

  // 生成带有加速前缀的GEO数据资源对象
  const accelURLs = Object.fromEntries(
    Object.entries(rawGeoxURLs).map(([key, githubUrl]) => [key, `${githubPrefix}${githubUrl}`]),
  )

  const otherSettings = {
    'unified-delay': false,
    'tcp-concurrent': true,
    'geodata-mode': true,
    'geox-url': accelURLs,
    'profile': {
      'store-selected': true,
      'store-fake-ip': true,
    },
  }
  return Object.assign(otherSettings, content)
}
