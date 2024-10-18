import React from 'react';
import { useDemo } from '../contexts/DemoContext';
import { allDemoProducts, demoServices } from '../data/demoData';
import Search from '../components/Search';

const SearchPage: React.FC = () => {
  const { isDemoMode } = useDemo();
  const products = isDemoMode ? allDemoProducts : []; // In production, fetch from API
  const services = isDemoMode ? demoServices : []; // In production, fetch from API

  return (
    <Search
      initialProducts={products}
      initialServices={services}
    />
  );
};

export default SearchPage;