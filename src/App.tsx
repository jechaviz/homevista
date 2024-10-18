import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { DemoProvider } from './contexts/DemoContext';
import { LocationProvider } from './contexts/LocationContext';
import PrivateRoute from './components/PrivateRoute';

const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Search = lazy(() => import('./pages/Search'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Services = lazy(() => import('./pages/Services'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const VendorDashboard = lazy(() => import('./pages/VendorDashboard'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const QuotationContest = lazy(() => import('./pages/QuotationContest'));
const DevMode = lazy(() => import('./pages/DevMode'));

function App() {
  return (
    <AuthProvider>
      <DemoProvider>
        <LocationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                    <Route path="/vendor" element={<PrivateRoute><VendorDashboard /></PrivateRoute>} />
                    <Route path="/customer" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>} />
                    <Route path="/quotation-contest" element={<PrivateRoute><QuotationContest /></PrivateRoute>} />
                    <Route path="/dev" element={<DevMode />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
          <ToastContainer />
        </LocationProvider>
      </DemoProvider>
    </AuthProvider>
  );
}

export default App;