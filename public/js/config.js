/**
 * ====================================================================
 * SAVORA RESTAURANT TEMPLATE #01 — CENTRALIZED CONFIGURATION
 * ====================================================================
 * 
 * Instructions:
 * Edit the properties in this file to customize the brand, contact
 * details, social links, and business hours across the entire website.
 * 
 * IMPORTANT:
 * REPLACE BEFORE CLIENT DELIVERY
 * ====================================================================
 */

const SAVORA_CONFIG = {
  // Brand Identity
  businessName: "SAVORA",
  subtitle: "Modern Kitchen & Dining",
  tagline: "Good Food. Beautifully Served.",
  shortDescription: "Thoughtful dishes, warm hospitality and an inviting dining room made for memorable meals.",
  establishedYear: "2021",

  // Contact Information
  /* REPLACE BEFORE CLIENT DELIVERY */
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  email: "hello@savora.example",
  reservationEmail: "reservations@savora.example",
  
  // WhatsApp Configuration
  /* REPLACE BEFORE CLIENT DELIVERY — Format: CountryCode + Number without + or spaces */
  whatsappNumber: "919999999999",
  whatsappMessage: "Hi SAVORA, I'd like to enquire about a table reservation.",

  // Physical Location
  /* REPLACE BEFORE CLIENT DELIVERY */
  address: "18 Heritage Lane",
  city: "New Delhi, India",
  postalCode: "110001",
  landmark: "Near Arts & Cultural Precinct",
  mapsUrl: "https://maps.google.com/?q=18+Heritage+Lane+New+Delhi+India",

  // Operating Hours
  openingHours: {
    weekday: "12:00 PM – 10:30 PM", // Mon–Thu
    weekend: "12:00 PM – 11:30 PM", // Fri–Sat
    sunday: "12:00 PM – 10:00 PM"   // Sun
  },

  // Social Channels
  /* REPLACE WITH ACTUAL SOCIAL URL */
  instagram: "https://instagram.com/savoradining",
  facebook: "https://facebook.com/savoradining",
  youtube: "https://youtube.com/@savoradining",
  socialHandle: "@savoradining",

  // Reservation Settings
  currencySymbol: "₹",
  maxGuestCount: 8,
  reservationAdvanceDays: 30,

  // Helper method to build WhatsApp URL
  getWhatsAppLink(customMsg) {
    const message = customMsg || this.whatsappMessage;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
};

// Freeze configuration to avoid accidental runtime mutations
Object.freeze(SAVORA_CONFIG);
Object.freeze(SAVORA_CONFIG.openingHours);

if (typeof window !== "undefined") {
  window.SAVORA_CONFIG = SAVORA_CONFIG;
}
