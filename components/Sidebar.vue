<template>
  <button
    data-drawer-target="logo-sidebar"
    data-drawer-toggle="logo-sidebar"
    aria-controls="logo-sidebar"
    type="button"
    class="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 sm:hidden"
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
    <div class="flex h-full flex-col justify-between overflow-y-auto bg-gray-800 px-3 py-4">
      <div>
        <a href="https://portal.e-yantra.org/" class="mb-5 flex items-center ps-2.5">
          <img src="/images/eyantralogo.svg" class="me-3 h-6 sm:h-7" alt="Eyantra Logo" />
          <span class="self-center whitespace-nowrap text-xl font-semibold text-white"
            >e-Yantra</span
          >
        </a>
        <hr />

        <ul class="mt-2 space-y-2 font-medium">
          <li>
            <NuxtLink
              to="/"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
            >
              <Icon
                name="lucide:layout-dashboard"
                class="size-4 text-muted-foreground text-white"
              />

              <span class="ms-3">Dashboard</span>
            </NuxtLink>
          </li>
          <li v-if="myrole === 'isAdmin'">
            <NuxtLink
              to="/colleges"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
            >
              <Icon name="lucide:building-2" class="size-4 text-muted-foreground text-white" />

              <span class="ms-3 flex-1 whitespace-nowrap">Colleges</span>
            </NuxtLink>
          </li>
          <li v-if="myrole === 'isAdmin'">
            <NuxtLink
              to="/users"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
            >
              <Icon name="lucide:users" class="size-4 text-muted-foreground text-white" />

              <span class="ms-3 flex-1 whitespace-nowrap">Users</span>
              <NuxtLink to="/admins">
                <button
                  type="button"
                  class="inline-flex items-center rounded-xl bg-gray-700 p-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <Icon
                    name="lucide:square-radical"
                    class="size-4 text-muted-foreground text-white"
                  />
                  <span class="sr-only">Icon description</span>
                </button>
              </NuxtLink>
            </NuxtLink>
          </li>
          <li v-if="myrole === 'isAdmin'">
            <NuxtLink
              to="/labinaug"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
            >
              <Icon name="lucide:flame" class="size-4 text-muted-foreground text-white" />

              <span class="ms-3 flex-1 whitespace-nowrap">Lab Inaugration</span>
              <NuxtLink to="/addlabslot">
                <button
                  type="button"
                  class="inline-flex items-center rounded-xl bg-gray-700 p-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <Icon
                    name="lucide:calendar-plus"
                    class="size-4 text-muted-foreground text-white"
                  />
                  <span class="sr-only">Icon description</span>
                </button>
              </NuxtLink>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/profile"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
            >
              <Icon name="lucide:contact-round" class="size-4 text-muted-foreground text-white" />

              <span class="ms-3 flex-1 whitespace-nowrap">Profile</span>
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
          <UiAlertDialogContent @escape-key-down="console.log('cancelled logout')">
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
  import { jwtDecode } from "jwt-decode";

  interface Jwt {
    resource_access: {
      "realm-management": {
        roles: string[];
      };
    };
  }

  const { user, logout } = useOidcAuth();
  const router = useRouter();
  const myrole = ref("isStudent");

  const model = ref(false);
  const rawjwt = user.value.accessToken as string;
  const decodedToken: Jwt = jwtDecode(rawjwt);
  const jwtroles = decodedToken?.resource_access["realm-management"]?.roles;

  onBeforeMount(() => {
    checkRole();
  });

  const checkRole = () => {
    if (jwtroles.includes("realm-admin")) {
      console.log("is admin");
      myrole.value = "isAdmin";
    } else if (jwtroles.includes("elsi-teacher")) {
      console.log(" is not admin but teacher");
      myrole.value = "isTeacher";
    } else {
      console.log("is student");
      myrole.value = "isStudent";
    }
  };

  const hardLogout = async () => {
    router.push("/hardlogout");
    // return logout("keycloak");
  };
</script>
