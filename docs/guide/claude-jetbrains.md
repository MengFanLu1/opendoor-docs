# Claude Code IDEA 插件配置

本页介绍如何在 IntelliJ IDEA、PyCharm、WebStorm、GoLand 等 JetBrains IDE 中配置 Claude Code 插件使用 OpenDoor API。

开始前请先完成 [快速开始](./setup)，并准备好你的 API Key。

## 先区分两个 Claude 插件

JetBrains IDE 中常见的 Claude 相关入口有两类：

- Claude Code 插件：Anthropic 官方 Claude Code 的 JetBrains 插件，配合本地 `claude` 命令使用。
- Claude Agent：JetBrains AI Assistant 内置的 Agent，走 JetBrains AI Assistant 的认证和模型体系。

如果你要使用 OpenDoor 中转站，推荐使用 Claude Code 插件，并复用本地 Claude CLI 配置。

## 安装插件

打开 IDEA，进入插件市场：

```text
Settings / Preferences -> Plugins -> Marketplace
```

搜索并安装：

```text
Claude Code
```

安装完成后，完全重启 IDEA。JetBrains 插件有时需要完整退出 IDE 后重新打开，才会正确识别本地 `claude` 命令。

## 推荐方式：复用 Claude CLI 配置

Claude Code IDEA 插件本身不单独保存 OpenDoor API Key。它会调用本地 Claude Code CLI，所以中转站配置仍然写在 Claude CLI 的配置文件中。

如果你已经完成 [Claude CLI 配置](./claude)，通常不需要重复配置。

如果还没有配置，可以手动写入以下文件。

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
    "ANTHROPIC_BASE_URL": "https://api.code-opendoor.com",
    "ANTHROPIC_MODEL": "claude-sonnet-4-6"
  }
}
```

其中：

- `ANTHROPIC_AUTH_TOKEN` 填写你的 OpenDoor API Key。
- `ANTHROPIC_BASE_URL` 使用 `https://api.code-opendoor.com`，不要添加 `/v1`。
- `ANTHROPIC_MODEL` 是默认模型，可改成 [平台模型 ID](./models) 中的 Claude 模型。

如果不想固定默认模型，可以删除 `ANTHROPIC_MODEL` 这一行。

## 在 IDEA 中启动

推荐从 IDEA 内置终端启动：

```bash
claude
```

这样 Claude Code 可以自动识别当前 JetBrains IDE，并启用更完整的 IDE 集成能力，例如：

- 在 IDEA 中查看文件 diff。
- 共享当前选中的代码和打开的文件。
- 读取 IDE 诊断信息。
- 使用 IDEA 的文件引用能力。

如果你是在外部终端启动 Claude Code，可以进入 Claude 后执行：

```text
/ide
```

然后按提示连接当前 IDEA 窗口。

## 配置 Claude 命令路径

如果点击 IDEA 中的 Claude Code 图标后提示找不到命令，可以手动配置命令路径：

```text
Settings / Preferences -> Tools -> Claude Code
```

在 `Claude command` 中填写你的 Claude 命令，例如：

```text
claude
```

如果你通过 npm 全局安装，也可以填写完整路径，例如：

```text
/usr/local/bin/claude
```

WSL 用户可以使用类似下面的命令：

```text
wsl -d Ubuntu -- bash -lic "claude"
```

其中 `Ubuntu` 替换成你的 WSL 发行版名称。

## 常见问题

### IDEA 插件可以直接填 API Key 吗

不建议这样理解。Claude Code IDEA 插件主要负责 IDE 集成，实际模型请求由本地 Claude Code CLI 发起。配置 OpenDoor 时，应优先写入 `~/.claude/settings.json`。

### API 地址应该填哪个

Claude Code 使用：

```text
https://api.code-opendoor.com
```

不要写成 `https://api.code-opendoor.com/v1`。

### 插件没有识别 IDEA

先确认是在 IDEA 内置终端中运行 `claude`，并且已经完整重启 IDEA。如果仍未识别，可以在 Claude Code 中执行：

```text
/ide
```

### Claude Agent 能不能这样配置

JetBrains AI Assistant 里的 Claude Agent 和 Claude Code 插件不是同一个东西。Claude Agent 走 JetBrains AI Assistant 的 Provider 设置，不直接读取 `~/.claude/settings.json`。
