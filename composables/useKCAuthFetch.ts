import type { UseFetchOptions } from "#app";

export async function useKCAuthFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {};
  const { user, refresh, logout, loggedIn } = useOidcAuth();
  let accToken = user.value.accessToken;
  const checkToken = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!token || payload.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  };

  // check if jwt is expired
  if (user.value.accessToken && loggedIn.value) {
    if (!checkToken(user.value.accessToken)) {
      console.log("refreshing access token");
      try {
        await refresh();
        console.log("trying to refresh access token");
        accToken = user.value.accessToken;
        // return location.reload();
      } catch (e) {
        await logout("keycloak");
      }
    } else {
      try {
        // console.log("current acc token valid");
        console.log("using token", accToken);
        const res = await $fetch(path, {
          ...(options as any),
          headers: {
            Authorization: `Bearer ${accToken}`,
            ...headers,
            ...options?.headers,
          },
        });
        console.log("KC response ", res);
        return res as T;
      } catch (err: any) {
        return useSonner["error"]("Err", {
          description: err,
        });
      }
    }
  }
}
