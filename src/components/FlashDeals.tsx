import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';
import { products } from '../data/products';

const FlashDeals: React.FC = () => {
  const { isDemoMode } = useDemo();
  const flashDeals = isDemoMode ? products.filter(p => p.discountedPrice).slice(0, 4) : [];
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 hours in seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Flash Deals</h2>
        <div className="flex items-center text-emerald-600">
          <Clock className="w-5 h-5 mr-2" />
          <span>Ends in {formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flashDeals.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative">
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                -{Math.round((1 - product.discountedPrice / product.price) * 100)}%
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-600">${product.discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FlashDeals;