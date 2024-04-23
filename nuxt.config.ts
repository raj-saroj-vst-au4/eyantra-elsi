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
  ],

  routeRules: {
    "/backendapi/**": {
      proxy: {
        to: `${process.env.NUXT_APP_BACKEND_URL}/api/**`,
      },
    },
    "/hardlogout": {
      redirect: `${process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_BASE_URL}/protocol/openid-connect/logout?post_logout_redirect_uri=${process.env.NUXT_APP_DOMAIN}&client_id=${process.env.NUXT_OIDC_PROVIDERS_KEYCLOAK_CLIENT_ID}`,
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
        redirectUri: "http://localhost:3000/auth/keycloak/callback",
        exposeAccessToken: true,
      },
    },
    middleware: {
      globalMiddlewareEnabled: true,
      customLoginPage: false,
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
    ],
  },
});
