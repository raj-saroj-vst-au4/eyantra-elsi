<template>
  <Loader v-if="isLoading" />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-else>
    <table class="mt-4 w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
      <caption
        class="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white rtl:text-right"
      >
        ELSI Users

        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
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
                    <span>{{ userRole }}</span>
                  </fieldset>
                  <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-grass11 w-[90px] text-right text-[15px]" for="roleselect">
                      Change Role
                    </label>
                    <select id="roleselect" class="ml-4 h-[35px] w-full px-[10px]">
                      <option selected>Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </fieldset>
                  <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-grass11 w-[90px] text-right text-[15px]" for="authcode">
                      Auth code :
                    </label>
                    <input
                      id="authcode"
                      type="password"
                      class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      :value="authCode"
                    />
                  </fieldset>
                  <div class="mt-[25px] flex justify-end">
                    <DialogClose as-child>
                      <button
                        class="hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none"
                      >
                        Save changes
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
  const userRole = ref("");

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
    const userData = await useKCAuthFetch(`/keycloakapi/users/${keycloakuid}/role-mappings`);
    console.log("user data recieved", userData.realmMappings);
    const hasTeacherRole = userData.realmMappings.some((role) => role.name == "elsi-teacher");
    console.log("is a teacher", hasTeacherRole);
    userRole.value = hasTeacherRole ? "Teacher" : "Student";
    console.log(userRole.value);
  };
</script>
