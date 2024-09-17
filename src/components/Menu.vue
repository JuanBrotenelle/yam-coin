<script lang="ts" setup>
import { useRoute, RouterLink } from "vue-router";
import { computed } from "vue";
import { initHapticFeedback } from "@telegram-apps/sdk";

const hapticFeedback = initHapticFeedback();

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div
    class="flex flex-row justify-between items-baseline py-2 px-2 bg-[#202020] rounded-tr-[25px] rounded-tl-[25px] absolute bottom-0 left-0 right-0"
  >
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to="/"
      :class="[
        'flex flex-col items-center w-[10vh] py-4 transition-all',
        isActive('/') ? 'active' : '',
      ]"
    >
      <img src="../../../public/Test Account.png" class="w-[4vh]" alt="" />
      <p class="text-[2vh]">Main</p>
    </RouterLink>
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to="/upgrades"
      :class="[
        'flex flex-col items-center w-[10vh] py-4 justify-center transition-all',
        isActive('/upgrades') ? 'active' : '',
      ]"
    >
      <img src="../../../public/Stack of Coins.png" class="w-[4vh]" alt="" />
      <p class="text-[2vh]">Bonuses</p>
    </RouterLink>
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to="/friends"
      :class="[
        'flex flex-col items-center w-[10vh] py-4 justify-center transition-all',
        isActive('/friends') ? 'active' : '',
      ]"
    >
      <img src="../../../public/Users.png" class="w-[4vh]" alt="" />
      <p class="text-[2vh]">Friends</p>
    </RouterLink>
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to=""
      :class="[
        'flex flex-col items-center w-[10vh] py-4 justify-center transition-all relative',
        isActive('/wallet') ? 'active' : '',
      ]"
    >
      <img src="../../../public/Wallet.png" class="w-[4vh] opacity-50" alt="" />
      <p class="text-[2vh] text-[#2B2B2B] text-[#]">Wallet</p>
      <p class="absolute bottom-2 text-[#2B2B2B] text-[1.5vh]">Soon</p>
    </RouterLink>
  </div>
</template>

<style scoped>
.active {
  background-color: #282828; /* или другой стиль, который вы хотите для активной вкладки */
  border-radius: 20px;
}
</style>
