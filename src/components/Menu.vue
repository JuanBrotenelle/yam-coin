<script lang="ts" setup>
import { useRoute, RouterLink } from "vue-router";
import { initHapticFeedback } from "@telegram-apps/sdk";

const hapticFeedback = initHapticFeedback();

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div
    class="anim-menu flex flex-row justify-between items-baseline p-1 bg-components rounded-tr-[25px] rounded-tl-[25px] fixed bottom-0 left-0 w-full z-[99999]"
  >
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to="/main"
      :class="[
        'flex flex-col items-center w-[10vh] py-4 transition-all',
        isActive('/main') ? 'active' : '',
      ]"
    >
      <img src="/Scratch.svg" class="w-[4vh]" alt="" />
      <p
        :class="[
          'text-sm',
          isActive('/main') ? 'text-textmain' : 'text-textadditional',
        ]"
      >
        Scratch
      </p>
    </RouterLink>
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to="/bonuses"
      :class="[
        'flex flex-col items-center w-[10vh] py-4 justify-center transition-all',
        isActive('/bonuses') ? 'active' : '',
      ]"
    >
      <img src="/Bonuses.svg" class="w-[4vh]" alt="" />
      <p
        :class="[
          'text-sm',
          isActive('/bonuses') ? 'text-textmain' : 'text-textadditional',
        ]"
      >
        Bonuses
      </p>
    </RouterLink>
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to="/friends"
      :class="[
        'flex flex-col items-center w-[10vh] py-4 justify-center transition-all',
        isActive('/friends') ? 'active' : '',
      ]"
    >
      <img src="/Friends.svg" class="w-[4vh]" alt="" />
      <p
        :class="[
          'text-sm',
          isActive('/friends') ? 'text-textmain' : 'text-textadditional',
        ]"
      >
        Friends
      </p>
    </RouterLink>
    <RouterLink
      @click="hapticFeedback.selectionChanged()"
      to="/roadmap"
      :class="[
        'flex flex-col items-center w-[10vh] py-4 justify-center transition-all',
        isActive('/roadmap') ? 'active' : '',
      ]"
    >
      <img src="/Roadmap.svg" class="w-[4vh]" alt="" />
      <p
        :class="[
          'text-sm',
          isActive('/roadmap') ? 'text-textmain' : 'text-textadditional',
        ]"
      >
        Other
      </p>
    </RouterLink>
  </div>
</template>

<style scoped>
.active {
  background-color: #1e1e1e;
  border-radius: 20px;
}

.anim-menu {
  animation: SlideIn 0.5s ease 0s 1 normal forwards;
}

@keyframes SlideIn {
  0% {
    transform: translateY(250px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
