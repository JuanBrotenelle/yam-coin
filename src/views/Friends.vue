<script setup lang="ts">
import { initUtils, initHapticFeedback } from "@telegram-apps/sdk";
import Friend from "../components/Friends/Friend.vue";
const hapticFeedback = initHapticFeedback();
import { useUserStore } from "@/stores/Store";

const userStore = useUserStore();

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

const message = `🔥 Join Yet Another Memecoin! 🔥
This crypto project fairly distributes airdrops to all participants! It's all up to your luck 🎯. Scratch every day to earn more bonuses 🎁!

👥 Invite friends and earn more!
Invite a friend with Telegram Premium and receive passive income 💸. The more friends you invite, the more bonuses you get! 💎

Join now and start right away! 🚀`;

const utils = initUtils();
const handleClick = () => {
  const url = `https://t.me/olinalertbot/yamacointest?startapp=${userStore.user.referalLink}`;

  // Проверка на наличие Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(
      () => {
        console.log("Ссылка скопирована в буфер обмена");
        hapticFeedback.impactOccurred("soft");
      },
      (err) => {
        console.error("Ошибка при копировании ссылки:", err);
      }
    );
  } else {
    console.warn("Clipboard API не поддерживается");
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      hapticFeedback.impactOccurred("soft");
    } catch (err) {
      console.error("Ошибка при копировании ссылки:", err);
    }
    document.body.removeChild(textarea);
  }
};
</script>

<template>
  <div class="w-full p-2">
    <div
      class="w-full h-[25vh] table-top relative px-10 flex flex-row justify-between items-end"
    >
      <div
        class="top-3 h-2/4 w-1/4 bg-components rounded-tl-[20px] overflow-visible rounded-tr-[20px] relative flex flex-col items-center justify-center"
      >
        <p
          class="absolute top-[-3vh] left-0 w-full flex justify-center text-textmain"
        >
          {{ userStore.referals[2] ? userStore.referals[2].firstName : "" }}
        </p>
        <p class="text-xl font-bold text-textadditional">#3</p>
        <p v-if="userStore.referals[2]" class="text-xs text-textadditional">
          Lvl. {{ getLevel(userStore.referals[2].accountExperience) }}
        </p>
      </div>
      <div
        class="top-1 h-4/5 w-1/4 bg-components rounded-tl-[20px] relative overflow-visible rounded-tr-[20px] flex flex-col items-center justify-center"
      >
        <p
          class="absolute top-[-3vh] left-0 w-full flex justify-center text-textmain"
        >
          {{ userStore.referals[0].firstName }}
        </p>
        <p class="text-xl font-bold text-textadditional">#1</p>
        <p class="text-xs text-textadditional">
          Lvl. {{ getLevel(userStore.referals[0].accountExperience) }}
        </p>
      </div>
      <div
        class="top-2 h-3/5 w-1/4 bg-components rounded-tl-[20px] relative overflow-visible rounded-tr-[20px] flex flex-col items-center justify-center"
      >
        <p
          class="absolute top-[-3vh] left-0 w-full flex justify-center text-textmain"
        >
          {{ userStore.referals[1] ? userStore.referals[1].firstName : "" }}
        </p>
        <p class="text-xl font-bold text-textadditional">#2</p>
        <p v-if="userStore.referals[1]" class="text-xs text-textadditional">
          Lvl. {{ getLevel(userStore.referals[1].accountExperience) }}
        </p>
      </div>
    </div>
    <div
      class="w-full bg-components flex flex-row items-center justify-between p-4 rounded-[25px] mt-3"
    >
      <p class="text-sm w-full">
        Get to +0.050 $YAM for each invited friend with Telegram Premium
      </p>
    </div>
  </div>
  <div
    class="w-full overflow-hidden fixed bottom-[13vh] h-[7vh] left-0 px-4 mt-2 flex flex-row items-center pointer-events-auto z-[99999] buttons-invite gap-2"
  >
    <button
      class="text-lg bg-textmain text-textadditional h-full w-full rounded-[20px] active:bg-[#f5f5f5] transition-all"
      @click="
        utils.shareURL(
          `https://t.me/olinalertbot/yamacointest?startapp=${userStore.user.referalLink}`,
          message
        );
        hapticFeedback.impactOccurred('soft');
      "
    >
      Invite
    </button>
    <button
      class="text-[3vh] bg-textmain text-textadditional h-full px-5 rounded-[20px] active:bg-[#f5f5f5] transition-all"
      @click="handleClick()"
    >
      <svg
        width="16"
        height="20"
        viewBox="1 0 40 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 0H4C1.79 0 0 1.79 0 4V32H4V4H28V0ZM34 8H12C9.79 8 8 9.79 8 12V40C8 42.21 9.79 44 12 44H34C36.21 44 38 42.21 38 40V12C38 9.79 36.21 8 34 8ZM34 40H12V12H34V40Z"
          fill="#222222"
        />
      </svg>
    </button>
  </div>
  <div class="mt-2 px-2 flex flex-col gap-2 relative">
    <Friend
      v-if="userStore.referals.length > 3"
      v-for="(referal, index) in userStore.referals"
      :key="referal._id"
      :friend="referal"
      :index="index"
    />
    <p
      v-if="userStore.referals.length === 0"
      class="h-full flex items-center justify-center bg-[#2B2B2B] text-[2vh] rounded-[25px]"
    >
      Nothing was found
    </p>
  </div>
</template>

<style scoped>
.table-top::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #161616;
}

.top-1 {
  animation: SlideIn 1.2s ease 0s 1 normal forwards;
}
.top-2 {
  animation: SlideIn 1s ease 0s 1 normal forwards;
}
.top-3 {
  animation: SlideIn 0.5s ease 0s 1 normal forwards;
}

.buttons-invite {
  animation: Opacity 0.8s ease 0s 1 normal forwards;
}

@keyframes SlideIn {
  0% {
    transform: translateY(250px);
  }

  100% {
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
