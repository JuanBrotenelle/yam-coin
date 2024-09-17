<script lang="ts" setup>
import Chart from "chart.js/auto";
import { ChartOptions } from "chart.js";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import axios from "axios";

// Состояние для хранения суммы монет
const totalCoins = ref(0);

// Функция для получения данных с сервера
const fetchTotalCoins = async () => {
  try {
    const response = await axios.get("http://localhost:3000/totalcoins");
    totalCoins.value = response.data.getTotalCoins;
  } catch (error) {
    console.error("Ошибка при получении totalCoins:", error);
  }
};

const maxCoins = 75000;

let myChart: Chart | undefined;

// Устанавливаем интервал обновления данных
let intervalId: number | undefined;

onBeforeUnmount(() => {
  // Очищаем интервал при разрушении компонента
  if (intervalId) {
    clearInterval(intervalId);
  }

  // Удаляем диаграмму
  if (myChart) {
    myChart.destroy();
  }
});

onMounted(() => {
  // Первый запрос при инициализации компонента
  fetchTotalCoins();

  // Устанавливаем интервал для выполнения запросов каждую минуту
  intervalId = window.setInterval(() => {
    fetchTotalCoins();
  }, 60000);

  const ctx = document.getElementById("myChart") as HTMLCanvasElement | null;

  if (ctx) {
    const options: ChartOptions<"doughnut"> = {
      responsive: true,
      cutout: "80%", // Размер внутреннего круга
      plugins: {
        tooltip: { enabled: false }, // Отключаем всплывающие подсказки
        legend: { display: false }, // Отключаем легенду
      },
    };

    myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Used", "Remaining"],
        datasets: [
          {
            data: [totalCoins.value, maxCoins - totalCoins.value],
            backgroundColor: ["#FFFFFF", "#202020"],
            borderWidth: 0,
          },
        ],
      },
      options,
    });
  } else {
    console.error("Canvas element not found.");
  }
});

// Обновление диаграммы при изменении данных
watch(totalCoins, (newValue) => {
  if (myChart) {
    myChart.data.datasets[0].data = [newValue, maxCoins - newValue];
    myChart.update();
  }
});
</script>

<template>
  <div class="h-full relative">
    <!-- Диаграмма -->
    <canvas id="myChart"></canvas>

    <!-- Процент в отдельном <p> -->
    <p
      style="
        text-align: center;
        color: white;
        font-size: 2rem;
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      "
    >
      {{ ((totalCoins / maxCoins) * 100).toFixed(0) }}%
    </p>
  </div>
</template>

<style scoped></style>
