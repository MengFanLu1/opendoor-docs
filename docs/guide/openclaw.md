# OpenClaw 配置

本页介绍如何配置 OpenClaw 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 安装和初始化

如果你还没有安装 OpenClaw，可以先按官方方式安装。

macOS / Linux：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Windows PowerShell：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

安装完成后，执行初始化：

```bash
openclaw onboard --install-daemon
```

如果你已经完成安装和初始化，可以直接进入下一步配置 OpenDoor。

## 配置文件路径

OpenClaw 的主配置文件路径是：

macOS / Linux：

```text
~/.openclaw/openclaw.json
```

Windows：

```text
%USERPROFILE%\.openclaw\openclaw.json
```

OpenClaw 使用 JSON5 配置，示例中的未加引号字段名是正常写法。

## 配置 OpenDoor 中转站

OpenDoor 可以作为 OpenAI-compatible Provider 接入 OpenClaw。写入以下内容：

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "opendoor/gpt-5.5",
        fallbacks: ["opendoor/claude-sonnet-4-6", "opendoor/gemini-3.1-pro"]
      },
      models: {
        "opendoor/gpt-5.5": { alias: "GPT-5.5" },
        "opendoor/gpt-5.4": { alias: "GPT-5.4" },
        "opendoor/gpt-5.3-codex": { alias: "GPT-5.3 Codex" },
        "opendoor/claude-sonnet-4-6": { alias: "Claude Sonnet 4.6" },
        "opendoor/claude-opus-4-7": { alias: "Claude Opus 4.7" },
        "opendoor/gemini-3.1-pro": { alias: "Gemini 3.1 Pro" },
        "opendoor/gemini-3-flash": { alias: "Gemini 3 Flash" }
      }
    }
  },
  models: {
    mode: "merge",
    providers: {
      opendoor: {
        baseUrl: "https://api.code-opendoor.com/v1",
        apiKey: "YOUR_API_KEY",
        api: "openai-completions",
        models: [
          { id: "gpt-5.5", name: "GPT-5.5", contextWindow: 200000, maxTokens: 8192 },
          { id: "gpt-5.4", name: "GPT-5.4", contextWindow: 200000, maxTokens: 8192 },
          { id: "gpt-5.3-codex", name: "GPT-5.3 Codex", contextWindow: 200000, maxTokens: 8192 },
          { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", contextWindow: 200000, maxTokens: 8192 },
          { id: "claude-opus-4-7", name: "Claude Opus 4.7", contextWindow: 200000, maxTokens: 8192 },
          { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro", contextWindow: 200000, maxTokens: 8192 },
          { id: "gemini-3-flash", name: "Gemini 3 Flash", contextWindow: 200000, maxTokens: 8192 }
        ]
      }
    }
  }
}
```

其中：

- `primary` 是默认模型，启动后默认使用 `opendoor/gpt-5.5`。
- `fallbacks` 是备用模型，主模型不可用时可以切换。
- `baseUrl` 必须使用 `https://api.code-opendoor.com/v1`。
- `apiKey` 填写你的 OpenDoor API Key。
- `api: "openai-completions"` 表示使用 OpenAI-compatible Chat Completions 接口。

更多可用模型见 [平台模型 ID](./models)。

## API Key 配置方式

上面的示例使用最直接的方式，把 API Key 写在 `openclaw.json` 中：

```json5
apiKey: "YOUR_API_KEY"
```

这种方式最简单，适合个人电脑使用。注意不要把包含 API Key 的配置文件提交到 Git 仓库。

如果你不想把 API Key 直接写在配置文件里，也可以使用环境变量。

把 `apiKey` 改成：

```json5
apiKey: "${OPENDOOR_API_KEY}"
```

然后设置环境变量。

macOS / Linux：

```bash
export OPENDOOR_API_KEY="YOUR_API_KEY"
```

Windows CMD：

```bat
set OPENDOOR_API_KEY=YOUR_API_KEY
```

PowerShell：

```powershell
$env:OPENDOOR_API_KEY = "YOUR_API_KEY"
```

## 启动和验证

配置完成后，检查 Gateway 状态：

```bash
openclaw gateway status
```

打开控制台：

```bash
openclaw dashboard
```

如果已经有 Gateway 在运行，修改配置后通常会自动热加载。遇到模型或 Provider 没有生效时，可以重启 Gateway：

```bash
openclaw gateway restart
```

## 切换模型

OpenClaw 的模型引用格式是：

```text
provider/model
```

所以 OpenDoor 模型需要写成：

```text
opendoor/gpt-5.5
```

如果要切换默认模型，可以修改：

```json5
primary: "opendoor/claude-sonnet-4-6"
```

也可以使用命令切换：

```bash
openclaw models set opendoor/claude-sonnet-4-6
```

## 常见问题

### API 地址应该填哪个

OpenClaw 通过 OpenAI-compatible Provider 接入 OpenDoor，地址需要带 `/v1`：

```text
https://api.code-opendoor.com/v1
```

不要写成 `https://api.code-opendoor.com`。

### 可以直接使用 Claude 或 Gemini 模型吗

可以。通过 OpenDoor 中转时，仍然使用 `opendoor/模型ID` 的形式，例如：

```text
opendoor/claude-sonnet-4-6
opendoor/claude-opus-4-7
opendoor/gemini-3.1-pro
opendoor/gemini-3-flash
```

### 配置不生效怎么办

先运行：

```bash
openclaw doctor
```

检查配置文件是否有语法错误。确认无误后，重启 Gateway：

```bash
openclaw gateway restart
```
