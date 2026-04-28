<template>
  <div class="cli-window">
    <div class="cli-titlebar">
      <span class="dot red" />
      <span class="dot yellow" />
      <span class="dot green" />
      <span class="cli-title">terminal</span>
    </div>
    <div class="cli-body">
      <div v-for="(line, i) in visibleLines" :key="i" class="cli-line">
        <span v-if="line.type === 'input'" class="prompt">$ </span>
        <span v-if="line.type === 'input'" class="cmd">{{ line.text }}</span>
        <span v-if="line.type === 'output'" class="output">{{ line.text }}</span>
        <span v-if="line.type === 'success'" class="success">{{ line.text }}</span>
      </div>
      <div class="cli-line">
        <span class="prompt">$ </span>
        <span class="cmd">{{ currentTyping }}</span>
        <span class="cursor" :class="{ blink: isWaiting }">▋</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lines = [
  { type: 'input',   text: 'curl https://api.code-opendoor.com/v1/models' },
  { type: 'output',  text: '{"models":["gpt-4o","claude-opus-4","gemini-2.5-pro",...]}' },
  { type: 'input',   text: 'export OPENAI_API_KEY=sk-opendoor-****' },
  { type: 'input',   text: 'export OPENAI_BASE_URL=https://api.code-opendoor.com/v1' },
  { type: 'success', text: '✓ 配置完成，所有客户端即可使用' },
  { type: 'input',   text: 'cherry-studio --model claude-opus-4' },
  { type: 'success', text: '✓ 已连接，开始对话...' },
]

const visibleLines = ref([])
const currentTyping = ref('')
const isWaiting = ref(false)

let timer = null
let lineIndex = 0
let charIndex = 0

function tick() {
  if (lineIndex >= lines.length) {
    // 循环播放
    setTimeout(() => {
      visibleLines.value = []
      currentTyping.value = ''
      lineIndex = 0
      charIndex = 0
      isWaiting.value = false
      timer = setTimeout(tick, 600)
    }, 2500)
    return
  }

  const line = lines[lineIndex]

  if (line.type === 'output' || line.type === 'success') {
    // 直接显示，不打字
    visibleLines.value.push(line)
    lineIndex++
    charIndex = 0
    timer = setTimeout(tick, line.type === 'success' ? 600 : 400)
    return
  }

  // 打字效果
  if (charIndex < line.text.length) {
    currentTyping.value = line.text.slice(0, charIndex + 1)
    charIndex++
    timer = setTimeout(tick, 45)
  } else {
    // 打完一行，停顿后提交
    isWaiting.value = true
    timer = setTimeout(() => {
      isWaiting.value = false
      visibleLines.value.push({ ...line, text: currentTyping.value })
      currentTyping.value = ''
      lineIndex++
      charIndex = 0
      timer = setTimeout(tick, 300)
    }, 500)
  }
}

onMounted(() => { timer = setTimeout(tick, 800) })
onUnmounted(() => clearTimeout(timer))
</script>

<style scoped>
.cli-window {
  width: 100%;
  max-width: 620px;
  border-radius: 10px;
  overflow: hidden;
  background: #1a1b26;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  line-height: 1.7;
}

.cli-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #24283b;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red    { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green  { background: #28c840; }

.cli-title {
  margin-left: 6px;
  color: #565f89;
  font-size: 12px;
}

.cli-body {
  padding: 16px 20px 20px;
  min-height: 200px;
}

.cli-line {
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
}

.prompt { color: #7aa2f7; user-select: none; }
.cmd    { color: #c0caf5; }
.output { color: #565f89; }
.success { color: #9ece6a; }

.cursor {
  color: #7aa2f7;
  margin-left: 1px;
}
.cursor.blink {
  animation: blink 0.8s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
</style>
