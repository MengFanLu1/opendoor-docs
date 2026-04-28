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
          text: '配置教程',
          items: [
            { text: '快速开始', link: '/guide/setup' },
            { text: 'API Key 配置', link: '/guide/apikey' },
            { text: '客户端配置', link: '/guide/client' },
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
