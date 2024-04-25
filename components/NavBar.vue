<template>
  <nav
    class="navigation fixed left-[10%] top-8 z-30 w-4/5 rounded-3xl border-gray-200 bg-slate-700 dark:border-gray-600"
    :class="{ hidden: !isNavbarVisible }"
  >
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/eyantralogo.svg" class="h-8" alt="Eyantra Logo" />
        <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          >Eyantra</span
        >
      </NuxtLink>
      <div class="flex space-x-3 dark:text-white md:order-2 md:space-x-0 rtl:space-x-reverse">
        <span v-if="loggedIn && user" class="whitespace-nowrap text-2xl font-semibold"
          >Welcome back, {{ user.providerInfo.name }} !</span
        >
        <button
          v-else
          @click="login('keycloak')"
          type="button"
          class="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
</template>
<script setup>
  const { login, loggedIn, user } = useOidcAuth();
  const isNavbarVisible = ref(true);

  let lastScrollTop = 0;

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll() {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop && currentScrollTop > 0) {
      isNavbarVisible.value = false;
    } else {
      isNavbarVisible.value = true;
    }

    lastScrollTop = currentScrollTop;
  }
</script>
