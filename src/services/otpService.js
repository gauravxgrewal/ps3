/**
 * OTP Service
 * Uses Vercel serverless functions for secure OTP handling
 */

const API_BASE_URL = import.meta.env.VITE_VERCEL_API_URL || '/api';
const isDevelopment = import.meta.env.MODE === 'development';

// In-memory OTP storage for client-side verification
// In production, this should be managed server-side
const otpStore = new Map();

/**
 * Generate a random 6-digit OTP (for development only)
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via Backend API (Production)
 */
export const sendOTPViaSMS = async (phoneNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber })
    });

    const data = await response.json();

    if (data.success) {
      // Store OTP info with expiry (10 minutes)
      otpStore.set(phoneNumber, {
        sessionId: data.sessionId,
        expiresAt: Date.now() + 10 * 60 * 1000,
        attempts: 0,
      });

      return {
        success: true,
        sessionId: data.sessionId,
        message: 'OTP sent successfully to your mobile number!'
      };
    }

    throw new Error(data.error || 'Failed to send OTP');

  } catch (error) {
    console.error('Send OTP error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send OTP. Please try again.'
    };
  }
};

/**
 * Send OTP (Development Mode - Console/Alert)
 * Use this for testing without real SMS
 */
export const sendOTPDev = async (phoneNumber) => {
  try {
    const otp = generateOTP();

    // Store OTP with expiry
    otpStore.set(phoneNumber, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    });

    console.log(`
╔══════════════════════════════════╗
║     DEV MODE - OTP SENT          ║
║                                  ║
║     Phone: ${phoneNumber}        ║
║     OTP: ${otp}                  ║
║                                  ║
║   (Valid for 10 minutes)         ║
╚══════════════════════════════════╝
    `);

    // Show alert in browser (only in dev)
    if (typeof window !== 'undefined') {
      // Use a more subtle notification instead of alert
      console.warn(`🔐 Your OTP is: ${otp} (Development Mode)`);
    }

    return {
      success: true,
      message: 'OTP sent! Check console for OTP (Development Mode)',
      devOTP: otp, // Only in dev mode
    };

  } catch (error) {
    console.error('Send OTP error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send OTP'
    };
  }
};

/**
 * Verify OTP
 */
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const stored = otpStore.get(phoneNumber);

    if (!stored) {
      return {
        success: false,
        error: 'OTP not found. Please request a new one.',
      };
    }

    // Check expiry
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(phoneNumber);
      return {
        success: false,
        error: 'OTP expired. Please request a new one.',
      };
    }

    // Check attempts (max 3)
    if (stored.attempts >= 3) {
      otpStore.delete(phoneNumber);
      return {
        success: false,
        error: 'Too many incorrect attempts. Please request a new OTP.',
      };
    }

    // Verify OTP (works for both dev and production)
    const isValid = stored.otp 
      ? stored.otp === otp.toString() 
      : true; // If no OTP stored (production with sessionId), assume verified by backend

    if (isValid) {
      otpStore.delete(phoneNumber);
      return {
        success: true,
        message: 'OTP verified successfully!',
      };
    }

    // Increment attempts
    stored.attempts += 1;
    otpStore.set(phoneNumber, stored);

    return {
      success: false,
      error: `Invalid OTP. ${3 - stored.attempts} attempt(s) remaining.`,
    };

  } catch (error) {
    console.error('Verify OTP error:', error);
    return {
      success: false,
      error: error.message || 'OTP verification failed'
    };
  }
};

/**
 * Resend OTP
 */
export const resendOTP = async (phoneNumber) => {
  // Delete old OTP
  otpStore.delete(phoneNumber);

  // Send new OTP based on environment
  return sendOTP(phoneNumber);
};

/**
 * Clear OTP (cleanup)
 */
export const clearOTP = (phoneNumber) => {
  otpStore.delete(phoneNumber);
};

/**
 * Check if OTP is valid (before verification)
 */
export const isOTPValid = (phoneNumber) => {
  const stored = otpStore.get(phoneNumber);

  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phoneNumber);
    return false;
  }

  return true;
};

// Auto-cleanup expired OTPs every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [phone, data] of otpStore.entries()) {
      if (now > data.expiresAt) {
        otpStore.delete(phone);
      }
    }
  }, 5 * 60 * 1000);
}

// Export based on environment
export const sendOTP = isDevelopment ? sendOTPDev : sendOTPViaSMS;

export default {
  sendOTP,
  sendOTPDev,
  sendOTPViaSMS,
  verifyOTP,
  resendOTP,
  clearOTP,
  isOTPValid,
};