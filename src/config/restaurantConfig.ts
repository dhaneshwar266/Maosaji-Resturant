/**
 * Central Restaurant Configuration for Maosaji – The Taste of Indian Tradition
 * All phone, WhatsApp, location, and brand information is centralized here.
 * Components must NOT hardcode contact info.
 */

export interface RestaurantConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  city: string;
  state: string;
  locationArea: string;
  phoneDisplay: string;
  phoneTelUrl: string;
  whatsAppNumber: string;
  whatsAppUrl: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  announcement: {
    badge: string;
    message: string;
  };
  pureVegNotice: string;
  reservationDisclaimer: string;
  orderDisclaimer: string;
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "Maosaji – The Taste of Indian Tradition",
  tagline: "The Taste of Indian Tradition",
  heroHeadline: "A Tradition of Taste, Made for Every Occasion.",
  heroSubheadline:
    "Experience genuine Indian hospitality, timeless vegetarian culinary heritage, crispy street delicacies, authentic South Indian flavors, and handcrafted traditional sweets in Bilaspur.",
  city: "Bilaspur",
  state: "Chhattisgarh",
  locationArea: "Srikant Verma Marg (SVM), Bilaspur, Chhattisgarh",
  phoneDisplay: "+91 62664 44862",
  phoneTelUrl: "tel:+916266444862",
  whatsAppNumber: "916266444862",
  whatsAppUrl: "https://wa.me/916266444862",
  googleMapsUrl: "https://maps.app.goo.gl/TTUyALJANCu1Zn4q7",
  coordinates: {
    lat: 22.0727889,
    lng: 82.1515599,
  },
  announcement: {
    badge: "Authentic Vegetarian Dining",
    message:
      "Welcome to Maosaji Bilaspur • Fresh traditional sweets, live chaat, and family dining • WhatsApp ordering & table reservations available",
  },
  pureVegNotice: "100% Pure Vegetarian Kitchen • Prepared Fresh Daily",
  reservationDisclaimer:
    "Please note: Submission prepares a direct WhatsApp reservation request. Your table booking is confirmed only after our restaurant team verifies availability and responds.",
  orderDisclaimer:
    "Order confirmation note: All cart orders are sent directly to our team via WhatsApp for fresh preparation. Any items marked with 'Est.' will have their exact printed price confirmed before dispatch.",
};
