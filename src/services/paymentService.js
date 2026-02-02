const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export const processPayment = async (paymentDetails) => {
  const { paymentMethod, orderData } = paymentDetails;

  // 1. SEPARATION: COD ke liye Razorpay call hi nahi hogi
  if (paymentMethod === 'cash') {
    return {
      success: true,
      paymentMethod: 'cash',
      paymentId: `COD-${Date.now()}`,
      verified: true
    };
  }

  // 2. Online Payment logic
  try {
    const res = await createRazorpayOrder(orderData);
    return res;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createRazorpayOrder = async (orderDetails) => {
  try {
    const { amount, customerName, customerPhone, customerEmail, orderId } = orderDetails;

    // Razorpay prefill settings with Fallbacks for missing data
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, 
      currency: 'INR',
      name: 'PS3 FastFood',
      description: `Order #${orderId}`,
      prefill: {
        name: customerName || 'Guest',
        email: customerEmail || `${customerPhone}@ps3food.com`, // Fixed Email Warning
        contact: customerPhone || ''
      },
      theme: { color: '#f97316' },
      handler: function(response) {
         // Direct resolve for testing/local; ideally verify with backend
         window.rzp_resolve({ success: true, paymentId: response.razorpay_payment_id, verified: true });
      }
    };

    return new Promise((resolve) => {
      window.rzp_resolve = resolve;
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  } catch (error) {
    return { success: false, error: "Payment failed to start" };
  }
};

export const getPaymentMethods = () => [
  { id: 'online', name: 'Online', icon: '💳' },
  { id: 'cash', name: 'Cash', icon: '💵' }
];