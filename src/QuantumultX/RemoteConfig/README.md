## 注意
如果要使用自己的数据生成配置，请运行如下命令，让git认为这两个文件没有被修改，否则这两个文件的内容可能会随着提交一起被更新到repo，这可能导致数据泄露风险
```sh
git update-index --assume-unchanged src/QuantumultX/RemoteConfig/ServerConfig.json
git update-index --assume-unchanged .env
```
你还可能用到和这个命令相反的操作，即为恢复git的修改检测
```sh
git update-index --no-assume-unchanged 文件路径
```

## 使用方式
1. 按照格式在`src/QuantumultX/RemoteConfig/ServerConfig.json`中填写你的配置
2. 在项目根目录的`.env`文件中，填写你的信息，用于上传GitHub Gist
3. `pnpm i`安装所需依赖
4. 运行`pnpm run generateQx`，即可根据你的信息在`src\QuantumultX\RemoteConfig\dist`中生成一个QuantumultX的配置文件
5. 运行`pnpm run uploadQx`，即可上传上面的这个配置到Gist，以供QuantumultX直接下载完整配置
6. 当然你可以直接运行`pnpm run syncQx`，这将先生成配置，再自动上传
7. 你可以运行`pnpm run downloadQx`从Gist下载配置到本地，会覆盖本地的 QxTemplate.conf 模板文件
8. 在QuantumultX中点击右下角形如风车的图标，点击下载配置，填入命令行输出的建议链接即可
