import { useAuthFetch } from "~/composables/useAuthFetch";
import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("user", {
  state: () => ({
    isSignedUp: false,
    role: "student",
  }),

  actions: {
    async checkSignup() {
      try {
        const response = await useAuthFetch("/backendapi/protected", {
          method: "POST",
        });
        if (response && response.signup) {
          console.log("checked signup", response);
          this.isSignedUp = true;
        }
      } catch (err) {
        console.error(err);
      }
    },
    // async checkRole() {},
  },
});
