<template>
  <Loader v-if="isLoading" />
  <div class="container p-10" v-else>
    <h1 class="mb-4  text-3xl font-extrabold leading-none tracking-tight text-gray-100 md:text-4xl lg:text-5xl">
      LAB Inauguration Slots
    </h1>
    <div class="mt-16 flex flex-col justify-around lg:flex-row">
      <form id="addnewslot">
        <UiCard class="w-[360px] max-w-sm" title="Create a Slot" description="Add a new lab inauguration slot">
          <template #content>
            <UiCardContent>
              <div class="grid w-full items-center gap-4">
                <div class="flex flex-col space-y-1.5">
                  <UiLabel for="name">Name</UiLabel>
                  <UiInput v-model="nameOfSlot" required id="name" placeholder="Name of slot" />

                </div>
                <div class="flex flex-col space-y-1.5">
                  <UiLabel for="framework">Schedule</UiLabel>
                  <UiDatepicker v-model="date">
                    <template #default="{ togglePopover }">
                      <UiButton variant="outline" :class="[!date && 'text-muted-foreground', 'justify-start text-left']"
                        @click="togglePopover">
                        <Icon name="lucide:calendar" class="h-4 w-4" />
                        {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
                      </UiButton>
                    </template>
                  </UiDatepicker>
                </div>
                <div class=" flex-col space-y-1.5">
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
              <UiButton @click="submit">Create</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </form>
      <div>
        <UiCard class=" max-w-sm p-1" title="Upcoming Slot">

          <template #content>
            <UiCardContent>

              <template v-if="UpcominginagurationSlots?.length > 0">

                <thead class="text-xs uppercase text-black-7 dark:bg-black-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="">College Name</th>
                    <th scope="col" class="px-6">Date</th>
                    <th scope="col" class="px-6">Slot</th>
                    <th scope="col" class="px-6">Action</th>
                  </tr>
                </thead>
                <tbody class="overflow-x-auto">
                  <tr v-for="inaguration in UpcominginagurationSlots" :key="inaguration.id">
                    <th scope="row" class="whitespace font-medium py-4 dark:text-white">
                      {{ inaguration.collegeName }}
                    </th>
                    <th scope="row" class="whitespace font-medium py-8 dark:text-white">
                      {{ format(inaguration.schedule_date, "MMMM dd, yyyy") }}
                    </th>
                    <th scope="row" class="whitespace font-medium py-8 dark:text-white">
                      {{ inaguration.slotname }}
                    </th>
                    <th scope="row" class="whitespace font-medium py-8 dark:text-white">
                      <button type="button"
                        class=""
                        @click="triggerEditorModal(inaguration)">
                        <Icon name="lucide:file-cog" class=" size-4 text-muted-foreground" />
                        Modify
                      </button>
                    </th>
                  </tr>
                </tbody>
              </template>

              <template v-else>
                <div class="flex items-center justify-center py-5 text-sm font-medium">
                  <p>no upcoming inauguration</p>
                </div>
              </template>
            </UiCardContent>
          </template>
        </UiCard>
      </div>
    </div>
  </div>
  <div>
    <ModifyInaugurationSlot
      v-if="showModifyInaugurationEditorModal"
      :showModifyInaugurationEditorModal="showModifyInaugurationEditorModal"
      :trigger="triggerEditorModal"
      :data="modalInagurationData"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { format } from "date-fns";
const isLoading = ref(true);
const selectedColleges = ref([]);
const date = ref('');
const nonelsiColleges = ref([]);
const nameOfSlot = ref('');
const UpcominginagurationSlots = ref([]);
const modalInagurationData = ref('');
const showModifyInaugurationEditorModal = ref(false);

const triggerEditorModal = (clg) => {
    if (showModifyInaugurationEditorModal.value) {
      showModifyInaugurationEditorModal.value = false;
      modalInagurationData.value = null;
    } else {
      showModifyInaugurationEditorModal.value = true;
      clg.schedule_date = clg.schedule_date.toISOString();
      console.log(typeof clg.schedule_date);
      console.log(clg);
      modalInagurationData.value = clg;
    }
  };
const fetchColleges = async () => {
  try {
    const res = await useAuthFetch(`/backendapi/getnonelsicolleges`);
    // const clgJson = await res.json();
    nonelsiColleges.value = res.colleges;
    console.log("nonelsi colleges", res);

  } catch (err) {
    console.log("error fetching colleges:", err);
  }
  isLoading.value = false;
};
const inguarationSubmission = async (slotName, slotDate, slotCollege, slotCreatedAt) => {
  try {
    const res = await useAuthFetch(`/backendapi/RegisterIngaurationSlot/${slotName}/${slotDate}/${slotCollege}/${slotCreatedAt}`, {
      method: "POST",
    });
    console.log("slot registered", res);
  } catch (err) {
    console.log("error registering inguaration slot", err);
  }
  isLoading.value = false;
};
const fetchInguarationSlots = async () => {
  try {
    const res = await useAuthFetch(`/backendapi/getinguarationslots`);
    UpcominginagurationSlots.value = res.slots;
    console.log("upcoming slots here", res);
    UpcominginagurationSlots.value.forEach(element => {
      element.schedule_date = new Date(element.schedule_date);
    });
  } catch (err) {
    console.log("error fetching slots:", err);
  }
  isLoading.value = false;
};
onBeforeMount(() => {
  fetchColleges();
  fetchInguarationSlots();

});

function submit() {
  isLoading.value = true;
  const slotName = nameOfSlot.value;
  const slotDate = date.value.toISOString().slice(0, 19).replace('T', ' ');
  const slotCollege = selectedColleges.value;
  const slotCreatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  inguarationSubmission(slotName, slotDate, slotCollege, slotCreatedAt);
  fetchInguarationSlots();
  isLoading.value = false;
}
</script>
