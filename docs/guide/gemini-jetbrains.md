# Gemini IDEA 插件配置

本页介绍在 IntelliJ IDEA、PyCharm、WebStorm、GoLand 等 JetBrains IDE 中使用 Gemini 相关工具时，如何接入 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 先区分两种 Gemini 入口

JetBrains IDE 中常见的 Gemini 入口有两类：

- Gemini Code Assist：Google 官方 IDE 插件，主要走 Google 账号和 Google 官方服务。
- Gemini CLI Agent / ACP 集成：通过 Gemini CLI 作为 Agent 接入支持 ACP 的 IDE。

如果你要使用 OpenDoor 中转站，推荐使用 Gemini CLI 的配置方式，而不是 Gemini Code Assist 的官方账号插件。

## 推荐方式：配置 Gemini CLI

Gemini CLI 的请求由本地 `gemini` 命令发起，所以中转站配置写在 Gemini CLI 配置中。

如果你已经完成 [Gemini CLI 配置](./gemini)，通常不需要重复配置。

如果还没有配置，可以手动写入以下文件。

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

然后配置认证方式。

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
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}
```

其中：

- `GOOGLE_GEMINI_BASE_URL` 使用 `https://api.code-opendoor.com`，不要添加 `/v1`。
- `GEMINI_API_KEY` 填写你的 OpenDoor API Key。
- `GEMINI_MODEL` 是默认模型，可改成 [平台模型 ID](./models) 中的 Gemini 模型。

## 在 IDEA 中使用 Gemini CLI

打开 IDEA 内置终端，进入当前项目目录后运行：

```bash
gemini
```

这样可以在 IDEA 中直接使用 Gemini CLI，并让它基于当前项目目录读取文件和执行任务。

如果你的 JetBrains AI Assistant 支持 ACP Agent Registry，也可以在 AI Assistant 的 Agent 配置中查找 Gemini CLI。添加后，IDE 会通过 ACP 启动本地 Gemini CLI Agent。

实际是否出现 Gemini CLI Agent，取决于你的 JetBrains IDE 版本、AI Assistant 版本以及当前 ACP 支持情况。如果没有看到该入口，先使用 IDEA 内置终端运行 `gemini`。

## Gemini Code Assist 能不能配置 OpenDoor

不建议。Gemini Code Assist 是 Google 官方 IDE 产品，主要使用 Google 账号、Google Cloud 或 Gemini Code Assist 的官方服务体系。它不是 OpenAI-compatible 客户端，也不是通过 `GOOGLE_GEMINI_BASE_URL` 这种本地 Gemini CLI 配置来切换中转站。

如果你的目标是使用 OpenDoor API Key，请使用 Gemini CLI。

## 环境变量方式

也可以不写 `.env` 文件，直接在启动 Gemini CLI 的终端中设置环境变量。

macOS / Linux：

```bash
export GOOGLE_GEMINI_BASE_URL="https://api.code-opendoor.com"
export GEMINI_API_KEY="YOUR_API_KEY"
export GEMINI_MODEL="gemini-3.1-pro"
```

Windows CMD：

```bat
set GOOGLE_GEMINI_BASE_URL=https://api.code-opendoor.com
set GEMINI_API_KEY=YOUR_API_KEY
set GEMINI_MODEL=gemini-3.1-pro
```

PowerShell：

```powershell
$env:GOOGLE_GEMINI_BASE_URL = "https://api.code-opendoor.com"
$env:GEMINI_API_KEY = "YOUR_API_KEY"
$env:GEMINI_MODEL = "gemini-3.1-pro"
```

## 常见问题

### API 地址应该填哪个

Gemini CLI 使用：

```text
https://api.code-opendoor.com
```

不要写成 `https://api.code-opendoor.com/v1`。

### IDEA 中没有 Gemini CLI Agent

这通常是 IDE 或 AI Assistant 版本不支持对应 ACP 入口。可以先在 IDEA 内置终端中运行：

```bash
gemini
```

### Gemini Code Assist 可以使用 OpenDoor Key 吗

不建议。OpenDoor Key 应用于 Gemini CLI，不应用于 Gemini Code Assist 的 Google 官方账号流程。
