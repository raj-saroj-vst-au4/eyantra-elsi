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
  },
  getters: {
    getColleges: (state) => state.colleges,
    getFetchCount: (state) => state.fetchCount,
  },
});
