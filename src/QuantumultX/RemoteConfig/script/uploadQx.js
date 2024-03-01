// 将生成的完整的 QuantumultX 配置文件上传到 Gist
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import dotenv from 'dotenv'
import { config } from './_config.js'

import { updateGist } from '#src/_utils/updateGist.js'

dotenv.config()

// 获取当前文件的目录
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

async function main() {
  await updateGist({
    githubToken: process.env.GITHUB_TOKEN,
    gistId: process.env.QX_GIST_ID,
    fileName: config.githubGistFileName,
    filePath: path.join(__dirname, '../dist/QX.conf'),
    appName: 'QuantumultX',
  })
}

main()
