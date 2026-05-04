# Codex IDEA 插件说明

本页说明 IntelliJ IDEA、PyCharm、WebStorm、GoLand 等 JetBrains IDE 中 Codex 官方集成和 OpenDoor 的关系。

结论先说：JetBrains AI Assistant 内置的 Codex 官方集成，当前不适合直接配置 OpenDoor 中转站。使用 OpenDoor 推荐在 IDEA 内置终端中运行 [Codex CLI](./codex)，或使用 [JetBrains AI Assistant OpenAI Compatible 配置](./jetbrains-openai-compatible)。

## Codex IDEA 插件是什么

JetBrains 里的 Codex 通常不是单独安装的 VS Code 插件，而是 JetBrains AI Assistant 中集成的 Codex Agent。

它可以通过以下方式使用：

- JetBrains AI 订阅。
- ChatGPT 账号登录。
- OpenAI 官方 API Key。

这些方式都属于 JetBrains AI Assistant 的认证体系，不等同于本地 Codex CLI 的 `~/.codex/config.toml` 配置。

## 能不能直接配置 OpenDoor API Key

当前不建议。JetBrains 官方说明中，Codex 的 BYOK 模式要求使用 OpenAI 官方签发的 API Key，第三方 API Key 当前不支持，即使这个第三方 Key 可以访问 OpenAI 模型。

因此，不建议在 Codex IDEA 集成中尝试填写：

```text
https://api.code-opendoor.com/v1
```

也不建议手动修改 JetBrains 缓存目录里的 Codex 配置文件。IDE 更新或 Agent 重装后，这些文件可能被覆盖，而且不一定能绕过官方认证限制。

## 推荐方式一：在 IDEA 终端中使用 Codex CLI

如果你的目标是使用 OpenDoor 中转站，最稳妥的方式是在 IDEA 内置终端中运行 Codex CLI。

先完成 [Codex CLI 配置](./codex)，确保本地配置文件已经写入：

```text
~/.codex/config.toml
~/.codex/auth.json
```

然后在 IDEA 内置终端中运行：

```bash
codex
```

这样做的优点是：

- 可以正常使用 OpenDoor API Key。
- 可以使用 `gpt-5.5`、`gpt-5.4`、`gpt-5.3-codex` 等 [平台模型 ID](./models)。
- 不受 JetBrains Codex BYOK 只支持 OpenAI 官方 Key 的限制。

需要注意的是，这种方式是终端体验，不是 JetBrains AI Assistant 原生 Codex 面板。

## 推荐方式二：使用 OpenAI Compatible Provider

如果你更想在 JetBrains AI Assistant 的聊天面板中使用 OpenDoor，可以配置 OpenAI-compatible Provider。

配置方式见：

[JetBrains AI Assistant OpenAI Compatible 配置](./jetbrains-openai-compatible)

这种方式适合普通 AI Chat、解释代码、生成代码片段等场景。但它不等同于 Codex Agent 官方集成，Agent 能力、审批流程和上下文行为可能不同。

## 如果你仍想使用官方 Codex 集成

可以按 JetBrains AI Assistant 的官方流程使用：

1. 安装并启用 JetBrains AI Assistant。
2. 打开 AI Chat。
3. 选择 Codex。
4. 使用 JetBrains AI 订阅、ChatGPT 账号或 OpenAI 官方 API Key 激活。

如果你选择 OpenAI API Key 模式，请注意这里需要 OpenAI 官方 Key，不是 OpenDoor Key。

## 常见问题

### `~/.codex/config.toml` 会被 Codex IDEA 插件读取吗

不要按这个预期配置。JetBrains AI Assistant 内置的 Codex Agent 使用 JetBrains 自己的 Agent 安装目录和认证流程，不等同于你在终端里安装的 Codex CLI。

### 能不能把 OpenDoor Key 当作 OpenAI Key 填进去

不建议。即使格式相似，JetBrains Codex BYOK 当前要求 OpenAI 官方 Key。OpenDoor Key 应用于 Codex CLI 或 OpenAI-compatible Provider。

### 在 IDEA 中使用 OpenDoor，应该选哪篇教程

如果你要 Agent 终端体验，使用 [Codex CLI 配置](./codex) 后在 IDEA 终端运行 `codex`。

如果你要 IDEA AI Chat 面板体验，使用 [JetBrains AI Assistant OpenAI Compatible 配置](./jetbrains-openai-compatible)。
