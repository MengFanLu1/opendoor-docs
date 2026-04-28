# GPT-Image2

适用于 `gpt-image-2`，兼容 OpenAI Image API，提供两个端点：

- **Generations** (`/v1/images/generations`)：根据文本提示从零生成图片
- **Edits** (`/v1/images/edits`)：使用新提示修改已有图片

## 生成图片

### 请求

```
POST https://api.code-opendoor.com/v1/images/generations
```

**Headers**

```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Body**

```json
{
  "model": "gpt-image-2",
  "prompt": "极简主义海报设计",
  "size": "1024x1024",
  "quality": "low"
}
```

**参数说明**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `model` | string | 是 | - | 固定为 `gpt-image-2` |
| `prompt` | string | 是 | - | 图片描述文本 |
| `size` | string | 否 | `auto` | 图片尺寸，见下方说明 |
| `quality` | string | 否 | `auto` | `low` / `medium` / `high` / `auto` |
| `output_format` | string | 否 | `png` | `png` / `jpeg` / `webp` |
| `output_compression` | number | 否 | - | 压缩级别 0-100，仅 `jpeg`/`webp` 有效 |
| `moderation` | string | 否 | `auto` | 内容审核：`auto` / `low` |

### 响应

```json
{
  "data": [
    {
      "b64_json": "<BASE64_IMAGE_DATA>"
    }
  ]
}
```

图片在 `data[0].b64_json`，base64 编码。

### 调用示例

**curl**

```bash
curl -X POST "https://api.code-opendoor.com/v1/images/generations" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "极简主义海报设计",
    "size": "1024x1024",
    "quality": "low"
  }' | jq -r '.data[0].b64_json' | base64 -d > output.png
```

**Python（requests）**

```python
import requests, base64

url = "https://api.code-opendoor.com/v1/images/generations"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "model": "gpt-image-2",
    "prompt": "极简主义海报设计",
    "size": "1024x1024",
    "quality": "low"
}

resp = requests.post(url, headers=headers, json=payload, timeout=120)
image_bytes = base64.b64decode(resp.json()["data"][0]["b64_json"])
with open("output.png", "wb") as f:
    f.write(image_bytes)
```

**Python（OpenAI SDK）**

```bash
pip install openai
```

```python
import base64
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.code-opendoor.com/v1"
)

result = client.images.generate(
    model="gpt-image-2",
    prompt="极简主义海报设计",
    size="1024x1024",
    quality="low",
)

image_bytes = base64.b64decode(result.data[0].b64_json)
with open("output.png", "wb") as f:
    f.write(image_bytes)
```

**JavaScript（OpenAI SDK）**

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
    baseURL: "https://api.code-opendoor.com/v1",
    apiKey: "YOUR_API_KEY",
});

const result = await client.images.generate({
    model: "gpt-image-2",
    prompt: "极简主义海报设计",
    size: "1024x1024",
    quality: "low",
});

const imageBytes = Buffer.from(result.data[0].b64_json, "base64");
fs.writeFileSync("output.png", imageBytes);
```

---

## 编辑图片

编辑端点支持：使用参考图片生成新图片、通过蒙版编辑指定区域。

### 使用参考图片生成新图片

传入一张或多张参考图片，生成包含这些元素的新图片。

**Python**

```python
import base64
from openai import OpenAI

client = OpenAI(
    base_url="https://api.code-opendoor.com/v1",
    api_key="YOUR_API_KEY",
)

result = client.images.edit(
    model="gpt-image-2",
    image=[
        open("body-lotion.png", "rb"),
        open("bath-bomb.png", "rb"),
        open("incense-kit.png", "rb"),
        open("soap.png", "rb"),
    ],
    prompt="Generate a photorealistic image of a gift basket on a white background "
           "labeled 'Relax & Unwind' with a ribbon, containing all the items in the reference pictures."
)

image_bytes = base64.b64decode(result.data[0].b64_json)
with open("gift-basket.png", "wb") as f:
    f.write(image_bytes)
```

**JavaScript**

