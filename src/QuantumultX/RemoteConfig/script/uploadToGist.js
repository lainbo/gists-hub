import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import { Octokit } from '@octokit/core'
import dotenv from 'dotenv'

dotenv.config()

// 获取当前文件的目录
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GIST_ID = process.env.GIST_ID
const FILE_NAME = 'QuantumultX.conf'

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

async function updateGist() {
  let fileContent = ''
  const filePath = path.join(__dirname, '../dist/QX.conf')
  try {
    fileContent = fs.readFileSync(filePath, 'utf-8')
  } catch (error) {
    console.error('出现了错误:', error)
  }

  try {
    const { data } = await octokit.request(`PATCH /gists/${GIST_ID}`, {
      gist_id: GIST_ID,
      description: 'QuantumultX的配置文件',
      files: {
        [FILE_NAME]: {
          content: fileContent,
        },
      },
    })
    console.log('配置文件已上传至Gist, 访问链接为:', `https://gist.github.com/${data?.owner?.login}/${GIST_ID}`)
  } catch (error) {
    console.error('更新Gist失败:', error)
  }
}

updateGist()
