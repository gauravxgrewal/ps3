/**
 * ========================================
 * RESTAURANT CONFIGURATION
 * ========================================
 * 
 * Change this file to customize for any restaurant
 * All settings are centralized here
 * 
 * HOW TO USE:
 * 1. Update restaurant details below
 * 2. Replace images in /public folder
 * 3. Update menu in menuData.js
 * 4. Deploy!
 */

export const RESTAURANT_CONFIG = {
  // Basic Information
  name: 'PS3 FASTFOOD',
  tagline: 'Junction & Ice Cream',
  description: 'Best Pizza & Ice Cream in town. Fast delivery, Fresh ingredients!',
  
  // Contact Details
  contact: {
    phone: '8222006622',
    whatsapp: '918222006622',
    email: 'ps3fastfood@gmail.com',
  },
  
  // Location
  location: {
    address: 'PS3 Fast Food Junction & Ice Cream, Main Market Road',
    area: 'Sector 12, Main Market Road',
    city: 'Your City',
    state: 'Your State',
    pincode: '123456',
    mapLink: 'https://maps.google.com/?q=PS3+FastFood',
  },
  
  // Business Hours
  hours: {
    opening: '11:00 AM',
    closing: '11:00 PM',
    display: 'Open 11:00 AM - 11:00 PM',
    weekendHours: 'Open 11:00 AM - 12:00 AM', // Optional
  },
  
  // Social Media
  social: {
    instagram: 'https://instagram.com/ps3fastfood',
    facebook: 'https://facebook.com/ps3fastfood',
    twitter: 'https://twitter.com/ps3fastfood',
  },
  
  // Ratings & Reviews
  reputation: {
    googleRating: 4.8,
    totalReviews: 113,
    happyCustomers: '1,000+',
    reviewsThisMonth: 113,
    ratingBreakdown: [
      { stars: 5, percent: 86 },
      { stars: 4, percent: 10 },
      { stars: 3, percent: 2 },
      { stars: 2, percent: 1 },
      { stars: 1, percent: 1 }
    ]
  },
  
  // Delivery Settings
  delivery: {
    estimatedTime: '30 mins',
    minimumOrder: 0,
    deliveryFee: 0,
    freeDeliveryAbove: 0,
  },
  
  // Payment Options
  payment: {
    acceptsCash: true,
    acceptsOnline: true,
    acceptsUPI: true,
    gstPercent: 0,
    methods: ['Cash', 'UPI', 'Card', 'Online'],
  },
  
  // Features
  features: [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Hot food at your door in 30 mins.',
      color: 'from-orange-100 to-orange-50'
    },
    {
      icon: '🌿',
      title: 'Fresh Ingredients',
      description: 'Only the finest local produce.',
      color: 'from-green-100 to-green-50'
    },
    
    {
      icon: '💳',
      title: 'Easy Payment',
      description: 'Pay online or cash on delivery.',
      color: 'from-purple-100 to-purple-50'
    }
  ],
  
  // Branding
  branding: {
    primaryColor: '#f97316', // Orange
    secondaryColor: '#dc2626', // Red
    accentColor: '#059669', // Green
    logo: '/logo.png',
    heroImage: '/hero.png',
    favicon: '/logo.png',
  },
  
  // Admin Settings (IMPORTANT: Change these for security)
  admin: {
    // Default admin credentials - MUST BE CHANGED
    defaultPhone: '9999999999',
    defaultPin: '1234',
    // Session timeout in minutes
    sessionTimeout: 120,
  },
  
  // App Settings
  app: {
    version: '2.0.0',
    buildDate: new Date().toISOString(),
    enablePWA: true,
    enableNotifications: true,
  }
};

// Export shortcuts for easy access
export const RESTAURANT_NAME = RESTAURANT_CONFIG.name;
export const PHONE = RESTAURANT_CONFIG.contact.phone;
export const WHATSAPP = RESTAURANT_CONFIG.contact.whatsapp;
export const ADDRESS = RESTAURANT_CONFIG.location.address;
export const DELIVERY_TIME = RESTAURANT_CONFIG.delivery.estimatedTime;

export default RESTAURANT_CONFIG;
