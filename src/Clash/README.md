# Clash 规则目录说明

本目录保存 Clash/mihomo 相关的远程配置、规则源文件和派生成品。

## 目录职责

```text
src/Clash/
├── List/          # 规则源文件，统一使用 Clash text/classical 风格的 .list
├── Yaml/          # 由 List 派生出来的 yaml rule-provider 成品
├── MRS/           # 由 List 派生出来的 mrs rule-provider 成品和残留 classical 规则
├── script/        # 生成、转换、同步 Clash 规则的脚本
├── RemoteConfig/  # 客户端远程配置和订阅转换配置
└── Mixin/         # Clash 客户端可用的 mixin 脚本
```

## 文件来源

`List/` 是规则的唯一源头。维护规则时优先修改这里的 `.list` 文件，不直接修改 `Yaml/` 或 `MRS/` 里的派生成品。

维护原则：

- 新增或调整规则时，只改 `src/Clash/List/*.list`。
- `src/Clash/Yaml/*`、`src/Clash/MRS/*` 由脚本生成，不做人肉同步。
- `src/Clash/RemoteConfig/Lainbo-advanced.local.yaml` 引用 `MRS/` 成品，不再直接引用本仓库 `List/`。
- 如果新增了无法转成 `mrs` 的规则类型，不需要手工判断，`generateMrsRules.js` 会自动把它放进 `<RuleName>.classical.list`。

可手工维护的源规则：

- `src/Clash/List/CustomAI.list`
- `src/Clash/List/CustomDirect.list`
- `src/Clash/List/CustomFirstProxy.list`
- `src/Clash/List/CustomProxy.list`
- `src/Clash/List/CustomReject.list`
- `src/Clash/List/TelegramDC1.list`
- `src/Clash/List/TelegramDC2_4.list`
- `src/Clash/List/TelegramDC5.list`
- `src/Clash/List/CustomFinalDirect.list`

脚本生成的源规则：

- `src/Clash/List/CustomDirectApp.list`

`CustomDirectApp.list` 由 `src/Clash/script/fetchDirectAppRules.js` 拉取外部规则后合并生成。不要手工修改它，否则每天的 GitHub Actions 任务可能会覆盖本地改动。

## 派生成品

`Yaml/` 中的 `.yaml` 文件由 `src/Clash/script/list2yaml.js` 根据 `List/` 自动生成，供偏好 yaml rule-provider 的客户端使用。

`MRS/` 用于保存 mihomo 的 `mrs` 规则集成品。由于 `mrs` 目前只支持 `domain` 和 `ipcidr` 两类 `behavior`，一个 `.list` 源文件可能会被拆成多份成品：

```text
CustomDirect.domain.mrs       # DOMAIN / DOMAIN-SUFFIX
CustomDirect.ipcidr.mrs       # IP-CIDR / IP-CIDR6
CustomDirect.classical.list   # DOMAIN-KEYWORD / PROCESS-NAME / IP-ASN / DST-PORT 等残留规则
```

`MRS/` 里的 `.mrs` 和 `.classical.list` 都应由脚本生成，不应手工维护。

目前 `src/Clash/RemoteConfig/Lainbo-advanced.local.yaml` 使用以下命名约定引用 `MRS/` 成品：

```text
<RuleName>Domain     -> src/Clash/MRS/<RuleName>.domain.mrs
<RuleName>IPCIDR     -> src/Clash/MRS/<RuleName>.ipcidr.mrs
<RuleName>Classical  -> src/Clash/MRS/<RuleName>.classical.list
```

如果某类成品不存在，例如某个规则没有 IP 段，就不要在 `RemoteConfig` 中创建对应的 `IPCIDR` provider。

## 推荐生成流程

可以一次生成 Clash 规则派生产物：

```sh
pnpm run generateClashRules
```

提交前会自动执行轻量派生流程：

```sh
pnpm run generateClashDerived
```

这个命令只根据现有 `List/` 生成 `Yaml/` 和 `MRS/`，不会拉取外部规则刷新 `CustomDirectApp.list`。因此日常手工修改 `List/` 后直接提交即可，pre-commit hook 会自动把对应成品重新生成并 `git add .`。

注意：当前 pre-commit hook 只执行本地派生任务，不执行 `syncQx` 和 `syncLoon` 这类上传任务，避免本地私有配置、Gist ID 或 token 状态阻塞提交。

也可以分步执行：

```sh
pnpm run generateDirectAppList
pnpm run generateClashYaml
pnpm run generateClashMrs
```

## RemoteConfig 引用方式

在 mihomo 原生配置中引用 `MRS/` 成品时，建议按行为拆 provider：

```yaml
rule-providers:
  CustomDirectDomain:
    type: http
    behavior: domain
    format: mrs
    url: https://raw.githubusercontent.com/lainbo/gists-hub/master/src/Clash/MRS/CustomDirect.domain.mrs
    path: ./ruleset/CustomDirect.domain.mrs
    interval: 86400

  CustomDirectIPCIDR:
    type: http
    behavior: ipcidr
    format: mrs
    url: https://raw.githubusercontent.com/lainbo/gists-hub/master/src/Clash/MRS/CustomDirect.ipcidr.mrs
    path: ./ruleset/CustomDirect.ipcidr.mrs
    interval: 86400

  CustomDirectClassical:
    type: http
    behavior: classical
    format: text
    url: https://raw.githubusercontent.com/lainbo/gists-hub/master/src/Clash/MRS/CustomDirect.classical.list
    path: ./ruleset/CustomDirect.classical.list
    interval: 86400
```

```yaml
rules:
  - RULE-SET,CustomDirectDomain,🔗 无需代理
  - RULE-SET,CustomDirectIPCIDR,🔗 无需代理
  - RULE-SET,CustomDirectClassical,🔗 无需代理
```

## 校验方式

生成 MRS 后先跑脚本自身：

```sh
pnpm run generateClashMrs
```

检查 YAML 能否解析，并确认所有 `RULE-SET` 都能找到对应 provider：

```sh
ruby -e "require 'yaml'; data = YAML.load_file('src/Clash/RemoteConfig/Lainbo-advanced.local.yaml'); providers = data.fetch('rule-providers').keys; missing = []; data.fetch('rules').each { |rule| parts = rule.split(',', 3); missing << parts[1] if parts[0] == 'RULE-SET' && !providers.include?(parts[1]) }; abort(missing.join(%(\n))) unless missing.empty?; puts 'yaml ok'; puts 'all RULE-SET providers exist'"
```

可以继续用 mihomo 测试配置：

```sh
mihomo -t -d /tmp/mihomo-check -f src/Clash/RemoteConfig/Lainbo-advanced.local.yaml
```

注意：在 fake-ip/TUN 环境下，`mihomo -t` 可能因为无法下载 `geoip.metadb` 或无法解析 GitHub 而失败。若错误集中在 `can't download MMDB`、`dns resolve failed`，通常不是 `MRS` provider 命名或 YAML 结构问题，应先排除网络和 geodata 下载环境。
