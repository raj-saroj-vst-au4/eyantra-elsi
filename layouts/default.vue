<template>
  <!-- <Sidebar :userData="userStore.user" /> -->

  <Sidebar />
  <div class="min-h-screen bg-gray-900 p-0 sm:ml-64 md:p-4">
    <slot class="sm:ml-64" :isLoading="isLoading" />
  </div>
</template>
<script setup>
  import { useAuthUserStore } from "@/stores/user";

  useState("isLoading", () => true);
  const isLoading = useState("isLoading");
  const userStore = useAuthUserStore();

  onBeforeMount(() => {
    if (!userStore.isSignedUp) {
      console.log("checking signup");
      userStore.checkSignup();
    }
  });
</script>
