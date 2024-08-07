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
              Add College
            </button>
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
          <th scope="col" class="px-2 py-3" @click="sort('clg_code')">Code</th>
          <th scope="col" class="px-2 py-3">eLSI</th>
          <th scope="col" class="px-2 py-3">College name</th>
          <th scope="col" class="px-2 py-3">District</th>
          <th scope="col" class="px-2 py-3">Pincode</th>
          <th scope="col" class="px-2 py-3">LI Date</th>
          <th scope="col" class="px-2 py-3">Registration</th>
          <th scope="col" class="px-2 py-3">LOI</th>
          <th scope="col" class="px-2 py-3">Payment</th>
          <th scope="col" class="px-2 py-3">Action</th>
        </tr>
      </thead>

      <tbody class="overflow-x-auto">
        <tr
          v-for="college in paginatedColleges"
          :key="college.id"
          class="bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <th
            scope="row"
            class="items-center whitespace-nowrap px-3 font-medium text-gray-900 dark:text-white"
          >
            {{ college.clg_code }}
          </th>
          <td class="px-2 py-2">
            <span
              class="me-3 flex h-3 w-3 rounded-full"
              :class="college.IS_eLSI ? 'bg-green-400' : 'bg-red-400'"
            ></span>
          </td>
          <th scope="row" class="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <NuxtLink :to="`/college/${college.clg_code}`"
              ><Icon
                name="lucide:square-arrow-out-up-right"
                class="mr-3 size-4 text-muted-foreground text-white"
            /></NuxtLink>
            <!-- <button
              type="button"
              class="inline-flex items-center rounded-xl bg-gray-700 p-1 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              @click="redirectTo(`/college/${college.clg_code}`)"
            >
              <span class="sr-only">Icon</span>
            </button> -->
            {{
              college.college_name.substring(0, 30) +
              (college.college_name.length > 30 ? "..." : "")
            }}
          </th>
          <td class="px-2 py-2">{{ college.district }}</td>
          <td class="px-2 py-2">{{ college.pincode }}</td>
          <td class="px-2 py-2">
            <Icon
              v-if="
                (!college.reg_data || !college.intent_letter || !college.pay_proof) &&
                college.IS_eLSI
              "
              name="lucide:circle-alert"
              class="mr-3 size-4 text-muted-foreground text-yellow-300"
            />{{ college.inauguration_date }}
          </td>
          <td class="px-2 py-2">
            <button
              v-if="!college.reg_data"
              type="button"
              class="rounded-full bg-gray-600 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 xl:px-5"
              @click="triggerRegModal(college)"
            >
              <Icon name="lucide:file-up" class="mr-1 size-4 text-muted-foreground" />
              Add
            </button>
            <button
              v-else
              type="button"
              class="rounded-full bg-gray-600 py-2 text-sm font-medium text-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 xl:px-5"
              @click="redirectTo(college.reg_data)"
            >
              View
              <Icon
                name="lucide:square-arrow-out-up-right"
                class="ml-1 size-4 text-muted-foreground"
              />
            </button>
          </td>
          <td class="px-2 py-2">
            <button
              v-if="!college.intent_letter"
              type="button"
              class="rounded-full bg-gray-600 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 xl:px-5"
              @click="triggerLoiModal(college)"
            >
              <Icon name="lucide:file-up" class="mr-1 size-4 text-muted-foreground" />
              Add
            </button>
            <button
              v-else
              type="button"
              class="rounded-full bg-gray-600 px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 xl:px-5"
              @click="redirectTo(college.intent_letter)"
            >
              View
              <Icon
                name="lucide:square-arrow-out-up-right"
                class="ml-1 size-4 text-muted-foreground"
              />
            </button>
          </td>
          <td class="px-2 py-2">
            <button
              v-if="!college.pay_proof"
              type="button"
              class="rounded-full bg-gray-600 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 xl:px-5"
              @click="triggerPaymentModal(college)"
            >
              <Icon name="lucide:file-up" class="mr-1 size-4 text-muted-foreground" />
              Add
            </button>
            <button
              v-else
              type="button"
              class="rounded-full bg-gray-600 px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 xl:px-5"
              @click="redirectTo(college.pay_proof)"
            >
              Check
              <Icon
                name="lucide:square-arrow-out-up-right"
                class="ml-1 size-4 text-muted-foreground"
              />
            </button>
          </td>
          <td class="px-2 py-2">
            <button
              type="button"
              class="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="triggerEditorModal(college)"
            >
              <Icon name="lucide:file-cog" class="mr-1 size-4 text-muted-foreground" />
              Modify
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
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
          >Showing {{ (currentPage - 1) * 10 + 1 }} to
          {{
            currentPage * 10 > filteredColleges?.length ? filteredColleges.length : currentPage * 10
          }}
          of {{ filteredColleges.length }} results</span
        >
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              href="#"
              class="ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click.prevent="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              class="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click.prevent="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              Next
            </a>
          </li>
        </ul>
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
    <RegModal
      v-if="showRegModal"
      :showRegModal="showRegModal"
      :trigger="triggerRegModal"
      :data="modalCollegeData"
    />
    <CollegeEditorModal
      v-if="showCollegeEditorModal"
      :showCollegeEditorModal="showCollegeEditorModal"
      :trigger="triggerEditorModal"
      :data="modalCollegeData"
    />
  </div>
</template>
<script setup>
  const isLoading = ref(true);
  const collegesStore = useCollegesStore();
  const searchQuery = ref("");
  const currentPage = ref(1);

  const modalCollegeData = ref(null);

  const showRegModal = ref(false);
  const showLoiModal = ref(false);
  const showPaymentModal = ref(false);
  const showCollegeEditorModal = ref(false);

  const sortColumn = ref("");
  const sortOrder = ref("asc");
  const triggerLoiModal = (clg) => {
    if (showLoiModal.value) {
      showLoiModal.value = false;
      modalCollegeData.value = null;
    } else {
      showLoiModal.value = true;
      modalCollegeData.value = clg;
    }
  };

  const triggerRegModal = (clg) => {
    if (showRegModal.value) {
      showRegModal.value = false;
      modalCollegeData.value = null;
    } else {
      showRegModal.value = true;
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

  const triggerEditorModal = (clg) => {
    if (showCollegeEditorModal.value) {
      showCollegeEditorModal.value = false;
      modalCollegeData.value = null;
    } else {
      showCollegeEditorModal.value = true;
      modalCollegeData.value = clg;
    }
  };

  const redirectTo = (url) => {
    window.open(url, "_blank");
  };

  const filteredColleges = computed(() => {
    return collegesStore.getColleges?.filter((college) => {
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

  const sortedColleges = computed(() => {
    return filteredColleges.value.sort((a, b) => {
      if (sortColumn.value) {
        let result = 0;
        if (a[sortColumn.value] > b[sortColumn.value]) {
          result = 1;
        } else if (a[sortColumn.value] < b[sortColumn.value]) {
          result = -1;
        }
        return sortOrder.value === "asc" ? result : -result;
      }
      return 0;
    });
  });

  const paginatedColleges = computed(() => {
    const startIndex = (currentPage.value - 1) * 10;
    const endIndex = startIndex + 10;
    return filteredColleges?.value?.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredColleges.value.length / 10);
  });

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const fetchColleges = async () => {
    await collegesStore.fetchColleges();
    isLoading.value = false;
  };

  const sort = (column) => {
    if (sortColumn.value === column) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortColumn.value = column;
      sortOrder.value = "asc";
    }
  };

  onBeforeMount(() => {
    fetchColleges();
  });

  watch(searchQuery, () => {
    currentPage.value = 1;
  });
</script>
