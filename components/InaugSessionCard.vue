<template>
  <div class="flex items-center justify-center font-normal text-white">
    <form>
      <UiCard
        class="w-[280px] max-w-sm rounded-2xl bg-slate-700"
        title="Create Slot"
        description="Create a new lab inauguration slot"
      >
        <template #content>
          <UiCardContent>
            <div class="grid w-full items-center gap-2">
              <div class="flex flex-col space-y-1.5">
                <UiLabel for="name">Slot Name</UiLabel>
                <UiInput required id="name" placeholder="Name of this slot" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <UiLabel for="framework">Date</UiLabel>
                <UiDatepicker v-model="today">
                  <template #default="{ togglePopover }">
                    <UiButton
                      variant="outline"
                      :class="[
                        !date && 'text-muted-foreground',
                        'w-full justify-center text-center',
                      ]"
                      @click="togglePopover"
                    >
                      <Icon name="lucide:calendar" class="h-4 w-4" />
                      {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
                    </UiButton>
                  </template>
                </UiDatepicker>
              </div>
            </div>
          </UiCardContent>
        </template>
        <template #footer>
          <UiCardFooter class="flex justify-end">
            <UiButton type="submit" variant="outline">Create</UiButton>
          </UiCardFooter>
        </template>
      </UiCard>
    </form>
  </div>
</template>
<script setup>
  import { format } from "date-fns";

  const date = new Date();
</script>
