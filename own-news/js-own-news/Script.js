document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  });
});
