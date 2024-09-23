### fetchDirectAppRules.js的作用
用于生成CustomDirectApp.list，内容是一些app的域名，拉取网络上的规则，处理后生成一个合集文件（CustomDirectApp.list），每天会在Action中执行 npm run generateDirectAppList, 回逐个访问js文件中的urls数组，并将这些app的规则合并成一个文件

### list2yaml.js的作用
根据src/Clash/List中的文件，在src/Clash/Yaml生成一样的yaml文件，也会在GitHub Action执行，有的人更倾向使用yaml的规则集
