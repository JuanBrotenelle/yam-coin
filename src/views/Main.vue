<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useScratchGame } from "@/composables/useScratchGame";
import HeaderMain from "../components/Header/HeaderMain.vue";
import PopupPrize from "../components/PopupPrize.vue";
import { useUserInfo } from "../stores/counter";
import { animateNumber } from "../composables/useAnimateNumber"; // Импорт функции

const userInfo = useUserInfo();
const usedBonuses = computed(() =>
  userInfo.bonuses.default.filter((bonus) => bonus.status === "inactive")
);
const PopupPrizeValue = ref(false);
const PopupPrizeFunction = () => {
  PopupPrizeValue.value = !PopupPrizeValue.value;
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
const balanceRef = ref(userInfo.userYams); // Создаем реф для анимации баланса

const { setup, cleanup } = useScratchGame(canvasRef, PopupPrizeFunction);

// Таймер
const timeRemaining = ref<{ hours: string; minutes: string; seconds: string }>({
  hours: "00",
  minutes: "00",
  seconds: "00",
});

const updateTimeRemaining = () => {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  const diff = nextMidnight.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timeRemaining.value = {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

onMounted(() => {
  setup();

  animateNumber(0, userInfo.userYams, 1000, (value: number) => {
    balanceRef.value = value; // Обновляем анимированное значение
  });

  updateTimeRemaining();
  const timer = setInterval(updateTimeRemaining, 1000);

  onUnmounted(() => {
    cleanup();
    clearInterval(timer);
  });
});

watch(
  () => userInfo.userYams,
  (newYams, oldYams) => {
    animateNumber(oldYams, newYams, 1000, (value: number) => {
      balanceRef.value = value;
    });
  }
);
</script>

<template>
  <PopupPrize
    v-if="PopupPrizeValue === true"
    :hide-popup="PopupPrizeFunction"
  />
  <div class="relative h-full">
    <HeaderMain />
    <p class="text-[2vh] text-center px-[10vw] mt-5 relative">Your Balance:</p>
    <p class="text-[8vh] text-center px-[10vw] mt-[-2vh] font-bold relative">
      {{ balanceRef.toFixed(3) }}
      <!-- Используем анимированное значение -->
    </p>
    <div
      v-if="usedBonuses.length !== 0"
      class="relative flex flex-col justify-center items-center bg-[#2B2B2B] rounded-[5.5rem] border-[#424242] h-[50vh] w-full border-8"
    >
      <canvas
        id="Scratch-area"
        ref="canvasRef"
        class="rounded-[5rem] absolute h-full w-full"
      >
        Your browser does not support the canvas element.
      </canvas>
      <p class="text-[10vh] bonus-text-selector">0.15</p>
    </div>
    <p v-if="usedBonuses.length !== 0" class="text-[3vh] text-center mt-5">
      Scratch. Left {{ usedBonuses.length }}/3
    </p>
    <div
      v-else
      class="text-center mt-5 flex flex-col items-center bg-[#242424] rounded-[25px] mt-5 p-10"
    >
      <svg
        width="150"
        height="150"
        viewBox="0 0 706 706"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M353 25C251.736 25 169.091 107.542 169.091 208.68V261.16H116.545C87.5141 261.16 64 284.645 64 313.64V628.52C64 657.515 87.5141 681 116.545 681H589.455C618.486 681 642 657.515 642 628.52V313.64C642 284.645 618.486 261.16 589.455 261.16H536.909V208.68C536.909 110.846 459.052 32.0472 362.339 26.8962C359.368 25.7009 356.203 25.0582 353 25ZM353 77.48C425.872 77.48 484.364 135.899 484.364 208.68V261.16H221.636V208.68C221.636 135.899 280.128 77.48 353 77.48Z"
          fill="white"
        />
      </svg>

      <div
        class="flex items-center space-x-2 bg-[#2B2B2B] rounded-[25px] mt-5 p-2"
      >
        <div class="text-[6vh] font-bold">
          {{ timeRemaining.hours }}
        </div>
        <p class="text-[6vh] font-bold">:</p>
        <div class="text-[6vh] font-bold">
          {{ timeRemaining.minutes }}
        </div>
        <p class="text-[6vh] font-bold">:</p>
        <div class="text-[6vh] font-bold">
          {{ timeRemaining.seconds }}
        </div>
      </div>
      <p class="text-[2vh] mt-5">Times remaining for next bonuses</p>
    </div>
  </div>
</template>

<style scoped></style>
