import type { UseFetchOptions } from "#app";

export async function useAuthFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {};
  const { user, login, logout, loggedIn, refresh } = useOidcAuth();
  const router = useRouter();

  const checkToken = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!token || payload.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  };

  const accessToken = user.value.accessToken as string;
  let xsrfToken = useCookie("XSRF-TOKEN").value;

  // check if jwt is expired
  if (user.value.accessToken && loggedIn.value) {
    if (!checkToken(accessToken)) {
      console.log("refreshing access token");
      try {
        await refresh();
        return location.reload();
      } catch (e) {
        await logout("keycloak");
      }
    } else {
      try {
        // console.log("current acc token valid");
        const res = await $fetch(path, {
          ...(options as any),
          headers: {
            "X-XSRF-TOKEN": xsrfToken,
            Authorization: `Bearer ${user.value?.accessToken}`,
            ...headers,
            ...options?.headers,
          },
        });
        // console.log("response ", res);
        return res as T;
      } catch (err: any) {
        if (err.response.status === 401) {
          // console.log("relogging in");
          return (await login("keycloak")) as T;
        } else if (err.response && err.response.status === 403) {
          useSonner["warning"]("WARNING", {
            description: "Please complete signup, redirecting...",
          });
          setTimeout(() => {
            return router.push("/completesignup");
          }, 2000);
          // return router.push("/completesignup") as T;
        } else if (err.response.status === 500) {
          // console.log("refreshing page");
          useSonner["error"]("ERROR", { description: "Session Expired, refreshing page" });
          setTimeout(() => {
            return location.reload();
          }, 2000);
        } else {
          throw err;
        }
      }
    }
  }
}