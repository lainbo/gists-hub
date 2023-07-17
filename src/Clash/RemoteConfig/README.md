### Q&A
**Q:** 这是什么？

**A:** 订阅转换的远程配置文件。用于替换src/Clash/Mixin下面的那些预处理，这是一种更好的做法。

---
**Q:** 订阅转换是什么？

**A:** 机场的订阅链接中会自带一些规则，但这个规则可能有或多或少的问题。比如订阅链接中的语法不一定完全适配你使用的软件，比如自带的分流规则不正确导致一些网站上不去（典型的例子就是开着梯子也用不了new bing）。这时候就需要订阅转换，进行软件的适配和规则的变更。

---

**Q:** 为什么要用这个配置而不是JavaScript预处理

**A:** 

1. 无关客户端，不是每一个客户端都能JavaScript预处理
2. 无感添加功能、更新功能、bugfix。因为配置是个在线链接，新功能、bugfix都会在下载、更新订阅的时候载入到设备。

---

**Q:** 怎么转换？

**A:** 
1. 进入[ACL4SSR转换](https://acl4ssr-sub.github.io/)
2. 模式设置: 进阶
3. 订阅链接: 填机场给的
4. 客户端: 一般是`Clash新参数`，如果你用的不是Clash，选择你使用的客户端
5. 远程配置: 手动输入`https://raw.githubusercontent.com/lainbo/gists-hub/master/src/Clash/RemoteConfig/Lainbo.ini`
6. 后端地址: 手动输入`https://api.tsutsu.one/sub?` (这是TAG机场的订阅转换后端)
7. 输出文件名: 选填，可以写当前机场的名字，在一些客户端他会自动识别这个名字
8. 点击底部的`生成订阅链接`按钮，然后用生成的订阅地址在对应客户端中使用

---

**Q:** 这个远程配置改了什么东西？

**A:** 这个配置基于[ACL4SSR的精简版_更多去广告](https://github.com/ACL4SSR/ACL4SSR/blob/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini)，

**该配置本身的额外功能有:**
1. 去广告
2. 尝试解锁New Bing的聊天功能
3. 阻止一些Google Analytics、国内广告联盟追踪，和一些垃圾站点五彩斑斓的Banner

**我赋予这个远程配置的的功能有:**
1. Chat GPT自动使用**延迟最低的，符合条件的美国节点**（JavaScript因为是预处理，做不到选中延迟最低的，有时候选中的那个节点刚好是挂的也没办法）
2. Adobe系列软件的盗版弹窗拦截（通过reject相关域名实现）
3. 使用`https://cp.cloudflare.com/generate_204`进行自动测速（因为很多机场、组织，希望有一个好看的延迟数值，使用的测速链接是一个http而非https协议的链接，但我们平时使用的时候95%的链接都是https的。所以换成https的测速以贴近真实使用延迟

