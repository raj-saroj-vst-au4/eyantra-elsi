<template>
  <Loader v-if="isLoading" />
  <div class="container p-8" v-else>
    <h1
      class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-100 md:text-4xl lg:text-5xl"
    >
      LAB Inauguration Slots
    </h1>
    <div class="mt-8 flex items-center justify-around">
      <form>
        <UiCard
          class="w-[360px] max-w-sm"
          title="Create a Slot"
          description="Add a new lab inauguration slot"
        >
          <template #content>
            <UiCardContent>
              <div class="grid w-full items-center gap-4">
                <div class="flex flex-col space-y-1.5">
                  <UiLabel for="name">Name</UiLabel>
                  <UiInput required id="name" placeholder="Name of slot" />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <UiLabel for="framework">Schedule</UiLabel>
                  <UiDatepicker v-model="date">
                    <template #default="{ togglePopover }">
                      <UiButton
                        variant="outline"
                        :class="[!date && 'text-muted-foreground', 'justify-start text-left']"
                        @click="togglePopover"
                      >
                        <Icon name="lucide:calendar" class="h-4 w-4" />
                        {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
                      </UiButton>
                    </template>
                  </UiDatepicker>
                </div>
                <div class="flex flex-col space-y-1.5">
                  <UiLabel for="framework">Select Non-Elsi Colleges</UiLabel>
                  <UiAutocomplete v-model="selectedColleges" :display-value="inaugSelected">
                    <UiAutocompleteAnchor>
                      <UiAutocompleteInput placeholder="Select Colleges..." />
                      <UiAutocompleteTrigger>
                        <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
                      </UiAutocompleteTrigger>
                    </UiAutocompleteAnchor>

                    <UiAutocompleteContent>
                      <UiAutocompleteEmpty />
                      <UiAutocompleteGroup>
                        <UiAutocompleteLabel>non-elsi colleges</UiAutocompleteLabel>
                        <template v-for="(college, i) in nonelsiColleges" :key="i">
                          <UiAutocompleteItem :value="college.college_name" icon="lucide:check">{{
                            college.college_name.substring(0, 30) +
                            (college.college_name.length > 30 ? "..." : "")
                          }}</UiAutocompleteItem>
                        </template>
                      </UiAutocompleteGroup>
                    </UiAutocompleteContent>
                  </UiAutocomplete>
                </div>
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter class="flex justify-between">
              <UiButton type="reset" variant="outline">Cancel</UiButton>
              <UiButton type="submit">Create</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </form>
      <div>
        <UiCard
          class="w-[360px] max-w-sm p-4"
          title="Upcoming Slot"
          description="Selected Non-Elsi Colleges"
        >
          <template #content>
            <UiListbox v-model="selected" multiple>
              <UiListboxFilter v-model="search" placeholder="Search..." />
              <UiListboxContent>
                <UiListboxGroup>
                  <template v-if="filteredPeople?.length > 0">
                    <UiListboxGroupLabel>People</UiListboxGroupLabel>
                    <template v-for="p in filteredPeople" :key="p.id">
                      <UiListboxItem :value="p">
                        <span>{{ p }}</span>
                      </UiListboxItem>
                    </template>
                  </template>
                  <template v-else>
                    <div class="flex items-center justify-center py-5 text-sm font-medium">
                      <p>No results found</p>
                    </div>
                  </template>
                </UiListboxGroup>
              </UiListboxContent>
            </UiListbox>
          </template>
        </UiCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { format } from "date-fns";

  const isLoading = ref(true);
  const collegesStore = useCollegesStore();
  const selectedColleges = ref([]);
  const date = ref();
  const nonelsiColleges = ref([]);

  const fetchColleges = async () => {
    await collegesStore.fetchColleges();
    isLoading.value = false;
  };

  onBeforeMount(() => {
    fetchColleges().then(async () => {
      nonelsiColleges.value = await collegesStore.colleges.filter(
        (college) => college.IS_eLSI === 2
      );
    });
    console.log("all elsi colleges", nonelsiColleges);
  });
</script>
