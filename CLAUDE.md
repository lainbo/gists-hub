# 项目约定

- 规则文件和派生成品的地址会被已分发的配置固定引用（例如 `src/Clash/RemoteConfig/Lainbo-advanced.local.yaml`），拿到配置的人通常不会重新下载模板。调整分流行为时只改规则内容，不改名、不删除已发布的文件，也不要为此改动已分发配置里的 provider 地址和策略组名称。详见 `src/Clash/README.md`。
- 规则源头是 `src/Clash/List/*.list`，`src/Clash/Yaml/`、`src/Clash/MRS/`、`src/QuantumultX/List/` 由脚本生成，不手工修改。
