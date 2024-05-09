<template>
  <button
    data-drawer-target="logo-sidebar"
    data-drawer-toggle="logo-sidebar"
    aria-controls="logo-sidebar"
    type="button"
    class="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="h-6 w-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="logo-sidebar"
    class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div
      class="flex h-full flex-col justify-between overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800"
    >
      <div>
        <a href="https://portal.e-yantra.org/" class="mb-5 flex items-center ps-2.5">
          <img src="/images/eyantralogo.svg" class="me-3 h-6 sm:h-7" alt="Eyantra Logo" />
          <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >E-Yantra</span
          >
        </a>
        <hr />

        <ul class="mt-2 space-y-2 font-medium">
          <li>
            <NuxtLink
              to="/"
              class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Icon
                name="lucide:layout-dashboard"
                class="size-4 text-muted-foreground text-white"
              />

              <span class="ms-3">Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/colleges"
              class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Icon name="lucide:building-2" class="size-4 text-muted-foreground text-white" />

              <span class="ms-3 flex-1 whitespace-nowrap">Colleges</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/myteam"
              class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Icon name="lucide:users" class="size-4 text-muted-foreground text-white" />

              <span class="ms-3 flex-1 whitespace-nowrap">My Team</span>
              <span
                class="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >3</span
              >
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/profile"
              class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Icon name="lucide:contact-round" class="size-4 text-muted-foreground text-white" />

              <span class="ms-3 flex-1 whitespace-nowrap">Profile</span>
            </NuxtLink>
          </li>
          <!-- <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path
                  d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Colleges</span>
            </a>
          </li> -->
          <li>
            <NuxtLink
              to="/"
              class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Icon name="lucide:file-pen-line" class="size-4 text-muted-foreground text-white" />
              <span class="ms-3 flex-1 whitespace-nowrap">Apply for eLSI</span>
              <span
                class="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >3</span
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-3 pb-8">
        <div class="flex items-center gap-3">
          <UiAvatar src="https://robohash.org/{{user.providerInfo.given_name}}" class="size-10" />
          <div>
            <p class="text-sm font-semibold text-white" v-html="user?.providerInfo.name" />
            <p class="text-sm text-muted-foreground text-white" v-html="user?.providerInfo.email" />
          </div>
        </div>
        <UiAlertDialog v-model:open="model">
          <UiAlertDialogTrigger as-child>
            <UiButton class="ml-auto shrink-0" size="icon-sm" variant="ghost">
              <Icon name="lucide:log-out" class="size-5 text-muted-foreground text-white" />
            </UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent @escape-key-down="showMessage('Escape key pressed')">
            <UiAlertDialogHeader>
              <UiAlertDialogTitle class="text-white">Are you absolutely sure?</UiAlertDialogTitle>
              <UiAlertDialogDescription class="text-white">
                Use softlogout to logout this portal but stay loggedin to SSO, use hardlogout to
                signout of SSO as well.
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel class="bg-white hover:bg-gray-400" @click="logout('keycloak')"
                >Soft</UiAlertDialogCancel
              >
              <UiAlertDialogAction class="bg-red-400 hover:bg-red-700" @click="hardLogout"
                >Hard</UiAlertDialogAction
              >
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
      </div>
    </div>
  </aside>
</template>
<script lang="ts" setup>
  const { user, logout } = useOidcAuth();
  const showMessage = (message: string) => {
    useSonner(message);
  };
  const model = ref(false);

  const hardlogout = async () => {
    navigateTo("/hardlogout").then(() => {
      return logout("keycloak");
    });
  };
</script>
