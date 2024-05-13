<template>
  <h1>Index Page</h1>
  <h3 class="text-white">user: {{ user }}</h3>
  <UiButton @click="logout('keycloak')">Logout</UiButton>
  <UiButton @click="signout">hard Logout</UiButton>
</template>
<script setup>
  const { loggedIn, user, refresh, login, logout, currentProvider, clear } = useOidcAuth();
  const signout = async () => {
    console.log("logging out");
    await navigateTo("/hardlogout", { external: true });
    await logout("keycloak");
  };
</script>
