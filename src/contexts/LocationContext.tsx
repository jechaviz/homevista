import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation || '';
  });

  useEffect(() => {
    const fetchLocation = async () => {
      if (!location) {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          const detectedLocation = data.postal || '';
          setLocation(detectedLocation);
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }
    };

    fetchLocation();
  }, [location]);

  useEffect(() => {
    localStorage.setItem('userLocation', location);
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};