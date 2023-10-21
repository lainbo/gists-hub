import fs from 'node:fs'
import { Octokit } from '@octokit/core'
import boxen from 'boxen'

// 上传文件到Gist的工具函数
export async function updateGist({
  githubToken,
  gistId,
  fileName,
  filePath,
  appName,
}) {
  let fileContent = ''
  try {
    fileContent = fs.readFileSync(filePath, 'utf-8')
  }
  catch (error) {
    console.error('出现了错误:', error)
    return
  }

  const octokit = new Octokit({
    auth: githubToken,
  })

  try {
    const { data } = await octokit.request(`PATCH /gists/${gistId}`, {
      gist_id: gistId,
      description: `${appName}的配置文件`,
      files: {
        [fileName]: {
          content: fileContent,
        },
      },
    })
    const boxenOptions = {
      padding: 1,
      title: '建议使用',
      titleAlignment: 'center',
    }
    console.log('\n配置文件已上传至Gist,线上文件地址为')
    console.log(boxen(`https://gist.github.com/${data?.owner?.login}/${gistId}/raw/${fileName}`, boxenOptions))
    console.log(`作为${appName}内配置的地址\n\n`)
  }
  catch (error) {
    console.error('更新Gist失败:', error)
  }
}
