import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import type { CartItem, CustomerOrderInfo, ReservationRequest } from '../types/restaurant';

/**
 * Generates an encoded WhatsApp URL for an online cart order
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  orderInfo: CustomerOrderInfo,
  grandTotal: number
): string {
  const containsEstimated = items.some((item) => item.item.priceEstimated);

  const lines: string[] = [];

  lines.push(`*Namaste! New Order Request for ${RESTAURANT_CONFIG.name}*`);
  lines.push('──────────────────────────────');

  if (orderInfo.customerName && orderInfo.customerName.trim().length > 0) {
    lines.push(`👤 *Customer:* ${orderInfo.customerName.trim()}`);
  }

  const preferenceLabel =
    orderInfo.diningPreference === 'dine-in' ? '🍽️ Dine-In' : '🥡 Takeaway / Parcel';
  lines.push(`📍 *Order Type:* ${preferenceLabel}`);
  lines.push('──────────────────────────────');
  lines.push('*ORDER ITEMS:*');

  items.forEach((cartItem, index) => {
    const item = cartItem.item;
    const lineTotal = item.price * cartItem.quantity;
    const estBadge = item.priceEstimated ? ' *(Est.)*' : '';
    lines.push(
      `${index + 1}. ${item.name}${estBadge}\n   Qty: ${cartItem.quantity} × ₹${item.price} = *₹${lineTotal}*`
    );
  });

  lines.push('──────────────────────────────');
  lines.push(`💰 *Grand Total:* *₹${grandTotal}*`);

  if (orderInfo.notes && orderInfo.notes.trim().length > 0) {
    lines.push('──────────────────────────────');
    lines.push(`📝 *Special Instructions / Notes:*\n${orderInfo.notes.trim()}`);
  }

  if (containsEstimated) {
    lines.push('──────────────────────────────');
    lines.push(
      '⚠️ *Price Transparency Notice:* Some items in this order have estimated prices (*Est.*). Please verify and confirm final bill total before preparing.'
    );
  }

  lines.push('──────────────────────────────');
  lines.push(
    '_Note: This order request was submitted from the Maosaji website. Awaiting restaurant confirmation._'
  );

  const messageText = lines.join('\n');
  return `https://wa.me/${RESTAURANT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Generates an encoded WhatsApp URL for a Table Reservation request
 */
export function generateWhatsAppReservationUrl(reservation: ReservationRequest): string {
  const lines: string[] = [];

  lines.push(`*Namaste! Table Reservation Request for ${RESTAURANT_CONFIG.name}*`);
  lines.push('──────────────────────────────');
  lines.push(`👤 *Guest Name:* ${reservation.customerName}`);
  lines.push(`📞 *Contact Mobile:* +91 ${reservation.mobileNumber}`);
  lines.push(`📅 *Requested Date:* ${reservation.date}`);
  lines.push(`⏰ *Preferred Time Slot:* ${reservation.timeSlot}`);
  lines.push(`👥 *Number of Guests:* ${reservation.guests} Guest(s)`);
  lines.push(`🎉 *Occasion:* ${reservation.occasion}`);

  if (reservation.specialRequests && reservation.specialRequests.trim().length > 0) {
    lines.push('──────────────────────────────');
    lines.push(`📝 *Special Requests / Seating Preference:*\n${reservation.specialRequests.trim()}`);
  }

  lines.push('──────────────────────────────');
  lines.push(
    '⚠️ *Status:* This is a booking inquiry submitted via the website. Table is confirmed only upon WhatsApp reply/acknowledgement by the restaurant team.'
  );

  const messageText = lines.join('\n');
  return `https://wa.me/${RESTAURANT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(messageText)}`;
}
