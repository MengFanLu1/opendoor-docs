# 平台模型 ID

本页整理 OpenDoor 当前提供的主要文本模型 ID。配置 Claude Code、Codex、Gemini CLI、OpenCode 或其他兼容客户端时，需要在模型字段中填写对应的模型 ID。

## Claude

Claude 模型适合代码理解、复杂重构、长上下文分析和日常对话。

| 模型 ID | 说明 |
| --- | --- |
| `claude-haiku-4-5-20251001` | Haiku 系列，适合轻量任务和低成本调用 |
| `claude-sonnet-4-5-20250929` | Sonnet 4.5，适合大多数代码和文档任务 |
| `claude-sonnet-4-6` | Sonnet 4.6，适合更高质量的代码与推理任务 |
| `claude-opus-4-5-20251101` | Opus 4.5，适合复杂推理和高质量生成 |
| `claude-opus-4-6` | Opus 4.6，适合更复杂的分析、规划和代码任务 |
| `claude-opus-4-7` | Opus 4.7，适合最高质量要求的复杂任务 |

## Codex

Codex 模型适合编程、代码审查、项目级修改和软件工程任务。

| 模型 ID | 说明 |
| --- | --- |
| `gpt-5.3-codex` | Codex 专用模型，适合代码生成、修改和调试 |
| `gpt-5.4` | 通用高质量模型，适合代码、写作和复杂问答 |
| `gpt-5.5` | 更强的通用模型，适合复杂代码任务和高质量推理 |

## Gemini

Gemini 模型适合通用对话、长上下文处理和多模态相关任务。

| 模型 ID | 说明 |
| --- | --- |
| `gemini-3-flash` | Flash 系列，适合速度优先和轻量任务 |
| `gemini-3.1-pro` | Pro 系列，适合复杂推理、代码和长上下文任务 |

## 配置示例

不同客户端的模型字段写法略有不同。

Codex CLI：

```toml
model = "gpt-5.5"
```

Gemini CLI：

```bash
GEMINI_MODEL=gemini-3.1-pro
```

OpenCode：

```json
"model": "opendoor/gpt-5.5"
```

在 OpenCode 中，模型需要带上 Provider 前缀。比如要使用 Claude Sonnet，可以写成：

```json
"model": "opendoor/claude-sonnet-4-6"
```

如果你使用的是其他兼容 OpenAI 格式的客户端，通常直接填写模型 ID 即可，例如 `gpt-5.5`、`claude-sonnet-4-6` 或 `gemini-3.1-pro`。
