<template>
  <nav
    class="navigation fixed bottom-8 left-[10%] z-30 w-4/5 rounded-3xl border-gray-200 bg-slate-700 dark:border-gray-600"
  >
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/eyantralogo.svg" class="h-8" alt="Eyantra Logo" />
        <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          >Eyantra</span
        >
      </NuxtLink>
      <div class="flex space-x-3 dark:text-white md:order-2 md:space-x-0 rtl:space-x-reverse">
        <div>content</div>
      </div>
    </div>
  </nav>
</template>
<script setup></script>
