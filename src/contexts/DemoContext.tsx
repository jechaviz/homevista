import React, { createContext, useContext, useState, useEffect } from 'react';
import { isConfigValid } from '../firebase/config';

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(!isConfigValid);

  useEffect(() => {
    if (!isConfigValid) {
      setIsDemoMode(true);
    }
  }, []);

  const toggleDemoMode = () => {
    if (isConfigValid) {
      setIsDemoMode(prev => !prev);
    } else {
      console.warn('Cannot disable demo mode: Firebase configuration is invalid.');
    }
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, toggleDemoMode }}>
      {children}
    </DemoContext.Provider>
  );
};