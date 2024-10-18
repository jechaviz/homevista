import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, isConfigValid } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isConfigValid) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return unsubscribe;
    } else {
      // Demo mode: Set a mock user
      setUser({ uid: 'demo-user', email: 'demo@example.com' } as User);
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (isConfigValid) {
      return signInWithEmailAndPassword(auth, email, password);
    } else {
      // Demo mode: Simulate login
      console.log('Demo login:', email);
      setUser({ uid: 'demo-user', email } as User);
    }
  };

  const signup = async (email: string, password: string) => {
    if (isConfigValid) {
      return createUserWithEmailAndPassword(auth, email, password);
    } else {
      // Demo mode: Simulate signup
      console.log('Demo signup:', email);
      setUser({ uid: 'demo-user', email } as User);
    }
  };

  const logout = async () => {
    if (isConfigValid) {
      return signOut(auth);
    } else {
      // Demo mode: Simulate logout
      console.log('Demo logout');
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};