<template>
  <div class="flex flex-col text-white">
    <div class="flex w-full flex-col items-center justify-around lg:flex-row">
      <RadialBar />
      <Radar />
      <Pie />
    </div>
    <YearlyGraph />
  </div>
</template>
<script>
  const { user } = useOidcAuth();
  console.log(user.value);
</script>
