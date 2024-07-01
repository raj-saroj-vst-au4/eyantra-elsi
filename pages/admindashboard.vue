<template>
  <div class="flex flex-col text-white">
    <YearlyGraph />
  </div>
</template>
<script>
  const { user } = useOidcAuth();
  console.log(user.value);
</script>