```javascript
import fs from "fs";
import OpenAI, { toFile } from "openai";

const client = new OpenAI({
    baseURL: "https://api.code-opendoor.com/v1",
    apiKey: "YOUR_API_KEY",
});

const imageFiles = ["bath-bomb.png", "body-lotion.png", "incense-kit.png", "soap.png"];
const images = await Promise.all(
    imageFiles.map((file) => toFile(fs.createReadStream(file), null, { type: "image/png" }))
);

const response = await client.images.edit({
    model: "gpt-image-2",
    image: images,
    prompt: "Generate a photorealistic image of a gift basket labeled 'Relax & Unwind', containing all the items in the reference pictures.",
});

fs.writeFileSync("basket.png", Buffer.from(response.data[0].b64_json, "base64"));
```

**curl**

```bash
curl -X POST "https://api.code-opendoor.com/v1/images/edits" \
  -H "Authorization: Bearer $API_KEY" \
  -F "model=gpt-image-2" \
  -F "image[]=@body-lotion.png" \
  -F "image[]=@bath-bomb.png" \
  -F "image[]=@soap.png" \
  -F 'prompt=Generate a photorealistic image of a gift basket labeled "Relax & Unwind", containing all the items in the reference pictures.' \
  | jq -r '.data[0].b64_json' | base64 -d > gift-basket.png
```

### 使用蒙版编辑指定区域

提供蒙版图片来指定需要编辑的区域，蒙版透明区域会被替换，不透明区域保持不变。

> 蒙版完全基于提示引导，模型可能无法完全精确地遵循蒙版形状。如果提供多张输入图片，蒙版应用于第一张。

**Python**

```python
from openai import OpenAI
import base64

client = OpenAI(
    base_url="https://api.code-opendoor.com/v1",
    api_key="YOUR_API_KEY",
)

result = client.images.edit(
    model="gpt-image-2",
    image=open("sunlit_lounge.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="A sunlit indoor lounge area with a pool containing a flamingo"
)

image_bytes = base64.b64decode(result.data[0].b64_json)
with open("composition.png", "wb") as f:
    f.write(image_bytes)
```

**蒙版要求**

- 蒙版与原图必须格式和尺寸相同，大小不超过 50MB
- 蒙版必须包含 alpha 通道

将黑白图片转换为带 alpha 通道的蒙版：

```python
from PIL import Image
from io import BytesIO

mask = Image.open("mask_bw.png").convert("L")
mask_rgba = mask.convert("RGBA")
mask_rgba.putalpha(mask)

buf = BytesIO()
mask_rgba.save(buf, format="PNG")
with open("mask_alpha.png", "wb") as f:
    f.write(buf.getvalue())
```

---

## 自定义输出

### 尺寸

`gpt-image-2` 支持任意满足以下约束的分辨率：

- 最大边长不超过 `3840px`
- 两边必须为 `16px` 的倍数
- 长短边比例不超过 `3:1`
- 总像素数在 `655,360` 到 `8,294,400` 之间

**常用尺寸**

| 尺寸 | 说明 |
|------|------|
| `1024x1024` | 正方形（默认） |
| `1536x1024` | 横向 |
| `1024x1536` | 纵向 |
| `2048x2048` | 2K 正方形 |
| `3840x2160` | 4K 横向 |
| `2160x3840` | 4K 纵向 |
| `auto` | 模型自动选择 |

> 超过 2560×1440 的输出为实验性功能。

### 质量

| 值 | 说明 |
|----|------|
| `low` | 快速草稿，适合缩略图和快速迭代 |
| `medium` | 均衡 |
| `high` | 最高质量 |
| `auto` | 模型自动选择（默认） |

### 输出格式与压缩

默认输出 `png`，也可指定 `jpeg` 或 `webp`。使用 `jpeg`/`webp` 时可通过 `output_compression`（0-100）控制压缩率。

> `jpeg` 比 `png` 生成更快，延迟敏感场景推荐使用。

```python
result = client.images.generate(
    model="gpt-image-2",
    prompt="极简主义海报设计",
    output_format="jpeg",
    output_compression=80,
)
```

---

## 限制

- **延迟**：复杂提示处理时间可能长达 2 分钟
- **文字渲染**：精确的文字放置和清晰度仍有局限
- **一致性**：多次生成难以保持角色或品牌元素的视觉一致性
- **构图控制**：结构化布局中元素精确放置能力有限
- **透明背景**：不支持 `background: "transparent"`
