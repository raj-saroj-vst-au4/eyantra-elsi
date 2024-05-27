<template>
  <Loader v-if="isLoading" />
  <div class="h-[550px] w-full" v-else>
    <apexchart width="100%" height="100%" type="line" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import { type ApexOptions } from "apexcharts";

  const collegesStore = useCollegesStore();
  const colleges = computed(() => collegesStore.getColleges);
  const fetchCount = computed(() => collegesStore.getFetchCount);
  const isLoading = useState("isLoading");

  const fetchColleges = async () => {
    isLoading.value = true;
    try {
      if (fetchCount.value && fetchCount.value < 10) {
        console.log("Using colleges from pinia", collegesStore.getColleges);
        colleges.value = collegesStore.getColleges;
      } else {
        const response = await useAuthFetch(`/backendapi/fetchelsicolleges`, {
          method: "POST",
        });
        // console.log("refreshing college list ", response);
        collegesStore.setColleges(response.colleges);
      }
      isLoading.value = false;
    } catch (error) {
      console.error("Error fetching college data:", error);
      useSonner["error"]("Error", {
        description: "Sorry, you donot have access to Fetch Colleges List",
      });
    }
  };

  onBeforeMount(() => {
    fetchColleges();
  });
  const series = ref<ApexOptions["series"]>([
    {
      name: "Registrations",
      data: [],
    },
    {
      name: "Inaugurations",
      data: [],
    },
  ]);

  const options: ApexOptions = {
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      offsetY: 5,
    },

    chart: {
      toolbar: {
        show: window.innerWidth > 768,
      },
    },
    yaxis: {
      title: {
        text: window.innerWidth > 768 ? "eLSI College Activity" : "",
        offsetX: 5,
        style: {
          fontWeight: 600,
          fontSize: "13px",
          fontFamily: "inherit",
        },
      },
      labels: {
        style: {
          fontFamily: "inherit",
        },
      },
    },
    xaxis: {
      title: {
        text: window.innerWidth > 768 ? "Years" : "",
        offsetY: -2,
        style: {
          fontWeight: 600,
          fontSize: "13px",
          fontFamily: "inherit",
        },
      },
      labels: {
        style: {
          fontFamily: "inherit",
        },
      },
    },
  };

  const processCollegeData = () => {
    const filteredColleges = colleges?.value.filter((college) => college.IS_eLSI === 1);

    const years = filteredColleges.map((college) => new Date(college.created_at).getFullYear());
    const minYear = 2012;
    const maxYear = Math.max(...years);

    const yearRange = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    const registrationData = Array(yearRange.length).fill(0);
    const inaugurationData = Array(yearRange.length).fill(0);

    filteredColleges.forEach((college) => {
      const createdYear = new Date(college.created_at).getFullYear();
      const yearIndex = createdYear - minYear;
      registrationData[yearIndex]++;

      if (college.inauguration_date) {
        const inaugurationYear = new Date(college.inauguration_date).getFullYear();
        const inaugurationIndex = inaugurationYear - minYear;
        inaugurationData[inaugurationIndex]++;
      }
    });

    series.value[0].data = registrationData;
    series.value[1].data = inaugurationData;
    options.xaxis.categories = yearRange.map((year) => year.toString());
  };

  onMounted(() => {
    processCollegeData();
  });
</script>

<style>
  .apexcharts-menu {
    @apply border-border bg-background text-foreground;
    .apexcharts-menu-item {
      @apply hover:!bg-primary hover:!text-primary-foreground;
    }
  }

  .apexcharts-tooltip {
    background: theme("colors.background") !important;
    color: theme("colors.foreground") !important;
    border: 1px solid theme("colors.border") !important;
    box-shadow: theme("boxShadow.DEFAULT") !important;

    .apexcharts-tooltip-title {
      color: theme("colors.foreground") !important;
      background-color: theme("colors.muted.DEFAULT") !important;
      font-family: theme("fontFamily.sans") !important;
      border-bottom: 1px solid theme("colors.border") !important;
    }
  }
</style>
