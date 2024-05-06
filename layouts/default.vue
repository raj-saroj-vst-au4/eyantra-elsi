<template>
  <Sidebar />

  <div class="min-h-screen bg-gray-900 p-4 sm:ml-64">
    <slot class="p-4 sm:ml-64" :isLoading="isLoading" />
  </div>
</template>
<script setup>
  useState("isLoading", () => true);
  const isLoading = useState("isLoading");
</script>
