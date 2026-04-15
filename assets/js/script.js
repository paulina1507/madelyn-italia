document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const indicator = document.getElementById("indicator");

  let index = 0;

  function update() {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });

    indicator.textContent = `${index + 1} / ${slides.length}`;
  }

  document.getElementById("next").onclick = () => {
    if (index < slides.length - 1) index++;
    update();
  };

  document.getElementById("prev").onclick = () => {
    if (index > 0) index--;
    update();
  };

  // WhatsApp link dinámico
  const waNumber = "525645481346";
  const waMessage =
    "¡Hola! Confirmo con mucha emoción mi asistencia al cumpleaños de Madelyn Italia ¡Nos vemos en su gran día!";

  document.getElementById("waLink").href =
    `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  update();

  const intro = document.getElementById("introScreen");
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const musicIcon = document.getElementById("musicIcon");

  intro.addEventListener("click", () => {
    music.volume = 0.5;
    music.play();

    musicBtn.classList.add("playing");
    musicIcon.src = "assets/img/pause.svg";

    intro.classList.add("hidden");

    setTimeout(() => {
      intro.remove();
    }, 600);
  });

  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicBtn.classList.add("playing");
      musicIcon.src = "assets/img/pause.svg";
    } else {
      music.pause();
      musicBtn.classList.remove("playing");
      musicIcon.src = "assets/img/play.svg";
    }
  });

  // ===== LIGHTBOX con flechas =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const cerrar = document.getElementById("cerrar");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");

  const galleryImgs = Array.from(document.querySelectorAll(".galeria img"));
  let currentImgIndex = 0;

  function openAt(i) {
    currentImgIndex = (i + galleryImgs.length) % galleryImgs.length;
    lightboxImg.src = galleryImgs[currentImgIndex].src;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function nextImg() {
    openAt(currentImgIndex + 1);
  }

  function prevImg() {
    openAt(currentImgIndex - 1);
  }

  galleryImgs.forEach((img, i) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openAt(i);
    });
  });

  lbNext.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImg();
  });

  lbPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImg();
  });

  cerrar.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener("click", closeLightbox);

  // Evita que click en la imagen cierre
  lightboxImg.addEventListener("click", (e) => e.stopPropagation());

  // Teclado (PC)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImg();
    if (e.key === "ArrowLeft") prevImg();
  });

  // Swipe (móvil)
  let startX = 0;
  lightbox.addEventListener(
    "touchstart",
    (e) => {
      if (!lightbox.classList.contains("active")) return;
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      if (!lightbox.classList.contains("active")) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;

      const threshold = 45;
      if (dx < -threshold) nextImg();
      if (dx > threshold) prevImg();
    },
    { passive: true },
  );
  const particlesContainer = document.querySelector(".particles");

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("span");
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = 6 + Math.random() * 6 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.width = particle.style.height = 4 + Math.random() * 6 + "px";
    particlesContainer.appendChild(particle);
  }
});

const fechaEvento = new Date("2026-05-09T15:00:00").getTime();
// Año, Mes (0=Enero, 2=Marzo), Día, Hora en formato 24h

const contador = setInterval(function () {
  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("dias").innerText = dias.toString().padStart(2, "0");
  document.getElementById("horas").innerText = horas
    .toString()
    .padStart(2, "0");
  document.getElementById("minutos").innerText = minutos
    .toString()
    .padStart(2, "0");
  document.getElementById("segundos").innerText = segundos
    .toString()
    .padStart(2, "0");

  if (diferencia < 0) {
    clearInterval(contador);
    document.querySelector(".contador-regresivo").innerHTML =
      "<p>¡La fiesta ya comenzó! 🎉👑</p>";
  }
}, 1000);
