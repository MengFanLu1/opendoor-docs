# CLI 安装教程

本页介绍如何安装 Claude Code、Codex CLI 和 Gemini CLI。

开始前建议先完成 [快速开始](./setup)，注册 OpenDoor 账号并创建 API Key。

## 推荐方式：使用 OpenDoor 一键安装和配置

最推荐的方式是直接使用 OpenDoor 控制台提供的一键安装和一键配置命令。

登录 OpenDoor 控制台，进入「一键接入」页面：

1. 选择你的 API Key。
2. 选择合适的节点。
3. 选择要安装的客户端，例如 Claude Code、Codex 或 Gemini CLI。
4. 复制页面生成的命令，在终端中执行。

一键脚本会自动处理常见依赖、安装对应 CLI，并写入 OpenDoor 的 API 地址和 API Key。对大多数用户来说，这比手动安装和手动修改配置文件更稳，也更不容易填错地址。

如果你只想配置已经安装好的客户端，也可以继续使用控制台生成的一键配置命令。

macOS / Linux 用户在终端中执行命令；Windows 用户通常在 PowerShell 中执行命令。部分 CLI 在 Windows 下推荐配合 WSL 或 Git Bash 使用，控制台脚本会按客户端类型给出对应提示。

## 手动安装前准备

如果你选择手动安装，建议先确认已经安装 Node.js 和 npm。

查看版本：

```bash
node -v
npm -v
```

建议使用 Node.js 20 或更新版本。Claude Code 最低要求 Node.js 18，但 Gemini CLI 等工具对新版 Node.js 兼容性更好。

## 安装 Claude Code

Claude Code 官方推荐使用安装脚本或 npm 安装。

macOS / Linux / WSL：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell：

```powershell
irm https://claude.ai/install.ps1 | iex
```

如果你更习惯 npm，也可以使用：

```bash
npm install -g @anthropic-ai/claude-code
```

不要使用 `sudo npm install -g @anthropic-ai/claude-code`，容易造成后续更新和权限问题。

安装完成后检查：

```bash
claude --version
```

安装完成后，继续查看 [Claude CLI 配置](./claude)，把 Claude Code 接入 OpenDoor。

## 安装 Codex CLI

Codex CLI 使用 npm 安装。

```bash
npm install -g @openai/codex
```

安装完成后检查：

```bash
codex --version
```

如果后续需要升级，可以运行：

```bash
npm install -g @openai/codex@latest
```

安装完成后，继续查看 [Codex CLI 配置](./codex)，把 Codex 接入 OpenDoor。

Windows 用户如遇到兼容性问题，推荐在 WSL 中安装和运行 Codex。

## 安装 Gemini CLI

Gemini CLI 使用 npm 安装。

```bash
npm install -g @google/gemini-cli
```

如果你不想全局安装，也可以临时运行：

```bash
npx @google/gemini-cli
```

安装完成后检查：

```bash
gemini --version
```

安装完成后，继续查看 [Gemini CLI 配置](./gemini)，把 Gemini CLI 接入 OpenDoor。

## 下一步

安装完成后，根据你使用的客户端继续配置：

- [Claude CLI 配置](./claude)
- [Codex CLI 配置](./codex)
- [Gemini CLI 配置](./gemini)

如果你使用 VS Code，也可以继续查看：

- [Claude Code VS Code 插件配置](./claude-vscode)
- [Codex VS Code 插件配置](./codex-vscode)
- [Gemini CLI VS Code 插件配置](./gemini-vscode)
