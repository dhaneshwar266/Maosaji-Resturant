export type PriceStatus = 'verified' | 'estimated';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  priceStatus: PriceStatus;
  priceEstimated: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type DiningPreference = 'dine-in' | 'takeaway';

export interface CustomerOrderInfo {
  customerName: string;
  diningPreference: DiningPreference;
  notes: string;
}

export interface ReservationRequest {
  customerName: string;
  mobileNumber: string;
  date: string;
  timeSlot: string;
  guests: number;
  occasion: string;
  specialRequests: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  altText: string;
  description: string;
}
