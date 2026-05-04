# Cherry Studio 配置

本页介绍如何配置 Cherry Studio 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 安装 Cherry Studio

访问 Cherry Studio 官网下载安装：

```text
https://cherry-ai.com
```

安装完成后打开 Cherry Studio，进入设置页面。

## 添加 OpenDoor 服务商

进入 Cherry Studio 设置：

```text
设置 -> 模型服务
```

点击服务商列表底部的 `添加` 或 `+ Add`，新建一个自定义服务商。

填写：

| 配置项 | 填写内容 |
| --- | --- |
| 服务商名称 | `OpenDoor` |
| 服务商类型 | `OpenAI` |

Cherry Studio 的自定义服务商类型里选择 `OpenAI` 即可，因为 OpenDoor 提供的是 OpenAI-compatible 接口。

## 配置 API Key 和地址

添加服务商后，在 OpenDoor 服务商详情中填写：

| 配置项 | 填写内容 |
| --- | --- |
| API Key | 你的 OpenDoor API Key |
| API 地址 | `https://api.code-opendoor.com/v1` |

如果你的 Cherry Studio 版本要求填写“根地址”，可以改填：

```text
https://api.code-opendoor.com
```

判断方式很简单：如果界面预览出的完整请求地址已经包含 `/v1/chat/completions`，就填写根地址 `https://api.code-opendoor.com`；如果界面只让你填写 Base URL，则填写 `https://api.code-opendoor.com/v1`。

配置完成后，打开服务商右上角开关。

## 添加模型

点击 OpenDoor 服务商里的 `管理` 或 `添加模型`，手动添加模型 ID。

推荐先添加：

```text
gpt-5.5
```

也可以继续添加：

```text
gpt-5.4
gpt-5.3-codex
claude-sonnet-4-6
claude-opus-4-7
gemini-3.1-pro
gemini-3-flash
```

更多可用模型见 [平台模型 ID](./models)。

## 设置默认模型

进入 Cherry Studio 的默认模型设置，把聊天模型改成：

```text
OpenDoor / gpt-5.5
```

如果你经常写代码，也可以把代码相关场景设置为：

```text
OpenDoor / claude-sonnet-4-6
```

或：

```text
OpenDoor / gpt-5.5
```

保存后回到聊天页面，选择 OpenDoor 服务商和对应模型即可开始使用。

## 常见问题

### 服务商类型应该选哪个

选择：

```text
OpenAI
```

不要单独选择 Anthropic 或 Gemini。OpenDoor 在 Cherry Studio 中推荐统一按 OpenAI-compatible 方式接入。

### API 地址到底带不带 `/v1`

优先填写：

```text
https://api.code-opendoor.com/v1
```

如果 Cherry Studio 当前版本会自动拼接 `/v1/chat/completions`，导致最终地址变成 `/v1/v1/chat/completions`，就改成：

```text
https://api.code-opendoor.com
```

### 模型需要写 `opendoor/gpt-5.5` 吗

不需要。Cherry Studio 中直接填写模型 ID：

```text
gpt-5.5
```

不要写成：

```text
opendoor/gpt-5.5
```

### 检查 API Key 失败怎么办

检查三项：

1. API Key 是否来自 OpenDoor 控制台。
2. API 地址是否正确。
3. 至少添加了一个 OpenDoor 支持的模型 ID。

如果 `https://api.code-opendoor.com/v1` 检查失败，可以尝试把 API 地址改成 `https://api.code-opendoor.com` 后再检查。

## 参考

- [Cherry Studio 自定义服务商文档](https://docs.cherry-ai.com/pre-basic/providers/zi-ding-yi-fu-wu-shang)
- [Cherry Studio 模型服务设置](https://docs.cherry-ai.com/en-us/pre-basic/settings/providers)
