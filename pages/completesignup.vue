<template>
  <Head>
    <title>Complete Registration</title>
  </Head>
  <div class="min-h-screen bg-gray-900 py-16">
    <div class="container mx-auto">
      <div data-aos="fade-up">
        <div
          class="mx-auto flex w-10/12 flex-col overflow-hidden rounded-xl bg-white shadow-lg lg:w-8/12 lg:flex-row"
        >
          <div
            class="flex w-full flex-col items-center justify-between bg-cover bg-center bg-no-repeat p-12 lg:w-1/2"
            style="background-image: url(&quot;/images/robotics2.png&quot;)"
          >
            <h1 class="mb-3 text-3xl text-white">Welcome Back</h1>
            <div>
              <p class="text-white">
                e-Yantra Robotics Competition (eYRC) hosted by<br />
                <a href="https://www.e-yantra.org/" class="font-semibold text-blue-500"
                  >e-Yantra, IIT Bombay.
                </a>
              </p>
            </div>
          </div>
          <div class="w-full px-12 py-16 text-gray-900 lg:w-1/2">
            <h2 class="mb-4 text-3xl">Finish signup</h2>
            <p class="mb-4">Lets wrap-up registration</p>
            <form @submit.prevent="submitForm">
              <div class="my-5">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  v-model="userFname"
                  class="w-full border border-gray-400 bg-white px-2 py-1"
                />
              </div>
              <div class="grid grid-cols-2 gap-5">
                <select
                  v-model="selectedCountry"
                  @change="onCountrySelected"
                  class="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option :value="null" selected>Select Country</option>
                  <option v-for="country in countries" :key="country.id" :value="country">
                    {{ country }}
                  </option>
                </select>
                <select
                  v-model="selectedCollegeState"
                  @change="onStateSelected"
                  class="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option :value="null" selected>College State</option>
                  <option
                    v-if="selectedCountry"
                    v-for="collegestate in collegestates"
                    :key="collegestate.id"
                    :value="collegestate"
                  >
                    {{ collegestate }}
                  </option>
                </select>
              </div>
              <div class="mt-5">
                <select
                  v-model="selectedCollege"
                  class="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option :value="null" selected>Your College</option>
                  <option
                    v-if="selectedCollegeState"
                    v-for="college in colleges"
                    :key="college.id"
                    :value="college.id"
                  >
                    {{ college.college_name }}
                  </option>
                </select>
              </div>
              <!-- done till here -->
              <div class="mt-5 grid grid-cols-2 gap-5">
                <select
                  v-model="selectedDesignation"
                  class="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
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
                <select
                  v-model="selectedDepartment"
                  class="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option :value="null" selected>Your Department</option>
                  <option
                    v-for="department in departments"
                    :key="department.id"
                    :value="department.id"
                  >
                    {{ department.name }}
                  </option>
                </select>
              </div>
              <div class="mt-5">
                <input
                  type="text"
                  placeholder="Your Address"
                  v-model="userAddress"
                  class="w-full border border-gray-400 bg-white px-2 py-1"
                />
              </div>
              <div class="mt-5">
                <input
                  type="number"
                  placeholder="pincode"
                  v-model="userPincode"
                  class="w-full border border-gray-400 bg-white px-2 py-1"
                />
              </div>

              <div class="mt-5">
                <button class="w-full bg-blue-500 py-3 text-center text-white" type="submit">
                  Continue
                </button>
              </div>
              <div v-if="validationError" class="absolute z-20 text-red-500">
                <div class="relative mt-3">
                  {{ validationError }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";

  definePageMeta({
    layout: false,
  });
  const { user, loggedIn } = useOidcAuth();
  const router = useRouter();
  const countries = ref([]);
  const collegestates = ref([]);
  const colleges = ref([]);
  const departments = ref([]);
  const designations = ref([]);

  const validationError = ref(null);
  const selectedCountry = ref(null);
  const selectedCollegeState = ref(null);
  const selectedCollege = ref(null);
  const selectedDepartment = ref(null);
  const selectedDesignation = ref(null);
  const userFname = ref(null);
  const userAddress = ref(null);
  const userPincode = ref(null);

  const fetchCountries = async () => {
    try {
      const response = await useAuthFetch("/backendapi/getcountries");
      // const countriesjson = await response.json();
      countries.value = response.countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await useAuthFetch(`/backendapi/getstates/${country}`);
      collegestates.value = response.states;
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchColleges = async (country, state) => {
    try {
      const res = await useAuthFetch(`/backendapi/getcolleges/${country}/${state}`);
      // const clg = await res.json();
      colleges.value = res.colleges;
    } catch (err) {
      console.log("error fetching colleges:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      departments.value = await useAuthFetch("/backendapi/getdepartments");
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchDesignations = async () => {
    try {
      designations.value = await useAuthFetch("/backendapi/getdesignations");
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  const checkSignup = async () => {
    if (loggedIn) {
      // console.log("auth user, sending data");
      const response = await useAuthFetch("/backendapi/protected", {
        method: "POST",
      });
      if (response && response.signup) {
        console.log(response.signup);
        router.push("/home");
      }
    } else {
      $oidc.login();
    }
  };

  onBeforeMount(checkSignup);
  onMounted(() => {
    fetchCountries()
      .then(() => fetchDepartments())
      .then(() => fetchDesignations());
  });

  const onCountrySelected = () => {
    if (selectedCountry.value) {
      const country = selectedCountry.value;
      fetchStates(country);
    }
  };

  const onStateSelected = () => {
    if (selectedCollegeState.value) {
      const state = selectedCollegeState.value;
      const country = selectedCountry.value;
      fetchColleges(country, state);
    }
  };

  const submitForm = async () => {
    try {
      const response = await useAuthFetch("/backendapi/regsubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userFname.value,
          username: user.value.providerInfo.preferred_username,
          email: user.value.providerInfo.email,
          country: selectedCountry.value,
          state: selectedCollegeState.value,
          college: selectedCollege.value,
          department: selectedDepartment.value,
          designation: selectedDesignation.value,
          address: userAddress.value,
          pin: userPincode.value,
        }),
      });

      if (response.status == 200) {
        console.log("form submitted");
        validationError.value = null;
        $router.push("/home");
      } else if (response.status == 401) {
        console.log(response);
      } else {
        validationError.value = Object.values(response.errors)[0][0];
        console.log("server response ", Object.values(response.errors)[0][0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>
