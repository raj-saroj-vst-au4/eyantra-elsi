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
              class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
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
          <th scope="col" class="px-6 py-3">College name</th>
          <th scope="col" class="px-6 py-3">District</th>
          <th scope="col" class="px-6 py-3">Address</th>
          <th scope="col" class="px-6 py-3">Pincode</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <th
            scope="row"
            class="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Neil Sims</div>
              <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">React Developer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit user</a
            >
          </td>
        </tr>
        <tr
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-2"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
            </div>
          </td>
          <th
            scope="row"
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Bonnie Green</div>
              <div class="font-normal text-gray-500">bonnie@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">Designer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit user</a
            >
          </td>
        </tr>
        <tr
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-2"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
            </div>
          </td>
          <th
            scope="row"
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Jese Leos</div>
              <div class="font-normal text-gray-500">jese@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">Vue JS Developer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit user</a
            >
          </td>
        </tr>
        <tr
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-2"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
            </div>
          </td>
          <th
            scope="row"
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Thomas Lean</div>
              <div class="font-normal text-gray-500">thomes@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">UI/UX Engineer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit user</a
            >
          </td>
        </tr>
        <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-3"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
            </div>
          </td>
          <th
            scope="row"
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Leslie Livingston</div>
              <div class="font-normal text-gray-500">leslie@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">SEO Specialist</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
              Offline
            </div>
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit user</a
            >
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
          >Showing
          <span class="font-semibold text-gray-900 dark:text-white"
            >{{ colleges.from }}-{{ colleges.to }}</span
          >
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            colleges.total
          }}</span></span
        >
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <button
              @click="handlePrev"
              class="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
          </li>
          <li>
            <button
              @click="handleNext"
              class="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
  //get user list from backend
  const users = ref([]);
  const currentpage = ref(1);
  const isLoading = useState("isLoading");
  const fetchpage = async (page) => {
    isLoading.value = true;
    try {
      const response = await useAuthFetch(`/backendapi/fetchelsiusers?page=${page}`, {
        method: "POST",
      });
      // console.log("backend response", response);
      users.value = response.users;
      currentpage.value = page;
      // console.log(users);
    } catch (error) {
      console.error("Error fetching college data:", error);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(async () => {
    await fetchpage(currentpage.value);
  });
</script>
