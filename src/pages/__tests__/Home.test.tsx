import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoProvider } from '../../contexts/DemoContext';
import { LocationProvider } from '../../contexts/LocationContext';
import Home from '../Home';

// Mock the components that are rendered in the Home component
jest.mock('../../components/Hero', () => () => <div data-testid="mock-hero">Mock Hero</div>);
jest.mock('../../components/Categories', () => () => <div data-testid="mock-categories">Mock Categories</div>);
jest.mock('../../components/FeaturedProducts', () => () => <div data-testid="mock-featured-products">Mock Featured Products</div>);
jest.mock('../../components/ProductSlider', () => () => <div data-testid="mock-product-slider">Mock Product Slider</div>);
jest.mock('../../components/FlashDeals', () => () => <div data-testid="mock-flash-deals">Mock Flash Deals</div>);
jest.mock('../../components/PopularServices', () => () => <div data-testid="mock-popular-services">Mock Popular Services</div>);
jest.mock('../../components/FeaturedProjects', () => () => <div data-testid="mock-featured-projects">Mock Featured Projects</div>);

const renderHome = () => {
  return render(
    <Router>
      <DemoProvider>
        <LocationProvider>
          <Home />
        </LocationProvider>
      </DemoProvider>
    </Router>
  );
};

describe('Home Page', () => {
  test('renders all main components', () => {
    renderHome();

    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('mock-categories')).toBeInTheDocument();
    expect(screen.getByTestId('mock-featured-products')).toBeInTheDocument();
    expect(screen.getByTestId('mock-product-slider')).toBeInTheDocument();
    expect(screen.getByTestId('mock-flash-deals')).toBeInTheDocument();
    expect(screen.getByTestId('mock-popular-services')).toBeInTheDocument();
    expect(screen.getByTestId('mock-featured-projects')).toBeInTheDocument();
  });
});