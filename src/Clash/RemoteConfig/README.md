### Q&A
**Q:** 这是什么？

**A:** 订阅转换的远程配置文件。更多的作用是用来给订阅套上一层分流规则

---
**Q:** 订阅转换是什么？

**A:** 本身的作用是将一个A软件才支持的链接，让B软件也能顺利导入节点，但是我们这里处理软件兼容性是次要的，套上分流规则是主要的。

---

**Q:** 分流规则是什么？
**A:** 比如你访问taobao，如果全局代理了就会被重定向到国际站，我们知道taobao应该走直连而不是节点。比如某个广告banner的图片链接是abc.ad.com，那我们就应该丢弃掉这个请求。再比如我们希望使用美国节点访问OpenAI，但是我们并不想每次访问之前手动切换节点。能帮我们自动做这一切的，就是分流规则。

---

**Q:** 怎么转换？

**A:** 
1. 进入[一个比较知名的转换网站](https://sublink.dev/)
2. 模式设置: 进阶
3. 订阅链接: 填机场给的
4. 客户端: 一般是`Clash`，如果你用的不是Clash，选择你使用的客户端
5. 远程配置: 手动输入`https://u.lainbo.com/clash-config`
6. 输出文件名: 选填，可以写当前机场的名字，在一些客户端他会自动识别这个名字
7. 点击底部的`生成订阅链接`按钮，然后用生成的订阅地址在对应客户端中使用

---

**该配置本身的额外功能有:**
- 排除流量信息等不会使用的节点
- 局域网、直连网站白名单, 避免DNS泄露
- AI网站自动使用优质节点
- 常见广告关键字、广告联盟。无副作用
- Adobe系列软件的盗版弹窗拦截
- 规则重复率低
- 包含195个主权国家和常用地区的Emoji旗帜显示匹配规则
- 安全的自动策略组, 所有自动选择(如 自动选择、香港自动、美国自动等)不会自动选到高倍率节点导致流量消耗过快

---

### Lainbo-advanced.local.yaml 维护说明

`Lainbo-advanced.local.yaml` 是为了减少对远程订阅转换服务的依赖而维护的 mihomo 原生配置。

本仓库自有规则不再直接引用 `src/Clash/List/*.list`，而是引用 `src/Clash/MRS/*` 的派生成品。规则源头仍然是 `src/Clash/List/*.list`。

自有规则 provider 命名约定：

```text
<RuleName>Domain     -> behavior: domain, format: mrs
<RuleName>IPCIDR     -> behavior: ipcidr, format: mrs
<RuleName>Classical  -> behavior: classical, format: text
```

例如：

```yaml
CustomDirectAppDomain:
  type: http
  behavior: domain
  format: mrs
  url: https://raw.githubusercontent.com/lainbo/gists-hub/master/src/Clash/MRS/CustomDirectApp.domain.mrs
  path: ./ruleset/CustomDirectApp.domain.mrs
  interval: 86400
```

`rules` 中同一个源规则拆出的多个 provider 应继续指向同一个策略组，避免拆分后改变分流结果。

维护流程：

```sh
pnpm run generateClashRules
```

校验 `RULE-SET` 是否都能找到 provider：

```sh
ruby -e "require 'yaml'; data = YAML.load_file('src/Clash/RemoteConfig/Lainbo-advanced.local.yaml'); providers = data.fetch('rule-providers').keys; missing = []; data.fetch('rules').each { |rule| parts = rule.split(',', 3); missing << parts[1] if parts[0] == 'RULE-SET' && !providers.include?(parts[1]) }; abort(missing.join(%(\n))) unless missing.empty?; puts 'yaml ok'; puts 'all RULE-SET providers exist'"
```

可以用 mihomo 做进一步测试：

```sh
mihomo -t -d /tmp/mihomo-check -f src/Clash/RemoteConfig/Lainbo-advanced.local.yaml
```

如果测试失败在 `geoip.metadb`、`MMDB` 或 GitHub DNS 解析阶段，通常是当前网络或 fake-ip/TUN 环境导致的 geodata 下载问题，不代表本地 MRS provider 引用一定有误。
