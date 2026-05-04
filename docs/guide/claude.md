# Claude CLI 配置

本页介绍如何配置 Claude Code CLI 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 推荐方式：控制台一键接入

登录 OpenDoor 控制台，进入「一键接入」页面。

选择你的 API Key 和节点后，切换到「Claude Code」，复制页面生成的安装命令执行即可。安装脚本会自动安装所需环境，并写入 API 地址和 API Key。

![控制台一键接入](/guide/cli-one-click.png)

macOS / Linux 使用终端执行；Windows 用户使用 PowerShell 执行。Windows 下 Claude Code 需要在 Git Bash 中运行，安装脚本会自动处理 Git for Windows。

## 手动配置

如果你已经安装好 Claude Code，也可以手动配置。

### 方式一：修改配置文件

Claude Code 会读取 `~/.claude/settings.json` 中的环境变量配置。

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
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.code-opendoor.com"
  }
}
```

如果首次启动 Claude Code 时仍进入初始化流程，可以再创建或修改 `~/.claude.json`：

macOS / Linux：

```text
~/.claude.json
```

Windows：

```text
%USERPROFILE%\.claude.json
```

写入以下内容：

```json
{
  "hasCompletedOnboarding": true
}
```

### 方式二：设置 API 地址

```bash
claude config set --global apiUrl https://api.code-opendoor.com
```

### 方式三：使用环境变量

macOS / Linux：

```bash
export ANTHROPIC_BASE_URL="https://api.code-opendoor.com"
export ANTHROPIC_AUTH_TOKEN="YOUR_API_KEY"
```

Windows CMD：

```bat
set ANTHROPIC_BASE_URL=https://api.code-opendoor.com
set ANTHROPIC_AUTH_TOKEN=YOUR_API_KEY
```

PowerShell：

```powershell
$env:ANTHROPIC_BASE_URL = "https://api.code-opendoor.com"
$env:ANTHROPIC_AUTH_TOKEN = "YOUR_API_KEY"
```

## 启动

配置完成后，在终端运行：

```bash
claude
```

如果后续需要更换 Key，可以回到 OpenDoor 控制台重新复制一键接入命令，或修改 `~/.claude/settings.json` 中的 `ANTHROPIC_AUTH_TOKEN`。
