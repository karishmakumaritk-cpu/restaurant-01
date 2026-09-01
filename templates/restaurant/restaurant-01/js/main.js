/**
 * ====================================================================
 * SAVORA RESTAURANT TEMPLATE #01 — MAIN JAVASCRIPT CONTROLLER
 * ====================================================================
 * Pure Vanilla JavaScript (No frameworks, zero external dependencies)
 * Fully compatible with GitHub Pages & Static Web Hosting
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Central Configuration Hydration
  initConfigurationData();

  // 2. Navigation & Header Scroll State
  initNavigation();

  // 3. Reservation Modal Controller
  initReservationModal();

  // 4. Menu Filtering System
  initMenuFiltering();

  // 5. Gallery Filtering & Lightbox
  initGalleryAndLightbox();

  // 6. Contact Form Controller
  initContactForm();

  // 7. General Accessibility & Year Injection
  initAccessibilityAndFooters();
});

/**
 * Hydrates DOM elements with values from SAVORA_CONFIG
 */
function initConfigurationData() {
  if (typeof SAVORA_CONFIG === "undefined") {
    console.warn("SAVORA_CONFIG is not loaded.");
    return;
  }

  // Populate text elements
  document.querySelectorAll("[data-config-text]").forEach((el) => {
    const key = el.getAttribute("data-config-text");
    if (key && SAVORA_CONFIG[key] !== undefined) {
      el.textContent = SAVORA_CONFIG[key];
    }
  });

  // Populate phone links
  document.querySelectorAll("[data-config-phone]").forEach((el) => {
    el.setAttribute("href", `tel:${SAVORA_CONFIG.phoneRaw}`);
    if (el.textContent.trim() === "" || el.getAttribute("data-config-phone") === "sync") {
      el.textContent = SAVORA_CONFIG.phone;
    }
  });

  // Populate email links
  document.querySelectorAll("[data-config-email]").forEach((el) => {
    el.setAttribute("href", `mailto:${SAVORA_CONFIG.email}`);
    if (el.textContent.trim() === "" || el.getAttribute("data-config-email") === "sync") {
      el.textContent = SAVORA_CONFIG.email;
    }
  });

  // Populate WhatsApp links
  document.querySelectorAll("[data-config-whatsapp]").forEach((el) => {
    const customMsg = el.getAttribute("data-whatsapp-msg") || SAVORA_CONFIG.whatsappMessage;
    el.setAttribute("href", SAVORA_CONFIG.getWhatsAppLink(customMsg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Populate social links
  document.querySelectorAll("[data-config-social]").forEach((el) => {
    const platform = el.getAttribute("data-config-social");
    if (platform && SAVORA_CONFIG[platform]) {
      el.setAttribute("href", SAVORA_CONFIG[platform]);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });

  // Populate maps URL
  document.querySelectorAll("[data-config-maps]").forEach((el) => {
    if (SAVORA_CONFIG.mapsUrl) {
      el.setAttribute("href", SAVORA_CONFIG.mapsUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });
}

/**
 * Mobile Navigation Drawer & Sticky Header
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const toggleBtn = document.querySelector(".mobile-toggle-btn");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");

  // Sticky header shadow on scroll
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
      mobileDrawer.classList.toggle("open");
      
      if (!isExpanded) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });

    // Close mobile drawer when a link is clicked
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggleBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.classList.remove("open");
        document.body.classList.remove("modal-open");
      });
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
        toggleBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.classList.remove("open");
        document.body.classList.remove("modal-open");
        toggleBtn.focus();
      }
    });
  }
}

/**
 * Reservation Modal Dialog
 */
function initReservationModal() {
  const modalBackdrop = document.getElementById("reservationModal");
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector(".modal-close-btn");
  const form = modalBackdrop.querySelector("#reservationForm");
  const feedbackAlert = modalBackdrop.querySelector("#reservationFeedback");
  const dateInput = modalBackdrop.querySelector("#resDate");

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // Open triggers
  const openButtons = document.querySelectorAll("[data-open-reservation], .js-open-reservation");
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  function openModal() {
    modalBackdrop.classList.add("active");
    document.body.classList.add("modal-open");
    modalBackdrop.setAttribute("aria-hidden", "false");

    // Reset feedback
    if (feedbackAlert) {
      feedbackAlert.className = "form-feedback-alert";
      feedbackAlert.style.display = "none";
      feedbackAlert.textContent = "";
    }

    // Focus first input
    const firstInput = modalBackdrop.querySelector("input, select, textarea");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove("active");
    document.body.classList.remove("modal-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close on outside click
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });

  // Form submission handling
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear existing errors
      form.querySelectorAll(".form-control").forEach((input) => {
        input.classList.remove("error");
      });
      form.querySelectorAll(".form-error-msg").forEach((msg) => msg.remove());

      // Validate required fields
      const requiredInputs = form.querySelectorAll("[required]");
      requiredInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          markInputError(input, "This field is required.");
        }
      });

      // Validate email format
      const emailInput = form.querySelector("#resEmail");
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          markInputError(emailInput, "Please enter a valid email address.");
        }
      }

      // Validate phone format
      const phoneInput = form.querySelector("#resPhone");
      if (phoneInput && phoneInput.value.trim()) {
        const phoneDigits = phoneInput.value.replace(/\D/g, "");
        if (phoneDigits.length < 8) {
          isValid = false;
          markInputError(phoneInput, "Please enter a valid contact number.");
        }
      }

      if (isValid) {
        // Successful validation — Show demo submission state
        if (feedbackAlert) {
          feedbackAlert.className = "form-feedback-alert success";
          feedbackAlert.style.display = "block";
          feedbackAlert.innerHTML = `
            <strong>Thank you! Your reservation request has been submitted.</strong><br>
            <span style="font-size: 0.85rem; opacity: 0.9;">Our host team will review availability and send confirmation to ${emailInput ? emailInput.value : 'your email'}.</span>
          `;
        }

        form.reset();

        // Optional auto-dismiss after 6 seconds
        setTimeout(() => {
          if (modalBackdrop.classList.contains("active")) {
            closeModal();
          }
        }, 5000);
      }
    });
  }

  function markInputError(inputEl, message) {
    inputEl.classList.add("error");
    const errorSpan = document.createElement("span");
    errorSpan.className = "form-error-msg";
    errorSpan.textContent = message;
    inputEl.parentNode.appendChild(errorSpan);
  }
}

