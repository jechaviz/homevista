import React from 'react';
import { useDemo } from '../contexts/DemoContext';
import { demoServices } from '../data/demoData';
import Search from '../components/Search';

const ServicesPage: React.FC = () => {
  const { isDemoMode } = useDemo();
  const services = isDemoMode ? demoServices : []; // In production, fetch from API

  return (
    <Search
      initialProducts={[]}
      initialServices={services}
      showServicesOnly={true}
    />
  );
};

export default ServicesPage;