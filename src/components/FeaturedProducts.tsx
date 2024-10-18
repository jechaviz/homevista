import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';
import { demoProducts } from '../data/demoData';

const FeaturedProducts: React.FC = () => {
  const { isDemoMode } = useDemo();
  const featuredProducts = isDemoMode ? demoProducts.slice(0, 8) : []; // In production, fetch from API

  // Rest of the component remains the same...
};

export default FeaturedProducts;