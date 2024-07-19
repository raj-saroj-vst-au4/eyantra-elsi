import type { UseFetchOptions } from "#app";

export async function useKcAuthFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {};
  const { user, loggedIn, refresh } = useOidcAuth();
  const runtimeConfig = useRuntimeConfig();

  const checkToken = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!token || payload.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  };

  // check if jwt is expired
  if (user.value.accessToken && loggedIn.value) {
    console.log("token valid : ", checkToken(user.value.accessToken));
    if (!checkToken(user.value.accessToken)) {
      console.log("refreshing kc access token");
      await refresh();
      // console.log("trying to refresh access token");
      // useSonner["warning"]("WARNING", {
      //   description: "Session Expired, refresh the page...",
      // });
    } else {
      try {
        const res = await $fetch(runtimeConfig.public.oidcAdminKeycloakUrl + path, {
          ...(options as any),
          headers: {
            Authorization: `Bearer ${user.value.accessToken}`,
            ...headers,
            ...options?.headers,
          },
        });
        // console.log("response ", res);
        return res as T;
      } catch (err: any) {
        console.log("kc error", err);
      }
    }
  }
}
