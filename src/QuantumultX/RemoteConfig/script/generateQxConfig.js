// 用于根据同级目录下的 ServerConfig.json 生成完整的 QuantumultX 配置文件

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname)).replace(/^\/([a-zA-Z]:)/, '$1')

const configFile = path.join(__dirname, '../Lainbo.conf')
const infoFile = path.join(__dirname, '../ServerConfig.json')
const outputDir = path.join(__dirname, '../dist')
const outputFile = path.join(outputDir, 'QX.conf')

async function generateConfig() {
  try {
    await fs.mkdir(outputDir, { recursive: true })
    const configData = await fs.readFile(configFile, 'utf8')
    const serverConfigs = JSON.parse(await fs.readFile(infoFile, 'utf8'))
    const generatedServerConfig = serverConfigs.map(config => {
      const parts = [
        config.url,
        config.tag && `tag=${config.tag}`,
        config['update-interval'] !== undefined && `update-interval=${config['update-interval']}`,
        config.enabled !== undefined && `enabled=${config.enabled}`,
        config['img-url'] && `img-url=${config['img-url']}`,
      ].filter(Boolean) // 使用 filter(Boolean) 移除所有 falsy 值

      return parts.join(', ') // 将每个属性的字符串连接起来
    }).join('\n')

    const outputData = configData.replace(/(doh-server=)([^\n]*)/, (match, p1, p2) => {
      const existingDns = p2.split(',') // 拆分字符串并转换为数组
      process.env.CUSTOM_DOH1 && (existingDns[0] = process.env.CUSTOM_DOH1)
      process.env.CUSTOM_DOH2 && (existingDns[1] = process.env.CUSTOM_DOH2)
      return `${p1}${existingDns.join(',')}` // 返回新的doh-server行
    }).replace('; {$server_remote}', `${generatedServerConfig}`)
    await fs.writeFile(outputFile, outputData)
    console.log(`QuantumultX配置已生成, 文件路径为:${outputFile}`)
  } catch (error) {
    console.error('生成失败:', error)
  }
}

generateConfig()
