<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps<{
  index: number;
  friend: {
    _id: string;
    userId: number;
    firstName: string;
    lastName: string;
    photoUrl: string;
    isPremium: boolean;
    accountExperience: number;
  };
}>();

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
</script>

<template>
  <div
    class="bg-components p-2 w-full flex flex-row items-center rounded-[25px]"
  >
    <div class="flex flex-row gap-3">
      <p
        class="flex flex-col items-center justify-center font-bold text-textadditional text-2xl"
      >
        #{{ props.index + 4 }}
      </p>
      <div class="h-[8vh] w-[8vh] rounded-[20px]">
        <img
          :src="props.friend.photoUrl ? props.friend.photoUrl : '/NoAvatar.png'"
          class="rounded-[20px]"
          alt=""
        />
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-1 items-center">
          <p class="text-[2vh]">{{ props.friend.firstName }}</p>
          <svg
            v-if="props.friend.isPremium"
            class="lbK6aMGA"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.63869 12.1902L3.50621 14.1092C3.18049 14.3087 2.75468 14.2064 2.55515 13.8807C2.45769 13.7216 2.42864 13.5299 2.47457 13.3491L2.95948 11.4405C3.13452 10.7515 3.60599 10.1756 4.24682 9.86791L7.6642 8.22716C7.82352 8.15067 7.89067 7.95951 7.81418 7.80019C7.75223 7.67116 7.61214 7.59896 7.47111 7.62338L3.66713 8.28194C2.89387 8.41581 2.1009 8.20228 1.49941 7.69823L0.297703 6.69116C0.00493565 6.44581 -0.0335059 6.00958 0.211842 5.71682C0.33117 5.57442 0.502766 5.48602 0.687982 5.47153L4.35956 5.18419C4.61895 5.16389 4.845 4.99974 4.94458 4.75937L6.36101 1.3402C6.5072 0.987302 6.91179 0.819734 7.26469 0.965925C7.43413 1.03612 7.56876 1.17075 7.63896 1.3402L9.05539 4.75937C9.15496 4.99974 9.38101 5.16389 9.6404 5.18419L13.3322 5.47311C13.713 5.50291 13.9975 5.83578 13.9677 6.2166C13.9534 6.39979 13.8667 6.56975 13.7269 6.68896L10.9114 9.08928C10.7131 9.25826 10.6267 9.52425 10.6876 9.77748L11.5532 13.3733C11.6426 13.7447 11.414 14.1182 11.0427 14.2076C10.8642 14.2506 10.676 14.2208 10.5195 14.1249L7.36128 12.1902C7.13956 12.0544 6.8604 12.0544 6.63869 12.1902Z"
              fill="#66B2FF"
            ></path>
          </svg>
        </div>
        <p class="text-textadditional">
          Activity level: {{ getLevel(props.friend.accountExperience) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
