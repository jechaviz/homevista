import { products } from './products';

export const allDemoProducts = products.map(product => ({
  ...product,
  colors: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].slice(0, Math.floor(Math.random() * 4) + 1)
}));

export const demoServices = [
  {
    id: 1,
    title: 'Interior Design Consultation',
    description: 'Get expert advice on your home interior design with our professional consultation service. We\'ll help you create a space that reflects your style and meets your needs.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerName: 'Jane Doe',
    providerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4.8,
    reviews: 32,
    category: 'Interior Design',
    duration: '2 hours',
    serviceType: 'Consultation',
    portfolio: [
      {
        title: 'Modern Living Room',
        description: 'A sleek and contemporary living room design with minimalist furniture and bold accents.',
        images: [
          'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        personnelRequired: '1 designer, 2 assistants',
        timeToComplete: '4 weeks',
        cost: 5000,
      },
      {
        title: 'Cozy Bedroom',
        description: 'A warm and inviting bedroom design with soft textures and calming colors.',
        images: [
          'https://images.unsplash.com/photo-1617325247661-675ab4b64b12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618377385526-83312906f0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        personnelRequired: '1 designer, 1 assistant',
        timeToComplete: '3 weeks',
        cost: 3500,
      },
      {
        title: 'Minimalist Kitchen',
        description: 'A clean and functional kitchen design with sleek appliances and ample storage.',
        images: [
          'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556912167-f556f1f39faa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        personnelRequired: '1 designer, 2 assistants, 1 contractor',
        timeToComplete: '6 weeks',
        cost: 8000,
      }
    ],
    serviceAreas: ['10001', '10002', '10003', '10004', '10005'],
    transportationFee: 50,
  },
  {
    id: 2,
    title: 'Landscape Design',
    description: 'Transform your outdoor space with our professional landscaping service. We\'ll create a beautiful and functional garden that complements your home and lifestyle.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerName: 'John Smith',
    providerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.6,
    reviews: 28,
    category: 'Landscaping',
    duration: '3 hours',
    serviceType: 'Design',
    portfolio: [
      {
        title: 'Modern Zen Garden',
        description: 'A peaceful and low-maintenance garden with clean lines and natural elements.',
        images: [
          'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        personnelRequired: '1 designer, 3 landscapers',
        timeToComplete: '2 weeks',
        cost: 7500,
      },
      // Add more portfolio items as needed
    ],
    serviceAreas: ['20001', '20002', '20003', '20004', '20005'],
    transportationFee: 75,
  },
  // Add more services here...
];

export const demoUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
    role: 'customer',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password456',
    role: 'vendor',
  },
  // Add more users as needed
];

export const demoVendors = [
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
  // Add more vendors as needed
];

export const demoAdmins = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'adminpassword',
  },
  // Add more admin users if needed
];
