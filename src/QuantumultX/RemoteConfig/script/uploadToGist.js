import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import { Octokit } from '@octokit/core'
import dotenv from 'dotenv'
import boxen from 'boxen'
import { config } from './_config.js'

dotenv.config()

// 获取当前文件的目录
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GIST_ID = process.env.GIST_ID
const FILE_NAME = config.githubGistFileName

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

async function updateGist() {
  let fileContent = ''
  const filePath = path.join(__dirname, '../dist/QX.conf')
  try {
    fileContent = fs.readFileSync(filePath, 'utf-8')
  }
  catch (error) {
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
    const boxenOptions = {
      padding: 1,
      title: '建议使用',
      titleAlignment: 'center',
    }
    console.log('\n配置文件已上传至Gist')
    console.log(boxen(`https://ghproxy.com/https://gist.github.com/${data?.owner?.login}/${GIST_ID}/raw/${FILE_NAME}`, boxenOptions))
    console.log('作为QuantumultX内配置的地址\n\n')
  }
  catch (error) {
    console.error('更新Gist失败:', error)
  }
}

updateGist()
