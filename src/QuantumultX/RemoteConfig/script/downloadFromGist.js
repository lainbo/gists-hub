// 将 Gist 上的配置文件下载到本地
import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import { Octokit } from '@octokit/core'
import dotenv from 'dotenv'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

dotenv.config()
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GIST_ID = process.env.GIST_ID
const FILE_NAME = process.env.GITHUB_GIST_FILE_NAME

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

async function downloadFromGist() {
  try {
    const response = await octokit.request(`GET /gists/${GIST_ID}`, {
      gist_id: GIST_ID,
    })

    if (response.data.files && response.data.files[FILE_NAME]) {
      const content = response.data.files[FILE_NAME].content
      const outputPath = path.join(__dirname, '../dist/QX.conf')
      await fs.writeFile(outputPath, content, 'utf-8')
    }
  } catch (error) {
    console.error(`发生错误: ${error}`)
  }
}

downloadFromGist()
