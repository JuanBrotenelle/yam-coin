import type { Ref } from "vue";
import { ref, watch, computed } from "vue";
import { initHapticFeedback } from "@telegram-apps/sdk";
import { useUserStore } from "@/stores/Store";
import axios from "axios";
import { applyResponseDataToStore } from "@/composables/storageApplier";

const userStore = useUserStore();
let currentCombo = computed(() => userStore.game.combo);
const threeElementsinCombo = ref(true)

const requestCombo = async () => {
  try {
    const response = await axios.post("https://yamonton.space/combo", {
    userId: userStore.user.userId,
    token: userStore.authToken
  },{
    headers: {
      Authorization: `Bearer ${userStore.authToken}`,
    }
  })
  applyResponseDataToStore(response.data);
  userStore.modifyComboArray();
  threeElementsinCombo.value = true
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
}

function updateInactiveComboStatus() {
  const inactiveElement = currentCombo.value.find(el => el.status === "inactive");
  if (inactiveElement) {
    inactiveElement.status = "used";
  }
}

watch(
  () => currentCombo.value.map(item => item.status),
  (newStatuses) => {
    if (
      newStatuses[0] === "used" &&
      newStatuses[1] === "used" &&
      newStatuses[2] === "used"
    ) {
      threeElementsinCombo.value = false;
      setTimeout(() => {
        requestCombo();
      }, 200);
    }
  }
);

export function useScratchGame(
  canvasRef: Ref<HTMLCanvasElement | null>
) {
  const hapticFeedback = initHapticFeedback();
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let isDrawing = false;
  let lastPoint: { x: number; y: number } | null = null;
  const brush = new Image();
  const brushSize = 70;
  let debounceTimeout: number | null = null;
  brush.src = 'data:image/png;base64, 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'; // Установите изображение

  const initCanvas = () => {
    canvas = canvasRef.value;
    if (canvas) {
      ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;

      ctx.fillStyle = "#cccccc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  function getMouse(e: MouseEvent | TouchEvent) {
    const rect = canvas!.getBoundingClientRect();
    let x: number, y: number;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const scaleX = canvas!.width / canvas!.clientWidth;
    const scaleY = canvas!.height / canvas!.clientHeight;

    return {
      x: x * scaleX,
      y: y * scaleY
    };
  }

  function handleMouseDown(e: MouseEvent | TouchEvent) {
    isDrawing = true;
    lastPoint = getMouse(e);
  }

  function handleMouseMove(e: MouseEvent | TouchEvent) {
    if (!isDrawing || !ctx || !lastPoint || threeElementsinCombo.value === false) return;
    e.preventDefault();
    const currentPoint = getMouse(e);
    const dist = distanceBetween(lastPoint, currentPoint);
    const angle = angleBetween(lastPoint, currentPoint);

    ctx.globalCompositeOperation = 'destination-out';

    for (let i = 0; i < dist; i += 2) {
      const x = lastPoint.x + Math.cos(angle) * i - brushSize / 2;
      const y = lastPoint.y + Math.sin(angle) * i - brushSize / 2;
      ctx.drawImage(brush, x, y, brushSize, brushSize);
    }

    lastPoint = currentPoint;

    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      checkBonusArea();
    }, 100);

    hapticFeedback.impactOccurred("soft");
  }

  function handleMouseUp() {
    isDrawing = false;
    lastPoint = null;
  }

  function distanceBetween(point1: { x: number; y: number }, point2: { x: number; y: number }) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  function angleBetween(point1: { x: number; y: number }, point2: { x: number; y: number }) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x);
  }

  function getFilledInPixelsForBonus(stride: number, area: DOMRect): number {
    if (!ctx || !canvas) return 0;
  
    const canvasRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvasRect.width;
    const scaleY = canvas.height / canvasRect.height;
  
    const areaX = (area.left - canvasRect.left) * scaleX;
    const areaY = (area.top - canvasRect.top) * scaleY;
    const areaWidth = area.width * scaleX;
    const areaHeight = area.height * scaleY;
  
    const imageData = ctx.getImageData(areaX, areaY, areaWidth, areaHeight);
    const pixels = imageData.data;
    const total = pixels.length / stride;
  
    let count = 0;
  
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        count++;
      }
    }
  
    return count;
  }
  

  function checkBonusArea() {
    const bonusElement = document.querySelector("p.bonus-text-selector") as HTMLElement;
    if (!bonusElement || !canvas) {
      return;
    }
    const area = bonusElement.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
  
    const scaleX = canvas.width / canvasRect.width;
    const scaleY = canvas.height / canvasRect.height;
  
    const areaWidth = area.width * scaleX;
    const areaHeight = area.height * scaleY;
  
    const filledInPixels = getFilledInPixelsForBonus(4, area);
  
    const totalPixels = areaWidth * areaHeight;
    const filledInPercentage = (filledInPixels / totalPixels) * 100;
  
    if (filledInPercentage > 60) {
      updateInactiveComboStatus()
      initCanvas();
    }
  }

  const setup = () => {
    initCanvas();
    canvas?.addEventListener('mousedown', handleMouseDown);
    canvas?.addEventListener('mousemove', handleMouseMove);
    canvas?.addEventListener('mouseup', handleMouseUp);
    canvas?.addEventListener('touchstart', handleMouseDown);
    canvas?.addEventListener('touchmove', handleMouseMove);
    canvas?.addEventListener('touchend', handleMouseUp);
  };

  const cleanup = () => {
    canvas?.removeEventListener('mousedown', handleMouseDown);
    canvas?.removeEventListener('mousemove', handleMouseMove);
    canvas?.removeEventListener('mouseup', handleMouseUp);
    canvas?.removeEventListener('touchstart', handleMouseDown);
    canvas?.removeEventListener('touchmove', handleMouseMove);
    canvas?.removeEventListener('touchend', handleMouseUp);
  };

  return { setup, cleanup, checkBonusArea };
}
