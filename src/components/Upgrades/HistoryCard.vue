<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  bonus: {
    _id: string;
    type: "coins" | "hourly_income" | "multiplier";
    value: number;
    status: "inactive" | "used";
    receivedAt: string;
  };
}>();
</script>

<template>
  <div
    class="w-full bg-[#2B2B2B] p-2 flex flex-row justify-between items-center rounded-[25px]"
  >
    <p v-if="props.bonus.type === 'coins'" class="text-[2.5vh]">
      {{ props.bonus.value.toFixed(3) }} $YAM
    </p>
    <p v-if="props.bonus.type === 'hourly_income'" class="text-[2.5vh]">
      {{ props.bonus.value.toFixed(3) }} $YAM per hour
    </p>
    <p v-if="props.bonus.type === 'multiplier'" class="text-[2.5vh]">
      {{ props.bonus.value.toFixed(0) }} multiplier
    </p>
    <img src="../../../public/Ticked.png" class="w-[4vh]" alt="" />
  </div>
</template>
