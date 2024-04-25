<template>
  <aside class="h-screen w-[300px] border-r bg-gray-800">
    <UiScrollArea class="size-full">
      <div class="flex h-screen flex-col pt-7">
        <NuxtLink to="#" class="flex w-full items-center gap-3 px-5">
          <UiAvatar
            src="/images/eyantralogo.svg"
            alt="E-yantra"
            class="size-7 rounded object-contain"
          />
          <span class="text-xl font-bold dark:text-white">E-Yantra</span>
        </NuxtLink>
        <div class="my-6 px-5">
          <UiVeeInput v-model="search" placeholder="Search..." icon="lucide:search" />
        </div>
        <div class="flex h-full grow flex-col px-5 pb-8">
          <div class="mb-10 flex flex-col gap-10">
            <nav class="flex flex-col gap-1">
              <template v-for="(n, i) in topNav" :key="i">
                <UiButton
                  v-if="!n.items"
                  :to="n.link"
                  size="default"
                  variant="ghost"
                  class="justify-start gap-4 px-3"
                >
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                  <span class="dark:text-white">{{ n.title }}</span>
                </UiButton>
                <UiCollapsible v-if="n.items">
                  <UiCollapsibleTrigger as-child>
                    <UiButton
                      size="default"
                      variant="ghost"
                      class="group w-full justify-start gap-4 px-3"
                    >
                      <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                      <span class="dark:text-white">{{ n.title }}</span>
                      <Icon
                        name="lucide:chevron-down"
                        class="ml-auto size-4 text-muted-foreground transition group-data-[state=open]:rotate-180"
                      />
                    </UiButton>
                  </UiCollapsibleTrigger>
                  <UiCollapsibleContent class="flex flex-col gap-1.5 pl-4 pr-2">
                    <template v-for="(item, index) in n.items" :key="index">
                      <UiButton
                        :to="item.link"
                        size="sm"
                        variant="ghost"
                        class="justify-start gap-4 px-3"
                      >
                        <span class="dark:text-white">{{ item.title }}</span>
                      </UiButton>
                    </template>
                  </UiCollapsibleContent>
                </UiCollapsible>
              </template>
            </nav>
            <nav class="mt-auto flex flex-col gap-1">
              <template v-for="(n, i) in bottomNav" :key="i">
                <UiButton
                  v-if="!n.items"
                  :to="n.link"
                  size="default"
                  variant="ghost"
                  class="justify-start gap-4 px-3"
                >
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                  <span class="dark:text-white">{{ n.title }}</span>
                </UiButton>
                <UiCollapsible v-if="n.items">
                  <UiCollapsibleTrigger as-child>
                    <UiButton
                      size="default"
                      variant="ghost"
                      class="group w-full justify-start gap-4 px-3"
                    >
                      <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                      <span class="dark:text-white">{{ n.title }}</span>
                      <Icon
                        name="lucide:chevron-down"
                        class="ml-auto size-4 text-muted-foreground transition group-data-[state=open]:rotate-180"
                      />
                    </UiButton>
                  </UiCollapsibleTrigger>
                  <UiCollapsibleContent class="flex flex-col gap-1.5 pl-4 pr-2">
                    <template v-for="(item, index) in n.items" :key="index">
                      <UiButton
                        :to="item.link"
                        size="sm"
                        variant="ghost"
                        class="justify-start gap-4 px-3"
                      >
                        <span class="dark:text-white">{{ item.title }}</span>
                      </UiButton>
                    </template>
                  </UiCollapsibleContent>
                </UiCollapsible>
              </template>
            </nav>
          </div>

          <UiDivider class="my-6" />
          <div class="flex items-center gap-3 pb-8">
            <div class="flex items-center gap-3">
              <UiAvatar
                src="https://robohash.org/{{user.providerInfo.given_name}}"
                class="size-10"
              />
              <div>
                <p class="text-sm font-semibold" v-html="user.providerInfo.name" />
                <p class="text-sm text-muted-foreground" v-html="user.providerInfo.email" />
              </div>
            </div>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton @click="signout" class="ml-auto shrink-0" size="icon-sm" variant="ghost">
                  <Icon name="lucide:log-out" class="size-4 text-muted-foreground" />
                </UiButton>
              </UiTooltipTrigger>
            </UiTooltip>
          </div>
        </div>
      </div>
    </UiScrollArea>
  </aside>
</template>

<script lang="ts" setup>
  const search = ref<string>("");
  const { logout, user } = useOidcAuth();

  const signout = async () => {
    console.log("logging out");
    await navigateTo("/hardlogout", { external: true });
    await logout("keycloak");
  };

  const topNav = [
    { title: "Home", icon: "lucide:home", link: "#" },
    {
      title: "Dashboard",
      icon: "lucide:bar-chart-3",
      items: [
        { title: "Overview", link: "#" },
        { title: "Notifications", link: "#" },
        { title: "Analytics", link: "#" },
        { title: "Reports", link: "#" },
      ],
    },
    { title: "Projects", icon: "lucide:folder-dot", link: "#" },
    { title: "Tasks", icon: "lucide:list-checks", link: "#" },
    { title: "Users", icon: "lucide:users", link: "#" },
  ];
  const bottomNav = [
    { title: "Support", icon: "lucide:life-buoy", link: "#" },
    {
      title: "Settings",
      icon: "lucide:settings-2",
      items: [
        { title: "Profile", link: "#" },
        { title: "Account", link: "#" },
        { title: "Security", link: "#" },
        { title: "Billing", link: "#" },
      ],
    },
  ];
</script>
