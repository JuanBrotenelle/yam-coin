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

const utils = initUtils();
</script>

<template>
  <HeaderMain />
  <div
    class="w-full bg-[#2B2B2B] flex flex-row items-center justify-between gap-5 p-4 rounded-[25px] mt-5"
  >
    <p class="text-[2vh] w-full">
      Get to +0.050 $YAM per hour for each invited friend with Telegram Premium
    </p>
    <button
      class="text-[3vh] bg-[#ffffff] text-[#222222] h-[5rem] px-10 rounded-[25px] active:bg-[#f5f5f5] transition-all"
      @click="
        utils.shareURL(
          `https://t.me/olinalertbot/yamacointest?startapp=${userId}`,
          'Look! Some cool app here!'
        );
        hapticFeedback.impactOccurred('soft');
      "
    >
      Invite
    </button>
  </div>
  <p class="text-[2vh] px-4 mt-5 mb-2">Your referals:</p>
  <div class="h-[52vh] overflow-y-auto flex flex-col gap-2">
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
