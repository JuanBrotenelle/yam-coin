<script lang="ts" setup></script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-1"
  ></div>
  <div
    class="absolute top-0 left-0 w-full h-full bg-[#0C0C0C] opacity-70 z-[9998] flex flex-col items-center justify-center p-1"
  ></div>
</template>

<style scoped>
.main-window {
  animation: FadeInBottom 0.5s ease 0s 1 normal forwards;
}

.background-window {
  animation: Opacity 0.1s ease 0s 1 normal forwards;
}

@keyframes FadeInBottom {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes Opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
