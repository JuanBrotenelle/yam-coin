<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import Menu from "./components/Menu.vue";
import ProfileDie from "@/components/Header/ProfileDie.vue";
import Loading from "./views/Loading.vue";
import Error from "./components/Supportive/Error.vue";
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import axios from "axios";
import {
  initMiniApp,
  postEvent,
  retrieveLaunchParams,
} from "@telegram-apps/sdk";
import { applyResponseDataToStore } from "./composables/storageApplier";
import { useUserStore } from "./stores/Store";

const userStore = useUserStore();
const router = useRouter();
const progressWidth = ref("0%");
const titleError = ref("");
const descriptionError = ref("");
const appIsReady = ref(false);

function setupTelegramApp() {
  postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
  postEvent("web_app_set_header_color", { color: "#1D1D1D" });
  postEvent("web_app_set_background_color", { color: "#1D1D1D" });
  postEvent("web_app_setup_closing_behavior", { need_confirmation: true });
  postEvent("web_app_expand");
  postEvent("web_app_setup_back_button", { is_visible: false });
  progressWidth.value = "90%";
}

const setCookie = async () => {
  try {
    await axios.get("http://localhost:3000/set-cookie");
    progressWidth.value = "30%";
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};

const initData = async (Data: string | undefined) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/start",
      {},
      {
        headers: {
          Authorization: `tma ${Data}`,
        },
      }
    );
    applyResponseDataToStore(response.data);
    userStore.modifyComboArray();
    progressWidth.value = "60%";
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};

function updateOverflow() {
  const elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      const currentOverflow = window.getComputedStyle(element).overflow;

      if (currentOverflow === "hidden") {
        element.style.overflowX = "hidden";
        element.style.overflowY = "visible";
      }
    }
  });

  progressWidth.value = "100%";
}

onMounted(async () => {
  let error = null;
  const [miniApp] = initMiniApp();
  miniApp.ready();
  progressWidth.value = "10%";
  const { initDataRaw } = retrieveLaunchParams();

  try {
    await setCookie();
    await initData(initDataRaw).then(() => {
      appIsReady.value = true;
    });
  } catch (err) {
    console.error("Error sending data to server:", err);
    error = err;
    titleError.value = "Can't connect to the server.";
    descriptionError.value = "Something went wrong. Please try again later.";
    return;
  }

  if (!error && appIsReady.value) {
    setupTelegramApp();
    updateOverflow();
    window.addEventListener("beforeunload", sendLogoutRequest);
    router.push("/main");
  }
});

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

document.addEventListener("wheel", function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
});

watch(
  () => titleError.value,
  () => {
    setTimeout(() => {
      titleError.value = "";
      descriptionError.value = "";
    }, 10000);
  }
);
const sendLogoutRequest = () => {
  fetch("http://localhost:3000/lastauth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userStore.user.userId,
      authToken: userStore.authToken,
    }),
  }).catch((err) => {
    console.error("Ошибка при отправке запроса:", err);
  });
};

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", sendLogoutRequest);
});
</script>

<template>
  <div
    :class="[
      'overflow-hidden user-select-none',
      isActive('/profile') ? '' : 'px-1 pt-3',
    ]"
  >
    <Error
      v-if="titleError"
      :title="titleError"
      :description="descriptionError"
    />
    <ProfileDie v-if="isActive('/main') || isActive('/bonuses')" />
    <RouterView v-slot="{ Component }">
      <Loading v-if="progressWidth !== '100%'" :width="progressWidth" />
      <component :is="Component" v-else />
    </RouterView>
    <Menu
      v-if="!isActive('/notallowed') && !isActive('/') && !isActive('/profile')"
    />
  </div>
</template>
