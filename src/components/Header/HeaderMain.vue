<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useUserInfo } from "../../stores/counter";
import { animateNumber } from "../../composables/useAnimateNumber";

const userInfo = useUserInfo();
const route = useRoute();

const totalCoins = ref(0);
const balanceRef = ref(userInfo.userYams);
const incomeRef = ref(userInfo.userIncome);

const fetchTotalCoins = async () => {
  try {
    const response = await axios.get("https://yamonton.space/totalcoins");
    totalCoins.value = response.data.getTotalCoins;
  } catch (error) {
    console.error("Ошибка при получении totalCoins:", error);
  }
};

const animateTotalCoins = (newTotalCoins: number) => {
  animateNumber(totalCoins.value, newTotalCoins, 1000, (value) => {
    totalCoins.value = value;
  });
};

const animateUserYams = (newYams: number) => {
  animateNumber(userInfo.userYams, newYams, 1000, (value) => {
    userInfo.userYams = value;
  });
};

const animateUserIncome = (newIncome: number) => {
  animateNumber(userInfo.userIncome, newIncome, 1000, (value) => {
    userInfo.userIncome = value;
  });
};

const formattedTotalCoins = computed(() =>
  totalCoins.value >= 10000
    ? totalCoins.value.toFixed(1)
    : totalCoins.value.toFixed(3)
);

const formattedUserYams = computed(() =>
  userInfo.userYams >= 10000
    ? userInfo.userYams.toFixed(1)
    : userInfo.userYams.toFixed(3)
);

const formattedUserIncome = computed(() =>
  userInfo.userIncome >= 10000
    ? userInfo.userIncome.toFixed(1)
    : userInfo.userIncome.toFixed(3)
);

const isActive = (path: string) => {
  return route.path === path;
};

let intervalId: number | undefined;

onMounted(() => {
  fetchTotalCoins();

  intervalId = window.setInterval(() => {
    fetchTotalCoins();
  }, 60000);

  animateTotalCoins(totalCoins.value);
  animateUserYams(userInfo.userYams);
  animateUserIncome(userInfo.userIncome);
});

watch(
  () => totalCoins.value,
  (newTotalCoins, oldTotalCoins) => {
    animateTotalCoins(newTotalCoins);
  }
);

watch(
  () => userInfo.userYams,
  (newYams, oldYams) => {
    animateUserYams(newYams);
  }
);

watch(
  () => userInfo.userIncome,
  (newIncome, oldIncome) => {
    animateUserIncome(newIncome);
  }
);

onBeforeUnmount(() => {
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
          {{ formattedTotalCoins }}
        </p>
      </div>
    </div>

    <div v-if="isActive('/main')" class="flex flex-col items-center w-[35%]">
      <p class="text-[Goldman] text-[1.5vh]">Passive income:</p>
      <div
        class="flex flex-row items-center justify-center bg-[#2B2B2B] w-full rounded-full"
      >
        <img src="/Yam.png" alt="" class="w-[2.5vh]" />
        <p class="text-[Goldman] text-[2vh]">
          {{ formattedUserIncome }}
        </p>
      </div>
    </div>

    <div v-else class="flex flex-col items-center w-[35%]">
      <p class="text-[Goldman] text-[1.5vh]">Your $YAM:</p>
      <div
        class="flex flex-row items-center justify-center bg-[#2B2B2B] w-full rounded-full"
      >
        <img src="/Yam.png" alt="" class="w-[2.5vh]" />
        <p class="text-[Goldman] text-[2vh]">
          {{ formattedUserYams }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
