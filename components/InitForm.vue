<template>
  <form id="signUpForm" class="rounded-xl bg-gray-700 p-8 shadow-md md:p-12">
    <!-- start step indicators -->
    <div class="form-header mb-4 flex gap-3 text-center text-xs text-white">
      <span
        class="stepIndicator relative flex-1 pb-8"
        :class="[currentTab == 1 ? 'active' : currentTab > 1 ? 'finish' : '']"
        >Find College</span
      >
      <span
        class="stepIndicator relative flex-1 pb-8"
        :class="[currentTab == 2 ? 'active' : currentTab > 2 ? 'finish' : '']"
        >Your Details</span
      >
      <span class="stepIndicator relative flex-1 pb-8" :class="[currentTab == 3 ? 'active' : '']"
        >Get Proposal</span
      >
    </div>
    <!-- end step indicators -->

    <!-- step one -->
    <div :class="[currentTab === 1 ? 'block' : 'step']">
      <p class="text-md mb-5 mt-8 text-center leading-tight text-white">Find your College</p>
      <div class="mb-6 grid gap-4 md:grid-cols-2">
        <div>
          <label
            for="countries"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Country</label
          >
          <select
            id="countries"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            v-model="selectedCountry"
            @change="onCountrySelected"
          >
            <option :value="null" selected>Select Country</option>
            <option v-for="country in countries" :key="country.id" :value="country">
              {{ country }}
            </option>
          </select>
        </div>
        <div>
          <label for="states" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >State</label
          >
          <select
            v-model="selectedState"
            @change="onStateSelected"
            id="states"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option :value="null" selected>College State</option>
            <option
              v-if="selectedCountry"
              v-for="collegestate in states"
              :key="collegestate.id"
              :value="collegestate"
            >
              {{ collegestate }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-6">
        <label for="colleges" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >College</label
        >
        <select
          v-model="selectedCollege"
          id="colleges"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option :value="null" selected>Your College</option>
          <option
            v-if="selectedState"
            v-for="college in colleges"
            :key="college.id"
            :value="college.id"
          >
            {{ college.college_name }}
          </option>
        </select>
      </div>
    </div>

    <!-- step two -->
    <div :class="[currentTab === 2 ? 'active block' : 'step']">
      <p class="text-md mb-5 mt-8 text-center leading-tight text-white">Personal Details</p>
      <div class="-mx-3 mb-6 flex flex-wrap">
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label class="mb-2 block text-xs font-bold uppercase tracking-wide text-white">
            Your Name
          </label>
          <input
            class="mb-3 block w-full appearance-none rounded bg-gray-500 px-4 py-3 leading-tight focus:bg-white focus:outline-none"
            type="text"
            placeholder="Name"
          />
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>
        <div class="w-full px-3 md:w-1/2">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
            for="grid-last-name"
          >
            Phone Number
          </label>
          <input
            class="block w-full appearance-none rounded bg-gray-500 px-4 py-3 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
            type="number"
            placeholder="Number"
          />
        </div>
      </div>
      <div class="mb-6 w-full">
        <label class="mb-2 block text-xs font-bold uppercase tracking-wide text-white">
          Your Email ID
        </label>
        <input
          class="mb-3 block w-full appearance-none rounded bg-gray-500 px-4 py-3 leading-tight focus:bg-white focus:outline-none"
          type="email"
          placeholder="Mail id"
        />
      </div>
    </div>

    <!-- step three -->
    <div :class="[currentTab === 3 ? 'block' : 'step']">
      <p class="text-md mb-5 mt-8 text-center leading-tight text-white">Engage Stakeholders</p>

      <div class="mb-6 w-full">
        <label
          for="designations"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Your Designation</label
        >
        <select
          v-model="selectedDesignation"
          id="designations"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm leading-tight text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option :value="null" selected>Your Designation</option>
          <option
            v-for="designation in designations"
            :key="designation.name"
            :value="designation.id"
          >
            {{ designation.name }}
          </option>
        </select>
      </div>
      <div class="mb-6 grid gap-4 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-xs font-bold tracking-wide text-white" for="grid-last-name">
            College Contact
          </label>
          <input
            class="block w-full appearance-none rounded-lg bg-gray-500 px-4 py-3 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
            type="number"
            placeholder="Number"
          />
        </div>
        <div>
          <label class="mb-2 block text-xs font-bold tracking-wide text-white">
            College Email ID
          </label>
          <input
            class="block w-full appearance-none rounded-lg bg-gray-500 px-4 py-3 leading-tight focus:bg-white focus:outline-none"
            type="email"
            placeholder="Mail id"
          />
        </div>
      </div>
    </div>

    <!-- start previous / next buttons -->
    <div class="form-footer flex gap-3">
      <button
        v-if="currentTab > 1"
        type="button"
        class="flex-1 rounded-lg border border-gray-300 bg-white px-5 py-2 text-center text-lg text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none"
        @click="nextPrev(-1)"
      >
        Previous
      </button>
      <button
        v-if="currentTab < 3"
        type="button"
        class="flex-1 rounded-md border border-transparent bg-indigo-600 p-3 text-center text-lg text-white hover:bg-indigo-700 focus:outline-none"
        @click="nextPrev(1)"
      >
        Next
      </button>
      <button
        v-else
        type="button"
        class="flex-1 rounded-md border border-transparent bg-indigo-600 p-3 text-center text-lg text-white hover:bg-indigo-700 focus:outline-none"
        @click="nextPrev(1)"
      >
        Submit
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { onMounted, ref } from "vue";

  interface Country {
    id: string;
    name: string;
  }
  interface State {
    id: string;
    name: string;
    country_id: string;
  }
  interface College {
    id: string;
    college_name: string;
    state_id: string;
  }
  interface Designation {
    id: string;
    name: string;
  }

  const currentTab = ref(1);
  const countries = ref<Country[]>([]);
  const states = ref<State[]>([]);
  const colleges = ref<College[]>([]);
  const designations = ref<Designation[]>([]);

  const selectedCountry = ref(null);
  const selectedState = ref(null);
  const selectedCollege = ref(null);
  const selectedDesignation = ref(null);
  const showTab = (num: number) => {
    currentTab.value = num;
  };

  const nextPrev = (n: number) => {
    if ((0 < n && currentTab.value < 3) || (0 > n && currentTab.value > 1)) {
      showTab(currentTab.value + n);
    }
  };

  const fetchCountries = async () => {
    try {
      const response: any = await fetch("/backendapi/anon/getcountries");
      countries.value = response.countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country: string) => {
    try {
      const response: any = await fetch(`/backendapi/anon/getstates/${country}`);
      states.value = response.states;
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchColleges = async (country: string, state: string) => {
    try {
      const response: any = await fetch(`/backendapi/anon/getcolleges/${country}/${state}`);
      // const clg = await res.json();
      colleges.value = response.colleges;
    } catch (err) {
      console.log("error fetching colleges:", err);
    }
  };

  const fetchDesignations = async () => {
    try {
      const response: any = await fetch("/backendapi/anon/getdesignations");
      designations.value = response;
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  onMounted(() => {
    showTab(currentTab.value);
    fetchCountries().then(() => {
      fetchDesignations();
    });
  });

  const onCountrySelected = () => {
    if (selectedCountry.value) {
      const country = selectedCountry.value;
      fetchStates(country);
    }
  };

  const onStateSelected = () => {
    if (selectedState.value) {
      const country: string = selectedCountry.value || "IN";
      const state: string = selectedState.value;
      fetchColleges(country, state);
    }
  };
</script>
