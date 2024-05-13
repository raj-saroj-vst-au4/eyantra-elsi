<template>
  <!-- <Sidebar :userData="userStore.user" /> -->

  <Sidebar />
  <div class="min-h-screen bg-gray-900 p-4 sm:ml-64">
    <slot class="p-4 sm:ml-64" :isLoading="isLoading" />
  </div>
</template>
<script setup>
  import { useAuthUserStore } from "@/stores/user";

  useState("isLoading", () => true);
  const isLoading = useState("isLoading");
  const userStore = useAuthUserStore();

  onMounted(() => {
    if (!userStore.isSignedUp) {
      console.log("checking signup");
      userStore.checkSignup();
    }
  });
</script>
