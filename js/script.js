
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

//Zoom Picture//

document.addEventListener("DOMContentLoaded", function () {
  const zoomables = document.querySelectorAll(".zoomable");
  let lastTap = 0;

  function openOverlay(img) {
    
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    // Scrollable container for image
    const container = document.createElement("div");
    container.classList.add("zoomed-container");

    const zoomedImg = document.createElement("img");
    zoomedImg.src = img.src;
    zoomedImg.alt = img.alt;

    container.appendChild(zoomedImg);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    document.body.classList.add("no-scroll");
    

    let state = 0; // 0 = card size, 1 = full screen
    let overlayLastTap = 0;

    // Double-tap zoom in/out
    overlay.addEventListener("touchend", function () {
      const now = new Date().getTime();
      if (now - overlayLastTap < 300) { // double-tap
        if (state === 0) {
          // Zoom to full screen
          zoomedImg.style.width = "100%";
          zoomedImg.style.height = "auto";
          state = 1;
        } else if (state === 1) {
          // Back to card size
          zoomedImg.style.width = "";
          zoomedImg.style.height = "";
          state = 0;
          setTimeout(() => {
            overlay.remove();
            document.body.classList.remove("no-scroll");
            
          }, 200);
        }
      }
      overlayLastTap = now;
    });

    // Optional: close overlay without zooming (tap outside image)
    overlay.addEventListener("click", function(e) {
      if (e.target !== zoomedImg) {
        overlay.remove();
        document.body.classList.remove("no-scroll");
        
      }
    });

    // Optional: add a close button
    const closeBtn = document.createElement("span");
    closeBtn.innerText = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "20px";
    closeBtn.style.fontSize = "30px";
    closeBtn.style.color = "#000000ff";
    closeBtn.style.cursor = "pointer";
    overlay.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
      overlay.remove();
      document.body.classList.remove("no-scroll");
      
    });
  }

  // Attach double-tap listener to all zoomable images
  zoomables.forEach(img => {
    img.addEventListener("touchend", function () {
      const currentTime = new Date().getTime();
      if (currentTime - lastTap < 300) {
        openOverlay(img);
      }
      lastTap = currentTime;
    });
  });
});





