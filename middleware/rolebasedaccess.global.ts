import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to, next) => {
  // skip middleware on server
  // if (import.meta.server) return;

  const checkRole = () => {
    const { user } = useOidcAuth();
    const rawjwt = user.value?.accessToken;
    const decodedToken = jwtDecode(rawjwt);
    return decodedToken?.realm_access?.roles;
  };

  if (
    to.path == "/addlabslot" ||
    to.path == "/labinaug" ||
    to.path == "/colleges" ||
    to.path == "/createworkshop" ||
    to.path == "/users" ||
    to.path == "/addlabslot" ||
    to.path == "/admins"
  ) {
    const jwtroles = checkRole();
    if (jwtroles.includes("eyantra_admin")) {
      return;
    } else {
      return navigateTo("/");
    }
  }
});
