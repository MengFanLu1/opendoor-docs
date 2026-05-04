# Gemini CLI VS Code 插件配置

本页介绍如何在 VS Code 中通过 Gemini CLI 插件使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 先区分两个插件

VS Code 中和 Gemini 相关的插件主要有两类：

- Gemini Code Assist：Google 官方 IDE 产品，需要登录 Google 账号使用，不适合配置第三方中转站。
- Gemini CLI Companion：Gemini CLI 的 VS Code 集成插件，本身不直接请求模型，而是配合本地 Gemini CLI 使用。

如果你要使用 OpenDoor 中转站，推荐使用 Gemini CLI Companion，并让本地 Gemini CLI 读取 OpenDoor 配置。

## 安装插件

打开 VS Code，进入扩展市场，搜索：

```text
Gemini CLI Companion
```

安装后，VS Code 会提供 Gemini CLI 的 IDE 集成能力，例如读取当前工作区上下文、查看 diff、引用打开的文件等。

如果你安装的是 Gemini Code Assist，请注意它通常走 Google 账号登录流程，不能按本文方式配置 OpenDoor 中转站。

## 配置 Gemini CLI

Gemini CLI Companion 会配合本地 `gemini` 命令工作，所以中转站配置仍然写在 Gemini CLI 中。

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

其中：

- `GOOGLE_GEMINI_BASE_URL` 使用 `https://api.code-opendoor.com`，不要添加 `/v1`。
- `GEMINI_API_KEY` 填写你的 OpenDoor API Key。
- `GEMINI_MODEL` 是默认模型，可改成 [平台模型 ID](./models) 中的 Gemini 模型。

然后配置 Gemini CLI 的认证方式。

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

## 在 VS Code 中启动

配置完成后，重启 VS Code，然后打开一个项目目录。

打开 VS Code 内置终端，运行：

```bash
gemini
```

进入 Gemini CLI 后，启用 IDE 集成：

```text
/ide enable
```

启用后，Gemini CLI 会和当前 VS Code 窗口连接，可以更方便地读取工作区上下文、查看文件和应用修改。

## 环境变量方式

也可以不写 `.env` 文件，直接在终端中设置环境变量。

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

### Gemini Code Assist 可以用 OpenDoor 吗

不建议。Gemini Code Assist 主要走 Google 账号登录和官方服务，不适合配置第三方中转站。使用 OpenDoor 推荐通过 Gemini CLI Companion + Gemini CLI。

### API 地址应该填哪个

Gemini CLI 使用：

```text
https://api.code-opendoor.com
```

不要写成 `https://api.code-opendoor.com/v1`。

### 插件没有连接到 VS Code

确认你是在 VS Code 内置终端中运行 `gemini`，并且已经执行：

```text
/ide enable
```

如果仍未连接，可以重启 VS Code 后重新运行 `gemini`。

### 模型应该填哪个

Gemini 推荐使用：

```bash
GEMINI_MODEL=gemini-3.1-pro
```

也可以改成：

```bash
GEMINI_MODEL=gemini-3-flash
```

更多可用模型见 [平台模型 ID](./models)。
