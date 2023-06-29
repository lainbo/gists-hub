// Clash Verge使用function main这一行作为开头
// Clash for Windows使用module.exports这一行作为开头

function main(content) {
// module.exports.parse = ({ content }) => {
  // 只要包含了以下关键字的节点
  const mustHaveKeywords = ['美国', '美國', 'United States', 'USA']
  // 过滤掉美国节点中，包含以下关键字的节点（低质量节点）,每一项均为正则，忽略大小写
  const mustNotHaveKeywords = ['实验性', '0\\.', 'b']

  // 生成符合上述规则的正则
  const regexParts = []
  mustHaveKeywords.forEach(keyword => {
    const mustNotHavePart = mustNotHaveKeywords
      .map(k => `(?!.*${k})`)
      .join('')
    regexParts.push(`(?=.*${keyword}${mustNotHavePart}).*`)
  })
  const gptNodeRegex = new RegExp(`^(${regexParts.join('|')})$`, 'i')

  const gptGroupName = '🖥️ ChatGPT'
  const adobeGroupName = '🛑 Adobe拦截'

  // utils function: 返回补全了分组名的rulesBase数组
  const rulesArrCompletion = (rulesBase = [], groupName = '') => {
    return rulesBase.map(i => `${i},${groupName}`)
  }

  // Chat GPT相关规则
  const gptRulesBase = [
    'DOMAIN-KEYWORD,cloudflare',
    'DOMAIN-KEYWORD,openai',
    'DOMAIN-KEYWORD,sentry',
    'DOMAIN-SUFFIX,ai.com',
    'DOMAIN-SUFFIX,auth0.com',
    'DOMAIN-SUFFIX,challenges.cloudflare.com',
    'DOMAIN-SUFFIX,client-api.arkoselabs.com',
    'DOMAIN-SUFFIX,events.statsigapi.net',
    'DOMAIN-SUFFIX,featuregates.org',
    'DOMAIN-SUFFIX,identrust.com',
    'DOMAIN-SUFFIX,intercom.io',
    'DOMAIN-SUFFIX,intercomcdn.com',
    'DOMAIN-SUFFIX,openai.com',
    'DOMAIN-SUFFIX,openaiapi-site.azureedge.net',
    'DOMAIN-SUFFIX,sentry.io',
    'DOMAIN-SUFFIX,stripe.com',
  ]

  const gptRules = rulesArrCompletion(gptRulesBase, gptGroupName)
  const gptProxies = (content.proxies || [])
    .filter(i => gptNodeRegex.test(i.name))
    .map(i => i.name)
  const gptGroup = {
    name: gptGroupName,
    type: 'select',
    proxies: gptProxies,
  }

  // Adobe相关规则
  const adobeRulesBase = ['DOMAIN-SUFFIX,adobe.io']
  const adobeRules = rulesArrCompletion(adobeRulesBase, adobeGroupName)
  const adobeGroup = {
    name: adobeGroupName,
    type: 'select',
    proxies: ['REJECT'],
  }

  // 合并生成的规则
  // 因为Clash读取规则是从前往后，所以要把content.rules放最后合并，以保证自定义规则覆盖默认规则
  const extraRules = [...gptRules, ...adobeRules]
  content.rules = content.rules?.length ? extraRules.concat(content.rules) : extraRules

  // 合并分组
  const groups = content?.['proxy-groups'] || []
  if (groups?.length > 1) {
    groups.splice(1, 0, gptGroup, adobeGroup)
  }

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
