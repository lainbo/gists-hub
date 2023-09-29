import { Octokit } from '@octokit/core'
import fs from 'node:fs/promises'

// 下载并处理文件内容的工具函数
export async function downloadConfig({
  githubToken,
  gistId,
  fileName,
  outputPath,
  contentProcessor,
  appName
}) {
  const octokit = new Octokit({
    auth: githubToken,
  })

  try {
    const response = await octokit.request(`GET /gists/${gistId}`, {
      gist_id: gistId,
    })

    if (response.data.files && response.data.files[fileName]) {
      let content = response.data.files[fileName].content

      // 调用传入的内容处理函数
      if (typeof contentProcessor === 'function') {
        content = contentProcessor(content)
      }

      await fs.writeFile(outputPath, content, 'utf-8')
      console.log(`下载${appName}配置成功,已脱敏并更新模板,文件在 ${outputPath}`)
    }
  }
  catch (error) {
    console.error(`发生错误: ${error}`)
  }
}
