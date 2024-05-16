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
  ],

  routeRules: {
    "/backendapi/**": {
      proxy: {
        to: `${process.env.NUXT_APP_BACKEND_URL}/api/**`,
      },
    },
    "/keycloakapi/**": {
      proxy: {
        to: `${process.env.NUXT_OIDC_ADMIN_KEYCLOAK_URL}/**`,
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
      automaticRefresh: true,
      expirationCheck: true,
      expirationThreshold: 3600,
      maxAge: 1800,
    },
  },

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