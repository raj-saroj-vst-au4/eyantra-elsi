<template>
  <h1>Index Page</h1>
  <h3>user: {{ user }}</h3>
</template>
<script setup>
  const { loggedIn, user, refresh, login, logout, currentProvider, clear } = useOidcAuth();
</script>
