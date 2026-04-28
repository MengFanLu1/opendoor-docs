# 生图使用教程

opendoor 提供两种图片生成方式，根据使用场景选择合适的方式。

## 价格

| 模型 | 别名 | 单价 |
|------|------|------|
| `gemini-3.1-flash-image` | Nano Banana 2 | 0.2 元 / 张 |
| `gemini-3-pro-image-preview` | Nano Banana Pro | 0.9 元 / 张 |
| `gpt-image-2` | GPT-Image2 | 0.6 元 / 张 |

## 方式一：接口调用

直接调用 HTTP 接口，传入提示词，返回 Base64 编码的图片数据，自行解码后保存到本地。适合需要集成到自己应用中的场景。

| 模型 | 接口格式 | 文档 |
|------|----------|------|
| `gemini-3.1-flash-image` | Gemini | [Nanobanana](./gemini) |
| `gemini-3-pro-image-preview` | Gemini | [Nanobanana](./gemini) |
| `gpt-image-2` | OpenAI Images | [GPT-Image2](./openai) |

**Base URL**：`https://api.code-opendoor.com`

**认证方式**：`Authorization: Bearer YOUR_API_KEY`

## 方式二：Skills（推荐给 AI 智能体）

通过安装 opendoor-image-skills，让 Claude Code、Codex 等 AI 编程助手直接响应生图指令。在 CLI 中用自然语言描述需求，Skill 自动调用接口并将图片保存到本地，无需手动处理 API 和 Base64。

图片默认保存到 `~/generated_images/`，文件名格式：

```
{日期}_{序号}_{提示词摘要}_{随机码}.{扩展名}
```

示例：`20260428_001_一只橘猫坐在窗台上_a3f2c1.png`

详见 [OpenDoor-Image-Skills](./skills)。
