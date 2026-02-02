/**
 * Vercel Serverless Function - Razorpay Payment Verification
 * 
 * This function verifies Razorpay payment signatures securely on the server
 * 
 * Environment Variables Required:
 * - RAZORPAY_KEY_SECRET
 */

import crypto from 'crypto';

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Missing required payment details'
      });
    }

    // Get Razorpay secret from environment
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpaySecret) {
      console.error('RAZORPAY_KEY_SECRET not configured');
      return res.status(500).json({
        success: false,
        verified: false,
        error: 'Payment verification service not configured'
      });
    }

    // Create signature string
    const signatureString = razorpay_order_id 
      ? `${razorpay_order_id}|${razorpay_payment_id}`
      : razorpay_payment_id;

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(signatureString)
      .digest('hex');

    // Verify signature
    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      return res.status(200).json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
        message: 'Payment verified successfully'
      });
    } else {
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Invalid payment signature'
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      verified: false,
      error: 'Payment verification failed'
    });
  }
}