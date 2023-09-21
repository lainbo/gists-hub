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

// 将gist上配置文件中的订阅替换成标识符，自定义doh替换为原始doh，防止失误上传到仓库
function replaceContent(content) {
  const serverRemoteReg = /\[server_remote\]([\s\S]*?)\[filter_remote\]/
  const serverFlagStr = '[server_remote]\n; {$server_remote}\n\n[filter_remote]'
  const originDoH1 = 'https://dns.alidns.com/dns-query'
  const originDoH2 = 'https://doh.pub/dns-query'
  const dohReg = /doh-server=([^\n]+)/
  const { CUSTOM_DOH1, CUSTOM_DOH2 } = process.env
  const shouldReplace = content.match(dohReg)?.[1]?.split(',')
    .sort().join(',') === [CUSTOM_DOH1, CUSTOM_DOH2].sort().join(',')
  
  content = content.replace(serverRemoteReg, serverFlagStr)
  if (shouldReplace) {
    content = content.replace(dohReg, `doh-server=${originDoH1},${originDoH2}`)
  }
  return content
}

async function downloadFromGist() {
  try {
    const response = await octokit.request(`GET /gists/${GIST_ID}`, {
      gist_id: GIST_ID,
    })

    if (response.data.files && response.data.files[FILE_NAME]) {
      const content = replaceContent(response.data.files[FILE_NAME].content)
      const outputPath = path.join(__dirname, '../configTemplate.conf')
      await fs.writeFile(outputPath, content, 'utf-8')
      console.log('下载成功,已更新模板,文件在', outputPath)
    }
  } catch (error) {
    console.error(`发生错误: ${error}`)
  }
}

downloadFromGist()
