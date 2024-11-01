let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide img");

document.querySelector(".next").addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    document.querySelector(".carousel-container").style.transform = `translateX(${-slideIndex * 100}%)`;
});

document.querySelector(".prev").addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    document.querySelector(".carousel-container").style.transform = `translateX(${-slideIndex * 100}%)`;
});