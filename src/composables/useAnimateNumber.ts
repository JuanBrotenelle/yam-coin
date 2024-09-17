export function animateNumber(from: number, to: number, duration: number, callback: (value: number) => void) {
  let start: number | null = null;

  function step(timestamp: number) {
    if (start === null) start = timestamp;
    const progress = timestamp - start;
    const value = Math.min(1, progress / duration);
    callback(from + value * (to - from));
    if (progress < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
