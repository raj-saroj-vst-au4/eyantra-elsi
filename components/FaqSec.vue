<template>
  <UiContainer class="pb-16">
    <UiContainer class="py-16 text-center lg:py-24">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">
        Frequently asked questions
      </h2>

      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        Everything you need to know about the product and billing.
      </p>
    </UiContainer>
    <section class="mx-auto max-w-[768px]">
      <UiAccordion default-value="faq-6" type="single">
        <template v-for="i in faqs" :key="i.id">
          <UiAccordionItem :value="i.id">
            <UiAccordionHeader>
              <UiAccordionTrigger class="text-lg font-semibold">{{ i.header }}</UiAccordionTrigger>
            </UiAccordionHeader>
            <UiAccordionContent>
              <p class="text-base text-muted-foreground">{{ i.text }}</p>
            </UiAccordionContent>
          </UiAccordionItem>
        </template>
      </UiAccordion>
    </section>
  </UiContainer>
</template>
<script setup lang="ts">
  interface FAQ {
    id: string;
    header: string;
    text: string;
  }

  const faqs = ref<FAQ[]>([
    {
      id: "faq-1",
      header: "I don't know anything – are there any prerequisites for the competition?",
      text: "The most important prerequisite is that you have the desire and aptitude to learn whatever skills are required to complete the given task. Basic knowledge of some programming languages can give a good head start. e-Yantra team will provide adequate instructions and resources as required.",
    },
    {
      id: "faq-2",
      header: "Should the team members be from the same college?",
      text: "Yes, all members can be from different departments and years but MUST be from the same college.",
    },
    {
      id: "faq-3",
      header: "Is it necessary to form the team of 4 students before registration?",
      text: "No the team can range from 2 to 4 members, BUT we do recommend that you form a 4-member team with a mix of disciplines. Note that Registration Fee remains same whether it is a 2-member, 3-member, or 4-member team",
    },
    {
      id: "faq-4",
      header: "Will I/my team be eligible for an internship directly?",
      text: "In order to be eligible to appear for Internship Interview round/s, you have to be the top performing team in the competition.",
    },
    {
      id: "faq-5",
      header: "Will there be any guidance from the e-Yantra team?",
      text: "Oh yes! We thrive upon student-mentor interactions and we will have a dedicated discussion forum where teams can post their queries and mentors and other peers would reply to them.",
    },
    {
      id: "faq-6",
      header: "Will the resources provided, be recorded or online?",
      text: "No, there will be no online lectures or sessions (you all are going through them enough already). Resources will basically have different types of components - videos, theory documents along with hands-on tasks. Also, do remember this is a competition. Doubt clearing happens usually through 'live' discussion forums where teams ask questions and instructors clear their doubts.",
    },
  ]);
</script>
