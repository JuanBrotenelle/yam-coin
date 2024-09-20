<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { useWebApp, useWebAppViewport } from "vue-tg";
import { onMounted, ref } from "vue";
import Menu from "./components/Menu.vue";
import axios from "axios";
import { useUserInfo } from "./stores/counter";

const route = useRoute();
const router = useRouter();

const isActive = (path: string) => {
  return route.path === path;
};

const webApp = useWebApp();
const userInfo = useUserInfo();

const initData = async () => {
  try {
    const initData = webApp.initData;
    console.log(initData);
    const response = await axios.post(
      "https://yamonton.space/start",
      {
        initData: initData,
      },
      {
        withCredentials: true,
      }
    );

    userInfo.$patch({
      userId: response.data.userId,
      userYams: response.data.coins,
      userIncome: response.data.hourlyIncome,
      token: response.data.token,
      bonuses: response.data.bonuses,
      referals: response.data.referals,
    });

    router.push("/main");
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};

const { expand, viewportStableHeight, disableVerticalSwipes } =
  useWebAppViewport();

onMounted(async () => {
  disableVerticalSwipes();
  expand();
  webApp.ready();
  initData();
});

const viewport = viewportStableHeight;

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

document.addEventListener("wheel", function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
});
</script>

<template>
  <div
    :class="[
      'px-1 pt-3 height-[' + viewport + 'px] overflow-hidden user-select-none',
    ]"
  >
    <RouterView />
    <img
      v-if="!isActive('/notallowed')"
      src="/background.png"
      alt=""
      class="absolute bottom-0 right-0 -z-10 overflow-hidden brightness-125"
    />
    <Menu v-if="!isActive('/notallowed')" />
  </div>
</template>
