const menuItems = document.querySelector(".menu-items");
const leftButton = document.querySelector(".left-btn");
const rightButton = document.querySelector(".right-btn");
let currentSlide = 0;

function getItemsPerSlide() {
  const itemWidth = document.querySelector(".item-card").offsetWidth;
  return Math.floor(menuItems.parentElement.offsetWidth / itemWidth);
}

function moveSlide(direction) {
  const itemsPerSlide = getItemsPerSlide();
  const totalItems = document.querySelectorAll(".item-card").length;
  const maxSlide = Math.ceil(totalItems / itemsPerSlide) - 1;

  if (direction === "left" && currentSlide > 0) {
    currentSlide--;
  } else if (direction === "right" && currentSlide < maxSlide) {
    currentSlide++;
  }

  const translateX = -((currentSlide * 100) / itemsPerSlide);
  menuItems.style.transform = `translateX(${translateX}%)`;
}

// Tambahkan event listener pada tombol
leftButton.addEventListener("click", () => moveSlide("left"));
rightButton.addEventListener("click", () => moveSlide("right"));

// Update slider saat layar di-resize
window.addEventListener("resize", () => {
  currentSlide = 0;
  menuItems.style.transform = `translateX(0)`;
});
