import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, MessageSquare, User, Settings } from 'lucide-react';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            {/* Add order history functionality here */}
          </div>
        );
      case 'wishlist':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            {/* Add wishlist functionality here */}
          </div>
        );
      case 'messages':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            {/* Add messaging functionality here */}
          </div>
        );
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            {/* Add profile management functionality here */}
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            {/* Add account settings functionality here */}
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
          <h1 className="text-2xl font-bold text-emerald-600">My Account</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'orders' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            My Orders
          </Link>
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'wishlist' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Wishlist
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
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'profile' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="w-5 h-5 mr-2" />
            My Profile
          </Link>
          <Link
            to="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'settings' ? 'bg-emerald-100' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default CustomerDashboard;