export const categories = [
  {
    id: 1,
    name: 'Furniture',
    subcategories: [
      { id: 11, name: 'Living Room' },
      { id: 12, name: 'Bedroom' },
      { id: 13, name: 'Dining Room' },
      { id: 14, name: 'Office' },
    ],
  },
  {
    id: 2,
    name: 'Decor',
    subcategories: [
      { id: 21, name: 'Wall Art' },
      { id: 22, name: 'Lighting' },
      { id: 23, name: 'Rugs' },
      { id: 24, name: 'Pillows & Throws' },
    ],
  },
  {
    id: 3,
    name: 'Kitchen & Dining',
    subcategories: [
      { id: 31, name: 'Cookware' },
      { id: 32, name: 'Dinnerware' },
      { id: 33, name: 'Utensils' },
      { id: 34, name: 'Small Appliances' },
    ],
  },
  {
    id: 4,
    name: 'Outdoor',
    subcategories: [
      { id: 41, name: 'Patio Furniture' },
      { id: 42, name: 'Gardening' },
      { id: 43, name: 'Outdoor Lighting' },
      { id: 44, name: 'Grills & Accessories' },
    ],
  },
];

export const products = [
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
  {
    id: 2,
    name: 'Dining Table Set',
    price: 799,
    discountedPrice: 699,
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595516364083-f68b27178638?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.2,
    reviews: 95,
    category: 'Furniture',
    subcategory: 'Dining Room',
    colors: ['#8B4513', '#D2691E'],
    description: 'A stylish dining table set for family gatherings and dinner parties.',
    specifications: [
      '6-seater',
      'Table dimensions: 72" L x 36" W x 30" H',
      'Chair dimensions: 18" W x 22" D x 38" H',
      'Material: Solid wood with veneer finish',
    ],
  },
  // ... (add more products with appropriate categories and subcategories)
];