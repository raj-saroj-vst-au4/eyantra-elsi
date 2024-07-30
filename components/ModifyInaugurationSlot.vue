<template>
  <div
    v-if="showModifyInaugurationEditorModal"
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
                  data.collegeName.length > 40
                    ? data.collegeName.substring(0, 40) + "..."
                    : data.collegeName
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
            <div class="p-4 md:p-5">
              <div class="mb-4 grid grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Slot Time</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="schedule_date"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.schedule_date.value }"
                      required=""
                      v-model="data.schedule_date"
                      :disabled="!edit.schedule_date.value"
                    />
                    <button
                      v-if="!edit.schedule_date.value"
                      @click="toggleEdit('schedule_date')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                    <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'schedule_date', data.schedule_date)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.schedule_date.loading }"
                      />
                  </button>
                  </div>
                  
                </div>
              </div>
            </div>
            <!-- cahnge slot name -->
            <div class="p-4 md:p-5">
              <div class="mb-4 grid grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Slot Name</label
                  >
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="name"
                      id="slotname"
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      :class="{ 'cursor-not-allowed': !edit.slotname.value }"
                      required=""
                      v-model="data.slotname"
                      :disabled="!edit.slotname.value"
                    />
                    <button
                      v-if="!edit.slotname.value"
                      @click="toggleEdit('slotname')"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-red-400 bg-red-400 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                    <Icon name="lucide:pencil" class="size-4 text-muted-foreground" />
                    </button>
                    <button
                      v-else
                      @click="updateCollege(data.id, 'slotname', data.slotname)"
                      class="absolute end-0 top-0 h-full rounded-e-lg border border-green-400 bg-green-400 p-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      <Icon
                        name="lucide:refresh-cw"
                        class="size-4 text-muted-foreground"
                        :class="{ 'animate-spin': edit.slotname.loading }"
                      />
                  </button>
                  </div>
                  
                </div>
              </div>
            </div>
            <!-- Modal footer -->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup >
const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    showModifyInaugurationEditorModal: {
      type: Boolean,
      required: true,
    },
    trigger: {
      type: Function,
      required: true,
    },
  });
  const edit = reactive({
    collegeName: {
      value: false,
      loading: false,
    },
    schedule_date: {
      value: false,
      loading: false,
    },
    slotname: {
      value: false,
      loading: false,
    }
  });
  const toggleEdit = (field) => {
    edit[field].value = !edit[field].value;
  };
  const updateCollege = async (clgid, field, updatedVal) => {
    edit[field].value = false;
    console.log(clgid, field, updatedVal,edit.schedule_date.value);
  };
console.log(`data from modify ${props.data.collegeName} ${props.showModifyInaugurationEditorModal.value}`);
</script>