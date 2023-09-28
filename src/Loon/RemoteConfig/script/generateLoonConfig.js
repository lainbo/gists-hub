// 用于根据上级目录下的 ServerConfig.json 生成完整的 QuantumultX 配置文件

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'
import { config } from './_config.js'

dotenv.config()

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname)).replace(/^\/([a-zA-Z]:)/, '$1')

const configFile = path.join(__dirname, '../LoonTemplate.conf')
const infoFile = path.join(__dirname, '../LoonServerConfig.json')
const outputDir = path.join(__dirname, '../dist')
const outputFile = path.join(outputDir, 'LoonRes.conf')

// 把json格式的订阅信息，转换成QuantumultX配置文件中的格式
async function subscriptionConversion(jsonStr) {
  const serverConfigs = JSON.parse(jsonStr)
  const res = serverConfigs.map(config => {
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

async function generateConfig() {
  try {
    await fs.mkdir(outputDir, { recursive: true })
    const templateContent = await fs.readFile(configFile, 'utf8') // 读取模板文件
    const serverJson = await fs.readFile(infoFile, 'utf8') // 读取订阅json
    const qxServerConfig = await subscriptionConversion(serverJson) // 转换成QuantumultX配置文件中的格式
    const outputData = templateContent
      .replace('# {$server_remote}', qxServerConfig)
      .replace(/# doh-server = /, _match => {
        const envDoHArr = [process.env.CUSTOM_DOH1, process.env.CUSTOM_DOH2].filter(Boolean)
        // 优先使用环境变量中的DoH
        if (envDoHArr?.length) {
          return `doh-server=${envDoHArr.join(',')}`
        }
        else if (config.defaultDoH?.length) {
          // 如果环境变量中没有DoH，则使用默认的DoH
          return `doh-server=${config.defaultDoH?.join(',')}`
        }
        else {
          // 如果没有默认DoH，则注释掉DoH
          return _match
        }
      })
    await fs.writeFile(outputFile, outputData)
    console.log(`本地Loon配置已生成, 文件路径为:${outputFile}`)
  }
  catch (error) {
    console.error('生成失败:', error)
  }
}

generateConfig()
