<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import HeaderMain from "../components/Header/HeaderMain.vue";
import { initHapticFeedback } from "@telegram-apps/sdk";
import { useUserInfo } from "../stores/counter";
import ActiveCard from "../components/Upgrades/ActiveCard.vue";
import HistoryCard from "../components/Upgrades/HistoryCard.vue";
import { animateNumber } from "../composables/useAnimateNumber";
const userInfo = useUserInfo();

const incomeRef = ref(userInfo.userIncome);

const gifts = userInfo.bonuses.gifts;
console.log(gifts);

const claimedDefaultBonuses = computed(() =>
  userInfo.bonuses.default.filter((bonus) => bonus.status === "used")
);

const hapticFeedback = initHapticFeedback();

const activeTab = ref("active");

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  hapticFeedback.impactOccurred("soft");
};

onMounted(() => {
  animateNumber(0, userInfo.userIncome, 1000, (value: number) => {
    incomeRef.value = value;
  });
});

watch(
  () => userInfo.userYams,
  (newYams, oldYams) => {
    animateNumber(oldYams, newYams, 1000, (value: number) => {
      incomeRef.value = value;
    });
  }
);
</script>

<template>
  <div class="relative overflow-x-hidden">
    <HeaderMain />
    <p class="text-[2vh] text-center px-[10vw] mt-5 relative">
      Your Passive Income:
    </p>
    <p class="text-[8vh] text-center px-[10vw] mt-[-2vh] font-bold relative">
      {{ incomeRef.toFixed(3) }}
    </p>
    <div class="flex flex-row justify-center mt-[] relative w-full">
      <!-- В зависимости от того, какая вкладка выбрана, применяем разные классы -->
      <p
        :class="[
          'text-[2vh] text-center px-[10vw] mb-5 relative cursor-pointer',
          activeTab === 'active' ? 'selecter-menu' : 'selecter-menu-none',
        ]"
        @click="setActiveTab('active')"
      >
        Gifts
      </p>
      <p
        :class="[
          'text-[2vh] text-center px-[10vw] mb-5 relative cursor-pointer',
          activeTab === 'history' ? 'selecter-menu' : 'selecter-menu-none',
        ]"
        @click="setActiveTab('history')"
      >
        History
      </p>
    </div>
  </div>
  <div
    class="h-[57vh] w-full overflow-x-hidden overflow-y-auto grid-active"
    v-if="activeTab === 'active'"
  >
    <ActiveCard v-for="gift in gifts" :key="gift._id" :gift="gift" />
  </div>
  <div
    class="h-[57vh] overflow-x-hidden overflow-y-auto flex flex-col gap-3"
    v-if="activeTab === 'history'"
  >
    <p
      v-if="!claimedDefaultBonuses.length"
      class="h-full flex items-center justify-center bg-[#2B2B2B] text-[2vh] rounded-[25px]"
    >
      Nothing was found
    </p>
    <HistoryCard
      v-for="claimedBonus in claimedDefaultBonuses"
      :key="claimedBonus._id"
      :bonus="claimedBonus"
    />
  </div>
</template>

<style scoped>
.grid-active {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.selecter-menu {
  position: relative;
  cursor: pointer;
}

.selecter-menu::after {
  content: "";
  position: absolute;
  bottom: -2px; /* Сделано для того, чтобы линия находилась ниже текста */
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #ffffff; /* Белая линия для активной вкладки */
}

.selecter-menu-none::after {
  content: "";
  position: absolute;
  bottom: -2px; /* Сделано для того, чтобы линия находилась ниже текста */
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #424242; /* Серая линия для неактивной вкладки */
}
</style>
