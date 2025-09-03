
// --- uiux.html reveal ---
const reveals = document.querySelectorAll(".reveal-on-scroll");
if (reveals.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(reveal => observer.observe(reveal));
}


// --- visual.html logo zoom ---
// Zoom button functionality
document.querySelectorAll('.card').forEach(card => {
  const zoomInBtn = card.querySelector('.zoom-in');
  const zoomOutBtn = card.querySelector('.zoom-out');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.remove('active');
    });
  }
});

// Click outside closes zoom
document.addEventListener('click', () => {
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
});

document.querySelectorAll('.card').forEach(card => {
  const zoomOutBtn = card.querySelector('.zoom-out');
  let idleTimer;

  if (zoomOutBtn) {
    // Show button on mouse move inside zoomed card
    card.addEventListener('mousemove', () => {
      if (card.classList.contains('active')) {
        zoomOutBtn.style.display = 'block';
        zoomOutBtn.style.opacity = '1';

        // Reset timer if mouse keeps moving
        clearTimeout(idleTimer);

        // Hide button after 2s of no movement
        idleTimer = setTimeout(() => {
          zoomOutBtn.style.opacity = '0';
          setTimeout(() => {
            zoomOutBtn.style.display = 'none';
          }, 400); // wait for fade out
        }, 1000);
      }
    });

    // Also hide if you leave the card
    card.addEventListener('mouseleave', () => {
      clearTimeout(idleTimer);
      zoomOutBtn.style.opacity = '0';
      setTimeout(() => {
        zoomOutBtn.style.display = 'none';
      }, 400);
    });
  }
});

