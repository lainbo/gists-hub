import fs from 'node:fs'
import path from 'node:path'

const files = [
  'gists-hub/src/QuantumultX/List/BanAD.list',
  'gists-hub/src/QuantumultX/List/BanEasyList.list',
  'gists-hub/src/QuantumultX/List/BanEasyListChina.list',
]

files.forEach(file => {
  const filePath = path.join(__dirname, file)
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
