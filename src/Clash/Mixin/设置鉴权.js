module.exports.parse = ({ content }) => {
  const authInfo = {
    secret: 'k5quv92UYTf8aYTfpkPK',
    authentication: ['admin:hS3fnZZ4MHk28Z6t58nx'],
  }
  Object.assign(authInfo, content)
  return authInfo
}
