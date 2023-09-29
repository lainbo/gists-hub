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
  const serverRemoteReg = /\[server_remote\]([\s\S]*?)\[filter_remote\]/
  const serverFlagStr = `[server_remote]\n${config.remoteFlag}\n\n[filter_remote]`
  const dohReg = /doh-server=([^\n]+)/

  content = content.replace(serverRemoteReg, serverFlagStr).replace(dohReg, '# doh-server=')
  return content
}

async function main() {
  const outputPath = path.join(__dirname, '../QxTemplate.conf')

  await downloadConfig({
    githubToken: process.env.GITHUB_TOKEN,
    gistId: process.env.QX_GIST_ID,
    fileName: config.githubGistFileName,
    outputPath,
    contentProcessor: replaceContent,
    appName: 'QuantumultX',
  })
}

main()
