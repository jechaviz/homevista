import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { CreditCard, Plus, Minus } from 'lucide-react';

interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const demoAddress: Address = {
  fullName: 'John Doe',
  streetAddress: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zipCode: '12345',
  country: 'USA',
};

// Demo extras for products
const productExtras = {
  1: [
    { id: 'e1', name: 'Table Cloth', price: 29.99 },
    { id: 'e2', name: 'Chair Cushions (Set of 4)', price: 39.99 },
  ],
  2: [
    { id: 'e3', name: 'Dining Set Care Kit', price: 19.99 },
    { id: 'e4', name: 'Placemats (Set of 6)', price: 24.99 },
  ],
  // Add more extras for other products as needed
};

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState<Address>(demoAddress);
  const [billingAddress, setBillingAddress] = useState<Address>(demoAddress);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card'>('card');
  const [selectedExtras, setSelectedExtras] = useState<{[key: string]: number}>({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = 10; // Fixed delivery cost for demo purposes
  const taxRate = 0.08; // 8% tax rate for demo purposes
  const taxAmount = subtotal * taxRate;
  const extrasTotal = Object.entries(selectedExtras).reduce((sum, [extraId, quantity]) => {
    const extra = Object.values(productExtras).flat().find(e => e.id === extraId);
    return sum + (extra ? extra.price * quantity : 0);
  }, 0);
  const total = subtotal + deliveryCost + taxAmount + extrasTotal;

  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
  }, [sameAsShipping, shippingAddress]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  const handleExtraChange = (extraId: string, change: number) => {
    setSelectedExtras(prev => {
      const newQuantity = (prev[extraId] || 0) + change;
      if (newQuantity <= 0) {
        const { [extraId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [extraId]: newQuantity };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const order = {
        userId: user?.uid,
        items: cart,
        extras: selectedExtras,
        subtotal,
        deliveryCost,
        taxAmount,
        extrasTotal,
        total,
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        paymentMethod,
        status: 'pending',
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'orders'), order);

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={shippingAddress.fullName}
              onChange={handleShippingChange}
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="streetAddress"
              value={shippingAddress.streetAddress}
              onChange={handleShippingChange}
              placeholder="Street Address"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="city"
              value={shippingAddress.city}
              onChange={handleShippingChange}
              placeholder="City"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="state"
              value={shippingAddress.state}
              onChange={handleShippingChange}
              placeholder="State"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="zipCode"
              value={shippingAddress.zipCode}
              onChange={handleShippingChange}
              placeholder="ZIP Code"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="country"
              value={shippingAddress.country}
              onChange={handleShippingChange}
              placeholder="Country"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Billing Address</h2>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={() => setSameAsShipping(!sameAsShipping)}
                className="mr-2"
              />
              Same as shipping address
            </label>
          </div>
          {!sameAsShipping && (
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                value={billingAddress.fullName}
                onChange={handleBillingChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="streetAddress"
                value={billingAddress.streetAddress}
                onChange={handleBillingChange}
                placeholder="Street Address"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="city"
                value={billingAddress.city}
                onChange={handleBillingChange}
                placeholder="City"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="state"
                value={billingAddress.state}
                onChange={handleBillingChange}
                placeholder="State"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="zipCode"
                value={billingAddress.zipCode}
                onChange={handleBillingChange}
                placeholder="ZIP Code"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="country"
                value={billingAddress.country}
                onChange={handleBillingChange}
                placeholder="Country"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              {productExtras[item.id] && (
                <div className="ml-4">
                  <h4 className="font-semibold mb-2">Optional Extras:</h4>
                  {productExtras[item.id].map((extra) => (
                    <div key={extra.id} className="flex justify-between items-center mb-2">
                      <span>{extra.name} - ${extra.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleExtraChange(extra.id, -1)}
                          className="bg-gray-200 p-1 rounded-full"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-2">{selectedExtras[extra.id] || 0}</span>
                        <button
                          type="button"
                          onClick={() => handleExtraChange(extra.id, 1)}
                          className="bg-gray-200 p-1 rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Delivery Cost</span>
              <span>${deliveryCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Tax (8%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Extras</span>
              <span>${extrasTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Payment Method</h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="mr-2"
              />
              <CreditCard className="w-6 h-6 mr-2" />
              Credit/Debit Card
            </label>
          </div>

          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-1/2 px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-300 mt-8"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;