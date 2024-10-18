import { Service } from '../../types';

export const demoServices: Service[] = [
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
    serviceType: 'Consultation',
    duration: '2 hours',
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
      // Add more portfolio items...
    ],
    serviceAreas: ['10001', '10002', '10003', '10004', '10005'],
    transportationFee: 50,
  },
  // Add more demo services here...
];