import { useAuthFetch } from "~/composables/useAuthFetch";
import { defineStore } from "pinia";

const { loggedIn, user, login, refresh } = useOidcAuth();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    api_token: null, // this is the token to be used for api calls
    session_token: localStorage.getItem(""), // this is the token to be used for session calls
  }),
  // actions: {
  //   async refreshAccessToken() {
  //     await refresh();
  //     this.api_token = user.accessToken;
  //     this.session_token = useCookie("XSRF-TOKEN");
  //   },
  // },
});
