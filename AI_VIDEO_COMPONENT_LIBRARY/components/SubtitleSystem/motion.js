export function animateSubtitleSystem(tl, selector, text, start, end) {
  tl.call(() => { document.querySelector(selector).textContent = text || ""; }, null, Math.max(0, start - 0.12));
  tl.to(selector, { opacity: 1, duration: 0.16 }, Math.max(0, start - 0.1));
  tl.to(selector, { scale: 1.01, duration: 0.18, yoyo: true, repeat: 1 }, start + 0.08);
  tl.to(selector, { opacity: 0, duration: 0.16 }, Math.max(start + 0.2, end - 0.12));
}
