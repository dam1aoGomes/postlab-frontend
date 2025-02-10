// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules : ['@pinia/nuxt','@nuxtjs/tailwindcss'],
  ssr : true,
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL
    }
  }
})
