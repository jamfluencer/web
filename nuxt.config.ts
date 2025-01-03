// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@vueuse/nuxt'],
  imports: {
    presets: [
      {
        from: '@vueuse/integrations/useFocusTrap',
        imports: ['useFocusTrap'],
      },
      {
        from: 'gsap',
        imports: ['gsap'],
      }
    ],
  },
  runtimeConfig: {
    public: {
      jamfluencerApiBaseUrl: 'https://api.jamfluencer.app',
      jamfluencerWsUrl: 'ws.jamfluencer.app',
      jamfluencerWsKey: 'SXZDtsf4iIMDznhL',
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['search'].includes(tag),
    }
  },
  compatibilityDate: '2024-09-09'
});