<template>
  <UiContainer class="py-8 lg:py-12">
    <div class="flex flex-col md:flex-row md:justify-between">
      <div>
        <p class="mb-3 font-semibold text-primary">Workshops</p>
        <h3 class="mb-2 text-3xl font-semibold dark:text-white lg:text-4xl">
          Our latest offerings
        </h3>
      </div>
      <UiButton @click="triggerWorkshopModal" class="hidden shrink-0 whitespace-nowrap md:flex"
        >Create Workshop</UiButton
      >
    </div>

    <div class="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-3">
      <div v-for="item in 3" :key="item">
        <NuxtLink :to="link">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            v-if="image"
            :src="image"
            :alt="alt"
            class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
          />
        </NuxtLink>
        <p v-if="headline" class="mb-2 text-sm font-semibold text-primary">{{ headline }}</p>
        <NuxtLink :to="link">
          <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ title }}</p>
        </NuxtLink>
        <p v-if="description" class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground">
          {{ description }}
        </p>
        <div class="flex items-center">
          <UiAvatar
            v-if="userImage"
            :src="userImage"
            :alt="userName"
            class="mr-3 rounded-full bg-background shadow ring-1 ring-ring/30"
          />
          <div>
            <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
            <p v-if="date" class="text-sm text-muted-foreground">{{ date }}</p>
          </div>
        </div>
      </div>
    </div>
    <UiButton class="mt-10 w-full shrink-0 whitespace-nowrap md:hidden">Create Workshop</UiButton>
  </UiContainer>
  <CreateWorkshopModal
    v-if="showWorkshopModal"
    :showWorkshopModal="showWorkshopModal"
    :trigger="triggerWorkshopModal"
  />
</template>

<script setup>
  const showWorkshopModal = ref(false);

  const triggerWorkshopModal = (clg) => {
    if (showWorkshopModal.value) {
      showWorkshopModal.value = false;
    } else {
      showWorkshopModal.value = true;
    }
  };
  const headline = "Design";
  const title = "UX review presentations";
  const alt = "UX review presentations";
  const image =
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const description =
    "How do you create compelling presentations that wow your colleagues and impress your managers?";
  const date = "30 Jan 2024";
  const userImage = "https://api.dicebear.com/7.x/lorelei/svg?flip=false";
  const userName = "John Doe";
  const link = "#";
</script>
