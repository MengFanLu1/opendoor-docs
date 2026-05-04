# OpenCode 配置

本页介绍如何配置 OpenCode 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 安装 OpenCode

如果你还没有安装 OpenCode，可以任选一种方式安装。

macOS / Linux：

```bash
curl -fsSL https://opencode.ai/install | bash
```

也可以使用 npm：

```bash
npm install -g opencode-ai
```

macOS / Linux 也可以使用 Homebrew：

```bash
brew install anomalyco/tap/opencode
```

Windows 用户推荐在 WSL 中使用 OpenCode，并按 Linux 路径配置。

## 配置 OpenDoor 中转站

OpenCode 支持自定义 OpenAI-compatible Provider。OpenDoor 的 OpenCode 接入地址使用：

```text
https://api.code-opendoor.com/v1
```

macOS / Linux 配置文件路径：

```text
~/.config/opencode/opencode.json
```

Windows WSL 中使用 WSL 内的 Linux 路径：

```text
~/.config/opencode/opencode.json
```

写入以下内容：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opendoor/gpt-5.5",
  "provider": {
    "opendoor": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OpenDoor",
      "options": {
        "baseURL": "https://api.code-opendoor.com/v1",
        "apiKey": "YOUR_API_KEY"
      },
      "models": {
        "gpt-5.5": {
          "name": "GPT-5.5"
        },
        "gpt-5.4": {
          "name": "GPT-5.4"
        },
        "gpt-5.3-codex": {
          "name": "GPT-5.3 Codex"
        },
        "claude-sonnet-4-6": {
          "name": "Claude Sonnet 4.6"
        },
        "claude-opus-4-7": {
          "name": "Claude Opus 4.7"
        },
        "gemini-3.1-pro": {
          "name": "Gemini 3.1 Pro"
        },
        "gemini-3-flash": {
          "name": "Gemini 3 Flash"
        }
      }
    }
  }
}
```

如果你要使用其他模型，把 `model` 改成 `opendoor/模型ID`，并在 `models` 中补充对应模型 ID。完整列表见 [平台模型 ID](./models)。

## API Key 配置方式

上面的示例使用最直接的方式，把 API Key 写在 `opencode.json` 中：

```json
"apiKey": "YOUR_API_KEY"
```

这种方式最简单，适合个人电脑使用。注意不要把包含 API Key 的配置文件提交到 Git 仓库。

如果你不想把 API Key 直接写在配置文件里，也可以使用下面几种方式。

### 方式一：使用环境变量

把 `apiKey` 改成：

```json
"apiKey": "{env:OPENDOOR_API_KEY}"
```

然后设置环境变量。

macOS / Linux：

```bash
export OPENDOOR_API_KEY="YOUR_API_KEY"
```

Windows PowerShell：

```powershell
$env:OPENDOOR_API_KEY = "YOUR_API_KEY"
```

如果你在 WSL 中运行 OpenCode，请在 WSL 终端中设置环境变量，而不是在 Windows PowerShell 中设置。

### 方式二：从文件读取 API Key

也可以把 API Key 单独保存在本地文件中，再让 OpenCode 读取这个文件。

例如先把 API Key 保存到：

```text
~/.secrets/opendoor-key
```

然后把 `apiKey` 改成：

```json
"apiKey": "{file:~/.secrets/opendoor-key}"
```

这种方式比环境变量更稳定，也能避免把密钥直接写在 OpenCode 配置文件里。

### 方式三：使用 OpenCode 凭据管理

如果你不想通过环境变量保存 API Key，也可以使用 OpenCode 内置的 `/connect` 保存凭据。

先把配置文件里的 `apiKey` 这一行删除，例如：

```json
"apiKey": "YOUR_API_KEY"
```

然后启动 OpenCode：

```bash
opencode
```

在 OpenCode 中输入：

```text
/connect
```

选择 `Other`，Provider ID 填写：

```text
opendoor
```

然后粘贴你的 OpenDoor API Key。Provider ID 必须和 `opencode.json` 里的 `opendoor` 保持一致。

## 启动

配置完成后，在项目目录中运行：

```bash
opencode
```

如果需要切换模型，可以在 OpenCode 中运行：

```text
/models
```
