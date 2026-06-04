export function animateHookScene(tl, selector, start, end) {
  tl.fromTo(selector, { opacity: 0, y: 32, scale: 0.94, filter: "blur(12px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.48, ease: "power3.out" }, start + 0.08);
  tl.to(`${selector} h1`, { scale: 1.018, duration: 0.28, yoyo: true, repeat: 1, ease: "power2.inOut" }, start + 0.7);
  tl.to(selector, { opacity: 0, y: -22, duration: 0.35, ease: "power2.in" }, Math.max(start + 1.2, end - 0.38));
}
