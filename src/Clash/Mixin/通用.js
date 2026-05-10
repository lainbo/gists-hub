// Clash Verge使用function main这一行作为开头
// Clash for Windows使用module.exports这一行作为开头

function main(content) {
  // Chat GPT分组只留下包含了以下关键字的节点
  const mustHaveKeywordsList = ['美国', '美國', 'United States', 'USA']
  // 过滤掉美国节点中，包含以下关键字的节点（低质量节点）,每一项均为正则，忽略大小写
  const mustNotHaveKeywordsList = ['实验性', '0\\.', 'b']

  // utils function: 返回补全了分组名的rulesBase数组
  const completeGroupName = (rulesBase = [], groupName = '') => {
    return rulesBase.map(rule => `${rule},${groupName}`)
  }

  // utils function: 返回符合规则的正则
  const generateRegExp = (mustHaveKeywords = [], mustNotHaveKeywords = []) => {
    const mustHaveKey = mustHaveKeywords.join('|')
    const mustNotHaveKey = mustNotHaveKeywords.join('|')
    const regExpString = `(?=.*(${mustHaveKey}))(?!.*(${mustNotHaveKey})).*$`
    return new RegExp(regExpString, 'i')
  }

  const gptNodeRegex = generateRegExp(mustHaveKeywordsList, mustNotHaveKeywordsList)

  const gptGroupName = '💬 ChatGPT'
  const adobeGroupName = '🛑 Adobe拦截'

  // Chat GPT规则List
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

  const gptRules = completeGroupName(gptRulesBase, gptGroupName)
  const gptProxies = (content.proxies || [])
    .filter(node => gptNodeRegex.test(node.name))
    .map(node => node.name)
  const gptGroup = {
    name: gptGroupName,
    type: 'select',
    proxies: gptProxies?.length ? gptProxies : ['DIRECT', 'REJECT'],
  }

  // Adobe规则List
  const adobeRulesBase = ['DOMAIN-SUFFIX,adobe.io']
  const adobeRules = completeGroupName(adobeRulesBase, adobeGroupName)
  const adobeGroup = {
    name: adobeGroupName,
    type: 'select',
    proxies: ['REJECT'],
  }

  // 合并生成的规则
  // 因为Clash读取规则是从前往后，所以要把content.rules放最后合并，以保证自定义规则覆盖默认规则
  const extraRules = [...gptRules, ...adobeRules]
  content.rules = content.rules?.length ? extraRules.concat(content.rules) : extraRules

  // 测试延迟的分组类型
  const delayTestTypeList = ['url-test', 'fallback']
  // 延迟测速地址
  const delayTestUrl = 'http://cp.cloudflare.com/generate_204'
  // 合并分组，修改自动测速地址
  const groups = content?.['proxy-groups'] || []
  if (groups?.length > 1) {
    // 合并额外的分组
    groups.splice(1, 0, gptGroup, adobeGroup)

    // 修改自动测速地址
    groups.forEach((groupItem) => {
      if (delayTestTypeList.includes(groupItem.type) && Boolean(groupItem.url)) {
        groupItem.url = delayTestUrl
      }
    })
  }

  // 额外的DNS设置
  const extraDNS = {
    nameserver: [
      'https://223.5.5.5/dns-query',
    ],
  }

  content.dns = content.dns ? { ...content.dns, ...extraDNS } : extraDNS
  return content
}
