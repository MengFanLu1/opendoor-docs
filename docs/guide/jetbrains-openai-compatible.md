# JetBrains AI Assistant OpenAI Compatible 配置

本页介绍如何在 IntelliJ IDEA、PyCharm、WebStorm、GoLand 等 JetBrains IDE 的 AI Assistant 中，通过 OpenAI-compatible Provider 接入 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 适用场景

这种方式适合在 JetBrains AI Assistant 的聊天面板中使用 OpenDoor 模型，例如：

- 解释当前代码。
- 生成代码片段。
- 根据项目上下文回答问题。
- 使用 AI Assistant 的部分编辑器辅助能力。

需要注意的是，OpenAI-compatible Provider 不等同于 Codex Agent 官方集成。如果你要使用 Codex Agent 的完整 Agent 面板，JetBrains 当前要求 OpenAI 官方 API Key，不支持第三方 API Key。

## 安装 AI Assistant

打开 IDEA，进入插件市场：

```text
Settings / Preferences -> Plugins -> Marketplace
```

搜索并安装：

```text
AI Assistant
```

安装完成后，重启 IDEA。

## 添加 OpenAI-compatible Provider

打开设置：

```text
Settings / Preferences -> Tools -> AI Assistant -> Providers & API keys
```

在 `Third-party AI providers` 中选择：

```text
OpenAI-compatible
```

填写以下内容：

```text
URL: https://api.code-opendoor.com/v1
API Key: YOUR_API_KEY
Model: gpt-5.5
```

其中：

- `URL` 必须使用 `https://api.code-opendoor.com/v1`。
- `API Key` 填写你的 OpenDoor API Key。
- `Model` 可以填写 [平台模型 ID](./models) 中的 Codex、Claude 或 Gemini 模型。

推荐先使用：

```text
gpt-5.5
```

如果你希望使用 Claude 模型，可以填写：

```text
claude-sonnet-4-6
```

如果你希望使用 Gemini 模型，可以填写：

```text
gemini-3.1-pro
```

## Tool Calling 设置

如果页面中出现 `Tool calling` 选项，建议先开启。

部分 AI Assistant 功能会依赖工具调用能力。如果开启后测试连接或使用异常，可以再关闭该选项重试。

## 测试连接

填写完成后点击：

```text
Test Connection
```

测试通过后点击 `Apply` 或 `OK` 保存配置。

然后打开 AI Chat，在模型选择器中选择你刚刚配置的 OpenAI-compatible 模型。

## 常见问题

### 这里的地址为什么要带 `/v1`

JetBrains AI Assistant 的 OpenAI-compatible Provider 使用 OpenAI-compatible 接口，因此地址需要写成：

```text
https://api.code-opendoor.com/v1
```

不要写成 `https://api.code-opendoor.com`。

### 模型应该填 `opendoor/gpt-5.5` 吗

不需要。JetBrains AI Assistant 这里通常直接填写模型 ID：

```text
gpt-5.5
```

不要写成：

```text
opendoor/gpt-5.5
```

`opendoor/gpt-5.5` 这种写法主要用于 OpenCode、OpenClaw 等需要 Provider 前缀的客户端。

### 能不能用它替代 Codex IDEA 插件

不能完全替代。OpenAI-compatible Provider 可以让 AI Assistant 使用 OpenDoor 模型，但它不是 Codex Agent 官方集成。

如果你要使用 OpenDoor 的 Codex 模型并获得 Agent 终端体验，推荐使用 [Codex CLI 配置](./codex) 后在 IDEA 内置终端中运行 `codex`。

### 可以配置 Claude 模型吗

可以。如果你的 OpenDoor Key 可用，并且平台提供对应 Claude 模型，可以在模型字段填写：

```text
claude-sonnet-4-6
```

更多模型见 [平台模型 ID](./models)。
