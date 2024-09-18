<script lang="ts" setup>
import { defineProps } from "vue";
import { initHapticFeedback } from "@telegram-apps/sdk";
import { useUserInfo } from "../../stores/counter";
import axios from "axios";
const hapticFeedback = initHapticFeedback();
const userInfo = useUserInfo();

const props = defineProps<{
  gift: {
    _id: string;
    type: "coins" | "hourly_income" | "multiplier";
    value: number;
    title: string;
    photoUrl: string;
    status: "inactive" | "used";
  };
}>();

const claimBonus = async () => {
  try {
    // Подготовка данных для запроса
    const { userId, token } = userInfo;
    const { _id: bonusId, value, type } = props.gift; // Обращение через props.gift

    // Отправляем запрос на сервер
    const response = await axios.post("https://yamonton.space/gifts", {
      userId,
      bonusId,
      token,
      value,
      type, // Добавляем тип бонуса в запрос
    });

    // Логирование ответа для отладки
    console.log("Response from server:", response.data);

    if (response.data) {
      // Обновляем состояние бонусов в Pinia
      userInfo.$patch({
        userYams: response.data.coins,
        userIncome: response.data.hourlyIncome,
        token: response.data.token,
        bonuses: response.data.bonuses,
      });
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
    class="bg-[#2B2B2B] p-2 w-full relative h-fit flex flex-col items-center rounded-[25px]"
  >
    <div class="w-full rounded-[20px]">
      <img
        :src="props.gift.photoUrl"
        alt=""
        class="rounded-[20px] w-full object-cover h-[18vh]"
      />
    </div>
    <div class="flex flex-col mt-2 justify-between items-baseline w-full">
      <p class="text-[2vh] truncate">
        {{ props.gift.title }}
      </p>
      <p v-if="props.gift.type === 'coins'" class="text-[1.5vh]">
        +{{ props.gift.value }} $YAM
      </p>
      <p v-if="props.gift.type === 'hourly_income'" class="text-[1.5vh]">
        +{{ props.gift.value }} $YAM per hour
      </p>
      <p v-if="props.gift.type === 'multiplier'" class="text-[1.5vh]">
        x{{ props.gift.value }} $YAM
      </p>
    </div>
    <button
      v-if="props.gift.status === 'inactive'"
      @click="
        hapticFeedback.impactOccurred('soft');
        claimBonus();
      "
      class="mt-2 py-2 text-[2vh] bg-[#ffffff] text-[#222222] w-full rounded-[20px] active:bg-[#f5f5f5] transition-all"
    >
      Claim
    </button>
  </div>
</template>

<style scoped></style>
