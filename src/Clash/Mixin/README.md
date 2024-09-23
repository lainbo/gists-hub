## 订阅预处理（已停止维护且不再使用，仅做代码留存）

### 区别
- 仅DNS.js: DNS修改
- 通用.js: 包含Chat GPT使用美国节点，DNS修改，Adobe盗版拦截，测速地址修改
- Adobe防弹窗.js: 仅包含Adobe盗版拦截
- 设置鉴权.js: 用于设置Clash的鉴权防止订阅被盗取

### Feature
- 使用正则配置过滤节点，生成美国节点分组，以供Chat GPT相关接口自动走高质量美国节点
- reject Adobe验证正版相关域名
- 设置默认DNS为阿里和腾讯的；DoH为阿里、腾讯和OpenDNS；fallback为Cloudflare和OpenDNS

## How to use
### Clash Verge
1. 配置 - 新建
2. 类型Script、名称随意、描述随意
3. 右键新建的配置 - 编辑文件
4. 右键新建出来的配置，启用
