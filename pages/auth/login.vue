<template>
  <div class="flex h-screen items-center justify-between bg-slate-500">
    <div class="w-full md:w-1/2">
      <div class="mx-auto w-full max-w-[330px] px-5">
        <h1 class="text-2xl font-bold tracking-tight dark:text-white lg:text-3xl">Log in</h1>
        <form class="mt-10">
          <fieldset class="grid gap-5">
            <UiButton variant="outline" type="button" @click="login('keycloak')">
              <Icon class="size-4" name="simple-icons:keycloak" />
              <span class="ml-2">Login with Keycloak</span>
            </UiButton>
          </fieldset>
        </form>
        <!-- <UiDivider class="mt-8" /> -->
        <!-- <p class="mt-8 text-sm">
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
            >Forgot password?</NuxtLink
          >
        </p>
        <p class="mt-4 text-sm text-muted-foreground dark:text-white">
          Don't have an account?
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
            >Create account</NuxtLink
          >
        </p> -->
      </div>
    </div>
    <div class="hidden h-screen md:block md:w-1/2 lg:w-1/2">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        src="https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=60&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Login form image"
        class="size-full object-cover"
      />
    </div>
  </div>
</template>
<script setup>
  const { loggedIn, user, refresh, login, logout, currentProvider, clear } = useOidcAuth();
</script>
