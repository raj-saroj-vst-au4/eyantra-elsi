<template>
  <div class="container mx-auto my-28">
    <div class="relative mx-auto w-5/6 rounded-lg bg-white shadow md:w-5/6 lg:w-4/6 xl:w-3/6">
      <div class="flex justify-center">
        <img
          src="https://portal.e-yantra.org/img/terms.png"
          alt=""
          class="absolute -top-20 mx-auto h-32 w-32 transform rounded-full border-4 border-white bg-slate-400 shadow-md transition duration-200 hover:scale-110"
        />
      </div>

      <div class="mt-16">
        <h1 class="text-center text-3xl font-bold text-gray-900">
          {{ user?.providerInfo.name }}
        </h1>
        <p class="text-center text-sm font-medium text-gray-400">
          {{ user?.providerInfo.email }}
        </p>
        <p>
          <span> </span>
        </p>
        <div class="my-5 px-6">
          <a
            href="#"
            @click="switchMode"
            class="block rounded-lg bg-gray-900 px-6 py-3 text-center font-medium leading-6 text-gray-200 hover:bg-black hover:text-white"
            >{{ mode == "logs" ? "Edit Profile" : "Show Activity" }}</a
          >
        </div>

        <div class="w-full" v-if="mode == 'logs'">
          <h3 class="px-6 text-left font-medium text-gray-900">Recent activites</h3>
          <div class="mt-5 flex w-full flex-col items-center overflow-hidden text-sm">
            <a
              href="#"
              class="block w-full border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              <img
                src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                alt=""
                class="mr-2 inline-block h-6 rounded-full shadow-md"
              />
              Updated his status
              <span class="text-xs text-gray-500">24 min ago</span>
            </a>

            <a
              href="#"
              class="block w-full border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              <img
                src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                alt=""
                class="mr-2 inline-block h-6 rounded-full shadow-md"
              />
              Added new profile picture
              <span class="text-xs text-gray-500">42 min ago</span>
            </a>

            <a
              href="#"
              class="block w-full border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              <img
                src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                alt=""
                class="mr-2 inline-block h-6 rounded-full shadow-md"
              />
              Approved Edit in <span class="font-bold">Profile Mod </span>
              <span class="text-xs text-gray-500">49 min ago</span>
            </a>

            <a
              href="#"
              class="block w-full border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              <img
                src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                alt=""
                class="mr-2 inline-block h-6 rounded-full shadow-md"
              />
              Edited website settings
              <span class="text-xs text-gray-500">1 day ago</span>
            </a>

            <a
              href="#"
              class="block w-full overflow-hidden border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              <img
                src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                alt=""
                class="mr-2 inline-block h-6 rounded-full shadow-md"
              />
              Added new Profile
              <span class="text-xs text-gray-500">5 days ago</span>
            </a>
          </div>
        </div>
        <div class="w-full" v-else>
          <h3 class="px-6 text-left font-medium text-gray-900">Modify Profile</h3>
          <div class="m-5 px-12">
            <div class="grid grid-cols-2 gap-4 pb-8">
              <div class="col-span-2">
                <label for="name" class="mb-2 block text-sm font-medium text-gray-900"
                  >Your Name</label
                >
                <div class="relative w-full">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    :class="{ 'cursor-not-allowed': !edit.profile_name.value }"
                    required=""
                    v-model="user.providerInfo.name"
                    :disabled="!edit.profile_name.value"
                  />
                  <button
                    v-if="!edit.profile_name.value"
                    @click="toggleEdit('profile_name')"
                    class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                  >
                    <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                  </button>
                  <button
                    v-else
                    @click="updateUser(data.id, 'profile_name', user.providerInfo.name)"
                    class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                  >
                    <Icon
                      name="lucide:refresh-cw"
                      class="size-4 text-muted-foreground"
                      :class="{ 'animate-spin': edit.profile_name.loading }"
                    />
                  </button>
                </div>
              </div>
              <div class="col-span-2">
                <label for="email" class="mb-2 block text-sm font-medium text-gray-900"
                  >Your Email</label
                >
                <div class="relative w-full">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    :class="{ 'cursor-not-allowed': !edit.profile_name.value }"
                    required=""
                    v-model="user.providerInfo.email"
                    :disabled="!edit.profile_name.value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const { user } = useOidcAuth();
  const mode = ref("logs");
  const edit = reactive({
    profile_name: {
      value: false,
      loading: false,
    },
  });
  const switchMode = () => {
    mode.value = mode.value === "logs" ? "settings" : "logs";
  };

  const toggleEdit = (field) => {
    edit[field].value = !edit[field].value;
  };

  const updateProfile = async (usrid, field, updatedVal) => {
    // console.log(usrid, field, updatedVal);
    try {
      edit[field].loading = true;
      if (usrid) {
        const bodyContent = {};
        bodyContent[field] = updatedVal;
        const res = await useAuthFetch(`/backendapi/updateProfile/${usrid}/${field}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyContent),
        });
        console.log("backend response", res.Profile);
        showMessage("success", "Updated", `${field} has been updated`);
      }
    } catch (e) {
      showMessage("destructive", "Error:", e);
    } finally {
      edit[field].value = false;
      return (edit[field].loading = false);
    }
  };
</script>
