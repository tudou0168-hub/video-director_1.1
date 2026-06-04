export function animateTopicCard(tl, selector, start, end) {
  tl.fromTo(selector, { opacity: 0, y: 28, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, start + 0.15);
  tl.to(selector, { opacity: 0, y: -18, duration: 0.32, ease: "power2.in" }, Math.max(start + 1.2, end - 0.35));
}
