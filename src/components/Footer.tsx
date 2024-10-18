import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">HomeVista is your one-stop destination for home design inspiration, products, and professional services.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Shop</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Find Professionals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Design Ideas</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">123 Design Street</p>
            <p className="text-gray-300">Creativeville, CA 90210</p>
            <p className="text-gray-300">contact@homevista.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              <Linkedin className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-300">
          <p>&copy; 2024 HomeVista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;