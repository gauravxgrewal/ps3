import { APP_CONFIG } from '../data/constants';

/**
 * Send Order via WhatsApp
 * @param {Array} cart - Cart items
 * @param {Number} total - Total amount
 * @param {String} orderId - Unique order ID
 * @param {String} paymentMethod - Payment method (cash/online/whatsapp)
 */
export const sendWhatsAppOrder = (cart = [], total = 0, orderId = null, paymentMethod = 'whatsapp') => {
  const { whatsappNumber } = APP_CONFIG;
  const time = new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  const date = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  
  if (!cart || cart.length === 0) {
    const message = encodeURIComponent('Hello PS3, I want to place an order.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    return;
  }

  // Create WhatsApp message
  let message = `🍕 *NEW ORDER FROM PS3 FASTFOOD* 🍕\n\n`;
  message += `🆔 *Order ID:* ${orderId || 'N/A'}\n`;
  message += `📅 *Date:* ${date}\n`;
  message += `⏰ *Time:* ${time}\n`;
  message += `━━━━━━━━━━━━━━━━\n\n`;
  
  message += `📋 *ORDER ITEMS:*\n\n`;
  
  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    if (item.size) message += `   📏 Size: ${item.size}\n`;
    message += `   🔢 Qty: ${item.quantity}\n`;
    message += `   💰 Price: ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━\n\n`;
  
  // Add bill summary
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 299 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const finalTotal = subtotal + deliveryFee + tax;
  
  message += `💵 *BILL SUMMARY:*\n`;
  message += `   Item Total: ₹${subtotal}\n`;
  message += `   Delivery: ${deliveryFee === 0 ? 'FREE 🎉' : '₹' + deliveryFee}\n`;
  message += `   GST (5%): ₹${tax}\n`;
  message += `   ━━━━━━━━━\n`;
  message += `   *TOTAL: ₹${finalTotal}*\n\n`;
  
  // Add payment method
  const paymentEmoji = {
    'cash': '💵',
    'online': '💳',
    'whatsapp': '📱'
  };
  
  message += `${paymentEmoji[paymentMethod] || '💰'} *Payment:* ${
    paymentMethod === 'cash' ? 'Cash on Delivery' : 
    paymentMethod === 'online' ? 'Paid Online ✅' : 
    'To be decided'
  }\n\n`;
  
  message += `━━━━━━━━━━━━━━━━\n`;
  message += `📍 Please confirm my order and delivery address.\n`;
  message += `🙏 Thank you!`;
  
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
};

/**
 * Open WhatsApp Chat
 */
export const openWhatsAppChat = () => {
  const { whatsappNumber } = APP_CONFIG;
  const message = encodeURIComponent('Hello PS3, I have a question regarding the menu.');
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
};

/**
 * Call Restaurant
 */
export const callRestaurant = () => {
  const { phoneNumber } = APP_CONFIG;
  window.open(`tel:${phoneNumber}`);
};

/**
 * Share Order Status on WhatsApp
 */
export const shareOrderStatus = (orderId, status) => {
  const { whatsappNumber } = APP_CONFIG;
  const message = encodeURIComponent(
    `Hi PS3, I want to check the status of my order.\n\n` +
    `Order ID: ${orderId}\n` +
    `Current Status: ${status}`
  );
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
};