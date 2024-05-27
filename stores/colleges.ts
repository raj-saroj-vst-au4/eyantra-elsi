import { defineStore } from "pinia";

export const useCollegesStore = defineStore("colleges", {
  state: () => ({
    colleges: null,
    lastFetch: 0,
    fetchCount: 0,
  }),
  actions: {
    setColleges(data: any) {
      this.colleges = data;
      this.lastFetch = Date.now();
      this.fetchCount++;
    },
    updateCollege(updatedCollege: Object) {
      const index = this.colleges.findIndex((college) => college.id === updatedCollege.id);
      if (index !== -1) {
        this.colleges.splice(index, 1, updatedCollege);
      }
    },
    async fetchColleges() {
      if (this.fetchCount < 10 && this.colleges) {
        return;
      } else {
        try {
          const response = await useAuthFetch(`/backendapi/fetchelsicolleges`, {
            method: "POST",
          });
          this.setColleges(response.colleges);
        } catch (error) {
          console.error("Error fetching college data:", error);
          useSonner["error"]("Error", {
            description: "Sorry, you do not have access to Fetch Colleges List",
          });
        }
      }
    },
  },
  getters: {
    getColleges: (state) => state.colleges,
    getFetchCount: (state) => state.fetchCount,
  },
});
