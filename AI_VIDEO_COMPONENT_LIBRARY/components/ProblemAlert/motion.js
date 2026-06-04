export function animateProblemAlert(tl, selector, start, end) {
  tl.fromTo(selector, { opacity: 0, x: 46, filter: "blur(10px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.42, ease: "power3.out" }, start + 0.12);
  tl.to(selector, { boxShadow: "0 0 54px rgba(251,191,36,.2)", duration: 0.28, yoyo: true, repeat: 1 }, start + 0.45);
  tl.to(selector, { opacity: 0, x: -24, duration: 0.32, ease: "power2.in" }, Math.max(start + 1.2, end - 0.35));
}
