<template>
  <Loader v-if="isLoading" />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-else>
    <div
      class="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white p-4 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <div>
        <UiPopover>
          <UiPopoverTrigger as-child>
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              type="button"
              @click="getAvailRoles"
            >
              <Icon name="ph:users" class="mr-2 text-xl" />
              <span class="sr-only">Action button</span>
              Roles
            </button>
          </UiPopoverTrigger>
          <UiPopoverContent class="w-80 p-6">
            <div class="flex h-full flex-col gap-1.5">
              <p class="font-semibold leading-none">Available Roles</p>
              <p class="text-sm text-muted-foreground">Set one from the available roles.</p>
              <div class="mt-4 text-center" v-if="loadingRoles">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="mt-5 grid gap-3" v-else>
                <div class="flex flex-col gap-1" v-for="role in availRoles" :key="role.id">
                  <p class="font-semibold leading-none">{{ role.name }}</p>
                  <p class="text-sm">{{ role.id }}</p>
                </div>
              </div>
            </div>
          </UiPopoverContent>
        </UiPopover>
      </div>
      <div>
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          type="button"
        >
          <Icon name="ph:plus-circle" class="mr-2 text-xl" />
          <span class="sr-only">Action button</span>
          Create Role
        </button>
      </div>
      <!-- <label for="table-search" class="sr-only">Search</label>
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
          id="table-search-users"
          class="block w-80 rounded-lg border border-gray-300 bg-gray-50 ps-10 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search for users"
        />
      </div> -->
    </div>
    <table class="mt-4 w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
      <caption
        class="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white rtl:text-right"
      >
        ELSI Users

        <p class="mt-1 flex text-sm font-normal text-gray-500 dark:text-gray-400">
          Browse a list of ELSI Users partnered with e-Yantra to help you, stay organized, get
          answers, keep in touch, grow your connections, and more.
        </p>
      </caption>
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">User</th>
          <th scope="col" class="px-6 py-3">Address</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users.filter((u) => !u.profile.is_admin)"
          :key="user.id"
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
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
              <div class="text-base font-semibold">{{ user.name }}</div>
              <div class="font-normal text-gray-500">{{ user.email }}</div>
            </div>
          </th>
          <td class="px-6 py-4">{{ user.profile.address }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                class="me-2 h-2.5 w-2.5 rounded-full"
                :class="user.signupcomplete ? 'bg-green-500' : 'bg-red-500'"
              ></div>
              {{ user.signupcomplete ? "Signedup" : "Pending" }}
            </div>
          </td>
          <td class="px-6 py-4">
            <DialogRoot>
              <DialogTrigger
                @click="checkRole(user.kcuid)"
                class="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-600 px-[15px] font-semibold"
              >
                Change Role
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay
                  class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
                />
                <DialogContent
                  class="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[95vw] max-w-[470px] translate-x-[-50%] translate-y-[-50%] rounded-[14px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                >
                  <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold text-red-500">
                    Change Role
                  </DialogTitle>
                  <DialogDescription class="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
                    Make changes to profile. Click save when you're done.
                  </DialogDescription>
                  <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-grass11 w-[90px] text-right text-[15px]" for="name">
                      Name :
                    </label>
                    <span>{{ user.name }}</span>
                  </fieldset>
                  <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-grass11 w-[90px] text-right text-[15px]" for="name">
                      Email :
                    </label>
                    <span>{{ user.email }}</span>
                  </fieldset>
                  <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-grass11 w-[90px] text-right text-[15px]" for="name">
                      Current Role
                    </label>
                    <span>{{ userRole || "Loading..." }}</span>
                  </fieldset>
                  <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-grass11 w-[90px] text-right text-[15px]" for="roleselect">
                      Change Role
                    </label>
                    <select
                      id="roleselect"
                      v-model="selectedRole"
                      @change="console.log(selectedRole, userRole)"
                      class="ml-4 h-[35px] w-full rounded-lg bg-black px-[10px] text-white"
                    >
                      <option selected value="Student">Student</option>
                      <option value="elsi-teacher">Teacher</option>
                      <option value="realm-admin">Admin</option>
                    </select>
                  </fieldset>
                  <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-grass11 w-[90px] text-right text-[15px]" for="authcode">
                      Auth code :
                    </label>
                    <UiLabel class="flex flex-col items-start">
                      <UiPinInput
                        :input-count="4"
                        type="number"
                        class="text-white"
                        @complete="toast({ title: 'Complete' })"
                      />
                    </UiLabel>
                  </fieldset>
                  <div class="mt-[25px] flex justify-end">
                    <DialogClose as-child>
                      <button
                        @click="changeRole(user.kcuid, selectedRole)"
                        v-if="selectedRole !== userRole"
                        class="hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-400 px-[15px] font-semibold leading-none"
                      >
                        Commit change
                      </button>
                    </DialogClose>
                  </div>
                  <DialogClose
                    class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  >
                    <Icon icon="lucide:x" />
                  </DialogClose>
                </DialogContent>
              </DialogPortal>
            </DialogRoot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
  //get user list from backend
  import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "radix-vue";

  const users = ref([]);
  const isLoading = useState("isLoading");
  const authCode = ref("");
  const userRole = ref("");
  const selectedRole = ref("");
  const runtimeConfig = useRuntimeConfig();
  const availRoles = ref();
  const loadingRoles = ref(false);

  const fetchpage = async () => {
    isLoading.value = true;
    try {
      const response = await useAuthFetch(`/backendapi/fetchelsiusers`, {
        method: "POST",
      });
      console.log(response);
      users.value = response.users;
    } catch (error) {
      console.error("Error fetching users data:", error);
    } finally {
      isLoading.value = false;
    }
  };
  onBeforeMount(async () => {
    await fetchpage();
  });

  const checkRole = async (keycloakuid) => {
    const userData = await useAuthFetch(`/kcadminapi/users/${keycloakuid}/role-mappings`);
    console.log("user data recieved", userData.realmMappings);
    const hasTeacherRole = userData.realmMappings.some((role) => role.name == "elsi-teacher");
    console.log("is a teacher", hasTeacherRole);
    userRole.value = hasTeacherRole ? "Teacher" : "Student";
    console.log(userRole.value);
  };

  const getClientId = async () => {
    const res = await useAuthFetch(
      `/kcadminapi/clients?clientId=${runtimeConfig.public.oidcProvidersKeycloakClientId}`
    );
    // console.log("client id : ", runtimeConfig.public.oidcProvidersKeycloakClientId, res);
    return res[0].id;
  };
  const changeRole = async (keycloakuid, role) => {
    const clientid = await getClientId();
    // const response = await useAuthFetch(`/kcadminapi/clients/local-raj/roles`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     roles: [
    //       {
    //         name: role,
    //       },
    //     ],
    //   }),
    // });
    // console.log("change role res ", response);
  };

  const submitChanges = async (keycloakuid) => {
    console.log(keycloakuid, authCode.value, selectedRole.value);
    if (authCode == "1256" && selectedRole) {
      // await changeRole(keycloakuid, role);
    } else {
      return useSonner["error"]("401 Err", {
        description: "Incorrect Auth Code...",
      });
    }
  };

  const getAvailRoles = async () => {
    if (!availRoles.value) {
      loadingRoles.value = true;
      const res = await useAuthFetch(`/kcadminapi/roles`);
      availRoles.value = res;
      loadingRoles.value = false;
      return console.log("roles recieved", res);
    }
  };
</script>
