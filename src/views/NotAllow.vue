<script lang="ts" setup>
import { useUserInfo } from "../stores/counter";
const userInfo = useUserInfo();
console.log(userInfo.userYams);
</script>

<template>
  <div class="h-[90vh] w-full flex flex-col items-center justify-center">
    <img src="../../../public/Yam.png" alt="" class="w-[20vh] opacity-20" />
    <p class="text-[2vh] mt-5">Try to launch from a mobile device</p>
    <p class="text-[1.2vh]">Support ID: 893398127983987289</p>
  </div>
</template>
