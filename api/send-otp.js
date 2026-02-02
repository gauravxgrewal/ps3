/**
 * Vercel Serverless Function - Send OTP via SMS
 * 
 * This function sends OTP using 2Factor.in API
 * 
 * Environment Variables Required:
 * - OTP_API_KEY (2Factor.in API key)
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { phoneNumber } = req.body;

    // Validate phone number
    if (!phoneNumber || !/^[6-9]\d{9}$/.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number. Must be 10 digits starting with 6-9'
      });
    }

    // Get API key from environment
    const apiKey = process.env.OTP_API_KEY;

    if (!apiKey) {
      console.error('OTP_API_KEY not configured');
      return res.status(500).json({
        success: false,
        error: 'OTP service not configured'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP via 2Factor.in
    const otpUrl = `https://2factor.in/API/V1/${apiKey}/SMS/${phoneNumber}/${otp}/PS3FastFood`;
    
    const response = await fetch(otpUrl, {
      method: 'GET'
    });

    const data = await response.json();

    if (data.Status === 'Success') {
      return res.status(200).json({
        success: true,
        sessionId: data.Details,
        message: 'OTP sent successfully!',
        // Remove in production: devOTP: otp
      });
    } else {
      throw new Error(data.Details || 'Failed to send OTP');
    }

  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send OTP'
    });
  }
}