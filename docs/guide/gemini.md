# Gemini CLI 配置

本页介绍如何配置 Gemini CLI 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 推荐方式：控制台一键接入

登录 OpenDoor 控制台，进入「一键接入」页面。

选择你的 API Key 和节点后，切换到「Gemini CLI」，复制页面生成的安装命令执行即可。安装脚本会自动安装所需环境，并写入 Gemini CLI 配置。

![控制台一键接入](/guide/cli-one-click.png)

## 手动配置

如果你已经安装好 Gemini CLI，可以手动写入配置文件。

### 1. 配置环境文件

macOS / Linux 配置文件路径：

```text
~/.gemini/.env
```

Windows 配置文件路径：

```text
%USERPROFILE%\.gemini\.env
```

写入以下内容：

```bash
GOOGLE_GEMINI_BASE_URL=https://api.code-opendoor.com
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-3.1-pro
```

### 2. 配置认证方式

macOS / Linux 配置文件路径：

```text
~/.gemini/settings.json
```

Windows 配置文件路径：

```text
%USERPROFILE%\.gemini\settings.json
```

写入以下内容：

```json
{
  "ide": {
    "enabled": true
  },
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}
```

## 环境变量方式

也可以不写 `.env` 文件，直接设置环境变量。

macOS / Linux：

```bash
export GOOGLE_GEMINI_BASE_URL="https://api.code-opendoor.com"
export GEMINI_API_KEY="YOUR_API_KEY"
```

Windows CMD：

```bat
set GOOGLE_GEMINI_BASE_URL=https://api.code-opendoor.com
set GEMINI_API_KEY=YOUR_API_KEY
```

PowerShell：

```powershell
$env:GOOGLE_GEMINI_BASE_URL = "https://api.code-opendoor.com"
$env:GEMINI_API_KEY = "YOUR_API_KEY"
```

## 启动

配置完成后，在终端运行：

```bash
gemini
```
