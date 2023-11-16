import fs from 'node:fs/promises'

// 生成配置文件的工具函数
async function generateConfig({
  remoteFlag,
  outputDir,
  outputFile,
  templateContent,
  subscriptionInfo,
  envDoH,
  defaultDoH,
  appName,
}) {
  try {
    await fs.mkdir(outputDir, { recursive: true }) // 创建输出目录
    const outputData = templateContent
      .replace(remoteFlag, subscriptionInfo)
      .replace(/# doh-server=/, (_match) => {
        const envDoHArr = envDoH.filter(Boolean) // 过滤有效的DoH
        // 优先使用环境变量中的DoH
        if (envDoHArr?.length) {
          return `doh-server=${envDoHArr.join(',')}`
        }
        else if (defaultDoH?.length) {
          // 如果环境变量中没有DoH，则使用默认的DoH
          return `doh-server=${defaultDoH?.join(',')}`
        }
        else {
          // 如果没有默认DoH，则注释掉DoH
          return _match
        }
      })
    await fs.writeFile(outputFile, outputData) // 写入输出文件
    console.log(`完整的${appName}配置已生成, 本地文件路径为:${outputFile}`)
  }
  catch (error) {
    console.error('生成失败:', error)
  }
}

export { generateConfig }
