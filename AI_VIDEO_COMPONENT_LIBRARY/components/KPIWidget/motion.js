export function animateKPIWidget(tl, selector, start, end) {
  tl.fromTo(selector, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.48, ease: "back.out(1.6)" }, start + 0.16);
  tl.fromTo(`${selector} .vf-kpi-bar span`, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.7, ease: "power2.out" }, start + 0.45);
  tl.to(selector, { opacity: 0, y: -18, duration: 0.32 }, Math.max(start + 1.2, end - 0.35));
}
