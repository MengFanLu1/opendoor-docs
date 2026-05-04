# CC Switch 一键导入

OpenDoor 支持通过 CC Switch 一键导入 Claude Code、Codex、Gemini CLI 的配置，推荐优先使用这种方式管理多个中转站。

## 下载 CC Switch

前往 GitHub Releases 下载并安装：

[CC Switch 下载地址](https://github.com/farion1231/cc-switch/releases)

## 为什么推荐使用 CC Switch

CC Switch 是一个本地配置切换工具，用来管理 Claude Code、Codex、Gemini CLI 等客户端的 API 环境配置。

它的核心作用是把不同中转站、不同 API Key、不同客户端的环境变量集中管理起来。你可以把 OpenDoor 和其他备用中转站都导入 CC Switch，需要切换时直接选择对应配置，不需要反复手动修改本机环境变量或配置文件。

我们推荐使用 CC Switch，是因为现在可用的 AI 中转站比较多，同时由于官方对大陆用户的一些风控限制，中转站的可用性和稳定性可能会随时波动。使用 CC Switch 管理多个中转站配置后，当某个节点或中转站出现问题时，可以快速切换到其他配置，减少排查和恢复时间。

## 从 OpenDoor 一键导入

进入 OpenDoor 控制台的「API Key」页面，在对应密钥右侧点击「导入 CC Switch」。

![导入 CC Switch](/guide/cc-switch-import.png)

然后按以下步骤操作：

1. 选择需要导入的客户端，例如 Claude Code、Codex 或 Gemini。
2. 点击后会唤起 CC Switch，并自动导入 OpenDoor API 的地址和 API Key。
3. 导入完成后，一定要回到 CC Switch 的配置列表中点击「启用」，否则当前客户端不会切换到刚导入的配置。

![唤起 CC Switch](/guide/cc-switch-import-2.png)

![确认导入到 CC Switch](/guide/cc-switch-import-3.png)

完成启用后，再启动对应 CLI 客户端即可使用 OpenDoor 配置。

## 地址规则

OpenDoor 会根据客户端自动处理接口地址：

- Claude Code：使用 `https://api.code-opendoor.com`
- Gemini CLI：使用 `https://api.code-opendoor.com`
- Codex：使用 `https://api.code-opendoor.com/v1`

也就是说，使用平台的「导入 CC Switch」按钮时，不需要手动区分是否带 `/v1`。
