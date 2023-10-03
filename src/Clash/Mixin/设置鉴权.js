// 设置后可能出现Git无法操作的问题，因为这里设置了用户名和密码
// 可以使用命令`git config --global http.proxy http://<用户名>:<密码>@<代理服务器地址>:<端口号>`
// e.g. `git config --global http.proxy http://admin:hS3fnZZ4MHk28Z6t58nx@127.0.0.1:7890`
// 如果你还需要设置https的代理，可以使用命令`git config --global https.proxy http://<用户名>:<密码>@<代理服务器地址>:<端口号>
// 是的，并不会用到secret的值

module.exports.parse = ({ content }) => {
  const authInfo = {
    secret: 'k5quv92UYTf8aYTfpkPK',
    authentication: ['admin:hS3fnZZ4MHk28Z6t58nx'],
  }
  Object.assign(authInfo, content)
  return authInfo
}
