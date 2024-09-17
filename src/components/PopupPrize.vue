<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserInfo } from "../stores/counter"; // Импортируем хранилище Pinia
import { initHapticFeedback } from "@telegram-apps/sdk";
import axios from "axios"; // Для отправки HTTP-запросов

const hapticFeedback = initHapticFeedback();

hapticFeedback.notificationOccurred("warning");

const inactiveBonuses = computed(() =>
  userInfo.bonuses.default.filter((bonus) => bonus.status === "inactive")
);

const props = defineProps({
  hidePopup: Function,
});

const userInfo = useUserInfo(); // Получаем доступ к хранилищу

const bonus = ref(inactiveBonuses.value[0]); // Бонус для отображения

// Функция для отправки POST-запроса и обновления состояния
const claimBonus = async () => {
  try {
    // Подготовка данных для запроса
    const { userId, token } = userInfo;
    const { _id: bonusId, value, type } = bonus.value;

    // Определяем URL в зависимости от типа бонуса
    let url = "";
    switch (type) {
      case "coins":
        url = "http://127.0.0.1:3000/coins";
        break;
      case "hourly_income":
        url = "http://127.0.0.1:3000/income";
        break;
      case "multiplier":
        url = "http://127.0.0.1:3000/multiplier";
        break;
      default:
        throw new Error("Неизвестный тип бонуса");
    }

    // Отправляем запрос на сервер
    const response = await axios.post(url, {
      userId,
      bonusId,
      token,
      value,
    });

    // Логирование ответа для отладки
    console.log("Response from server:", response.data);

    if (response.data) {
      // Обновляем состояние бонусов в Pinia
      userInfo.$patch({
        userYams: response.data.coins,
        userIncome: response.data.hourlyIncome,
        token: response.data.token,
        bonuses: response.data.bonuses,
      });

      // Убираем попап
      props.hidePopup?.();
      console.log(userInfo.bonuses);
    } else {
      console.error("Failed to claim bonus: No data in response");
    }
  } catch (error) {
    console.error("Error claiming bonus:", error);
  }
};
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-1"
  >
    <div
      class="w-full bg-[#202020] h-[70vh] rounded-[25px] z-[9999] py-8 px-5 flex flex-col items-center justify-between main-window"
    >
      <div class="w-full">
        <div
          class="bg-[#222222] w-full h-[35vh] rounded-[25px] flex flex-col items-center justify-center"
        >
          <p class="text-[5vh]">{{ bonus.value.toFixed(3) }}</p>
        </div>
        <p class="text-center text-[3vh] mt-5">Congratulations! 🎉🎊</p>
        <p class="text-center text-[2vh]">
          You received {{ bonus.value.toFixed(3) }} $YAM
        </p>
      </div>
      <button
        @click="claimBonus"
        class="text-[3vh] py-5 bg-[#ffffff] text-[#202020] w-full rounded-[25px] mt-10 active:bg-[#B0B0B0] transition-all"
      >
        Claim
      </button>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full bg-[#0C0C0C] opacity-70 z-[9998] flex flex-col items-center justify-center p-1"
    ></div>
  </div>
</template>

<style scoped>
.main-window {
  animation: FadeInBottom 0.5s ease 0s 1 normal forwards;
}

.background-window {
  animation: Opacity 0.1s ease 0s 1 normal forwards;
}

@keyframes FadeInBottom {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
