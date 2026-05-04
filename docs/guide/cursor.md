# Cursor 配置

本页介绍如何在 Cursor 中使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 先说明：Cursor 有两类用法

Cursor 既是独立 AI 编辑器，也是 VS Code Fork，所以接入 OpenDoor 有两类方式：

- 推荐方式：在 Cursor 中安装 Cline、Claude Code 等插件，或直接在 Cursor 终端中运行 Claude / Codex / Gemini CLI。
- 可尝试方式：使用 Cursor 内置 AI 的 API Key 配置。如果你的 Cursor 版本提供自定义 Base URL，可以尝试接入 OpenDoor。

Cursor 官方文档中，自定义 API Key 主要面向 OpenAI、Anthropic、Google、Azure OpenAI、AWS Bedrock 等官方 Provider，并说明自定义 API Key 只适用于标准聊天模型；Tab Completion 等专用能力仍会使用 Cursor 内置模型。因此，OpenDoor 在 Cursor 中更推荐走插件或 CLI。

## 推荐方式一：使用 Cline

Cursor 可以安装 VS Code 扩展，所以可以直接安装 Cline。

打开 Cursor 扩展市场，搜索：

```text
Cline
```

安装后按 [Cline 配置](./cline) 填写：

| 配置项 | 填写内容 |
| --- | --- |
| API Provider | `OpenAI Compatible` |
| Base URL | `https://api.code-opendoor.com/v1` |
| API Key | 你的 OpenDoor API Key |
| Model ID | `gpt-5.5` |

这种方式最稳定，适合在 Cursor 中使用 Agent、读写项目文件和执行代码任务。

## 推荐方式二：使用 Claude Code 插件

Cursor 也可以安装 Claude Code 插件。

打开 Cursor 扩展市场，搜索：

```text
Claude Code
```

安装后复用 Claude CLI 配置。macOS / Linux 配置文件：

```text
~/.claude/settings.json
```

Windows 配置文件：

```text
%USERPROFILE%\.claude\settings.json
```

写入：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.code-opendoor.com",
    "ANTHROPIC_MODEL": "claude-sonnet-4-6"
  }
}
```

如果 Cursor 中 Claude Code 插件仍然要求登录或不识别第三方端点，参考：

[VS Code / Cursor 第三方端点修复](./fix-vscode-cursor-third-party-endpoint)

## 推荐方式三：在 Cursor 终端中使用 CLI

如果你已经完成官方 CLI 配置，可以直接在 Cursor 内置终端中运行。

Claude：

```bash
claude
```

Codex：

```bash
codex
```

Gemini：

```bash
gemini
```

对应配置教程：

- [Claude CLI 配置](./claude)
- [Codex CLI 配置](./codex)
- [Gemini CLI 配置](./gemini)

这种方式不依赖 Cursor 内置 AI 的 Provider 限制，适合想稳定使用 OpenDoor 的用户。

## 可尝试：Cursor 内置 AI 配置

如果你的 Cursor 版本提供 OpenAI API Key 和自定义 Base URL 入口，可以按下面方式尝试。

打开：

```text
Cursor Settings -> Models
```

找到 OpenAI API Key 或自定义模型相关设置，填写：

| 配置项 | 填写内容 |
| --- | --- |
| OpenAI API Key | 你的 OpenDoor API Key |
| Override OpenAI Base URL / Base URL | `https://api.code-opendoor.com/v1` |
| Model | `gpt-5.5` |

如果页面没有 `Override OpenAI Base URL`、`Base URL` 或类似入口，说明当前 Cursor 版本不适合直接配置第三方中转站。此时请改用 Cline、Claude Code 插件或 CLI。

## 使用限制

Cursor 内置 AI 的自定义 API Key 有几个限制：

- 主要用于标准聊天模型。
- Tab Completion 等专用能力仍然使用 Cursor 内置模型。
- 不一定支持任意第三方 OpenAI-compatible Base URL。
- 不一定支持 OpenDoor 的所有模型 ID。

因此，如果你需要稳定接入 OpenDoor，不建议把 Cursor 内置 AI 作为首选方式。

## 常见问题

### Cursor 可以直接配置 OpenDoor 吗

取决于你的 Cursor 版本是否提供自定义 Base URL。官方稳定路径是配置官方 Provider 的 API Key；第三方中转更推荐通过 Cline、Claude Code 插件或 CLI 使用。

### Cursor 中最推荐哪种方式

推荐顺序：

1. Cline 插件。
2. Claude Code 插件。
3. Cursor 内置终端运行 Claude / Codex / Gemini CLI。
4. Cursor 内置 AI 的自定义 Base URL。

### Base URL 应该填哪个

OpenAI-compatible 客户端使用：

```text
https://api.code-opendoor.com/v1
```

Claude Code 插件和 Claude CLI 使用：

```text
https://api.code-opendoor.com
```

不要混用。

### 模型应该怎么写

Cursor / Cline 这类 OpenAI-compatible 配置中通常直接填写模型 ID：

```text
gpt-5.5
claude-sonnet-4-6
gemini-3.1-pro
```

不要写成：

```text
opendoor/gpt-5.5
```

### Cursor 内置 AI 验证失败怎么办

优先改用 Cline。Cursor 内置 AI 对第三方 Base URL 的支持不稳定，验证失败不一定是 OpenDoor API Key 错误。

## 参考

- [Cursor API Keys 官方文档](https://docs.cursor.com/zh/settings/api-keys)
