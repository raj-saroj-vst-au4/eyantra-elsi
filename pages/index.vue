<template>
  <InaugSessionCard />
</template>
<script setup>
  const { loggedIn, user, refresh, login, logout, currentProvider } = useOidcAuth();
</script>
