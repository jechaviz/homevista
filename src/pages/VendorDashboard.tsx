import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Package, DollarSign, MessageSquare, Settings, Calendar } from 'lucide-react';
import { demoServices, demoVendors } from '../data/demoData';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState(demoServices);
  const vendor = demoVendors[0]; // For demo purposes, we'll use the first vendor

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                <p className="text-2xl font-bold">${vendor.salesHistory.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                <p className="text-2xl font-bold">{vendor.salesHistory.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Listings</h3>
                <p className="text-2xl font-bold">{vendor.products.length + vendor.services.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
                <p className="text-2xl font-bold">4.7</p>
              </div>
            </div>
          </div>
        );
      case 'services':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Service Management</h2>
            {services.filter(service => vendor.services.includes(service.id)).map(service => (
              <div key={service.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-2">{service.description}</p>
                <p className="font-semibold mb-2">Price: ${service.price}</p>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-300">
                  Edit Service
                </button>
              </div>
            ))}
          </div>
        );
      case 'schedule':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Schedule Management</h2>
            {/* Add a calendar component here for managing busy days and hours */}
            <p>Implement a calendar component to manage your availability.</p>
          </div>
        );
      case 'messages':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Messages</h2>
            <p>You have no new messages.</p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company-name">
                  Company Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="company-name"
                  type="text"
                  placeholder="Company Name"
                  value={vendor.company}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={vendor.email}
                />
              </div>
              <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Save Changes
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-emerald-600">Vendor Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'overview' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart className="w-5 h-5 mr-2" />
            Overview
          </Link>
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'services' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Package className="w-5 h-5 mr-2" />
            Services
          </Link>
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'schedule' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule
          </Link>
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'messages' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Messages
          </Link>
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'settings' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default VendorDashboard;