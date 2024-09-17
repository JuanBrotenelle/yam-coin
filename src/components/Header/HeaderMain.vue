<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useUserInfo } from "../../stores/counter";
import { animateNumber } from "../../composables/useAnimateNumber";

const userInfo = useUserInfo();
const route = useRoute();

// Состояние для хранения totalCoins
const totalCoins = ref(0);
const incomeRef = ref(userInfo.userIncome);
const balanceRef = ref(userInfo.userYams);

// Функция для получения данных с сервера
const fetchTotalCoins = async () => {
  try {
    const response = await axios.get("http://localhost:3000/totalcoins");
    totalCoins.value = response.data.getTotalCoins;
  } catch (error) {
    console.error("Ошибка при получении totalCoins:", error);
  }
};

const isActive = (path: string) => route.path === path;

let intervalId: number | undefined;

onMounted(() => {
  // Первый запрос при инициализации компонента
  fetchTotalCoins();

  // Устанавливаем интервал для выполнения запросов каждую минуту
  intervalId = window.setInterval(() => {
    fetchTotalCoins();
  }, 60000);

  animateNumber(0, totalCoins.value, 1000, (value: number) => {
    balanceRef.value = value; // Обновляем анимированное значение
  });
  animateNumber(0, userInfo.userYams, 1000, (value: number) => {
    balanceRef.value = value; // Обновляем анимированное значение
  });
  animateNumber(0, userInfo.userIncome, 1000, (value: number) => {
    balanceRef.value = value; // Обновляем анимированное значение
  });
});

watch(
  () => totalCoins.value,
  (newYams, oldYams) => {
    animateNumber(oldYams, newYams, 1000, (value: number) => {
      balanceRef.value = value;
    });
  }
);

onBeforeUnmount(() => {
  // Очищаем интервал при разрушении компонента
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col items-center w-[35%]">
      <p class="text-[Goldman] text-[1.5vh]">Total $YAM:</p>
      <div
        class="flex flex-row items-center justify-center bg-[#2B2B2B] w-full rounded-full"
      >
        <img src="/Yam.png" alt="" class="w-[2.5vh]" />
        <p class="text-[Goldman] text-[2vh]">
          {{
            balanceRef >= 10000 ? totalCoins.toFixed(1) : totalCoins.toFixed(3)
          }}
        </p>
      </div>
    </div>
    <div v-if="!isActive('/')" class="flex flex-col items-center w-[35%]">
      <p class="text-[Goldman] text-[1.5vh]">Your $YAM:</p>
      <div
        class="flex flex-row items-center justify-center bg-[#2B2B2B] w-full rounded-full"
      >
        <img src="/Yam.png" alt="" class="w-[2.5vh]" />
        <p class="text-[Goldman] text-[2vh]">
          {{
            userInfo.userYams >= 10000
              ? userInfo.userYams.toFixed(1)
              : userInfo.userYams.toFixed(3)
          }}
        </p>
      </div>
    </div>
    <div v-if="isActive('/')" class="flex flex-col items-center w-[35%]">
      <p class="text-[Goldman] text-[1.5vh]">Passive income:</p>
      <div
        class="flex flex-row items-center justify-center bg-[#2B2B2B] w-full rounded-full"
      >
        <img src="/Yam.png" alt="" class="w-[2.5vh]" />
        <p class="text-[Goldman] text-[2vh]">
          {{
            userInfo.userIncome >= 10000
              ? userInfo.userIncome.toFixed(1)
              : userInfo.userIncome.toFixed(3)
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
