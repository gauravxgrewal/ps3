import RESTAURANT_CONFIG from './restaurant.config';

// App Configuration - Derived from Restaurant Config
export const APP_CONFIG = {
  restaurantName: RESTAURANT_CONFIG.name,
  tagline: RESTAURANT_CONFIG.tagline,
  phoneNumber: RESTAURANT_CONFIG.contact.phone,
  whatsappNumber: RESTAURANT_CONFIG.contact.whatsapp,
  email: RESTAURANT_CONFIG.contact.email,
  address: RESTAURANT_CONFIG.location.address,
  googleRating: RESTAURANT_CONFIG.reputation.googleRating,
  totalReviews: RESTAURANT_CONFIG.reputation.totalReviews,
  happyCustomers: RESTAURANT_CONFIG.reputation.happyCustomers,
  reviewsThisMonth: RESTAURANT_CONFIG.reputation.reviewsThisMonth,
  socialMedia: RESTAURANT_CONFIG.social,
  deliveryTime: RESTAURANT_CONFIG.delivery.estimatedTime,
  openingHours: RESTAURANT_CONFIG.hours.display,
};

export const RATING_BREAKDOWN = RESTAURANT_CONFIG.reputation.ratingBreakdown;
export const FEATURES = RESTAURANT_CONFIG.features;

// Routes
export const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  CONTACT: '/contact',
  ORDERS: '/orders',
  PROFILE: '/profile',
  LOGIN: '/login',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  MENU_DETAIL: '/menu/:id'
};

// Payment Configuration
export const PAYMENT_CONFIG = {
  freeDeliveryThreshold: RESTAURANT_CONFIG.delivery.freeDeliveryAbove,
  deliveryFee: RESTAURANT_CONFIG.delivery.deliveryFee,
  gstPercent: RESTAURANT_CONFIG.payment.gstPercent,
  methods: RESTAURANT_CONFIG.payment.methods,
};

// Order Status - Simplified to 3 modes
export const ORDER_STATUS = {
  PENDING: 'pending',      // New order from customer
  CONFIRMED: 'confirmed',   // Staff confirmed - cooking started
  DELIVERED: 'delivered',   // Order delivered to customer
  CANCELLED: 'cancelled'    // Order cancelled
};

export const ORDER_STATUS_LABELS = {
  pending: '🔔 New Order',
  confirmed: '✅ Confirmed',
  delivered: '✨ Delivered',
  cancelled: '❌ Cancelled'
};

export const ORDER_STATUS_COLORS = {
  pending: 'bg-orange-100 text-orange-800',
  confirmed: 'bg-green-100 text-green-800',
  delivered: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin'
};

// Validation Rules
export const VALIDATION = {
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: /^[6-9]\d{9}$/,
  },
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  },
  PIN: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 6,
    PATTERN: /^\d{4,6}$/,
  },
  OTP: {
    LENGTH: 6,
    EXPIRY_MINUTES: 10,
  }
};

// API Endpoints (if using backend)
export const API_ENDPOINTS = {
  SEND_OTP: '/api/auth/send-otp',
  VERIFY_OTP: '/api/auth/verify-otp',
  CREATE_ORDER: '/api/orders/create',
  GET_ORDERS: '/api/orders/list',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'ps3-user',
  CART: 'ps3-cart',
  THEME: 'ps3-theme',
  LANGUAGE: 'ps3-language',
};

// Animation Durations (ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  CART_NOTIFICATION: 2000,
};

// Debounce Delays (ms)
export const DEBOUNCE = {
  SEARCH: 300,
  SCROLL: 150,
  RESIZE: 200,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  SERVER: 'Server error. Please try again later.',
  INVALID_PHONE: 'Please enter a valid 10-digit mobile number',
  INVALID_NAME: 'Please enter your full name (min 3 characters)',
  INVALID_OTP: 'Invalid OTP. Please try again.',
  OTP_EXPIRED: 'OTP expired. Please request a new one.',
  ADMIN_ACCESS_DENIED: 'Access denied. Admin privileges required.',
  SESSION_EXPIRED: 'Session expired. Please login again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  OTP_SENT: 'OTP sent successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};
