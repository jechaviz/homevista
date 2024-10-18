import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Product added to cart');
  };

  const handleMouseMove = (e) => {
    if (!product.images || product.images.length <= 1) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const percentage = x / width;
    const imageIndex = Math.floor(percentage * product.images.length);
    setActiveImageIndex(imageIndex);
  };

  // Fallback image in case the product doesn't have any
  const fallbackImage = 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div 
          className="relative h-64 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveImageIndex(0)}
        >
          <img 
            src={product.images && product.images.length > 0 ? product.images[activeImageIndex] : fallbackImage}
            alt={product.name} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              -{product.discountPercentage}%
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Eye className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-emerald-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;