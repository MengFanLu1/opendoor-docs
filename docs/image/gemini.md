# Nanobanana

适用于 `gemini-3.1-flash-image`、`gemini-3-pro-image-preview`。

## 可用模型

| 模型 | 特点 |
|------|------|
| `gemini-3.1-flash-image` | 性价比高，支持 512px-4K，支持思考等级控制和图片搜索接地 |
| `gemini-3-pro-image-preview` | 高级推理，最高 4K，最多 14 张参考图 |

## 请求

```
POST https://api.code-opendoor.com/v1beta/models/{model}:generateContent
```

**Headers**

```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Body**

```json
{
  "contents": [
    {
      "parts": [
        { "text": "一只可爱的猫咪在阳光下打盹" }
      ]
    }
  ],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "1K"
    }
  }
}
```

**generationConfig 参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| `responseModalities` | `string[]` | `["IMAGE"]` 仅图片；`["TEXT", "IMAGE"]` 图文混合（默认） |
| `imageConfig.aspectRatio` | `string` | 宽高比，见下方支持列表 |
| `imageConfig.imageSize` | `string` | 分辨率档位：`512px`（仅 flash）、`1K`、`2K`、`4K`，**必须大写 K** |

**支持的宽高比**

`1:1` `1:4` `1:8` `2:3` `3:2` `3:4` `4:1` `4:3` `4:5` `5:4` `8:1` `9:16` `16:9` `21:9`

## 响应

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "inlineData": {
              "mimeType": "image/png",
              "data": "<BASE64_IMAGE_DATA>"
            }
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 10,
    "candidatesTokenCount": 1120,
    "totalTokenCount": 1130
  }
}
```

图片在 `candidates[0].content.parts[].inlineData.data`，base64 编码。

当 `responseModalities` 包含 `"TEXT"` 时，parts 中可能同时包含 `text` 和 `inlineData`。

## 分辨率参考表

**gemini-3.1-flash-image**

| 宽高比 | 512px | 1K | 2K | 4K |
|--------|-------|-----|------|------|
| 1:1 | 512×512 | 1024×1024 | 2048×2048 | 4096×4096 |
| 9:16 | 384×688 | 768×1376 | 1536×2752 | 3072×5504 |
| 16:9 | 688×384 | 1376×768 | 2752×1536 | 5504×3072 |
| 3:4 | 448×592 | 896×1200 | 1792×2400 | 3584×4800 |
| 4:3 | 592×448 | 1200×896 | 2400×1792 | 4800×3584 |
| 21:9 | 784×336 | 1584×672 | 3168×1344 | 6336×2688 |

> 完整 14 种宽高比均支持，512px 档位仅 flash 可用。

**gemini-3-pro-image-preview**：支持 `1K`、`2K`、`4K`，不支持 `512px`，分辨率与 flash 一致。

## 耗时参考（flash 实测）

| 档位 | 典型耗时 |
|------|----------|
| 512px | 10-17s |
| 1K | 13-40s |
| 2K | 40-170s |
| 4K | 120-310s |

## 调用示例

### 示例一：curl 基础生图

```bash
curl -X POST \
  "https://api.code-opendoor.com/v1beta/models/gemini-3.1-flash-image:generateContent" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "一只可爱的猫咪在阳光下打盹"}]}],
    "generationConfig": {
      "responseModalities": ["IMAGE"],
      "imageConfig": {"aspectRatio": "16:9", "imageSize": "1K"}
    }
  }' | jq -r '.candidates[0].content.parts[0].inlineData.data' \
     | base64 -d > output.png
```

### 示例二：curl 多场景对比

