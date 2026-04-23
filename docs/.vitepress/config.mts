import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '推开世界的门',
  description: 'AI 使用教程与心得',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '配置教程', link: '/guide/setup' },
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
    footer: { message: '推开世界的门' },
    search: { provider: 'local' },
  },
})
