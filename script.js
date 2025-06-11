const startDate = new Date("2016-10-17T00:00:00");

function updateCounter() {
  const now = new Date();
  const diffTime = now - startDate;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffTime / 1000) % 60);

  document.getElementById("daysTogether").textContent =
    `${diffDays} dias, ${String(diffHours).padStart(2, '0')}h ${String(diffMinutes).padStart(2, '0')}min ${String(diffSeconds).padStart(2, '0')}s`;
}

setInterval(updateCounter, 1000);
updateCounter();

const frases = [
  "Te amo, minha gatinha 💕",
  "Você é meu mundo 🌍",
  "Contigo até o fim ❤️",
  "Meu amor por você só cresce 💘",
  "Seu sorriso é meu lugar feliz 😍",
  "A vida é melhor com você 💑",
  "Você é meu sonho realizado ✨",
  "Amor da minha vida 🥰",
  "Juntos somos perfeitos 💖",
  "Meu coração é todo seu 💓"
];

const slideContainer = document.getElementById("slideContainer");
const caption = document.getElementById("caption");

let slideIndex = 0;
let autoSlideActive = true;
const slides = [];

for (let i = 1; i <= 39; i++) {
  const img = document.createElement("img");
  img.src = `assets/fotos/foto (${i}).jpg`;
  img.className = "slide";
  img.style.display = "none";
  img.style.cursor = "pointer";

  img.addEventListener("click", () => {
    autoSlideActive = false;
  });

  slideContainer.appendChild(img);
  slides.push(img);
}

function showSlide(n) {
  slides.forEach(slide => slide.style.display = "none");
  slides[n].style.display = "block";
  caption.innerText = frases[n % frases.length];
}

function changeSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  showSlide(slideIndex);
}

function autoSlide() {
  if (autoSlideActive) {
    slideIndex++;
    if (slideIndex >= slides.length) slideIndex = 0;
    showSlide(slideIndex);
  }
  setTimeout(autoSlide, 3000);
}

showSlide(slideIndex);
setTimeout(autoSlide, 3000);
