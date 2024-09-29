<script lang="ts" setup>
import { useUserStore } from "@/stores/Store";

const userStore = useUserStore();
</script>

<template>
  <div class="h-[90vh] w-full flex flex-col items-center justify-center">
    <img src="/qr-code.png" alt="" class="w-[20vh] rounded-[20px]" />
    <p class="text-xl mt-5">Try to launch from a mobile device</p>
    <p v-if="userStore.supportId" class="text-base text-textadditional">
      SupportID: {{ userStore.supportId.toUpperCase() }}
    </p>
  </div>
</template>
