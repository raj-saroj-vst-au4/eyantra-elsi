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
          <span class="hidden lg:block">Time to welcome :</span
          ><UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton class="hover ml-4 rounded-2xl bg-slate-500 text-lg hover:bg-slate-600" 
                >
                <template v-if="selectedCollege.value==''" >
                  <span>selectedCollege</span>
                </template>
                <template v-else>
                  <span>{{
                    selectedCollege.substring(0, 30) +
                      (selectedCollege > 30 ? "..." : "")
                  }}</span>
                </template>
                </UiButton
              >
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-max">
              <UiDropdownMenuLabel label="Choose College" class="text-red-600" />
              <UiDropdownMenuSeparator />
              <template v-for="h in collegeList" :key="h.id">
                <UiDropdownMenuCheckboxItem
                  
                >
                  <div class="flex items-center gap-4">
                    <Icon
                      name="lucide:building-2"
                      class="size-4 text-muted-foreground text-white"
                    />
                    <button @click="triggerSelectCollege(h)">{{ h.college_name.substring(0, 30) +
                      (h.college_name > 30 ? "..." : "") }}</button>
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
              <button size="icon" @click="closefunction">
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
        <UiTooltip>
        <div v-if="inaugurate" >
            <UiTooltipTrigger as-child>
              <button size="icon" :disabled="selectedCollege=='Select College'"  @click="showTime">
                <Icon class="h-6 w-6 font-extrabold text-gray-200" name="lucide:drum" />
              </button>
            </UiTooltipTrigger>
          </div>
          <template  v-else >
            <UiTooltipTrigger as-child>
              <!-- <button size="icon" @click="showTime">
                <Icon class="h-6 w-6 font-extrabold text-gray-200" name="lucide:drum" />
              </button>
             -->
             <UiAlertDialog v-model:open="showConfirmation">
              <UiAlertDialogTrigger as-child>
                <button size="icon" :disabled="selectedCollege=='Select College'"  >
                  <Icon class="h-6 w-6 font-extrabold text-gray-200" name="lucide:drum" />
                </button>
              </UiAlertDialogTrigger>
             
              <UiAlertDialogContent class="bg-white shadow dark:bg-gray-600">
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle class="font-extrabold text-gray-200" >
                    Inaugurated {{ selectedCollege.substring(0, 30) +
                      (selectedCollege > 30 ? "..." : "") }}
                  </UiAlertDialogTitle>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel class="bg-red-500  hover:bg-red-500 text-white " @click="nothing" />
                  <UiAlertDialogAction class=" bg-green-500  hover:bg-green-500 " @click="show" />
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
              </UiAlertDialog>
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
  const selectedCollege = ref('');
  selectedCollege.value = "Select Colleg";
  const collegesStore = useCollegesStore();
  const collegeList = ref([]);
  const showConfirmation = ref(false);
  const inaugurate = ref(false);
  const fetchCollege = async () => {
    await collegesStore.fetchColleges();
    collegeList.value = collegesStore.getColleges.filter((college) => college.IS_eLSI == 2);
  };

  onBeforeMount(async () => {
    fetchCollege();
    // selectedCollege.value = "Select College";
   
  });
  const triggerSelectCollege =  (clg) => {
  // alert(clg);
  selectedCollege.value = clg.college_name;
  collegesStore.setSelectedCollege(clg.id,clg.college_name);
  };
  const show = () => {
    inaugurate.value = true;
    console.log("show",inaugurate.value = true);
    props.showTime();
  };  
  const nothing = () => {
    console.log("nothing");
  };
  const closefunction = () => {
    inaugurate.value = false;
    props.closeTime();
  };
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
