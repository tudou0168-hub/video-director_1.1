export function animateAgentDashboard(tl, selector, start, end) {
  tl.fromTo(selector, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" }, start + 0.12);
  tl.fromTo(`${selector} .vf-agent-node`, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.28, stagger: 0.08 }, start + 0.35);
  tl.to(`${selector} .vf-agent-node`, { boxShadow: "0 0 26px rgba(192,132,252,.18)", scale: 1.012, duration: 0.32, yoyo: true, repeat: 1 }, start + 0.75);
  tl.to(selector, { opacity: 0, y: -20, duration: 0.34 }, Math.max(start + 1.2, end - 0.35));
}
