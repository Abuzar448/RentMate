document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbarNavAltMarkup");

  // Bootstrap collapse events
  navbar.addEventListener("shown.bs.collapse", () => {
    // Animate links when navbar opens
    gsap.fromTo(
      navbar.querySelectorAll(".nav-link"),
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }
    );
  });

  navbar.addEventListener("hide.bs.collapse", () => {
    // Animate links when navbar closes
    gsap.to(navbar.querySelectorAll(".nav-link"), {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
    });
  });
});