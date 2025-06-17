export interface User {
  id: string;
  email: string;
  name: string;
  role: 'consumer' | 'provider' | 'admin';
  avatar?: string;
  location?: string;
  phone?: string;
  createdAt: Date;
}

export interface Provider {
  id: string;
  userId: string;
  companyName: string;
  logo?: string;
  description: string;
  website?: string;
  serviceAreas: string[];
  certifications: Certification[];
  services: Service[];
  brands: Brand[];
  gallery: GalleryItem[];
  contactInfo: ContactInfo;
  rating: number;
  reviewCount: number;
  verified: boolean;
  planType: 'basic' | 'premium' | 'enterprise';
  createdAt: Date;
}

export interface Review {
  id: string;
  providerId: string;
  consumerId: string;
  consumerName: string;
  consumerAvatar?: string;
  rating: number;
  title: string;
  content: string;
  photos: string[];
  projectType: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  providerResponse?: string;
  createdAt: Date;
  moderatedAt?: Date;
  moderatorNotes?: string;
}

export interface Lead {
  id: string;
  providerId: string;
  consumerName: string;
  consumerEmail: string;
  consumerPhone: string;
  projectType: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  category: 'installation' | 'maintenance' | 'consulting' | 'financing';
}

export interface Brand {
  id: string;
  name: string;
  category: 'panels' | 'inverters' | 'batteries' | 'mounting';
  logo?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  expiryDate?: Date;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  projectType: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SearchFilters {
  location?: string;
  services?: string[];
  certifications?: string[];
  minRating?: number;
  maxDistance?: number;
  brands?: string[];
  projectTypes?: string[];
}