```bash
# 竖版手机壁纸 9:16 + 2K，输出 1536×2752
curl -X POST \
  "https://api.code-opendoor.com/v1beta/models/gemini-3.1-flash-image:generateContent" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "梦幻星空下的猫咪剪影"}]}],
    "generationConfig": {
      "responseModalities": ["IMAGE"],
      "imageConfig": {"aspectRatio": "9:16", "imageSize": "2K"}
    }
  }' | jq -r '.candidates[0].content.parts[0].inlineData.data' \
     | base64 -d > wallpaper.png

# 超宽横幅 21:9 + 4K，输出 6336×2688
curl -X POST \
  "https://api.code-opendoor.com/v1beta/models/gemini-3.1-flash-image:generateContent" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "赛博朋克城市全景"}]}],
    "generationConfig": {
      "responseModalities": ["IMAGE"],
      "imageConfig": {"aspectRatio": "21:9", "imageSize": "4K"}
    }
  }' | jq -r '.candidates[0].content.parts[0].inlineData.data' \
     | base64 -d > banner.png

# 快速预览 512px（仅 flash，最省 token，约 747 token）
curl -X POST \
  "https://api.code-opendoor.com/v1beta/models/gemini-3.1-flash-image:generateContent" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "一只猫"}]}],
    "generationConfig": {
      "responseModalities": ["IMAGE"],
      "imageConfig": {"aspectRatio": "1:1", "imageSize": "512px"}
    }
  }' | jq -r '.candidates[0].content.parts[0].inlineData.data' \
     | base64 -d > preview.png
```

### 示例三：Python（requests）封装函数

```python
import base64, requests
from pathlib import Path

API_BASE = "https://api.code-opendoor.com"
API_KEY  = "YOUR_API_KEY"

def generate_image(prompt, model="gemini-3.1-flash-image",
                   aspect_ratio="1:1", image_size="1K", modalities=None):
    url = f"{API_BASE}/v1beta/models/{model}:generateContent"
    config = {"responseModalities": modalities or ["IMAGE"]}
    img_cfg = {}
    if aspect_ratio:
        img_cfg["aspectRatio"] = aspect_ratio
    if image_size:
        img_cfg["imageSize"] = image_size
    if img_cfg:
        config["imageConfig"] = img_cfg

    resp = requests.post(url,
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={"contents": [{"parts": [{"text": prompt}]}], "generationConfig": config},
        timeout=300)
    resp.raise_for_status()
    return resp.json()

def save_images(resp_json, prefix="output"):
    saved = []
    for cand in resp_json.get("candidates", []):
        for i, part in enumerate(cand.get("content", {}).get("parts", [])):
            inline = part.get("inlineData")
            if inline:
                ext = inline["mimeType"].split("/")[-1]
                path = f"{prefix}_{i}.{ext}"
                Path(path).write_bytes(base64.b64decode(inline["data"]))
                saved.append(path)
            elif part.get("text"):
                print(f"文本: {part['text'][:200]}")
    return saved

# 基本用法
result = generate_image("一只可爱的猫咪在阳光下打盹")
save_images(result, "cat")

# 指定比例和分辨率
result = generate_image("城市天际线全景", aspect_ratio="21:9", image_size="4K")
save_images(result, "skyline")

# 图文混合输出
result = generate_image("画一只猫并描述它", modalities=["TEXT", "IMAGE"])
save_images(result, "cat_with_text")
```

### 示例四：Python（Google SDK）

```bash
pip install google-genai
```

```python
from google import genai
from google.genai import types

client = genai.Client(
    api_key="YOUR_API_KEY",
    http_options={"base_url": "https://api.code-opendoor.com"}
)

response = client.models.generate_content(
    model="gemini-3.1-flash-image",
    contents="一只可爱的猫咪在阳光下打盹",
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(aspect_ratio="16:9", image_size="1K"),
    ),
)

for part in response.parts:
    if part.inline_data is not None:
        part.as_image().save("output.png")
        break
```

## 高级功能

### 图片编辑

提供原图 + 文字指令修改图片：

```python
import requests, base64
from pathlib import Path

API_BASE = "https://api.code-opendoor.com"
API_KEY  = "YOUR_API_KEY"

def edit_image(image_path, instruction, model="gemini-3.1-flash-image",
               aspect_ratio=None, image_size=None):
    img_bytes = Path(image_path).read_bytes()
    img_b64 = base64.b64encode(img_bytes).decode()
    mime = "image/jpeg" if image_path.endswith((".jpg", ".jpeg")) else "image/png"

    parts = [
        {"text": instruction},
        {"inline_data": {"mime_type": mime, "data": img_b64}}
    ]
    config = {"responseModalities": ["IMAGE"]}
    img_cfg = {}
    if aspect_ratio:
        img_cfg["aspectRatio"] = aspect_ratio
    if image_size:
        img_cfg["imageSize"] = image_size
    if img_cfg:
        config["imageConfig"] = img_cfg

    resp = requests.post(
        f"{API_BASE}/v1beta/models/{model}:generateContent",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={"contents": [{"parts": parts}], "generationConfig": config},
        timeout=300)
    resp.raise_for_status()
    return resp.json()

# 基础编辑：给猫加一顶帽子
result = edit_image("cat.jpg", "给这只猫戴上一顶圣诞帽")

# 局部重绘：只改背景，保留主体
result = edit_image("cat.jpg",
    "Change only the background to a snowy winter scene. Keep the cat exactly the same.")

# 风格迁移：转换为梵高风格
result = edit_image("cat.jpg",
    "Transform this photograph into the artistic style of Vincent van Gogh's Starry Night. "
    "Preserve the original composition but render with swirling, impasto brushstrokes.")
```

