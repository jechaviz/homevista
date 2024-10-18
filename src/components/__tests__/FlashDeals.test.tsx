import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoProvider } from '../../contexts/DemoContext';
import FlashDeals from '../FlashDeals';
import { products } from '../../data/products';

jest.mock('../../data/products', () => ({
  products: [
    { id: 1, name: 'Product 1', price: 100, discountedPrice: 80, images: ['image1.jpg'] },
    { id: 2, name: 'Product 2', price: 200, discountedPrice: 160, images: ['image2.jpg'] },
    { id: 3, name: 'Product 3', price: 300, images: ['image3.jpg'] },
    { id: 4, name: 'Product 4', price: 400, discountedPrice: 320, images: ['image4.jpg'] },
    { id: 5, name: 'Product 5', price: 500, images: ['image5.jpg'] },
  ],
}));

const renderFlashDeals = () => {
  return render(
    <Router>
      <DemoProvider>
        <FlashDeals />
      </DemoProvider>
    </Router>
  );
};

describe('FlashDeals Component', () => {
  test('renders flash deals section', () => {
    renderFlashDeals();
    expect(screen.getByText('Flash Deals')).toBeInTheDocument();
  });

  test('displays correct number of discounted products', () => {
    renderFlashDeals();
    const discountedProducts = products.filter(p => p.discountedPrice).slice(0, 4);
    discountedProducts.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  test('displays countdown timer', () => {
    renderFlashDeals();
    expect(screen.getByText(/Ends in/)).toBeInTheDocument();
  });
});