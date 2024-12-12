<template>
    <div
      v-if="showConfirm"
      class="fixed inset-0 z-50 flex flex-row items-center justify-center overflow-y-auto overflow-x-hidden"
    >
    <div class="relative max-h-full w-full max-w-md lg:max-w-lg">
        <div class="relative rounded-2xl bg-white shadow dark:bg-gray-700">
          <div class="p-4 md:p-5">
            <div class="relative rounded-lg">
              <!-- Modal header -->
              <div class="flex items-center justify-between rounded-t border-b dark:border-gray-600">
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  collegeName
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
            </div>
          </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { tr } from 'date-fns/locale';

const props = defineProps({
    showConfirm: {
      type: Boolean,
      required: true,
    },
    trigger: {
      type: Function,
      required: true,
    },
  });

</script>