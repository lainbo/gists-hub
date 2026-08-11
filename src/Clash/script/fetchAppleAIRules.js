// 同步 Apple AI 上游规则，作为本仓库 MRS 派生产物的源文件
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputFile = path.join(__dirname, '../List/AppleAI.list')
const sourceUrl =
  'https://raw.githubusercontent.com/RocM301/Apple-Rule/refs/heads/main/Apple-AI.list'
const MAX_FETCH_ATTEMPTS = 3
const RETRY_DELAY_MS = 1000

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchContent() {
  for (let attempt = 1; attempt <= MAX_FETCH_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(sourceUrl)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`)
      }

      return await response.text()
    } catch (error) {
      if (attempt === MAX_FETCH_ATTEMPTS) {
        throw new Error(`下载失败：${sourceUrl}（${error.message}）`, { cause: error })
      }

      console.warn(`下载失败，1 秒后重试（${attempt}/${MAX_FETCH_ATTEMPTS}）：${sourceUrl}`)
      await wait(RETRY_DELAY_MS)
    }
  }
}

function extractRules(content) {
  const rules = content
    .replace(/^\uFEFF/, '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))

  if (rules.length === 0) {
    throw new Error('上游 Apple AI 规则为空')
  }

  return rules
}

async function main() {
  const rules = extractRules(await fetchContent())
  const header = ['# 此文件为自动生成，请勿手动修改', `# 来源: ${sourceUrl}`]

  fs.writeFileSync(outputFile, `${[...header, ...rules].join('\n')}\n`)
  console.warn(`Apple AI 规则已写入 ${outputFile}，共 ${rules.length} 条`)
}

main().catch((error) => {
  console.error('同步 Apple AI 规则失败：', error.message)
  process.exitCode = 1
})
