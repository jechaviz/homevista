import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoProvider } from '../../contexts/DemoContext';
import PopularServices from '../PopularServices';
import { demoServices } from '../../data/demoData';

jest.mock('../../data/demoData', () => ({
  demoServices: [
    { id: 1, title: 'Service 1', description: 'Description 1', price: 100, image: 'image1.jpg', providerName: 'Provider 1', providerImage: 'provider1.jpg', rating: 4.5, duration: '1 hour' },
    { id: 2, title: 'Service 2', description: 'Description 2', price: 200, image: 'image2.jpg', providerName: 'Provider 2', providerImage: 'provider2.jpg', rating: 4.0, duration: '2 hours' },
    { id: 3, title: 'Service 3', description: 'Description 3', price: 300, image: 'image3.jpg', providerName: 'Provider 3', providerImage: 'provider3.jpg', rating: 4.8, duration: '3 hours' },
    { id: 4, title: 'Service 4', description: 'Description 4', price: 400, image: 'image4.jpg', providerName: 'Provider 4', providerImage: 'provider4.jpg', rating: 4.2, duration: '4 hours' },
  ],
}));

const renderPopularServices = () => {
  return render(
    <Router>
      <DemoProvider>
        <PopularServices />
      </DemoProvider>
    </Router>
  );
};

describe('PopularServices Component', () => {
  test('renders popular services section', () => {
    renderPopularServices();
    expect(screen.getByText('Popular Services')).toBeInTheDocument();
  });

  test('displays correct number of services', () => {
    renderPopularServices();
    demoServices.slice(0, 4).forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  test('displays service details', () => {
    renderPopularServices();
    const firstService = demoServices[0];
    expect(screen.getByText(firstService.title)).toBeInTheDocument();
    expect(screen.getByText(firstService.description)).toBeInTheDocument();
    expect(screen.getByText(firstService.providerName)).toBeInTheDocument();
    expect(screen.getByText(firstService.duration)).toBeInTheDocument();
    expect(screen.getByText(`Starting at $${firstService.price}`)).toBeInTheDocument();
  });

  test('displays "View All Services" button', () => {
    renderPopularServices();
    expect(screen.getByText('View All Services')).toBeInTheDocument();
  });
});