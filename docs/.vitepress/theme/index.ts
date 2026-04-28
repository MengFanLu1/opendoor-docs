import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'
import CliAnimation from './CliAnimation.vue'
import './custom.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  enhanceApp({ app }) {
    app.component('CliAnimation', CliAnimation)
  },
} satisfies Theme
