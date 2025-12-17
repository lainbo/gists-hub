// 用于生成CustomDirectApp.list，内容是一些app的域名，拉取网络上的规则，处理后生成一个合集文件
import fs from 'node:fs'
import https from 'node:https'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outputFile = path.join(__dirname, '..', 'List', 'CustomDirectApp.list')

const urls = [
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/JingDong/JingDong.list', // 京东
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/NetEaseMusic/NetEaseMusic.list', // 网易云音乐
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/AliPay/AliPay.list', // 支付宝
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/NetEase/NetEase.list', // 网易
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XiaoMi/XiaoMi.list', // 小米
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/WeChat/WeChat.list', // 微信
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Eleme/Eleme.list', // 饿了么
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/MeiTuan/MeiTuan.list', // 美团
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Weibo/Weibo.list', // 微博
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/DingTalk/DingTalk.list', // 钉钉
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GaoDe/GaoDe.list', // 高德地图
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Pinduoduo/Pinduoduo.list', // 拼多多
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XiaoHongShu/XiaoHongShu.list', // 小红书
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CaiNiao/CaiNiao.list', // 菜鸟
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ABC/ABC.list', // 农业银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BOC/BOC.list', // 中国银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ICBC/ICBC.list', // 工商银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CMB/CMB.list', // 招商银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CGB/CGB.list', // 广发银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CCB/CCB.list', // 中国建设银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PSBC/PSBC.list', // 中国邮政储蓄银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BOCOM/BOCOM.list', // 交通银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/CEB/CEB.list', // 光大银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PingAn/PingAn.list', // 平安银行
  'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/category-bank-cn.list', // 中国的银行
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaUnicom/ChinaUnicom.list', // 中国联通
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaTelecom/ChinaTelecom.list', // 中国电信
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMobile/ChinaMobile.list', // 中国移动
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XianYu/XianYu.list', // 闲鱼
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/12306/12306.list', // 12306
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/JianGuoYun/JianGuoYun.list', // 坚果云
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/UnionPay/UnionPay.list', // 银联
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/LanZouYun/LanZouYun.list', // 蓝奏云
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/DiDi/DiDi.list', // 滴滴
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/DouYin/DouYin.list', // 抖音
  'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/doubao.list', // 豆包
  'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/WeType/WeType.list', // 微信输入法
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
