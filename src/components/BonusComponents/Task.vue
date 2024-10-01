<script lang="ts" setup>
import { defineProps } from "vue";
import { postEvent } from "@telegram-apps/sdk";
import { initHapticFeedback } from "@telegram-apps/sdk";
import { useUserStore } from "@/stores/Store";
import { applyResponseDataToStore } from "@/composables/storageApplier";
import axios from "axios";

const userInfo = useUserStore();
const hapticFeedback = initHapticFeedback();

const props = defineProps<{
  task: {
    _id: string;
    title: string;
    photoUrl: string;
    value: number;
    status: "inactive" | "used";
    url: string;
  };
}>();

const claimTaskBonus = async () => {
  try {
    const { authToken } = userInfo;

    if (!userInfo.user) {
      console.error("User information is not available");
      return;
    }

    const { userId } = userInfo.user;
    const { _id: bonusId, value } = props.task;

    const response = await axios.post(
      "https://yamonton.space/tasks",
      {
        userId,
        bonusId,
        authToken,
        value,
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

      props.task.status = "used";
    } else {
      console.error("Failed to claim task bonus: No data in response");
    }
  } catch (error) {
    console.error("Error claiming task bonus:", error);
  }
};
</script>

<template>
  <div
    class="w-full bg-components p-5 flex flex-row justify-between items-center rounded-[25px]"
  >
    <div class="flex flex-row gap-2">
      <img :src="props.task.photoUrl" class="w-[6vh]" alt="" />
      <div>
        <p>{{ props.task.title }}</p>
        <p class="text-textadditional text-sm">
          You'll receive {{ props.task.value }} $YAM
        </p>
      </div>
    </div>
    <div>
      <button
        v-if="props.task.status === 'inactive'"
        @click="
          postEvent('web_app_open_link', {
            url: props.task.url,
            try_instant_view: true,
          });
          claimTaskBonus();
        "
        class="w-20 flex flex-row items-center justify-end"
      >
        <svg
          class="mr-3"
          width="17"
          height="28"
          viewBox="0 0 17 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.94054 0.93934C3.35476 0.353553 2.40501 0.353553 1.81922 0.93934C1.23344 1.52513 1.23344 2.47487 1.81922 3.06066L3.94054 0.93934ZM1.81922 3.06066L13.8192 15.0607L15.9405 12.9393L3.94054 0.93934L1.81922 3.06066Z"
            fill="#232323"
          />
          <path
            d="M0.93934 25C0.353553 25.5858 0.353553 26.5355 0.93934 27.1213C1.52513 27.7071 2.47487 27.7071 3.06066 27.1213L0.93934 25ZM3.06066 27.1213L16.0607 14.1213L13.9393 12L0.93934 25L3.06066 27.1213Z"
            fill="#232323"
          />
        </svg>
      </button>
      <div v-else>
        <svg
          width="35"
          height="25"
          viewBox="0 0 35 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.0898 3.03065C34.6591 2.42875 34.6326 1.47937 34.0307 0.910158C33.4287 0.340944 32.4794 0.367444 31.9102 0.969347L34.0898 3.03065ZM31.9102 0.969347L12.1507 21.8636L14.3304 23.9249L34.0898 3.03065L31.9102 0.969347Z"
            fill="#232323"
          />
          <path
            d="M2.78312 9.33814C2.17567 8.77485 1.2266 8.81064 0.663304 9.41808C0.10001 10.0255 0.135803 10.9746 0.743249 11.5379L2.78312 9.33814ZM0.743249 11.5379L14.2239 24.0387L16.2638 21.839L2.78312 9.33814L0.743249 11.5379Z"
            fill="#232323"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
