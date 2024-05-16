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
  },
  getters: {
    getColleges: (state) => state.colleges,
    getFetchCount: (state) => state.fetchCount,
  },
});
