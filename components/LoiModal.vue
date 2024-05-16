<template>
  <div
    v-if="showLoiModal"
    class="fixed inset-0 z-50 flex flex-row items-center justify-center overflow-y-auto overflow-x-hidden"
  >
    <div
      class="relative max-h-full w-full p-4"
      :class="data.intent_letter ? 'h-xl max-w-xl' : 'max-w-md'"
    >
      <div class="relative rounded-2xl bg-white shadow dark:bg-gray-700">
        <div class="p-4 text-center md:p-5">
          <svg
            class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            v-if="!data.intent_letter"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3
            class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            v-if="!data.intent_letter"
          >
            Letter of Intent does not exist !
          </h3>
          <embed
            :src="data.intent_letter + '#toolbar=0&navpanes=0'"
            class="mb-4"
            width="100%"
            height="480"
            v-else
          />
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Update PDF Link</label
            >
            <input
              type="text"
              class="mb-4 block w-full rounded-2xl border border-gray-300 bg-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Google Drive PDF Link"
              v-model="loilink"
              required
            />
          </div>
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="inline-flex items-center rounded-2xl bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            @click="updateLoi(data.id)"
          >
            Update
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="ms-3 rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-red-400 hover:text-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
            @click="trigger"
          >
            No, cancel
          </button>
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
    showLoiModal: {
      type: Boolean,
      required: true,
    },
    trigger: {
      type: Function,
      required: true,
    },
  });
  const loilink = ref("");
  const collegeStore = useCollegesStore();
  const showMessage = (type, title, content) => {
    useToast().toast({
      title: title,
      description: content,
      variant: type,
    });
  };
  const updateLoi = async (clgid) => {
    if (loilink.value) {
      const res = await useAuthFetch(`/backendapi/updatecollege/${clgid}/intent_letter`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent_letter: loilink.value,
        }),
      });
      // console.log("backend response", res.college);
      collegeStore.updateCollege(res.college);
      showMessage("success", "Updated", "Letter of Intent has been updated");
      props.trigger();
    } else {
      // console.log("Please enter a valid link");
      showMessage("destructive", "Error:", "Please enter a valid link");
    }
  };
</script>
