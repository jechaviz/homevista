import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, ShoppingCart, Menu, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { useDemo } from '../contexts/DemoContext';
import { useLocation as useLocationContext } from '../contexts/LocationContext';
import { isConfigValid } from '../firebase/config';
import DevModeDownload from './DevModeDownload';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { isDemoMode } = useDemo();
  const { location, setLocation } = useLocationContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const routeLocation = useLocation();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setShowLocationModal(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4">
          <Home className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-emerald-600">HomeVista</h1>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-emerald-600">Home</Link></li>
            <li><Link to="/search" className="text-gray-600 hover:text-emerald-600">Shop</Link></li>
            <li><Link to="/services" className="text-gray-600 hover:text-emerald-600">Services</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowLocationModal(true)}
            className="flex items-center text-gray-600 hover:text-emerald-600"
          >
            <MapPin className="w-5 h-5 mr-1" />
            {location || 'Detecting...'}
          </button>
          <Link to="/search" className="text-gray-600 hover:text-emerald-600">
            <Search className="w-6 h-6" />
          </Link>
          {user ? (
            <div className="relative group">
              <User className="w-6 h-6 text-gray-600 cursor-pointer" />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="text-gray-600 hover:text-emerald-600">Login</Link>
              <Link to="/signup" className="text-gray-600 hover:text-emerald-600">Register</Link>
            </div>
          )}
          <Link to="/cart" className="text-gray-600 hover:text-emerald-600 relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          {!isConfigValid && (
            <span className="px-3 py-1 rounded-full text-sm bg-yellow-500 text-white">
              Demo Mode
            </span>
          )}
          {routeLocation.pathname === '/dev' && <DevModeDownload />}
          <Menu
            className="w-6 h-6 text-gray-600 cursor-pointer md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</Link>
          <Link to="/search" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Shop</Link>
          <Link to="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Services</Link>
        </div>
      )}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Set Your Location</h2>
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={location}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={() => setShowLocationModal(false)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;