<script lang="ts" setup>
import { initHapticFeedback } from "@telegram-apps/sdk";
import { useUserStore } from "@/stores/Store";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { applyResponseDataToStore } from "@/composables/storageApplier";
import { animateNumber } from "@/composables/useAnimateNumber";

const userInfo = useUserStore();
const hapticFeedback = initHapticFeedback();

const objectCompare: {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
} = {
  "1": 250,
  "2": 750,
  "3": 1500,
  "4": 2500,
  "5": 3750,
  "6": 5250,
  "7": 8000,
  "8": 10000,
  "9": 12000,
  "10": 14250,
  "11": 18000,
  "12": 25000,
  "13": 30000,
  "14": 37000,
  "15": 50000,
};

const upgradeIncome = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/upgradeincome",
      {
        token: userInfo.authToken,
        userId: userInfo.user.userId,
      },
      {
        headers: {
          Authorization: userInfo.authToken,
        },
      }
    );
    applyResponseDataToStore(response.data);
    userInfo.modifyComboArray();
    hapticFeedback.notificationOccurred("success");
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};
const upgradeCombo = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/upgradecombo",
      {
        token: userInfo.authToken,
        userId: userInfo.user.userId,
      },
      {
        headers: {
          Authorization: userInfo.authToken,
        },
      }
    );
    applyResponseDataToStore(response.data);
    userInfo.modifyComboArray();
    hapticFeedback.notificationOccurred("success");
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};

