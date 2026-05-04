# 修复 VS Code / Cursor 第三方端点问题

本页用于解决 Claude Code 在 VS Code 或 Cursor 中已经配置 OpenDoor，但插件仍然无法正常使用第三方端点的问题。

开始前请先确认你已经完成 [Claude Code VS Code 插件配置](./claude-vscode)，并且 `~/.claude/settings.json` 中已经写入 OpenDoor API Key 和 API 地址。

## 适用现象

如果你遇到下面情况，可以按本文方式排查：

- Claude Code CLI 在终端中可以正常使用，但 VS Code / Cursor 插件不生效。
- 已经配置 `ANTHROPIC_BASE_URL`，但插件仍然走官方登录或官方端点。
- 插件里提示认证异常，或无法识别第三方服务商配置。
- Cursor 中安装 Claude Code 插件后，无法正常使用 OpenDoor API Key。

![VS Code / Cursor 第三方端点登录问题](/guide/vscode-cursor-third-party-endpoint-login-problem.png)

## 第一步：确认基础配置

先检查 Claude Code 的主配置文件。

macOS / Linux：

```text
~/.claude/settings.json
```

Windows：

```text
%USERPROFILE%\.claude\settings.json
```

应包含类似内容：

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
- `ANTHROPIC_MODEL` 可按需修改为 [平台模型 ID](./models) 中的 Claude 模型。

## 第二步：补充 `config.json`

如果基础配置正确，但 VS Code / Cursor 仍然无法使用第三方端点，可以创建或修改：

macOS / Linux：

```text
~/.claude/config.json
```

Windows：

```text
%USERPROFILE%\.claude\config.json
```

写入以下内容：

```json
{
  "primaryApiKey": "opendoor"
}
```

这里的 `opendoor` 只是一个标识，用来让 Claude Code 插件识别当前存在 API Key 配置。建议不要把真实 API Key 写到这个文件里，真实 API Key 仍然放在 `~/.claude/settings.json` 的 `ANTHROPIC_AUTH_TOKEN` 中。

如果文件已经存在，只需要补充 `primaryApiKey` 字段。例如：

```json
{
  "primaryApiKey": "opendoor",
  "otherConfig": "..."
}
```

注意保持 JSON 格式正确，不要多写逗号。

## 第三步：重启编辑器

配置完成后，完全退出 VS Code 或 Cursor，然后重新打开。

如果只是重新加载窗口，可以执行：

```text
Developer: Reload Window
```

但如果仍然不生效，建议直接完全退出编辑器进程后重新打开。

## 第四步：重新打开 Claude Code

重新打开项目后，可以通过以下方式启动 Claude Code：

1. 点击侧边栏的 Claude Code 图标。
2. 按 `Cmd+Shift+P`（macOS）或 `Ctrl+Shift+P`（Windows / Linux），搜索 `Claude Code`。
3. 在 VS Code / Cursor 内置终端中运行 `claude`。

如果插件仍然提示登录，可以参考 [Claude Code VS Code 插件配置](./claude-vscode) 中的“关闭官方登录提示”。

## 常见问题

### `primaryApiKey` 要填真实 API Key 吗

不建议。本文推荐填写 `opendoor` 这类标识即可，真实 API Key 继续放在：

```text
~/.claude/settings.json
```

也就是 `ANTHROPIC_AUTH_TOKEN` 字段。

### API 地址应该填哪个

Claude Code 使用：

```text
https://api.code-opendoor.com
```

不要写成：

```text
https://api.code-opendoor.com/v1
```

### Cursor 和 VS Code 配置一样吗

基本一样。Cursor 可以安装 VS Code 扩展，Claude Code 插件读取的仍然是本地 Claude Code 配置文件。

### 终端可用但插件不可用怎么办

通常是插件没有正确识别本地 API Key 状态。先补充 `~/.claude/config.json` 中的 `primaryApiKey`，再完全重启 VS Code / Cursor。

## 参考

本文根据第三方排障文章整理改写：[Fix VSCode/Cursor third-party endpoint](https://ctok.ai/fix-vscode-cursor-third-party-endpoint)。
