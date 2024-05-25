<template>
  <slot />
</template>
<script setup>
  import { useAuthUserStore } from "@/stores/user";

  useState("isLoading", () => true);
  const userStore = useAuthUserStore();

  onMounted(() => {
    if (!userStore.isSignedUp) {
      console.log("checking signup");
      userStore.checkSignup();
    }
  });
</script>
