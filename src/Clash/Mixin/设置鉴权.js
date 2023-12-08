// 设置后可能出现Git无法操作的问题，因为这里设置了用户名和密码
// 可以使用命令`git config --global http.proxy http://<用户名>:<密码>@<代理服务器地址>:<端口号>`
// e.g. `git config --global http.proxy http://admin:1234567890@127.0.0.1:7890`
// 如果你还需要设置https的代理，可以使用命令`git config --global https.proxy http://<用户名>:<密码>@<代理服务器地址>:<端口号>`

// authentication不要设置那么弱的密码，下面只是一个例子
function main(content) {
  const authInfo = {
    authentication: ['admin:1234567890'],
  }
  return Object.assign(authInfo, content)
}
