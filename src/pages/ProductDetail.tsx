import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Truck, ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import { db, isConfigValid } from '../firebase/config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { products } from '../data/products';
import Breadcrumb from '../components/Breadcrumb';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/search" className="text-emerald-600 hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success('Product added to cart');
  };

  const estimatedArrival = new Date();
  estimatedArrival.setDate(estimatedArrival.getDate() + 5);

  const breadcrumbItems = [
    { label: 'Products', path: '/search' },
    { label: product.category, path: `/search?category=${product.category}` },
    { label: product.name, path: `/product/${product.id}` },
  ];

  const percentageOff = product.discountedPrice
    ? Math.round((1 - product.discountedPrice / product.price) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="relative">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              onClick={() => setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
            >
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex mt-4 space-x-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  index === activeImageIndex ? 'border-2 border-emerald-500' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          <div className="mb-4">
            {product.discountedPrice ? (
              <>
                <span className="text-2xl font-bold text-gray-800 mr-2">${product.discountedPrice}</span>
                <span className="text-xl text-gray-500 line-through">${product.price}</span>
                <span className="ml-2 text-red-600 font-semibold">{percentageOff}% OFF</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-800">${product.price}</span>
            )}
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                className="bg-gray-200 px-3 py-1 rounded-l-md"
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-16 text-center border-t border-b border-gray-200 py-1"
              />
              <button
                className="bg-gray-200 px-3 py-1 rounded-r-md"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
          <div className="mt-6 flex items-center text-gray-600">
            <Truck className="w-5 h-5 mr-2" />
            <span>Estimated delivery: {estimatedArrival.toDateString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['details', 'specifications', 'delivery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'details' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
              <ul className="list-disc list-inside">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-gray-600">{spec}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery and Returns</h2>
              <p className="text-gray-600 mb-4">
                We offer free standard delivery on all orders over $50. For orders under $50, a flat rate of $5.99 applies.
              </p>
              <p className="text-gray-600 mb-4">
                Estimated delivery time is 3-5 business days. Express delivery is available for an additional fee.
              </p>
              <p className="text-gray-600">
                We accept returns within 30 days of purchase. Items must be unused and in their original packaging.
                Return shipping fees may apply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;