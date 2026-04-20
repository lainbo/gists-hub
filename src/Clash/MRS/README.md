# MRS 规则成品目录

本目录用于保存从 `src/Clash/List` 派生出来的 mihomo `mrs` 规则集。

## 维护规则

不要手工编辑本目录下的成品文件。规则维护入口是 `src/Clash/List/*.list`。

推荐流程：

```text
src/Clash/List/*.list
  -> src/Clash/Yaml/*.yaml
  -> src/Clash/MRS/*.domain.mrs
  -> src/Clash/MRS/*.ipcidr.mrs
  -> src/Clash/MRS/*.classical.list
```

## 文件命名

```text
<RuleName>.domain.mrs       # domain behavior，可包含 DOMAIN / DOMAIN-SUFFIX 转换结果
<RuleName>.ipcidr.mrs       # ipcidr behavior，可包含 IP-CIDR / IP-CIDR6 转换结果
<RuleName>.classical.list   # mrs 不支持的残留 classical 规则
```

示例：

```text
CustomDirectApp.domain.mrs
CustomDirectApp.ipcidr.mrs
CustomDirectApp.classical.list
```

## 为什么需要拆分

mihomo 的 `mrs` rule-provider 目前只支持 `behavior: domain` 和 `behavior: ipcidr`。

因此这些规则可以进入 `mrs`：

- `DOMAIN`
- `DOMAIN-SUFFIX`
- `IP-CIDR`
- `IP-CIDR6`

这些规则应保留在 `classical` 文本规则里：

- `DOMAIN-KEYWORD`
- `PROCESS-NAME`
- `DST-PORT`
- `IP-ASN`
- 其他无法映射到 `domain` 或 `ipcidr` behavior 的规则

脚本只对白名单类型做 MRS 转换。当前白名单是：

```text
domain: DOMAIN, DOMAIN-SUFFIX
ipcidr: IP-CIDR, IP-CIDR6
```

其它所有类型都会原样写入 `<RuleName>.classical.list`。这样后续新增未知规则类型时不会丢规则，只是不会享受 MRS 优化。

## RemoteConfig 命名约定

`src/Clash/RemoteConfig/Lainbo-advanced.local.yaml` 使用固定后缀引用本目录成品：

```text
<RuleName>Domain     # behavior: domain, format: mrs
<RuleName>IPCIDR     # behavior: ipcidr, format: mrs
<RuleName>Classical  # behavior: classical, format: text
```

例如 `CustomDirectApp.list` 会展开为：

```text
CustomDirectAppDomain
CustomDirectAppIPCIDR
CustomDirectAppClassical
```

rules 中应使用同一个策略组重复引用这些 provider，保证拆分前后的分流结果一致。

## 生成依赖

生成 `.mrs` 需要本机或 GitHub Actions 环境中可执行 `mihomo` 命令。

转换命令形态：

```sh
mihomo convert-ruleset domain text input.domain.txt output.domain.mrs
mihomo convert-ruleset ipcidr text input.ipcidr.txt output.ipcidr.mrs
```

具体安装方式见 `src/Clash/script/README.md`。

## 维护注意

- 不要手工编辑 `.mrs` 文件。
- 不要手工编辑本目录下的 `.classical.list` 残留文件。
- 如果发现某条规则分类不合理，应修改 `src/Clash/script/generateMrsRules.js` 的分类逻辑，而不是改成品。
- 如果 `Lainbo-advanced.local.yaml` 引用缺失 provider，先确认对应成品是否实际生成，再决定是否添加 provider。
