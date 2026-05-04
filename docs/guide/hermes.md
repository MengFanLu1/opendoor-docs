# Hermes 配置

本页介绍如何配置 Hermes Agent 使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 安装 Hermes

如果你还没有安装 Hermes，可以先按官方方式安装。

macOS / Linux / WSL：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Windows 用户推荐先安装 WSL2，然后在 WSL 终端中执行上面的安装命令。

安装完成后，重新加载 shell：

```bash
source ~/.bashrc
```

如果你使用的是 zsh：

```bash
source ~/.zshrc
```

## 配置文件位置

Hermes 的配置文件集中在 `~/.hermes/` 目录：

```text
~/.hermes/config.yaml
~/.hermes/.env
```

其中：

- `config.yaml` 保存模型、Provider、终端后端等普通配置。
- `.env` 保存 API Key 等敏感信息。

## 推荐方式：使用交互式配置

Hermes 官方推荐使用 `hermes model` 配置模型提供方。

运行：

```bash
hermes model
```

然后按提示选择：

1. 选择 `Custom endpoint`。
2. API base URL 填写 `https://api.code-opendoor.com/v1`。
3. API Key 填写你的 OpenDoor API Key。
4. Model name 填写模型 ID，例如 `gpt-5.5`。

配置完成后，Hermes 会把模型和接口地址保存到 `~/.hermes/config.yaml`。

## 手动配置 OpenDoor 中转站

如果你想直接修改配置文件，可以编辑：

```text
~/.hermes/config.yaml
```

写入以下内容：

```yaml
model:
  provider: custom
  default: gpt-5.5
  base_url: https://api.code-opendoor.com/v1
  api_key: YOUR_API_KEY
```

其中：

- `provider: custom` 表示使用自定义 OpenAI-compatible 接口。
- `default` 是默认模型，可改成 [平台模型 ID](./models) 中的模型。
- `base_url` 必须使用 `https://api.code-opendoor.com/v1`。
- `api_key` 填写你的 OpenDoor API Key。

## API Key 配置方式

上面的示例把 API Key 直接写在 `config.yaml` 中：

```yaml
api_key: YOUR_API_KEY
```

这种方式最简单，适合个人电脑使用。注意不要把包含 API Key 的配置文件提交到 Git 仓库。

如果你不想把 API Key 直接写在配置文件里，可以把密钥放到 `~/.hermes/.env`。

编辑：

```text
~/.hermes/.env
```

写入：

```bash
OPENAI_API_KEY=YOUR_API_KEY
```

然后把 `config.yaml` 改成：

```yaml
model:
  provider: custom
  default: gpt-5.5
  base_url: https://api.code-opendoor.com/v1
  api_key: ${OPENAI_API_KEY}
```

Hermes 支持在 `config.yaml` 中使用 `${VAR_NAME}` 引用环境变量。

## 使用其他模型

如果要使用 Claude、Codex 或 Gemini 模型，只需要修改 `default`。

Codex：

```yaml
model:
  provider: custom
  default: gpt-5.5
  base_url: https://api.code-opendoor.com/v1
  api_key: YOUR_API_KEY
```

Claude：

```yaml
model:
  provider: custom
  default: claude-sonnet-4-6
  base_url: https://api.code-opendoor.com/v1
  api_key: YOUR_API_KEY
```

Gemini：

```yaml
model:
  provider: custom
  default: gemini-3.1-pro
  base_url: https://api.code-opendoor.com/v1
  api_key: YOUR_API_KEY
```

更多可用模型见 [平台模型 ID](./models)。

## 启动和验证

配置完成后，运行：

```bash
hermes
```

也可以使用 TUI：

```bash
hermes --tui
```

如果需要检查配置问题：

```bash
hermes doctor
```

如果要查看当前配置：

```bash
hermes config
```

## 切换模型

在终端外部重新配置模型：

```bash
hermes model
```

在 Hermes 会话内部切换已经配置好的模型：

```text
/model custom:gpt-5.5
```

如果要切换到 Claude：

```text
/model custom:claude-sonnet-4-6
```

如果要切换到 Gemini：

```text
/model custom:gemini-3.1-pro
```

## 常见问题

### API 地址应该填哪个

Hermes 通过 OpenAI-compatible Custom Endpoint 接入 OpenDoor，地址需要带 `/v1`：

```text
https://api.code-opendoor.com/v1
```

不要写成 `https://api.code-opendoor.com`。

### 可以使用 Claude 或 Gemini 模型吗

可以。通过 OpenDoor 中转时，`provider` 仍然写 `custom`，模型 ID 直接写 OpenDoor 提供的模型名，例如：

```text
claude-sonnet-4-6
claude-opus-4-7
gemini-3.1-pro
gemini-3-flash
```

### 配置后不生效怎么办

先运行：

```bash
hermes doctor
```

如果模型或 API Key 配置有问题，可以重新执行：

```bash
hermes model
```
