// TABS NAVIGATION
const btnLeft = document.querySelector(".leftt-btn");
const btnRight = document.querySelector(".rightt-btn");
const tabMenu = document.querySelector(".tab-menu");

const IconVisibility = () => {
  let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
  // console.log(scrollLeftValue);
  let scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;

  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
  btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
};

btnRight.addEventListener("click", () => {
  tabMenu.scrollLeft += 150;
  // IconVisibility();
  setTimeout(() => IconVisibility(), 50);
});

btnLeft.addEventListener("click", () => {
  tabMenu.scrollLeft -= 150;
  // IconVisibility();
  setTimeout(() => IconVisibility(), 50);
});

window.onload = function () {
  btnRight.style.display =
    tabMenu.scrollWidth > tabMenu.clientWidth ||
    tabMenu.scrollWidth >= window.innerWidth
      ? "block"
      : "none";
  btnLeft.style.display =
    tabMenu.scrollWidth >= window.innerWidth ? "" : "none";
};

window.onresize = function () {
  btnRight.style.display =
    tabMenu.scrollWidth > tabMenu.clientWidth ||
    tabMenu.scrollWidth >= window.innerWidth
      ? "block"
      : "none";
  btnLeft.style.display =
    tabMenu.scrollWidth >= window.innerWidth ? "" : "none";

  let scrollLeftValue = Math.round(tabMenu.scrollLeft);

  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
};

// TAB NAVIGATION DRAGGABLE
let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
  if (!activeDrag) return;
  tabMenu.scrollLeft -= drag.movementX;
  IconVisibility();
  tabMenu.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
  activeDrag = false;
  tabMenu.classList.remove("dragging");
});

tabMenu.addEventListener("mousedown", () => {
  activeDrag = true;
});

tabMenu.addEventListener("scroll", () => IconVisibility());

// TAB CONTENT ONCLICK TAB BTN
const tabs = document.querySelectorAll(".swiper-container");
const tabBtns = document.querySelectorAll(".tab-btn");

const tabNav = function (tabBtnClick) {
  tabBtns.forEach((tabBtn) => {
    tabBtn.classList.remove("active");
  });

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  tabBtns[tabBtnClick].classList.add("active");
  tabs[tabBtnClick].classList.add("active");
};

tabBtns.forEach((tabBtn, i) => {
  tabBtn.addEventListener("click", () => {
    tabNav(i);
  });
});

// ! ==================================================================
// Inisialisasi Swiper
var swiper = new Swiper(".menu", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 1,

  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  loop: false,
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
  keyboard: {
    enabled: true,
  },
  mousewheel: {
    thresholdDelta: 70,
  },
  breakpoints: {
    560: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// const menuItems = document.querySelector(".menu-items");
// const leftButton = document.querySelector(".left-btn");
// const rightButton = document.querySelector(".right-btn");
// let currentSlide = 0;

// function getItemsPerSlide() {
//   const itemWidth = document.querySelector(".item-card").offsetWidth;
//   return Math.floor(menuItems.parentElement.offsetWidth / itemWidth);
// }

// function moveSlide(direction) {
//   const itemsPerSlide = getItemsPerSlide();
//   const totalItems = document.querySelectorAll(".item-card").length;
//   const maxSlide = Math.ceil(totalItems / itemsPerSlide) - 1;

//   if (direction === "left" && currentSlide > 0) {
//     currentSlide--;
//   } else if (direction === "right" && currentSlide < maxSlide) {
//     currentSlide++;
//   }

//   const translateX = -((currentSlide * 100) / itemsPerSlide);
//   menuItems.style.transform = `translateX(${translateX}%)`;
// }

// // Tambahkan event listener pada tombol
// leftButton.addEventListener("click", () => moveSlide("left"));
// rightButton.addEventListener("click", () => moveSlide("right"));

// // Update slider saat layar di-resize
// window.addEventListener("resize", () => {
//   currentSlide = 0;
//   menuItems.style.transform = `translateX(0)`;
// });

// REVIEWS
var swiper = new Swiper(".slider", {
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: {
    thresholdDelta: 70,
  },
});
