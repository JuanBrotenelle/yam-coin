<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { initHapticFeedback } from "@telegram-apps/sdk";
import ActiveCard from "../components/BonusComponents/ActiveCard.vue";
import HistoryCard from "../components/BonusComponents/Task.vue";
import { animateNumber } from "../composables/useAnimateNumber";
import { useUserStore } from "../stores/Store";

const userStore = useUserStore();
const hapticFeedback = initHapticFeedback();
const activeTab = ref("gifts");
const sortedGifts = computed(() => {
  return userStore.game.bonuses.gifts;
});

const tasks = computed(() => {
  return userStore.game.bonuses.tasks;
});

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  hapticFeedback.impactOccurred("soft");
};
</script>

<template>
  <div class="flex flex-row justify-center mt-5 relative w-full">
    <p
      :class="[
        'text-lg text-center px-[10vw] mb-5 relative cursor-pointer overflow-visible',
        activeTab === 'gifts' ? 'selecter-menu' : 'selecter-menu-none',
      ]"
      @click="setActiveTab('gifts')"
    >
      Gifts
    </p>
    <p
      :class="[
        'text-lg text-center px-[10vw] mb-5 relative cursor-pointer overflow-visible',
        activeTab === 'tasks' ? 'selecter-menu' : 'selecter-menu-none',
      ]"
      @click="setActiveTab('tasks')"
    >
      Tasks
    </p>
  </div>
  <div
    class="h-full w-full overflow-x-hidden overflow-y-auto grid-active"
    v-if="activeTab === 'gifts'"
  >
    <ActiveCard v-for="gift in sortedGifts" :key="gift._id" :gift="gift" />
  </div>

  <div
    class="h-full overflow-x-hidden overflow-y-auto flex flex-col gap-3"
    v-if="activeTab === 'tasks'"
  >
    <HistoryCard v-for="task in tasks" :key="task._id" :task="task" />
  </div>
</template>

<style scoped>
.grid-active {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.selecter-menu {
  overflow: visible;
  position: relative;
  cursor: pointer;
}

.selecter-menu::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #e3e3e3;
}

.selecter-menu-none::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #232323;
}
</style>
