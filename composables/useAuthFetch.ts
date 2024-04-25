import type { UseFetchOptions } from "#app";

export async function useAuthFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {};
  const { user, loggedIn } = useOidcAuth();
  const router = useRouter();
  const xsrf_token = useCookie("XSRF-TOKEN");

  if (!xsrf_token) {
    await fetch("/backendapi/token");
  }

  // if (process.server) {
  //   headers = {
  //     ...headers,
  //     ...useRequestHeaders(["referer", "cookie"]),
  //   };
  // }

  try {
    const res = await fetch(path, {
      ...(options as any),
      headers: {
        "X-XSRF-TOKEN": xsrf_token,
        Authorization: `Bearer ${user.value.accessToken}`,
        ...headers,
        ...options?.headers,
      },
    });
    return res;
  } catch (err: any) {
    if (err.response && err.response.status === 403) {
      return router.push("/completesignup");
    } else {
      throw err;
    }
  }
}
