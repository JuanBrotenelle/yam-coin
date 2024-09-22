<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserInfo } from "../stores/counter";
import { initHapticFeedback } from "@telegram-apps/sdk";
import axios from "axios";

const hapticFeedback = initHapticFeedback();

hapticFeedback.notificationOccurred("warning");

const inactiveBonuses = computed(() =>
  userInfo.bonuses.default.filter((bonus) => bonus.status === "inactive")
);

const props = defineProps({
  hidePopup: Function,
});

const userInfo = useUserInfo();

const bonus = ref(inactiveBonuses.value[0]);

const claimBonus = async () => {
  try {
    const { userId, token } = userInfo;
    const { _id: bonusId, value, type } = bonus.value;

    let url = "";
    switch (type) {
      case "coins":
        url = "https://yamonton.space/coins";
        break;
      case "hourly_income":
        url = "https://yamonton.space/income";
        break;
      case "multiplier":
        url = "https://yamonton.space/multiplier";
        break;
      default:
        throw new Error("Неизвестный тип бонуса");
    }

    const response = await axios.post(
      url,
      {
        userId,
        bonusId,
        token,
        value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response from server:", response.data);

    if (response.data) {
      userInfo.$patch({
        userYams: response.data.coins,
        userIncome: response.data.hourlyIncome,
        token: response.data.token,
        bonuses: response.data.bonuses,
      });

      // Убираем попап
      props.hidePopup?.();
      console.log(userInfo.bonuses);
    } else {
      console.error("Failed to claim bonus: No data in response");
    }
  } catch (error) {
    console.error("Error claiming bonus:", error);
  }
};
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-1"
  >
    <div
      class="w-full bg-[#202020] h-[70vh] rounded-[25px] z-[9999] py-8 px-5 flex flex-col items-center justify-between main-window"
    >
      <div class="w-full">
        <div
          class="bg-[#222222] w-full h-[35vh] rounded-[25px] flex flex-col items-center justify-center"
        >
          <p
            v-if="bonus.type === 'coins' || bonus.type === 'hourly_income'"
            class="text-[5vh]"
          >
            {{ bonus.value.toFixed(3) }}
          </p>
          <p v-else class="text-[5vh]">💎</p>
        </div>
        <p class="text-center text-[3vh] mt-5">Congratulations! 🎉🎊</p>
        <p v-if="bonus.type === 'coins'" class="text-center text-[2vh]">
          You received {{ bonus.value.toFixed(3) }} $YAM
        </p>
        <p v-if="bonus.type === 'hourly_income'" class="text-center text-[2vh]">
          You received {{ bonus.value.toFixed(3) }} $YAM per hour
        </p>
        <p v-if="bonus.type === 'multiplier'" class="text-center text-[2vh]">
          You $YAMS will be multiplied x{{ bonus.value.toFixed(3) }}
        </p>
      </div>
      <button
        @click="claimBonus"
        class="text-[3vh] py-5 bg-[#ffffff] text-[#202020] w-full rounded-[25px] mt-10 active:bg-[#B0B0B0] transition-all"
      >
        Claim
      </button>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full bg-[#0C0C0C] opacity-70 z-[9998] flex flex-col items-center justify-center p-1"
    ></div>
  </div>
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
