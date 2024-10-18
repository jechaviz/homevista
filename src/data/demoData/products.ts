import { Product } from '../../types';

export const demoProducts: Product[] = [
  {
    id: 1,
    name: 'Modern Sofa',
    price: 999,
    discountedPrice: 849,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.5,
    reviews: 128,
    category: 'Furniture',
    subcategory: 'Living Room',
    colors: ['#1E1E1E', '#F5F5DC', '#708090'],
    description: 'A sleek and comfortable modern sofa perfect for any living room.',
    specifications: [
      '3-seater',
      'Dimensions: 84" W x 38" D x 34" H',
      'Frame material: Solid wood',
      'Upholstery: 100% polyester',
    ],
  },
  // Add more demo products here...
];

export const allDemoProducts = demoProducts.map(product => ({
  ...product,
  colors: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].slice(0, Math.floor(Math.random() * 4) + 1)
}));