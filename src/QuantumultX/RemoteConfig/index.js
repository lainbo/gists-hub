// 用于根据同级目录下的 ServerConfig.json 生成完整的 QuantumultX 配置文件

/*
// ServerConfig.json 格式:
[
  {
    "url": "www.example.com", // 机场给的订阅链接
    "tag": "example", // 机场名字
    "update-interval": 172800, // 更新间隔, 单位为秒
    "enabled": true, // 是否启用
    "img-url": "https://nxboom.com/images/NA_Logo.png" // 图标链接
  },
]
*/

import fs from 'node:fs/promises'
import path from 'node:path'

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname)).replace(/^\/([a-zA-Z]:)/, '$1')

const configFile = path.join(__dirname, './Lainbo.conf')
const infoFile = path.join(__dirname, './ServerConfig.json')
const outputDir = path.join(__dirname, 'dist')
const outputFile = path.join(outputDir, 'LainboQX.conf')

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

    const outputData = configData.replace('[server_remote]', `[server_remote]\n${generatedServerConfig}`)
    await fs.writeFile(outputFile, outputData)
    console.log(`QuantumultX配置已生成, 文件路径为: ${outputFile}`)
  } catch (error) {
    console.error('生成失败:', error)
  }
}

generateConfig()
