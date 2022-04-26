import colors from 'vuetify/es5/util/colors'
import fa from 'vuetify/es5/locale/fa'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - front',
    title: 'front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
   css: ['~/assets/scss/styles.scss', '@mdi/font/css/materialdesignicons.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
   plugins: [
    '@/plugins/axios',
    '@/plugins/mixin',

    '@/plugins/dynamicDomain',
   
  ],

  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/',
    },
    token: {
      prefix: 'token_',
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
      },
    },
    localStorage: {
      prefix: 'auth.',
    },

    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/user/login',
            method: 'post',
            propertyName: 'data.access_token',
          },
          logout: false,
          user: {
            url: '/user/profile',
            method: 'get',
            propertyName: 'data',
          },
        },
        tokenType: 'Bearer',
      },
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/universal-storage',
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
 
    customVariables: ['~/assets/variables.scss'],
    treeShake:true,
    rtl: true,
         lang: {
      locales: { fa },
           current: 'fa',

    },
         
    theme: {
      dark: true,
      themes: {
          options: { customProperties: true },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          grey_deep_1:"#202225",
          grey_deep_2:"#2F3136",
         
          background: "#36393F",
          text_color_grey: "#9f9f9f",
          orange_color_1:"#ffbe00"
          
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
