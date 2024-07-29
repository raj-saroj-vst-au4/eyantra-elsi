<template #content>


  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="overflow-x-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="overflow-x-auto text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            College id
          </th>
          <th scope="col" class="px-6 py-3">
            College Name
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="">Action</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inaguration in nonelsiColleges" :key="inaguration.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
            {{ inaguration.id }}
          </th>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
            {{ inaguration.college_name }}
          </th>
          <th class="px-2 py-4">
            <button type="button"
              class="rounded-xl  px-6 bg-red-700  hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 py-4 text-sm font-medium text-white  focus:outline-none focus:ring-1 " 
                
              @click="triggerEditorModal(inaguration)">
              
              
              <span class=" overflow-x-auto  flex-auto text-sm font-medium" >Delete</span>
              
            </button>
          </th>

        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const collegesStore = useCollegesStore();
const isLoading = ref(true);

const nonelsiColleges = ref([]);

// const fetchColleges = async () => {
//   try {
//     const res = await useAuthFetch(`/backendapi/getnonelsicolleges`);
//     // const clgJson = await res.json();
//     nonelsiColleges.value = res.colleges;
//     console.log("nonelsi colleges", res);
//   } catch (err) {
//     console.log("error fetching colleges:", err);
//   }
//   isLoading.value = false;
// };
const triggerEditorModal = async (clg) => {
  try {
    const state = 0;
    const InaugurationStatusAvailable = await useAuthFetch(`/backendapi/InaugurationStatusAvailable/${clg.id}/${state}`, {
      method: "POST",
    });
   
    fetchColleges();
    collegesStore.setTONonelsiCollege(clg.id,0);
    collegesStore.setSelectedCollege(clg.id);
  } catch (err) {
    console.log("error updating Status:", err);
  }
  isLoading.value = false;
};
const fetchColleges = async () => {
    await collegesStore.fetchColleges();
    nonelsiColleges.value = collegesStore.getColleges.filter((college) => college.IS_eLSI == 2);
    
    isLoading.value = false;
  };
onBeforeMount(() => {
  fetchColleges();
});

</script>