// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image"],
  runtimeConfig: {
    public: {
      playlistId: process.env.PLAYLIST_ID,
    },
  },
});