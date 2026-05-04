# Codex CLI 配置

本页介绍如何配置 Codex CLI 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 推荐方式：控制台一键接入

登录 OpenDoor 控制台，进入「一键接入」页面。

选择你的 API Key 和节点后，切换到「Codex」，复制页面生成的安装命令执行即可。安装脚本会自动安装所需环境，并写入 Codex 配置。

![控制台一键接入](/guide/cli-one-click.png)

## 手动配置

如果你已经安装好 Codex CLI，可以手动写入配置文件。

### 1. 配置模型提供方

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

Windows 如遇到 WSL 确认提示，可在顶部补充：

```toml
windows_wsl_setup_acknowledged = true
```

### 2. 配置 API Key

macOS / Linux 配置文件路径：

```text
~/.codex/auth.json
```

Windows 配置文件路径：

```text
%USERPROFILE%\.codex\auth.json
```

写入以下内容：

```json
{
  "OPENAI_API_KEY": "YOUR_API_KEY"
}
```

## 环境变量认证

也可以使用环境变量保存 API Key。

在 `config.toml` 的 `[model_providers.cch]` 中加入：

```toml
env_key = "CCH_API_KEY"
requires_openai_auth = true
```

然后设置环境变量。

macOS / Linux：

```bash
export CCH_API_KEY="YOUR_API_KEY"
```

Windows CMD：

```bat
set CCH_API_KEY=YOUR_API_KEY
```

PowerShell：

```powershell
$env:CCH_API_KEY = "YOUR_API_KEY"
```

## 启动

配置完成后，在终端运行：

```bash
codex
```
