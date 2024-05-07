import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'
import { config } from './_config.js'
import { generateConfig } from '#src/_utils/generateConfig.js'

dotenv.config()

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname)).replace(/^\/([a-zA-Z]:)/, '$1')

const configFile = path.join(__dirname, '../LoonTemplate.conf')
const infoFile = path.join(__dirname, '../LoonServerConfig.json')
const outputDir = path.join(__dirname, '../dist')
const outputFile = path.join(outputDir, 'Loon.conf')

// 把json格式的订阅信息，转换成Loon配置文件中的格式
async function subscriptionConversion(jsonStr) {
  const serverConfigs = JSON.parse(jsonStr)
  const res = serverConfigs.map((config) => {
    const parts = [
      config.url,
      config.udp !== undefined && `udp=${config.udp}`,
      config['fast-open'] !== undefined && `fast-open=${config['fast-open']}`,
      config['vmess-aead'] !== undefined && `vmess-aead=${config['vmess-aead']}`,
      config.enabled !== undefined && `enabled=${config.enabled}`,
    ].filter(Boolean)
    return `${config.alias} = ${parts.join(', ')}`
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
  const loonServerConfig = await subscriptionConversion(serverJson) // 转换成Loon配置文件中的格式
  await generateConfig({
    remoteFlag: config.remoteFlag,
    outputDir,
    outputFile,
    templateContent,
    subscriptionInfo: loonServerConfig,
    envDoH,
    defaultDoH: config.defaultDoH,
    appName: 'Loon',
    dnsFlag: config.dnsFlag,
  })
}

main()
