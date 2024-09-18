<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { useWebApp, useWebAppViewport, useWebAppTheme } from "vue-tg";
import { onMounted, ref } from "vue";
import Menu from "./components/Menu.vue";
import axios from "axios";
import { useUserInfo } from "./stores/counter";

const isLoading = ref(true);

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

const webApp = useWebApp();
const userInfo = useUserInfo();

const initData = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const startapp = urlParams.get("tgWebAppStartParam");
    const initData = webApp.initDataUnsafe;

    const dataToSend = {
      id: initData?.user.id || null,
      is_bot: initData?.user.is_bot || false,
      first_name: initData?.user.first_name || "",
      last_name: initData?.user.last_name || "",
      username: initData?.user.username || "",
      language_code: initData?.user.language_code || "",
      is_premium: initData?.user.is_premium || false,
      photo_url: initData?.user.photo_url || "",
      referalLink: Number(startapp) || "",
    };

    await axios.post("https://yamonton.space/start", dataToSend);
    const response = await axios.post(
      "https://yamonton.space/start",
      dataToSend
    );
    userInfo.$patch({
      userId: initData.user.id,
      userYams: response.data.coins,
      userIncome: response.data.hourlyIncome,
      token: response.data.token,
      bonuses: response.data.bonuses,
      referals: response.data.referals,
    });
    isLoading.value = false;
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};

const { expand, viewportStableHeight, disableVerticalSwipes } =
  useWebAppViewport();

onMounted(async () => {
  disableVerticalSwipes();
  expand();
  const { setBackgroundColor } = useWebAppTheme();

  const webAppTheme = useWebAppTheme();
  webAppTheme.setBackgroundColor("#202020");
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
    v-if="isLoading"
    class="absolute top-0 left-0 w-full h-full bg-[#242424] z-[9999]"
  >
    <div class="loader">
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
      </div>
    </div>
  </div>
  <div
    :class="[
      'px-1 pt-3 height-[' + viewport + 'px] overflow-hidden user-select-none',
    ]"
  >
    <RouterView />
    <img
      v-if="!isActive('/notallowed')"
      src="../../../public/background.png"
      alt=""
      class="absolute bottom-0 right-0 -z-10 overflow-hidden brightness-125"
    />
    <Menu v-if="!isActive('/notallowed')" />
  </div>
</template>

<style scoped>
.loader {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}

.loader-inner {
  bottom: 0;
  height: 60px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}

.loader-line-wrap {
  animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  width: 100px;
}
.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.loader-line-wrap:nth-child(1) {
  animation-delay: -50ms;
}
.loader-line-wrap:nth-child(2) {
  animation-delay: -100ms;
}
.loader-line-wrap:nth-child(3) {
  animation-delay: -150ms;
}
.loader-line-wrap:nth-child(4) {
  animation-delay: -200ms;
}
.loader-line-wrap:nth-child(5) {
  animation-delay: -250ms;
}

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 0%, 20%);
  height: 90px;
  width: 90px;
  top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(0, 0%, 25%);
  height: 76px;
  width: 76px;
  top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(0, 0%, 30%);
  height: 62px;
  width: 62px;
  top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(0, 0%, 35%);
  height: 48px;
  width: 48px;
  top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(0, 0%, 40%);
  height: 34px;
  width: 34px;
  top: 35px;
}

@keyframes spin {
  0%,
  15% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
