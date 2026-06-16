import { Service, Stylist, Review, SpecialOffer } from './types';

export const SERVICES: Service[] = [
  {
    id: 'haircut-styling',
    name: 'Haircut & Styling',
    description: 'Precision cuts shaped to your face and lifestyle, finished with a professional blowout and styling.',
    category: 'Hair',
    price: 399,
    duration: '45 mins',
    iconName: 'Scissors'
  },
  {
    id: 'hair-coloring',
    name: 'Hair Coloring',
    description: 'Balayage, highlights, lowlights, and global color using premium ammonia-free formulas.',
    category: 'Color',
    price: 799,
    duration: '120 mins',
    iconName: 'Palette'
  },
  {
    id: 'skin-care-facial',
    name: 'Skin Care & Facial',
    description: 'Rejuvenating facials with deep exfoliation and dermal treatments for hydration and radiance.',
    category: 'Grooming',
    price: 599,
    duration: '60 mins',
    iconName: 'Sparkles'
  },
  {
    id: 'spa-massage',
    name: 'Spa & Massage',
    description: 'Hot stone, deep tissue, or Swedish massages that release tension and restore balance.',
    category: 'Wellness',
    price: 999,
    duration: '90 mins',
    iconName: 'Leaf'
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure & Pedicure',
    description: 'Complete nail shaping, cuticle care, scrub massage, and long-lasting polish.',
    category: 'Grooming',
    price: 299,
    duration: '50 mins',
    iconName: 'Sparkles'
  },
  {
    id: 'smoothing-treatment',
    name: 'Smoothing Treatment',
    description: 'Keratin reconstruction and protein treatment to eliminate frizz and add a natural shine.',
    category: 'Treatment',
    price: 1499,
    duration: '150 mins',
    iconName: 'Flame'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'director-mahi',
    name: 'Mr. Mahi',
    role: 'Founder & Creative Director',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    specialties: ['Precision Fades', 'Hair Coloring', 'Bridal Styling'],
    bio: 'With over 12 years of experience across top salons in Mumbai and Pune, Mahi brings a rare mix of classic barbering and modern unisex styling.'
  },
  {
    id: 'stylist-priya',
    name: 'Priya Sharma',
    role: 'Senior Color Expert',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80',
    specialties: ['Balayage & Highlights', 'Vibrant Color', 'Keratin Treatments'],
    bio: 'Certified master colorist who creates shades that complement your skin tone and natural hair texture perfectly.'
  },
  {
    id: 'stylist-rahul',
    name: 'Rahul Desai',
    role: 'Grooming & Skin Specialist',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    specialties: ['Facials', 'Beard Styling', 'Therapeutic Massages'],
    bio: 'Specialises in grooming routines for the modern man and woman — from luxury facials to close shaves and scalp treatments.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Rohan Mehta',
    role: 'Regular Client',
    rating: 5,
    text: 'Best haircut I have had in Pune. Mr. Mahi understood exactly what I wanted without me having to explain too much. Will definitely be back.',
    date: '2026-06-01'
  },
  {
    id: 'rev-2',
    author: 'Sneha Kulkarni',
    role: 'Member since 2022',
    rating: 5,
    text: 'Got the facial done and it was genuinely one of the best experiences. My skin felt fresh for days after. The staff is warm and the place is very clean.',
    date: '2026-05-18'
  },
  {
    id: 'rev-3',
    author: 'Amit Joshi',
    role: 'Style Enthusiast',
    rating: 5,
    text: 'Came in for my wedding day styling and they nailed it. The team is professional and makes you feel completely comfortable from the moment you sit down.',
    date: '2026-05-10'
  }
];

export const GALLERY_IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
  legacy_1: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&h=800&q=80',
  legacy_2: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&h=800&q=80',
  sanctuary_tall: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=700&h=1200&q=80',
  sanctuary_top_right: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&h=500&q=80',
  sanctuary_mid_right: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&h=1000&q=80',
  sanctuary_low_right: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&h=600&q=80'
};

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'off-1',
    title: 'First Visit Offer',
    description: 'Get 15% off on any service on your first visit to Mr. Mahi Unisex Salon.',
    discountCode: 'WELCOMEVIP',
    discountPercentage: 15,
    badge: 'FIRST VISIT'
  },
  {
    id: 'off-2',
    title: 'Midweek Special',
    description: 'Book both Haircut & Styling and Skin Care on Tuesday or Wednesday and save ₹150.',
    discountCode: 'MIDWEEK15',
    discountPercentage: 10,
    badge: 'WEEKDAY DEAL'
  }
];
