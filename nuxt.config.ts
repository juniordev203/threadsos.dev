// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // --- Global CSS ---
  css: ['~/assets/css/main.css'],

  // --- Modules ---
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@clerk/nuxt',
    '@nuxtjs/google-fonts',
  ],

  // --- Runtime Config (env variables) ---
  runtimeConfig: {
    // Server-only (not exposed to client)
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    clerkSecretKey: process.env.CLERK_SECRET_KEY || '',

    // Public (exposed to client)
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '',
    },
  },


  // --- Google Fonts ---
  googleFonts: {
    families: {
      'Geist': [400, 500, 600, 700],
      'JetBrains Mono': [400, 500, 600],
    },
    display: 'swap',
    preload: true,
  },

  // --- App Meta ---
  app: {
    head: {
      title: 'AI Growth OS for Threads',
      meta: [
        { name: 'description', content: 'Biến ý tưởng thô thành bài Threads chất lượng trong 3 phút.' },
        { name: 'theme-color', content: '#0C0C0C' },
      ],
    },
  },
})