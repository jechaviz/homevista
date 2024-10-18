import React from 'react';
import { PaintBucket, Ruler, Camera, Truck } from 'lucide-react';

const services = [
  { name: 'Interior Design', icon: PaintBucket, description: 'Get professional interior design services', price: 'Starting at $299' },
  { name: 'Architecture & Plans', icon: Ruler, description: 'Custom architectural plans for your project', price: 'Starting at $499' },
  { name: '3D Rendering', icon: Camera, description: 'Visualize your space with 3D renderings', price: 'Starting at $199' },
  { name: 'Furniture Assembly', icon: Truck, description: 'Professional assembly and installation', price: 'Starting at $99' },
];

const Services = () => {
  return (
    <section className="container mx-auto px-4 py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Professional Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <service.icon className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-emerald-600 font-semibold mb-4">{service.price}</p>
            <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition duration-300">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;