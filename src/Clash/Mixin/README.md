## 订阅预处理

### 区别
- 仅DNS.js：DNS修改
- 通用.js：包含Chat GPT使用美国节点，DNS修改，Adobe盗版拦截，测速地址修改为真实情况
- Adobe防弹窗.js：仅包含Adobe盗版拦截

### Feature
- 使用正则配置过滤节点，生成美国节点分组，以供Chat GPT相关接口自动走高质量美国节点
- reject Adobe验证正版相关域名
- 设置默认DNS为阿里和腾讯的；DoH为阿里、腾讯和OpenDNS；fallback为Cloudflare和OpenDNS
- 如果检测到机场配置的自动测速功能,更改测速地址为更贴近真实访问https协议Cloudflare的测速地址

## How to use
### Clash Verge
1. 配置 - 新建
2. 类型Script、名称随意、描述随意
3. 右键新建的配置 - 编辑文件
4. 粘贴代码，使用`function main`这一行作为开头，保存
5. 右键新建出来的配置，启用

### Clash for Windows
1. Settings - Mixin
2. 把Mixin的Type切换为JavaScript
3. 点击JavaScript后面的Edit
4. 粘贴代码，使用`module.exports.parse`这一行作为开头，右下角绿色按钮保存
5. General - Mixin后面的开关切换为开启
6. Profiles切换一下订阅确保生效
