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
      // console.log("refreshing access token");
      try {
        await refresh();
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
        return res;
      } catch (err: any) {
        if (err.response.status === 401) {
          // console.log("relogging in");
          return await login("keycloak");
        } else if (err.response && err.response.status === 403) {
          return router.push("/completesignup");
        } else if (err.response.status === 500 || err.response.status === 419) {
          // console.log("refreshing page");
          return location.reload();
        } else {
          throw err;
        }
      }
    }
  }
}
