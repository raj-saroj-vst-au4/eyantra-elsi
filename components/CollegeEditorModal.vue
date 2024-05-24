<template>
  <div
    v-if="showCollegeEditorModal"
    class="fixed inset-0 z-50 flex flex-row items-center justify-center overflow-y-auto overflow-x-hidden"
  >
    <div class="relative max-h-full w-full max-w-md p-4 lg:max-w-lg">
      <div class="relative rounded-2xl bg-white shadow dark:bg-gray-700">
        <div class="p-4 md:p-5">
          <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
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
                <div class="col-span-1">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Is Elsi ?</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.IS_eLSI.value }"
                      required=""
                      v-model="data.IS_eLSI"
                      :disabled="!edit.IS_eLSI.value"
                    />
                    <button
                      v-if="!edit.IS_eLSI.value"
                      @click="toggleEdit('IS_eLSI')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'IS_eLSI', data.IS_eLSI)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.IS_eLSI.loading }"
                      />
                    </button>
                  </div>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="category"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Category</label
                  >
                  <select
                    id="category"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  >
                    <option selected="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
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
    IS_eLSI: {
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
