import React from 'react';
import { Link } from 'react-router-dom';
import { Sofa, Utensils, Bed, Bath, Palette, Lightbulb } from 'lucide-react';
import { categories } from '../data/products';

const categoryIcons = {
  'Furniture': Sofa,
  'Kitchen & Dining': Utensils,
  'Decor': Palette,
  'Outdoor': Lightbulb,
};

const Categories = () => {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.name] || Sofa;
          return (
            <Link 
              key={category.id} 
              to={`/search?category=${category.name}`}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition duration-300"
            >
              <Icon className="w-12 h-12 text-emerald-600 mb-2" />
              <span className="text-gray-800 font-semibold">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;