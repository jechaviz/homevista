import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { demoProducts } from '../data/demoData';

const ProductSlider = () => {
  const [activeImageIndexes, setActiveImageIndexes] = useState(demoProducts.map(() => 0));

  // Rest of the component remains the same...
};

export default ProductSlider;