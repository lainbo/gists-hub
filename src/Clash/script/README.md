# Clash 脚本说明

本目录保存 Clash/mihomo 规则的生成和转换脚本。

## fetchDirectAppRules.js

用于生成 `src/Clash/List/CustomDirectApp.list`。

这个脚本会拉取多个外部 Clash 规则列表，过滤空行和注释，排序后合并为一个规则源文件。该文件每天会在 GitHub Actions 中重新生成，不建议手工修改。

执行命令：

```sh
pnpm run generateDirectAppList
```

## list2yaml.js

用于把 `src/Clash/List/*.list` 转换为 `src/Clash/Yaml/*.yaml`。

`Yaml/` 是派生成品目录，不建议手工修改。需要维护规则时应修改 `List/` 中的源文件。

执行命令：

```sh
pnpm run generateClashYaml
```

## generateMrsRules.js

用于把 `src/Clash/List/*.list` 拆分并转换为 `src/Clash/MRS/*`。

脚本职责：

1. 读取 `src/Clash/List/*.list`。
2. 将 `DOMAIN`、`DOMAIN-SUFFIX` 转为 domain provider 临时输入。
3. 将 `IP-CIDR`、`IP-CIDR6` 转为 ipcidr provider 临时输入。
4. 将 `DOMAIN-KEYWORD`、`PROCESS-NAME`、`DST-PORT`、`IP-ASN` 等无法转换为 `mrs` 的规则写入 `<RuleName>.classical.list`。
5. 调用 `mihomo convert-ruleset domain text` 生成 `<RuleName>.domain.mrs`。
6. 调用 `mihomo convert-ruleset ipcidr text` 生成 `<RuleName>.ipcidr.mrs`。

分类逻辑故意使用白名单：

```text
DOMAIN, DOMAIN-SUFFIX -> domain mrs
IP-CIDR, IP-CIDR6     -> ipcidr mrs
其它规则类型          -> classical list
```

这样新增未知规则类型时不会被误转，也不会丢失。需要支持更多类型时，先确认 mihomo `mrs` 是否支持对应 `behavior`，再修改脚本分类。

执行命令：

```sh
pnpm run generateClashMrs
```

也可以一次生成 Clash 全部派生产物：

```sh
pnpm run generateClashRules
```

## GitHub Actions 顺序

推荐在自动任务中按以下顺序执行：

```sh
pnpm run generateDirectAppList
pnpm run generateClashYaml
pnpm run generateClashMrs
```

原因是 `CustomDirectApp.list` 本身是脚本生成的源规则，必须先更新它，再生成 `Yaml/` 和 `MRS/` 成品。

## MRS 生成依赖

生成 `.mrs` 需要安装 mihomo，并确保命令行可以直接执行 `mihomo`。

官方 rule-provider 文档说明：`format` 支持 `yaml` / `text` / `mrs`，但 `mrs` 目前只支持 `behavior: domain` 和 `behavior: ipcidr`。转换命令形态如下：

```sh
mihomo convert-ruleset domain text input.domain.txt output.domain.mrs
mihomo convert-ruleset ipcidr text input.ipcidr.txt output.ipcidr.mrs
```

macOS 本地建议用 Homebrew 安装：

```sh
brew install mihomo
```

GitHub Actions 建议下载对应 Linux amd64 release 二进制，或使用可复现的安装步骤把 `mihomo` 放入 `PATH`。

本仓库的 GitHub Actions 当前会从 `MetaCubeX/mihomo` latest release 查找 `mihomo-linux-amd64-v1-*.gz`，解压后放入 `/usr/local/bin/mihomo`。

## 配置校验注意

可以用下面的命令做 mihomo 配置测试：

```sh
mihomo -t -d /tmp/mihomo-check -f src/Clash/RemoteConfig/Lainbo-advanced.local.yaml
```

`-d /tmp/mihomo-check` 是为了避免 mihomo 在沙盒或受限环境下尝试写入用户目录。

如果机器处于 fake-ip/TUN 环境，或者 GitHub 解析被代理链路影响，测试可能失败在 geodata 下载阶段，例如 `can't download MMDB` 或 `dns resolve failed`。这种失败不等价于 MRS provider 配置错误。先用 YAML 解析和 RULE-SET provider 存在性检查确认结构问题：

```sh
ruby -e "require 'yaml'; data = YAML.load_file('src/Clash/RemoteConfig/Lainbo-advanced.local.yaml'); providers = data.fetch('rule-providers').keys; missing = []; data.fetch('rules').each { |rule| parts = rule.split(',', 3); missing << parts[1] if parts[0] == 'RULE-SET' && !providers.include?(parts[1]) }; abort(missing.join(%(\n))) unless missing.empty?; puts 'yaml ok'; puts 'all RULE-SET providers exist'"
```

参考文档：

- https://wiki.metacubex.one/config/rule-providers/
- https://wiki.metacubex.one/en/config/rule-providers/
