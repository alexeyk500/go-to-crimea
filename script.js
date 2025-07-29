// Анимация появления секций
window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const onScroll = () => {
    const trigger = window.innerHeight * 0.92;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < trigger) sec.classList.add('visible');
    });
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // --- Карусель ---
  const track = document.querySelector('.carousel-track');
  const images = Array.from(track.children);
  const btnLeft = document.querySelector('.carousel-btn.left');
  const btnRight = document.querySelector('.carousel-btn.right');
  let current = 1; // начинаем с первого реального слайда

  // Дублируем первый и последний слайды для бесшовного loop
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, images[0]);

  const slides = Array.from(track.children);

  function updateCarousel(animate = true) {
    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = '';
    }
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  btnLeft.addEventListener('click', () => {
    if (current <= 0) return;
    current--;
    updateCarousel();
  });
  btnRight.addEventListener('click', () => {
    if (current >= slides.length - 1) return;
    current++;
    updateCarousel();
  });

  // После перехода на клон быстро возвращаемся на реальный слайд без анимации
  track.addEventListener('transitionend', () => {
    if (current === 0) {
      current = slides.length - 2;
      updateCarousel(false);
    }
    if (current === slides.length - 1) {
      current = 1;
      updateCarousel(false);
    }
  });

  // Свайп для мобильных
  let startX = null;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    let dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) {
      btnLeft.click();
    } else if (dx < -40) {
      btnRight.click();
    }
    startX = null;
  });

  // Изначально показываем первый реальный слайд
  updateCarousel(false);
}); 