<script lang="ts" setup>
import { defineProps } from "vue";
import { initHapticFeedback } from "@telegram-apps/sdk";
import { useUserStore } from "@/stores/Store";
import axios from "axios";
const hapticFeedback = initHapticFeedback();
const userInfo = useUserStore();
import { applyResponseDataToStore } from "@/composables/storageApplier";

const props = defineProps<{
  gift: {
    _id: string;
    type: "coins" | "hourly_income" | "multiplier";
    value: number;
    title: string;
    photoUrl: string;
    status: "inactive" | "used";
    description: string;
  };
}>();

const claimBonus = async () => {
  try {
    const { authToken } = userInfo;

    if (!userInfo.user) {
      console.error("User information is not available");
      return;
    }

    const { userId } = userInfo.user;
    const { _id: bonusId, value, type } = props.gift;

    const response = await axios.post(
      "https://yamonton.space/gifts",
      {
        userId,
        bonusId,
        authToken,
        value,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("Response from server:", response.data);

    if (response.data) {
      hapticFeedback.notificationOccurred("success");
      applyResponseDataToStore(response.data);

      props.gift.status = "used";
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
    class="bg-components p-2 w-full relative h-fit flex flex-col items-center rounded-[25px]"
  >
    <div class="w-full rounded-[20px]">
      <img
        :src="props.gift.photoUrl"
        alt=""
        class="rounded-[20px] w-full object-cover h-[18vh]"
      />
    </div>
    <div class="flex flex-col mt-2 justify-between items-baseline w-full">
      <p class="text-xl truncate">
        {{ props.gift.title }}
      </p>
      <p v-if="props.gift.type === 'coins'" class="text-sm">
        +{{ props.gift.value }} $YAM
      </p>
      <p v-if="props.gift.type === 'hourly_income'" class="text-sm">
        +{{ props.gift.value }} $YAM per hour
      </p>
      <p v-if="props.gift.type === 'multiplier'" class="text-sm">
        x{{ props.gift.value }} $YAM
      </p>
    </div>
    <button
      v-if="props.gift.status === 'inactive'"
      @click="
        hapticFeedback.impactOccurred('soft');
        claimBonus();
      "
      class="mt-2 py-2 text-xl bg-textmain text-componentsadditional w-full rounded-[20px] active:bg-[#f5f5f5] transition-all"
    >
      Claim
    </button>
  </div>
</template>

<style scoped></style>
