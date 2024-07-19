<template>
  <div
    v-if="showWorkshopModal"
    class="fixed inset-0 z-50 flex flex-row items-center justify-center overflow-y-auto overflow-x-hidden"
  >
    <div class="relative max-h-full w-full max-w-md lg:max-w-lg">
      <div class="relative rounded-2xl bg-white shadow dark:bg-gray-700">
        <div class="px-4 py-2 md:px-5 md:py-2">
          <div class="relative rounded-lg">
            <!-- Modal header -->
            <div class="flex items-center justify-between rounded-t border-b dark:border-gray-600">
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Create a new Workshop
              </h3>
              <button
                type="button"
                class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="triggerWorkshopModal"
              >
                <Icon name="lucide:x" class="size-4 text-muted-foreground" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
              <div class="mb-3 flex flex-col gap-1">
                <label class="ml-2 text-white">Workshop Name :</label>
                <input
                  v-model="workshopname"
                  class="rounded-lg bg-gray-900 p-2 text-white focus:border-red-500"
                />
              </div>
              <div class="mb-4 grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <label class="ml-2 text-white">Thumbnail URL :</label>
                  <input
                    v-model="thumbnailurl"
                    class="rounded-lg bg-gray-900 p-2 text-white focus:border-red-500"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="ml-2 text-white">Falicitator :</label>
                  <select
                    v-model="selectedFalicitator"
                    class="block w-full rounded-lg border border-gray-400 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option :value="null" disabled>Select Falicitator</option>
                    <option v-for="staff in falicitators" :key="staff.id" :value="staff.id">
                      {{ staff.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="mb-3 flex flex-col gap-1">
                <label class="ml-2 text-white">Small Description :</label>
                <input
                  v-model="workshopdesc"
                  class="rounded-lg bg-gray-900 p-2 text-white focus:border-red-500"
                />
              </div>
              <UiGradientDivider />
              <div class="mb-4 mt-2 grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <label class="ml-2 text-white">Country :</label>
                  <select
                    v-model="selectedCountry"
                    @change="fetchStates(selectedCountry)"
                    class="block w-full rounded-lg border border-gray-400 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option :value="null" selected>Select Country</option>
                    <option v-for="country in countries" :key="country.id" :value="country">
                      {{ country }}
                    </option>
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="ml-2 text-white">State :</label>
                  <select
                    v-model="selectedState"
                    @change="fetchColleges(selectedCountry, selectedState)"
                    class="block w-full rounded-lg border border-gray-400 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option :value="null" selected>College State</option>
                    <option
                      v-if="selectedCountry"
                      v-for="collegestate in states"
                      :key="collegestate.id"
                      :value="collegestate"
                    >
                      {{ collegestate }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="mb-4 grid grid-cols-1 gap-1">
                <label class="ml-2 text-white">Choose College :</label>
                <select
                  v-model="selectedCollege"
                  class="block w-full rounded-lg border border-gray-400 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                >
                  <option :value="null" selected>College Name</option>
                  <option
                    v-if="selectedState"
                    v-for="college in colleges"
                    :key="college.id"
                    :value="college.id"
                  >
                    {{ college.college_name }}
                  </option>
                </select>
              </div>
              <div class="mb-4 grid grid-cols-2">
                <div class="flex flex-col gap-1">
                  <label class="ml-2 text-white">Start Date :</label>
                  <UiDatepicker v-model="startdate">
                    <template #default="{ togglePopover }">
                      <UiButton
                        variant="outline"
                        class="text-white"
                        :class="[!startdate && 'text-muted-foreground', 'justify-start text-left']"
                        @click="togglePopover"
                      >
                        <Icon name="lucide:calendar" class="h-4 w-4" />
                        {{ startdate ? format(startdate, "MMMM dd, yyyy") : "Select a date" }}
                      </UiButton>
                    </template>
                  </UiDatepicker>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="ml-2 text-white">End Date :</label>
                  <UiDatepicker v-model="enddate">
                    <template #default="{ togglePopover }">
                      <UiButton
                        variant="outline"
                        class="text-white"
                        :class="[!enddate && 'text-muted-foreground', 'justify-start text-left']"
                        @click="togglePopover"
                      >
                        <Icon name="lucide:calendar" class="h-4 w-4" />
                        {{ enddate ? format(enddate, "MMMM dd, yyyy") : "Select a date" }}
                      </UiButton>
                    </template>
                  </UiDatepicker>
                </div>
              </div>

              <div class="flex justify-center">
                <button
                  type="button"
                  class="inline-flex items-center rounded-lg bg-blue-600 p-2 px-5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                  @click="createWorkshop"
                >
                  Create
                </button>
                <button
                  type="button"
                  class="ms-3 rounded-lg border border-gray-200 bg-white p-2 px-5 text-sm font-medium text-gray-900 hover:bg-red-600 hover:text-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  @click="triggerWorkshopModal"
                >
                  Cancel
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
  import { format } from "date-fns";

  const props = defineProps({
    showWorkshopModal: {
      type: Boolean,
      required: true,
    },
    triggerWorkshopModal: {
      type: Function,
      required: true,
    },
    fetchWorkshops: {
      type: Function,
      required: true,
    },
  });

  const { user } = useOidcAuth();

  const countries = ref();
  const states = ref();
  const colleges = ref();
  const workshopname = ref();
  const workshopdesc = ref();
  const falicitators = ref();

  const thumbnailurl = ref();
  const selectedCountry = ref(null);
  const selectedState = ref(null);
  const selectedCollege = ref(null);
  const selectedFalicitator = ref();
  const startdate = ref();
  const enddate = ref();

  const fetchCountries = async () => {
    try {
      const response = await useAuthFetch("/backendapi/getcountries");
      countries.value = response.countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await useAuthFetch(`/backendapi/getstates/${country}`);
      states.value = response.states;
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchColleges = async (country, state) => {
    try {
      const res = await useAuthFetch(`/backendapi/getcolleges/${country}/${state}`);
      colleges.value = res.colleges;
    } catch (err) {
      console.log("error fetching colleges:", err);
    }
  };

  const fetchFalicitators = async () => {
    try {
      const res = await useAuthFetch(`/backendapi/fetchelsiusers`, {
        method: "POST",
      });
      if (res) {
        // console.log("staff:", res);
        falicitators.value = res.users;
      }
      // falicitators.value = res;
    } catch (err) {
      console.log("error fetching falicitators:", err);
    }
  };

  onMounted(async () => await fetchCountries(), await fetchFalicitators());

  const createWorkshop = async () => {
    try {
      const response = await useAuthFetch("/backendapi/createworkshop", {
        method: "POST",
        body: JSON.stringify({
          wsname: workshopname.value,
          wsdesc: workshopdesc.value,
          wsimgurl: thumbnailurl.value,
          wsfalic: selectedFalicitator.value,
          wsclg: selectedCollege.value,
          wsstart: startdate.value,
          wsend: enddate.value,
          wscreator_email: user.value.providerInfo.email,
        }),
      });
      console.log(response);
      // workshops.value = response.workshops;
      // trigger();
      if (response.status == "success") {
        useSonner["success"]("Added", {
          description: response.message,
        });
        await fetchWorkshops();
      }
    } catch (error) {
      console.error("Error creating workshop:", error);
    } finally {
      triggerWorkshopModal();
    }
  };
</script>
