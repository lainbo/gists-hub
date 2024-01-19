import { promises as fs } from 'node:fs'
import path from 'node:path'

const inputDir = 'src/Clash/List'
const outputDir = 'src/QuantumultX/List'
const proxySuffix = ',Proxy'

// 使用映射表来简化替换逻辑
const prefixMapping = {
  'DOMAIN-SUFFIX,': 'HOST-SUFFIX,',
  'DOMAIN,': 'HOST,',
  'DOMAIN-KEYWORD,': 'HOST-KEYWORD,',
  'IP-CIDR6,': 'IP6-CIDR,',
  'IP-CIDR,': 'IP-CIDR,',
}

async function convertFiles() {
  try {
    const files = await fs.readdir(inputDir)

    for (const file of files) {
      if (file.endsWith('.list')) {
        const inputFilePath = path.join(inputDir, file)
        const outputFilePath = path.join(outputDir, file)

        const content = await fs.readFile(inputFilePath, 'utf-8')
        const lines = content.split('\n')

        const convertedLines = lines.map((line) => {
          for (const [prefix, replace] of Object.entries(prefixMapping)) {
            if (line.startsWith(prefix)) {
              return line.replace(prefix, replace) + proxySuffix
            }
          }
          return null
        }).filter(line => line !== null)
        const header = '# 该文件为自动生成\n'
        if (convertedLines.length > 0) {
          await fs.writeFile(outputFilePath, `${header + convertedLines.join('\n')}\n`)
        }
      }
    }
    console.log('已经将Clash的list规则转换为QuantumultX可用的规则')
  }
  catch (error) {
    console.error('出现了错误:', error)
  }
}

convertFiles()
