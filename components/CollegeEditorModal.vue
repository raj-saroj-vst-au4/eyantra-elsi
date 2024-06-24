<template>
  <div
    v-if="showCollegeEditorModal"
    class="fixed inset-0 z-50 flex flex-row items-center justify-center overflow-y-auto overflow-x-hidden"
  >
    <div class="relative max-h-full w-full max-w-md lg:max-w-lg">
      <div class="relative rounded-2xl bg-white shadow dark:bg-gray-700">
        <div class="p-4 md:p-5">
          <div class="relative rounded-lg">
            <!-- Modal header -->
            <div class="flex items-center justify-between rounded-t border-b dark:border-gray-600">
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {{
                  data.college_name.length > 40
                    ? data.college_name.substring(0, 40) + "..."
                    : data.college_name
                }}
              </h3>
              <button
                type="button"
                class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="trigger"
              >
                <Icon name="lucide:x" class="size-4 text-muted-foreground" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
              <div class="mb-4 grid grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >College Name</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.college_name.value }"
                      required=""
                      v-model="data.college_name"
                      :disabled="!edit.college_name.value"
                    />
                    <button
                      v-if="!edit.college_name.value"
                      @click="toggleEdit('college_name')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'college_name', data.college_name)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.college_name.loading }"
                      />
                    </button>
                  </div>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >District</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.district.value }"
                      required=""
                      v-model="data.district"
                      :disabled="!edit.district.value"
                    />
                    <button
                      v-if="!edit.district.value"
                      @click="toggleEdit('district')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'district', data.district)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.district.loading }"
                      />
                    </button>
                  </div>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Pincode</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.pincode.value }"
                      required=""
                      v-model="data.pincode"
                      :disabled="!edit.pincode.value"
                    />
                    <button
                      v-if="!edit.pincode.value"
                      @click="toggleEdit('pincode')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'pincode', data.pincode)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.pincode.loading }"
                      />
                    </button>
                  </div>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="eYIC_allowed"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >eYIC Allowed?</label
                  >
                  <div class="relative w-full">
                    <select
                      id="eYIC_allowed"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.eYIC_allowed.value }"
                      v-model.number="data.eYIC_allowed"
                      :disabled="!edit.eYIC_allowed.value"
                    >
                      <option value="" disabled>Please select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    <button
                      v-if="!edit.eYIC_allowed.value"
                      @click="toggleEdit('eYIC_allowed')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'eYIC_allowed', data.eYIC_allowed)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.eYIC_allowed.loading }"
                      />
                    </button>
                  </div>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >College Type</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.college_type.value }"
                      required=""
                      v-model="data.college_type"
                      :disabled="!edit.college_type.value"
                    />
                    <button
                      v-if="!edit.college_type.value"
                      @click="toggleEdit('college_type')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'college_type', data.college_type)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.college_type.loading }"
                      />
                    </button>
                  </div>
                </div>
                <div class="col-span-2">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Website</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.website.value }"
                      required=""
                      v-model="data.website"
                      :disabled="!edit.website.value"
                    />
                    <button
                      v-if="!edit.website.value"
                      @click="toggleEdit('website')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'website', data.website)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.website.loading }"
                      />
                    </button>
                  </div>
                </div>
                <div class="col-span-2">
                  <label
                    for="description"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >College Address</label
                  >
                  <textarea
                    id="description"
                    rows="4"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    v-model="data.address"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    showCollegeEditorModal: {
      type: Boolean,
      required: true,
    },
    trigger: {
      type: Function,
      required: true,
    },
  });
  const edit = reactive({
    college_name: {
      value: false,
      loading: false,
    },
    district: {
      value: false,
      loading: false,
    },
    pincode: {
      value: false,
      loading: false,
    },
    eYIC_allowed: {
      value: false,
      loading: false,
    },
    college_type: {
      value: false,
      loading: false,
    },
    website: {
      value: false,
      loading: false,
    },
  });

  const toggleEdit = (field) => {
    edit[field].value = !edit[field].value;
  };

  const collegeStore = useCollegesStore();
  const showMessage = (type, title, content) => {
    useToast().toast({
      title: title,
      description: content,
      variant: type,
    });
  };
  const updateCollege = async (clgid, field, updatedVal) => {
    console.log(clgid, field, updatedVal);
    try {
      edit[field].loading = true;
      if (clgid) {
        const bodyContent = {};
        bodyContent[field] = updatedVal;
        const res = await useAuthFetch(`/backendapi/updatecollege/${clgid}/${field}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyContent),
        });
        console.log("backend response", res.college);
        collegeStore.updateCollege(res.college);
        showMessage("success", "Updated", `${field} has been updated`);
      }
    } catch (e) {
      showMessage("destructive", "Error:", e);
    } finally {
      edit[field].value = false;
      return (edit[field].loading = false);
    }
  };
</script>
