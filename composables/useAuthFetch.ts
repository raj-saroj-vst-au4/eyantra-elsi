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

  let xsrfToken = useCookie("XSRF-TOKEN").value;

  // check if jwt is expired
  if (user.value.accessToken && loggedIn.value) {
    if (!checkToken(user.value.accessToken)) {
      console.log("refreshing access token authfetch");
      // try {
      await refresh();
      console.log("trying to refresh access token");
      //   // return location.reload();
      // } catch (e) {
      //   await logout("keycloak");
      // }
      // useSonner["warning"]("WARNING", {
      //   description: "Session Expired, refresh the page...",
      // });
    }
    try {
      const res = await $fetch(path, {
        ...(options as any),
        headers: {
          "X-XSRF-TOKEN": xsrfToken,
          Authorization: `Bearer ${user.value.accessToken}`,
          ...headers,
          ...options?.headers,
        },
      });
      // console.log("response ", res);
      return res as T;
    } catch (err: any) {
      if (err.response.status === 401) {
        console.log("relogin got 401");
        // return (await login("keycloak")) as T;
        return useSonner["error"]("401 Err", {
          description: "Unauthorized Request Error...",
        });
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
        useSonner["error"]("ERROR 500", { description: "Backend Error" });
        // setTimeout(() => {
        //   return location.reload();
        // }, 2000);
      } else if (err.response.status === 413) {
        return location.replace("/hardreplace");
      } else {
        throw err;
      }
    }
  }
}
