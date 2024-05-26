<template>
  <div class="flex items-center justify-center font-medium text-white">
    <form>
      <UiCard
        class="w-[360px] max-w-sm rounded-2xl bg-slate-700"
        title="Create Slot"
        description="Create a new lab inauguration slot"
      >
        <template #content>
          <UiCardContent>
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <UiLabel for="name">Slot Name</UiLabel>
                <UiInput required id="name" placeholder="Name of this slot" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <UiLabel for="framework">Date</UiLabel>
              </div>
            </div>
          </UiCardContent>
        </template>
        <template #footer>
          <UiCardFooter class="flex justify-between">
            <UiButton type="reset" variant="outline">Cancel</UiButton>
            <UiButton type="submit" variant="outline">Create</UiButton>
          </UiCardFooter>
        </template>
      </UiCard>
    </form>
  </div>
</template>
