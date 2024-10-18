import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import FlashDeals from '../components/FlashDeals';
import PopularServices from '../components/PopularServices';
import ProductSlider from '../components/ProductSlider';
import FeaturedProjects from '../components/FeaturedProjects';
import { useLocation } from '../contexts/LocationContext';
import { useDemo } from '../contexts/DemoContext';

const Home: React.FC = () => {
  const { setLocation } = useLocation();
  const { isDemoMode } = useDemo();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocation(data.postal || '');
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, [setLocation]);

  return (
    <div className="bg-gray-100">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <Categories />
        {isDemoMode && (
          <>
            <FeaturedProducts />
            <ProductSlider />
            <FlashDeals />
            <PopularServices />
            <FeaturedProjects />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;