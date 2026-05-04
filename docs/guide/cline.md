# Cline 配置

本页介绍如何配置 Cline 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 安装 Cline

Cline 是 VS Code / Cursor 中常用的 AI 编程插件。

打开 VS Code 或 Cursor，进入扩展市场，搜索：

```text
Cline
```

安装完成后，侧边栏会出现 Cline 图标。

首次打开 Cline 时，选择 `Bring my own API key`，表示使用你自己的 API Key 和模型服务。

![选择自带 API Key](/guide/cline-bring-api-key.png)

## 选择正确的 Provider

使用 OpenDoor 中转站时，需要选择：

```text
OpenAI Compatible
```

不要选择普通的 `OpenAI` Provider。普通 `OpenAI` Provider 主要面向官方 OpenAI API，不一定提供自定义 Base URL；第三方中转站应该走 `OpenAI Compatible`。

## 配置 OpenDoor 中转站

打开 Cline 设置：

1. 点击 Cline 面板右上角的设置图标。
2. 找到 `API Provider`。
3. 选择 `OpenAI Compatible`。

然后填写：

| 配置项 | 填写内容 |
| --- | --- |
| Base URL | `https://api.code-opendoor.com/v1` |
| API Key | 你的 OpenDoor API Key |
| Model ID | `gpt-5.5` |

如果页面里显示的是 `OpenAI Compatible API Key`，同样填写你的 OpenDoor API Key。

![配置 OpenAI Compatible Provider](/guide/cline-openai-compatible-config.png)

## 推荐模型

推荐先使用：

```text
gpt-5.5
```

如果你想使用其他模型，可以填写 [平台模型 ID](./models) 中的模型。

Codex：

```text
gpt-5.5
gpt-5.4
gpt-5.3-codex
```

Claude：

```text
claude-sonnet-4-6
claude-opus-4-7
```

Gemini：

```text
gemini-3.1-pro
gemini-3-flash
```

## 高级模型参数

Cline 的 OpenAI Compatible 配置中通常还可以设置模型参数，例如：

- Max Output Tokens
- Context Window
- Image Support
- Computer Use

如果你只是正常使用代码助手，保持默认即可。

如果你要手动填写上下文窗口，可以按模型实际能力填写。不要只靠 Cline 本地参数强行放大上下文；服务端是否支持更长上下文，仍然取决于 OpenDoor 后端和对应模型能力。

## Cline CLI 配置

如果你使用 Cline CLI，也可以直接用命令配置 OpenDoor。

```bash
cline auth -p openai -k YOUR_API_KEY -b https://api.code-opendoor.com/v1 -m gpt-5.5
```

其中：

- `-p openai` 表示使用 OpenAI Compatible Provider。
- `-k` 后面填写你的 OpenDoor API Key。
- `-b` 后面填写 OpenDoor Base URL。
- `-m` 后面填写模型 ID。

配置完成后，可以测试：

```bash
cline "你好，介绍一下当前项目"
```

## 常见问题

### API Provider 应该选哪个

选择：

```text
OpenAI Compatible
```

不要选择普通的 `OpenAI`。

### API 地址应该填哪个

Cline 使用 OpenAI-compatible 接口，地址需要带 `/v1`：

```text
https://api.code-opendoor.com/v1
```

不要写成 `https://api.code-opendoor.com`。

### Model ID 应该怎么写

直接填写模型 ID，不需要加 Provider 前缀。例如：

```text
gpt-5.5
claude-sonnet-4-6
gemini-3.1-pro
```

不要写成 `opendoor/gpt-5.5`。`opendoor/模型ID` 是 OpenCode、OpenClaw 这类客户端里的 Provider 前缀写法，Cline 的 OpenAI Compatible Provider 不需要这样写。

### 提示 Model Not Found

检查三项：

1. Base URL 是否是 `https://api.code-opendoor.com/v1`。
2. API Key 是否填写正确。
3. Model ID 是否来自 [平台模型 ID](./models)。

### 提示 Invalid API Key

确认你填写的是 OpenDoor 控制台创建的 API Key，而不是 OpenAI、Anthropic 或 Google 的官方 Key。
