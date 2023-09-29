import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import dotenv from 'dotenv'
import { config } from './_config.js'

import { updateGist } from '#src/_utils/updateGist.js' // 导入 updateGist 函数

dotenv.config()

// 获取当前文件的目录
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

async function main() {
  await updateGist({
    githubToken: process.env.GITHUB_TOKEN,
    gistId: process.env.LOON_GIST_ID,
    fileName: config.githubGistFileName,
    filePath: path.join(__dirname, '../dist/Loon.conf'),
    appName: 'Loon',
  })
}

main()
