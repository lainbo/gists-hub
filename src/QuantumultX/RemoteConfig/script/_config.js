export const config = {
  githubGistFileName: 'QuantumultX.conf', // gist中的文件名
  defaultDoH: [ // 不填写环境变量时默认使用的doh
    'https://dns.alidns.com/dns-query',
    'https://doh.pub/dns-query',
  ],
  remoteFlag: '# {$server_remote}', // 模板中的remote标记(用于防止误操作提交订阅到仓库，一般为字符串的注释，不建议修改)
}
