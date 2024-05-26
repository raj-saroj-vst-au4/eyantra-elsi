<template>
  <div id="starter" class="relative z-20 mt-24 items-center text-center">
    <span class="text-4xl font-extrabold"> Welcome to Lab Inauguration </span>
    <img
      id="bot"
      class="mx-auto my-10 h-auto max-w-lg"
      src="/images/lab.png"
      alt="image description"
    />
  </div>
  <div id="scene" :class="{ expand: isExpanded }">
    <div id="curtain" :class="{ open: isOpen, close: isClosed }">
      <h1>TADA!</h1>
      <div class="ground"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
  <SelectorNav :showTime="showTime" :closeTime="closeTime" />
</template>

<script setup>
  definePageMeta({
    layout: "bottomnav",
  });
  const isExpanded = ref(false);
  const isOpen = ref(false);
  const isClosed = ref(false);
  const nuxtApp = useNuxtApp();

  const showTime = () => {
    if (!isExpanded.value) {
      isOpen.value = true;
      isClosed.value = false;
      isExpanded.value = true;

      setTimeout(() => {
        let starter = document.getElementById("starter");
        starter.classList.add("fade-out");
        starter.style.display = "none";
      }, 2000);
    } else {
      makeItRain();
    }
  };
  const closeTime = () => {
    if (isExpanded.value) {
      isClosed.value = true;
      let starter = document.getElementById("starter");
      isOpen.value = false;

      setTimeout(() => {
        starter.classList.remove("fade-out");
        starter.style.display = "block";
        isExpanded.value = false;
      }, 3900);
    }
  };

  function makeItRain() {
    const end = Date.now() + 2 * 1000;
    const colors = ["#bb0000", "#ffffff"];

    function frame() {
      nuxtApp.$confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      nuxtApp.$confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }

    frame();
  }
</script>

<style scoped>
  #scene {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1200px;
    height: 600px;
    overflow: hidden;
    margin-top: -300px;
    margin-left: -600px;
    background-color: rgb(0, 0, 0);
    box-shadow: 0 0 0 2px white inset;
  }
  #curtain {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  #curtain .left,
  #curtain .right {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    filter: brightness(180%);
    background-image: url("/images/curtain.svg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  #curtain .left {
    left: 0;
    transform-origin: top right;
  }
  #curtain .right {
    left: 50%;
    transform-origin: top left;
  }

  .ground {
    position: absolute;
    left: 50%;
    top: 133%;
    width: 10000px;
    height: 10000px;
    margin-left: -5000px;
    border-radius: 100%;
    box-shadow: 0 0 100px 100px gray;
  }

  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    width: 500px;
    height: 150px;
    margin-top: -90px;
    margin-left: -250px;
    text-align: center;
    font-family: "Open Sans", sans-serif;
    font-size: 10em;
    color: white;
    transform: scale(0.75);
    opacity: 0;
  }

  /* Opening animations */
  #scene.expand {
    width: 140%;
    left: -20%;
    margin-left: 0;
    background-color: rgb(32, 32, 32);
    box-shadow: 0 0 0 0 white inset;
    animation-fill-mode: forwards;
    animation-name: expand-scene-horizontally, expand-scene-vertically;
    animation-duration: 2.5s, 1.5s;
    animation-timing-function: ease-in-out, ease-in-out;
    animation-delay: 0s, 2.5s;
    animation-iteration-count: 1, 1;
    animation-direction: normal, normal;
  }

  #curtain.open .left,
  #curtain.open .right {
    filter: brightness(100%);
  }
  #curtain.open .left {
    animation-fill-mode: forwards;
    animation-name: curtain-opening, left-curtain-opening;
    animation-duration: 2s, 4s;
    animation-timing-function: ease-in-out, ease-in-out;
    animation-delay: 0s, 0s;
    animation-iteration-count: 1, 1;
    animation-direction: normal, normal;
  }
  #curtain.open .right {
    animation-fill-mode: forwards;
    animation-name: curtain-opening, right-curtain-opening;
    animation-duration: 2s, 4s;
    animation-timing-function: ease-in-out, ease-in-out;
    animation-delay: 0s, 0s;
    animation-iteration-count: 1, 1;
    animation-direction: normal, normal;
  }

  #scene.expand .ground {
    animation-fill-mode: forwards;
    animation-name: ground-rising;
    animation-duration: 6s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
  }

  #scene.expand h1 {
    animation-fill-mode: forwards;
    animation-name: text-zoom, text-fade-in, text-glowing;
    animation-duration: 5s, 1s, 1s;
    animation-timing-function: ease-out, ease-in-out, ease-in-out;
    animation-delay: 3s, 3s, 0s;
    animation-iteration-count: 1, 1, infinite;
    animation-direction: normal, normal, alternate;
  }

  .fade-out {
    animation-fill-mode: forwards;
    animation-name: fade-out;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
  }

  /* Animations */
  @keyframes expand-scene-horizontally {
    from {
      width: 1200px;
      left: 50%;
      margin-left: -600px;
      background-color: rgb(0, 0, 0);
      box-shadow: 0 0 0 2px white inset;
    }
    to {
      width: 140%;
      left: -20%;
      margin-left: 0;
      background-color: rgb(32, 32, 32);
      box-shadow: 0 0 0 0 white inset;
    }
  }

  @keyframes expand-scene-vertically {
    from {
      top: 50%;
      height: 600px;
      margin-top: -300px;
    }
    to {
      top: 0;
      height: 100%;
      margin-top: 0;
    }
  }

  @keyframes curtain-opening {
    from {
      filter: brightness(180%);
    }
    to {
      filter: brightness(100%);
    }
  }

  @keyframes left-curtain-opening {
    from {
      transform: translate(0) rotate(0) scale(1, 1);
    }
    to {
      transform: translate(-100%) rotate(20deg) scale(0, 2);
    }
  }

  @keyframes right-curtain-opening {
    from {
      transform: translate(0) rotate(0) scale(1, 1);
    }
    to {
      transform: translate(100%) rotate(-20deg) scale(0, 2);
    }
  }

  @keyframes left-curtain-closing {
    from {
      transform: translate(-100%) rotate(20deg) scale(0, 2);
    }
    to {
      transform: translate(0) rotate(0) scale(1, 1);
    }
  }

  @keyframes right-curtain-closing {
    from {
      transform: translate(100%) rotate(-20deg) scale(0, 2);
    }
    to {
      transform: translate(0) rotate(0) scale(1, 1);
    }
  }

  #curtain.close .left {
    animation: left-curtain-closing 4s ease-in-out forwards;
  }

  #curtain.close .right {
    animation: right-curtain-closing 4s ease-in-out forwards;
  }

  @keyframes ground-rising {
    from {
      top: 133%;
    }
    to {
      top: 105%;
    }
  }

  @keyframes text-zoom {
    from {
      transform: scale(0.75);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes text-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes text-glowing {
    from {
      text-shadow: 0 0 10px white;
    }
    to {
      text-shadow:
        0 0 10px white,
        0 0 20px white,
        0 0 30px dodgerblue;
    }
  }

  @keyframes fade-out {
    from {
      color: black;
      opacity: 1;
    }
    to {
      color: white;
      opacity: 0;
    }
  }
</style>
