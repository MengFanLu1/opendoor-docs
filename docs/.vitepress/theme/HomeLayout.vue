<template>
  <Layout>
    <template #home-hero-image>
      <CliAnimation />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import CliAnimation from './CliAnimation.vue'

const { Layout } = DefaultTheme
</script>
