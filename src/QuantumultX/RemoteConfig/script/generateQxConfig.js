import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'
import { config } from './_config.js'
import { generateConfig } from '#src/_utils/generateConfig.js'

dotenv.config()

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname)).replace(/^\/([a-zA-Z]:)/, '$1')

const configFile = path.join(__dirname, '../QxTemplate.conf')
const infoFile = path.join(__dirname, '../QXServerConfig.json')
const outputDir = path.join(__dirname, '../dist')
const outputFile = path.join(outputDir, 'QX.conf')

// 把json格式的订阅信息，转换成QuantumultX配置文件中的格式
async function subscriptionConversion(jsonStr) {
  const serverConfigs = JSON.parse(jsonStr)
  const res = serverConfigs.map((config) => {
    const parts = [
      config.url,
      config.tag && `tag=${config.tag}`,
      config['update-interval'] !== undefined && `update-interval=${config['update-interval']}`,
      config.enabled !== undefined && `enabled=${config.enabled}`,
      config['img-url'] && `img-url=${config['img-url']}`,
    ].filter(Boolean)
    return parts.join(', ')
  }).join('\n')
  return res
}

// 获取所有以CUSTOM_DOH开头的环境变量
const envDoH = [...new Set(Object.keys(process.env)
  .filter(key => key.startsWith('CUSTOM_DOH'))
  .map(key => process.env[key]))]

async function main() {
  const templateContent = await fs.readFile(configFile, 'utf8') // 读取模板文件
  const serverJson = await fs.readFile(infoFile, 'utf8') // 读取订阅json
  const qxServerConfig = await subscriptionConversion(serverJson) // 转换成QuantumultX配置文件中的格式
  await generateConfig({
    remoteFlag: config.remoteFlag,
    outputDir,
    outputFile,
    templateContent,
    subscriptionInfo: qxServerConfig,
    envDoH,
    defaultDoH: config.defaultDoH,
    appName: 'QuantumultX',
  })
}

main()
