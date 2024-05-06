import type { UseFetchOptions } from "#app";

export async function useAuthFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {};
  const { user, loggedIn, refresh } = useOidcAuth();
  const router = useRouter();

  let sessionToken = useCookie("eyantraapi_session");
  let xsrfToken = useCookie("XSRF-TOKEN").value;

  // check if jwt is expired
  if (user.value.accessToken && loggedIn.value) {
    const accessToken = user.value.accessToken;
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      await $fetch("/backendapi/token");
      sessionToken = useCookie("eyantraapi_session");
      await refresh();
    } else {
      try {
        console.log("current acc token valid");
        const res = await $fetch(path, {
          ...(options as any),
          headers: {
            "X-XSRF-TOKEN": xsrfToken,
            Authorization: `Bearer ${user.value.accessToken}`,
            ...headers,
            ...options?.headers,
          },
        });
        return res;
      } catch (err: any) {
        if (err.response && err.response.status === 403) {
          return router.push("/completesignup");
        } else if (err.response.status === 500) {
          console.log("refreshing");
          return await refresh();
        } else {
          throw err;
        }
      }
    }
  }
}
