# opendoor-image-skills

opendoor-image-skills 是一个专为 AI 智能体设计的图片生成 Skill，让 Claude Code、Codex 等 AI 编程助手能够直接调用 opendoor 图片生成接口，无需手动编写 API 调用代码。

安装后，只需对 AI 说「帮我画一只猫」，Skill 会自动触发并将图片保存到本地。

## 支持的模型

| 模型 | 说明 |
|------|------|
| `gemini-3.1-flash-image` | Nanobanana，速度快（默认） |
| `gemini-3-pro-image-preview` | Nanobanana Pro，质量高 |
| `gpt-image-2` | GPT-Image2 |

## 安装

### 前置条件

- Python 3.8+ 或 Node.js 18+
- 已获取 opendoor API Key

### 克隆仓库

```bash
git clone https://github.com/menglulu/opendoor-image-skills.git
cd opendoor-image-skills
```

### macOS / Linux

```bash
bash install.sh
```

### Windows

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

### 跨平台（推荐）

```bash
python3 install.py
```

安装过程会自动检测运行时（优先 Python 3，其次 Node.js 18+），并提示输入 API Key。

## 配置

配置文件位于 `~/.claude/skills/opendoor-image-skills/.env`：

```bash
OPENDOOR_IMAGE_API_KEY=your_api_key_here
OPENDOOR_IMAGE_API_BASE=https://api.code-opendoor.com
OPENDOOR_IMAGE_MODEL=gemini-3.1-flash-image
OPENDOOR_IMAGE_OUTPUT_DIR=~/generated_images
# 以下两项仅 gpt-image-2 有效
OPENDOOR_IMAGE_SIZE=1024x1024
OPENDOOR_IMAGE_QUALITY=low
```

---

## 在 Claude Code 中使用

### 安装 Skill

按上方步骤安装后，Skill 会自动注册到 Claude Code。安装脚本会在 `~/.claude/settings.json` 中添加一条 `UserPromptSubmit` hook，当检测到生图相关关键词时自动触发。

### 使用方式

在 Claude Code 中直接用自然语言描述：

```
帮我画一只橘猫坐在窗台上
生成一张赛博朋克风格的城市夜景，16:9
用 gpt-image-2 画一张极简主义海报
```

Skill 会自动调用接口、保存图片，并在对话中展示结果。

### 手动调用

也可以用斜杠命令显式触发：

```
/opendoor-image-skills 一只可爱的猫咪在阳光下打盹
```

### 指定模型

在提示词中说明即可：

```
用 Nanobanana Pro 画一张高质量风景图
用 gpt-image-2 生成一张产品海报，质量 high
```

---

## 在 Codex 中使用

Codex（OpenAI Codex CLI）支持通过 MCP 工具或自定义 instructions 扩展能力。将 Skill 配置为一个可调用的 shell 工具即可。

### 配置步骤

**1. 安装 Skill**

同上，先完成安装并配置好 API Key。

**2. 在 Codex instructions 中注册工具**

在 `~/.codex/instructions.md` 中添加以下内容，告知 Codex 如何调用生图命令：

当用户要求生成图片时，根据运行时执行对应命令：

Python 运行时：
```bash
~/.claude/skills/opendoor-image-skills/.venv/bin/python3 \
  $(cat ~/.claude/skills/opendoor-image-skills/.repo_path)/scripts/generate.py \
  "提示词" [--model 模型名]
```

Node.js 运行时：
```bash
node $(cat ~/.claude/skills/opendoor-image-skills/.repo_path)/scripts/generate.js \
  "提示词" [--model 模型名]
```

命令执行成功后输出图片的绝对路径。

**3. 使用**

在 Codex 会话中直接说：

```
帮我画一张夕阳下的海边图片
generate an image of a futuristic city at night
```

Codex 会调用上述命令完成生图。

---

## 图片保存规则

图片默认保存到 `~/generated_images/`，文件名格式：

```
{日期}_{序号}_{提示词摘要}_{随机码}.{扩展名}
```

示例：

```
20260428_001_一只橘猫坐在窗台上_a3f2c1.png
20260428_002_赛博朋克城市夜景_b7e4d2.jpeg
```

## 卸载

```bash
# macOS / Linux
bash uninstall.sh

# 手动卸载
rm -rf ~/.claude/skills/opendoor-image-skills
```

然后从 `~/.claude/settings.json` 中删除对应的 `UserPromptSubmit` hook。
