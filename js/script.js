
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
  }, { threshold: 0 });

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

// navbar layout open and close//
function toggleMenu(el) {
  el.classList.toggle("active");
  document.querySelector(".nav-links").classList.toggle("show");
  
}

function closeMenu() {
  document.querySelector(".nav-links").classList.remove("show");
  document.querySelector(".hamburger").classList.remove("active");
  
}

// detect outside click
document.addEventListener("click", function (event) {
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");

  // if menu is open AND clicked outside nav + not on hamburger
  if (
    document.querySelector(".nav-links").classList.contains("show") &&
    !nav.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    closeMenu();
  }
});



// Mobile dropdown toggle
document.querySelectorAll(".dropdown > a").forEach(dropdownToggle => {
  dropdownToggle.addEventListener("click", function(e) {
    if (window.innerWidth <= 768) { // only mobile
      e.preventDefault();
      let submenu = this.nextElementSibling;

      // Close other open dropdowns first
      document.querySelectorAll(".dropdown-content.show").forEach(openMenu => {
        if (openMenu !== submenu) openMenu.classList.remove("show");
      });

      // Toggle current submenu
      submenu.classList.toggle("show");
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", function(e) {
  if (window.innerWidth <= 768) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-content.show").forEach(openMenu => {
        openMenu.classList.remove("show");
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".zoomable");
  let lastTap = 0;

  img.addEventListener("touchend", function (e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      img.classList.toggle("zoomed");
      e.preventDefault();
    }

    lastTap = currentTime;
  });
});


