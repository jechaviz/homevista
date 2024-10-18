import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Tag } from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';
import { demoServices } from '../data/demoData';

const PopularServices: React.FC = () => {
  const { isDemoMode } = useDemo();
  const services = isDemoMode ? demoServices.slice(0, 4) : [];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link key={service.id} to={`/services/${service.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative">
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
              <div className="absolute top-0 left-0 bg-emerald-600 text-white px-2 py-1 m-2 rounded-full text-sm">
                {service.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4 h-12 overflow-hidden">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img src={service.providerImage} alt={service.providerName} className="w-8 h-8 rounded-full mr-2" />
                  <span className="text-sm text-gray-700">{service.providerName}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="text-sm text-gray-600">{service.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  <span>Starting at ${service.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/services" className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300">
          View All Services
        </Link>
      </div>
    </section>
  );
};

export default PopularServices;