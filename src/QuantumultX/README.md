### 一些提示
1. QX作者不爱维护了，我也不太想维护了，功能缺失，以及种种限制我已经不再使用QX
2. List中的RemoteAdRules和RemoteOtherRules是利用GitHub Action自动进行同步的，不要手动改，自定义的自己加在别处
3. 一般来说修改List文件里的内容，只需要修改Clash的List文件，因为在提交的过程中，QuantumultX、Loon的`.list`文件会根据Clash的`.list`自动生成并且自动上传到Gist（husky实现）
4. 但是如果需要修改配置文件本身，也就是那些`.ini`、`.conf`文件，那就需要手动一个一个改了
