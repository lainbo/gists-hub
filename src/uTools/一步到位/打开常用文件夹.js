const fs = require('node:fs')

const pathMap = new Map([
  ['vb', 'D:/周报/06-汇报总结/01-公司员工/02-工作周报/2024年度'],
])
const path = pathMap.get(ENTER.payload)
if (path) {
  const escapedPath = path.replace(/\//g, '\\\\')
  try {
    const stats = fs.statSync(escapedPath)
    if (stats.isDirectory()) {
      utools.shellOpenPath(escapedPath)
    }
    else {
      utools.showNotification('该路径不是一个文件夹')
    }
  }
  catch (err) {}
}
