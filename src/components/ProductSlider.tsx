import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductSlider = () => {
  const [activeImageIndexes, setActiveImageIndexes] = useState(products.map(() => 0));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, productIndex: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const percentage = x / width;
    const imageIndex = Math.floor(percentage * products[productIndex].images.length);
    setActiveImageIndexes(prev => {
      const newIndexes = [...prev];
      newIndexes[productIndex] = imageIndex;
      return newIndexes;
    });
  };

  return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Trending Products</h2>
        <div className="relative">
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {products.map((product, index) => (
                <Link key={product.id} to={`/product/${product.id}`} className="flex-none w-72 bg-white rounded-lg shadow-md overflow-hidden">
                  <div
                      className="relative w-full h-48 overflow-hidden"
                      onMouseMove={(e) => handleMouseMove(e, index)}
                      onMouseLeave={() => setActiveImageIndexes(prev => {
                        const newIndexes = [...prev];
                        newIndexes[index] = 0;
                        return newIndexes;
                      })}
                  >
                    <img
                        src={product.images[activeImageIndexes[index]]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    {product.discountedPrice && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          {Math.round((1 - product.discountedPrice / product.price) * 100)}% OFF
                        </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {product.discountedPrice ? (
                          <>
                            <p className="text-gray-800 font-semibold mr-2">${product.discountedPrice}</p>
                            <p className="text-sm text-gray-500 line-through">${product.price}</p>
                          </>
                      ) : (
                          <p className="text-gray-800 font-semibold">${product.price}</p>
                      )}
                    </div>
                  </div>
                </Link>
            ))}
          </div>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </section>
  );
};

export default ProductSlider;