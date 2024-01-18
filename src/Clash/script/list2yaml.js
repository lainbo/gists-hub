// 引入必要的 Node.js 模块
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前模块的目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 定义输入和输出文件夹的路径
const inputDir = path.join(__dirname, '../List')
const outputDir = path.join(__dirname, '../Yaml')

// 检查输出文件夹是否存在，如果不存在则创建
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 获取输入目录下所有 .list 文件
const listFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.list'))

// 处理每个 .list 文件
listFiles.forEach((file) => {
  // 读取文件内容
  const content = fs.readFileSync(path.join(inputDir, file), 'utf8')

  // 将内容按行分割
  const lines = content.split('\n')

  // 处理每一行，应用转换规则
  const yamlLines = lines.map((line) => {
    // 对空行不做处理
    if (line.trim() === '') {
      return line
    }
    // 保留并缩进注释
    if (line.startsWith('#')) {
      return `  ${line}`
    }
    // 对 PROCESS-NAME 开头的行进行注释并缩进
    if (line.startsWith('PROCESS-NAME')) {
      return `  # ${line}`
    }
    // 其他行加上 '  -'
    return `  - ${line}`
  })

  // 将处理后的内容写入指定文件夹中的同名 .yaml 文件
  const yamlContent = `payload:\n${yamlLines.join('\n')}`
  const yamlFileName = path.join(outputDir, `${path.basename(file, '.list')}.yaml`)
  fs.writeFileSync(yamlFileName, yamlContent)
})

console.log('转换完成')
