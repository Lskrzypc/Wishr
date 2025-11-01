import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Wishr - Make wishlists for every occasion',
      link: [
        {
          rel: 'icon',
          type: 'image/svg',
          href: '/icons/favicon-72.png',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/svg',
          href: '/icons/favicon-192.png',
          sizes: '192x192',
        },
      ],

      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['@/assets/css/main.css'],
  devtools: { enabled: true },
  fonts: {
    families: [{ name: 'Outfit', provider: 'Google' }],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-vuefire',
    '@nuxt/fonts',
  ],
  runtimeConfig: {
    public: {
      auth: {
        wishrClientId: process.env.NUXT_PUBLIC_WISHR_CLIENT_ID,
        wishrDomain: process.env.NUXT_PUBLIC_WISHR_DOMAIN,
      },
    },
    firebase: {
      apiKey: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  vuefire: {
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },
});
