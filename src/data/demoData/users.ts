import { User, Vendor, Admin } from '../../types';

export const demoUsers: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
    role: 'customer',
  },
  // Add more demo users...
];

export const demoVendors: Vendor[] = [
  {
    id: 1,
    name: 'Home Decor Experts',
    email: 'info@homedecorexperts.com',
    description: 'We specialize in creating beautiful and functional living spaces.',
    rating: 4.7,
    reviews: 120,
    products: [1, 2, 3], // Product IDs
    services: [1], // Service IDs
    company: 'Home Decor Experts LLC',
    salesHistory: [
      { id: 1, date: '2023-03-15', total: 1500 },
      { id: 2, date: '2023-03-20', total: 2200 },
      // Add more sales history items
    ],
  },
  // Add more demo vendors...
];

export const demoAdmins: Admin[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'adminpassword',
  },
  // Add more demo admins if needed
];