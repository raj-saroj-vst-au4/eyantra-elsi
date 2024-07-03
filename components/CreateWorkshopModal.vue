<template>
  <div
    v-if="showWorkshopModal"
    class="fixed inset-0 z-50 flex flex-row items-center justify-center overflow-y-auto overflow-x-hidden"
  >
    <div class="relative max-h-full w-full max-w-md lg:max-w-lg">
      <div class="relative rounded-2xl bg-white shadow dark:bg-gray-700">
        <div class="p-4 md:p-5">
          <div class="relative rounded-lg">
            <!-- Modal header -->
            <div class="flex items-center justify-between rounded-t border-b dark:border-gray-600">
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Create a new Workshop
              </h3>
              <button
                type="button"
                class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="trigger"
              >
                <Icon name="lucide:x" class="size-4 text-muted-foreground" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
              <div class="mb-4 grid grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <label class="text-white">Country :</label>
                  <UiSelect v-bind="componentField">
                    <UiSelectTrigger placeholder="Select Country" />
                    <UiSelectContent>
                      <UiSelectGroup>
                        <UiSelectItem v-for="(e, i) in countries" :key="i" :value="e" :text="e" />
                      </UiSelectGroup>
                    </UiSelectContent>
                  </UiSelect>
                </div>
                <div class="flex flex-col">
                  <label class="text-white">State :</label>
                  <UiSelect v-bind="componentField">
                    <UiSelectTrigger placeholder="Select State" />
                    <UiSelectContent>
                      <UiSelectGroup>
                        <UiSelectItem v-for="(s, i) in states" :key="i" :value="s" :text="s" />
                      </UiSelectGroup>
                    </UiSelectContent>
                  </UiSelect>
                </div>
              </div>
              <div class="mb-4 grid grid-cols-1">
                <label class="text-white">Choose College :</label>
                <UiAutocomplete>
                  <UiAutocompleteAnchor>
                    <UiAutocompleteInput />
                    <UiAutocompleteTrigger>
                      <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
                    </UiAutocompleteTrigger>
                  </UiAutocompleteAnchor>

                  <UiAutocompleteContent>
                    <UiAutocompleteEmpty />
                    <UiAutocompleteGroup>
                      <UiAutocompleteLabel>Colleges</UiAutocompleteLabel>
                      <template v-for="(c, i) in colleges" :key="f">
                        <UiAutocompleteItem :value="f" icon="lucide:check">{{
                          c
                        }}</UiAutocompleteItem>
                      </template>
                    </UiAutocompleteGroup>
                  </UiAutocompleteContent>
                </UiAutocomplete>
              </div>
              <div class="mb-4 grid grid-cols-2">
                <div class="flex flex-col">
                  <label class="text-white">Start Date :</label>
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
                <div class="flex flex-col">
                  <label class="text-white">End Date :</label>
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
              </div>
              <div class="flex justify-center">
                <button
                  type="button"
                  class="inline-flex items-center rounded-2xl bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                  @click="createWorkshop"
                >
                  Create
                </button>
                <button
                  type="button"
                  class="ms-3 rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-red-400 hover:text-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  @click="trigger"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    showWorkshopModal: {
      type: Boolean,
      required: true,
    },
    trigger: {
      type: Function,
      required: true,
    },
  });

  const countries = ref();
  const states = ref();
  const colleges = ref();

  const fetchCountries = async () => {
    try {
      const response = await useAuthFetch("/backendapi/getcountries");
      // const countriesJson = await response.json();
      countries.value = response.countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await useAuthFetch(`/backendapi/getstates/${country}`);
      // const statesJson = await response.json();
      collegestates.value = response.states;
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchColleges = async (country, state) => {
    try {
      const res = await useAuthFetch(`/backendapi/getcolleges/${country}/${state}`);
      // const clgJson = await res.json();
      colleges.value = res.colleges;
    } catch (err) {
      console.log("error fetching colleges:", err);
    }
  };

  onMounted(fetchCountries);

  const collegeStore = useCollegesStore();
  //   const updateCollege = async (clgid, field, updatedVal) => {
  //     console.log(clgid, field, updatedVal);
  //     try {
  //       edit[field].loading = true;
  //       if (clgid) {
  //         const bodyContent = {};
  //         bodyContent[field] = updatedVal;
  //         const res = await useAuthFetch(`/backendapi/updatecollege/${clgid}/${field}`, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(bodyContent),
  //         });
  //         console.log("backend response", res.college);
  //         collegeStore.updateCollege(res.college);
  //         showMessage("success", "Updated", `${field} has been updated`);
  //       }
  //     } catch (e) {
  //       showMessage("destructive", "Error:", e);
  //     } finally {
  //       edit[field].value = false;
  //       return (edit[field].loading = false);
  //     }
  //   };
</script>