const requestUpdateIncomeCost = async (): Promise<number> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/preupgradeincome",
      {
        token: userInfo.authToken,
        userId: userInfo.user.userId,
      },
      {
        headers: {
          Authorization: userInfo.authToken,
        },
      }
    );
    IncomeCost.value = response.data;
    return response.data;
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};
const requestUpdateComboCost = async (): Promise<number> => {
  if (userInfo.game.comboLevel >= 5) return 0;
  try {
    const response = await axios.post(
      "http://localhost:3000/preupgradecombo",
      {
        token: userInfo.authToken,
        userId: userInfo.user.userId,
      },
      {
        headers: {
          Authorization: userInfo.authToken,
        },
      }
    );
    ComboCost.value = response.data;
    return response.data;
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};

const IncomeCost = ref(0);
const ComboCost = ref(0);

function getLevel(xp: number) {
  let level = 0;
  if (xp >= 50000) {
    level = 15;
    return level;
  }
  for (let i in objectCompare) {
    if (xp < objectCompare[i as unknown as keyof typeof objectCompare]) {
      level = Number(i) - 1;
      break;
    }
  }
  return level;
}

function getProgressWidth(xp: number) {
  let level = getLevel(xp);
  if (0 <= level && level <= 15) {
    if (level === 0) {
      return (
        (xp / objectCompare[(level + 1) as keyof typeof objectCompare]) * 100 +
        "%"
      );
    } else if (level > 0 && level < 15) {
      return (
        ((xp - objectCompare[level as keyof typeof objectCompare]) /
          (objectCompare[(level + 1) as keyof typeof objectCompare] -
            objectCompare[level as keyof typeof objectCompare])) *
          100 +
        "%"
      );
    } else {
      return "100%";
    }
  } else if (level === 15) {
    return "100%";
  }
}

const animatedCoins = ref(
  parseFloat(userInfo.game.currentUserCoins.toFixed(3))
);

watch(
  () => userInfo.game.currentUserCoins,
  (newValue, oldValue) => {
    animateNumber(
      parseFloat(oldValue.toFixed(3)),
      parseFloat(newValue.toFixed(3)),
      500,
      (value) => {
        animatedCoins.value = parseFloat(value.toFixed(3));
      }
    );
  }
);

const animatedIncome = ref(userInfo.game.currentUserIncome);

watch(
  () => userInfo.game.currentUserIncome,
  (newValue, oldValue) => {
    animateNumber(
      parseFloat(oldValue.toFixed(3)),
      parseFloat(newValue.toFixed(3)),
      500,
      (value) => {
        animatedIncome.value = parseFloat(value.toFixed(3));
      }
    );
  }
);

onMounted(async () => {
  await requestUpdateIncomeCost();
  await requestUpdateComboCost();
});
</script>

<template>
  <div
    class="w-full rounded-br-[25px] rounded-bl-[25px] p-5 bg-components flex flex-row items-center justify-between"
  >
    <button
      @click="
        hapticFeedback.selectionChanged();
        $router.go(-1);
      "
      class="text-textadditional flex flex-row items-center gap-1"
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.16646 7.91669L2.60666 8.47648L2.04688 7.91669L2.60666 7.35689L3.16646 7.91669ZM16.6248 14.25C16.6248 14.6873 16.2704 15.0417 15.8331 15.0417C15.3959 15.0417 15.0415 14.6873 15.0415 14.25H16.6248ZM6.565 12.4348L2.60666 8.47648L3.72625 7.35689L7.68459 11.3152L6.565 12.4348ZM2.60666 7.35689L6.565 3.39856L7.68459 4.51815L3.72625 8.47648L2.60666 7.35689ZM3.16646 7.12502H11.0831V8.70835H3.16646V7.12502ZM16.6248 12.6667V14.25H15.0415V12.6667H16.6248ZM11.0831 7.12502C14.1437 7.12502 16.6248 9.6061 16.6248 12.6667H15.0415C15.0415 10.4806 13.2692 8.70835 11.0831 8.70835V7.12502Z"
          fill="#2A2A2A"
        />
      </svg>
      Back
    </button>
    <div class="flex flex-row gap-2">
      <div class="flex flex-col items-center justify-center">
        <p class="text-xs text-textadditional">Your Balance:</p>
        <p class="bg-componentsadditional px-4 rounded-[8px]">
          {{ animatedCoins.toFixed(3) }}
        </p>
      </div>
      <div class="flex flex-col items-center justify-center">
        <p class="text-xs text-textadditional">Days Streak:</p>
        <p class="bg-componentsadditional px-4 rounded-[8px]">
          {{ userInfo.daysStreak }}
        </p>
      </div>
    </div>
  </div>
  <div
    class="w-full bg-components h-[70vh] flex flex-col items-center overflow-visible justify-start relative p-5 mt-[20vh]"
  >
    <div
      class="absolute top-[-10vh] shadow-xl w-[20vh] h-[20vh] rounded-[20px]"
    >
      <img
        :src="userInfo.user.photoUrl ? userInfo.user.photoUrl : '/NoAvatar.png'"
        class="h-full object-cover rounded-[20px] border-4 border-components"
      />
    </div>
    <div class="mt-[8vh] w-full flex flex-col items-center justify-center">
      <div
        v-if="getLevel(userInfo.game.accountExperience) <= 14"
        class="w-full flex flex-row items-center justify-between"
      >
        <p>
          Lvl.
          {{ getLevel(userInfo.game.accountExperience) }}
        </p>
        <p>
          Lvl.
          {{ getLevel(userInfo.game.accountExperience) + 1 }}
        </p>
      </div>
      <div v-else class="w-full flex flex-row items-center justify-center">
        <p>You reached max. level</p>
      </div>
      <div class="w-full rounded-[20px] mt-2 bg-componentsadditional h-5">
        <div
          class="h-full bg-textmain transition-all"
          :style="{
            width: getProgressWidth(userInfo.game.accountExperience),
          }"
        ></div>
      </div>
    </div>
    <div
      class="mt-5 flex flex-row w-full h-[17vh] gap-5 items-center justify-between"
    >
      <div
        class="flex flex-col items-center h-full justify-between w-1/2 bg-componentsadditional rounded-[20px]"
      >
        <div class="flex flex-col items-center justify-center">
          <p class="text-xs text-textadditional mt-2">Your Passive Income</p>
          <p
            v-if="IncomeCost > userInfo.game.currentUserCoins"
            class="text-xs text-textadditional"
          >
            Upgrade for {{ IncomeCost }} $YAM
          </p>
        </div>
        <p class="text-2xl text-textmain">
          {{ animatedIncome.toFixed(3) }}
        </p>
        <button
          @click="
            hapticFeedback.selectionChanged();
            upgradeIncome();
            requestUpdateIncomeCost();
          "
          :disabled="IncomeCost > userInfo.game.currentUserCoins"
          class="w-full py-1 text-lg bg-textmain text-textadditional disabled:bg-textadditional disabled:text-componentsadditional"
        >
          Upgrade
        </button>
      </div>
      <div
        class="flex flex-col items-center h-full justify-between w-1/2 bg-componentsadditional rounded-[20px]"
      >
        <p
          v-if="userInfo.game.comboLevel === 5"
          class="text-xs text-textadditional mt-2"
        >
          You reached max. level
        </p>
        <div
          v-if="userInfo.game.comboLevel < 5"
          class="flex flex-col items-center justify-center"
        >
          <p class="text-xs text-textadditional mt-2">Your Combo Level</p>
          <p
            v-if="ComboCost > userInfo.game.currentUserCoins"
            class="text-xs text-textadditional"
          >
            Upgrade for {{ ComboCost }} $YAM
          </p>
        </div>
        <p class="text-2xl text-textmain">
          {{ userInfo.game.comboLevel }}
        </p>
        <button
          v-if="userInfo.game.comboLevel < 5"
          @click="
            hapticFeedback.selectionChanged();
            upgradeCombo();
            requestUpdateComboCost();
          "
          :disabled="ComboCost > userInfo.game.currentUserCoins"
          class="w-full py-1 text-lg bg-textmain text-textadditional disabled:bg-textadditional disabled:text-componentsadditional"
        >
          Upgrade
        </button>
        <div v-else class="p-3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
