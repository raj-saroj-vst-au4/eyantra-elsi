<template>
  <Loader v-if="isLoading" />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-else>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
      <caption
        class="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white rtl:text-right"
      >
        ELSI Colleges

        <div
          class="flex-column flex flex-wrap items-center justify-around space-y-4 py-2 md:flex-row md:space-y-0"
        >
          <div>
            <button
              id="dropdownActionButton"
              class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="button"
            >
              <span class="sr-only">Filter button</span>
              Filter
              <svg
                class="ms-2.5 h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              id="dropdownAction"
              class="z-50 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
            >
              <ul
                class="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Reward</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Promote</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Activate account</a
                  >
                </li>
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Delete User</a
                >
              </div>
            </div>
          </div>
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
            >
              <svg
                class="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-colleges"
              class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for Colleges"
              v-model="searchQuery"
            />
          </div>
        </div>
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
          Browse a list of ELSI Colleges partnered with e-Yantra to help you, stay organized, get
          answers, keep in touch, grow your connections, and more.
        </p>
      </caption>

      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-4 py-3">College name</th>
          <th scope="col" class="px-4 py-3">District</th>
          <th scope="col" class="px-4 py-3">Address</th>
          <th scope="col" class="px-4 py-3">Pincode</th>
          <th scope="col" class="px-4 py-3">LI Date</th>
          <th scope="col" class="px-4 py-3">LOI</th>
          <th scope="col" class="px-4 py-3">Payment</th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>

      <tbody class="overflow-x-auto">
        <!-- <tr>
          <td>colleges</td>
          <td>colleges</td>
        </tr> -->
        <tr
          v-for="college in filteredColleges"
          :key="college.id"
          class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
          >
            {{
              college.college_name.substring(0, 30) +
              (college.college_name.length > 30 ? "..." : "")
            }}
          </th>
          <td class="px-4 py-3">{{ college.district }}</td>
          <td class="px-4 py-3">
            {{ college.address.substring(0, 30) + (college.address.length > 20 ? "..." : "") }}
          </td>
          <td class="px-4 py-3">{{ college.pincode }}</td>
          <td class="px-4 py-3">{{ college.inauguration_date }}</td>
          <td class="px-4 py-3">
            <button
              v-if="!college.intent_letter"
              type="button"
              class="mb-2 me-2 rounded-full bg-gray-600 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
              @click="triggerLoiModal(college)"
            >
              Add
            </button>
            <button
              v-else
              type="button"
              class="mb-2 me-2 rounded-full bg-gray-600 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
              @click="triggerLoiModal(college)"
            >
              View
            </button>
          </td>
          <td class="px-4 py-3">
            <button
              v-if="!college.pay_proof"
              type="button"
              class="mb-2 me-2 rounded-full bg-gray-600 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
              @click="triggerPaymentModal(college)"
            >
              Upload
            </button>
            <button
              v-else
              type="button"
              class="mb-2 me-2 rounded-full bg-gray-600 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
              @click="triggerPaymentModal(college)"
            >
              Check
            </button>
          </td>
          <td class="px-4 py-3">
            <button
              type="button"
              class="mb-2 me-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Exec
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isLoading"></div>

    <div v-else class="bg-gray-700 font-semibold text-gray-900 dark:text-white">
      <nav
        class="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing </span>
        <ul class="inline-flex items-stretch -space-x-px"></ul>
      </nav>
    </div>
    <LoiModal
      v-if="showLoiModal"
      :showLoiModal="showLoiModal"
      :trigger="triggerLoiModal"
      :data="modalCollegeData"
    />
    <PayproofModal
      v-if="showPaymentModal"
      :showPaymentModal="showPaymentModal"
      :trigger="triggerPaymentModal"
      :data="modalCollegeData"
    />
  </div>
</template>
<script setup>
  const colleges = computed(() => collegesStore.getColleges);
  const isLoading = useState("isLoading");
  const collegesStore = useCollegesStore();
  const fetchCount = computed(() => collegesStore.getFetchCount);
  const searchQuery = ref("");

  const modalCollegeData = ref(null);

  const showLoiModal = ref(false);
  const showPaymentModal = ref(false);

  const triggerLoiModal = (clg) => {
    if (showLoiModal.value) {
      showLoiModal.value = false;
      modalCollegeData.value = null;
    } else {
      showLoiModal.value = true;
      modalCollegeData.value = clg;
    }
  };
  const triggerPaymentModal = (clg) => {
    if (showPaymentModal.value) {
      showPaymentModal.value = false;
      modalCollegeData.value = null;
    } else {
      showPaymentModal.value = true;
      modalCollegeData.value = clg;
    }
  };

  const filteredColleges = computed(() => {
    return colleges.value?.filter((college) => {
      const searchRegex = new RegExp(searchQuery.value, "i");
      return (
        searchRegex.test(college.college_name) ||
        searchRegex.test(college.district) ||
        searchRegex.test(college.address) ||
        searchRegex.test(college.state) ||
        searchRegex.test(college.abbreviation) ||
        searchRegex.test(college.clg_code) ||
        searchRegex.test(college.pincode)
      );
    });
  });
  const fetchpage = async () => {
    isLoading.value = true;
    try {
      if (fetchCount.value && fetchCount.value < 10) {
        // console.log("Using colleges from pinia", collegesStore.getColleges);
        colleges.value = collegesStore.getColleges;
      } else {
        const response = await useAuthFetch(`/backendapi/fetchelsicolleges`, {
          method: "POST",
        });
        // console.log("refreshing college list ", response);
        collegesStore.setColleges(response.colleges);
      }
      isLoading.value = false;
    } catch (error) {
      console.error("Error fetching college data:", error);
      useSonner["error"]("Error", {
        description: "Sorry, you donot have access to Fetch Colleges List",
      });
    }
  };
  onMounted(async () => {
    await fetchpage();
  });
</script>
