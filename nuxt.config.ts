// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@clerk/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/storybook',
    '@nuxtjs/mcp-toolkit'
  ]
})