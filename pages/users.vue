<template>
  <Loader v-if="isLoading" />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-else>
    <div
      class="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white p-4 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <div>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger asChild>
            <UiButton variant="outline" class="text-white">Role Options</UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="w-56">
            <template v-for="(item, i) in menuitems" :key="i">
              <UiDropdownMenuLabel v-if="item.label" :label="item.label" />
              <UiDropdownMenuSeparator v-else-if="item.divider" />
              <UiDropdownMenuItem
                v-else-if="item.title && !item.items"
                :title="item.title"
                :icon="item.icon"
                :shortcut="item.shortcut"
                :disabled="item.disabled"
              />
              <UiDropdownMenuSub v-else-if="item.title && item.items">
                <UiDropdownMenuSubTrigger
                  :title="item.title"
                  :icon="item.icon"
                  :textValue="item.title"
                />
                <UiDropdownMenuSubContent>
                  <template v-for="(child, k) in item.items" :key="`child-${k}`">
                    <UiDropdownMenuSeparator v-if="child.divider" />
                    <UiDropdownMenuItem
                      v-else
                      :title="child.title"
                      :icon="child.icon"
                      :shortcut="child.shortcut"
                    />
                  </template>
                </UiDropdownMenuSubContent>
              </UiDropdownMenuSub>
            </template>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
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
          id="table-search-users"
          class="block w-80 rounded-lg border border-gray-300 bg-gray-50 ps-10 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search for users"
        />
      </div>
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
  const showBookmark = ref(true);
  const showFullUrls = ref(false);
  const person = ref("1");

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

  const menuitems = [
    { label: "Role configs" },
    { divider: true },
    { title: "Pane User", icon: "ph:keyboard" },
    { divider: true },
    { title: "Roles", icon: "ph:users" },
    { title: "Create Role", icon: "ph:plus-circle" },
    // {
    //   title: "Invite Users",
    //   icon: "ph:user-plus",
    //   items: [
    //     { title: "Email", icon: "ph:envelope", shortcut: "⇧⌘E" },
    //     { title: "Facebook", icon: "logos:facebook", shortcut: "⇧⌘F" },
    //     { title: "Twitter", icon: "logos:twitter", shortcut: "⇧⌘T" },
    //     { divider: true },
    //     ,
    //   ],
    // },
  ];
</script>
