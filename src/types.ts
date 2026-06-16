export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  iconName: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  specialties: string[];
  bio: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceIds: string[];
  stylistId: string;
  date: string;
  timeSlot: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  confirmationCode: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discountCode: string;
  discountPercentage: number;
  badge: string;
}
