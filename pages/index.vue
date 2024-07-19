<template>
  <div class="p-7">
    <component :is="roleComponent" />
  </div>
</template>
<script setup>
  import { jwtDecode } from "jwt-decode";

  const { user } = useOidcAuth();
  const roleComponent = ref(null);
  const rawjwt = user.value.accessToken;
  const decodedToken = jwtDecode(rawjwt);
  const jwtroles = decodedToken?.realm_access.roles;

  const checkRole = () => {
    if (jwtroles.includes("eyantra_admin")) {
      console.log("is admin");
      return "isAdmin";
    } else if (jwtroles.includes("elsi-teacher")) {
      console.log("is not admin but teacher");
      return "isTeacher";
    } else {
      console.log("is student");
      return "isStudent";
    }
  };

  onBeforeMount(() => {
    const role = checkRole();
    switch (role) {
      case "isAdmin":
        roleComponent.value = defineAsyncComponent(() => import("~/pages/admindashboard.vue"));
        break;
      case "isTeacher":
        roleComponent.value = defineAsyncComponent(() => import("~/pages/teacherdashboard.vue"));
        break;
      default:
        roleComponent.value = defineAsyncComponent(() => import("~/pages/studentdashboard.vue"));
        break;
    }
  });
</script>