/**
 * Menu Category Filtering (Vanilla JS)
 */
function initMenuFiltering() {
  const filterBtns = document.querySelectorAll("[data-menu-filter]");
  const menuItems = document.querySelectorAll("[data-menu-category]");

  if (filterBtns.length === 0 || menuItems.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetCategory = btn.getAttribute("data-menu-filter");

      // Update active button state
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Filter item visibility
      menuItems.forEach((item) => {
        const itemCategories = item.getAttribute("data-menu-category").toLowerCase().split(" ");
        if (targetCategory === "all" || itemCategories.includes(targetCategory.toLowerCase())) {
          item.style.display = "";
          item.style.opacity = "1";
        } else {
          item.style.display = "none";
          item.style.opacity = "0";
        }
      });
    });
  });
}

/**
 * Gallery Filtering and Accessible Lightbox Modal
 */
function initGalleryAndLightbox() {
  const galleryFilterBtns = document.querySelectorAll("[data-gallery-filter]");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightboxModal = document.getElementById("galleryLightbox");

  // 1. Gallery Filtering
  if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetCategory = btn.getAttribute("data-gallery-filter");

        galleryFilterBtns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        galleryItems.forEach((item) => {
          const itemCat = item.getAttribute("data-category") || "";
          if (targetCategory === "all" || itemCat.toLowerCase() === targetCategory.toLowerCase()) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // 2. Lightbox Controller
  if (!lightboxModal) return;

  const lightboxImg = lightboxModal.querySelector(".lightbox-image");
  const lightboxTitle = lightboxModal.querySelector(".lightbox-title");
  const lightboxCounter = lightboxModal.querySelector(".lightbox-counter");
  const closeBtn = lightboxModal.querySelector(".lightbox-close-btn");
  const prevBtn = lightboxModal.querySelector(".lightbox-btn-prev");
  const nextBtn = lightboxModal.querySelector(".lightbox-btn-next");

  let currentIndex = 0;
  let activeItemsList = [];

  function getVisibleGalleryItems() {
    return Array.from(galleryItems).filter((item) => item.style.display !== "none");
  }

  function showLightboxImage(index) {
    activeItemsList = getVisibleGalleryItems();
    if (activeItemsList.length === 0) return;

    if (index < 0) index = activeItemsList.length - 1;
    if (index >= activeItemsList.length) index = 0;
    currentIndex = index;

    const currentItem = activeItemsList[currentIndex];
    const imgEl = currentItem.querySelector("img");
    const title = currentItem.getAttribute("data-title") || imgEl?.getAttribute("alt") || "SAVORA Restaurant";
    const src = currentItem.getAttribute("data-full-image") || imgEl?.getAttribute("src");

    if (lightboxImg && src) {
      lightboxImg.setAttribute("src", src);
      lightboxImg.setAttribute("alt", title);
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = title;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} of ${activeItemsList.length}`;
    }
  }

  function openLightbox(item) {
    activeItemsList = getVisibleGalleryItems();
    const index = activeItemsList.indexOf(item);
    currentIndex = index !== -1 ? index : 0;

    showLightboxImage(currentIndex);
    lightboxModal.classList.add("active");
    document.body.classList.add("modal-open");
    lightboxModal.setAttribute("aria-hidden", "false");
    
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    lightboxModal.setAttribute("aria-hidden", "true");
  }

  // Attach click to gallery items
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  // Lightbox navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showLightboxImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showLightboxImage(currentIndex + 1);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Click outside image to close
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal || e.target.classList.contains("lightbox-image-wrapper")) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showLightboxImage(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      showLightboxImage(currentIndex + 1);
    }
  });
}

/**
 * Contact Form Controller
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const feedbackAlert = document.getElementById("contactFeedback");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear existing errors
    form.querySelectorAll(".form-control").forEach((input) => {
      input.classList.remove("error");
    });
    form.querySelectorAll(".form-error-msg").forEach((msg) => msg.remove());

    // Validate required fields
    const requiredInputs = form.querySelectorAll("[required]");
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        markContactError(input, "Please complete this field.");
      }
    });

    // Validate email
    const emailInput = form.querySelector("#contactEmail");
    if (emailInput && emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        markContactError(emailInput, "Please provide a valid email address.");
      }
    }

    if (isValid) {
      if (feedbackAlert) {
        feedbackAlert.className = "form-feedback-alert success";
        feedbackAlert.style.display = "block";
        feedbackAlert.textContent = "Thank you. Your message has been received. Our hospitality team will be in touch shortly.";
      }
      form.reset();
    }
  });

  function markContactError(inputEl, message) {
    inputEl.classList.add("error");
    const errorSpan = document.createElement("span");
    errorSpan.className = "form-error-msg";
    errorSpan.textContent = message;
    inputEl.parentNode.appendChild(errorSpan);
  }
}

/**
 * Footer copyright year & misc helpers
 */
function initAccessibilityAndFooters() {
  // Current Year
  const yearSpans = document.querySelectorAll("[data-current-year]");
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = String(currentYear);
  });
}
