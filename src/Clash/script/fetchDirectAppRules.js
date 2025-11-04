// 用于生成CustomDirectApp.list，内容是一些app的域名，拉取网络上的规则，处理后生成一个合集文件
import fs from 'node:fs'
import https from 'node:https'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outputFile = path.join(__dirname, '..', 'List', 'CustomDirectApp.list')

const urls = [
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/JingDong/JingDong.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/NetEaseMusic/NetEaseMusic.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/AliPay/AliPay.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/NetEase/NetEase.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XiaoMi/XiaoMi.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/WeChat/WeChat.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Eleme/Eleme.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/MeiTuan/MeiTuan.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Weibo/Weibo.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/DingTalk/DingTalk.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GaoDe/GaoDe.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Pinduoduo/Pinduoduo.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XiaoHongShu/XiaoHongShu.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CaiNiao/CaiNiao.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ABC/ABC.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BOC/BOC.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ICBC/ICBC.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CMB/CMB.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CGB/CGB.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CCB/CCB.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PSBC/PSBC.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BOCOM/BOCOM.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CEB/CEB.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PingAn/PingAn.list',
  'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-bank-cn.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaUnicom/ChinaUnicom.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaTelecom/ChinaTelecom.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMobile/ChinaMobile.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XianYu/XianYu.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/12306/12306.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/JianGuoYun/JianGuoYun.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/UnionPay/UnionPay.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/LanZouYun/LanZouYun.list',
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/DiDi/DiDi.list',
]

function fetchContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

function processContent(content) {
  // 过滤掉空行和注释，只保留规则
  const rules = content
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return trimmed !== '' && !trimmed.startsWith('#')
    })

  // 对规则进行排序
  rules.sort()

  return rules.join('\n')
}

async function main() {
  try {
    const header = '# 此文件为自动生成，请勿手动修改'
    const processedRules = []

    for (const url of urls) {
      console.log(`正在获取内容：${url}`)
      const ruleContent = await fetchContent(url)
      // 对每个URL的内容进行处理（去注释+排序）
      const processed = processContent(ruleContent)
      if (processed) {
        processedRules.push(processed)
      }
    }

    // 按URL顺序拼接所有处理好的规则
    const combinedContent = processedRules.join('\n')
    fs.writeFileSync(outputFile, `${header}\n${combinedContent}\n`)
    console.log(`合并和处理后的规则已写入 ${outputFile}`)
  }
  catch (error) {
    console.error('发生错误：', error)
  }
}

main()
