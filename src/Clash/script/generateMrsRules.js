// 从 Clash/List 生成 mihomo mrs 规则集，并保留无法转 mrs 的 classical 规则
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputDir = path.join(__dirname, '../List')
const outputDir = path.join(__dirname, '../MRS')

const DOMAIN_RULES = new Set(['DOMAIN', 'DOMAIN-SUFFIX'])
const IPCIDR_RULES = new Set(['IP-CIDR', 'IP-CIDR6'])
const BOM_RE = /^\uFEFF/

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function stripBom(content) {
  return content.replace(BOM_RE, '')
}

function parseRule(line) {
  const trimmed = line.trim()

  if (!trimmed || trimmed.startsWith('#')) {
    return null
  }

  const [type, value] = trimmed.split(',', 2).map(part => part.trim())

  if (!type || !value) {
    return {
      kind: 'classical',
      value: trimmed,
    }
  }

  if (DOMAIN_RULES.has(type)) {
    return {
      kind: 'domain',
      value: normalizeDomainRule(type, value),
    }
  }

  if (IPCIDR_RULES.has(type)) {
    return {
      kind: 'ipcidr',
      value,
    }
  }

  return {
    kind: 'classical',
    value: trimmed,
  }
}

function normalizeDomainRule(type, value) {
  if (type === 'DOMAIN') {
    return value
  }

  if (value.startsWith('+.')) {
    return value
  }

  if (value.startsWith('.')) {
    return `+${value}`
  }

  return `+.${value}`
}

function uniqueSorted(values) {
  return [...new Set(values)]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
}

function writeTextFile(filePath, lines, headerLines = []) {
  const content = [
    ...headerLines,
    ...lines,
  ].join('\n')

  fs.writeFileSync(filePath, `${content}\n`)
}

function removeStaleOutputs(baseName) {
  for (const suffix of ['domain.mrs', 'ipcidr.mrs', 'classical.list']) {
    const filePath = path.join(outputDir, `${baseName}.${suffix}`)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
}

function convertRuleset(behavior, inputFile, outputFile) {
  execFileSync('mihomo', [
    'convert-ruleset',
    behavior,
    'text',
    inputFile,
    outputFile,
  ], {
    stdio: 'inherit',
  })
}

function buildMrsForFile(file, tempDir) {
  const baseName = path.basename(file, '.list')
  const content = stripBom(fs.readFileSync(path.join(inputDir, file), 'utf8'))
  const parsedRules = content.split('\n').map(parseRule).filter(Boolean)

  const domainRules = uniqueSorted(parsedRules
    .filter(rule => rule.kind === 'domain')
    .map(rule => rule.value))

  const ipcidrRules = uniqueSorted(parsedRules
    .filter(rule => rule.kind === 'ipcidr')
    .map(rule => rule.value))

  const classicalRules = uniqueSorted(parsedRules
    .filter(rule => rule.kind === 'classical')
    .map(rule => rule.value))

  removeStaleOutputs(baseName)

  if (domainRules.length > 0) {
    const inputFile = path.join(tempDir, `${baseName}.domain.txt`)
    const outputFile = path.join(outputDir, `${baseName}.domain.mrs`)
    writeTextFile(inputFile, domainRules)
    convertRuleset('domain', inputFile, outputFile)
  }

  if (ipcidrRules.length > 0) {
    const inputFile = path.join(tempDir, `${baseName}.ipcidr.txt`)
    const outputFile = path.join(outputDir, `${baseName}.ipcidr.mrs`)
    writeTextFile(inputFile, ipcidrRules)
    convertRuleset('ipcidr', inputFile, outputFile)
  }

  if (classicalRules.length > 0) {
    const outputFile = path.join(outputDir, `${baseName}.classical.list`)
    writeTextFile(outputFile, classicalRules, [
      '# 此文件为自动生成，请勿手动修改',
      `# 源文件: src/Clash/List/${file}`,
      '# 说明: 这里保留 mihomo mrs 暂不支持的规则类型',
    ])
  }

  return {
    file,
    domain: domainRules.length,
    ipcidr: ipcidrRules.length,
    classical: classicalRules.length,
  }
}

function main() {
  ensureDir(outputDir)

  const listFiles = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.list'))
    .sort((a, b) => a.localeCompare(b))

  if (listFiles.length === 0) {
    console.warn('未找到可转换的 .list 文件')
    return
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'clash-mrs-'))

  try {
    const results = listFiles.map(file => buildMrsForFile(file, tempDir))

    console.warn('MRS 规则生成完成')
    for (const result of results) {
      console.warn(`${result.file}: domain=${result.domain}, ipcidr=${result.ipcidr}, classical=${result.classical}`)
    }
  }
  catch (error) {
    if (error.code === 'ENOENT') {
      console.error('未找到 mihomo 命令。请先安装 mihomo，并确保它在 PATH 中。')
    }
    else {
      console.error('生成 MRS 规则失败：', error.message)
    }
    process.exitCode = 1
  }
  finally {
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
}

main()
