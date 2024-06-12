<template>
  <nav
    class="navigation fixed bottom-8 left-[10%] z-30 w-4/5 rounded-3xl border-gray-200 bg-slate-700 dark:border-gray-600"
  >
    <div class="mx-auto flex max-w-screen-xl items-center justify-between p-4">
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/eyantralogo.svg" class="h-8" alt="Eyantra Logo" />
        <span
          class="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white md:block"
          >Eyantra</span
        >
      </NuxtLink>
      <div class="flex space-x-3 dark:text-white md:space-x-0 rtl:space-x-reverse">
        <div class="flex items-center text-xl font-extrabold">
          <span class="hidden lg:block">Slot :</span
          ><UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton class="hover ml-4 rounded-2xl bg-slate-500 text-lg hover:bg-slate-600"
                >Demo</UiButton
              >
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-max">
              <UiDropdownMenuLabel label="Choose Slot" class="text-red-600" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuRadioGroup v-model="selectedSlot">
                <UiDropdownMenuRadioItem
                  v-for="item in inaugSlots"
                  :key="item"
                  :value="item"
                  :title="item"
                  :text-value="item"
                />
              </UiDropdownMenuRadioGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <div class="flex space-x-3 dark:text-white md:space-x-0 rtl:space-x-reverse">
        <div class="flex items-center text-xl font-extrabold">
          <span class="hidden lg:block">Time to welcome :</span
          ><UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton class="hover ml-4 rounded-2xl bg-slate-500 text-lg hover:bg-slate-600"
                >Select College</UiButton
              >
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-max">
              <UiDropdownMenuLabel label="Choose College" class="text-red-600" />
              <UiDropdownMenuSeparator />
              <template v-for="h in currentList" :key="h.id">
                <UiDropdownMenuCheckboxItem
                  :checked="selectedColleges.includes(h.id)"
                  @select="(e) => e.preventDefault()"
                  class="mb-1"
                  @update:checked="
                    selectedColleges.includes(h.id)
                      ? selectedColleges.splice(selectedColleges.indexOf(h.id), 1)
                      : selectedColleges.push(h.id)
                  "
                >
                  <div class="flex items-center gap-4">
                    <Icon
                      name="lucide:building-2"
                      class="size-4 text-muted-foreground text-white"
                    />
                    <span>{{ h.name }}</span>
                  </div>
                </UiDropdownMenuCheckboxItem>
              </template>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <div class="flex flex-row items-center gap-2 text-gray-200">
        <UiTooltip disable-closing-trigger>
          <template #trigger>
            <UiTooltipTrigger as-child>
              <NuxtLink to="/"><Icon class="h-6 w-6 font-extrabold" name="lucide:home" /></NuxtLink>
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
              <button size="icon" @click="closeTime">
                <Icon class="h-6 w-6 font-extrabold" name="lucide:refresh-cw" />
              </button>
            </UiTooltipTrigger>
          </template>
          <template #content class="bg-gray-600">
            <UiTooltipContent>
              <p>Reset Curtains</p>
            </UiTooltipContent>
          </template>
        </UiTooltip>
        <span>|</span>
        <UiTooltip disable-closing-trigger>
          <template #trigger>
            <UiTooltipTrigger as-child>
              <button size="icon" @click="showTime">
                <Icon class="h-6 w-6 font-extrabold text-gray-200" name="lucide:drum" />
              </button>
            </UiTooltipTrigger>
          </template>
          <template #content class="bg-gray-600">
            <UiTooltipContent>
              <p>Start Inauguration</p>
            </UiTooltipContent>
          </template>
        </UiTooltip>
      </div>
    </div>
  </nav>
</template>
<script setup>
  const inaugSlots = ref(["Demo"]);
  const selectedSlot = ref("Demo");
  const currentList = ref();
  const selectedColleges = ref([]);

  const collegeList = [
    {
      name: "APS College",
      id: "1",
      image:
        "https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg",
    },
    {
      name: "Vinayak College",
      id: "2",
      image: "https://s26162.pcdn.co/wp-content/uploads/2023/02/superman-1240x692.jpeg",
    },
    {
      name: "Abdul kalam College",
      id: "3",
      image:
        "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/The-Hulk.The-Incredible-Hulk.webp",
    },
  ];
  if (selectedSlot.value == "Demo") {
    currentList.value = collegeList;
    console.log("current list", collegeList);
  }

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
