document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideshowBtn = document.getElementById('slideshowBtn');

  let currentIndex = 0;
  let slideshowInterval = null;
  const SLIDESHOW_SPEED = 3000; // 3 seconds per image

  // Collect image data from DOM
  const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return {
      src: img.src,
      alt: img.alt
    };
  });

  // Open Lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable background scrolling
  }

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    stopSlideshow();
  }

  // Update Image View
  function updateLightboxImage() {
    lightboxImg.src = images[currentIndex].src;
    lightboxCaption.textContent = images[currentIndex].alt;
  }

  // Navigation Functions
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  // Slideshow Toggle
  function toggleSlideshow() {
    if (slideshowInterval) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  function startSlideshow() {
    showNext();
    slideshowInterval = setInterval(showNext, SLIDESHOW_SPEED);
    slideshowBtn.textContent = '⏸ Pause Slideshow';
  }

  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      slideshowBtn.textContent = '▶ Start Slideshow';
    }
  }

  // Event Listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', () => { stopSlideshow(); showNext(); });
  prevBtn.addEventListener('click', () => { stopSlideshow(); showPrev(); });
  slideshowBtn.addEventListener('click', toggleSlideshow);

  // Close when clicking overlay background
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') { stopSlideshow(); showNext(); }
    if (e.key === 'ArrowLeft') { stopSlideshow(); showPrev(); }
  });
});