### 多图合成

最多传入多张参考图（pro 支持 14 张，flash 支持 10 张）：

```python
img1_b64 = base64.b64encode(Path("dress.png").read_bytes()).decode()
img2_b64 = base64.b64encode(Path("model.png").read_bytes()).decode()

resp = requests.post(
    f"{API_BASE}/v1beta/models/gemini-3.1-flash-image:generateContent",
    headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
    json={
        "contents": [{"parts": [
            {"text": "让第二张图中的人穿上第一张图中的蓝色连衣裙，生成一张专业电商照片"},
            {"inline_data": {"mime_type": "image/png", "data": img1_b64}},
            {"inline_data": {"mime_type": "image/png", "data": img2_b64}},
        ]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": "3:4", "imageSize": "2K"}
        }
    },
    timeout=300,
)
```

SDK 写法更简洁：

```python
from PIL import Image

response = client.models.generate_content(
    model="gemini-3.1-flash-image",
    contents=[
        "让第二张图中的人穿上第一张图中的蓝色连衣裙，生成一张专业电商照片",
        Image.open("dress.png"),
        Image.open("model.png"),
    ],
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(aspect_ratio="3:4", image_size="2K"),
    ),
)
```

### 多轮对话迭代

将上一轮的完整 parts（含 `inlineData` 和 `thoughtSignature`）原样传回：

```python
API_BASE = "https://api.code-opendoor.com"
API_KEY  = "YOUR_API_KEY"
MODEL    = "gemini-3.1-flash-image"
HEADERS  = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

def chat_image(history, config=None):
    body = {
        "contents": history,
        "generationConfig": config or {"responseModalities": ["TEXT", "IMAGE"]}
    }
    resp = requests.post(
        f"{API_BASE}/v1beta/models/{MODEL}:generateContent",
        headers=HEADERS, json=body, timeout=300)
    resp.raise_for_status()
    return resp.json()

# 第一轮：生成
history = [{"role": "user", "parts": [{"text": "画一只橘猫坐在窗台上"}]}]
r1 = chat_image(history)

# 将模型回复加入历史
model_parts = r1["candidates"][0]["content"]["parts"]
history.append({"role": "model", "parts": model_parts})

# 第二轮：修改
history.append({"role": "user", "parts": [{"text": "把背景改成下雨天"}]})
r2 = chat_image(history)
```

### 思考模式（flash）

```json
{
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {"aspectRatio": "1:1", "imageSize": "1K"},
    "thinkingConfig": {
      "thinkingLevel": "high",
      "includeThoughts": true
    }
  }
}
```

提取最终图片时跳过 thought parts：

```python
for part in data["candidates"][0]["content"]["parts"]:
    if part.get("thought"):
        continue
    if "inlineData" in part:
        image_bytes = base64.b64decode(part["inlineData"]["data"])
```

### Google 搜索接地

基于实时搜索数据生成图片：

```json
{
  "contents": [{"parts": [{"text": "可视化今天的天气预报"}]}],
  "tools": [{"google_search": {}}],
  "generationConfig": {
    "responseModalities": ["TEXT", "IMAGE"],
    "imageConfig": {"aspectRatio": "16:9"}
  }
}
```

## 注意事项

1. `imageSize` 必须大写 K：`1K`、`2K`、`4K`，小写会报错
2. `512px` 档位仅 flash 支持，pro 不支持
3. 4K 分辨率生成可能需要 2-5 分钟，务必设置足够的超时
4. Token 消耗参考：512px 约 747，1K 约 1120，4K 约 2000
5. 不传 `imageConfig` 时默认输出约 1408×768
6. 响应图片格式通常为 `image/png`，偶尔为 `image/jpeg`
7. 所有生成图片均包含 SynthID 数字水印
