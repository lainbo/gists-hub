import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import dotenv from 'dotenv'
import { config } from './_config.js'
import { downloadConfig } from '#src/_utils/downloadFromGist.js'

dotenv.config()

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

// 下载后的内容处理函数
function replaceContent(content) {
  const serverRemoteReg = /\[Remote Proxy\]([\s\S]*?)\[Remote Filter\]/
  const serverFlagStr = `[Remote Proxy]\n${config.remoteFlag}\n\n[Remote Filter]`
  const dohReg = /doh-server=([^\n]+)/

  content = content.replace(serverRemoteReg, serverFlagStr).replace(dohReg, '# doh-server=')
  return content
}

async function main() {
  const outputPath = path.join(__dirname, '../LoonTemplate.conf')

  await downloadConfig({
    githubToken: process.env.GITHUB_TOKEN,
    gistId: process.env.LOON_GIST_ID,
    fileName: config.githubGistFileName,
    outputPath,
    contentProcessor: replaceContent,
    appName: 'Loon',
  })
}

main()
