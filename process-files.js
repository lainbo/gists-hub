import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const files = [
  'src/QuantumultX/List/BanAD.list',
  'src/QuantumultX/List/BanEasyList.list',
  'src/QuantumultX/List/BanEasyListChina.list',
]

files.forEach(file => {
  const filePath = path.join(__dirname, file) // 使用更新后的 __dirname
  const data = fs.readFileSync(filePath, 'utf8')
  const lines = data.split('\n')

  const processedLines = lines.map(line => {
    if (line.startsWith('DOMAIN')) {
      return `${line}, Proxy`
    }
    else if (line.startsWith('IP-CIDR') && line.endsWith(',no-resolve')) {
      return line.replace(',no-resolve', ',Proxy,no-resolve')
    }
    return line
  })

  fs.writeFileSync(filePath, processedLines.join('\n'))
})
