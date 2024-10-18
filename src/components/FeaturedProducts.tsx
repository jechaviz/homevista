import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';
import { products } from '../data/products';

const FeaturedProducts: React.FC = () => {
  const { isDemoMode } = useDemo();
  const featuredProducts = isDemoMode ? products.slice(0, 8) : []; // In production, fetch from API

  return (
      <section className="my-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
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
                    <span className="text-lg font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                    {product.discountedPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </section>
  );
};

export default FeaturedProducts;