export interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  subcategory: string;
  colors: string[];
  description: string;
  specifications: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  providerName: string;
  providerImage: string;
  rating: number;
  reviews: number;
  category: string;
  serviceType: string;
  duration: string;
  portfolio: PortfolioItem[];
  serviceAreas: string[];
  transportationFee: number;
}

export interface PortfolioItem {
  title: string;
  description: string;
  images: string[];
  personnelRequired: string;
  timeToComplete: string;
  cost: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'vendor' | 'admin';
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  description: string;
  rating: number;
  reviews: number;
  products: number[];
  services: number[];
  company: string;
  salesHistory: SaleItem[];
}

export interface SaleItem {
  id: number;
  date: string;
  total: number;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
}