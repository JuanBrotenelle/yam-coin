<script setup lang="ts">
import HeaderMain from "../components/Header/HeaderMain.vue";
import { initUtils } from "@telegram-apps/sdk";
import { initHapticFeedback } from "@telegram-apps/sdk";
import Friend from "../components/Friends/Friend.vue";
import { useUserInfo } from "../stores/counter";
const hapticFeedback = initHapticFeedback();
const userInfo = useUserInfo();
const friends = userInfo.referals;
const userId = userInfo.userId;

const message = `🔥 Join Yet Another Memcoin! 🔥
This crypto project fairly distributes airdrops to all participants! It's all up to your luck 🎯. Scratch every day to earn more bonuses 🎁!

👥 Invite friends and earn more!
Invite a friend with Telegram Premium and receive passive income 💸. The more friends you invite, the more bonuses you get! 💎

Join now and start right away! 🚀`;

const utils = initUtils();
const handleClick = () => {
  const url = `https://t.me/yamton_bot/crypto?startapp=${userId}`;

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
      console.log("Ссылка скопирована в буфер обмена");
      hapticFeedback.impactOccurred("soft");
    } catch (err) {
      console.error("Ошибка при копировании ссылки:", err);
    }
    document.body.removeChild(textarea);
  }
};
</script>

<template>
  <HeaderMain />
  <div
    class="w-full bg-[#2B2B2B] flex flex-row items-center justify-between p-4 rounded-[25px] mt-5"
  >
    <p class="text-[2vh] w-full">
      Get to +0.050 $YAM per hour for each invited friend with Telegram Premium
    </p>
  </div>
  <div class="w-full overflow-hidden mt-2 flex flex-row items-center gap-2">
    <button
      class="text-[3vh] bg-[#ffffff] text-[#222222] py-2 w-full rounded-[25px] active:bg-[#f5f5f5] transition-all"
      @click="
        utils.shareURL(
          `https://t.me/yamton_bot/crypto?startapp=${userId}`,
          message
        );
        hapticFeedback.impactOccurred('soft');
      "
    >
      Invite
    </button>
    <button
      class="text-[3vh] bg-[#ffffff] text-[#222222] py-3 px-4 h-full rounded-[25px] active:bg-[#f5f5f5] transition-all"
      @click="
        handleClick();
        hapticFeedback.impactOccurred('soft');
      "
    >
      <svg
        width="20"
        height="24"
        viewBox="0 0 38 44"
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
  <div class="h-[54vh] overflow-y-auto mt-2 flex flex-col gap-2 relative">
    <Friend
      v-if="friends"
      v-for="friend in friends"
      :key="friend._id"
      :friend="friend"
    />
    <p
      v-if="friends.length === 0"
      class="h-full flex items-center justify-center bg-[#2B2B2B] text-[2vh] rounded-[25px]"
    >
      Nothing was found
    </p>
  </div>
</template>

<style scoped></style>
