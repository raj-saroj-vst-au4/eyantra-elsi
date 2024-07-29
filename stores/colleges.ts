import { get } from "@vueuse/core";
import { set } from "date-fns";
import { defineStore } from "pinia";

export const useCollegesStore = defineStore("colleges", {
  state: () => ({
    colleges: null,
    lastFetch: 0,
    fetchCount: 0,
    selectedCollege: "",
  }),
  actions: {
    setColleges(data: any) {
      this.colleges = data;
      this.lastFetch = Date.now();
      this.fetchCount++;
      this.selectedCollege = "";
      this.collegeSelectedName = "";
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
    setTONonelsiCollege(data: any, value: any) {
      // this.colleges[0].IS_eLSI = 0;
      const index = this.colleges.findIndex((college) => college.id == data);
      this.colleges[index].IS_eLSI = value;
     
    },
    setTOeLSICollege() {
      
      const index = this.colleges.findIndex((college) => college.id == this.selectedCollege);
      
      this.colleges[index].IS_eLSI = 1;
    },
    setSelectedCollege(data: any, clg: any) {
      this.selectedCollege = data;
      this.collegeSelectedName = clg;
    }
  },
  getters: {
    getColleges: (state) => state.colleges,
    getFetchCount: (state) => state.fetchCount,
    getSelectedCollege: (state) => state.selectedCollege,
    getCollegeSelectedName: (state) => state.collegeSelectedName,
  },
});
