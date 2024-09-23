Loon规则的原理是，利用LoonTemplate.conf这个模板，通过js往模板中插入订阅、dns设置等，上传到GitHub Gist，最终在Loon中下载Gist的内容

### _config.js
不建议改动，看得懂可以自己改，就是一些不会犯错的默认项

### downloadLoon.js
将Gist上的完整配置，下载下来后脱敏，变成模板文件，一般用不到

### generateLoonConfig.js
负责将LoonServerConfig.json中的订阅链接信息，环境变量中的DNS服务器地址，插入模板，保存到 src\Loon\RemoteConfig\dist\Loon.conf

### uploadLoon.js
负责将生成好的完整配置，上传到Gist

---

为了防止带有订阅信息的配置被提交到开源仓库，请看[这里](src\Loon\RemoteConfig\README.md)
