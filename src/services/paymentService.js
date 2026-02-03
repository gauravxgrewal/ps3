const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

// Backend endpoints (Vercel serverless functions)
const CREATE_ORDER_ENDPOINT = '/api/create-order';
const VERIFY_PAYMENT_ENDPOINT = '/api/verify-payment';

/**
 * High-level payment processor used by the checkout flow.
 * - For COD: returns a verified payment object without hitting Razorpay
 * - For Online: creates a Razorpay order on the backend, opens the checkout,
 *   then verifies the payment signature via the backend before resolving success
 */
export const processPayment = async (paymentDetails) => {
  const { paymentMethod, orderData } = paymentDetails;

  // Cash on Delivery never touches Razorpay
  if (paymentMethod === 'cash') {
    return {
      success: true,
      paymentMethod: 'cash',
      paymentId: `COD-${Date.now()}`,
      verified: true,
    };
  }

  // Online payment with secure server-side verification
  try {
    const res = await createRazorpayOrder(orderData);
    return res;
  } catch (error) {
    console.error('Payment error:', error);
    return { success: false, error: error.message || 'Payment failed' };
  }
};

/**
 * Create a Razorpay order using the backend and then
 * open the Razorpay checkout widget on the client.
 * Once the user completes payment, we call the backend again
 * to verify the payment signature securely.
 */
export const createRazorpayOrder = async (orderDetails) => {
  try {
    const { amount, customerName, customerPhone, customerEmail, orderId } = orderDetails;

    if (!window.Razorpay) {
      throw new Error('Payment gateway not loaded. Please check Razorpay script.');
    }

    let backendData = null;
    let razorpayOrderId = null;

    // In production we rely on the secure backend endpoints.
    // In local/dev, we gracefully fall back to a direct client-side flow
    // so you can test without configuring Razorpay server creds.
    if (!import.meta.env.DEV) {
      const backendRes = await fetch(CREATE_ORDER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: orderId,
        }),
      });

      // Safely parse JSON (some environments may return empty body or HTML error)
      try {
        const raw = await backendRes.text();
        backendData = raw ? JSON.parse(raw) : {};
      } catch (e) {
        backendData = {};
      }

      if (!backendRes.ok || !backendData?.success) {
        throw new Error(
          backendData?.error ||
            'Payment service not available. Please try COD or contact support.',
        );
      }

      razorpayOrderId = backendData.orderId;
    }

    // 2) Configure Razorpay checkout options
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: (backendData?.amount) || amount * 100, // paise
      currency: backendData?.currency || 'INR',
      name: 'PS3 FastFood',
      description: `Order #${orderId}`,
      ...(razorpayOrderId ? { order_id: razorpayOrderId } : {}),
      prefill: {
        name: customerName || 'Guest',
        email: customerEmail || (customerPhone ? `${customerPhone}@ps3food.com` : 'guest@ps3food.com'),
        contact: customerPhone || '',
      },
      theme: { color: '#f97316' },
      handler: async function (response) {
        // PRODUCTION: verify via backend using secure signature check
        if (!import.meta.env.DEV && razorpayOrderId) {
          try {
            const verifyRes = await fetch(VERIFY_PAYMENT_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            let verifyData = {};
            try {
              const raw = await verifyRes.text();
              verifyData = raw ? JSON.parse(raw) : {};
            } catch {
              verifyData = {};
            }

            if (verifyRes.ok && verifyData?.success && verifyData?.verified) {
              window.rzp_resolve({
                success: true,
                verified: true,
                paymentId: verifyData.paymentId || response.razorpay_payment_id,
              });
            } else {
              window.rzp_resolve({
                success: false,
                verified: false,
                error: verifyData?.error || 'Payment verification failed',
              });
            }
          } catch (err) {
            console.error('Verification error:', err);
            window.rzp_resolve({
              success: false,
              verified: false,
              error: 'Payment verification error',
            });
          }
          return;
        }

        // DEV: trust client-side success so you can test the full flow
        window.rzp_resolve({
          success: true,
          verified: true,
          paymentId: response.razorpay_payment_id || `DEV-${Date.now()}`,
        });
      },
      modal: {
        ondismiss: function () {
          window.rzp_resolve({
            success: false,
            cancelled: true,
            verified: false,
            error: 'Payment cancelled by user',
          });
        },
      },
    };

    // 4) Open Razorpay checkout
    return new Promise((resolve) => {
      window.rzp_resolve = resolve;
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  } catch (error) {
    console.error('Razorpay init error:', error);
    return { success: false, error: 'Payment failed to start' };
  }
};

export const getPaymentMethods = () => [
  { id: 'online', name: 'Online', icon: '💳' },
  { id: 'cash', name: 'Cash', icon: '💵' },
];