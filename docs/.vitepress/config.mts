import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Opendoor-DOCS',
  description: 'AI 使用教程与心得',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '配置教程', link: '/guide/setup' },
      { text: '生图使用教程', link: '/image/intro' },
      { text: '使用心得', link: '/tips/intro' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '安装教程',
          items: [
            { text: '快速开始', link: '/guide/setup' },
            { text: 'Claude Code 安装教程', link: '/guide/claude-install' },
            { text: 'Codex 安装教程', link: '/guide/codex-install' },
            { text: 'Gemini 安装教程', link: '/guide/gemini-install' },
          ],
        },
        {
          text: '基础信息',
          items: [
            { text: '平台模型 ID', link: '/guide/models' },
            { text: 'CC Switch 一键导入', link: '/guide/cc-switch' },
          ],
        },
        {
          text: '官方 CLI 配置',
          items: [
            { text: 'Claude CLI 配置', link: '/guide/claude' },
            { text: 'Codex CLI 配置', link: '/guide/codex' },
            { text: 'Gemini CLI 配置', link: '/guide/gemini' },
          ],
        },
        {
          text: '官方 IDE 插件',
          items: [
            { text: 'Claude Code VS Code 插件', link: '/guide/claude-vscode' },
            { text: 'Codex VS Code 插件', link: '/guide/codex-vscode' },
            { text: 'Gemini CLI VS Code 插件', link: '/guide/gemini-vscode' },
            { text: 'Claude Code IDEA 插件', link: '/guide/claude-jetbrains' },
            { text: 'Codex IDEA 插件说明', link: '/guide/codex-jetbrains' },
            { text: 'Gemini IDEA 插件配置', link: '/guide/gemini-jetbrains' },
            { text: 'JetBrains AI Assistant 配置', link: '/guide/jetbrains-openai-compatible' },
          ],
        },
        {
          text: '第三方客户端接入',
          items: [
            { text: 'OpenCode 配置', link: '/guide/opencode' },
            { text: 'OpenClaw 配置', link: '/guide/openclaw' },
            { text: 'Hermes 配置', link: '/guide/hermes' },
            { text: 'Cline 配置', link: '/guide/cline' },
          ],
        },
        {
          text: '常见问题',
          items: [
            { text: 'VS Code / Cursor 第三方端点修复', link: '/guide/fix-vscode-cursor-third-party-endpoint' },
          ],
        },
      ],
      '/image/': [
        {
          text: '生图使用教程',
          items: [
            { text: '概览', link: '/image/intro' },
            { text: 'Nanobanana', link: '/image/gemini' },
            { text: 'GPT-Image2', link: '/image/openai' },
            { text: 'OpenDoor-Image-Skills', link: '/image/skills' },
          ],
        },
      ],
      '/skills/': [
        {
          text: 'Skills',
          items: [
            { text: 'opendoor-image-skills', link: '/skills/image' },
          ],
        },
      ],
      '/tips/': [
        {
          text: '使用心得',
          items: [
            { text: '简介', link: '/tips/intro' },
          ],
        },
      ],
    },
    socialLinks: [],
    logo: '/logo.png',
    footer: { message: 'opendoor' },
    search: { provider: 'local' },
  },
})
