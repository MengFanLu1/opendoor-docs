# Codex VS Code 插件配置

本页介绍如何在 VS Code 中配置 Codex 插件使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 安装插件

打开 VS Code，进入扩展市场，搜索：

```text
Codex
```

安装 OpenAI 官方发布的 Codex 插件。安装完成后，VS Code 侧边栏会出现 Codex 入口。

如果你使用的是 Cursor、Windsurf 等 VS Code Fork，也可以按同样方式安装和配置。

## 先确认使用模式

Codex 插件通常有两种使用方式：

- ChatGPT 登录模式：使用你的 ChatGPT 账号和官方额度。
- API Key 模式：使用本地 API Key 和 `~/.codex/config.toml` 配置。

如果你要使用 OpenDoor 中转站，需要使用 API Key 模式。ChatGPT 登录模式走的是 OpenAI 官方账号体系，不能通过这种方式切换到第三方中转站。

## 推荐方式：复用 Codex CLI 配置

Codex VS Code 插件和 Codex CLI 会共享同一套配置文件。也就是说，如果你已经完成 [Codex CLI 配置](./codex)，通常不需要重新配置中转站地址。

如果还没有配置，可以手动写入以下文件。

macOS / Linux 配置文件路径：

```text
~/.codex/config.toml
```

Windows 配置文件路径：

```text
%USERPROFILE%\.codex\config.toml
```

写入以下内容：

```toml
model_provider = "cch"
model = "gpt-5.5"
model_reasoning_effort = "xhigh"
disable_response_storage = true
sandbox_mode = "workspace-write"

[features]
plan_tool = true
apply_patch_freeform = true
view_image_tool = true
web_search_request = true
unified_exec = false
streamable_shell = false
rmcp_client = true

[model_providers.cch]
name = "cch"
base_url = "https://api.code-opendoor.com/v1"
wire_api = "responses"
requires_openai_auth = true

[sandbox_workspace_write]
network_access = true
```

其中：

- `model_provider = "cch"` 表示默认使用 OpenDoor 这个 Provider。
- `model = "gpt-5.5"` 表示默认模型，可改成 [平台模型 ID](./models) 中的 Codex 模型。
- `base_url` 必须使用 `https://api.code-opendoor.com/v1`。

## 配置 API Key

Codex 插件在 API Key 模式下会读取本地 Codex 凭据。可以手动写入：

macOS / Linux：

```text
~/.codex/auth.json
```

Windows：

```text
%USERPROFILE%\.codex\auth.json
```

内容如下：

```json
{
  "OPENAI_API_KEY": "YOUR_API_KEY"
}
```

如果你之前在 Codex 插件中登录过 ChatGPT 账号，建议先退出登录，再改用 API Key 模式。否则插件可能继续使用官方账号，而不是 OpenDoor API Key。

也可以使用环境变量保存 API Key。

macOS / Linux：

```bash
export OPENAI_API_KEY="YOUR_API_KEY"
```

Windows CMD：

```bat
set OPENAI_API_KEY=YOUR_API_KEY
```

PowerShell：

```powershell
$env:OPENAI_API_KEY = "YOUR_API_KEY"
```

## 在 VS Code 中使用

配置完成后，重启 VS Code，然后打开一个项目目录。

可以通过以下方式打开 Codex：

1. 点击 VS Code 侧边栏的 Codex 图标。
2. 按 `Cmd+Shift+P`（macOS）或 `Ctrl+Shift+P`（Windows / Linux），搜索 `Codex` 并打开。

打开后输入需求即可。插件会在当前工作区读取文件、生成修改，并在执行命令或应用改动前按配置请求确认。

## Windows / WSL 注意事项

如果你在 Windows 上使用 WSL，推荐让 Codex 在 WSL 中运行。

此时配置文件也要写在 WSL 内：

```text
~/.codex/config.toml
~/.codex/auth.json
```

不要写到 Windows 的 `%USERPROFILE%\.codex\` 后再期待 WSL 内的 Codex 自动读取。

如果 VS Code 插件没有自动使用 WSL，可以在 VS Code 设置中搜索：

```text
Codex WSL
```

或：

```text
ChatGPT WSL
```

开启让插件在 WSL 中运行 Codex 的选项。

## 常见问题

### 插件还是走官方账号

确认你没有继续使用 ChatGPT 登录模式。OpenDoor 中转站需要 API Key 模式，并且 `~/.codex/config.toml` 中需要设置：

```toml
model_provider = "cch"
```

### API 地址应该填哪个

Codex 使用 OpenAI-compatible 接口，地址需要带 `/v1`：

```text
https://api.code-opendoor.com/v1
```

不要写成 `https://api.code-opendoor.com`。

### 模型应该填哪个

Codex 推荐使用：

```toml
model = "gpt-5.5"
```

也可以改成：

```toml
model = "gpt-5.4"
```

或：

```toml
model = "gpt-5.3-codex"
```

更多可用模型见 [平台模型 ID](./models)。
