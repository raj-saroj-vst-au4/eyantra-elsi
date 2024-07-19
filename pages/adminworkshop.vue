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
      <div v-for="item in workshops" :key="item">
        <NuxtLink :to="link">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            v-if="item.wsimgurl"
            :src="item.wsimgurl"
            :alt="altThumnailImage"
            class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
          />
        </NuxtLink>
        <p v-if="item.wsname" class="mb-2 text-sm font-semibold text-primary">{{ item.wsname }}</p>
        <NuxtLink :to="link">
          <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ item.wsname }}</p>
        </NuxtLink>
        <UiHoverCard>
          <UiHoverCardTrigger as-child>
            <p v-if="item.wsdesc" class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground">
              {{ item.wsdesc.substring(0, 20) + (item.wsdesc.length > 20 ? "..." : "") }}
            </p>
          </UiHoverCardTrigger>
          <UiHoverCardContent class="w-50 overflow-hidden rounded-lg p-2">
            <div class="group relative flex h-full w-full flex-col justify-end overflow-hidden">
              <p class="mt-2 text-sm">{{ item.wsdesc }}</p>
            </div>
          </UiHoverCardContent>
        </UiHoverCard>
        <!-- <p v-if="item.wsdesc" class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground">
            {{ item.wsdesc.substring(0, 20) + (item.wsdesc.length > 20 ? "..." : "") }}
          </p> -->
        <div class="flex items-center">
          <UiAvatar
            v-if="altUserImage"
            :src="altUserImage"
            :alt="item.wsfalic.name"
            class="mr-3 rounded-full bg-background shadow ring-1 ring-ring/30"
          />
          <div>
            <p v-if="item.wsfalic.name" class="text-sm font-semibold text-white">
              {{ item.wsfalic.name }}
            </p>
            <p v-if="item.wsstart" class="text-sm text-muted-foreground">
              {{ formatDate(item.wsstart) + " to " + formatDate(item.wsend) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <UiButton class="mt-10 w-full shrink-0 whitespace-nowrap md:hidden">Create Workshop</UiButton>
  </UiContainer>
  <CreateWorkshopModal
    v-if="showWorkshopModal"
    :showWorkshopModal="showWorkshopModal"
    :fetchWorkshops="fetchWorkshops"
    :triggerWorkshopModal="triggerWorkshopModal"
  />
</template>

<script setup>
  const showWorkshopModal = ref(false);
  const workshops = ref();

  const triggerWorkshopModal = (clg) => {
    if (showWorkshopModal.value) {
      showWorkshopModal.value = false;
    } else {
      showWorkshopModal.value = true;
    }
  };

  const fetchWorkshops = async () => {
    const response = await useAuthFetch(`/backendapi/fetchworkshops`);
    console.log(response);
    workshops.value = response;
  };
  onMounted(async () => {
    await fetchWorkshops();
  });

  const altThumnailImage =
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const altUserImage = "https://api.dicebear.com/7.x/lorelei/svg?flip=false";

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toISOString().split("T")[0];
  };
</script>
