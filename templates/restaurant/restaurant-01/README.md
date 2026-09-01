# SAVORA — Modern Kitchen & Dining
### Premium Restaurant Website Template #01 — Commercial Package (₹1,999)

SAVORA is a production-ready, high-converting commercial restaurant website template built with semantic HTML5, modern CSS3, and lightweight Vanilla JavaScript. Designed for modern bistros, contemporary Indian restaurants, fine-casual eateries, and multi-cuisine dining rooms.

---

## 1. Project Overview

* **Brand:** SAVORA
* **Subtitle:** Modern Kitchen & Dining
* **Tagline:** Good Food. Beautifully Served.
* **Design Aesthetic:** Modern Editorial (Warm Ivory, Deep Charcoal, Muted Terracotta, Soft Beige, Copper Accents)
* **Target Audience:** Restaurants, bistros, boutique dining, cafes with full dining services.
* **Tech Stack:** Pure Static HTML5 / CSS3 / Vanilla JS (Zero build dependencies, zero frameworks, 100% GitHub Pages ready).

---

## 2. Features

* **5 Distinct HTML Pages:** Full multi-page static architecture (`index.html`, `about.html`, `menu.html`, `gallery.html`, `contact.html`).
* **Centralized Configuration (`js/config.js`):** Change restaurant name, phone, WhatsApp, hours, address, and social links in one file.
* **Interactive Menu System:** Dynamic Vanilla JS tab filtering (All, Starters, Mains, Pasta & Bowls, Desserts, Drinks) with 20+ realistic menu items in INR (₹).
* **Editorial Photo Gallery & Lightbox:** Masonry layout with category filtering and an accessible, keyboard-navigable Lightbox (Previous, Next, Esc, click outside to close, image counter).
* **Frontend Table Reservation Modal:** Accessible modal dialog with field validation (Date, Time, Guest count 1-8+, Special Requests) and clear feedback messaging.
* **Direct WhatsApp Integration:** Auto-formatted `https://wa.me/` links with prefilled enquiry messages.
* **Executive Chef Spotlight:** Highlight the culinary leadership (Chef Arjun Mehta) and philosophy.
* **Verified Accessibility & SEO:** ARIA landmarks, WCAG-compliant color contrast, responsive typography, OpenGraph meta tags, and Restaurant JSON-LD schema.

---

## 3. Pages Included

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | `index.html` | Hero section, credibility badges, our story teaser, 4 featured dishes, menu preview, signature banner, 4 features, chef section, guest reviews, Instagram grid, reservation CTA. |
| **About** | `about.html` | Brand heritage, culinary philosophy, kitchen leadership bio, private dining and celebration event packages. |
| **Menu** | `menu.html` | Comprehensive 22+ item restaurant menu with category tabs, dietary indicators, and INR pricing. |
| **Gallery** | `gallery.html` | Curated visual journal with category filters (Food, Interior, Drinks, Events) and full-screen Lightbox modal. |
| **Contact** | `contact.html` | Physical address, phone, email, structured opening hours table, WhatsApp direct button, message form, and location map. |

---

## 4. Folder Structure

```text
templates/restaurant/restaurant-01/
├── index.html                  # Home page
├── about.html                  # About & philosophy page
├── menu.html                   # Interactive full menu page
├── gallery.html                # Gallery & lightbox page
├── contact.html                # Contact, hours & map page
│
├── css/
│   └── style.css               # Master CSS design system & responsive rules
│
├── js/
│   ├── config.js               # Centralized business configuration
│   └── main.js                 # Vanilla JS logic (Menu, Gallery, Lightbox, Modals)
│
├── assets/
│   ├── favicon.svg             # Custom SVG brand monogram
│   └── images/                 # Photo assets folder
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages static deployment workflow
│
└── README.md                   # Complete commercial documentation
```

---

## 5. Business Configuration Guide (`js/config.js`)

All essential business information can be modified directly in `js/config.js`:

```javascript
const SAVORA_CONFIG = {
  // Brand Identity
  businessName: "SAVORA",
  subtitle: "Modern Kitchen & Dining",
  tagline: "Good Food. Beautifully Served.",
  
  // Contact Information
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  email: "hello@savora.example",
  reservationEmail: "reservations@savora.example",
  
  // WhatsApp Configuration (CountryCode + Number without + or dashes)
  whatsappNumber: "919999999999",
  whatsappMessage: "Hi SAVORA, I'd like to enquire about a table reservation.",

  // Physical Address
  address: "18 Heritage Lane",
  city: "New Delhi, India",
  postalCode: "110001",
  mapsUrl: "https://maps.google.com/?q=18+Heritage+Lane+New+Delhi+India",

  // Operating Hours
  openingHours: {
    weekday: "12:00 PM – 10:30 PM",
    weekend: "12:00 PM – 11:30 PM",
    sunday: "12:00 PM – 10:00 PM"
  },

  // Social Channels
  instagram: "https://instagram.com/savoradining",
  facebook: "https://facebook.com/savoradining",
  youtube: "https://youtube.com/@savoradining"
};
```

---

## 6. How to Customize for a New Client

### A. Change Restaurant Name & Branding
1. Open `js/config.js` and change `businessName`, `subtitle`, and `tagline`.
2. Update the `<title>` and `<meta>` tags in each `.html` file.
3. Update `assets/favicon.svg` with your client's initial or logo icon.

### B. Change Colors & Typography
Open `css/style.css` and customize the root variables:
```css
:root {
  --color-bg: #FBF9F5;               /* Canvas Ivory */
  --color-surface-dark: #171614;     /* Deep Charcoal */
  --color-accent-terracotta: #C86A4B;/* Primary Brand Accent */
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
}
```

### C. Update Menu Items & Prices
Open `menu.html` or `index.html` and edit the menu item cards:
```html
<div class="menu-item-row" data-menu-category="starters">
  <div class="menu-item-top">
    <h3 class="menu-item-name">Dish Name</h3>
    <span class="menu-item-price">₹495</span>
  </div>
  <p class="menu-item-details">Detailed description of ingredients and preparation.</p>
  <span class="menu-item-tag">Starter • Vegetarian</span>
</div>
```

### D. Connect Reservation Form to a Backend Service
In `js/main.js`, locate `initReservationModal()`:
* Replace the `form.addEventListener("submit", ...)` block with your preferred webhook, EmailJS, Formspree, or backend API endpoint:
```javascript
fetch("https://api.yourbackend.com/reservations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, phone, email, date, time, guests, special })
});
```

---

## 7. GitHub Pages Deployment

This template is configured to deploy directly to GitHub Pages:

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site.

---

## 8. Client Delivery Checklist

Before handing the final website over to your dining client:

- [ ] Updated `js/config.js` with client's verified phone, email, WhatsApp, and hours.
- [ ] Replaced demo chef details (name, photo, bio) with actual kitchen staff.
- [ ] Updated menu items, descriptions, and regional currency pricing.
- [ ] Replaced demo testimonials with genuine Google/Zomato customer reviews.
- [ ] Verified WhatsApp booking link on mobile devices.
- [ ] Replaced Google Maps link with the client's actual Google Business Profile URL.
- [ ] Tested all 5 pages across mobile, tablet, and desktop viewports.

---

&copy; 2026 SAVORA. All Rights Reserved. Commercial Template Package.
