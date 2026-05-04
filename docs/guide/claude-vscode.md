# Claude Code VS Code 插件配置

本页介绍如何在 VS Code 中配置 Claude Code 插件使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 安装插件

打开 VS Code，进入扩展市场，搜索：

```text
Claude Code
```

点击安装。安装完成后，VS Code 侧边栏或编辑器右上角会出现 Claude Code 的图标。

如果安装后没有看到入口，可以执行以下操作：

1. 打开一个代码文件。
2. 按 `Cmd+Shift+P`（macOS）或 `Ctrl+Shift+P`（Windows / Linux）。
3. 输入 `Developer: Reload Window` 并回车，重新加载 VS Code。

## 推荐方式：复用 Claude CLI 配置

Claude Code VS Code 插件和 Claude CLI 会共享 `~/.claude/settings.json` 配置。如果你已经完成 [Claude CLI 配置](./claude)，通常不需要重新配置 API Key。

如果还没有配置，可以手动写入以下文件。

macOS / Linux 配置文件路径：

```text
~/.claude/settings.json
```

Windows 配置文件路径：

```text
%USERPROFILE%\.claude\settings.json
```

写入以下内容：

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.code-opendoor.com",
    "ANTHROPIC_MODEL": "claude-sonnet-4-6"
  }
}
```

其中：

- `ANTHROPIC_AUTH_TOKEN` 填写你的 OpenDoor API Key。
- `ANTHROPIC_BASE_URL` 使用 `https://api.code-opendoor.com`，不要添加 `/v1`。
- `ANTHROPIC_MODEL` 是默认模型，可改成 [平台模型 ID](./models) 中的 Claude 模型。

如果不想指定默认模型，可以删除 `ANTHROPIC_MODEL` 这一行。

## 关闭官方登录提示

使用 OpenDoor API Key 时，不需要登录 Claude 官网账号。如果插件仍然提示登录，可以在 VS Code 设置中关闭登录提示。

操作方式：

1. 打开 VS Code 设置。
2. 搜索 `Claude Code login`。
3. 勾选 `Disable Login Prompt`。

也可以直接在 VS Code 的 `settings.json` 中加入：

```json
{
  "claudeCode.disableLoginPrompt": true
}
```

修改后建议执行 `Developer: Reload Window` 重新加载 VS Code。

## 开始使用

配置完成后，可以通过以下方式打开 Claude Code：

1. 点击 VS Code 侧边栏的 Claude Code 图标。
2. 点击编辑器右上角的 Claude Code 图标。
3. 按 `Cmd+Shift+P`（macOS）或 `Ctrl+Shift+P`（Windows / Linux），搜索 `Claude Code` 并打开。

打开面板后，直接输入需求即可。插件会读取当前项目文件，并在修改代码前请求确认。

## 在 VS Code 终端中使用 CLI

如果你更习惯命令行，也可以在 VS Code 内置终端中运行：

```bash
claude
```

Claude CLI 会自动和 VS Code 集成，可以在编辑器中查看 diff、引用当前文件和共享诊断信息。

如果你是在外部终端启动 Claude CLI，可以进入 Claude 后执行：

```text
/ide
```

连接当前 VS Code 窗口。

## 常见问题

### 插件仍然要求登录

先确认 `~/.claude/settings.json` 中已经写入 `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL`，然后在 VS Code 设置中启用 `Claude Code: Disable Login Prompt`。

### 配置后没有生效

执行 `Developer: Reload Window` 重新加载 VS Code。如果仍未生效，可以完全退出 VS Code 后重新打开。

### API 地址应该填哪个

Claude Code 使用：

```text
https://api.code-opendoor.com
```

不要写成 `https://api.code-opendoor.com/v1`。`/v1` 是 Codex、OpenCode 等 OpenAI-compatible 客户端常用的地址。
