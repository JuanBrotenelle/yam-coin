import { ref } from "vue";
import type { Ref } from "vue";
import { initHapticFeedback } from "@telegram-apps/sdk";

export function useScratchGame(
  canvasRef: Ref<HTMLCanvasElement | null>,
  PopupPrizeValue: Ref<boolean>,
  PopupPrizeFunction: () => void
) {
  const hapticFeedback = initHapticFeedback();
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let lastX: number | null = null;
  let lastY: number | null = null;
  let isScratching = false;
  const scratchCount = ref(3);

  function isIOS() {
    const userAgent = navigator.userAgent;
    return (
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document) ||
      !!(window as any).MSStream
    );
  }

  function preventDefaultTouch(e: TouchEvent) {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }

  function fillCanvas() {
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const scaleFactor = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * scaleFactor);
      canvas.height = Math.floor(rect.height * scaleFactor);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.fillStyle = "#CCCCCC";
      ctx.fillRect(0, 0, rect.width, rect.height);
    }
  }

  function getCoordinates(event: MouseEvent | TouchEvent) {
    const rect = canvas!.getBoundingClientRect();
    const scaleFactor = window.devicePixelRatio || 1;
    const x =
      (((event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) -
        rect.left) *
        (canvas!.width / rect.width)) /
      scaleFactor;
    const y =
      (((event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) -
        rect.top) *
        (canvas!.height / rect.height)) /
      scaleFactor;
    return { x, y };
  }

  function startScratch(event: MouseEvent | TouchEvent) {
    if (PopupPrizeValue.value) return; // Запретить скретч, если PopupPrizeValue == true
    isScratching = true;
    const { x, y } = getCoordinates(event);
    lastX = x;
    lastY = y;
  }

  function calculateTextVisibility() {
    if (!ctx || !canvas) return;
    const textElement = document.querySelector(
      "p.bonus-text-selector"
    ) as HTMLElement;
    if (!textElement) return;
    const style = window.getComputedStyle(textElement);
    const fontSize = parseFloat(style.fontSize);
    const rect = textElement.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const scaleFactor = window.devicePixelRatio || 1;
    const xStart = Math.max((rect.left - canvasRect.left) * scaleFactor, 0);
    const yStart = Math.max((rect.top - canvasRect.top) * scaleFactor, 0);
    const xEnd = Math.min(
      (rect.right - canvasRect.left) * scaleFactor,
      canvas.width
    );
    const yEnd = Math.min(
      (rect.bottom - canvasRect.top) * scaleFactor,
      canvas.height
    );

    const width = xEnd - xStart;
    const height = yEnd - yStart;
    if (width <= 0 || height <= 0) return;
    const imageData = ctx.getImageData(xStart, yStart, width, height);
    const totalPixels = imageData.width * imageData.height;

    let clearedPixels = 0;
    for (let i = 0; i < totalPixels * 4; i += 4) {
      const alpha = imageData.data[i + 3];
      if (alpha === 0) {
        clearedPixels++;
      }
    }
    const clearedPercentage = (clearedPixels / totalPixels) * 100;
    if (clearedPercentage >= 85) {
      PopupPrizeFunction();
      fillCanvas();
    }
  }

  function scratch(event: MouseEvent | TouchEvent) {
    if (!isScratching || !ctx || !canvas || PopupPrizeValue.value) return; // Запретить скретч, если PopupPrizeValue == true
    const { x, y } = getCoordinates(event);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 30;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (lastX !== null && lastY !== null) {
      ctx.moveTo(lastX, lastY);
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
    hapticFeedback.impactOccurred("soft");
    calculateTextVisibility();
  }

  function endScratch() {
    if (PopupPrizeValue.value) return; // Запретить завершение скретча, если PopupPrizeValue == true
    isScratching = false;
    lastX = null;
    lastY = null;
    scratchCount.value -= 1;
    if (scratchCount.value <= 0) {
      // Логика при завершении всех скретчей
    }
  }

  function setup() {
    canvas = canvasRef.value;
    if (canvas) {
      ctx = canvas.getContext("2d");
      if (ctx) {
        fillCanvas();
        canvas.addEventListener("mousedown", startScratch);
        canvas.addEventListener("mousemove", scratch);
        canvas.addEventListener("mouseup", endScratch);
        canvas.addEventListener("touchstart", startScratch);
        canvas.addEventListener("touchmove", scratch);
        canvas.addEventListener("touchend", endScratch);
        if (isIOS()) {
          document.body.addEventListener("touchmove", preventDefaultTouch, {
            passive: false,
          });
        }
      }
    }
  }

  function cleanup() {
    if (isIOS()) {
      document.body.removeEventListener("touchmove", preventDefaultTouch);
    }
  }

  return { setup, cleanup };
}
