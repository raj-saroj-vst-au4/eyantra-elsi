import { useAuthFetch } from "~/composables/useAuthFetch";
import { defineStore } from "pinia";

interface SignupResponse {
  signup: boolean;
}

export const useAuthUserStore = defineStore("user", {
  state: () => ({
    isSignedUp: false,
  }),

  actions: {
    async checkSignup() {
      try {
        const response = await useAuthFetch<SignupResponse>("/backendapi/protected", {
          method: "POST",
        });
        if (response && response.signup) {
          console.log("checked signup", response);
          return (this.isSignedUp = true);
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
});
