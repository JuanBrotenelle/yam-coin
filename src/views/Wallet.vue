<template>
  <TonConnectUIProvider
    class="flex flex-col items-center justify-center"
    :options="options"
  >
    <div
      class="p-5 w-full bg-[#2B2B2B] flex flex-col items-center justify-center rounded-[25px] mt-5 mb-5"
    >
      <ChartDounagth />
      <p class="mt-5">Max. 75'000</p>
    </div>
    <TonConnectButton />
  </TonConnectUIProvider>
</template>

<script lang="ts" setup>
import ChartDounagth from "@/components/ChartDounagth.vue";
import { TonConnectButton, TonConnectUIProvider } from "@townsquarelabs/ui-vue";

const options = {
  manifestUrl:
    "https://0b5d-37-235-51-181.ngrok-free.app/tonconnect-manifest.json",
};
</script>

<style scoped></style>
