<template>
  <div class="no-scrollbar h-screen">
    <!-- chatbot -->
    <!-- <div class="absolute bottom-24 right-32 z-20">
      <Chatrobo @click="toggleChatbox" class="hover:cursor-pointer" />
    </div> -->
    <section class="flex h-screen flex-col items-center justify-end bg-slate-800">
      <div
        data-aos="zoom-in-up"
        class="z-20 mb-16 bg-gradient-to-r from-slate-200/60 to-slate-200 to-50% bg-clip-text text-center text-3xl font-extrabold text-transparent [text-wrap:balance] md:text-4xl"
      >
        Revolutionize learning with e-Yantra Competitions
        <span
          class="inline-flex h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] flex-col overflow-hidden text-red-700 md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))]"
        >
          <ul class="animate-text-slide-3 block text-left leading-tight [&_li]:block">
            <li>eYRC</li>
            <li>eYIC</li>
            <li>eYSRC</li>
            <li aria-hidden="true">eYRC</li>
          </ul>
        </span>
      </div>
      <button
        type="button"
        @click="checkSignup"
        class="z-20 mb-12 inline-flex items-center rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Get Started
        <svg
          class="ms-2 h-3.5 w-3.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </section>
    <section>
      <div class="bg-gray-900 py-8 text-white">
        <div class="container mx-auto my-12 flex flex-col items-start md:my-24 md:flex-row">
          <div class="sticky mt-2 flex w-full flex-col px-8 md:top-36 md:mt-12 lg:w-1/3">
            <p class="tracking-loose ml-2 uppercase text-red-600">Timeline</p>
            <p class="mb-2 text-3xl leading-normal md:text-4xl md:leading-relaxed">eYantra 2024</p>
            <p class="mb-4 text-sm text-gray-50 md:text-base">
              Here’s your guide to the eYantra robotics competition 2024 process. Go through all the
              steps to know the exact process of the competition.
            </p>
            <a
              href="#"
              class="mr-auto rounded border border-red-600 bg-transparent px-4 py-2 text-red-600 shadow hover:border-transparent hover:bg-red-600 hover:text-white hover:shadow-lg"
            >
              Explore Now</a
            >
          </div>
          <div class="sticky ml-0 md:ml-12 lg:w-2/3">
            <div class="container mx-auto h-full w-full">
              <div class="wrap relative h-full overflow-hidden p-10">
                <div
                  class="border-2-2 border-yellow-555 absolute z-10 h-full border"
                  style="right: 50%; border: 2px solid #ff1100; border-radius: 1%"
                ></div>
                <div
                  class="border-2-2 border-yellow-555 absolute z-10 h-full border"
                  style="left: 50%; border: 2px solid #ff1100; border-radius: 1%"
                ></div>
                <div
                  class="left-timeline mb-8 flex w-full flex-row-reverse items-center justify-between"
                >
                  <div class="order-1 w-5/12"></div>
                  <div class="order-1 w-5/12 px-1 py-4 text-right">
                    <p class="mb-3 text-base text-red-600">1-6 May, 2024</p>
                    <h4 class="mb-3 text-lg font-bold md:text-2xl">Registration</h4>
                    <p class="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                      Pick your favourite event(s) and register in that event by filling the form
                      corresponding to that event. Its that easy :)
                    </p>
                  </div>
                </div>
                <div class="right-timeline mb-8 flex w-full items-center justify-between">
                  <div class="order-1 w-5/12"></div>
                  <div class="order-1 w-5/12 px-1 py-4 text-left">
                    <p class="mb-3 text-base text-red-600">6-9 May, 2024</p>
                    <h4 class="mb-3 text-lg font-bold md:text-2xl">Participation</h4>
                    <p class="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                      Participate online. The links for your registered events will be sent to you
                      via email and whatsapp groups. Use those links and show your talent.
                    </p>
                  </div>
                </div>
                <div
                  class="left-timeline mb-8 flex w-full flex-row-reverse items-center justify-between"
                >
                  <div class="order-1 w-5/12"></div>
                  <div class="order-1 w-5/12 px-1 py-4 text-right">
                    <p class="mb-3 text-base text-red-600">10 May, 2024</p>
                    <h4 class="mb-3 text-lg font-bold md:text-2xl">Result Declaration</h4>
                    <p class="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                      The ultimate genius will be revealed by our judging panel on 10th May, 2024
                      and the resukts will be announced on the whatsapp groups and will be mailed to
                      you.
                    </p>
                  </div>
                </div>

                <div class="right-timeline mb-8 flex w-full items-center justify-between">
                  <div class="order-1 w-5/12"></div>

                  <div class="order-1 w-5/12 px-1 py-4">
                    <p class="mb-3 text-base text-red-600">12 May, 2024</p>
                    <h4 class="mb-3 text-left text-lg font-bold md:text-2xl">Prize Distribution</h4>
                    <p class="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                      The winners will be contacted by our team for their addresses and the winning
                      goodies will be sent at their addresses.
                    </p>
                  </div>
                </div>
              </div>
              <img
                class="relative z-30 -mt-48 ml-8 w-48 md:-mt-48 lg:ml-36"
                src="/images/eyrcrocket.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="h-screen">
      <div
        data-aos="zoom-in-up"
        class="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <!-- <div
          data-aos="zoom-in-down"
          class="relative z-30 p-5 text-2xl text-white bg-gray-800 bg-opacity-50 rounded-xl"
        >
          eYantra Robotics Competition
        </div> -->
        <video autoplay loop muted class="absolute z-10 min-h-full w-auto min-w-full max-w-none">
          <source src="/videos/eyrc.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
    <section class="h-screen snap-start">
      <div class="relative flex h-screen items-center justify-center bg-gray-900">
        <div class="mx-auto grid max-w-4xl grid-cols-1 lg:max-w-5xl lg:grid-cols-2 lg:gap-x-20">
          <div
            class="relative col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 p-3 sm:row-start-2 sm:bg-none sm:p-0 lg:row-start-1"
          >
            <h1
              class="mt-1 text-lg font-semibold text-white sm:text-slate-900 dark:sm:text-white md:text-2xl"
            >
              Get all the components you need
            </h1>
            <p
              class="text-sm font-medium leading-4 text-white sm:text-slate-500 dark:sm:text-slate-400"
            >
              Entire Lab
            </p>
          </div>
          <div
            class="col-start-1 col-end-3 row-start-1 grid gap-4 sm:mb-6 sm:grid-cols-4 lg:col-start-2 lg:row-span-6 lg:row-end-6 lg:mb-0 lg:gap-6"
          >
            <img
              src="/images/lib1.png"
              alt=""
              class="h-60 w-full rounded-lg object-cover sm:col-span-2 sm:h-52 lg:col-span-full"
              loading="lazy"
            />
            <img
              src="/images/lib2.png"
              alt=""
              class="hidden h-52 w-full rounded-lg object-cover sm:col-span-2 sm:block md:col-span-1 lg:col-span-2 lg:row-start-2 lg:h-32"
              loading="lazy"
            />
            <img
              src="/images/lib3.png"
              alt=""
              class="hidden h-52 w-full rounded-lg object-cover md:block lg:col-span-2 lg:row-start-2 lg:h-32"
              loading="lazy"
            />
          </div>
          <dl
            class="row-start-2 mt-4 flex items-center text-xs font-medium sm:row-start-3 sm:mt-1 md:mt-2.5 lg:row-start-2"
          >
            <dt class="sr-only">Reviews</dt>
            <dd class="flex items-center text-indigo-600 dark:text-indigo-400">
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                class="mr-1 stroke-current dark:stroke-indigo-500"
              >
                <path
                  d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>4.89 <span class="font-normal text-slate-400">(128)</span></span>
            </dd>
            <dt class="sr-only">Location</dt>
            <dd class="flex items-center dark:sm:text-white">
              <svg
                width="2"
                height="2"
                aria-hidden="true"
                fill="currentColor"
                class="mx-3 text-slate-300"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-1 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              >
                <path
                  d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z"
                />
                <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              </svg>
              Straight to your college
            </dd>
          </dl>
          <div
            class="col-start-1 row-start-3 mt-4 self-center sm:col-start-2 sm:row-span-2 sm:row-start-2 sm:mt-0 lg:col-start-1 lg:row-start-3 lg:row-end-4 lg:mt-6"
          >
            <button
              type="button"
              class="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium leading-6 text-white"
            >
              Get Components
            </button>
          </div>
          <p
            class="col-start-1 mt-4 text-sm leading-6 dark:text-slate-400 sm:col-span-2 lg:col-span-1 lg:row-start-4 lg:mt-6"
          >
            Frustrated by remote classroom learning and lack of practical exposure?? We bring you
            one of India’s biggest Robotics Competitions - the e-Yantra Robotics Competition (eYRC)
            hosted by e-Yantra, IIT Bombay.
          </p>
        </div>
      </div>
    </section>
    <!-- <section class="h-screen snap-start">
      <div class="relative flex h-screen items-center justify-center bg-gray-900"></div>
    </section> -->
    <section class="body-font relative h-full text-gray-600">
      <div class="absolute inset-0 bg-gray-300">
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="map"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4e-Yantra+(e-Yantra)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          style=""
        ></iframe>
      </div>
      <div class="container mx-auto flex py-12 md:px-5">
        <div
          class="relative z-10 mt-20 flex w-3/5 flex-col rounded-xl shadow-md sm:ml-auto md:w-1/2 lg:w-1/3"
        >
          <InitForm />
        </div>
      </div>
    </section>

    <section class="relative z-20 overflow-hidden bg-gray-900 pb-8 pt-20 text-white">
      <FaqSec />
    </section>
    <!-- <section class="bg-gray-900">
      <p class="text-center font-semibold text-white">With 3,800+ colleges already enrolled</p>
      <div class="flex flex-wrap items-center justify-center gap-5">

      </div>
    </section> -->

    <section
      class="bg-white bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]"
    >
      <div class="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <a
          href="#"
          class="mb-7 inline-flex items-center justify-between rounded-full bg-blue-100 px-1 py-1 pe-4 text-sm text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
        >
          <span class="me-3 rounded-full bg-blue-600 px-4 py-1.5 text-xs text-white">New</span>
          <span class="text-sm font-medium">Drone in a box kit</span>
          <svg
            class="ms-2 h-2.5 w-2.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
        <h1
          class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
        >
          We invest in your potential
        </h1>
        <p
          class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:px-48 lg:text-xl"
        >
          Here at eYantra, we focus on fostering innovation and providing hands-on learning
          experiences in the field of robotics and embedded systems. Our mission is to empower
          students and professionals by offering comprehensive resources, cutting-edge technology,
          and a collaborative environment to develop practical skills and solve real-world problems.
          Through our initiatives such as competitions, workshops, and online courses, we aim to
          nurture creativity, enhance technical expertise, and contribute to the growth of a skilled
          workforce ready to tackle the challenges of the future.
        </p>
        <form class="mx-auto w-full max-w-md">
          <label
            for="default-email"
            class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email sign-up</label
          >
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 rtl:inset-x-0"
            >
              <svg
                class="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path
                  d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
                />
                <path
                  d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
                />
              </svg>
            </div>
            <input
              type="email"
              id="default-email"
              class="block w-full rounded-lg border border-gray-300 bg-white p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter your email here..."
              required
            />
            <button
              type="submit"
              class="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div
        class="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"
      ></div>
    </section>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "topnav",
  });
  // Access the plugin through the composable
  const { loggedIn, user, login } = useOidcAuth();
  const router = useRouter();

  const checkSignup = async () => {
    if (loggedIn.value) {
      console.log("user logged in");
      const response = await useAuthFetch("/backendapi/protected", {
        method: "POST",
      });
      if (response) {
        router.push("/");
      }
    } else {
      console.log("user not logged in");
      await login("keycloak");
    }
  };
</script>
