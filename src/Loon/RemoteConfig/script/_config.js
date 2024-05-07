export const config = {
  githubGistFileName: 'Loon.conf', // gist中的文件名
  defaultDoH: [ // 不填写环境变量时默认使用的doh
    'h3://223.5.5.5/dns-query',
  ],
  remoteFlag: '# {$Remote Proxy}', // 模板中的remote标记(用于防止误操作提交订阅到仓库，一般为字符串的注释，不建议修改)
  dnsFlag: 'doh3-server', // 可用的dnsFlag参见: https://nsloon.app/LoonManual/#/cn/dns?id=%e7%9b%b8%e5%85%b3%e9%85%8d%e7%bd%ae
}
