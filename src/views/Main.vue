<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from "vue";
import { useScratchGame } from "../composables/useScratchGame";
import { useUserStore } from "@/stores/Store";

const userStore = useUserStore();
let currentCombo = computed(() => userStore.game.combo);

const canvasRef = ref<HTMLCanvasElement | null>(null);

const { setup, cleanup } = useScratchGame(canvasRef);

onMounted(async () => {
  await nextTick();
  if (canvasRef.value) {
    setup();
  }
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div
    class="w-full py-2 flex flex-row gap-10 items-center justify-center bg-components rounded-[25px] my-5"
  >
    <div
      class="bg-componentsadditional w-16 h-16 rounded-[10px] flex items-center justify-center text-2xl"
    >
      <p
        v-if="currentCombo[0].status === 'used'"
        class="text-2xl animate-element"
      >
        {{ currentCombo[0].status === "used" ? currentCombo[0].display : "" }}
      </p>
    </div>
    <div
      class="bg-componentsadditional w-16 h-16 rounded-[10px] flex items-center justify-center text-2xl"
    >
      <p
        v-if="currentCombo[1].status === 'used'"
        class="text-2xl animate-element"
      >
        {{ currentCombo[1].status === "used" ? currentCombo[1].display : "" }}
      </p>
    </div>
    <div
      class="bg-componentsadditional w-16 h-16 rounded-[10px] flex items-center justify-center text-2xl"
    >
      <p
        v-if="currentCombo[2].status === 'used'"
        class="text-2xl animate-element"
      >
        {{ currentCombo[2].status === "used" ? currentCombo[2].display : "" }}
      </p>
    </div>
  </div>
  <div class="relative h-full">
    <div
      class="relative flex flex-col justify-center items-center bg-componentsadditional rounded-[25px] border-components h-[55vh] w-full border-8"
    >
      <canvas
        id="Scratch-area"
        ref="canvasRef"
        class="rounded-[18px] absolute h-full w-full"
      >
        Your browser does not support the canvas element.
      </canvas>
      <p class="text-[25vh] bonus-text-selector">
        {{
          currentCombo.filter((element) => element.status === "inactive")[0]
            ? currentCombo.filter((element) => element.status === "inactive")[0]
                .display
            : ""
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.animate-element {
  animation: Opacity 0.2s ease 0s 1 normal forwards;
}

@keyframes Opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
