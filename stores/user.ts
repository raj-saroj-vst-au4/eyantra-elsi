import { useAuthFetch } from "~/composables/useAuthFetch";
import { defineStore } from "pinia";

interface SignupResponse {

  signup: boolean;

}

interface RoleResponse {
  role: string;
}

export const useAuthUserStore = defineStore("user", {
  state: () => ({
    isSignedUp: false,
    role: "student", //default role
  }),

  actions: {
    async checkSignup() {
      try {
        const response = await useAuthFetch<SignupResponse>("/backendapi/protected", {
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
    async checkRole() {
      try {
        const response = await useAuthFetch<RoleResponse>("/backendapi/getRole", {
          method: "GET",
        });
        if (response && response.role) {
          console.log("Role fetched", response.role);
          this.role = response.role;
        }
      } catch (err) {
        console.error("Failed to fetch role", err);
      }
    },
  },
});
