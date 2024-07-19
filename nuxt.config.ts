// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-oidc-auth",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@nuxt/image",
    "@samk-dev/nuxt-vcalendar",
  ],

  routeRules: {
    "/backendapi/**": {
      proxy: {
        to: `${process.env.NUXT_APP_BACKEND_URL}/api/**`,
      },
    },
    "/hardlogout": {
      redirect: `${process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_BASE_URL}/protocol/openid-connect/logout?post_logout_redirect_uri=${process.env.NUXT_APP_DOMAIN}/auth/keycloak/logout&client_id=${process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_CLIENT_ID}`,
    },
  },

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "",
  },

  typescript: {
    shim: false,
  },

  oidc: {
    defaultProvider: "keycloak",
    providers: {
      keycloak: {
        tokenRequestType: "form-urlencoded",
        baseUrl: process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_BASE_URL as string,
        clientId: process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_CLIENT_ID as string,
        clientSecret: process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_CLIENT_SECRET as string,
        redirectUri: process.env.NUXT_APP_DOMAIN + "/auth/keycloak/callback",
        exposeAccessToken: true,
      },
    },
    middleware: {
      globalMiddlewareEnabled: true,
      customLoginPage: true,
    },
    session: {
      // automaticRefresh: true,
      // expirationCheck: true,
      expirationThreshold: 3600,
      maxAge: 1800,
      cookie: {
        sameSite: false,
        secure: true,
      },
    },
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_APP_BACKEND_URL,
      oidcAdminKeycloakUrl: process.env.NUXT_OIDC_ADMIN_KEYCLOAK_URL,
      oidcProvidersKeycloakBaseUrl: process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_BASE_URL,
      oidcProvidersKeycloakClientId: process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_CLIENT_ID,
    },
  },

  plugins: [
    "~/plugins/canvas-confetti.js",
    "~/plugins/apex.client.js",
    "~/plugins/errorHandler.js",
  ],

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  build: {
    transpile: ["vue-sonner"],
  },
});
