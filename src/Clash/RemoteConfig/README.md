### 区别
- 个人使用.js：DNS修改
- 通用.js：包含Chat GPT使用美国节点，DNS修改，Adobe盗版拦截，测速地址修改为真实情况
- Adobe防弹窗.js：仅包含Adobe盗版拦截

### Q&A
**Q:** 为什么个人使用的功能反而少？

**A:** 因为我使用了订阅转换，远程配置文件在当前repo的`src/Clash/Remote/Lainbo.ini`，这个配置文件已经做了更完善的GPT分组，Adobe的盗版拦截，和测速的处理，所以即使没有使用JavaScript进行节点的预处理，也有同样的功能

**Q:** 订阅转换是什么？

**A:** 机场的订阅链接中会自带一些规则，但这个规则可能有或多或少的问题。比如订阅链接中的语法不一定完全适配你使用的软件，比如自带的分流规则不正确导致一些网站上不去（典型的例子就是开着梯子也用不了new bing）。这时候就需要订阅转换，进行软件的适配和规则的变更

**Q:** 怎么转换？

**A:** 
1. 进入[ACL4SSR转换](https://acl4ssr-sub.github.io/)
2. 模式设置：进阶
3. 订阅链接：填机场给的
4. 客户端：一般是`Clash新参数`，如果你用的不是Clash，选择你需要的
5. 远程配置：填`https://fastgithub.lainbo.com/https://raw.githubusercontent.com/lainbo/gists-hub/master/src/Clash/RemoteConfig/Lainbo.ini`，填进去之后点击下拉弹出的选项，不然不能确认。
   
   上面的链接是我加速过的，如果你有自搭建的订阅转换在国内服务器上也能用，如果服务器不认，请填写原始链接`https://raw.githubusercontent.com/lainbo/gists-hub/master/src/Clash/Remote/Lainbo.ini`
6. 后端地址：选`sub.xeton.dev(subconverter作者提供-稳定)`
7. 输出文件名：选填，可以写当前机场的名字，在一些客户端他会自动识别这个名字
8. 点击底部的`生成订阅链接`按钮，然后用生成的订阅地址在对应客户端中使用

**Q:** 这个远程配置改了什么东西？

**A:** 这个配置基于[ACL4SSR的精简版_更多去广告](https://github.com/ACL4SSR/ACL4SSR/blob/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini)，

**该配置本身的额外功能有：**
1. 去广告
2. 尝试解锁New Bing的聊天功能
3. 阻止一些Google Analytics、国内广告联盟追踪，和一些垃圾站点五彩斑斓的Banner

**我赋予这个远程配置的的功能有：**
1. Chat GPT自动使用**延迟最低的，符合条件的美国节点**（JavaScript因为是预处理，做不到选中延迟最低的，有时候选中的那个节点刚好是挂的也没办法）
2. Adobe系列软件的盗版弹窗拦截（通过reject相关校验域名实现）
3. 使用`https://cp.cloudflare.com/generate_204`进行自动测速（因为很多机场、组织，希望有一个好看的延迟数值，使用的测速链接是一个http而非https协议的链接，但我们平时使用的时候95%的链接都是https的。所以换成https的测速以贴近真实使用延迟

**Q:** 为什么要用这个配置而不是JavaScript预处理

**A:** JavaScript预处理功能并不是每一个客户端都有的，比如Clash X，Clash For Android都没有（或许是我不会用）。所以如果将这些功能写在配置里，只要更新订阅，就能实现功能的添加、更新和bugfix。这将比JavaScript预处理有更好的兼容性和易用性
