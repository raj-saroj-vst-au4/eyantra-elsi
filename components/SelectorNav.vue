<template>
  <nav
    class="navigation fixed bottom-8 left-[10%] z-30 w-4/5 rounded-3xl border-gray-200 bg-slate-700 dark:border-gray-600"
  >
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/eyantralogo.svg" class="h-8" alt="Eyantra Logo" />
        <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          >Eyantra</span
        >
      </NuxtLink>
      <div class="flex flex-row justify-between text-gray-200">
        <UiTooltip disable-closing-trigger>
          <template #trigger>
            <UiTooltipTrigger as-child>
              <UiButton size="icon"
                ><Icon class="h-6 w-6 font-extrabold" name="lucide:home"
              /></UiButton>
            </UiTooltipTrigger>
          </template>
          <template #content>
            <UiTooltipContent>
              <p>Go back to portal</p>
            </UiTooltipContent>
          </template>
        </UiTooltip>

        <UiTooltip disable-closing-trigger>
          <template #trigger>
            <UiTooltipTrigger as-child>
              <UiButton size="icon" @click="closeTime"
                ><Icon class="h-6 w-6 font-extrabold" name="lucide:refresh-cw"
              /></UiButton>
            </UiTooltipTrigger>
          </template>
          <template #content class="bg-gray-600">
            <UiTooltipContent>
              <p>Reset Curtains</p>
            </UiTooltipContent>
          </template>
        </UiTooltip>
      </div>
      <div class="flex space-x-3 dark:text-white md:order-2 md:space-x-0 rtl:space-x-reverse">
        <div class="text-xl font-extrabold">
          Time to welcome :<UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton class="hover ml-4 rounded-2xl bg-slate-500 text-lg hover:bg-slate-600"
                >Select College</UiButton
              >
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-max">
              <UiDropdownMenuLabel label="Choose College" class="text-red-600" />
              <UiDropdownMenuSeparator />
              <template v-for="h in heroList" :key="h.id">
                <UiDropdownMenuCheckboxItem
                  :checked="selectedHeros.includes(h.id)"
                  @select="(e) => e.preventDefault()"
                  class="mb-1"
                  @update:checked="
                    selectedHeros.includes(h.id)
                      ? selectedHeros.splice(selectedHeros.indexOf(h.id), 1)
                      : selectedHeros.push(h.id)
                  "
                >
                  <div class="flex items-center gap-4">
                    <UiAvatar :src="h.image" class="h-6 w-6" :alt="h.name" />
                    <span>{{ h.name }}</span>
                  </div>
                </UiDropdownMenuCheckboxItem>
              </template>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <UiTooltip disable-closing-trigger>
        <template #trigger>
          <UiTooltipTrigger as-child>
            <UiButton size="icon" @click="showTime"
              ><Icon class="h-6 w-6 font-extrabold text-gray-200" name="lucide:drum"
            /></UiButton>
          </UiTooltipTrigger>
        </template>
        <template #content class="bg-gray-600">
          <UiTooltipContent>
            <p>Start Inauguration</p>
          </UiTooltipContent>
        </template>
      </UiTooltip>
    </div>
  </nav>
</template>
<script setup>
  const heroList = [
    {
      name: "Batman",
      id: "1",
      image:
        "https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg",
    },
    {
      name: "Superman",
      id: "2",
      image: "https://s26162.pcdn.co/wp-content/uploads/2023/02/superman-1240x692.jpeg",
    },
    {
      name: "Hulk",
      id: "3",
      image:
        "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/The-Hulk.The-Incredible-Hulk.webp",
    },
  ];
  const selectedHeros = ref([]);

  const props = defineProps({
    showTime: {
      type: Function,
      required: true,
    },
    closeTime: {
      type: Function,
      required: true,
    },
  });
</script>
